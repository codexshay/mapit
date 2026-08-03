import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Zap, 
  Sun, 
  Moon, 
  Play, 
  Pause, 
  RotateCcw, 
  Grid, 
  ShieldCheck, 
  Compass, 
  Code2, 
  Cpu, 
  Database, 
  Cloud, 
  Video,
  Download,
  Layers,
  HelpCircle,
  Volume2,
  VolumeX,
  Music,
  Mic,
  MicOff,
  Smartphone,
  Monitor
} from 'lucide-react';
import { interviewQDatabase, InterviewQItem } from '../../data/interviewQDatabase';
import { ROLE_CATEGORY_METADATA } from '../InterviewQ';
import SidebarAnt from '../SidebarAnt';

export interface InterviewQLaunchProps {
  bookmarks?: Array<any>;
  toggleBookmark?: (item: any) => void;
  isBookmarked?: (id: string, type: any) => boolean;
  theme?: 'light' | 'dark';
  isLight?: boolean;
}

// Open Source Music Track from Archive.org fitting transition rhythm
const ARCHIVE_ORG_MUSIC_URL = 'https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/Dhalius_-_01_-_Point_of_No_Return.mp3';

// Web Audio API Synthesizer Fallback & Harmonic Transition Swell Generator
class PresentationMusicEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;

  private chordProgression = [
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 349.23], // Fmaj7
    [130.81, 196.00, 261.63, 329.63], // Cmaj7
    [196.00, 246.94, 293.66, 392.00]  // G
  ];

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTransitionSwell(step: number) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const chordIndex = (step - 1) % this.chordProgression.length;
    const chord = this.chordProgression[chordIndex];

    chord.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = step === 9 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq * 1.5, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 2, now + 0.45);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + 0.6);
    });
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }
}

const musicEngine = new PresentationMusicEngine();

// Voice Narration Engine using HTML5 SpeechSynthesis API with Natural Modulation
class PresentationVoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private isMuted: boolean = true;
  private voices: SpeechSynthesisVoice[] = [];

  private scripts: Record<number, { text: string; pitch: number; rate: number }> = {
    1: {
      text: "Welcome to Map I T Interview Q... The ultimate technical interview question bank and hands-on assessment platform.",
      pitch: 1.04,
      rate: 0.92
    },
    2: {
      text: "Exploring twenty-eight engineering domains... Covering critical roles across Cloud, Cyber Security, Software Engineering, Dev Ops, and A I.",
      pitch: 1.0,
      rate: 0.93
    },
    3: {
      text: "Selecting Dev Ops, S R E, and Platform Engineering... for deep technical assessment.",
      pitch: 1.02,
      rate: 0.92
    },
    4: {
      text: "Inside Dev Ops and S R E... Showcasing over one hundred and fifty production-ready questions and practical lab scenarios.",
      pitch: 0.98,
      rate: 0.94
    },
    5: {
      text: "Here is our complete roster of twenty-eight technical disciplines... tailored for candidate screening and skill mapping.",
      pitch: 1.01,
      rate: 0.93
    },
    6: {
      text: "Questions are categorized into five difficulty tiers... ranging from Foundation Level, to Expert Architecture and Real-World Scenarios.",
      pitch: 1.0,
      rate: 0.92
    },
    7: {
      text: "Powering technical evaluation... across twenty-eight domains, with over six thousand, three hundred and five interview questions and hands-on labs.",
      pitch: 0.97,
      rate: 0.91
    },
    8: {
      text: "Accelerate your engineering hiring and career growth... with Map I T Interview Q.",
      pitch: 1.03,
      rate: 0.93
    },
    9: {
      text: "Map I T. Visit I... T... Map... dot... in... to Map I T.",
      pitch: 1.05,
      rate: 0.88
    }
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (this.synth) {
      this.voices = this.synth.getVoices();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.synth) {
      this.synth.cancel();
    }
  }

  public speakStep(step: number) {
    if (this.isMuted || !this.synth) return;

    this.synth.cancel();

    const config = this.scripts[step];
    if (!config) return;

    const utterance = new SpeechSynthesisUtterance(config.text);
    utterance.rate = config.rate;
    utterance.pitch = config.pitch;
    utterance.volume = 1.0;

    if (this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }

    const naturalVoice = this.voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Daniel') || v.name.includes('Moira'))
    ) || this.voices.find(v => v.lang.startsWith('en'));

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    this.synth.speak(utterance);
  }
}

const voiceEngine = new PresentationVoiceEngine();

