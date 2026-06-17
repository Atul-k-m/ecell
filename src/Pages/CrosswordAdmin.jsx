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
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const handleAuth = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      setAuthError('Incorrect password. Try again.');
    }
  };

  const fetchEntries = () => {
    setEntriesLoading(true);
    fetch('/api/crossword/entries')
      .then(r => r.json())
      .then(data => { if (data.success) setEntries(data.entries); })
      .finally(() => { setEntriesLoading(false); setLastRefreshed(new Date()); });
  };

  useEffect(() => {
    if (!authenticated) return;

    fetch('/api/crossword/status')
      .then(r => r.json())
      .then(data => { if (data.success) setIsStarted(data.isStarted); })
      .finally(() => setLoading(false));

    fetchEntries();

    // Auto-refresh entries every 10 seconds
    const interval = setInterval(fetchEntries, 10000);
    return () => clearInterval(interval);
  }, [authenticated]);

  const handleToggle = async (action) => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/crossword/status', {
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

  // Sort entries for Admin Dashboard
  const sortedEntries = [...entries].sort((a, b) => {
    // 1. Completed teams first
    const aCompleted = a.completedAt ? 1 : 0;
    const bCompleted = b.completedAt ? 1 : 0;
    if (aCompleted !== bCompleted) return bCompleted - aCompleted;

    // 2. If both completed, sort by Time (asc)
    if (aCompleted && bCompleted) {
      return a.timeTaken - b.timeTaken;
    }
    return 0; // Keep original order for uncompleted
  });

  // ── Admin Dashboard ──
  return (
    <div className="crossword-page">

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 className="admin-section-title" style={{ margin: 0 }}>Registered Teams ({entries.length})</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {lastRefreshed && <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Last updated: {lastRefreshed.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'short', timeStyle: 'short' })}</span>}
            <button
              onClick={fetchEntries}
              disabled={entriesLoading}
              style={{ padding: '8px 16px', background: '#12192e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', boxShadow: '3px 3px 0px #c9df4a', opacity: entriesLoading ? 0.6 : 1 }}
            >
              {entriesLoading ? 'Refreshing…' : '↻ Refresh'}
            </button>
          </div>
        </div>
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
                {sortedEntries.map((e, i) => (
                  <tr key={e._id}>
                    <td>{i + 1}</td>
                    <td><strong>{e.teamName}</strong></td>
                    <td>+91 {e.phone}</td>
                    <td>{new Date(e.registeredAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'short', timeStyle: 'short' })}</td>
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
