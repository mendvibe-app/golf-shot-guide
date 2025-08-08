import React, { useMemo } from 'react';

// Utility: classify club by name for rollout/dispersion modeling
const getClubCategory = (clubName) => {
  const name = clubName.toLowerCase();
  if (name.includes('driver')) return 'driver';
  if (name.startsWith('wood') || name.includes('wood')) return 'wood';
  if (name.includes('hybrid')) return 'hybrid';
  if (name.includes('iron')) return 'iron';
  if (name.includes('wedge') || ['pw', 'gw', 'sw', 'lw'].some(w => name === w)) return 'wedge';
  return 'iron';
};

// Base rollout by category (yards)
const baseRolloutByCategory = {
  driver: 30,
  wood: 22,
  hybrid: 18,
  iron: 12,
  wedge: 4,
};

// Base dispersion (total width in yards) by category
const baseDispersionByCategory = {
  driver: 24,
  wood: 20,
  hybrid: 16,
  iron: 12,
  wedge: 6,
};

function computeShotModel(clubName, carryYds, windDir, windSpeed) {
  const category = getClubCategory(clubName);
  // Adjust carry and rollout for wind
  let carry = carryYds;
  if (windDir === 'into') carry += Math.round(windSpeed * 1.5);
  if (windDir === 'with') carry -= Math.round(windSpeed * 1.0);

  let rollout = baseRolloutByCategory[category] ?? 10;
  if (windDir === 'into') rollout = Math.max(0, Math.round(rollout * 0.7));
  if (windDir === 'with') rollout = Math.round(rollout * 1.2);

  let dispersion = baseDispersionByCategory[category] ?? 10;
  // Crosswind not modeled here; keep simple. Slight increase with wind speed overall
  dispersion = Math.round(dispersion * (1 + Math.min(0.3, windSpeed / 60)));

  return {
    club: clubName,
    category,
    carry,
    rollout,
    total: carry + rollout,
    dispersion, // full width in yards
  };
}

const colors = {
  primary: 'var(--golf-green)',
  secondary: 'var(--leather-brown-light)',
  accent: 'var(--leather-brown)'
};

