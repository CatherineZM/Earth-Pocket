// Final working version: 8 clean waves, animated in sync, angled -45deg and locked to bottom-right

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NUM_WAVES = 8;

export default function Waves() {
  const pathRefs = useRef<SVGPathElement[]>([]);

  const width = 1000;
  const height = 1000; // Make this square to help with diagonal layout
  const points = 120;
  const baseAmplitude = 15;
  const frequency = Math.PI * 4; // 2 full sine cycles
  const speed = 0.002;

  const xPoints = Array.from({ length: points }, (_, i) => i * (width / (points - 1)));

  useEffect(() => {
    const angle = -Math.PI / 4;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const update = () => {
      const t = performance.now() * speed;

      for (let w = 0; w < NUM_WAVES; w++) {
        const amplitude = baseAmplitude * (1 + w * 0.2);

        const positions = xPoints.map((x) => {
          const normX = x / width;
          const waveY = Math.sin(normX * frequency) * Math.cos(t) * amplitude;
          const yOffset = (height / (NUM_WAVES + 1)) * (w + 1);
          const y = waveY + yOffset;

          // Rotate the final (x, y) point
          const rotatedX = x * cos - y * sin;
          const rotatedY = x * sin + y * cos;

          return {
            x: rotatedX + width * 0.5,   // shift right
            y: rotatedY + height * 0.5,  // shift down
          };
        });

        const d = catmullRomToBezier(positions);
        const path = pathRefs.current[w];
        if (path) path.setAttribute("d", d);
      }
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <div
      className="absolute bottom-0 right-0 z-[-1]"
      style={{
        width: "50vw", // enough space for rotated waves
        height: "50vw",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {Array.from({ length: NUM_WAVES }).map((_, i) => (
          <path
            key={i}
            ref={(el) => {
              if (el) pathRefs.current[i] = el;
            }}
            fill="none"
            stroke="#00000040"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
}

function catmullRomToBezier(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";

  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }

  return d;
}