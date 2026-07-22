'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Yoca — living system diagram (hero visual).
 * A modular node flow derived from the fragmented-Y geometry:
 * Brand → Identity → Experience → Growth → Scale, drawn as connected
 * square nodes on a grid with pulses travelling along the connectors.
 * Geometric and editorial — no particles, no spheres, no matrix rain.
 */

const NODES: Array<{ id: string; x: number; y: number; size: number; fill: string; label: string }> = [
  { id: 'brand', x: 30, y: 40, size: 26, fill: '#A2FF00', label: 'Brand' },
  { id: 'identity', x: 120, y: 92, size: 22, fill: '#FFFFFF', label: 'Identity' },
  { id: 'experience', x: 210, y: 44, size: 22, fill: '#FFFFFF', label: 'Experience' },
  { id: 'growth', x: 296, y: 108, size: 26, fill: '#40C401', label: 'Growth' },
  { id: 'scale', x: 372, y: 40, size: 30, fill: '#A2FF00', label: 'Scale' },
];

const LINKS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
];

function center(node: (typeof NODES)[number]) {
  return { cx: node.x + node.size / 2, cy: node.y + node.size / 2 };
}

export default function HeroSystemDiagram() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[460px] select-none">
      <svg viewBox="0 0 430 190" className="h-auto w-full overflow-visible">
        {/* Dot grid backdrop */}
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 13 }).map((__, col) => (
            <rect
              key={`${row}-${col}`}
              x={10 + col * 34}
              y={8 + row * 32}
              width="2"
              height="2"
              fill="rgba(255,255,255,0.10)"
            />
          )),
        )}

        {/* Connectors */}
        {LINKS.map(([from, to], index) => {
          const a = center(NODES[from]);
          const b = center(NODES[to]);
          return (
            <g key={index}>
              <line
                x1={a.cx}
                y1={a.cy}
                x2={b.cx}
                y2={b.cy}
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1.5"
              />
              {!prefersReducedMotion && (
                <motion.rect
                  width="5"
                  height="5"
                  fill="#A2FF00"
                  initial={{ x: a.cx - 2.5, y: a.cy - 2.5, opacity: 0 }}
                  animate={{
                    x: [a.cx - 2.5, b.cx - 2.5],
                    y: [a.cy - 2.5, b.cy - 2.5],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.6,
                    delay: index * 0.9,
                    repeat: Infinity,
                    repeatDelay: LINKS.length * 0.9 - 1.6 + 0.9,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((node, index) => (
          <g key={node.id}>
            <motion.rect
              x={node.x}
              y={node.y}
              width={node.size}
              height={node.size}
              fill={node.fill}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
              style={{ transformOrigin: `${node.x + node.size / 2}px ${node.y + node.size / 2}px` }}
            />
            {/* Pulse ring on system nodes */}
            {!prefersReducedMotion && node.fill !== '#FFFFFF' && (
              <motion.rect
                x={node.x - 5}
                y={node.y - 5}
                width={node.size + 10}
                height={node.size + 10}
                fill="none"
                stroke={node.fill}
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.55, 0], scale: [0.9, 1.12, 1.2] }}
                transition={{
                  duration: 2.6,
                  delay: 1 + index * 0.5,
                  repeat: Infinity,
                  repeatDelay: 1.6,
                }}
                style={{
                  transformOrigin: `${node.x + node.size / 2}px ${node.y + node.size / 2}px`,
                }}
              />
            )}
            <text
              x={node.x + node.size / 2}
              y={node.y + node.size + 16}
              textAnchor="middle"
              fill="rgba(255,255,255,0.55)"
              fontSize="10"
              fontWeight="700"
              letterSpacing="0.08em"
            >
              {node.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
