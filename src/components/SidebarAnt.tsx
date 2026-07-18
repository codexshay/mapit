import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface SidebarAntProps {
  theme: 'light' | 'dark';
}

export default function SidebarAnt({ theme }: SidebarAntProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ width: 260, height: 700 });

  // Current Ant Coordinates & Orientation
  const [x, setX] = useState<number>(30);
  const [y, setY] = useState<number>(150);
  const [angle, setAngle] = useState<number>(45); // degrees (0 is looking right)
  
  // Navigation Targets
  const [targetX, setTargetX] = useState<number>(100);
  const [targetY, setTargetY] = useState<number>(300);
  
  // Ant State
  // 'walking' | 'idle' | 'carrying' | 'panicked'
  const [state, setState] = useState<'walking' | 'idle' | 'carrying' | 'panicked'>('idle');
  const [hasLeaf, setHasLeaf] = useState<boolean>(false);
  const [panicTicks, setPanicTicks] = useState<number>(0);
  const [idleTicks, setIdleTicks] = useState<number>(0);

  // High resolution visual leg-oscillation phase
  const [wigglePhase, setWigglePhase] = useState<number>(0);

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

  // Clamp position to bounds when bounds change (e.g. sidebar expand/minimize)
  useEffect(() => {
    setX((prev) => {
      const margin = 12;
      const maxW = bounds.width - margin;
      return Math.max(margin, Math.min(prev, maxW));
    });
    setY((prev) => {
      const margin = 12;
      const maxH = bounds.height - margin;
      return Math.max(margin, Math.min(prev, maxH));
    });
  }, [bounds]);

  // Main high-performance simulation loop (runs on requestAnimationFrame)
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const deltaTime = time - lastTime;
      // Cap delta time to prevent giant jumps when tab sits inactive
      const dt = Math.min(deltaTime, 100); 
      lastTime = time;

      setState((currentState) => {
        let nextState = currentState;
        let speed = 0.22; // pixels per ms max walking (gentler and less distractive)
        
        if (currentState === 'panicked') {
          speed = 0.9; // paced scurrying!
        } else if (currentState === 'carrying') {
          speed = 0.14; // loaded ant travels slightly slower
        } else if (currentState === 'idle') {
          speed = 0;
        }

        if (currentState === 'idle') {
          setIdleTicks((ticksLeft) => {
            if (ticksLeft <= dt) {
              // Walk to a new spot inside our container bounds
              nextState = Math.random() < 0.2 ? 'carrying' : 'walking';
              setHasLeaf(Math.random() < 0.4);
              const margin = 16;
              const w = Math.max(40, bounds.width);
              const h = Math.max(40, bounds.height);
              setTargetX(margin + Math.random() * (w - margin * 2));
              setTargetY(margin + Math.random() * (h - margin * 2));
              return 0;
            }
            return ticksLeft - dt;
          });
        }

        if (currentState === 'panicked') {
          setPanicTicks((ticksLeft) => {
            if (ticksLeft <= dt) {
              nextState = 'walking';
              return 0;
            }
            return ticksLeft - dt;
          });
        }

        // 2. Physics & Navigation updates if moving
        if (speed > 0) {
          setX((currX) => {
            setY((currY) => {
              setAngle((currAngle) => {
                const dx = targetX - currX;
                const dy = targetY - currY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Distance threshold to reach coordinate target
                if (dist < 4) {
                  // Arrived at destination!
                  nextState = 'idle';
                  setIdleTicks(800 + Math.random() * 2000);
                  return currAngle;
                }

                // Smooth angle turn towards target
                const targetRad = Math.atan2(dy, dx);
                let targetDeg = targetRad * (180 / Math.PI);
                
                // Keep target angle and current angle in continuous interval for beautiful interpolation
                let diff = targetDeg - currAngle;
                while (diff < -180) diff += 360;
                while (diff > 180) diff -= 360;

                const maxRotationSpeed = currentState === 'panicked' ? 1.2 : 0.45; // degrees per ms
                const stepAngle = Math.max(-maxRotationSpeed * dt, Math.min(maxRotationSpeed * dt, diff));
                const newAngle = (currAngle + stepAngle + 360) % 360;

                // Alternate foot wiggling phase!
                setWigglePhase((prev) => (prev + speed * dt * 0.1) % (Math.PI * 2));

                // Step along current angle (with dynamic micro wiggle for biological scurrying feel)
                const sAngleRad = (newAngle + Math.sin(time * 0.02) * (currentState === 'panicked' ? 8 : 2)) * (Math.PI / 180);
                const stepLen = speed * dt;
                
                const nextX = currX + Math.cos(sAngleRad) * stepLen;
                const nextY = currY + Math.sin(sAngleRad) * stepLen;

                // Commit positions inside valid margins
                const margin = 12;
                const boundedX = Math.max(margin, Math.min(nextX, bounds.width - margin));
                const boundedY = Math.max(margin, Math.min(nextY, bounds.height - margin));

                // Trigger state synchronization by assigning locally
                setTimeout(() => {
                  setX(boundedX);
                  setY(boundedY);
                }, 0);

                return newAngle;
              });
              return currY;
            });
            return currX;
          });
        }

        return nextState;
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetX, targetY, bounds.width, bounds.height]);

  // Handle click / taps on the ant (shock / panic response)
  const handleAntClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid unwanted parent bubble events
    const willCarryLeaf = Math.random() < 0.5; // 50% chance to carry a cute tiny leaf on this journey!
    setHasLeaf(willCarryLeaf);
    setState('panicked');
    setPanicTicks(1200 + Math.random() * 1200); // Scurry frantically at first, then transition back to normal walk and stop

    // Pick a frantic getaway spot far away!
    const margin = 14;
    setTargetX(margin + Math.random() * (bounds.width - margin * 2));
    setTargetY(margin + Math.random() * (bounds.height - margin * 2));
  };

  // Ant element color definition based on current theme to guarantee high visibility
  const antBodyColor = theme === 'light' ? '#334155' : '#10b981'; // slate dark vs. neon emerald green
  const antLeafColor = '#22c55e'; // Vibrant green for the leaf

  // Calculate leg rotations based on leg wiggle phase
  const legAngle1 = Math.sin(wigglePhase) * 22;
  const legAngle2 = Math.cos(wigglePhase) * 22;
  const legAngle3 = Math.sin(wigglePhase + Math.PI / 2) * 22;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden"
      id="sidebar-strolling-ant-container"
    >
      {/* The Ant Body Group */}
      <div
        onClick={handleAntClick}
        style={{
          left: `${x}px`,
          top: `${y}px`,
          transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
          transition: 'transform 0.04s linear',
        }}
        className="absolute w-8 h-8 pointer-events-auto cursor-pointer group flex items-center justify-center"
        id="crawling-ant-element"
        title="Friendly MapIT crawling support ant! Click him to play."
      >
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
        >
          {/* Ant Legs Left */}
          {/* Front Left */}
          <line 
            x1="12" y1="12" x2="4" y2="9" 
            stroke={antBodyColor} strokeWidth="1.5" strokeLinecap="round" 
            style={{ transformOrigin: '12px 12px', transform: `rotate(${legAngle1}deg)` }}
          />
          {/* Middle Left */}
          <line 
            x1="12" y1="15" x2="3" y2="15" 
            stroke={antBodyColor} strokeWidth="1.5" strokeLinecap="round"
            style={{ transformOrigin: '12px 15px', transform: `rotate(${legAngle2}deg)` }}
          />
          {/* Back Left */}
          <line 
            x1="12" y1="18" x2="4" y2="21" 
            stroke={antBodyColor} strokeWidth="1.5" strokeLinecap="round"
            style={{ transformOrigin: '12px 18px', transform: `rotate(${legAngle3}deg)` }}
          />

          {/* Ant Legs Right */}
          {/* Front Right */}
          <line 
            x1="20" y1="12" x2="28" y2="9" 
            stroke={antBodyColor} strokeWidth="1.5" strokeLinecap="round"
            style={{ transformOrigin: '20px 12px', transform: `rotate(${-legAngle2}deg)` }}
          />
          {/* Middle Right */}
          <line 
            x1="20" y1="15" x2="29" y2="15" 
            stroke={antBodyColor} strokeWidth="1.5" strokeLinecap="round"
            style={{ transformOrigin: '20px 15px', transform: `rotate(${-legAngle3}deg)` }}
          />
          {/* Back Right */}
          <line 
            x1="20" y1="18" x2="28" y2="21" 
            stroke={antBodyColor} strokeWidth="1.5" strokeLinecap="round"
            style={{ transformOrigin: '20px 18px', transform: `rotate(${-legAngle1}deg)` }}
          />

          {/* Antennae */}
          <path 
            d="M13,8 C11,4 9,5 8,6" 
            stroke={antBodyColor} strokeWidth="1.2" strokeLinecap="round" fill="none" 
          />
          <path 
            d="M19,8 C21,4 23,5 24,6" 
            stroke={antBodyColor} strokeWidth="1.2" strokeLinecap="round" fill="none" 
          />

          {/* Head */}
          <circle cx="16" cy="10" r="3.2" fill={antBodyColor} />
          
          {/* Thorax (Middle segment) */}
          <circle cx="16" cy="15" r="2.4" fill={antBodyColor} />
          
          {/* Abdomen (Rear segment) */}
          <ellipse cx="16" cy="21.5" rx="3.5" ry="4.8" fill={antBodyColor} />

          {/* Small shiny accents on the abdomen */}
          <ellipse cx="15.2" cy="19.5" rx="0.8" ry="1.5" fill="white" opacity="0.3" />

          {/* Tiny Glow Eyes (Helpful indicator of orientation and alertness) */}
          <circle cx="14.8" cy="9.2" r="0.6" fill={state === 'panicked' ? '#ef4444' : '#ffffff'} />
          <circle cx="17.2" cy="9.2" r="0.6" fill={state === 'panicked' ? '#ef4444' : '#ffffff'} />

          {/* Optional Leaf being carried by the ant! */}
          {hasLeaf && (
            <g style={{ transform: 'translate(10px, 1px) rotate(-15deg)' }}>
              {/* Stem */}
              <line x1="5" y1="7" x2="8" y2="3" stroke={antLeafColor} strokeWidth="1.2" />
              {/* Leaf Blade */}
              <path 
                d="M8,3 C12,-1 15,-1 14,3 C13,7 9,5 8,3 Z" 
                fill={antLeafColor} 
                opacity="0.95" 
              />
              {/* Leaf veins */}
              <path d="M9.5,2.5 L12.5,1.5" stroke="#15803d" strokeWidth="0.8" />
              <path d="M10.5,3.5 L13.5,3" stroke="#15803d" strokeWidth="0.8" />
            </g>
          )}
        </svg>

        {/* Small pointer indicators when hovered inside sidebar to prompt click */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 border-2 border-dashed border-cyan-400/0 rounded-full group-hover:border-cyan-400/40 opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </div>
    </div>
  );
}
