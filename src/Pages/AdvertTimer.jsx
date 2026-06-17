import React, { useState, useEffect } from 'react';
import './AdvertTimer.css';

export default function AdvertTimer() {
  const [totalTime, setTotalTime] = useState(5 * 60); // Default 5 mins
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const requestRef = React.useRef();
  const startTimeRef = React.useRef(null);
  const totalTimeMsRef = React.useRef(5 * 60 * 1000);
  const timeLeftMsRef = React.useRef(5 * 60 * 1000);

  // We keep a separate state for the UI updates so the arc can be ultra smooth
  const [smoothProgress, setSmoothProgress] = useState(1);
  const [displaySeconds, setDisplaySeconds] = useState(5 * 60);

  const updateTimer = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    
    let newTimeLeftMs = timeLeftMsRef.current - elapsed;
    if (newTimeLeftMs <= 0) {
      newTimeLeftMs = 0;
      setIsRunning(false);
    }

    const currentTotalMs = totalTimeMsRef.current;
    const currentProgress = currentTotalMs > 0 ? (newTimeLeftMs / currentTotalMs) : 0;
    
    setSmoothProgress(currentProgress);
    setDisplaySeconds(Math.ceil(newTimeLeftMs / 1000));

    if (newTimeLeftMs > 0) {
      startTimeRef.current = timestamp;
      timeLeftMsRef.current = newTimeLeftMs;
      requestRef.current = requestAnimationFrame(updateTimer);
    }
  };

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(updateTimer);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = (minutes) => {
    const ms = minutes * 60 * 1000;
    totalTimeMsRef.current = ms;
    timeLeftMsRef.current = ms;
    setSmoothProgress(1);
    setDisplaySeconds(minutes * 60);
    setTotalTime(minutes * 60);
    setIsRunning(false);
  };

  const handleCustomSet = (e) => {
    e.preventDefault();
    const mins = parseInt(customMinutes);
    if (!isNaN(mins) && mins > 0) {
      resetTimer(mins);
      setCustomMinutes("");
      setShowCustomInput(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const progress = smoothProgress;

  // Theme configuration based on 1/3rds
  let themeColor = "#22c55e"; // Green
  let glowColor = "rgba(34, 197, 94, 0.08)";
  let auroraColor = "rgba(34, 197, 94, 0.45)";
  let btnGlowColor = "rgba(34, 197, 94, 0.25)";
  let btnGlowHover = "rgba(34, 197, 94, 0.4)";
  let topGradient = "linear-gradient(90deg, #14532d, #22c55e, #14532d)";

  if (progress <= 0.333) {
    themeColor = "#ff2a00"; // Red
    glowColor = "rgba(255, 42, 0, 0.1)";
    auroraColor = "rgba(255, 42, 0, 0.45)";
    btnGlowColor = "rgba(255, 42, 0, 0.25)";
    btnGlowHover = "rgba(255, 42, 0, 0.4)";
    topGradient = "linear-gradient(90deg, #7f1d1d, #ff2a00, #7f1d1d)";
  } else if (progress <= 0.666) {
    themeColor = "#eab308"; // Yellow
    glowColor = "rgba(234, 179, 8, 0.08)";
    auroraColor = "rgba(234, 179, 8, 0.45)";
    btnGlowColor = "rgba(234, 179, 8, 0.25)";
    btnGlowHover = "rgba(234, 179, 8, 0.4)";
    topGradient = "linear-gradient(90deg, #713f12, #eab308, #713f12)";
  }

  // SVG calculations
  const cx = 500;
  const cy = 612.5;
  const radius = 512.5;
  const strokeWidth = 90;
  const ARC_LENGTH = 1383.2;
  const TOTAL_CIRCUMFERENCE = 3220.1;

  // Calculate moving indicator coordinates along the arc
  // angle goes from 192.6804 deg to 347.3196 deg
  const currentAngleDeg = 192.6804 + (progress * 154.6392);
  const currentAngleRad = currentAngleDeg * (Math.PI / 180);
  
  const innerNeedleR = radius - strokeWidth / 2 - 10;
  const outerNeedleR = radius + strokeWidth / 2 + 10;

  const needleX1 = cx + innerNeedleR * Math.cos(currentAngleRad);
  const needleY1 = cy + innerNeedleR * Math.sin(currentAngleRad);
  const needleX2 = cx + outerNeedleR * Math.cos(currentAngleRad);
  const needleY2 = cy + outerNeedleR * Math.sin(currentAngleRad);

  // Generate ticks
  const ticks = [];
  const numTicks = 120;
  for (let i = 0; i < numTicks; i++) {
    const angleDeg = 192.6804 + (i / (numTicks - 1)) * 154.6392;
    const rad = angleDeg * (Math.PI / 180);
    const tickStartR = radius + strokeWidth / 2 + 8;
    const tickEndR = radius + strokeWidth / 2 + 16;

    const x1 = cx + tickStartR * Math.cos(rad);
    const y1 = cy + tickStartR * Math.sin(rad);
    const x2 = cx + tickEndR * Math.cos(rad);
    const y2 = cy + tickEndR * Math.sin(rad);

    const progressAngle = 192.6804 + progress * 154.6392;
    const isActive = angleDeg <= progressAngle;

    ticks.push({ x1, y1, x2, y2, isActive });
  }

  return (
    <div 
      className="advert-timer-page" 
      style={{
        "--theme-color": themeColor,
        "--glow-color": glowColor,
        "--aurora-color": auroraColor,
        "--btn-glow-color": btnGlowColor,
        "--btn-glow-hover": btnGlowHover,
        "--top-gradient": topGradient
      }}
    >
      {/* Moving top gradient strip */}
      <div className="top-gradient-strip"></div>

      {/* Animated Aurora Spotlights */}
      <div className="aurora-container">
        <div className="aurora-beam aurora-beam-1"></div>
        <div className="aurora-beam aurora-beam-2"></div>
        <div className="aurora-beam aurora-beam-3"></div>
        <div className="aurora-beam aurora-beam-4"></div>
      </div>
      <div className="grid-overlay"></div>

      {/* Top Nav-Style Pill Container */}
      <div className="nav-pill">
        <div className="nav-brand">
          <span className="brand-dot"></span>
          ADVERT 3.0
        </div>
        
        <div className="nav-items">
          <button 
            className={`nav-item ${totalTime === 2 * 60 ? 'active' : ''}`}
            onClick={() => resetTimer(2)}
          >
            2 Min
          </button>
          <button 
            className={`nav-item ${totalTime === 3 * 60 ? 'active' : ''}`}
            onClick={() => resetTimer(3)}
          >
            3 Min
          </button>
          <button 
            className={`nav-item ${totalTime === 5 * 60 ? 'active' : ''}`}
            onClick={() => resetTimer(5)}
          >
            5 Min
          </button>
          
          {showCustomInput ? (
            <form onSubmit={handleCustomSet} className="nav-custom-form">
              <input 
                type="number"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                className="nav-custom-input"
                autoFocus
                onBlur={() => {
                  if (customMinutes === "") setShowCustomInput(false);
                }}
                placeholder="MINS"
                min="1"
              />
            </form>
          ) : (
            <button 
              className="nav-item"
              onClick={() => setShowCustomInput(true)}
            >
              Custom
            </button>
          )}
        </div>

        <button className="nav-action" onClick={toggleTimer}>
          {isRunning ? 'Pause' : 'Start Timer'}
        </button>
      </div>

      <div className="content-container">
        
      </div>

      <div className="timer-container">
        <svg viewBox="0 0 1000 500" className="timer-svg">
          <defs>
            <filter id="arc-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="needle-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Background track (empty part of arc) */}
          <path 
            d="M 0 500 A 512.5 512.5 0 0 1 1000 500"
            fill="none" 
            stroke="#141414" 
            strokeWidth={strokeWidth}
          />

          {/* Filled glowing progress arc */}
          <path 
            d="M 0 500 A 512.5 512.5 0 0 1 1000 500"
            fill="none" 
            stroke="var(--theme-color)" 
            strokeWidth={strokeWidth}
            strokeDasharray={`${ARC_LENGTH * progress} ${TOTAL_CIRCUMFERENCE}`}
            filter="url(#arc-glow)"
          />

          {/* Dynamic moving needle marker */}
          <line 
            x1={needleX1} 
            y1={needleY1} 
            x2={needleX2} 
            y2={needleY2} 
            stroke="var(--theme-color)" 
            strokeWidth="3.5"
            filter="url(#needle-glow)"
          />

          {/* Ticks along the outer edge */}
          {ticks.map((tick, i) => (
            <line 
              key={i}
              x1={tick.x1} 
              y1={tick.y1} 
              x2={tick.x2} 
              y2={tick.y2}
              stroke={tick.isActive ? "rgba(255, 255, 255, 0.35)" : "#222222"} 
              strokeWidth="1.5"
              style={{ transition: 'stroke 0.5s ease' }}
            />
          ))}
        </svg>

        {/* Floating time display centered in the arc */}
        <div className="time-display">
          <div className="time-label">Flow time</div>
          <div className="time-value">
            {formatTime(displaySeconds)}
          </div>
          <h2 className="timer-main-label">ADVERT 3.0</h2>
        </div>
      </div>
    </div>
  );
}
