import React, { useState, useEffect, useMemo } from 'react';
import './AdvertLead.css';

const MAX_TEAMS = 15;

const TEAM_NAMES = [
  "Aura 999+",
  "MasterMonks",
  "Mango",
  "Vague Sense",
  "AVENGERS",
  "Achar-Papad",
  "JEEVAN",
  "Level X",
  "Dexter",
  "Team Spark",
  "Ai Avengers",
  "Nexora",
  "Lakshmi Chit Funds",
  "MODI-fy",
  "Ministry of Chaos",
];

const calculateR1Score = (correct, timeMinutes) => {
  if (correct === undefined || correct === null) return 0;
  const baseScore = (correct / 15) * 25;
  let timeBonus = 0;
  
  if (timeMinutes === undefined || timeMinutes === null || timeMinutes === "") {
    timeBonus = 0;
  } else {
    const t = parseFloat(timeMinutes);
    if (!isNaN(t)) {
      if (t <= 4) timeBonus = 5;
      else if (t <= 6) timeBonus = 4;
      else if (t <= 8) timeBonus = 3;
      else if (t <= 10) timeBonus = 2;
      else timeBonus = 0;
    }
  }
  return Math.min(30, baseScore + timeBonus);
};

const calculateR2Score = (correct) => {
  if (correct === undefined || correct === null) return 0;
  return Math.min(30, correct * 2);
};

export default function AdvertLead() {
  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('advert4Teams');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved teams");
      }
    }
    return Array.from({ length: MAX_TEAMS }, (_, i) => ({
      id: i + 1,
      name: TEAM_NAMES[i],
      r1Correct: "",
      r1Time: "",
      r2Correct: "",
      r3RawScore: 0
    }));
  });

  useEffect(() => {
    localStorage.setItem('advert4Teams', JSON.stringify(teams));
  }, [teams]);

  const updateTeam = (id, field, value) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const adjustR3Raw = (id, amount) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, r3RawScore: t.r3RawScore + amount } : t));
  };

  const processedTeams = useMemo(() => {
    const minR3Raw = Math.min(...teams.map(t => t.r3RawScore));
    const maxR3Raw = Math.max(...teams.map(t => t.r3RawScore));
    const highestAdjusted = maxR3Raw - minR3Raw;

    const processed = teams.map(t => {
      const r1Correct = t.r1Correct !== "" ? parseFloat(t.r1Correct) : 0;
      const r1Time = t.r1Time !== "" ? parseFloat(t.r1Time) : null;
      const r2Correct = t.r2Correct !== "" ? parseFloat(t.r2Correct) : 0;

      const r1Score = calculateR1Score(r1Correct, r1Time);
      const r2Score = calculateR2Score(r2Correct);
      
      let r3Normalized = 0;
      if (highestAdjusted > 0) {
        const adjustedScore = t.r3RawScore - minR3Raw;
        r3Normalized = (adjustedScore / highestAdjusted) * 40;
      }
      
      const totalScore = r1Score + r2Score + r3Normalized;

      return {
        ...t,
        r1Score,
        r2Score,
        r3Normalized,
        totalScore,
        r1TimeValue: r1Time !== null ? r1Time : 999999 // For sorting purposes
      };
    });

    return processed.sort((a, b) => {
      if (Math.abs(b.totalScore - a.totalScore) > 0.01) {
        return b.totalScore - a.totalScore;
      }
      if (Math.abs(b.r1Score - a.r1Score) > 0.01) {
        return b.r1Score - a.r1Score;
      }
      if (Math.abs(a.r1TimeValue - b.r1TimeValue) > 0.01) {
        return a.r1TimeValue - b.r1TimeValue; // Lower time is better
      }
      return b.r3Normalized - a.r3Normalized;
    });
  }, [teams]);

  const resetData = () => {
    if (window.confirm("Are you sure you want to reset all data?")) {
      setTeams(Array.from({ length: MAX_TEAMS }, (_, i) => ({
        id: i + 1,
        name: TEAM_NAMES[i],
        r1Correct: "",
        r1Time: "",
        r2Correct: "",
        r3RawScore: 0
      })));
    }
  };

  return (
    <div className="advert-lead-page">
      <header className="al-header">
        <h1>Advert 4.0 Round Calculator</h1>
        <button onClick={resetData} className="btn-reset">Reset Data</button>
      </header>

      <div className="al-content">
        <div className="al-inputs-section">
          <h2>Teams & Scoring</h2>
          <div className="table-responsive">
            <table className="al-table">
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th colSpan="2" className="border-left text-center">Round 1: Crossword</th>
                  <th className="border-left text-center">R2: Guess Ad</th>
                  <th className="border-left text-center">R3: Dumb Charades</th>
                </tr>
                <tr>
                  <th></th>
                  <th className="border-left sub-th">Correct (0-15)</th>
                  <th className="sub-th">Time (Mins)</th>
                  <th className="border-left sub-th">Correct (0-15)</th>
                  <th className="border-left sub-th">Score actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.map(t => (
                  <tr key={t.id}>
                    <td>
                      <input 
                        type="text" 
                        value={t.name} 
                        onChange={(e) => updateTeam(t.id, 'name', e.target.value)}
                        className="input-name"
                      />
                    </td>
                    <td className="border-left">
                      <input 
                        type="number" 
                        min="0" max="15" 
                        value={t.r1Correct} 
                        onChange={(e) => updateTeam(t.id, 'r1Correct', e.target.value)}
                        className="input-num"
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        placeholder="DNF"
                        value={t.r1Time} 
                        onChange={(e) => updateTeam(t.id, 'r1Time', e.target.value)}
                        className="input-time"
                      />
                    </td>
                    <td className="border-left">
                      <input 
                        type="number" 
                        min="0" max="15" 
                        value={t.r2Correct} 
                        onChange={(e) => updateTeam(t.id, 'r2Correct', e.target.value)}
                        className="input-num"
                      />
                    </td>
                    <td className="border-left r3-actions">
                      <div className="r3-controls">
                        <button onClick={() => adjustR3Raw(t.id, 2)} className="btn-r3">+2</button>
                        <button onClick={() => adjustR3Raw(t.id, 1)} className="btn-r3">+1</button>
                        <button onClick={() => adjustR3Raw(t.id, -1)} className="btn-r3 neg">-1</button>
                        <span className="r3-score-display">{t.r3RawScore}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="al-leaderboard-section">
          <h2>Live Leaderboard</h2>
          <div className="table-responsive">
            <table className="al-lb-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>R1 (30)</th>
                  <th>R2 (30)</th>
                  <th>R3 (40)</th>
                  <th>Total (100)</th>
                </tr>
              </thead>
              <tbody>
                {processedTeams.map((pt, index) => {
                  let rankClass = "";
                  if (index === 0) rankClass = "rank-gold";
                  else if (index === 1) rankClass = "rank-silver";
                  else if (index === 2) rankClass = "rank-bronze";

                  return (
                    <tr key={pt.id} className={rankClass}>
                      <td>#{index + 1}</td>
                      <td className="lb-name">{pt.name}</td>
                      <td>{pt.r1Score.toFixed(2)}</td>
                      <td>{pt.r2Score.toFixed(2)}</td>
                      <td>{pt.r3Normalized.toFixed(2)}</td>
                      <td className="lb-total">{pt.totalScore.toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
