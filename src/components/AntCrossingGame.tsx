import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, RotateCcw, Volume2, VolumeX, Shield, Award, 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap, Target
} from 'lucide-react';

interface Vehicle {
  x: number;
  width: number;
  color: string;
  speed: number;
  type: 'speedster' | 'packet' | 'microchip' | 'firewall';
  label: string;
}

interface Lane {
  y: number;
  height: number;
  speed: number;
  color: string;
  vehicles: Vehicle[];
}

function AntCrossingGame({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  const isLightTheme = theme === 'light';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Game state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [lives, setLives] = useState<number>(3);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('ant_high_score') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<'idle' | 'collided' | 'success' | 'gameover' | 'victory'>('idle');
  const [activeMessage, setActiveMessage] = useState<string>('SYS_READY: ANT ENGINE INITIALIZED.');

  // Scale-down: Ant size (width: 14, height: 16) fits narrow lanes
  const antRef = useRef({
    x: 400,
    y: 190,
    width: 14,
    height: 16,
    speed: 5.5,
    glowTicks: 0,
    isMoving: false,
    facing: 'UP' as 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
  });

  // Random top gate/destination uplink
  const targetGateRef = useRef({
    x: 350,
    width: 28,
    pulse: 0,
    successGlow: 0,
    direction: 1
  });

  // Segway hazard ref
  const segwayRef = useRef({
    x: -200,
    y: 8,
    width: 25,
    height: 25,
    speed: -5,
    active: false,
    color: '#ff0055'
  });

  // Bottom starting footpath blocker segway ref (at level 8+ if ant stalls in safe bottom zone >8s)
  const bottomSegwayRef = useRef({
    x: -200,
    y: 188,
    width: 25,
    height: 25,
    speed: -3,
    active: false,
    color: '#eb5e28'
  });

  // Countdown timer for level 8-10 slow starts
  const idleTimerRef = useRef<number>(0);

  // Game input states
  const keysPressedRef = useRef<{ [key: string]: boolean }>({});
  const activeTouchDirRef = useRef<'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | null>(null);
  const moveSoundTickRef = useRef<number>(0);

  // Audio Synth Generator (No-crash/graceful Web Audio)
  const playSound = (type: 'move' | 'crash' | 'win' | 'gameover' | 'start') => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      if (type === 'move') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'crash') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'win') {
        const now = ctx.currentTime;
        const freps = [350, 440, 523, 659, 880];
        freps.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.1, now + idx * 0.07);
          gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.07 + 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.13);
        });
      } else if (type === 'start') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(580, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'gameover') {
        const now = ctx.currentTime;
        const freps = [280, 220, 160, 100];
        freps.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.18, now + idx * 0.12);
          gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.12 + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.2);
        });
      }
    } catch (e) {
      // Browsers block autoplay context occasionally
    }
  };

  // Generate randomized uplink gateway at the top
  const randomizeGate = () => {
    const padding = 80;
    const x = padding + Math.random() * (800 - padding * 2 - targetGateRef.current.width);
    targetGateRef.current.x = x;
    targetGateRef.current.successGlow = 0;
  };

  // 4 Compact lanes to fit narrow look (height = 220)
  const lanesRef = useRef<Lane[]>([
    { y: 40, height: 34, speed: -1.6, color: 'rgba(29, 78, 216, 0.15)', vehicles: [] }, // fast microchips
    { y: 74, height: 34, speed: -2.8, color: 'rgba(12, 14, 21, 0.4)', vehicles: [] },  // hyper speed ster data
    { y: 108, height: 34, speed: -1.9, color: 'rgba(29, 78, 216, 0.15)', vehicles: [] }, // cyber data packets
    { y: 142, height: 34, speed: -1.3, color: 'rgba(12, 14, 21, 0.4)', vehicles: [] }   // legacy network nodes
  ]);

  // Handle vehicle spawning inside traffic lanes
  const updateTraffic = (l: number) => {
    // Fair difficulty scaling curves:
    // Speed scales from x0.85 (lvl 1) to x3.0 (lvl 10)
    const speedMult = 0.85 + (l - 1) * 0.245;
    
    // Density scaling: level 1-3 has max 1 vehicle per lane, level 4-7 has 2 max, level 8+ has 3 max
    const densityLimit = l >= 8 ? 3 : (l >= 4 ? 2 : 1); 

    lanesRef.current.forEach((lane) => {
      lane.vehicles.forEach((v) => {
        v.x += lane.speed * speedMult;
      });

      // Filter out vehicles that flew past screen
      lane.vehicles = lane.vehicles.filter((v) => v.x + v.width > -50);

      // Try to spawn new vehicle from the right helper bounds (around x=820)
      if (lane.vehicles.length < densityLimit) {
        let canSpawn = true;
        if (lane.vehicles.length > 0) {
          const lastV = lane.vehicles[lane.vehicles.length - 1];
          // Ensure safer distance thresholds based on vehicle speeds & levels
          const safeDistance = Math.max(160, 260 - (l * 12));
          if (lastV.x > (800 - safeDistance)) {
            canSpawn = false;
          }
        }

        if (canSpawn && Math.random() < 0.022) {
          const types: ('speedster' | 'packet' | 'microchip' | 'firewall')[] = [
            'speedster', 'packet', 'microchip', 'firewall'
          ];
          const type = types[Math.floor(Math.random() * types.length)];
          
          let width = 35;
          let color = '#fb7185'; // Soft red
          let label = 'DATA';

          if (type === 'firewall') {
            width = 48;
            color = '#f43f5e';
            label = 'FIRE';
          } else if (type === 'speedster') {
            width = 25;
            color = '#fbbf24';
            label = 'FAST';
          } else if (type === 'microchip') {
            width = 38;
            color = '#a855f7';
            label = 'CHIP';
          }

          lane.vehicles.push({
            x: 820,
            width,
            color,
            speed: lane.speed * speedMult,
            type,
            label
          });
        }
      }
    });
  };

  // Reset Ant player starting location in compact view
  const resetAntPosition = () => {
    antRef.current.x = 400;
    antRef.current.y = 190;
    antRef.current.isMoving = false;
    antRef.current.facing = 'UP';
    keysPressedRef.current = {};
    activeTouchDirRef.current = null;
    moveSoundTickRef.current = 0;
    
    // Deactivate security segway on reset
    segwayRef.current.active = false;
    bottomSegwayRef.current.active = false;
    idleTimerRef.current = 0;
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameResult === 'collided' || gameResult === 'gameover' || gameResult === 'victory') return;
      
      const key = e.key.toLowerCase();
      
      // Prevent browser viewport scrolling when actively playing
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 's', 'a', 'd', ' '].includes(key)) {
        e.preventDefault();
      }
      
      keysPressedRef.current[key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressedRef.current[key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, gameResult]);

  // Click & tap nudge control for instant responsiveness
  const clickManualControl = (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (!isPlaying || gameResult === 'collided' || gameResult === 'gameover' || gameResult === 'victory') return;
    const ant = antRef.current;
    
    const step = ant.speed * 1.5;
    if (dir === 'UP') {
      ant.y = Math.max(5, ant.y - step);
      ant.facing = 'UP';
    } else if (dir === 'DOWN') {
      ant.y = Math.min(194, ant.y + step);
      ant.facing = 'DOWN';
    } else if (dir === 'LEFT') {
      ant.x = Math.max(5, ant.x - step);
      ant.facing = 'LEFT';
    } else if (dir === 'RIGHT') {
      ant.x = Math.min(780, ant.x + step);
      ant.facing = 'RIGHT';
    }
    
    playSound('move');
    setActiveMessage(`SIGNAL_TX: ANT IMPULSE ${dir}`);
  };

  // Smooth continuous touch pointer controls
  const startTouchControl = (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (!isPlaying || gameResult === 'collided' || gameResult === 'gameover' || gameResult === 'victory') return;
    activeTouchDirRef.current = dir;
    setActiveMessage(`SIGNAL_TX: ANT ACCELERATED ${dir}`);
    
    // Immediate small step for better tactile feedback
    const ant = antRef.current;
    const step = ant.speed * 1.5;
    if (dir === 'UP') ant.y = Math.max(5, ant.y - step);
    else if (dir === 'DOWN') ant.y = Math.min(194, ant.y + step);
    else if (dir === 'LEFT') ant.x = Math.max(5, ant.x - step);
    else if (dir === 'RIGHT') ant.x = Math.min(780, ant.x + step);
    playSound('move');
  };

  const stopTouchControl = () => {
    activeTouchDirRef.current = null;
  };

  // Draw loop 60FPS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;

    const gameLoop = () => {
      // Direct high-precision visual theme checks inside the rendering container
      const isLightTheme = document.body.classList.contains('light-theme');

      // Clear viewport
      ctx.fillStyle = isLightTheme ? '#ffffff' : '#05070e';
      ctx.fillRect(0, 0, 800, 220);

      // Background circuits lines
      ctx.strokeStyle = isLightTheme ? '#e2e8f0' : '#111326';
      ctx.lineWidth = 1;
      for (let i = 0; i < 800; i += 80) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 20, 220);
        ctx.stroke();
      }

      // Draw safe bottom zones (y = 176 to 220)
      ctx.fillStyle = isLightTheme ? 'rgba(16, 185, 129, 0.12)' : 'rgba(6, 78, 59, 0.2)';
      ctx.fillRect(0, 176, 800, 44);
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 176);
      ctx.lineTo(800, 176);
      ctx.stroke();

      ctx.font = '8px monospace';
      ctx.fillStyle = isLightTheme ? '#047857' : '#10b981';
      ctx.fillText('⚡ BASE_STATION // DEPLOYMENT_PAD', 12, 210);

      // Draw safe top arrival zone (y = 0 to 40)
      ctx.fillStyle = isLightTheme ? 'rgba(168, 85, 247, 0.1)' : 'rgba(88, 28, 135, 0.15)';
      ctx.fillRect(0, 0, 800, 40);
      ctx.strokeStyle = isLightTheme ? '#7c3aed' : '#a855f7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 40);
      ctx.lineTo(800, 40);
      ctx.stroke();

      // Pulsating Top Gateway
      const gate = targetGateRef.current;
      gate.pulse = (gate.pulse + 0.05) % (Math.PI * 2);
      const pulseSize = 2 + Math.sin(gate.pulse) * 3;

      const grad = ctx.createLinearGradient(gate.x, 0, gate.x + gate.width, 40);
      grad.addColorStop(0, '#ec4899');
      grad.addColorStop(0.5, '#3b82f6');
      grad.addColorStop(1, '#10b981');
      ctx.fillStyle = grad;
      ctx.fillRect(gate.x, 0, gate.width, 38);

      ctx.strokeStyle = isLightTheme ? '#3b82f6' : '#22d3ee';
      ctx.lineWidth = 2 + pulseSize / 2;
      ctx.strokeRect(gate.x - 1, 0, gate.width + 2, 38);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px monospace';
      // Center the emoji icon inside the smaller port width 28
      ctx.fillText('📡', gate.x + (gate.width / 2) - 6, 17);
      
      ctx.font = 'bold 7px monospace';
      ctx.fillStyle = isLightTheme ? '#1e1b4b' : '#22d3ee';
      ctx.fillText('SYNC', gate.x + (gate.width / 2) - 10, 30);

      // Static blocker guides
      ctx.fillStyle = isLightTheme ? 'rgba(239, 68, 68, 0.18)' : 'rgba(239, 68, 68, 0.4)';
      ctx.fillRect(0, 0, gate.x, 2);
      ctx.fillRect(gate.x + gate.width, 0, 800 - (gate.x + gate.width), 2);

      // Draw lanes bounds
      lanesRef.current.forEach((lane, idx) => {
        // High-contrast clean roads in light theme
        ctx.fillStyle = isLightTheme 
          ? (idx % 2 === 0 ? 'rgba(241, 245, 249, 0.95)' : 'rgba(226, 232, 240, 0.75)') 
          : lane.color;
        ctx.fillRect(0, lane.y, 800, lane.height);
        
        ctx.strokeStyle = isLightTheme ? 'rgba(148, 163, 184, 0.35)' : 'rgba(30, 41, 59, 0.7)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.setLineDash([12, 12]);
        ctx.moveTo(0, lane.y);
        ctx.lineTo(800, lane.y);
        ctx.moveTo(0, lane.y + lane.height);
        ctx.lineTo(800, lane.y + lane.height);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      const ant = antRef.current;

      // Update traffic & ant simulation smooth states
      if (isPlaying && gameResult !== 'collided' && gameResult !== 'gameover' && gameResult !== 'victory') {
        updateTraffic(level);

        // Slide the target gate back and forth dynamically on the top side of the road
        const gate = targetGateRef.current;
        // Faster moving initially, slows down as level increases and data packets get faster
        const driftSpeed = Math.max(1.0, 5.2 - (level * 0.45));
        if (gate.direction === undefined) {
          gate.direction = 1;
        }
        gate.x += gate.direction * driftSpeed;
        if (gate.x + gate.width > 780) {
          gate.x = 780 - gate.width;
          gate.direction = -1;
        } else if (gate.x < 20) {
          gate.x = 20;
          gate.direction = 1;
        }

        // Update security segway if active
        const segway = segwayRef.current;
        if (segway.active) {
          segway.x += segway.speed;
          if (segway.x < -100 || segway.x > 900) {
            segway.active = false;
          }

          // Segway collision with ant
          if (ant.y <= 40) {
            const overlapX = (ant.x + ant.width >= segway.x) && (ant.x <= segway.x + segway.width);
            if (overlapX) {
              handleAntDeath();
            }
          }
        }

        // Update second security segway (bottom road) if active
        const bottomSegway = bottomSegwayRef.current;
        if (bottomSegway.active) {
          bottomSegway.x += bottomSegway.speed;
          if (bottomSegway.x < -100 || bottomSegway.x > 900) {
            bottomSegway.active = false;
          }

          // Bottom Segway collision with ant
          const overlapX = (ant.x + ant.width >= bottomSegway.x) && (ant.x <= bottomSegway.x + bottomSegway.width);
          const overlapY = (ant.y + ant.height >= bottomSegway.y) && (ant.y <= bottomSegway.y + bottomSegway.height);
          if (overlapX && overlapY) {
            handleAntDeath();
          }
        }

        // Level 8-10 starting zone idle tracker
        if (level >= 8) {
          if (ant.y >= 170) {
            idleTimerRef.current += 1;
            if (idleTimerRef.current >= 480) { // 8 seconds at 60 FPS
              if (!bottomSegway.active) {
                bottomSegway.active = true;
                bottomSegway.x = 815;
                const topSpeed = -4.3 - (level * 0.45);
                bottomSegway.speed = topSpeed * 0.72; // a little slower than one on other side
                setActiveMessage('⚠️ WARNING: STARTING ZONE IDLE CAP EXCEEDED. COURIER ENGAGED!');
                playSound('crash');
              }
            }
          } else {
            // Once the ant steps out onto the road, the slow-start countdown resets
            idleTimerRef.current = 0;
          }
        } else {
          idleTimerRef.current = 0;
        }

        // Smooth Keyboard / Multi-directional Input Processing
        let dx = 0;
        let dy = 0;
        const keys = keysPressedRef.current;

        if (keys['arrowup'] || keys['w']) {
          dy -= 1;
        }
        if (keys['arrowdown'] || keys['s']) {
          dy += 1;
        }
        if (keys['arrowleft'] || keys['a']) {
          dx -= 1;
        }
        if (keys['arrowright'] || keys['d']) {
          dx += 1;
        }

        // Apply smooth touch hold controls if no keyboard inputs are captured
        if (dx === 0 && dy === 0 && activeTouchDirRef.current) {
          const tDir = activeTouchDirRef.current;
          if (tDir === 'UP') dy = -1;
          else if (tDir === 'DOWN') dy = 1;
          else if (tDir === 'LEFT') dx = -1;
          else if (tDir === 'RIGHT') dx = 1;
        }

        // Apply normalized physical displacement vectors to make movement perfectly smooth
        if (dx !== 0 || dy !== 0) {
          let moveX = dx;
          let moveY = dy;

          if (dx !== 0 && dy !== 0) {
            const magnitude = Math.sqrt(dx * dx + dy * dy);
            moveX /= magnitude;
            moveY /= magnitude;
          }

          ant.x = Math.max(5, Math.min(780, ant.x + moveX * ant.speed));
          ant.y = Math.max(5, Math.min(194, ant.y + moveY * ant.speed));
          ant.isMoving = true;

          // Align facing direction in all directions smoothly
          if (Math.abs(moveY) >= Math.abs(moveX)) {
            ant.facing = moveY < 0 ? 'UP' : 'DOWN';
          } else {
            ant.facing = moveX < 0 ? 'LEFT' : 'RIGHT';
          }

          // Rhythmic premium tactile crawls
          if (moveSoundTickRef.current <= 0) {
            playSound('move');
            moveSoundTickRef.current = 13;
          } else {
            moveSoundTickRef.current--;
          }
        } else {
          ant.isMoving = false;
          moveSoundTickRef.current = 0;
        }
      }

      // Draw cyber vehicles
      lanesRef.current.forEach((lane) => {
        lane.vehicles.forEach((vehicle) => {
          ctx.shadowBlur = 4;
          ctx.shadowColor = vehicle.color;

          ctx.fillStyle = vehicle.color;
          ctx.fillRect(vehicle.x, lane.y + 4, vehicle.width, lane.height - 8);

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(vehicle.x, lane.y + 6, 3, lane.height - 12);

          ctx.shadowBlur = 0;
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 7px monospace';
          ctx.fillText(vehicle.label, vehicle.x + 4, lane.y + 21);
        });
      });

      // Draw security segway if active
      const segway = segwayRef.current;
      if (segway.active) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#f43f5e';

        // Draw warning siren/flashing lights on the footpath
        ctx.fillStyle = 'rgba(244, 63, 94, 0.12)';
        ctx.fillRect(0, 0, 800, 40);

        // Draw Segway body
        // Segway Wheel
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(segway.x + 12, segway.y + 20, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Segway Platform and Stem
        ctx.fillStyle = '#64748b';
        ctx.fillRect(segway.x + 4, segway.y + 13, 16, 2); // platform
        
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(segway.x + 12, segway.y + 13);
        ctx.lineTo(segway.x + 10, segway.y + 2); // stem leaning slightly
        ctx.stroke();

        // Handlebars
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(segway.x + 6, segway.y + 2, 8, 2);

        // Security Courier capsule/rider on the Segway
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.arc(segway.x + 14, segway.y + 4, 3.5, 0, Math.PI * 2); // Head
        ctx.fill();
        
        ctx.fillRect(segway.x + 11, segway.y + 7, 6, 5); // Body

        // Red flashing siren dome
        const sirenFlash = Math.sin(Date.now() / 120) > 0;
        ctx.fillStyle = sirenFlash ? '#f43f5e' : '#fda4af';
        ctx.beginPath();
        ctx.arc(segway.x + 14, segway.y, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        // Overlay Text Warning Alert
        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 7.5px monospace';
        ctx.fillText('⚠️ WARNING: SEGWAY SWEEP!', segway.x - 22, segway.y + 28);
      }

      // Draw second security segway (bottom road) if active
      const bottomSegway = bottomSegwayRef.current;
      if (bottomSegway.active) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#eb5e28';

        // Draw warning siren/flashing lights on the starting area road
        ctx.fillStyle = 'rgba(235, 94, 40, 0.12)';
        ctx.fillRect(0, 176, 800, 44);

        // Draw Segway body
        // Segway Wheel
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(bottomSegway.x + 12, bottomSegway.y + 20, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#eb5e28';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Segway Platform and Stem
        ctx.fillStyle = '#64748b';
        ctx.fillRect(bottomSegway.x + 4, bottomSegway.y + 13, 16, 2); // platform
        
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(bottomSegway.x + 12, bottomSegway.y + 13);
        ctx.lineTo(bottomSegway.x + 10, bottomSegway.y + 2); // stem leaning slightly
        ctx.stroke();

        // Handlebars
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(bottomSegway.x + 6, bottomSegway.y + 2, 8, 2);

        // Security Courier capsule/rider on the Segway
        ctx.fillStyle = '#eb5e28';
        ctx.beginPath();
        ctx.arc(bottomSegway.x + 14, bottomSegway.y + 4, 3.5, 0, Math.PI * 2); // Head
        ctx.fill();
        
        ctx.fillRect(bottomSegway.x + 11, bottomSegway.y + 7, 6, 5); // Body

        // Amber flashing siren dome
        const sirenFlash = Math.sin(Date.now() / 120) > 0;
        ctx.fillStyle = sirenFlash ? '#eb5e28' : '#fed7aa';
        ctx.beginPath();
        ctx.arc(bottomSegway.x + 14, bottomSegway.y, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        // Overlay Text Warning Alert
        ctx.fillStyle = '#eb5e28';
        ctx.font = 'bold 7.5px monospace';
        ctx.fillText('🚨 ANTI-STALL PATROL!', bottomSegway.x - 22, bottomSegway.y + 28);
      }

      // DRAW NANO ANT
      ant.glowTicks++;
      const antX = ant.x;
      const antY = ant.y;

      ctx.shadowBlur = 6;
      ctx.shadowColor = '#06b6d4';

      ctx.fillStyle = '#06b6d4'; 
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 1;
      
      const legWave = ant.isMoving ? Math.sin(ant.glowTicks * 0.45) * 3 : 0;

      // Antenna and 6 mini legs
      ctx.beginPath();
      // Left legs
      ctx.moveTo(antX, antY + 8);
      ctx.lineTo(antX - 5, antY + 4 + legWave);
      ctx.moveTo(antX, antY + 10);
      ctx.lineTo(antX - 6, antY + 10 - legWave);
      ctx.moveTo(antX, antY + 12);
      ctx.lineTo(antX - 5, antY + 15 + legWave);

      // Right legs
      ctx.moveTo(antX + ant.width, antY + 8);
      ctx.lineTo(antX + ant.width + 5, antY + 4 - legWave);
      ctx.moveTo(antX + ant.width, antY + 10);
      ctx.lineTo(antX + ant.width + 6, antY + 10 + legWave);
      ctx.moveTo(antX + ant.width, antY + 12);
      ctx.lineTo(antX + ant.width + 5, antY + 15 - legWave);
      ctx.stroke();

      // Scaled body segments
      ctx.fillStyle = '#0891b2'; 
      ctx.beginPath();
      ctx.ellipse(antX + ant.width / 2, antY + 12, 4.5, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#22d3ee';
      ctx.beginPath();
      ctx.arc(antX + ant.width / 2, antY + 12, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0e7490';
      ctx.beginPath();
      ctx.ellipse(antX + ant.width / 2, antY + 7.5, 3.5, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(antX + ant.width / 2, antY + 3.5, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Antennae lines
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(antX + ant.width / 2 - 1, antY + 1.5);
      ctx.quadraticCurveTo(antX + ant.width / 2 - 4, antY - 2, antX + ant.width / 2 - 5, antY - 4);
      ctx.moveTo(antX + ant.width / 2 + 1, antY + 1.5);
      ctx.quadraticCurveTo(antX + ant.width / 2 + 4, antY - 2, antX + ant.width / 2 + 5, antY - 4);
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Collisions evaluation
      if (isPlaying && gameResult === 'idle') {
        lanesRef.current.forEach((lane) => {
          const antTop = antY;
          const antBottom = antY + ant.height;
          
          if (antBottom >= lane.y && antTop <= lane.y + lane.height) {
            lane.vehicles.forEach((vehicle) => {
              const carLeft = vehicle.x;
              const carRight = vehicle.x + vehicle.width;

              if (
                ant.x + ant.width > carLeft + 1 && 
                ant.x < carRight - 1 && 
                antY + ant.height > lane.y + 4 && 
                antY < lane.y + lane.height - 4
              ) {
                handleAntDeath();
              }
            });
          }
        });

        // Top Gateway collision
        if (ant.y <= 40) {
          const inGateX = (ant.x >= gate.x) && (ant.x + ant.width <= gate.x + gate.width);
          if (inGateX) {
            if (ant.facing === 'UP') {
              handleUplinkSuccess();
            }
          } else {
            // Reaches the top footpath but not inside the gateway
            const segwayInstance = segwayRef.current;
            if (!segwayInstance.active) {
              segwayInstance.active = true;
              
              // Spawn from the right (corresponding to traffic flow)
              segwayInstance.x = 815;
              
              // Move towards the left (towards the ant)
              segwayInstance.speed = -4.3 - (level * 0.45);
              
              setActiveMessage('⚠️ FOOTPATH SWEEP ACTIVATED: DODGE BACK TO ROAD!');
              playSound('crash'); // short trigger ping
            }
          }
        }
      }

      frameId = requestAnimationFrame(gameLoop);
    };

    frameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, gameResult, level]);

  // Collisions / Respawn
  const handleAntDeath = () => {
    playSound('crash');
    setGameResult('collided');
    setLives((prev) => {
      const nextLives = prev - 1;
      if (nextLives <= 0) {
        setGameResult('gameover');
        playSound('gameover');
        setActiveMessage('CRITICAL EXCEPTION: NANO-SHIELDS REPLENISHED TO ZERO. GAME OVER.');
      } else {
        setActiveMessage(`NANO_CRASH: INFRASTRUCTURE COLLISION. LIVES LEFT: ${nextLives}`);
        setTimeout(() => {
          resetAntPosition();
          setGameResult('idle');
        }, 1100);
      }
      return nextLives;
    });
  };

  // Uplink Level Victory logic up to Level 10 max
  const handleUplinkSuccess = () => {
    playSound('win');
    
    setScore((prev) => {
      const newScore = prev + 100 * level;
      if (newScore > highScore) {
        setHighScore(newScore);
        try {
          localStorage.setItem('ant_high_score', newScore.toString());
        } catch {}
      }
      return newScore;
    });

    if (level >= 10) {
      setGameResult('victory');
      setActiveMessage('🥇 ARCHITECTURE EXPANSION COMPLETE: CONQUERED ALL 10 CONNECTIVITY MODULES!');
    } else {
      setGameResult('success');
      setActiveMessage(`⚡ LINK REGISTERED! CONNECTOR LEVEL ${level} COMMITTED.`);
      setTimeout(() => {
        setLevel((prev) => prev + 1);
        lanesRef.current.forEach((lane) => {
          lane.vehicles = [];
        });
        randomizeGate();
        resetAntPosition();
        setGameResult('idle');
      }, 1400);
    }
  };

  // Select level dropdown trigger (fair calibrations reload)
  const handleDropdownLevelChange = (selectedLvl: number) => {
    setLevel(selectedLvl);
    resetAntPosition();
    // clear all existing traffic immediately to update calibration
    lanesRef.current.forEach((lane) => {
      lane.vehicles = [];
    });
    // Give safe message indicating fairness calibration setup
    const complexityString = selectedLvl >= 8 ? 'EXTREME' : (selectedLvl >= 4 ? 'BALANCED' : 'LIGHT');
    setActiveMessage(`LEVEL_SET: LOADING Level ${selectedLvl} Core [Complexity: ${complexityString}]`);
    playSound('start');

    if (gameResult === 'gameover' || gameResult === 'victory') {
      setGameResult('idle');
    }
  };

  // Controls triggers
  const startGame = () => {
    playSound('start');
    setScore(0);
    setLives(3);
    setGameResult('idle');
    setIsPlaying(true);
    randomizeGate();
    resetAntPosition();
    lanesRef.current.forEach((lane) => {
      lane.vehicles = [];
    });
    setActiveMessage(`SYSTEM: BOT DEPLOYED ON CONNECTOR LEVEL ${level}.`);
  };

  const stopGame = () => {
    setIsPlaying(false);
    setGameResult('idle');
    setActiveMessage('SYS: USER PAUSED STREAM.');
  };

  const resetLeaderboard = () => {
    try {
      localStorage.setItem('ant_high_score', '0');
    } catch {}
    setHighScore(0);
    setActiveMessage('ALERT: LOCAL SCORE PROTOCOLS ERASED.');
  };

  return (
    <div id="ant-crossing-game-component" className={`w-full ${isLightTheme ? 'bg-white border-slate-200 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.15)]' : 'bg-[#070b13] border-[#121c38] shadow-[4px_4px_0px_0px_#1e2e54]'} border-2 rounded-none p-3 md:p-4 font-mono`}>
      
      {/* HUD Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b ${isLightTheme ? 'border-slate-100' : 'border-[#121c38]'} pb-2 mb-3 select-none`}>
        <div className="flex items-center gap-1.5">
          <div className={`p-1 border ${isLightTheme ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-600' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'}`}>
            <Gamepad2 className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 ${isLightTheme ? 'text-slate-950' : 'text-white'}`}>
              <span>ANT</span>
            </h4>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="flex flex-wrap items-center gap-2 text-[10px]">
          
          {/* Fair Level Select Dropdown */}
          <div className={`flex items-center ${isLightTheme ? 'bg-gray-50 border-gray-300' : 'bg-[#0c1224] border-[#1e2e54]'} border px-1.5 py-0.5 rounded-none`}>
            <select 
              value={level} 
              onChange={(e) => handleDropdownLevelChange(parseInt(e.target.value, 10))}
              className={`${isLightTheme ? 'bg-white text-slate-900' : 'bg-black text-white'} text-[10px] font-bold font-mono border-0 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 cursor-pointer h-4 leading-none inline-block pl-1 pr-4 py-0`}
              title="Select connector level calibration"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                <option key={val} value={val} className={isLightTheme ? 'bg-white text-slate-800' : 'bg-[#05070c] text-white'}>Lvl {val}</option>
              ))}
            </select>
          </div>

          <div className={`border px-1.5 py-0.5 flex items-center gap-1 ${isLightTheme ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-purple-900/15 border-purple-800/20 text-purple-300'}`}>
            <Award className="w-3 h-3 text-purple-400" />
            <div>
              <span className="text-[7px] text-slate-500 block leading-none">HI</span>
              <span className="font-bold block leading-none">{highScore}</span>
            </div>
          </div>

          <div className={`border px-1.5 py-0.5 flex flex-col justify-center ${isLightTheme ? 'bg-red-50 border-red-200' : 'bg-red-950/15 border-red-800/20'}`}>
            <span className="text-[7px] text-slate-500 block leading-none">SHIELDS</span>
            <div className="flex gap-0.5 mt-0.5">
              {[...Array(3)].map((_, idx) => (
                <Shield 
                  key={idx} 
                  className={`w-3 h-3 transition-all ${
                    idx < lives ? 'text-red-500 fill-red-800/50' : 'text-slate-800'
                  }`} 
                />
              ))}
            </div>
          </div>

          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className={`p-1 border transition ${isLightTheme ? 'text-slate-500 hover:text-slate-900 border-slate-300 hover:bg-slate-100' : 'text-slate-400 hover:text-white border-[#121c38] hover:bg-[#121c38]/40'}`}
            title={isMuted ? "Unmute sounds" : "Mute sounds"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className={`w-3.5 h-3.5 ${isLightTheme ? 'text-cyan-600' : 'text-cyan-400'}`} />}
          </button>

          {/* Exit Button */}
          <button 
            onClick={() => {
              stopGame();
            }} 
            className="p-1 px-2.5 text-red-500 hover:text-white hover:bg-red-600 border border-red-500 transition cursor-pointer text-[10px] font-bold uppercase rounded-none"
            title="Exit game sandbox"
          >
            Exit Game
          </button>

        </div>
      </div>

      {/* Narrow Dynamic Canvas Rendering Box */}
      <div className={`relative border-2 ${isLightTheme ? 'border-slate-200' : 'border-[#121c38]'} bg-black overflow-hidden flex flex-col items-center`}>
        
        <canvas 
          ref={canvasRef}
          width={800}
          height={220}
          className="w-full h-auto bg-white dark:bg-[#04060c] block object-contain"
          style={{ imageRendering: 'pixelated' }}
        />

        {/* OVERLAYS FOR GAME STATES */}
        {!isPlaying && (
          <div className={`absolute inset-0 ${isLightTheme ? 'bg-white/95 border-cyan-350/20' : 'bg-[#05070e]/95 border-cyan-500/20'} flex flex-col items-center justify-center text-center p-4 select-none border z-10 animate-fade-in`}>
            <div className="max-w-md space-y-2">
              <h3 className={`text-sm md:text-base font-bold uppercase tracking-wider ${isLightTheme ? 'text-slate-900' : 'text-white'}`}>
                ANT CROSSING
              </h3>
              
              <div className="flex flex-col gap-1.5 pt-1">
                <button
                  onClick={startGame}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-2 font-bold uppercase text-xs tracking-wider transition-all cursor-pointer"
                >
                  PLAY
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Level Success Overlay */}
        {gameResult === 'success' && (
          <div className="absolute inset-0 bg-purple-100/95 dark:bg-purple-950/85 backdrop-blur-xs flex flex-col items-center justify-center text-center p-3 select-none z-10 transition-all">
            <div className="space-y-1">
              <div className="text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800/40 px-2 py-0.5 text-[10px] font-bold w-fit mx-auto animate-bounce">
                ✔ PORT SYNCED SUCCESSFULLY
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#6d28d9] dark:text-white font-mono">
                UPLINK COMPILED (+{100 * level})
              </h3>
              <p className="text-[9px] text-[#4c1d95] dark:text-gray-300 font-sans">
                Deploying connectors at next module: level {level + 1}/10...
              </p>
            </div>
          </div>
        )}

        {/* General Death Respawn */}
        {gameResult === 'collided' && (
          <div className="absolute inset-0 bg-red-100/95 dark:bg-red-950/80 backdrop-blur-xs flex items-center justify-center select-none z-10">
            <div className="text-center space-y-1 animate-pulse">
              <h3 className="text-sm font-bold text-red-600 dark:text-red-500 uppercase tracking-widest">
                💥 SHIELDS RECONSTITUTING
              </h3>
              <p className="text-[9px] text-red-800 dark:text-gray-300">Reassembling nano metallic frames...</p>
            </div>
          </div>
        )}

        {/* Level 10 Grand Victory Screen */}
        {gameResult === 'victory' && (
          <div className="absolute inset-0 bg-emerald-50/95 dark:bg-[#061512]/95 border border-yellow-500/20 flex flex-col items-center justify-center text-center p-4 select-none z-20">
            <div className="max-w-md space-y-2">
              <span className="text-[8px] text-yellow-600 dark:text-yellow-400 font-bold uppercase tracking-widest block bg-yellow-105/90 dark:bg-yellow-950/40 border border-yellow-300 dark:border-yellow-500/30 px-2 py-0.5 mx-auto w-fit">
                🏆 GLOBAL INFRASTRUCTURE COMPLETE! (LEVEL 10/10)
              </span>
              <h3 className="text-sm md:text-base font-bold uppercase tracking-widest text-emerald-950 dark:text-white font-mono animate-pulse">
                UPLINK CHASSIS SYNCHRONIZED
              </h3>
              <p className="text-[10px] text-slate-705 dark:text-gray-300 font-sans leading-relaxed">
                Superb! You successfully led the robotic ant player fully across 10 levels of cyber-traffic streams, concluding with a Master Score of <strong className="text-yellow-600 dark:text-yellow-400 font-mono">{score}</strong>!
              </p>
              
              <div className="flex justify-center gap-1.5 pt-1">
                <button
                  onClick={startGame}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 font-bold uppercase text-[9px] tracking-wider transition-all cursor-pointer"
                >
                  REBOOT SIMULATOR
                </button>
                <button
                  onClick={stopGame}
                  className="bg-white dark:bg-[#0c1224] hover:bg-slate-100 dark:hover:bg-[#121c38] text-slate-800 dark:text-gray-300 border border-slate-350 dark:border-yellow-500/20 px-3 py-1 text-[9px] uppercase transition cursor-pointer"
                >
                  LEAVE TERMINAL
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameResult === 'gameover' && (
          <div className="absolute inset-0 bg-red-50/95 dark:bg-black/95 flex flex-col items-center justify-center text-center p-4 select-none z-10 animate-fade-in">
            <div className="max-w-md space-y-2">
              <h3 className="text-base font-bold text-red-600 uppercase tracking-widest font-mono">
                SYSTEM DE-SYNCHRONIZED
              </h3>
              <p className="text-[10px] text-slate-700 dark:text-gray-400 font-sans">
                Energy core integrity depleted. Final system score reached: <strong className="text-cyan-600 dark:text-cyan-400 font-mono">{score}</strong>.
              </p>
              
              <div className="flex flex-col gap-1 pt-1.5">
                <button
                  onClick={startGame}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 font-bold uppercase text-[9px] tracking-wider transition cursor-pointer"
                >
                  REARM RECIPROCAL ENGINES
                </button>
                <button
                  onClick={stopGame}
                  className="text-slate-500 hover:text-slate-900 dark:hover:text-white text-[9px] underline transition cursor-pointer"
                >
                  Return to sandbox state
                </button>
              </div>
            </div>
          </div>
        )}
      </div>



      {/* Compact Interactive Touch Controller Center aligned - instructions removed */}
      <div className="mt-3 flex justify-center border-t border-slate-100 dark:border-[#121c38]/40 pt-3 select-none">
        {/* Real Compact Touch Controller */}
        <div className="relative w-32 h-24 flex items-center justify-center">
          
          {/* UP BUTTON */}
          <button
            onMouseDown={() => startTouchControl('UP')}
            onMouseUp={stopTouchControl}
            onMouseLeave={stopTouchControl}
            onTouchStart={(e) => { e.preventDefault(); startTouchControl('UP'); }}
            onTouchEnd={(e) => { e.preventDefault(); stopTouchControl(); }}
            onClick={() => clickManualControl('UP')}
            className="absolute top-0 w-10 h-7 bg-white dark:bg-[#0c1224] hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-300 dark:border-cyan-500/20 active:bg-cyan-500 active:text-black flex items-center justify-center text-slate-800 dark:text-cyan-400 shadow-sm cursor-pointer select-none"
            title="Ant Arrow Up"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

          {/* LEFT BUTTON */}
          <button
            onMouseDown={() => startTouchControl('LEFT')}
            onMouseUp={stopTouchControl}
            onMouseLeave={stopTouchControl}
            onTouchStart={(e) => { e.preventDefault(); startTouchControl('LEFT'); }}
            onTouchEnd={(e) => { e.preventDefault(); stopTouchControl(); }}
            onClick={() => clickManualControl('LEFT')}
            className="absolute left-0 w-10 h-7 bg-white dark:bg-[#0c1224] hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-300 dark:border-cyan-500/20 active:bg-cyan-500 active:text-black flex items-center justify-center text-slate-800 dark:text-cyan-400 shadow-sm cursor-pointer select-none"
            title="Ant Arrow Left"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>

          {/* CORE */}
          <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-[#1e2e54] flex items-center justify-center text-[7px] text-slate-500 dark:text-slate-400 font-bold uppercase select-none">
            GRID
          </div>

          {/* RIGHT BUTTON */}
          <button
            onMouseDown={() => startTouchControl('RIGHT')}
            onMouseUp={stopTouchControl}
            onMouseLeave={stopTouchControl}
            onTouchStart={(e) => { e.preventDefault(); startTouchControl('RIGHT'); }}
            onTouchEnd={(e) => { e.preventDefault(); stopTouchControl(); }}
            onClick={() => clickManualControl('RIGHT')}
            className="absolute right-0 w-10 h-7 bg-white dark:bg-[#0c1224] hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-300 dark:border-cyan-500/20 active:bg-cyan-500 active:text-black flex items-center justify-center text-slate-800 dark:text-cyan-400 shadow-sm cursor-pointer select-none"
            title="Ant Arrow Right"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* DOWN BUTTON */}
          <button
            onMouseDown={() => startTouchControl('DOWN')}
            onMouseUp={stopTouchControl}
            onMouseLeave={stopTouchControl}
            onTouchStart={(e) => { e.preventDefault(); startTouchControl('DOWN'); }}
            onTouchEnd={(e) => { e.preventDefault(); stopTouchControl(); }}
            onClick={() => clickManualControl('DOWN')}
            className="absolute bottom-0 w-10 h-7 bg-white dark:bg-[#0c1224] hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-300 dark:border-cyan-500/20 active:bg-cyan-500 active:text-black flex items-center justify-center text-slate-800 dark:text-cyan-400 shadow-sm cursor-pointer select-none"
            title="Ant Arrow Down"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>

    </div>
  );
}

export default React.memo(AntCrossingGame);