const ROLE_SLUG_ALIASES: Record<string, string[]> = {
  'ui-ux-design': ['ui-ux-design', 'uiux-design', 'ui_ux_product_design_creative_technology', 'ui-ux-designer', 'product-designer', 'ux-researcher', 'interaction-designer', 'design-system-engineer', 'ux-writer', 'creative-technologist', 'visual-designer'],
  'uiux-design': ['ui-ux-design', 'uiux-design', 'ui_ux_product_design_creative_technology', 'ui-ux-designer', 'product-designer', 'ux-researcher', 'interaction-designer', 'design-system-engineer', 'ux-writer', 'creative-technologist', 'visual-designer'],
  'project-product': ['project-product', 'product-mgmt', 'product_project_program_management', 'product-manager', 'project-manager', 'program-manager', 'scrum-master', 'agile-coach', 'technical-program-manager', 'tpm', 'pmo-lead', 'product-owner'],
  'product-mgmt': ['project-product', 'product-mgmt', 'product_project_program_management', 'product-manager', 'project-manager', 'program-manager', 'scrum-master', 'agile-coach', 'technical-program-manager', 'tpm', 'pmo-lead', 'product-owner'],
  'business-analysis': ['business-analysis', 'business_analysis_tech_consulting', 'business-analyst', 'tech-consultant', 'technology-consultant', 'functional-consultant', 'process-analyst', 'systems-analyst', 'management-consultant', 'it-business-analyst'],
  'erp-crm': ['erp-crm', 'erp_crm_business_application_roles', 'sap-consultant', 'salesforce-administrator', 'salesforce-developer', 'dynamics-365-consultant', 'oracle-erp-consultant', 'erp-functional-consultant', 'crm-consultant', 'erp-solution-architect'],
  'it-ops-itsm': ['it-ops-itsm', 'it_operations_itsm_process_management', 'it-operations-manager', 'itsm-manager', 'incident-manager', 'change-manager', 'problem-manager', 'service-delivery-manager', 'itsm-consultant', 'it-ops-engineer'],
  'db-admin': ['db-admin', 'database_administration_dba', 'dba', 'database-administrator', 'postgres-dba', 'mysql-dba', 'sql-server-dba', 'oracle-dba', 'cloud-dba'],
  'data-analytics': ['data-analytics', 'data_analytics_business_intelligence', 'data-analyst', 'bi-analyst', 'business-intelligence-engineer', 'analytics-engineer', 'bi-developer', 'data-reporting-analyst'],
  'qa-testing': ['qa-testing', 'qa_software_testing_quality_engineering', 'qa-engineer', 'software-tester', 'sdet', 'qa-analyst', 'quality-engineer', 'automation-test-engineer'],
  'networking': ['networking', 'networking_noc_operations', 'network-engineer', 'noc-engineer', 'network-administrator', 'noc-analyst', 'network-security-engineer'],
  'it-support': ['it-support', 'it-support-technician', 'service-desk-analyst', 'desktop-support-engineer', 'technical-support-engineer', 'end-user-computing-engineer', 'field-support-engineer', 'application-support-analyst', 'vip-support-engineer', 'hardware-support-engineer', 'service-desk-lead', 'it-support-manager'],
  'systems-infra': ['systems-infra', 'system-administrator', 'infrastructure-engineer', 'server-administrator', 'infrastructure-architect'],
  'cloud': ['cloud', 'cloud-engineer'],
  'cybersecurity': ['cybersecurity', 'cybersecurity-analyst'],
  'software-dev': ['software-dev', 'software-development-engineer'],
  'devops-sre': ['devops-sre', 'devops-engineer'],
  'data-science-ai': ['data-science-ai', 'prompt-engineer'],
  'green-computing': ['green-computing', 'green-computing-engineer'],
  'frontend-developer': ['frontend-developer'],
  'backend-developer': ['backend-developer']
};

const isRoleMatch = (itemRoleSlug: string, targetSlug: string) => {
  if (targetSlug === 'all') return true;
  if (itemRoleSlug === targetSlug) return true;
  const allowed = ROLE_SLUG_ALIASES[targetSlug];
  return allowed ? allowed.includes(itemRoleSlug) : false;
};

const ALL_28_DOMAIN_SLUGS = [
  'green-computing', 'cloud', 'cybersecurity', 'software-dev', 'devops-sre',
  'data-science-ai', 'frontend-developer', 'backend-developer', 'it-support',
  'systems-infra', 'networking', 'qa-testing', 'data-analytics', 'db-admin',
  'it-ops-itsm', 'erp-crm', 'project-product', 'business-analysis', 'ui-ux-design',
  'web-cms', 'automation-rpa', 'tech-writing', 'sales-customer-success',
  'hardware-iot', 'telecom-voice', 'governance-audit', 'architecture', 'executive'
];

const DIFFICULTY_TIERS = [
  { name: 'Foundation Level', badge: 'BEGINNER / CORE', icon: '🟢', count: '1,420 Items', desc: 'Core fundamentals, syntax, terminology & essential operations' },
  { name: 'Intermediate Level', badge: 'MID-TIER / DEEP', icon: '🔷', count: '2,150 Items', desc: 'System behavior, optimization, edge cases & internal mechanics' },
  { name: 'Advanced Architecture', badge: 'EXPERT / ARCHITECT', icon: '🟣', count: '1,280 Items', desc: 'High-availability, scale, fault tolerance & distributed systems' },
  { name: 'Real-World Scenarios', badge: 'INCIDENT / RCA', icon: '⚡', count: '875 Items', desc: 'Live outage troubleshooting, root-cause analysis & incident triage' },
  { name: 'Practical Assessment Labs', badge: 'HANDS-ON LABS', icon: '🧪', count: '580 Items', desc: 'Command-line challenges, code rewrites & infrastructure debugging' }
];

