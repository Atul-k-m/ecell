import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://ecell-bmsitm.vercel.app"
  ],
  credentials: true,
}));
app.use(express.json());

// ── Mongoose Models (inline to avoid require() issues) ───────────────────────

const gameStateSchema = new mongoose.Schema({
  gameId: { type: String, required: true, unique: true },
  isStarted: { type: Boolean, default: false },
});

const crosswordEntrySchema = new mongoose.Schema({
  teamName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, match: /^[0-9]{10}$/ },
  completedAt: { type: Date, default: null },
  timeTaken: { type: Number, default: null },
  accuracy: { type: Number, default: null },
  solvedWordsCount: { type: Number, default: 0 },
  registeredAt: { type: Date, default: Date.now },
  loggedIn: { type: Boolean, default: false },
});

// Prevent model re-registration in serverless warm-starts
const GameState = mongoose.models.GameState || mongoose.model("GameState", gameStateSchema);
const CrosswordEntry = mongoose.models.CrosswordEntry || mongoose.model("CrosswordEntry", crosswordEntrySchema, "Demousers");

// ── DB Connection (cached for serverless) ───────────────────────────────────
let dbConnected = false;
async function connectDB() {
  if (dbConnected) return;
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set.");
  }
  await mongoose.connect(process.env.MONGODB_URI);
  dbConnected = true;
}

// ── Private Answer Data (NEVER sent to the client) ─────────────────────────
const WORDS_DATA_SECRET = [
  { id: "v12", dir: "vertical",   word: "URBANCOMPANY", r: 0,  c: 8  },
  { id: "v6",  dir: "vertical",   word: "GOOGLE",       r: 7,  c: 13 },
  { id: "v7",  dir: "vertical",   word: "TESLA",        r: 8,  c: 16 },
  { id: "h11", dir: "horizontal", word: "REDDIT",       r: 9,  c: 15 },
  { id: "v2",  dir: "vertical",   word: "NETFLIX",      r: 10, c: 10 },
  { id: "h1",  dir: "horizontal", word: "SKYPE",        r: 11, c: 6  },
  { id: "v4",  dir: "vertical",   word: "STARBUCKS",    r: 11, c: 6  },
  { id: "h9",  dir: "horizontal", word: "CULTFIT",      r: 12, c: 0  },
  { id: "h3",  dir: "horizontal", word: "TELEGRAM",     r: 12, c: 10 },
  { id: "h5",  dir: "horizontal", word: "LENSKART",     r: 14, c: 10 },
  { id: "v8",  dir: "vertical",   word: "AMAZON",       r: 14, c: 15 },
  { id: "h15", dir: "horizontal", word: "AIRBNB",       r: 15, c: 3  },
  { id: "h14", dir: "horizontal", word: "X",            r: 16, c: 10 },
  { id: "h10", dir: "horizontal", word: "IKEA",         r: 18, c: 5  },
  { id: "h13", dir: "horizontal", word: "GROWW",        r: 18, c: 13 },
];

// Build the answer grid (20 rows × 21 cols) from WORDS_DATA_SECRET
const ANSWER_GRID = Array.from({ length: 20 }, () => Array(21).fill(""));
WORDS_DATA_SECRET.forEach(w => {
  for (let i = 0; i < w.word.length; i++) {
    const r = w.dir === "horizontal" ? w.r : w.r + i;
    const c = w.dir === "horizontal" ? w.c + i : w.c;
    ANSWER_GRID[r][c] = w.word[i];
  }
});

// ── Routes ───────────────────────────────────────────────────────────────────

