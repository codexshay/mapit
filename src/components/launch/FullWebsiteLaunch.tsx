import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Award, 
  Terminal, 
  Wrench, 
  Play, 
  Pause, 
  RotateCcw, 
  Sun, 
  Moon, 
  Video, 
  Download, 
  Youtube, 
  Grid, 
  Users, 
  Layers, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Target, 
  Smartphone, 
  Monitor,
  HelpCircle,
  Briefcase,
  ExternalLink,
  Linkedin,
  Building2,
  CheckCircle2,
  Trophy,
  ArrowRight,
  GitCompare,
  UserCheck
} from 'lucide-react';
import { CHANNELS_POOL } from '../../data/youtubeDatabase';
import { TOP_50_COMPANIES } from '../../data/topCompaniesData';
import SidebarAnt from '../SidebarAnt';

export interface FullWebsiteLaunchProps {
  theme?: 'light' | 'dark';
}

const FEATURED_PILLARS = [
  { title: '28 IT Disciplines Explorer', desc: 'Role matrices, skill trees & career benchmarks', icon: '🗺️' },
  { title: '6,305+ Technical InterviewQs', desc: 'Scenario labs & 3 difficulty tiers', icon: '⚡' },
  { title: '450+ Verified HR Contacts [BETA]', desc: 'India, USA & Philippines verified contacts', icon: '💼' },
  { title: '250+ IT Companies & Referrals', desc: 'Direct career sections & LinkedIn job links', icon: '🏢' }
];

// Sample Roles for Comparator
const COMPARATOR_ROLES = [
  {
    role: 'DevOps Engineer',
    category: 'Cloud & Infrastructure',
    salaryRange: '$95k - $160k',
    topSkills: ['Kubernetes', 'Terraform', 'CI/CD', 'Docker', 'Linux', 'AWS'],
    demand: 'Very High 🔥'
  },
  {
    role: 'Cloud Architect',
    category: 'Architecture & Strategy',
    salaryRange: '$130k - $210k',
    topSkills: ['Multi-Cloud', 'Security Governance', 'IaC Architecture', 'Cost Optimization', 'System Design'],
    demand: 'Extreme 🚀'
  }
];

