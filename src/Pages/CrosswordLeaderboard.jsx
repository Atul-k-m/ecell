import React, { useState, useEffect } from 'react';
import './CrosswordGame.css';

export default function CrosswordLeaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/crossword/leaderboard');
        const data = await res.json();
        if (data.success) {
          setEntries(data.entries); // Already filtered & sorted by the API
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    if (!seconds) return '—';
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="crossword-page">
      <header className="crossword-header" style={{ justifyContent: 'center' }}>
        <div className="title-section" style={{ textAlign: 'center' }}>
          <h1>Leaderboard</h1>
          <div className="subtitle" style={{ marginLeft: 0, marginTop: '-5px' }}>ADVERT 3.0 Crossword</div>
        </div>
      </header>

      <div style={{ padding: '20px 50px', maxWidth: '800px', margin: '0 auto' }}>
        {loading && entries.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 600 }}>Loading rankings...</p>
        ) : entries.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1.2rem' }}>No teams have completed the puzzle yet.</p>
        ) : (
          <div className="admin-table-wrapper" style={{ border: '3px solid #12192e', boxShadow: '6px 6px 0px #c9df4a' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ fontSize: '1rem', padding: '16px' }}>Rank</th>
                  <th style={{ fontSize: '1rem', padding: '16px' }}>Team Name</th>
                  <th style={{ fontSize: '1rem', padding: '16px', textAlign: 'center' }}>Words Solved</th>
                  <th style={{ fontSize: '1rem', padding: '16px', textAlign: 'right' }}>Time Taken</th>
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
                      <td style={{ fontSize: '1.2rem', fontWeight: 700, color: '#3b82f6', textAlign: 'center' }}>
                        {e.solvedWordsCount || 0}
                      </td>
                      <td style={{ fontSize: '1.2rem', fontWeight: 700, color: '#16a34a', textAlign: 'right' }}>
                        {formatTime(e.timeTaken)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
