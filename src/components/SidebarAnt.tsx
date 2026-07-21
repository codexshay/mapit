import React, { useState, useEffect, useRef } from 'react';

interface SidebarAntProps {
  theme: 'light' | 'dark';
}

export default function SidebarAnt({ theme }: SidebarAntProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ width: 260, height: 700 });

  // Current Ant Coordinates & Orientation
  const [x, setX] = useState<number>(30);
  const [y, setY] = useState<number>(150);
  const [angle, setAngle] = useState<number>(45);
  
  // Ant State
  const [state, setState] = useState<'walking' | 'idle' | 'carrying' | 'panicked'>('idle');
  const [hasLeaf, setHasLeaf] = useState<boolean>(false);

  // High resolution visual leg-oscillation phase
  const [wigglePhase, setWigglePhase] = useState<number>(0);

  // Physics refs to avoid React state dispatch thrashing on every frame
  const posRef = useRef({
    x: 30,
    y: 150,
    angle: 45,
    targetX: 100,
    targetY: 300,
    state: 'idle' as 'walking' | 'idle' | 'carrying' | 'panicked',
    idleTicks: 1000,
    panicTicks: 0,
    hasLeaf: false,
    wigglePhase: 0
  });

  // Monitor the container bounds to constrain coordinates correctly
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setBounds({ 
          width: width > 0 ? width : 72, 
          height: height > 0 ? height : 600 
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Main high-performance simulation loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const deltaTime = time - lastTime;
      const dt = Math.min(deltaTime, 100); 
      lastTime = time;

      const p = posRef.current;
      let speed = 0.22;

      if (p.state === 'panicked') {
        speed = 0.85;
      } else if (p.state === 'carrying') {
        speed = 0.14;
      } else if (p.state === 'idle') {
        speed = 0;
      }

      // Idle behavior
      if (p.state === 'idle') {
        p.idleTicks -= dt;
        if (p.idleTicks <= 0) {
          p.state = Math.random() < 0.25 ? 'carrying' : 'walking';
          p.hasLeaf = Math.random() < 0.4;
          const margin = 16;
          const w = Math.max(40, bounds.width);
          const h = Math.max(40, bounds.height);
          p.targetX = margin + Math.random() * (w - margin * 2);
          p.targetY = margin + Math.random() * (h - margin * 2);
          
          setHasLeaf(p.hasLeaf);
          setState(p.state);
        }
      }

      // Panic behavior
      if (p.state === 'panicked') {
        p.panicTicks -= dt;
        if (p.panicTicks <= 0) {
          p.state = 'walking';
          setState('walking');
        }
      }

      // Movement behavior
      if (speed > 0) {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 4) {
          p.state = 'idle';
          p.idleTicks = 1200 + Math.random() * 2500;
          setState('idle');
        } else {
          const targetRad = Math.atan2(dy, dx);
          let targetDeg = targetRad * (180 / Math.PI);
          
          let diff = targetDeg - p.angle;
          while (diff < -180) diff += 360;
          while (diff > 180) diff -= 360;

          const maxRotationSpeed = p.state === 'panicked' ? 1.2 : 0.45;
          const stepAngle = Math.max(-maxRotationSpeed * dt, Math.min(maxRotationSpeed * dt, diff));
          p.angle = (p.angle + stepAngle + 360) % 360;

          p.wigglePhase = (p.wigglePhase + speed * dt * 0.1) % (Math.PI * 2);

          const sAngleRad = (p.angle + Math.sin(time * 0.02) * (p.state === 'panicked' ? 8 : 2)) * (Math.PI / 180);
          const stepLen = speed * dt;
          
          const nextX = p.x + Math.cos(sAngleRad) * stepLen;
          const nextY = p.y + Math.sin(sAngleRad) * stepLen;

          const margin = 12;
          p.x = Math.max(margin, Math.min(nextX, bounds.width - margin));
          p.y = Math.max(margin, Math.min(nextY, bounds.height - margin));

          // Sync position to React state cleanly once per frame
          setX(p.x);
          setY(p.y);
          setAngle(p.angle);
          setWigglePhase(p.wigglePhase);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [bounds.width, bounds.height]);

  // Handle click / taps on the ant
  const handleAntClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const p = posRef.current;
    p.hasLeaf = Math.random() < 0.5;
    p.state = 'panicked';
    p.panicTicks = 1200 + Math.random() * 1200;

    const margin = 14;
    p.targetX = margin + Math.random() * (bounds.width - margin * 2);
    p.targetY = margin + Math.random() * (bounds.height - margin * 2);

    setHasLeaf(p.hasLeaf);
    setState('panicked');
  };

  const antBodyColor = theme === 'light' ? '#334155' : '#10b981';
  const antLeafColor = '#22c55e';

  const legAngle1 = Math.sin(wigglePhase) * 22;
  const legAngle2 = Math.cos(wigglePhase) * 22;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <div
        className="absolute pointer-events-auto cursor-pointer transition-transform duration-75 ease-out select-none"
        style={{
          transform: `translate3d(${x - 12}px, ${y - 12}px, 0px) rotate(${angle}deg)`,
          width: '24px',
          height: '24px',
        }}
        onClick={handleAntClick}
        title="Interactive Pathfinder Ant Companion"
      >
        <svg viewBox="0 0 40 40" className="w-full h-full overflow-visible drop-shadow-md">
          {/* Ant Body */}
          <g>
            {/* Abdomen */}
            <ellipse cx="12" cy="20" rx="7" ry="5" fill={antBodyColor} />
            {/* Thorax */}
            <ellipse cx="22" cy="20" rx="4" ry="3.5" fill={antBodyColor} />
            {/* Head */}
            <circle cx="30" cy="20" r="3.5" fill={antBodyColor} />

            {/* Left Legs */}
            <line x1="22" y1="20" x2="16" y2="12" stroke={antBodyColor} strokeWidth="1.2" transform={`rotate(${legAngle1}, 22, 20)`} />
            <line x1="22" y1="20" x2="22" y2="10" stroke={antBodyColor} strokeWidth="1.2" transform={`rotate(${-legAngle2}, 22, 20)`} />
            <line x1="22" y1="20" x2="28" y2="11" stroke={antBodyColor} strokeWidth="1.2" transform={`rotate(${legAngle1}, 22, 20)`} />

            {/* Right Legs */}
            <line x1="22" y1="20" x2="16" y2="28" stroke={antBodyColor} strokeWidth="1.2" transform={`rotate(${-legAngle1}, 22, 20)`} />
            <line x1="22" y1="20" x2="22" y2="30" stroke={antBodyColor} strokeWidth="1.2" transform={`rotate(${legAngle2}, 22, 20)`} />
            <line x1="22" y1="20" x2="28" y2="29" stroke={antBodyColor} strokeWidth="1.2" transform={`rotate(${-legAngle1}, 22, 20)`} />

            {/* Antennae */}
            <path d="M32 18 Q36 14 38 12" fill="none" stroke={antBodyColor} strokeWidth="1" />
            <path d="M32 22 Q36 26 38 28" fill="none" stroke={antBodyColor} strokeWidth="1" />

            {/* Tiny Leaf */}
            {hasLeaf && (
              <path
                d="M 30 18 C 34 12, 40 12, 38 18 C 36 24, 30 20, 30 18 Z"
                fill={antLeafColor}
                opacity={0.9}
              />
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}
