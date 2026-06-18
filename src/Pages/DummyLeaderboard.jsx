import React from 'react';
import dummyTeams from '../data/dummyTeams.json';
import './DummyLeaderboard.css';

export default function DummyLeaderboard() {
  const entries = dummyTeams.map((name, i) => ({
    _id: `dummy-${i}`,
    teamName: name,
  }));

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
                <th className="col-team">TEAM NAME</th>
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
                } else if (rank <= 10) {
                  rowClass = "row-lavender";
                }

                return (
                  <tr key={e._id} className={rowClass}>
                    <td className="cell-rank">{rankDisplay}</td>
                    <td className="cell-team">{e.teamName}</td>
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
