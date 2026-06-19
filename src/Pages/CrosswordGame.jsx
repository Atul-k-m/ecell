import React, { useState, useEffect, useRef } from 'react';
import './CrosswordGame.css';

const gridStructure = [
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    0,
    0
  ],
  [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0
  ]
];

const answerKey = [
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "U",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "R",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "B",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "A",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "N",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "C",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "O",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "M",
    "",
    "",
    "",
    "",
    "G",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "P",
    "",
    "",
    "",
    "",
    "O",
    "",
    "",
    "T",
    "",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "A",
    "",
    "",
    "",
    "",
    "O",
    "",
    "R",
    "E",
    "D",
    "D",
    "I",
    "T"
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "N",
    "",
    "N",
    "",
    "",
    "G",
    "",
    "",
    "S",
    "",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "S",
    "K",
    "Y",
    "P",
    "E",
    "",
    "",
    "L",
    "",
    "",
    "L",
    "",
    "",
    "",
    ""
  ],
  [
    "C",
    "U",
    "L",
    "T",
    "F",
    "I",
    "T",
    "",
    "",
    "",
    "T",
    "E",
    "L",
    "E",
    "G",
    "R",
    "A",
    "M",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "A",
    "",
    "",
    "",
    "F",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "R",
    "",
    "",
    "",
    "L",
    "E",
    "N",
    "S",
    "K",
    "A",
    "R",
    "T",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "A",
    "I",
    "R",
    "B",
    "N",
    "B",
    "",
    "I",
    "",
    "",
    "",
    "",
    "M",
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "U",
    "",
    "",
    "",
    "X",
    "",
    "",
    "",
    "",
    "A",
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "C",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Z",
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "I",
    "K",
    "E",
    "A",
    "",
    "",
    "",
    "",
    "G",
    "R",
    "O",
    "W",
    "W",
    "",
    "",
    ""
  ],
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "S",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "N",
    "",
    "",
    "",
    "",
    ""
  ]
];

