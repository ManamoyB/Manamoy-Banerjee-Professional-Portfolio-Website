import React, { useState } from 'react';

interface SkillsRadarChartProps {
  skills: { name: string; proficiency: number }[];
  colors: {
    primary: string;
    text: string;
    mutedText: string;
    borderColor: string;
    cardBg: string;
  };
}

export const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({ skills, colors }) => {
  const [hoveredPoint, setHoveredPoint] = useState<{ name: string; value: number; x: number; y: number } | null>(null);

  // Fallback if empty
  const data = skills.length >= 3 ? skills : [
    { name: 'Python', proficiency: 90 },
    { name: 'Machine Learning', proficiency: 85 },
    { name: 'PyTorch', proficiency: 80 },
    { name: 'PostgreSQL', proficiency: 75 },
    { name: 'Git', proficiency: 90 }
  ];

  const totalPoints = data.length;
  const width = 360;
  const height = 360;
  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = 120;

  // Concentric background circular polygon ranks
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Helper to compute radial coordinate
  const getCoordinates = (index: number, value: number) => {
    // Offset by -Math.PI / 2 to rotate the start to the absolute top vertical position
    const angle = (2 * Math.PI * index) / totalPoints - Math.PI / 2;
    const r = maxRadius * (value / 100);
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  };

  // 1. Grid Polygons lines (20%, 40%, 60%, 80%, 100%)
  const gridPolygons = levels.map((lvl) => {
    const pointsStr = Array.from({ length: totalPoints })
      .map((_, i) => {
        const { x, y } = getCoordinates(i, lvl * 100);
        return `${x},${y}`;
      })
      .join(' ');
    return pointsStr;
  });

  // 2. Main data polygon points
  const dataPoints = data.map((item, i) => getCoordinates(i, item.proficiency));
  const dataPolygonStr = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  // 3. Grid line axes projection vectors
  const axes = Array.from({ length: totalPoints }).map((_, i) => {
    const startPoint = { x: cx, y: cy };
    const endPoint = getCoordinates(i, 100);
    const labelAngle = (2 * Math.PI * i) / totalPoints - Math.PI / 2;
    // Push label out slightly beyond maximum radius
    const labelDistance = maxRadius + 22;
    const labelX = cx + labelDistance * Math.cos(labelAngle);
    const labelY = cy + labelDistance * Math.sin(labelAngle);

    // Text anchor alignments depending on where they are in circle
    let textAnchor = 'middle';
    if (Math.cos(labelAngle) > 0.15) textAnchor = 'start';
    if (Math.cos(labelAngle) < -0.15) textAnchor = 'end';

    return {
      name: data[i].name,
      value: data[i].proficiency,
      start: startPoint,
      end: endPoint,
      labelX,
      labelY,
      textAnchor
    };
  });

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-3xl border relative select-none overflow-visible group"
      style={{
        backgroundColor: colors.cardBg,
        borderColor: colors.borderColor
      }}
    >
      {/* Absolute Decorative Grid Background overlay */}
      <div className="absolute top-4 right-4 text-[10px] font-mono opacity-40 uppercase tracking-wider">
        Dimension: {totalPoints} Axes
      </div>

      <div className="relative overflow-visible w-full flex justify-center py-4">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          width="100%" 
          height="100%" 
          className="max-w-[325px] overflow-visible"
        >
          {/* Concentric Backing Polygons */}
          {gridPolygons.map((points, idx) => (
            <polygon
              key={idx}
              points={points}
              fill="none"
              stroke={colors.borderColor}
              strokeWidth="1"
              strokeDasharray={idx === levels.length - 1 ? 'none' : '4,4'}
              className="opacity-70"
            />
          ))}

          {/* Level indicators text */}
          {levels.map((lvl, idx) => {
            const valPercent = lvl * 100;
            const textY = cy - maxRadius * lvl + 4;
            return (
              <text
                key={idx}
                x={cx + 5}
                y={textY}
                className="text-[8px] font-mono fill-slate-500 select-none pointer-events-none"
              >
                {valPercent}%
              </text>
            );
          })}

          {/* Radial axis lines */}
          {axes.map((axis, i) => (
            <line
              key={i}
              x1={axis.start.x}
              y1={axis.start.y}
              x2={axis.end.x}
              y2={axis.end.y}
              stroke={colors.borderColor}
              strokeWidth="1"
              className="opacity-60"
            />
          ))}

          {/* Glow filter definition */}
          <defs>
            <filter id="radar-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Filled Data Area Polygon */}
          <polygon
            points={dataPolygonStr}
            fill={`${colors.primary}18`} // 10% opacity primary
            stroke={colors.primary}
            strokeWidth="2.5"
            className="transition-all duration-700 ease-out"
            filter="url(#radar-glow)"
          />

          {/* Interactive dots triggers and labels */}
          {dataPoints.map((pt, i) => (
            <g key={i} className="cursor-pointer group/dot">
              <circle
                cx={pt.x}
                cy={pt.y}
                r="5"
                fill="#ffffff"
                stroke={colors.primary}
                strokeWidth="2"
                onMouseEnter={() => setHoveredPoint({ name: data[i].name, value: data[i].proficiency, x: pt.x, y: pt.y })}
                onMouseLeave={() => setHoveredPoint(null)}
                className="hover:scale-130 transition-transform duration-150"
              />
              <circle
                cx={pt.x}
                cy={pt.y}
                r="10"
                fill={colors.primary}
                className="opacity-0 group-hover/dot:opacity-20 transition-opacity duration-150"
              />
            </g>
          ))}

          {/* Axis Labels */}
          {axes.map((axis, i) => (
            <text
              key={i}
              x={axis.labelX}
              y={axis.labelY}
              textAnchor={axis.textAnchor}
              dominantBaseline="middle"
              className="text-[9px] font-mono font-bold select-none pointer-events-none"
              fill={colors.text}
            >
              {axis.name.split(' ')[0]}
            </text>
          ))}
        </svg>

        {/* Floating details tooltip panel */}
        {hoveredPoint && (
          <div 
            className="absolute bg-slate-900 border border-indigo-500/30 text-white rounded-lg px-2.5 py-1.5 shadow-xl select-none pointer-events-none font-mono text-center flex flex-col items-center animate-fade-in"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100 - 15}%`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <span className="text-[9px] font-bold tracking-tight uppercase leading-none">{hoveredPoint.name}</span>
            <span className="text-[11px] font-black mt-0.5" style={{ color: colors.primary }}>{hoveredPoint.value}%</span>
          </div>
        )}
      </div>

      {/* Footer statistics listing summary values */}
      <div className="w-full pt-4 border-t border-dashed mt-2 select-none flex justify-around gap-2" style={{ borderColor: colors.borderColor }}>
        <div className="text-center">
          <span className="text-[8px] font-mono uppercase opacity-50 block">Average score</span>
          <span className="text-sm font-black font-mono" style={{ color: colors.primary }}>
            {(data.reduce((acc, current) => acc + current.proficiency, 0) / data.length).toFixed(1)}%
          </span>
        </div>
        <div className="text-center border-l border-dashed pl-4" style={{ borderColor: colors.borderColor }}>
          <span className="text-[8px] font-mono uppercase opacity-50 block">Quantified Nodes</span>
          <span className="text-sm font-black font-mono text-emerald-400">
            {data.length} Stacks
          </span>
        </div>
      </div>

    </div>
  );
};