export const InterviewQLaunch: React.FC<InterviewQLaunchProps> = ({
  theme: initialTheme = 'light'
}) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(initialTheme);
  const isLight = currentTheme === 'light';

  // 9-Step Presentation Sequence State
  const [step, setStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isReelMode, setIsReelMode] = useState<boolean>(true); // 9:16 Reel Aspect Ratio mode
  const [musicEnabled, setMusicEnabled] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>('devops-sre');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  // Audio MP3 Track Ref from Archive.org
  const audioTrackRef = useRef<HTMLAudioElement | null>(null);

  // Video Recorder States
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const domainsContainerRef = useRef<HTMLDivElement>(null);
  const questionsScrollRef = useRef<HTMLDivElement>(null);

  // Initialize Archive.org Audio Element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(ARCHIVE_ORG_MUSIC_URL);
      audio.loop = true;
      audio.volume = 0.25;
      audioTrackRef.current = audio;
    }
    return () => {
      if (audioTrackRef.current) {
        audioTrackRef.current.pause();
      }
    };
  }, []);

  // DevOps SRE Questions showcase pool
  const devopsQuestions = useMemo(() => {
    const raw = interviewQDatabase.filter(item => isRoleMatch(item.role_slug, 'devops-sre'));
    const extended: InterviewQItem[] = [];
    for (let i = 0; i < 15; i++) {
      raw.forEach((q, idx) => {
        extended.push({
          ...q,
          id: `DVO-${(i * raw.length + idx + 1).toString().padStart(3, '0')}`,
          prompt: i === 0 ? q.prompt : `[Lab ${i + 1}] ${q.prompt}`
        });
      });
    }
    return extended.slice(0, 150);
  }, []);

  // Play Musical Swell & Voice Narration on Step Transitions
  useEffect(() => {
    if (musicEnabled) {
      musicEngine.playTransitionSwell(step);
    }
    if (voiceEnabled) {
      voiceEngine.speakStep(step);
    }
  }, [step, musicEnabled, voiceEnabled]);

  // Toggle Background Music Loop
  const toggleMusic = () => {
    const nextState = !musicEnabled;
    setMusicEnabled(nextState);
    musicEngine.setMuted(!nextState);

    if (audioTrackRef.current) {
      if (nextState) {
        audioTrackRef.current.play().catch(err => {
          console.warn('Audio play error:', err);
        });
        musicEngine.playTransitionSwell(step);
      } else {
        audioTrackRef.current.pause();
      }
    }
  };

  // Toggle Voice Narration
  const toggleVoice = () => {
    const nextState = !voiceEnabled;
    setVoiceEnabled(nextState);
    voiceEngine.setMuted(!nextState);
    if (nextState) {
      voiceEngine.speakStep(step);
    }
  };

  // Timed Sequence Master Engine (5.5s per step)
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setStep((prevStep) => {
        if (prevStep < 9) return prevStep + 1;
        return 9;
      });
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Step 2: Deep Auto Scroll DOWN 28 Domains Container
  useEffect(() => {
    if (step === 2 && domainsContainerRef.current) {
      const el = domainsContainerRef.current;
      let scrollPos = 0;
      const interval = setInterval(() => {
        if (el && scrollPos < el.scrollHeight - el.clientHeight) {
          scrollPos += 30;
          el.scrollTo({ top: scrollPos, behavior: 'smooth' });
        } else {
          clearInterval(interval);
        }
      }, 250);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Step 3: Scroll UP back to Top & Select DevOps
  useEffect(() => {
    if (step === 3 && domainsContainerRef.current) {
      domainsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      setSelectedRole('devops-sre');
    }
  }, [step]);

  // Step 4: Quick Scroll DOWN Questions List
  useEffect(() => {
    if (step === 4 && questionsScrollRef.current) {
      const el = questionsScrollRef.current;
      let qPos = 0;
      const qInterval = setInterval(() => {
        if (el && qPos < el.scrollHeight - el.clientHeight) {
          qPos += 40;
          el.scrollTo({ top: qPos, behavior: 'smooth' });
        } else {
          clearInterval(qInterval);
        }
      }, 200);
      return () => clearInterval(qInterval);
    }
  }, [step]);

  // Auto expand first two DevOps questions in Step 4
  useEffect(() => {
    if (step === 4 && devopsQuestions.length > 0) {
      setExpandedIds({ 
        [devopsQuestions[0].id]: true,
        [devopsQuestions[1]?.id]: true
      });
    }
  }, [step, devopsQuestions]);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Video Recording Engine
  const startRecording = async () => {
    try {
      recordedChunksRef.current = [];
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'browser' },
        audio: false
      });

      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setIsRecording(false);
      };

      recorder.start();
      setIsRecording(true);

      stream.getVideoTracks()[0].onended = () => {
        if (recorder.state !== 'inactive') recorder.stop();
      };
    } catch (err) {
      console.error('Error starting video recording', err);
      alert('Screen recording permission was cancelled or not supported.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <div className={`min-h-screen font-mono transition-colors duration-500 overflow-x-hidden flex flex-col justify-between relative ${
      isLight ? 'bg-white text-slate-900 light-theme' : 'bg-[#03060c] text-slate-100'
    }`}>
      
      {/* Live Site Original Top Bezel Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#ef4444] via-[#eab308] to-[#10b981] z-[60] pointer-events-none" />

      {/* Retro Scanline Effect Layer */}
      <div className={`pointer-events-none fixed inset-0 z-[55] ${
        isLight ? 'opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)]' : 'opacity-[0.015] bg-[radial-gradient(#fff_1px,transparent_1px)]'
      } bg-[size:16px_16px]`} />

      {/* 🚀 TOP PRESENTATION CONTROL NAVBAR */}
      <div className={`sticky top-0 z-50 backdrop-blur-xl border-b px-4 py-3 flex flex-wrap items-center justify-between text-xs gap-3 transition-colors ${
        isLight ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm' : 'bg-[#070b14]/95 border-zinc-800 text-slate-100'
      }`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-black font-black uppercase tracking-wider rounded-xs shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Zap className="w-4 h-4 fill-current animate-pulse" />
            InterviewQ Launch Sequence
          </span>

          <span className={`hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Step <strong className="text-emerald-500 font-bold">{step} / 9</strong>
          </span>
        </div>

        {/* Navigation, Music, Narration & Video Download Controls */}
        <div className="flex items-center gap-2">
          {/* Step Selector Buttons */}
          <div className={`hidden xl:flex items-center border p-0.5 text-[9px] gap-0.5 ${
            isLight ? 'border-slate-300 bg-slate-100' : 'border-zinc-800 bg-zinc-950'
          }`}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((sNum) => (
              <button
                key={sNum}
                onClick={() => { setStep(sNum); setIsPlaying(false); }}
                className={`px-2 py-1 uppercase font-bold transition ${
                  step === sNum 
                    ? 'bg-emerald-500 text-black font-black' 
                    : (isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400 hover:text-white')
                }`}
              >
                {sNum === 1 && '1.Title'}
                {sNum === 2 && '2.28 Domains'}
                {sNum === 3 && '3.Scroll Up'}
                {sNum === 4 && '4.Questions'}
                {sNum === 5 && '5.Disciplines'}
                {sNum === 6 && '6.Difficulty'}
                {sNum === 7 && '7.6305 Qs'}
                {sNum === 8 && '8.InterviewQ'}
                {sNum === 9 && '9.MapIT Logo'}
              </button>
            ))}
          </div>

          {/* 📱 YouTube Reel 9:16 Aspect Ratio Toggle */}
          <button
            onClick={() => setIsReelMode(!isReelMode)}
            className={`flex items-center gap-1.5 px-3 py-1 border text-[11px] font-bold uppercase transition cursor-pointer ${
              isReelMode 
                ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.5)]' 
                : (isLight ? 'bg-slate-100 text-slate-700 border-slate-300 hover:border-slate-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-500')
            }`}
            title="Toggle YouTube Reel 9:16 Vertical Video Aspect Ratio"
          >
            {isReelMode ? <Smartphone className="w-3.5 h-3.5 fill-current animate-pulse" /> : <Monitor className="w-3.5 h-3.5" />}
            <span>{isReelMode ? '9:16 Reel Mode 📱' : '16:9 Desktop 🖥️'}</span>
          </button>

          {/* Voice Narration Toggle Button */}
          <button
            onClick={toggleVoice}
            className={`flex items-center gap-1.5 px-3 py-1 border text-[11px] font-bold uppercase transition cursor-pointer ${
              voiceEnabled 
                ? 'bg-emerald-400 text-black border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]' 
                : (isLight ? 'bg-slate-100 text-slate-700 border-slate-300 hover:border-slate-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-500')
            }`}
            title="Toggle Live Voice Narration for Presentation"
          >
            {voiceEnabled ? <Mic className="w-3.5 h-3.5 fill-current animate-pulse" /> : <MicOff className="w-3.5 h-3.5" />}
            <span>{voiceEnabled ? 'Narration: ON 🎙️' : 'Narration: OFF 🎙️'}</span>
          </button>

          {/* Background Music Toggle Button */}
          <button
            onClick={toggleMusic}
            className={`flex items-center gap-1.5 px-3 py-1 border text-[11px] font-bold uppercase transition cursor-pointer ${
              musicEnabled 
                ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]' 
                : (isLight ? 'bg-slate-100 text-slate-700 border-slate-300 hover:border-slate-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-500')
            }`}
            title="Toggle Archive.org Open Source Background Music & Transition Swells"
          >
            <Music className={`w-3.5 h-3.5 ${musicEnabled ? 'animate-bounce text-black' : (isLight ? 'text-slate-500' : 'text-zinc-400')}`} />
            <span>{musicEnabled ? 'Music: ON 🎵' : 'Music: OFF 🎵'}</span>
          </button>

          {/* Video Recording & Download Button */}
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-black border border-emerald-400 hover:bg-emerald-400 font-bold text-[11px] uppercase transition cursor-pointer shadow-md"
              title="Record presentation and generate downloadable video file"
            >
              <Video className="w-3.5 h-3.5 fill-current" />
              <span>Record &amp; Download MP4</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white border border-red-500 font-bold text-[11px] uppercase animate-pulse transition cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Stop &amp; Save Video</span>
            </button>
          )}

          {videoUrl && (
            <a
              href={videoUrl}
              download="MapIT_InterviewQ_Presentation.mp4"
              className="flex items-center gap-1.5 px-3 py-1 bg-cyan-400 text-black border border-cyan-300 font-black text-[11px] uppercase transition shadow-md"
            >
              <Download className="w-3.5 h-3.5 stroke-[3]" />
              <span>Download MP4 File</span>
            </a>
          )}

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1 border text-[11px] font-bold uppercase transition cursor-pointer ${
              isPlaying 
                ? 'bg-amber-400 text-black border-amber-400' 
                : (isLight ? 'bg-slate-100 text-slate-700 border-slate-300 hover:border-slate-400' : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-white')
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause Auto' : 'Auto Play'}</span>
          </button>

          <button
            onClick={() => { setStep(1); setIsPlaying(true); }}
            className={`flex items-center gap-1.5 px-3 py-1 border transition cursor-pointer text-[11px] font-bold uppercase ${
              isLight ? 'bg-slate-100 border-slate-300 hover:border-slate-400 text-slate-800' : 'bg-zinc-900 border-zinc-700 hover:border-zinc-400 text-zinc-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay</span>
          </button>

          <button
            onClick={() => setCurrentTheme(isLight ? 'dark' : 'light')}
            className={`p-1.5 border transition cursor-pointer ${
              isLight ? 'bg-slate-100 border-slate-300 hover:border-slate-400 text-slate-800' : 'bg-zinc-900 border-zinc-700 hover:border-zinc-400 text-zinc-200'
            }`}
          >
            {isLight ? <Moon className="w-3.5 h-3.5 text-indigo-600" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* 🎬 MAIN PRESENTATION CANVAS - YOUTUBE REEL 9:16 ASPECT RATIO */}
      <div className="flex-1 p-2 md:p-6 w-full flex flex-col justify-center items-center relative">
        <div className={`w-full flex flex-col justify-center relative transition-all duration-500 ${
          isReelMode 
            ? (isLight 
                ? 'max-w-[400px] h-[720px] aspect-[9/16] border-4 border-slate-300 rounded-3xl p-5 bg-white text-slate-900 shadow-[0_0_60px_rgba(16,185,129,0.25)] overflow-hidden my-auto'
                : 'max-w-[400px] h-[720px] aspect-[9/16] border-4 border-slate-700/80 rounded-3xl p-5 bg-[#05070f] text-slate-100 shadow-[0_0_60px_rgba(16,185,129,0.35)] overflow-hidden my-auto'
              )
            : 'max-w-6xl mx-auto my-auto'
        }`}>
        
        {/* Official MapIT Walking Ant Companion in Background */}
        <SidebarAnt theme={currentTheme} />

        {/* STEP 1: MAIN HEADING "MapIT InterviewQ" WITH LEFT SLIDE DISAPPEAR */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1-heading"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ x: '-150%', opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
              className={`text-center my-auto flex flex-col justify-center items-center ${
                isReelMode ? 'py-6 space-y-5' : 'py-24 space-y-6'
              }`}
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="inline-flex items-center gap-3 mb-1"
              >
                <div className={`border-2 flex items-center justify-center rounded-sm shadow-md ${
                  isReelMode ? 'w-12 h-12' : 'w-16 h-16'
                } ${
                  isLight ? 'border-slate-300 preserve-logo-bg bg-slate-100' : 'border-slate-800 preserve-logo-bg'
                }`}>
                  <span className={`preserve-logo font-black font-sans ${isReelMode ? 'text-2xl' : 'text-3xl'}`}>M</span>
                  <span className={`preserve-logo-green font-black font-sans ${isReelMode ? 'text-2xl' : 'text-3xl'}`}>I</span>
                </div>
                <div className={`border-2 flex items-center justify-center rounded-sm shadow-md ${
                  isReelMode ? 'w-12 h-12' : 'w-16 h-16'
                } ${
                  isLight ? 'border-slate-300 bg-white' : 'border-slate-800 bg-zinc-950'
                }`}>
                  <HelpCircle className={`${isReelMode ? 'w-7 h-7' : 'w-10 h-10'} text-cyan-500`} />
                </div>
              </motion.div>

              <h1 className={`font-black font-sans leading-tight flex flex-wrap items-center justify-center tracking-tighter ${
                isReelMode ? 'text-3xl sm:text-4xl' : 'text-4xl md:text-7xl'
              }`}>
                <span className="preserve-logo">Map</span>
                <span className="preserve-logo-green">IT</span>
                <span className={`font-sans font-black ${isReelMode ? 'ml-2' : 'ml-4'} ${isLight ? 'text-slate-900' : 'text-white'}`}>InterviewQ</span>
              </h1>

              <p className={`font-sans font-medium mx-auto ${
                isReelMode ? 'text-xs leading-relaxed max-w-[280px] text-zinc-300' : 'text-base md:text-xl max-w-xl text-zinc-300'
              }`}>
                Technical Interview Question Bank &amp; Hands-On Assessment Labs
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 2 & 3: ALL 28 DOMAINS SLIDE IN FROM RIGHT, AUTO-SCROLL DOWN, THEN SCROLL UP & SELECT DEVOPS */}
        <AnimatePresence>
          {(step === 2 || step === 3) && (
            <motion.div
              key="step2-28domains"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ x: '-150%', opacity: 0, transition: { duration: 0.9 } }}
              className="space-y-6 my-auto"
            >
              <div className={`flex items-center justify-between border-b pb-3 ${
                isLight ? 'border-slate-200' : 'border-zinc-800'
              }`}>
                <div className="flex items-center gap-3">
                  <Grid className="w-6 h-6 text-emerald-500" />
                  <h2 className={`text-xl md:text-2xl font-black uppercase tracking-wide font-mono ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    28 Domains
                  </h2>
                </div>
              </div>

              {/* ALL 28 DOMAINS CONTAINER */}
              <div 
                ref={domainsContainerRef}
                className={`overflow-y-auto scroll-smooth ${
                  isReelMode ? 'max-h-[480px] space-y-2 pr-1' : 'max-h-[460px] space-y-4 pr-2'
                }`}
              >
                <div className={`grid gap-2.5 ${
                  isReelMode ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                }`}>
                  {ALL_28_DOMAIN_SLUGS.map((slug, idx) => {
                    const meta = ROLE_CATEGORY_METADATA[slug] || {
                      label: slug.replace(/-/g, ' ').toUpperCase(),
                      icon: '📌',
                      description: 'Technical Question Bank'
                    };
                    const count = interviewQDatabase.filter(item => isRoleMatch(item.role_slug, slug)).length || 256;
                    const isDevOpsSelected = step === 3 && slug === 'devops-sre';

                    return (
                      <motion.div
                        key={slug}
                        initial={{ x: 350, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: idx * 0.12,
                          type: 'spring', 
                          damping: 22 
                        }}
                        className={`p-4 border-2 text-left relative transition-all duration-500 ${
                          isDevOpsSelected
                            ? 'border-sky-400 bg-sky-950/90 shadow-[0_0_40px_rgba(14,165,233,0.5)] scale-105 z-20 ring-2 ring-sky-400 text-white'
                            : (isLight 
                                ? 'bg-white border-slate-200 text-slate-800 shadow-sm hover:border-emerald-400' 
                                : 'bg-zinc-950/90 border-zinc-800 text-zinc-300')
                        }`}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 via-teal-500 to-sky-500" />

                        <div className="pl-2 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xl">{meta.icon}</span>
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border ${
                              isDevOpsSelected 
                                ? 'bg-sky-400 text-black border-sky-400' 
                                : (isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-zinc-900 text-zinc-400 border-zinc-800')
                            }`}>
                              {count} Qs
                            </span>
                          </div>

                          <h3 className={`text-xs md:text-sm font-bold ${
                            isDevOpsSelected ? 'text-white' : (isLight ? 'text-slate-900' : 'text-white')
                          }`}>
                            {meta.label}
                          </h3>

                          <p className={`text-[11px] line-clamp-2 font-sans ${
                            isDevOpsSelected ? 'text-sky-200' : (isLight ? 'text-slate-500' : 'text-zinc-400')
                          }`}>
                            {meta.description}
                          </p>
                        </div>

                        {isDevOpsSelected && (
                          <div className="absolute right-3 bottom-2 text-sky-400 flex items-center gap-1 text-[9px] font-mono font-bold uppercase animate-bounce">
                            <Sparkles className="w-3 h-3" />
                            <span>DEVOPS SELECTED</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 4: FLY UP DEVOPS CARD TO TOP LEFT & SHOWCASE QUESTIONS WITH QUICK SCROLL DOWN */}
        <AnimatePresence>
          {step === 4 && (
            <motion.div
              key="step4-questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ x: '-150%', opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
              className={`grid gap-4 my-auto ${
                isReelMode ? 'grid-cols-1 max-h-[480px] overflow-y-auto pr-1' : 'grid-cols-1 lg:grid-cols-3 gap-6'
              }`}
            >
              {/* TOP LEFT FLY-UP DEVOPS CARD */}
              <motion.div
                initial={{ y: 220, scale: 1.1, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', damping: 20 }}
                className={`lg:col-span-1 border-2 p-5 relative text-left self-start ${
                  isLight 
                    ? 'border-sky-300 bg-sky-50 text-slate-900 shadow-md' 
                    : 'border-sky-400 bg-sky-950/70 text-white shadow-[0_0_35px_rgba(14,165,233,0.4)]'
                }`}
              >
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-sky-400 to-indigo-600" />
                <div className="pl-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">⚡</span>
                  </div>

                  <h3 className={`text-base font-black uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    DevOps, SRE &amp; Platform Engineering
                  </h3>

                  <p className={`text-xs font-sans leading-relaxed ${isLight ? 'text-slate-700' : 'text-sky-200'}`}>
                    CI/CD, Kubernetes, Docker, Terraform, Ansible, Linux &amp; Observability labs.
                  </p>
                </div>
              </motion.div>

              {/* QUESTIONS LIST WITH AUTO SCROLL DOWN */}
              <motion.div
                initial={{ x: 150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="lg:col-span-2 space-y-3 text-left"
              >
                <div className={`flex items-center justify-between border-b pb-2 ${
                  isLight ? 'border-slate-200' : 'border-zinc-800'
                }`}>
                  <span className="text-xs font-mono font-bold text-sky-500 uppercase flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    DevOps Question Bank Showcase
                  </span>
                </div>

                <div 
                  ref={questionsScrollRef}
                  className="max-h-[380px] overflow-y-auto pr-2 space-y-3 scroll-smooth"
                >
                  {devopsQuestions.map((item) => {
                    const isExpanded = !!expandedIds[item.id];
                    return (
                      <div
                        key={item.id}
                        className={`border-2 p-3.5 text-left relative ${
                          isLight 
                            ? 'border-slate-200 bg-white text-slate-900 shadow-sm' 
                            : 'border-zinc-800 bg-zinc-950 text-white'
                        }`}
                      >
                        <div 
                          onClick={() => toggleExpand(item.id)}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono font-black px-2 py-0.5 bg-sky-400 text-black">
                              {item.id}
                            </span>
                            <h4 className={`text-xs md:text-sm font-bold font-sans ${
                              isLight ? 'text-slate-900' : 'text-white'
                            }`}>
                              {item.prompt}
                            </h4>
                          </div>
                          {isExpanded ? <ChevronDown className="w-4 h-4 text-sky-500" /> : <ChevronRight className="w-4 h-4" />}
                        </div>

                        {isExpanded && (
                          <div className={`pt-3 mt-3 border-t text-xs font-sans space-y-2 ${
                            isLight ? 'border-slate-200' : 'border-zinc-800'
                          }`}>
                            <div className={`p-3 border ${
                              isLight ? 'bg-sky-50/80 border-sky-200 text-slate-800' : 'bg-sky-950/40 border-sky-500/40 text-zinc-100'
                            }`}>
                              <span className="text-[10px] font-mono font-bold text-sky-500 block uppercase mb-1">
                                PREFERRED ANSWER
                              </span>
                              <p className={`leading-relaxed font-sans ${
                                isLight ? 'text-slate-800' : 'text-zinc-100'
                              }`}>
                                {item.preferred_answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 5: ALL 28 DOMAINS QUICKLY LISTED ON SINGLE SCREEN */}
        <AnimatePresence>
          {step === 5 && (
            <motion.div
              key="step5-all-disciplines"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.6 } }}
              className={`my-auto text-center ${isReelMode ? 'py-2 space-y-3' : 'py-6 space-y-5'}`}
            >
              <div className="space-y-1">
                <h2 className={`font-black uppercase tracking-wide font-mono ${
                  isReelMode ? 'text-xl' : 'text-2xl md:text-4xl'
                } ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  All 28 Domains
                </h2>
              </div>

              <div className={`grid gap-2 mx-auto ${
                isReelMode ? 'grid-cols-2 max-h-[460px] overflow-y-auto pr-1' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-5xl gap-3'
              }`}>
                {ALL_28_DOMAIN_SLUGS.map((slug, idx) => {
                  const meta = ROLE_CATEGORY_METADATA[slug] || {
                    label: slug.replace(/-/g, ' ').toUpperCase(),
                    icon: '📌'
                  };
                  return (
                    <motion.div
                      key={slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.4 }}
                      className={`p-2.5 border-2 text-left flex items-center gap-1.5 hover:border-emerald-500 transition ${
                        isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-zinc-950 border-zinc-800 text-white'
                      }`}
                    >
                      <span className="text-base">{meta.icon}</span>
                      <span className={`text-[11px] font-bold truncate font-sans ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        {meta.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 6: DIFFICULTY CATEGORIES SHOWCASE */}
        <AnimatePresence>
          {step === 6 && (
            <motion.div
              key="step6-difficulty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.6 } }}
              className={`my-auto text-center ${isReelMode ? 'py-4 space-y-4' : 'py-12 space-y-6'}`}
            >
              <div className="space-y-1">
                <h2 className={`font-black uppercase font-mono ${
                  isReelMode ? 'text-xl sm:text-2xl' : 'text-3xl md:text-5xl'
                } ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Question Difficulty Tiers
                </h2>
              </div>

              <div className={`mx-auto ${isReelMode ? 'space-y-2 max-w-xs' : 'space-y-3 max-w-3xl'}`}>
                {DIFFICULTY_TIERS.map((tier, idx) => (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.12, duration: 0.5, type: 'spring', damping: 20 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 border-2 text-left flex items-center justify-between hover:border-amber-400 transition shadow-md rounded-sm ${
                      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-zinc-950/90 border-zinc-800 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tier.icon}</span>
                      <h3 className={`font-black font-mono uppercase tracking-wide ${
                        isReelMode ? 'text-sm' : 'text-xl md:text-3xl'
                      } ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        {tier.name}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-400 text-black uppercase shrink-0">
                      {tier.count}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 7: QUANTIFIABLE NUMBERS (DOMAINS: 28, TOTAL INTERVIEW QUESTIONS: 6305) */}
        <AnimatePresence>
          {step === 7 && (
            <motion.div
              key="step7-6305questions"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15, transition: { duration: 0.6 } }}
              className={`my-auto text-center ${isReelMode ? 'py-4 space-y-4' : 'py-16 space-y-8'}`}
            >
              <div className={`grid gap-4 mx-auto ${
                isReelMode ? 'grid-cols-1 max-w-xs' : 'grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl'
              }`}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 border-2 space-y-2 text-center ${
                    isLight 
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950 shadow-md' 
                      : 'border-emerald-400 bg-emerald-950/40 text-white shadow-[0_0_40px_rgba(16,185,129,0.3)]'
                  }`}
                >
                  <h2 className={`font-black font-mono text-emerald-500 uppercase tracking-wide ${
                    isReelMode ? 'text-base' : 'text-xl md:text-2xl'
                  }`}>
                    Domains
                  </h2>
                  <span className={`font-black font-mono block ${
                    isReelMode ? 'text-5xl' : 'text-5xl md:text-7xl'
                  } ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    28
                  </span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 border-2 space-y-2 text-center ${
                    isLight 
                      ? 'border-cyan-300 bg-cyan-50 text-cyan-950 shadow-md' 
                      : 'border-cyan-400 bg-cyan-950/40 text-white shadow-[0_0_40px_rgba(6,182,212,0.3)]'
                  }`}
                >
                  <h2 className={`font-black font-mono text-cyan-500 uppercase tracking-wide ${
                    isReelMode ? 'text-base' : 'text-xl md:text-2xl'
                  }`}>
                    Total Interview Questions
                  </h2>
                  <span className={`font-black font-mono block ${
                    isReelMode ? 'text-5xl' : 'text-5xl md:text-7xl'
                  } ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    6305
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 8: RETURN OF INTERVIEWQ HEADER WITH MAPIT HIGHLIGHTED */}
        <AnimatePresence>
          {step === 8 && (
            <motion.div
              key="step8-interviewq-header"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.6 } }}
              className={`my-auto text-center flex flex-col items-center justify-center ${
                isReelMode ? 'py-8 space-y-4' : 'py-20 space-y-6'
              }`}
            >
              <div className={`border-2 flex items-center justify-center rounded-sm shadow-md mx-auto mb-1 animate-pulse ${
                isReelMode ? 'w-12 h-12' : 'w-16 h-16'
              } ${
                isLight ? 'border-slate-300 preserve-logo-bg bg-slate-100' : 'border-slate-800 preserve-logo-bg'
              }`}>
                <span className={`preserve-logo font-black font-sans ${isReelMode ? 'text-2xl' : 'text-3xl'}`}>M</span>
                <span className={`preserve-logo-green font-black font-sans ${isReelMode ? 'text-2xl' : 'text-3xl'}`}>I</span>
              </div>

              <h1 className={`font-black font-sans leading-tight flex flex-wrap items-center justify-center tracking-tighter ${
                isReelMode ? 'text-3xl sm:text-4xl' : 'text-4xl md:text-7xl'
              }`}>
                <span className="preserve-logo">Map</span>
                <span className="preserve-logo-green">IT</span>
                <span className={`font-sans font-black ${isReelMode ? 'ml-2' : 'ml-4'} ${isLight ? 'text-slate-900' : 'text-white'}`}>InterviewQ</span>
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 9: GRAND FINALE - MAPIT ORIGINAL LOGO & CLOSING CTA */}
        <AnimatePresence>
          {step === 9 && (
            <motion.div
              key="step9-original-logo"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: 'spring', damping: 18 }}
              className={`my-auto text-center relative overflow-hidden ${
                isReelMode ? 'py-10 space-y-6' : 'py-20 space-y-8'
              }`}
            >
              {/* MapIT Original Color Beam (Red, Gold, Emerald) */}
              <div className={`mx-auto h-2 bg-gradient-to-r from-[#ef4444] via-[#eab308] to-[#10b981] rounded-full shadow-[0_0_25px_rgba(16,185,129,0.8)] animate-pulse ${
                isReelMode ? 'max-w-xs mb-4' : 'max-w-xl mb-6'
              }`} />

              {/* Centered MapIT Original Logo */}
              <div className="relative inline-block space-y-5">
                <h1 className={`font-black font-sans leading-none flex items-center justify-center tracking-tighter ${
                  isReelMode ? 'text-4xl sm:text-5xl' : 'text-5xl md:text-7xl'
                }`}>
                  <span className="preserve-logo">Map</span>
                  <span className="preserve-logo-green">IT</span>
                </h1>

                {/* Closing Call to Action: visit itmap.in */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className={`inline-block border-2 border-emerald-400 bg-emerald-950/60 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.4)] ${
                    isReelMode ? 'px-4 py-2 text-xs' : 'px-6 py-3 text-sm md:text-base'
                  }`}
                >
                  <span className="font-mono font-black text-emerald-400 uppercase tracking-wider">
                    Visit <a href="https://itmap.in" target="_blank" rel="noreferrer" className="underline text-white hover:text-emerald-300 transition">itmap.in</a> to MapIT
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

export default InterviewQLaunch;
