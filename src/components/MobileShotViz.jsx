import React, { useEffect, useMemo, useState } from 'react';

const getClubCategory = (clubName) => {
  const name = clubName?.toLowerCase() || '';
  if (name.includes('driver')) return 'driver';
  if (name.startsWith('wood') || name.includes('wood')) return 'wood';
  if (name.includes('hybrid')) return 'hybrid';
  if (name.includes('iron')) return 'iron';
  if (name.includes('wedge') || ['pw','gw','sw','lw'].includes(name)) return 'wedge';
  return 'iron';
};

const baseRollout = { driver: 30, wood: 22, hybrid: 18, iron: 12, wedge: 4 };

function computeShot(club, carryYds, windDir, windSpeed) {
  const category = getClubCategory(club);
  let carry = carryYds;
  if (windDir === 'into') carry += Math.round(windSpeed * 1.5);
  if (windDir === 'with') carry -= Math.round(windSpeed * 1.0);

  let rollout = baseRollout[category] ?? 10;
  if (windDir === 'into') rollout = Math.max(0, Math.round(rollout * 0.7));
  if (windDir === 'with') rollout = Math.round(rollout * 1.2);

  return { club, carry, rollout, total: carry + rollout, category };
}

export default function MobileShotViz({
  distances,           // { clubName: yards }
  recommendedClub,     // starting club id/name
  wind = 'none',
  windSpeed = 0,
}) {
  const entries = useMemo(() => Object.entries(distances || {}).sort((a, b) => a[1] - b[1]), [distances]);
  const startIndex = Math.max(0, entries.findIndex(([name]) => name === recommendedClub));
  const [index, setIndex] = useState(startIndex >= 0 ? startIndex : 0);

  useEffect(() => {
    const i = entries.findIndex(([name]) => name === recommendedClub);
    if (i >= 0) setIndex(i);
  }, [recommendedClub, entries]);

  const current = entries[index] || entries[0] || ['iron7', 150];
  const prev = entries[Math.max(0, index - 1)] || current;
  const next = entries[Math.min(entries.length - 1, index + 1)] || current;

  const shot = computeShot(current[0], current[1], wind, windSpeed);

  // SVG layout
  const width = 360;
  const height = 220;
  const teeX = 24;
  const groundY = 180;
  const maxAxis = Math.ceil((Math.max(180, shot.total + 20)) / 25) * 25;
  const xFromYards = (yds) => teeX + (yds / maxAxis) * (width - 48 - teeX);

  // Arc control based on category
  const apexFactorByCategory = { driver: 0.35, wood: 0.4, hybrid: 0.45, iron: 0.5, wedge: 0.6 };
  const apexFactor = apexFactorByCategory[shot.category] ?? 0.5;
  const ctrlX = (xFromYards(shot.carry) + teeX) / 2;
  const ctrlY = groundY - apexFactor * 120;

  const clubLabel = shot.club.replace(/(\d)/, ' $1').toUpperCase();

  return (
    <div className="shot-viz-card">
      <div className="shot-viz-header">
        <div className="club-name font-data">{clubLabel}</div>
        <div className="club-yards font-data">{shot.total}y</div>
      </div>

      <svg className="trajectory-svg" viewBox={`0 0 ${width} ${height}`} width="100%" height="260">
        <rect x="0" y="0" width={width} height={height} fill="var(--weathered-cream)" />
        {/* Ground */}
        <line x1={teeX} y1={groundY} x2={xFromYards(maxAxis)} y2={groundY} stroke="var(--leather-brown-light)" strokeWidth="2" />

        {/* Carry arc */}
        <path d={`M ${teeX},${groundY} Q ${ctrlX},${ctrlY} ${xFromYards(shot.carry)},${groundY}`} className="trajectory-arc" />
        {/* Roll */}
        <line x1={xFromYards(shot.carry)} y1={groundY} x2={xFromYards(shot.total)} y2={groundY} stroke="var(--golf-green)" strokeWidth="6" />
        <polygon points={`${xFromYards(shot.total)-8},${groundY-6} ${xFromYards(shot.total)},${groundY} ${xFromYards(shot.total)-8},${groundY+6}`} fill="var(--golf-green)" />

        {/* Landing zone */}
        <ellipse cx={xFromYards(shot.carry)} cy={groundY} rx="14" ry="10" className="landing-zone" />

        {/* Labels */}
        <text x={xFromYards(shot.carry)} y={groundY - 18} textAnchor="middle" className="label-strong">carry {shot.carry}y</text>
        <text x={xFromYards(shot.total)} y={groundY - 18} textAnchor="end" className="label-strong">total {shot.total}y</text>
      </svg>

      <div className="shot-quick-stats">
        <div className="stat"><span className="label">Carry</span><span className="value font-data">{shot.carry}y</span></div>
        <div className="stat"><span className="label">Roll</span><span className="value font-data">{shot.rollout}y</span></div>
        <div className="stat"><span className="label">Wind</span><span className="value font-data">{wind === 'none' ? '—' : `${windSpeed} ${wind}`}</span></div>
      </div>

      <div className="club-switcher">
        <button className="club-btn" onClick={() => setIndex(Math.max(0, index - 1))}>{prev[0].replace(/(\d)/,' $1')}</button>
        <button className="club-btn primary" onClick={() => setIndex(Math.min(entries.length - 1, index + 1))}>{next[0].replace(/(\d)/,' $1')}</button>
      </div>
    </div>
  );
}


