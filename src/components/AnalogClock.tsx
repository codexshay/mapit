import React, { useEffect, useState } from 'react';

interface AnalogClockProps {
  timeZone: string;
  label: string;
  flag: string;
  countryCode: string;
  isMinimized?: boolean;
  theme?: 'light' | 'dark';
}

export const AnalogClock: React.FC<AnalogClockProps> = ({ timeZone, label, flag, countryCode, isMinimized = false, theme = 'light' }) => {
  const [time, setTime] = useState({ hour: 0, minute: 0, second: 0, formatted: '' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone,
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false,
        });
        const parts = formatter.formatToParts(now);
        const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
        const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
        const second = parseInt(parts.find(p => p.type === 'second')?.value || '0', 10);

        // Format for digital readout title
        const pad = (num: number) => String(num).padStart(2, '0');
        const formatted = `${pad(hour)}:${pad(minute)}:${pad(second)}`;

        setTime({ hour, minute, second, formatted });
      } catch (e) {
        console.error('Time parsing error for timezone', timeZone, e);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  // Calculate angles
  const hrAngle = (time.hour % 12) * 30 + time.minute * 0.5;
  const minAngle = time.minute * 6 + time.second * 0.1;
  const secAngle = time.second * 6;

  const amPm = time.hour >= 12 ? 'PM' : 'AM';

  const clockSize = isMinimized ? 30 : 68;
  const radius = clockSize / 2;
  const strokeColor = 'var(--clock-stroke, #121c38)';
  
  const isDark = theme === 'dark';

  return (
    <div 
      className={`flex flex-col items-center justify-center select-none rounded-none w-full ${
        isMinimized 
          ? 'p-0.5 border-0 bg-transparent' 
          : `p-2 border ${
              isDark 
                ? 'bg-black border-[#ffffff] text-white' 
                : 'bg-white border-gray-200 text-slate-800'
            }`
      } ${isDark ? 'text-white' : 'text-slate-800'}`}
      id={`analog-clock-${countryCode.toLowerCase()}`}
    >
      {/* SVG Analog Wall Face */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg 
          width={clockSize} 
          height={clockSize} 
          viewBox="0 0 100 100"
          className="clock-face-svg drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
        >
          {/* Base Dial Plate */}
          <circle 
            cx="50" 
            cy="50" 
            r="47" 
            fill={isDark ? "#000000" : "#ffffff"}
            stroke={isDark ? "#ffffff" : "#cbd5e1"}
            strokeWidth="3"
          />

          {/* Clock Dial Center point */}
          <circle 
            cx="50" 
            cy="50" 
            r="43" 
            fill={isDark ? "#000000" : "#f8fafc"}
          />

          {/* Static Hour Numbers (Hide when minimized for cleaner rendering) */}
          {!isMinimized && (
            <>
              <text x="50" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isDark ? "#ffffff" : "#1e293b"} className="font-sans">12</text>
              <text x="85" y="54" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isDark ? "#ffffff" : "#1e293b"} className="font-sans">3</text>
              <text x="50" y="88" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isDark ? "#ffffff" : "#1e293b"} className="font-sans">6</text>
              <text x="15" y="54" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isDark ? "#ffffff" : "#1e293b"} className="font-sans font-medium">9</text>
              
              {/* Minor hour indicators */}
              <circle cx="68.5" cy="22.5" r="1.5" fill={isDark ? "#ffffff" : "#64748b"} />
              <circle cx="81.5" cy="35.5" r="1.5" fill={isDark ? "#ffffff" : "#64748b"} />
              <circle cx="81.5" cy="68.5" r="1.5" fill={isDark ? "#ffffff" : "#64748b"} />
              <circle cx="68.5" cy="81.5" r="1.5" fill={isDark ? "#ffffff" : "#64748b"} />
              <circle cx="31.5" cy="81.5" r="1.5" fill={isDark ? "#ffffff" : "#64748b"} />
              <circle cx="18.5" cy="68.5" r="1.5" fill={isDark ? "#ffffff" : "#64748b"} />
              <circle cx="18.5" cy="31.5" r="1.5" fill={isDark ? "#ffffff" : "#64748b"} />
              <circle cx="31.5" cy="18.5" r="1.5" fill={isDark ? "#ffffff" : "#64748b"} />
            </>
          )}

          {/* Hour hand */}
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="28" 
            transform={`rotate(${hrAngle} 50 50)`}
            strokeLinecap="round"
            stroke={isDark ? "#ffffff" : "#0f172a"}
            strokeWidth="4"
          />

          {/* Minute hand */}
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="20" 
            transform={`rotate(${minAngle} 50 50)`}
            strokeLinecap="round"
            stroke={isDark ? "#ffffff" : "#475569"}
            strokeWidth="2.5"
          />

          {/* Second hand */}
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="15" 
            transform={`rotate(${secAngle} 50 50)`}
            strokeLinecap="round"
            stroke={isDark ? "#ffffff" : "#f43f5e"}
            strokeWidth="1.2"
          />

          {/* Hub cap pin */}
          <circle cx="50" cy="50" r="3.5" fill={isDark ? "#ffffff" : "#0f172a"} stroke={isDark ? "#ffffff" : "#000000"} />
        </svg>
      </div>

      {/* Meta textual labels showing only AM/PM and label */}
      {!isMinimized ? (
        <div className="text-center mt-1.5 font-mono select-none">
          <span className={`text-[9px] uppercase tracking-wider block leading-none ${
            isDark ? 'text-gray-400' : 'text-slate-500'
          }`}>
            {label}
          </span>
          <span className={`text-[10px] font-extrabold block mt-0.5 leading-none ${
            isDark ? 'text-[#10b981]' : 'text-emerald-600'
          }`}>
            {amPm}
          </span>
        </div>
      ) : (
        <div className="text-center mt-1 font-mono select-none">
          <span className={`text-[8px] font-extrabold leading-none ${isDark ? 'text-[#10b981]' : 'text-emerald-600'}`}>
            {amPm}
          </span>
        </div>
      )}
    </div>
  );
};