export const FullWebsiteLaunch: React.FC<FullWebsiteLaunchProps> = ({
  theme: initialTheme = 'light'
}) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(initialTheme);
  const isLight = currentTheme === 'light';

  // 9-Step Full Platform Sequence (4s per step)
  const [step, setStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isReelMode, setIsReelMode] = useState<boolean>(true);

  // Video Recorder States
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // Comparator interactive step sub-state
  const [showProfile, setShowProfile] = useState<boolean>(false);

  // Timed Master Engine (4s per step)
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setStep((prevStep) => {
        if (prevStep < 9) return prevStep + 1;
        return 9;
      });
    }, 4200);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Step 7: Auto-open Profile after 1.8s
  useEffect(() => {
    if (step === 7) {
      setShowProfile(false);
      const timer = setTimeout(() => {
        setShowProfile(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [step]);

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

      {/* 🚀 TOP NAVIGATION CONTROL RIBBON */}
      <div className={`sticky top-0 z-50 backdrop-blur-xl border-b px-4 py-3 flex flex-wrap items-center justify-between text-xs gap-3 transition-colors ${
        isLight ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm' : 'bg-[#070b14]/95 border-zinc-800 text-slate-100'
      }`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-black font-black uppercase tracking-wider rounded-xs shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Zap className="w-4 h-4 fill-current animate-pulse" />
            Full Platform Reel
          </span>
        </div>

        {/* Video Controls & Mode Switcher */}
        <div className="flex items-center gap-2">
          {/* Quick Jump Buttons */}
          <div className={`hidden lg:flex items-center border p-0.5 text-[9px] gap-0.5 ${
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
                {sNum === 2 && '2.Domains'}
                {sNum === 3 && '3.InterviewQ'}
                {sNum === 4 && '4.HR Contacts'}
                {sNum === 5 && '5.Jobs 250+'}
                {sNum === 6 && '6.Resources'}
                {sNum === 7 && '7.Comparator'}
                {sNum === 8 && '8.Totals'}
                {sNum === 9 && '9.MapIT'}
              </button>
            ))}
          </div>

          {/* Reel Aspect Ratio Toggle */}
          <button
            onClick={() => setIsReelMode(!isReelMode)}
            className={`flex items-center gap-1.5 px-3 py-1 border text-[11px] font-bold uppercase transition cursor-pointer ${
              isReelMode 
                ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.5)]' 
                : (isLight ? 'bg-slate-100 text-slate-700 border-slate-300 hover:border-slate-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-500')
            }`}
          >
            {isReelMode ? <Smartphone className="w-3.5 h-3.5 fill-current animate-pulse" /> : <Monitor className="w-3.5 h-3.5" />}
            <span>{isReelMode ? '9:16 Reel 📱' : '16:9 Desktop 🖥️'}</span>
          </button>

          {/* Record & Download Button */}
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-black border border-emerald-400 hover:bg-emerald-400 font-bold text-[11px] uppercase transition cursor-pointer shadow-md"
            >
              <Video className="w-3.5 h-3.5 fill-current" />
              <span>Record MP4</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white border border-red-500 font-bold text-[11px] uppercase animate-pulse transition cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Stop &amp; Save</span>
            </button>
          )}

          {videoUrl && (
            <a
              href={videoUrl}
              download="MapIT_Full_Platform_Reel.mp4"
              className="flex items-center gap-1.5 px-3 py-1 bg-cyan-400 text-black border border-cyan-300 font-black text-[11px] uppercase transition shadow-md"
            >
              <Download className="w-3.5 h-3.5 stroke-[3]" />
              <span>Download MP4</span>
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
            <span>{isPlaying ? 'Pause' : 'Auto'}</span>
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

        {/* STEP 1: GRAND PLATFORM ENTRANCE WITH BETA TAG ON HR CONTACTS */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1-title"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ x: '-150%', opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
              className={`text-center my-auto flex flex-col justify-center items-center ${
                isReelMode ? 'py-4 space-y-4' : 'py-20 space-y-6'
              }`}
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="inline-flex items-center gap-3 mb-1"
              >
                <div className={`border-2 flex items-center justify-center rounded-sm shadow-md ${
                  isReelMode ? 'w-14 h-14' : 'w-16 h-16'
                } ${
                  isLight ? 'border-slate-300 preserve-logo-bg bg-slate-100' : 'border-slate-800 preserve-logo-bg'
                }`}>
                  <span className={`preserve-logo font-black font-sans ${isReelMode ? 'text-3xl' : 'text-4xl'}`}>M</span>
                  <span className={`preserve-logo-green font-black font-sans ${isReelMode ? 'text-3xl' : 'text-4xl'}`}>I</span>
                </div>
              </motion.div>

              <h1 className={`font-black font-sans leading-tight flex items-center justify-center tracking-tighter ${
                isReelMode ? 'text-4xl sm:text-5xl' : 'text-5xl md:text-7xl'
              }`}>
                <span className="preserve-logo">Map</span>
                <span className="preserve-logo-green">IT</span>
              </h1>

              <p className={`font-sans font-bold max-w-xs mx-auto ${
                isReelMode ? 'text-xs leading-relaxed text-slate-700' : 'text-base md:text-xl text-slate-700'
              }`}>
                IT Career Navigation &amp; Skill Intelligence Platform
              </p>

              <div className="grid grid-cols-2 gap-2 max-w-xs pt-1">
                {FEATURED_PILLARS.map((p) => (
                  <div key={p.title} className="p-2 border border-slate-200 bg-slate-50 text-left rounded-sm space-y-0.5 relative">
                    <span className="text-base">{p.icon}</span>
                    <h4 className="text-[10px] font-bold font-sans text-slate-900 truncate">
                      {p.title}
                    </h4>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 2: 28 IT DISCIPLES & SKILL TREES */}
        <AnimatePresence>
          {step === 2 && (
            <motion.div
              key="step2-taxonomy"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ x: '-150%', opacity: 0, transition: { duration: 0.9 } }}
              className="space-y-4 my-auto text-left"
            >
              <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
                <Grid className="w-6 h-6 text-emerald-500" />
                <h2 className="text-xl font-black font-mono uppercase text-slate-900">
                  28 IT Disciplines &amp; Skill Trees
                </h2>
              </div>

              {/* Fast Stream Scroller of All 28 Disciplines */}
              <div className="grid grid-cols-2 gap-2 text-left max-h-[460px] overflow-y-auto pr-1">
                {[
                  'DevOps & SRE', 'Cloud Architecture', 'Cybersecurity', 'Software Dev',
                  'Data Science & AI', 'Systems & Infra', 'Networking & Telecom', 'QA & Automation',
                  'Database Admin', 'ITSM & IT Ops', 'UI/UX & Product', 'Governance & Audit',
                  'Frontend Developer', 'Backend Developer', 'Enterprise ERP/CRM', 'Technical Writing',
                  'Hardware & IoT', 'Solution Architect', 'IT Executive', 'Business Analysis',
                  'Site Reliability', 'Platform Engineering', 'SecOps', 'Data Engineering',
                  'AI Prompt Engineer', 'Cloud Network Engineer', 'Green Computing', 'Customer Success'
                ].map((disc, idx) => (
                  <motion.div 
                    key={disc}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.3 }}
                    className="p-2 border-2 border-slate-200 bg-white text-slate-900 font-sans font-bold text-[11px] hover:border-emerald-500 transition shadow-sm rounded-sm flex items-center justify-between"
                  >
                    <span className="truncate">{disc}</span>
                    <span className="text-[8px] font-mono px-1 py-0.2 bg-emerald-100 text-emerald-800 font-black">256+ Qs</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 3: 6,305+ TECHNICAL INTERVIEWQS & SCENARIO LABS (SHOWING VOLUME) */}
        <AnimatePresence>
          {step === 3 && (
            <motion.div
              key="step3-interviewq"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.6 } }}
              className="space-y-4 my-auto text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-sky-500" />
                  <h2 className="text-xl font-black font-mono uppercase text-slate-900">
                    6,305+ Technical InterviewQs
                  </h2>
                </div>
                <span className="text-[10px] font-mono font-black px-2 py-0.5 bg-sky-500 text-white uppercase">
                  3 TIERS / 28 DOMAINS
                </span>
              </div>

              {/* Fast Streaming Question Volume Cards */}
              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {[
                  { tag: 'DEVOPS & K8S', q: 'How do you debug CrashLoopBackOff in Kubernetes pods?', ans: 'Check kubectl logs --previous, inspect OOMKilled events, verify readiness probes & entrypoint scripts.' },
                  { tag: 'CYBERSECURITY', q: 'What are the zero-trust architecture pillars?', ans: 'Explicit identity verification, least privilege access, assume breach posture & micro-segmentation.' },
                  { tag: 'SYSTEMS & LINUX', q: 'How do you analyze system load average spikes in Linux?', ans: 'Run top/htop, uptime, vmstat 1, iostat -xz 1 to inspect CPU wait vs Disk I/O bottlenecks.' },
                  { tag: 'CLOUD ARCHITECTURE', q: 'Compare AWS S3 Storage Classes for cost optimization', ans: 'Standard -> Infrequent Access -> Glacier Flexible -> Glacier Deep Archive ($0.00099/GB/mo).' },
                  { tag: 'DATA ENGINEERING', q: 'Explain Apache Kafka partition rebalancing strategies', ans: 'Cooperative Sticky Assignor avoids stop-the-world pauses during consumer group member changes.' }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    className="p-2.5 border-2 border-sky-300 bg-sky-50 text-slate-900 space-y-1 rounded-sm"
                  >
                    <span className="text-[9px] font-mono font-black px-1.5 py-0.2 bg-sky-600 text-white uppercase">{item.tag}</span>
                    <h4 className="text-xs font-bold font-sans">{item.q}</h4>
                    <p className="text-[10px] text-slate-700 font-sans leading-snug line-clamp-2">{item.ans}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 4: 450+ VERIFIED HR CONTACTS [BETA] (INDIA 🇮🇳, USA 🇺🇸, PHILIPPINES 🇵🇭) */}
        <AnimatePresence>
          {step === 4 && (
            <motion.div
              key="step4-hr"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.6 } }}
              className="space-y-4 my-auto text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-xl font-black font-mono uppercase text-slate-900">
                    HR Contacts Directory
                  </h2>
                </div>
                <span className="text-xs font-mono font-black px-2 py-0.5 bg-rose-500 text-white uppercase rounded-xs animate-pulse">
                  BETA 🚀
                </span>
              </div>

              {/* Real Verified Count & Country Coverage Notice */}
              <div className="p-3 border-2 border-indigo-300 bg-indigo-50 text-slate-900 space-y-2 rounded-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-indigo-700">450+ VERIFIED CONTACTS</span>
                  <div className="flex items-center gap-1.5 text-base">
                    <span>🇮🇳</span>
                    <span>🇺🇸</span>
                    <span>🇵🇭</span>
                  </div>
                </div>
                <p className="text-xs font-sans text-slate-800 leading-snug">
                  Verified HR contact directories live for <strong>India 🇮🇳</strong>, <strong>United States 🇺🇸</strong>, and <strong>Philippines 🇵🇭</strong>.
                </p>
                <div className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 p-1.5 border border-amber-300 rounded-xs">
                  * Other country directories are currently in verification pipeline.
                </div>
              </div>

              {/* Sample Verified Cities & Regional Clusters */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {[
                  { city: 'Bengaluru, India 🇮🇳', count: '120+ Listings' },
                  { city: 'New York, USA 🇺🇸', count: '85+ Listings' },
                  { city: 'Manila, Philippines 🇵🇭', count: '65+ Listings' },
                  { city: 'Hyderabad, India 🇮🇳', count: '90+ Listings' }
                ].map((c, i) => (
                  <div key={i} className="p-2 border border-slate-200 bg-white text-slate-900 space-y-0.5 rounded-sm">
                    <h4 className="text-[11px] font-bold font-sans text-slate-900 truncate">{c.city}</h4>
                    <span className="text-[9px] font-mono font-bold text-indigo-600 block">{c.count}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 5: NEW SLIDE - JOBS & REFERRALS (FAST SWIPE-LEFT ACCELERATING STREAM OF 250+ IT COMPANIES) */}
        <AnimatePresence>
          {step === 5 && (
            <motion.div
              key="step5-jobs"
              initial={{ opacity: 0, x: 250 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.6 } }}
              className="space-y-4 my-auto text-left overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-sky-600" />
                  <h2 className="text-xl font-black font-mono uppercase text-slate-900">
                    Jobs &amp; Company Referrals
                  </h2>
                </div>
                <span className="text-xs font-mono font-black px-2 py-0.5 bg-sky-600 text-white uppercase">
                  250+ IT COMPANIES
                </span>
              </div>

              {/* Accelerating Fast Swipe-Left Stream of 50+ IT Companies (Light Theme) */}
              <div className="relative overflow-hidden w-full py-2 bg-sky-50 border border-sky-200 text-slate-900 rounded-sm">
                <div className="text-[9px] font-mono font-bold px-3 py-1 bg-sky-600 text-white uppercase mb-2 inline-block rounded-xs ml-1">
                  ⚡ ACCELERATING COMPANY DIRECTORY
                </div>
                
                {/* Marquee Row 1 (Starts slow then speeds up) */}
                <motion.div
                  animate={{ x: [-2800, 0] }}
                  transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                  className="inline-flex gap-2.5 whitespace-nowrap px-1"
                >
                  {TOP_50_COMPANIES.concat(TOP_50_COMPANIES).map((comp, idx) => (
                    <div key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-sky-300 font-mono text-xs text-slate-900 rounded-xs shadow-sm">
                      <span className="text-sky-600 font-bold">🏢</span>
                      <span className="font-bold text-slate-900">{comp.name}</span>
                      <span className="text-[9px] text-slate-700 px-1.5 py-0.5 bg-sky-100 font-bold rounded-xs">{comp.category}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="p-3 border-2 border-sky-300 bg-sky-50 text-slate-900 rounded-sm text-center">
                <h3 className="text-base font-black font-mono text-sky-900 uppercase">
                  More than 250+ IT Companies Listed
                </h3>
                <p className="text-xs font-sans text-slate-700">
                  Direct links to Official Career Pages &amp; LinkedIn Employee Referral Sections
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 6: RESOURCES, GLOBAL HACKATHONS & YOUTUBE EDUCATORS */}
        <AnimatePresence>
          {step === 6 && (
            <motion.div
              key="step6-resources"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.6 } }}
              className="space-y-4 my-auto text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-amber-500" />
                  <h2 className="text-xl font-black font-mono uppercase text-slate-900">
                    Resources &amp; Global Hackathons
                  </h2>
                </div>
                <span className="text-xs font-mono font-black px-2 py-0.5 bg-amber-500 text-black uppercase">
                  FIND &amp; APPLY GLOBALLY
                </span>
              </div>

              {/* YouTube Educators Fast Ticker */}
              <div className="overflow-hidden w-full py-1.5 bg-red-50 border-y border-red-200 rounded-sm">
                <motion.div
                  animate={{ x: [-1500, 0] }}
                  transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
                  className="inline-flex gap-2 whitespace-nowrap"
                >
                  {CHANNELS_POOL.slice(0, 15).map((ch, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white border border-red-300 text-xs font-bold font-mono text-slate-900">
                      <Youtube className="w-3.5 h-3.5 text-red-600 fill-current" />
                      {ch.name}
                    </span>
                  ))}
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 border-2 border-amber-300 bg-amber-50 text-slate-900 space-y-0.5 rounded-sm">
                  <span className="text-lg">🏆</span>
                  <h4 className="text-xs font-bold font-sans">45+ Global Hackathons</h4>
                  <p className="text-[10px] text-slate-600 font-sans">Find &amp; Apply Globally</p>
                </div>
                <div className="p-2.5 border-2 border-amber-300 bg-amber-50 text-slate-900 space-y-0.5 rounded-sm">
                  <span className="text-lg">📖</span>
                  <h4 className="text-xs font-bold font-sans">120+ Free Books &amp; Certs</h4>
                  <p className="text-[10px] text-slate-600 font-sans">85+ Industry Certs</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 7: NEW SLIDE - ROLE COMPARATOR & PROFILING (COMPARE TWO ROLES -> OPEN PROFILE -> APPLY LINKEDIN) */}
        <AnimatePresence>
          {step === 7 && (
            <motion.div
              key="step7-comparator"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.6 } }}
              className="space-y-4 my-auto text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <GitCompare className="w-6 h-6 text-purple-600" />
                  <h2 className="text-xl font-black font-mono uppercase text-slate-900">
                    Role Comparator &amp; Profiling
                  </h2>
                </div>
                <span className="text-xs font-mono font-black px-2 py-0.5 bg-purple-600 text-white uppercase">
                  COMPARE &amp; APPLY
                </span>
              </div>

              {!showProfile ? (
                /* Comparator Grid View */
                <div className="grid grid-cols-2 gap-2 text-slate-900">
                  {COMPARATOR_ROLES.map((r, i) => (
                    <motion.div 
                      key={r.role}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="p-3 border-2 border-purple-200 bg-purple-50/70 space-y-1.5 rounded-sm"
                    >
                      <span className="text-[9px] font-mono font-bold text-purple-700 uppercase">{r.category}</span>
                      <h4 className="text-xs font-bold font-sans text-slate-900">{r.role}</h4>
                      <div className="text-[10px] font-mono text-emerald-700 font-bold">Salary: {r.salaryRange}</div>
                      <div className="text-[9px] font-sans text-slate-600">Demand: {r.demand}</div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Profile View with LinkedIn Jobs Link */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 border-2 border-emerald-400 bg-emerald-50 text-slate-900 space-y-3 rounded-sm relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black px-2 py-0.5 bg-emerald-500 text-white uppercase flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      DEVOPS ENGINEER PROFILE
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-800">RECOMMENDED MATCH</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-bold font-sans text-slate-900">DevOps &amp; Infrastructure Engineering</h3>
                    <p className="text-xs font-sans text-slate-700">Master Kubernetes, Terraform IaC, Prometheus Monitoring &amp; CI/CD Pipelines.</p>
                  </div>

                  {/* LinkedIn Apply Button Highlight */}
                  <div className="pt-1">
                    <a
                      href="https://www.linkedin.com/jobs/search/?keywords=DevOps+Engineer"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0077b5] text-white font-mono font-bold text-xs rounded-xs shadow-md animate-pulse"
                    >
                      <Linkedin className="w-4 h-4 fill-current" />
                      <span>Search &amp; Apply Jobs on LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 8: QUANTIFIABLE PLATFORM METRICS & DETAILED RESOURCE LISTINGS */}
        <AnimatePresence>
          {step === 8 && (
            <motion.div
              key="step8-totals"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.6 } }}
              className="py-4 space-y-4 my-auto text-center"
            >
              <div className="grid grid-cols-2 gap-2.5 max-w-xs mx-auto">
                <div className="p-3 border-2 border-emerald-300 bg-emerald-50 text-slate-900 text-center rounded-sm space-y-0.5">
                  <h4 className="text-[10px] font-black font-mono text-emerald-600 uppercase">Disciplines</h4>
                  <span className="text-3xl font-black font-mono text-slate-900 block">28</span>
                </div>
                <div className="p-3 border-2 border-sky-300 bg-sky-50 text-slate-900 text-center rounded-sm space-y-0.5">
                  <h4 className="text-[10px] font-black font-mono text-sky-600 uppercase">InterviewQs</h4>
                  <span className="text-3xl font-black font-mono text-slate-900 block">6,305+</span>
                </div>
                <div className="p-3 border-2 border-indigo-300 bg-indigo-50 text-slate-900 text-center rounded-sm space-y-0.5">
                  <h4 className="text-[10px] font-black font-mono text-indigo-600 uppercase">HR Contacts [BETA]</h4>
                  <span className="text-3xl font-black font-mono text-slate-900 block">450+</span>
                </div>
                <div className="p-3 border-2 border-purple-300 bg-purple-50 text-slate-900 text-center rounded-sm space-y-0.5">
                  <h4 className="text-[10px] font-black font-mono text-purple-600 uppercase">IT Companies</h4>
                  <span className="text-3xl font-black font-mono text-slate-900 block">250+</span>
                </div>
              </div>

              {/* Exact Specified Resource Callouts */}
              <div className="p-3 border-2 border-slate-300 bg-slate-50 text-slate-900 rounded-sm text-left space-y-1.5 max-w-xs mx-auto">
                <div className="text-[11px] font-mono font-black text-slate-900 uppercase border-b pb-1">
                  EXPLORE PLATFORM RESOURCES:
                </div>
                <ul className="text-xs font-sans space-y-1 text-slate-800">
                  <li className="flex items-center gap-1.5"><span className="text-emerald-500 font-bold">✓</span> Hackathons &amp; Events Search</li>
                  <li className="flex items-center gap-1.5"><span className="text-emerald-500 font-bold">✓</span> YouTube Teachers Directory</li>
                  <li className="flex items-center gap-1.5"><span className="text-emerald-500 font-bold">✓</span> Industry Certifications</li>
                  <li className="flex items-center gap-1.5"><span className="text-emerald-500 font-bold">✓</span> Skills &amp; Tools Pool</li>
                  <li className="flex items-center gap-1.5 font-bold text-emerald-700">...and much more!</li>
                </ul>
              </div>
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
              className="my-auto text-center space-y-6 relative overflow-hidden py-10"
            >
              {/* MapIT Original Color Beam (Red, Gold, Emerald) */}
              <div className="max-w-xs mx-auto h-2 bg-gradient-to-r from-[#ef4444] via-[#eab308] to-[#10b981] rounded-full shadow-[0_0_25px_rgba(16,185,129,0.8)] mb-4 animate-pulse" />

              {/* Centered MapIT Original Logo */}
              <div className="relative inline-block space-y-5">
                <h1 className="text-4xl sm:text-5xl font-black font-sans leading-none flex items-center justify-center tracking-tighter">
                  <span className="preserve-logo">Map</span>
                  <span className="preserve-logo-green">IT</span>
                </h1>

                {/* Closing Call to Action: Visit itmap.in to MapIT */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="inline-block px-4 py-2 border-2 border-emerald-400 bg-emerald-950/60 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                >
                  <span className="text-xs font-mono font-black text-emerald-400 uppercase tracking-wider">
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

export default FullWebsiteLaunch;