// GET /api/crossword/status
app.get("/api/crossword/status", async (req, res) => {
  try {
    await connectDB();
    const state = await GameState.findOne({ gameId: "crossword" });
    res.json({ success: true, isStarted: state ? state.isStarted : false });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/crossword/status  (admin toggle)
app.post("/api/crossword/status", async (req, res) => {
  try {
    await connectDB();
    const { action } = req.body;
    const isStarted = action === "start";
    const state = await GameState.findOneAndUpdate(
      { gameId: "crossword" },
      { isStarted },
      { upsert: true, new: true }
    );
    res.json({ success: true, isStarted: state.isStarted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/crossword/register
app.post("/api/crossword/register", async (req, res) => {
  try {
    await connectDB();
    const { teamName, phone } = req.body;

    if (!teamName || !teamName.trim()) {
      return res.status(400).json({ success: false, error: "Team name is required." });
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ success: false, error: "A valid 10-digit phone number is required." });
    }

    const trimmedName = teamName.trim();
    let entry;

    if (trimmedName.toLowerCase() === "team nucleus") {
      entry = await CrosswordEntry.findOneAndUpdate(
        { teamName: trimmedName },
        { phone, completedAt: null, timeTaken: null, accuracy: null, registeredAt: Date.now(), loggedIn: true },
        { new: true, upsert: true }
      );
    } else {
      const existingEntry = await CrosswordEntry.findOne({ teamName: trimmedName, phone: phone });
      if (!existingEntry) {
        return res.status(403).json({ success: false, error: "Team not found or phone number is incorrect. Only pre-registered teams can play." });
      }
      if (existingEntry.completedAt !== null) {
        return res.status(403).json({ success: false, error: "Your team has already completed the crossword!" });
      }
      if (existingEntry.loggedIn) {
        return res.status(403).json({ success: false, error: "Your team is already logged in. Only one session per team is allowed." });
      }
      // Mark team as logged in
      await CrosswordEntry.findByIdAndUpdate(existingEntry._id, { loggedIn: true });
      entry = existingEntry;
    }

    res.status(201).json({ success: true, entryId: entry._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/crossword/complete
app.post("/api/crossword/complete", async (req, res) => {
  try {
    await connectDB();
    const { entryId, timeTaken, accuracy, solvedWordsCount } = req.body;
    await CrosswordEntry.findByIdAndUpdate(entryId, {
      completedAt: new Date(),
      timeTaken,
      accuracy,
      solvedWordsCount,
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/crossword/entries  (admin dashboard)
app.get("/api/crossword/entries", async (req, res) => {
  try {
    await connectDB();
    const entries = await CrosswordEntry.find().sort({ registeredAt: 1 });
    res.json({ success: true, entries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/crossword/leaderboard  (public leaderboard - completed teams sorted by time)
app.get("/api/crossword/leaderboard", async (req, res) => {
  try {
    await connectDB();
    const entries = await CrosswordEntry.find(
      { completedAt: { $ne: null }, timeTaken: { $ne: null }, teamName: { $not: /^team nucleus$/i } },
      { teamName: 1, timeTaken: 1, completedAt: 1, solvedWordsCount: 1 }  // only return needed fields
    ).sort({ solvedWordsCount: -1, timeTaken: 1 }); // descending by words solved, then fastest first
    res.json({ success: true, entries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/crossword/validate  (live word-completion check, called on each keystroke)
app.post("/api/crossword/validate", async (req, res) => {
  try {
    await connectDB();
    const { entryId, grid, changedCell } = req.body;
    if (!entryId) return res.status(400).json({ success: false, error: "entryId required" });
    const entry = await CrosswordEntry.findById(entryId);
    if (!entry || !entry.loggedIn) return res.status(403).json({ success: false, error: "Unauthorized" });

    const { r, c } = changedCell;
    // Only check words that overlap the cell that just changed
    const affectedWords = WORDS_DATA_SECRET.filter(w => {
      if (w.dir === "horizontal") return r === w.r && c >= w.c && c < w.c + w.word.length;
      return c === w.c && r >= w.r && r < w.r + w.word.length;
    });

    const correctWordIds = [];
    affectedWords.forEach(w => {
      let ok = true;
      for (let i = 0; i < w.word.length; i++) {
        const wr = w.dir === "horizontal" ? w.r : w.r + i;
        const wc = w.dir === "horizontal" ? w.c + i : w.c;
        if (!grid[wr] || grid[wr][wc] !== ANSWER_GRID[wr][wc]) { ok = false; break; }
      }
      if (ok) correctWordIds.push(w.id);
    });

    res.json({ success: true, correctWordIds });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/crossword/check  (Check Answers button — returns wrong cells & error count)
app.post("/api/crossword/check", async (req, res) => {
  try {
    await connectDB();
    const { entryId, grid } = req.body;
    if (!entryId) return res.status(400).json({ success: false, error: "entryId required" });
    const entry = await CrosswordEntry.findById(entryId);
    if (!entry || !entry.loggedIn) return res.status(403).json({ success: false, error: "Unauthorized" });

    const wrongCells = [];
    for (let r = 0; r < 20; r++) {
      for (let c = 0; c < 21; c++) {
        // Only check playable cells that the user has filled in
        if (grid[r]?.[c] && grid[r][c] !== "" && ANSWER_GRID[r][c] !== "") {
          if (grid[r][c] !== ANSWER_GRID[r][c]) wrongCells.push(`${r}-${c}`);
        }
      }
    }

    res.json({ success: true, wrongCells, errorCount: wrongCells.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default app;
