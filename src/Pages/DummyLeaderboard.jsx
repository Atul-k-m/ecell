import React from 'react';
import dummyTeams from '../data/dummyTeams.json';
import './CrosswordGame.css';

export default function DummyLeaderboard() {
  const entries = dummyTeams.map((name, i) => ({
    _id: `dummy-${i}`,
    teamName: name,
  }));

  return (
    <div className="crossword-page">
      <header className="crossword-header" style={{ justifyContent: 'center' }}>
        <div className="title-section" style={{ textAlign: 'center' }}>
          <h1>Leaderboard</h1>
          <div className="subtitle" style={{ marginLeft: 0, marginTop: '-5px' }}>ADVERT 3.0</div>
        </div>
      </header>

      <div style={{ padding: '20px 50px', maxWidth: '800px', margin: '0 auto' }}>
        <div className="admin-table-wrapper" style={{ border: '3px solid #12192e', boxShadow: '6px 6px 0px #c9df4a' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ fontSize: '1rem', padding: '16px' }}>Rank</th>
                <th style={{ fontSize: '1rem', padding: '16px' }}>Team Name</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => {
                let rankDisplay = `${i + 1}`;
                let rowStyle = {};
                
                if (i === 0) {
                  rankDisplay = '🥇 1st';
                  rowStyle = { background: '#fefce8' };
                } else if (i === 1) {
                  rankDisplay = '🥈 2nd';
                  rowStyle = { background: '#f8fafc' };
                } else if (i === 2) {
                  rankDisplay = '🥉 3rd';
                  rowStyle = { background: '#fff7ed' };
                }

                return (
                  <tr key={e._id} style={rowStyle}>
                    <td style={{ fontSize: '1.1rem', fontWeight: 700 }}>{rankDisplay}</td>
                    <td style={{ fontSize: '1.1rem', fontWeight: 600 }}>{e.teamName}</td>
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
