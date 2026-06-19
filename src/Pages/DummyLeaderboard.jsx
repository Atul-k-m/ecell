import React from 'react';
import dummyTeams from '../data/dummyTeams.json';
import './DummyLeaderboard.css';

export default function DummyLeaderboard() {
const entries = [
  { rank: 1, teamName: "AVENGERS", r1: 27, r2: 16, r3: 40, total: 83 },
  { rank: 2, teamName: "Vague Sense", r1: 29, r2: 18, r3: 32, total: 79 },
  { rank: 3, teamName: "Mango", r1: 23.33, r2: 14, r3: 40, total: 77.33 },
  { rank: 4, teamName: "Dexter", r1: 28, r2: 20, r3: 16, total: 64 },
  { rank: 5, teamName: "low battery", r1: 23.33, r2: 24, r3: 16, total: 63.33 },
  { rank: 6, teamName: "Achar-Papad", r1: 28, r2: 22, r3: 8, total: 58 },
  { rank: 7, teamName: "Level X", r1: 15, r2: 20, r3: 16, total: 51 },
  { rank: 8, teamName: "JEEVAN", r1: 10, r2: 18, r3: 16, total: 44 },
  { rank: 9, teamName: "MasterMonks", r1: 15, r2: 12, r3: 16, total: 43 },
  { rank: 10, teamName: "Ministry of Chaos", r1: 15, r2: 14, r3: 0, total: 29 },
  { rank: 11, teamName: "Aura 999+", r1: 0, r2: 0, r3: 8, total: 8 },
  { rank: 12, teamName: "Team Spark", r1: 0, r2: 0, r3: 8, total: 8 },
  { rank: 13, teamName: "AI Avengers", r1: 0, r2: 0, r3: 8, total: 8 },
  { rank: 14, teamName: "Nexora", r1: 0, r2: 0, r3: 8, total: 8 },
  { rank: 15, teamName: "Lakshmi Chit Funds", r1: 0, r2: 0, r3: 8, total: 8 },
  { rank: 16, teamName: "MODI-fy", r1: 0, r2: 0, r3: 8, total: 8 },
];

  return (
    <div className="dummy-leaderboard-page">
      <div className="dummy-leaderboard-container">

        {/* ── Header ── */}
        <header className="dl-header">
          <h1>Leaderboard</h1>
          <div className="dl-subtitle">ADVERT 3.0 · ROUND 1</div>
        </header>

        {/* ── Leaderboard Table ── */}
        <div className="leaderboard-table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th className="col-rank">RANK</th>
                <th className="col-team">TEAM</th>
                <th className="col-score">R1 (30)</th>
                <th className="col-score">R2 (30)</th>
                <th className="col-score">R3 (40)</th>
                <th className="col-score">TOTAL (100)</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, index) => {
                const rank = index + 1;
                let rankDisplay = `${rank}`;
                let rowClass = "";
                
                if (rank === 1) {
                  rankDisplay = "🥇 1st";
                  rowClass = "row-first";
                } else if (rank === 2) {
                  rankDisplay = "🥈 2nd";
                  rowClass = "row-second";
                } else if (rank === 3) {
                  rankDisplay = "🥉 3rd";
                  rowClass = "row-third";
                } else if (rank <= 8) {
                  rowClass = "row-lavender";
                }

                return (
                  <tr key={`team-${rank}`} className={rowClass}>
                    <td className="cell-rank">{rankDisplay}</td>
                    <td className="cell-team" style={{ textAlign: 'left', paddingLeft: '16px' }}>{e.teamName}</td>
                    <td className="cell-score">{e.r1}</td>
                    <td className="cell-score">{e.r2}</td>
                    <td className="cell-score">{e.r3}</td>
                    <td className="cell-score" style={{ fontWeight: 800 }}>{e.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