export default function DistanceVisualization({
  distances,           // { clubName: yards }
  selectedClub,        // string club id
  wind,                // 'none' | 'into' | 'with'
  windSpeed,           // number mph
  heightPx = 420       // visualization height for mobile clarity
}) {
  const model = useMemo(() => {
    if (!distances || !selectedClub) return null;
    const entries = Object.entries(distances).sort((a, b) => a[1] - b[1]);
    const selectedIndex = Math.max(0, entries.findIndex(([name]) => name === selectedClub));
    const below = entries[Math.max(0, selectedIndex - 1)];
    const current = entries[selectedIndex] ?? entries[0];
    const above = entries[Math.min(entries.length - 1, selectedIndex + 1)];

    const shots = [
      { key: 'below', data: below },
      { key: 'current', data: current },
      { key: 'above', data: above },
    ].map(({ key, data }) => {
      const [club, carry] = data;
      const stats = computeShotModel(club, carry, wind, windSpeed);
      return { key, ...stats };
    });

    const maxYard = Math.max(...shots.map(s => s.total));
    const maxAxis = Math.ceil((maxYard + 20) / 25) * 25; // round up to 25s

    return { shots, maxAxis };
  }, [distances, selectedClub, wind, windSpeed]);

  if (!model) return null;
  const { shots, maxAxis } = model;

  // Mobile-friendly SVG coordinate system so text remains readable
  const width = 360;   // logical viewBox width approximating phone width
  const height = 260;  // logical viewBox height
  const paddingLeft = 44;
  const paddingRight = 56; // extra right padding to avoid clipping
  const innerWidth = width - paddingLeft - paddingRight;

  const xFromYards = (yds) => paddingLeft + (yds / maxAxis) * innerWidth;

  // Visual styles per shot
  const strokeFor = (key) => (key === 'current' ? colors.primary : colors.secondary);
  const fillFor = (key) => (key === 'current' ? 'rgba(45,80,22,0.18)' : 'rgba(160,82,45,0.12)');

  return (
    <div className="authentic-card" style={{ background: 'var(--aged-white)', border: '1px solid var(--leather-brown-light)' }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={heightPx} preserveAspectRatio="xMidYMid meet">
        {/* Background */}
        <rect x="0" y="0" width={width} height={height} fill="var(--weathered-cream)" />

        {/* Yardage ticks */}
        {(() => {
          const step = maxAxis > 225 ? 100 : 50;
          return Array.from({ length: Math.floor(maxAxis / step) + 1 }, (_, i) => i * step);
        })().map((yd) => (
          <g key={yd} opacity="0.35">
            <line x1={xFromYards(yd)} y1={28} x2={xFromYards(yd)} y2={height - 28} stroke={colors.accent} strokeDasharray="6 8" />
            <text x={xFromYards(yd)} y={22} textAnchor="middle" fontSize="12" fill="var(--pencil-gray)" fontFamily="var(--font-data)">{yd}y</text>
          </g>
        ))}

        {/* Shots stacked in three lanes for readability */}
        {(() => {
          const laneYs = { below: height * 0.35, current: height * 0.55, above: height * 0.75 };
          return shots.map((s) => {
            const carryX = xFromYards(s.carry);
            const totalX = Math.min(xFromYards(s.total), width - paddingRight - 10);
            const y = laneYs[s.key] ?? height * 0.55;
            const dispersionRx = (s.dispersion / 2) * (innerWidth / maxAxis);
            return (
              <g key={s.key}>
                {/* lane guide */}
                <line x1={paddingLeft} y1={y} x2={xFromYards(maxAxis)} y2={y} stroke={colors.accent} strokeDasharray="2 6" opacity="0.3" />
                {/* carry segment */}
                <line x1={paddingLeft} y1={y} x2={carryX} y2={y} stroke={strokeFor(s.key)} strokeWidth={s.key === 'current' ? 8 : 5} strokeDasharray="10 6" />
                {/* landing ellipse (dispersion) */}
                <ellipse cx={carryX} cy={y} rx={dispersionRx} ry={s.key === 'current' ? 22 : 18} fill={fillFor(s.key)} stroke={strokeFor(s.key)} strokeWidth="2.5" />
                {/* rollout arrow */}
                <line x1={carryX} y1={y} x2={totalX - 12} y2={y} stroke={strokeFor(s.key)} strokeWidth={s.key === 'current' ? 6 : 4} />
                <polygon points={`${totalX - 12},${y - 7} ${totalX},${y} ${totalX - 12},${y + 7}`} fill={strokeFor(s.key)} />
                {/* labels with outline for readability */}
                <text x={carryX + 6} y={y - 18} textAnchor="start" fontSize="18" fill={strokeFor(s.key)} stroke="#fff" strokeWidth="3" paintOrder="stroke" fontFamily="var(--font-data)" fontWeight="700">
                  {s.club.toUpperCase()}
                </text>
                <text x={carryX + 6} y={y + 14} textAnchor="start" fontSize="14" fill="var(--pencil-gray)" stroke="#fff" strokeWidth="2" paintOrder="stroke" fontFamily="var(--font-data)">
                  carry {s.carry}y • roll {s.rollout}y
                </text>
                <text x={carryX + 6} y={y + 32} textAnchor="start" fontSize="16" fill={strokeFor(s.key)} stroke="#fff" strokeWidth="3" paintOrder="stroke" fontFamily="var(--font-data)" fontWeight="700">
                  total {s.total}y
                </text>
              </g>
            );
          });
        })()}

        {/* Legend */}
        {/* Legend simplified and centered */}
        <g transform={`translate(${width/2 - 80}, ${height - 20})`}>
          <line x1="0" y1="0" x2="36" y2="0" stroke={colors.primary} strokeWidth="6" strokeDasharray="10 6" />
          <text x="40" y="5" fontSize="12" fill="var(--pencil-gray)" fontFamily="var(--font-data)">carry</text>
          <line x1="84" y1="0" x2="118" y2="0" stroke={colors.primary} strokeWidth="6" />
          <polygon points={`118,-6 130,0 118,6`} fill={colors.primary} />
          <text x="134" y="5" fontSize="12" fill="var(--pencil-gray)" fontFamily="var(--font-data)">roll</text>
        </g>
      </svg>
    </div>
  );
}