const wordsData = [
  {
    "id": "v12",
    "num": 1,
    "dir": "vertical",
    "text": "Need a plumber, electrician, beautician, or furniture assembly expert? I somehow know all of them. Who am I?",
    "word": "URBANCOMPANY",
    "r": 0,
    "c": 8
  },
  {
    "id": "v6",
    "num": 2,
    "dir": "vertical",
    "text": "Started in a garage and now answers questions nobody in your group chat can. Who am I?",
    "word": "GOOGLE",
    "r": 7,
    "c": 13
  },
  {
    "id": "v7",
    "num": 3,
    "dir": "vertical",
    "text": "I'm famous for making cars that barely make noise. Who am I?",
    "word": "TESLA",
    "r": 8,
    "c": 16
  },
  {
    "id": "h11",
    "num": 4,
    "dir": "horizontal",
    "text": "The front page of the internet and the comment section of chaos. Who am I?",
    "word": "REDDIT",
    "r": 9,
    "c": 15
  },
  {
    "id": "v2",
    "num": 5,
    "dir": "vertical",
    "text": "I used to send DVDs to people's homes. Now I send cliffhangers directly to your brain. Who am I?",
    "word": "NETFLIX",
    "r": 10,
    "c": 10
  },
  {
    "id": "h1",
    "num": 6,
    "dir": "horizontal",
    "text": "Before Zoom, I was the king of frozen faces and awkward calls. Who am I?",
    "word": "SKYPE",
    "r": 11,
    "c": 6
  },
  {
    "id": "v4",
    "num": 6,
    "dir": "vertical",
    "text": "I know exactly how to spell your name. I just choose not to. Who am I?",
    "word": "STARBUCKS",
    "r": 11,
    "c": 6
  },
  {
    "id": "h9",
    "num": 7,
    "dir": "horizontal",
    "text": "A gym membership that follows you everywhere. Who am I?",
    "word": "CULTFIT",
    "r": 12,
    "c": 0
  },
  {
    "id": "h3",
    "num": 8,
    "dir": "horizontal",
    "text": "An old-fashioned word for a message and a modern place for endless group chats. Who am I?",
    "word": "TELEGRAM",
    "r": 12,
    "c": 10
  },
  {
    "id": "h5",
    "num": 9,
    "dir": "horizontal",
    "text": "I let you try on glasses without stepping outside. If they make you look questionable, send them back. Who am I?",
    "word": "LENSKART",
    "r": 14,
    "c": 10
  },
  {
    "id": "v8",
    "num": 10,
    "dir": "vertical",
    "text": "I sold books online before deciding to sell basically the entire planet. Who am I?",
    "word": "AMAZON",
    "r": 14,
    "c": 15
  },
  {
    "id": "h15",
    "num": 11,
    "dir": "horizontal",
    "text": "Turned spare bedrooms into a billion-dollar business. Who am I?",
    "word": "AIRBNB",
    "r": 15,
    "c": 3
  },
  {
    "id": "h14",
    "num": 12,
    "dir": "horizontal",
    "text": "I was once a bird. Now I'm a letter. Who am I?",
    "word": "X",
    "r": 16,
    "c": 10
  },
  {
    "id": "h10",
    "num": 13,
    "dir": "horizontal",
    "text": "I sell furniture and confidence in your ability to follow diagrams. Who am I?",
    "word": "IKEA",
    "r": 18,
    "c": 5
  },
  {
    "id": "h13",
    "num": 14,
    "dir": "horizontal",
    "text": "I have an extra letter in my name and hopefully extra money in your future. Who am I?",
    "word": "GROWW",
    "r": 18,
    "c": 13
  }
];

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const CrosswordGame = () => {
  const rows = 20;
  const cols = 21;

  // Login state
  const [loggedIn, setLoggedIn] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loginError, setLoginError] = useState('');

  const [entryId, setEntryId] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) {
      setLoginError('Please enter your team name.');
      return;
    }
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      setLoginError('Please enter a valid 10-digit phone number (without +91).');
      return;
    }
    try {
      const res = await fetch('/api/crossword/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamName: teamName.trim(), phone: phoneNumber }),
      });
      const data = await res.json();
      if (data.success) {
        setEntryId(data.entryId);
        setLoggedIn(true);
      } else {
        setLoginError(data.error || 'Failed to register. Please try again.');
        return;
      }
    } catch (_) {
      setLoginError('Network error. Could not connect to server.');
      return;
    }
  };

  const [grid, setGrid] = useState(
    Array(rows).fill(null).map(() => Array(cols).fill(''))
  );
  const [direction, setDirection] = useState('right');
  const [focusedCell, setFocusedCell] = useState(null);
  
  // Progress & State
  const [time, setTime] = useState(600);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [correctWords, setCorrectWords] = useState([]);
  const [wrongCells, setWrongCells] = useState([]);
  const [completedCellsTotal, setCompletedCellsTotal] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [activeWordId, setActiveWordId] = useState(null);

  // Game gating: wait for admin to start
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!loggedIn || gameStarted) return;
    // Poll every 3 seconds until admin starts the game
    const poll = async () => {
      try {
        const res = await fetch('/api/crossword/status');
        const data = await res.json();
        if (data.success && data.isStarted) {
          setGameStarted(true);
          setIsTimerRunning(true);
        }
      } catch (_) {}
    };
    poll(); // check immediately on login
    const interval = setInterval(poll, 3000);
    return () => clearInterval(interval);
  }, [loggedIn, gameStarted]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Auto-submit when time is up
  useEffect(() => {
    if (isTimerRunning && time === 0) {
      checkGameCompletion(correctWords, 0, incorrectAttempts, true);
    }
  }, [time, isTimerRunning, correctWords, incorrectAttempts]);

  // Determine active word based on focus and direction
  useEffect(() => {
    if (!focusedCell) {
      setActiveWordId(null);
      return;
    }
    const { r, c } = focusedCell;
    // Find which word(s) this cell belongs to
    const matchingWords = wordsData.filter(w => {
      if (w.dir === 'horizontal') {
        return r === w.r && c >= w.c && c < w.c + w.word.length;
      } else {
        return c === w.c && r >= w.r && r < w.r + w.word.length;
      }
    });

    if (matchingWords.length === 0) {
      setActiveWordId(null);
    } else if (matchingWords.length === 1) {
      setActiveWordId(matchingWords[0].id);
      // Auto-update direction to match the only word it belongs to
      setDirection(matchingWords[0].dir === 'horizontal' ? 'right' : 'down');
    } else {
      // Intersection: prefer current direction
      const currentDirWord = matchingWords.find(w => 
        (direction === 'right' && w.dir === 'horizontal') || 
        (direction === 'down' && w.dir === 'vertical')
      );
      if (currentDirWord) {
        setActiveWordId(currentDirWord.id);
      } else {
        setActiveWordId(matchingWords[0].id);
        setDirection(matchingWords[0].dir === 'horizontal' ? 'right' : 'down');
      }
    }
  }, [focusedCell, direction]);

  const checkWordCorrectness = (wId, currentGrid) => {
    const w = wordsData.find(x => x.id === wId);
    if (!w) return false;
    let isCorrect = true;
    for (let i = 0; i < w.word.length; i++) {
      const cr = w.dir === 'horizontal' ? w.r : w.r + i;
      const cc = w.dir === 'horizontal' ? w.c + i : w.c;
      if (currentGrid[cr][cc] !== answerKey[cr][cc]) {
        isCorrect = false;
        break;
      }
    }
    return isCorrect;
  };

  const isCellInWord = (r, c, wordId) => {
    const w = wordsData.find(x => x.id === wordId);
    if (!w) return false;
    if (w.dir === 'horizontal') {
      return r === w.r && c >= w.c && c < w.c + w.word.length;
    } else {
      return c === w.c && r >= w.r && r < w.r + w.word.length;
    }
  };

  const isCellCorrect = (r, c) => {
    // If it belongs to ANY correctly fully solved word, it's correct
    return correctWords.some(wId => isCellInWord(r, c, wId));
  };

  const handleInputChange = (e, r, c) => {
    if (isCellCorrect(r, c)) return;
    let val = e.target.value.toUpperCase();
    if (val.length > 1) val = val.slice(-1);
    
    // Deep copy the row being modified to avoid mutation issues
    const newGrid = grid.map((row, rIdx) => rIdx === r ? [...row] : row);
    newGrid[r][c] = val;
    setGrid(newGrid);

    // Remove red flag if user edits a previously wrong cell
    const cellIdStr = `${r}-${c}`;
    if (wrongCells.includes(cellIdStr)) {
      setWrongCells(prev => prev.filter(id => id !== cellIdStr));
    }

    // Live validation: check ALL words that contain this cell
    // (not just activeWordId — fixes intersection cell bug)
    const newlyCorrect = [];
    wordsData.forEach(w => {
      if (!correctWords.includes(w.id) && !newlyCorrect.includes(w.id)) {
        if (isCellInWord(r, c, w.id) && checkWordCorrectness(w.id, newGrid)) {
          newlyCorrect.push(w.id);
        }
      }
    });
    if (newlyCorrect.length > 0) {
      const updatedCorrect = [...correctWords, ...newlyCorrect];
      setCorrectWords(updatedCorrect);
      checkGameCompletion(updatedCorrect, time, incorrectAttempts);
    }

    // Auto-advance (skip already correct "green" cells)
    if (val !== '') {
      let nextR = r;
      let nextC = c;
      
      if (direction === 'right') {
        let tempC = c + 1;
        while (tempC < cols && gridStructure[r][tempC] === 1) {
          if (!isCellCorrect(r, tempC)) {
            nextC = tempC;
            break;
          }
          tempC++;
        }
      } else {
        let tempR = r + 1;
        while (tempR < rows && gridStructure[tempR][c] === 1) {
          if (!isCellCorrect(tempR, c)) {
            nextR = tempR;
            break;
          }
          tempR++;
        }
      }

      if (nextR !== r || nextC !== c) {
        const nextInput = document.getElementById(`cell-${nextR}-${nextC}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const checkGameCompletion = async (currentCorrectList, currentTime, currentIncorrectAttempts, isTimeUp = false) => {
    if (isTimeUp || currentCorrectList.length === wordsData.length) {
      setIsTimerRunning(false);
      setShowCompletion(true);
      // Calculate accuracy from passed-in values (avoids stale state)
      let totalFilled = 0;
      const flatGrid = grid;
      flatGrid.forEach(row => row.forEach(cell => { if (cell) totalFilled++; }));
      const penalty = (currentIncorrectAttempts || 0) * 5;
      const accuracy = Math.max(0, 100 - penalty);
      const elapsedSeconds = 600 - currentTime;
      // Save completion stats to MongoDB
      if (entryId) {
        try {
          const res = await fetch('/api/crossword/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              entryId,
              timeTaken: elapsedSeconds,
              accuracy,
              solvedWordsCount: currentCorrectList.length,
            }),
          });
          const data = await res.json();
          console.log('Completion saved:', data);
        } catch (err) {
          console.error('Failed to save completion:', err);
        }
      } else {
        console.warn('No entryId — completion not saved to DB');
      }
    }
  };

  const handleCheckAnswers = () => {
    let newWrongCells = [];
    let errorCount = 0;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (gridStructure[r][c] === 1 && grid[r][c] !== '') {
          if (grid[r][c] !== answerKey[r][c]) {
            newWrongCells.push(`${r}-${c}`);
            errorCount++;
          }
        }
      }
    }
    setWrongCells(newWrongCells);
    if (errorCount > 0) {
      setIncorrectAttempts(prev => prev + errorCount);
    }
  };

  const handleKeyDown = (e, r, c) => {
    let nextR = r;
    let nextC = c;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setDirection('right');
      if (c+1 < cols && gridStructure[r][c+1] === 1) nextC = c + 1;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setDirection('right');
      if (c > 0 && gridStructure[r][c-1] === 1) nextC = c - 1;
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setDirection('down');
      if (r+1 < rows && gridStructure[r+1][c] === 1) nextR = r + 1;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setDirection('down');
      if (r > 0 && gridStructure[r-1] && gridStructure[r-1][c] === 1) nextR = r - 1;
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      
      if (!isCellCorrect(r, c)) {
        const newGrid = [...grid];
        newGrid[r][c] = '';
        setGrid(newGrid);
        
        const cellIdStr = `${r}-${c}`;
        if (wrongCells.includes(cellIdStr)) {
          setWrongCells(prev => prev.filter(id => id !== cellIdStr));
        }
      }

      if (direction === 'right') {
        if (c > 0 && gridStructure[r][c-1] === 1) nextC = c - 1;
      } else {
        if (r > 0 && gridStructure[r-1] && gridStructure[r-1][c] === 1) nextR = r - 1;
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      let nextWordIndex = 0;
      if (activeWordId) {
        const currentIndex = wordsData.findIndex(w => w.id === activeWordId);
        nextWordIndex = (currentIndex + 1) % wordsData.length;
      }
      const nextWord = wordsData[nextWordIndex];
      setDirection(nextWord.dir === 'horizontal' ? 'right' : 'down');
      nextR = nextWord.r;
      nextC = nextWord.c;
    }

    if (nextR !== r || nextC !== c) {
      const nextInput = document.getElementById(`cell-${nextR}-${nextC}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleFocus = (r, c) => {
    setFocusedCell({ r, c });
    // Do NOT auto-switch direction here — it causes activeWordId to flip
    // at intersection cells (e.g. TESLA's last letter is also AMAZON's first),
    // making the correctness check run against the wrong word.
    // Direction only changes via Arrow keys or Tab.
  };

  const getNumber = (r, c) => {
    const word = wordsData.find(w => w.r === r && w.c === c);
    return word ? word.num : null;
  };

  const getArrows = (r, c) => {
    const arrows = [];
    if (wordsData.some(w => w.r === r && w.c === c && w.dir === 'horizontal')) arrows.push('right');
    if (wordsData.some(w => w.r === r && w.c === c && w.dir === 'vertical')) arrows.push('down');
    return arrows;
  }



  const isCellActive = (r, c) => {
    return activeWordId && isCellInWord(r, c, activeWordId);
  };

  // Rendering Helpers
  const horizontalWords = wordsData.filter(w => w.dir === 'horizontal');
  const verticalWords = wordsData.filter(w => w.dir === 'vertical');

  const calcAccuracy = () => {
    let totalFilled = 0;
    grid.forEach(row => row.forEach(cell => { if(cell) totalFilled++; }));
    if (totalFilled === 0 && incorrectAttempts === 0) return 100;
    const penalty = incorrectAttempts * 5; // -5% per wrong letter attempt
    return Math.max(0, 100 - penalty);
  };

  return (
    <div className="crossword-page">
      {/* Background decor removed */}

      {!loggedIn ? (
        <div className="login-overlay">
          <div className="login-modal">
            <div className="login-brand">
              <h1>Welcome to</h1>
              <div className="subtitle">ADVERT 3.0</div>
            </div>
            <div className="login-divider" />
            <h2 className="login-title">Enter Your Details</h2>
            <p className="login-subtitle">Identify your team before the puzzle begins.</p>
            <form className="login-form" onSubmit={handleLogin} autoComplete="off">
              <div className="login-field">
                <label htmlFor="teamName">Team Name</label>
                <input
                  id="teamName"
                  type="text"
                  placeholder="e.g. The Pioneers"
                  value={teamName}
                  onChange={e => { setTeamName(e.target.value); setLoginError(''); }}
                />
              </div>
              <div className="login-field">
                <label htmlFor="phone">Team Lead's Phone</label>
                <div className="phone-input-wrapper">
                  <span className="phone-prefix">+91</span>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="10-digit number"
                    maxLength="10"
                    value={phoneNumber}
                    onChange={e => { setPhoneNumber(e.target.value.replace(/\D/g, '')); setLoginError(''); }}
                  />
                </div>
              </div>
              {loginError && <div className="login-error">{loginError}</div>}
              <button type="submit" className="login-btn">Start Puzzle →</button>
            </form>
          </div>
        </div>
      ) : !gameStarted ? (
        <div className="waiting-overlay">
          <div className="waiting-modal">
            <div className="waiting-icon">⏳</div>
            <h2>Hang tight!</h2>
            <p>The admin will start the game shortly. Get ready!</p>
            <div className="waiting-team-badge">🏷 {teamName}</div>
            <div className="waiting-dots">
              <span /><span /><span />
            </div>
          </div>
        </div>
      ) : (
        <>
      <header className="crossword-header">
        <div className="title-section">
          <h1>Welcome to</h1>
          <div className="subtitle">ADVERT 3.0</div>
        </div>
        <div className="header-right">
          <div className="timer-display">{formatTime(time)}</div>
          <div className="progress-display">
            Completed: {correctWords.length}/{wordsData.length}
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(correctWords.length / wordsData.length) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      <div className="main-content-layout">
        <div className="crossword-board-container">
          <div className="crossword-board">
            {gridStructure.map((row, rIndex) => (
              row.map((cell, cIndex) => {
                if (cell === 0) return <div key={`${rIndex}-${cIndex}`} className="cw-cell empty"></div>;

                const num = getNumber(rIndex, cIndex);
                const arrows = getArrows(rIndex, cIndex);
                
                const isWrong = wrongCells.includes(`${rIndex}-${cIndex}`);
                const isCorrect = isCellCorrect(rIndex, cIndex);
                const isActive = isCellActive(rIndex, cIndex);

                let classes = ['cw-cell'];
                if (isCorrect) classes.push('is-correct');
                else if (isWrong) classes.push('is-wrong');
                else if (isActive) classes.push('is-active');

                return (
                  <div key={`${rIndex}-${cIndex}`} className={`cw-cell-wrapper`}>
                    <div className={classes.join(' ')}>
                      <input 
                        id={`cell-${rIndex}-${cIndex}`}
                        type="text"
                        maxLength="2"
                        value={grid[rIndex][cIndex]}
                        onChange={(e) => handleInputChange(e, rIndex, cIndex)}
                        onKeyDown={(e) => handleKeyDown(e, rIndex, cIndex)}
                        onFocus={(e) => {
                          handleFocus(rIndex, cIndex);
                          e.target.select();
                        }}
                        onBlur={() => setFocusedCell(null)}
                        readOnly={isCorrect}
                        autoComplete="off"
                      />
                    </div>
                    {num && arrows.length === 2 && (
                      <div className={`cw-number ${isCorrect ? 'correct' : ''}`}>
                        <span>{num}</span>
                        {arrows.map(dir => (
                          <span key={dir} className="cw-arrow">{dir === 'down' ? '↓' : '→'}</span>
                        ))}
                      </div>
                    )}
                    {num && arrows.length === 1 && (
                      <div className={`cw-number ${arrows[0]} ${isCorrect ? 'correct' : ''}`}>
                        <span>{num}</span>
                        <span className="cw-arrow">{arrows[0] === 'down' ? '↓' : '→'}</span>
                      </div>
                    )}
                    {num && arrows.length === 0 && (
                      <div className={`cw-number ${isCorrect ? 'correct' : ''}`}>
                        <span>{num}</span>
                      </div>
                    )}
                  </div>
                );
              })
            ))}
          </div>
        </div>

        <div className="clues-section">
          <div className="clues-column">
            <h3>Across</h3>
            {horizontalWords.map(item => {
              const isSolved = correctWords.includes(item.id);
              const isActive = activeWordId === item.id;
              return (
                <div key={item.id} className={`clue-item ${isSolved ? 'solved' : ''} ${isActive ? 'active' : ''}`}>
                  <div className="clue-indicator">
                    {isSolved ? '✓' : (isActive ? '▶' : '')}
                  </div>
                  <div className="clue-number">{item.num}</div>
                  <div>{item.text}</div>
                </div>
              );
            })}
          </div>
          <div className="clues-column">
            <h3>Down</h3>
            {verticalWords.map(item => {
              const isSolved = correctWords.includes(item.id);
              const isActive = activeWordId === item.id;
              return (
                <div key={item.id} className={`clue-item ${isSolved ? 'solved' : ''} ${isActive ? 'active' : ''}`}>
                  <div className="clue-indicator">
                    {isSolved ? '✓' : (isActive ? '▶' : '')}
                  </div>
                  <div className="clue-number">{item.num}</div>
                  <div>{item.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showCompletion && (
        <div className="completion-overlay">
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div key={i} className={`confetti-piece c-${i % 5}`} style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }}></div>
            ))}
          </div>
          <div className="completion-modal">
            <div className="trophy">{time === 0 ? '⏳' : '🏆'}</div>
            <h2>{time === 0 ? "Time's Up!" : 'Puzzle Complete!'}</h2>
            <div className="time-display-big">
              <span className="stat-label">Your Time</span>
              <span className="stat-value">{formatTime(600 - time)}</span>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default CrosswordGame;
