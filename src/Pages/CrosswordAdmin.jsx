import React, { useState, useEffect } from 'react';
import './CrosswordGame.css';

const ADMIN_PASSWORD = 'ansuansu';

export default function CrosswordAdmin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [entries, setEntries] = useState([]);
  const [entriesLoading, setEntriesLoading] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      setAuthError('Incorrect password. Try again.');
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    fetch('http://localhost:3001/api/crossword/status')
      .then(r => r.json())
      .then(data => { if (data.success) setIsStarted(data.isStarted); })
      .finally(() => setLoading(false));

    setEntriesLoading(true);
    fetch('http://localhost:3001/api/crossword/entries')
      .then(r => r.json())
      .then(data => { if (data.success) setEntries(data.entries); })
      .finally(() => setEntriesLoading(false));
  }, [authenticated]);

  const handleToggle = async (action) => {
    setActionLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/crossword/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.success) setIsStarted(data.isStarted);
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return '—';
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ── Login Screen ──
  if (!authenticated) {
    return (
      <div className="crossword-page">
        <div className="floating-q q1">?</div>
        <div className="floating-q q2">?</div>
        <div className="floating-q q3">?</div>
        <div className="floating-q q5">?</div>
        <div className="floating-q q7">?</div>
        <div className="login-overlay">
          <div className="login-modal">
            <div className="login-brand">
              <h1>Admin</h1>
              <div className="subtitle">ADVERT 3.0</div>
            </div>
            <div className="login-divider" />
            <h2 className="login-title">Admin Access</h2>
            <p className="login-subtitle">Enter the admin password to control the game.</p>
            <form className="login-form" onSubmit={handleAuth} autoComplete="off">
              <div className="login-field">
                <label htmlFor="admin-pass">Password</label>
                <input
                  id="admin-pass"
                  type="password"
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={e => { setPasswordInput(e.target.value); setAuthError(''); }}
                />
              </div>
              {authError && <div className="login-error">{authError}</div>}
              <button type="submit" className="login-btn">Unlock →</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── Admin Dashboard ──
  return (
    <div className="crossword-page">
      <div className="floating-q q1">?</div>
      <div className="floating-q q5">?</div>
      <div className="floating-q q7">?</div>

      <header className="crossword-header">
        <div className="title-section">
          <h1>Admin</h1>
          <div className="subtitle">ADVERT 3.0</div>
        </div>
        <div className="header-right">
          <div
            className="timer-display"
            style={{
              background: isStarted ? '#dcfce7' : '#fee2e2',
              color: isStarted ? '#16a34a' : '#ef4444',
              boxShadow: `4px 4px 0px ${isStarted ? '#22c55e' : '#ef4444'}`,
            }}
          >
            {loading ? '…' : isStarted ? '🟢 LIVE' : '🔴 STOPPED'}
          </div>
        </div>
      </header>

      {/* Game Control Card */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', padding: '0 50px' }}>
        <div className="admin-card">
          <h2 className="admin-card-title">Game Control</h2>
          <p className="admin-card-sub">
            Toggle the crossword puzzle on/off for all participants.
          </p>
          <div className="admin-btn-row">
            <button
              className="admin-start-btn"
              onClick={() => handleToggle('start')}
              disabled={isStarted || actionLoading}
            >
              ▶ Start Game
            </button>
            <button
              className="admin-stop-btn"
              onClick={() => handleToggle('stop')}
              disabled={!isStarted || actionLoading}
            >
              ■ Stop Game
            </button>
          </div>
        </div>
      </div>

      {/* Entries Table */}
      <div style={{ padding: '40px 50px' }}>
        <h3 className="admin-section-title">Registered Teams ({entries.length})</h3>
        {entriesLoading ? (
          <p>Loading entries…</p>
        ) : entries.length === 0 ? (
          <p style={{ color: '#64748b' }}>No teams have registered yet.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team Name</th>
                  <th>Phone</th>
                  <th>Registered At</th>
                  <th>Completed</th>
                  <th>Time</th>
                  <th>Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, i) => (
                  <tr key={e._id}>
                    <td>{i + 1}</td>
                    <td><strong>{e.teamName}</strong></td>
                    <td>+91 {e.phone}</td>
                    <td>{new Date(e.registeredAt).toLocaleTimeString()}</td>
                    <td>{e.completedAt ? '✅' : '—'}</td>
                    <td>{formatTime(e.timeTaken)}</td>
                    <td>{e.accuracy != null ? `${e.accuracy}%` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
