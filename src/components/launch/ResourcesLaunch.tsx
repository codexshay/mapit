import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Trophy, 
  Globe, 
  Layers, 
  Compass,
  Zap,
  Sparkles,
  ExternalLink,
  Book,
  Smartphone,
  Monitor
} from 'lucide-react';
import { CERTIFICATIONS_LIBRARY } from '../../data/librariesData';
import { CHANNELS_POOL } from '../../data/youtubeDatabase';
import { GLOBAL_HACKATHONS } from '../Hackathons';
import SidebarAnt from '../SidebarAnt';

export interface ResourcesLaunchProps {
  theme?: 'light' | 'dark';
  isLight?: boolean;
}

// Curated Essential Books for Showcase
const ESSENTIAL_BOOKS = [
  { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', category: 'Architecture & Distributed Systems', icon: '⚡' },
  { title: 'Kubernetes Up & Running', author: 'Kelsey Hightower, Brendan Burns', category: 'DevOps & Containers', icon: '🐳' },
  { title: 'Linux Command Line & Shell Scripting', author: 'Richard Blum', category: 'Systems Administration', icon: '🐧' },
  { title: 'The Practice of Network Security', author: 'Richard Bejtlich', category: 'Cybersecurity', icon: '🛡️' },
  { title: 'AWS Certified Solutions Architect Study Guide', author: 'Ben Piper, David Clinton', category: 'Cloud Computing', icon: '☁️' },
  { title: 'Site Reliability Engineering', author: 'Betsy Beyer, Chris Jones', category: 'SRE & Infrastructure', icon: '🛠️' }
];

// Curated Tech YouTube Educators
const ESSENTIAL_EDUCATORS = [
  { name: 'freeCodeCamp.org', subscribers: '9.8M Subs', domain: 'Full Stack & Computer Science', bestFor: 'Complete 10-hour Bootcamps & CS Fundamentals' },
  { name: 'TechWorld with Nana', subscribers: '1.2M Subs', domain: 'DevOps & Cloud Native', bestFor: 'Kubernetes, Docker, Terraform & CI/CD' },
  { name: 'NetworkChuck', subscribers: '3.4M Subs', domain: 'Networking & Security', bestFor: 'CCNA, Linux, Python & Hacking Labs' },
  { name: 'Fireship (Jeff Delaney)', subscribers: '3.1M Subs', domain: 'Software & Code Architecture', bestFor: 'High-speed 100-Second Code Explanations' },
  { name: 'Traversy Media', subscribers: '2.2M Subs', domain: 'Web & API Engineering', bestFor: 'Practical Projects & Crash Courses' },
  { name: 'Hussein Nasser', subscribers: '420K Subs', domain: 'Backend Engineering & Protocols', bestFor: 'Database Internals, Networking & HTTP/3' }
];

// Curated Enterprise Tools
const ESSENTIAL_TOOLS = [
  { name: 'Docker & Podman', category: 'Containers', desc: 'Containerization engine & OCI image runtime' },
  { name: 'Kubectl & Helm', category: 'Orchestration', desc: 'Kubernetes CLI & package manager' },
  { name: 'Wireshark & Tcpdump', category: 'Networking', desc: 'Network packet analysis & packet capture' },
  { name: 'Postman & Insomnia', category: 'API Testing', desc: 'REST & GraphQL API debugging suite' },
  { name: 'Ansible & Terraform', category: 'IaC & Automation', desc: 'Infrastructure as Code & configuration management' },
  { name: 'Nmap & Metasploit', category: 'Security & Audit', desc: 'Network mapper & penetration testing framework' }
];

export const ResourcesLaunch: React.FC<ResourcesLaunchProps> = ({
  theme: initialTheme = 'light'
}) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(initialTheme);
  const isLight = currentTheme === 'light';

  // 7-Step Presentation Sequence State (5.5s per step)
  const [step, setStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isReelMode, setIsReelMode] = useState<boolean>(true); // 9:16 Reel Aspect Ratio mode

  // Video Recorder States
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const booksContainerRef = useRef<HTMLDivElement>(null);
  const certsContainerRef = useRef<HTMLDivElement>(null);

  // Timed Master Engine (5.5s per step)
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setStep((prevStep) => {
        if (prevStep < 7) return prevStep + 1;
        return 7;
      });
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Step 2: Auto Scroll Books Showcase
  useEffect(() => {
    if (step === 2 && booksContainerRef.current) {
      const el = booksContainerRef.current;
      let scrollPos = 0;
      const interval = setInterval(() => {
        if (el && scrollPos < el.scrollHeight - el.clientHeight) {
          scrollPos += 25;
          el.scrollTo({ top: scrollPos, behavior: 'smooth' });
        } else {
          clearInterval(interval);
        }
      }, 250);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Step 3: Auto Scroll Certifications Showcase
  useEffect(() => {
    if (step === 3 && certsContainerRef.current) {
      const el = certsContainerRef.current;
      let cPos = 0;
      const cInterval = setInterval(() => {
        if (el && cPos < el.scrollHeight - el.clientHeight) {
          cPos += 30;
          el.scrollTo({ top: cPos, behavior: 'smooth' });
        } else {
          clearInterval(cInterval);
        }
      }, 220);
      return () => clearInterval(cInterval);
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

      {/* Background Retro Grid Layer */}
      <div className={`pointer-events-none fixed inset-0 z-[55] ${
        isLight ? 'opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)]' : 'opacity-[0.015] bg-[radial-gradient(#fff_1px,transparent_1px)]'
      } bg-[size:16px_16px]`} />

      {/* 🚀 TOP NAVIGATION CONTROL RIBBON */}
      <div className={`sticky top-0 z-50 backdrop-blur-xl border-b px-4 py-3 flex flex-wrap items-center justify-between text-xs gap-3 transition-colors ${
        isLight ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm' : 'bg-[#070b14]/95 border-zinc-800 text-slate-100'
      }`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-black font-black uppercase tracking-wider rounded-xs shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Zap className="w-4 h-4 fill-current animate-pulse" />
            Resources Showcase
          </span>
        </div>

        {/* Video Recorder & Playback Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Jump Buttons */}
          <div className={`hidden lg:flex items-center border p-0.5 text-[9px] gap-0.5 ${
            isLight ? 'border-slate-300 bg-slate-100' : 'border-zinc-800 bg-zinc-950'
          }`}>
            {[1, 2, 3, 4, 5, 6, 7].map((sNum) => (
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
                {sNum === 2 && '2.Books'}
                {sNum === 3 && '3.Certs'}
                {sNum === 4 && '4.YouTube'}
                {sNum === 5 && '5.Tools'}
                {sNum === 6 && '6.Metrics'}
                {sNum === 7 && '7.MapIT'}
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

          {/* Record & Download Button */}
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-black border border-emerald-400 hover:bg-emerald-400 font-bold text-[11px] uppercase transition cursor-pointer shadow-md"
              title="Record presentation and download MP4 video"
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
              download="MapIT_Resources_Presentation.mp4"
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

        {/* STEP 1: TITLE SLIDE - MAPIT RESOURCES */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1-resources-title"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ x: '-150%', opacity: 0, transition: { duration: 1.1, ease: 'easeInOut' } }}
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
                  <BookOpen className={`${isReelMode ? 'w-7 h-7' : 'w-10 h-10'} text-emerald-400`} />
                </div>
              </motion.div>

              <h1 className={`font-black font-sans leading-tight flex flex-wrap items-center justify-center tracking-tighter ${
                isReelMode ? 'text-3xl sm:text-4xl' : 'text-4xl md:text-7xl'
              }`}>
                <span className="preserve-logo">Map</span>
                <span className="preserve-logo-green">IT</span>
                <span className={`font-sans font-black ${isReelMode ? 'ml-2' : 'ml-4'} ${isLight ? 'text-slate-900' : 'text-white'}`}>Resources</span>
              </h1>

              <p className={`font-sans font-medium mx-auto ${
                isReelMode ? 'text-xs leading-relaxed max-w-[280px] text-zinc-300' : 'text-base md:text-xl max-w-xl text-zinc-300'
              }`}>
                Curated Books, IT Certifications, Open Source Tools &amp; Tech Masterclasses
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 2: FREE ENGINEERING BOOKS SHOWCASE */}
        <AnimatePresence>
          {step === 2 && (
            <motion.div
              key="step2-books"
              initial={{ opacity: 0, x: 250 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ x: '-150%', opacity: 0, transition: { duration: 0.9 } }}
              className="space-y-6 my-auto text-left"
            >
              <div className={`flex items-center justify-between border-b pb-3 ${
                isLight ? 'border-slate-200' : 'border-zinc-800'
              }`}>
                <div className="flex items-center gap-3">
                  <Book className="w-6 h-6 text-emerald-400" />
                  <h2 className={`text-xl md:text-3xl font-black uppercase font-mono ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    Free Recommended Books &amp; Manuals
                  </h2>
                </div>
              </div>

              <div 
                ref={booksContainerRef}
                className="max-h-[440px] overflow-y-auto pr-2 space-y-3 scroll-smooth"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ESSENTIAL_BOOKS.map((book, idx) => (
                    <motion.div
                      key={book.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className={`p-5 border-2 text-left space-y-2 relative transition-all duration-300 hover:border-emerald-400 ${
                        isLight 
                          ? 'bg-white border-slate-200 text-slate-900 shadow-sm' 
                          : 'bg-zinc-950/90 border-zinc-800 text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{book.icon}</span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-400 text-black uppercase">
                          {book.category}
                        </span>
                      </div>
                      <h3 className="text-base font-bold font-sans text-white">
                        {book.title}
                      </h3>
                      <p className={`text-xs font-sans ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                        Author: {book.author}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 3: INDUSTRY IT CERTIFICATIONS SHOWCASE */}
        <AnimatePresence>
          {step === 3 && (
            <motion.div
              key="step3-certifications"
              initial={{ opacity: 0, x: 250 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ x: '-150%', opacity: 0, transition: { duration: 0.9 } }}
              className="space-y-6 my-auto text-left"
            >
              <div className={`flex items-center justify-between border-b pb-3 ${
                isLight ? 'border-slate-200' : 'border-zinc-800'
              }`}>
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-amber-400" />
                  <h2 className={`text-xl md:text-3xl font-black uppercase font-mono ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    Industry IT Certifications
                  </h2>
                </div>
              </div>

              <div 
                ref={certsContainerRef}
                className="max-h-[440px] overflow-y-auto pr-2 space-y-3 scroll-smooth"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {CERTIFICATIONS_LIBRARY.slice(0, 9).map((cert, idx) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      className={`p-4 border-2 text-left space-y-2 hover:border-amber-400 transition ${
                        isLight 
                          ? 'bg-white border-slate-200 text-slate-900 shadow-sm' 
                          : 'bg-zinc-950/90 border-zinc-800 text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-400 text-black uppercase">
                          {cert.difficulty}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold font-sans text-white line-clamp-1">
                        {cert.name}
                      </h3>
                      <p className={`text-xs font-sans line-clamp-2 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                        {cert.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 4: ALL YOUTUBE TEACHERS DATABASE - BREAKING NEWS FAST TICKER */}
        <AnimatePresence>
          {step === 4 && (
            <motion.div
              key="step4-youtube"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.6 } }}
              className="space-y-4 my-auto text-left overflow-hidden"
            >
              <div className={`flex items-center justify-between border-b pb-3 ${
                isLight ? 'border-slate-200' : 'border-zinc-800'
              }`}>
                <div className="flex items-center gap-3">
                  <Youtube className="w-6 h-6 text-red-500 animate-pulse" />
                  <h2 className={`text-xl md:text-3xl font-black uppercase font-mono ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    YouTube Educators Directory ({CHANNELS_POOL.length}+ Channels)
                  </h2>
                </div>
              </div>

              {/* 🔴 BREAKING NEWS FAST SCROLLING TICKER 1 (LEFT-TO-RIGHT) */}
              <div className="relative overflow-hidden w-full py-2 bg-red-950/30 border-y border-red-500/40 rounded-sm">
                <motion.div
                  animate={{ x: [-2500, 0] }}
                  transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
                  className="inline-flex gap-3 items-center whitespace-nowrap"
                >
                  {CHANNELS_POOL.concat(CHANNELS_POOL).map((ch, idx) => (
                    <div
                      key={`${ch.name}-${idx}`}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 border font-mono text-xs shadow-md shrink-0 ${
                        isLight 
                          ? 'bg-white border-red-200 text-slate-900' 
                          : 'bg-zinc-950 border-red-800/80 text-white'
                      }`}
                    >
                      <Youtube className="w-3.5 h-3.5 text-red-500 fill-current shrink-0" />
                      <span className="font-bold text-white truncate max-w-[180px]">{ch.name}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-red-600 text-white uppercase rounded-xs">
                        {ch.domain}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* 🔴 BREAKING NEWS FAST SCROLLING TICKER 2 (RIGHT-TO-LEFT) */}
              <div className="relative overflow-hidden w-full py-2 bg-zinc-950/60 border-b border-zinc-800 rounded-sm">
                <motion.div
                  animate={{ x: [0, -2500] }}
                  transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                  className="inline-flex gap-3 items-center whitespace-nowrap"
                >
                  {CHANNELS_POOL.slice().reverse().concat(CHANNELS_POOL).map((ch, idx) => (
                    <div
                      key={`rev-${ch.name}-${idx}`}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 border font-mono text-xs shadow-md shrink-0 ${
                        isLight 
                          ? 'bg-slate-50 border-slate-300 text-slate-800' 
                          : 'bg-zinc-900 border-zinc-700 text-zinc-200'
                      }`}
                    >
                      <span className="text-amber-400 font-bold">⚡</span>
                      <span className="font-bold text-white">{ch.name}</span>
                      <span className={`text-[10px] font-sans line-clamp-1 max-w-[200px] ${
                        isLight ? 'text-slate-600' : 'text-zinc-400'
                      }`}>
                        {ch.bestFor}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* FEATURED TOP CHANNELS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1 max-w-5xl mx-auto">
                {ESSENTIAL_EDUCATORS.map((teacher, idx) => (
                  <motion.div
                    key={teacher.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    className={`p-3 border-2 text-left space-y-1 hover:border-red-500 transition ${
                      isLight 
                        ? 'bg-white border-slate-200 text-slate-900 shadow-sm' 
                        : 'bg-zinc-950 border-zinc-800 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">📹</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-red-500 text-white uppercase">
                        {teacher.subscribers}
                      </span>
                    </div>
                    <h3 className="text-xs md:text-sm font-bold font-sans text-white">
                      {teacher.name}
                    </h3>
                    <p className={`text-[11px] font-sans line-clamp-1 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                      {teacher.bestFor}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 5: ENTERPRISE TOOLS, CLI & DIAGNOSTICS */}
        <AnimatePresence>
          {step === 5 && (
            <motion.div
              key="step5-tools"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.6 } }}
              className="space-y-6 my-auto text-left"
            >
              <div className={`flex items-center justify-between border-b pb-3 ${
                isLight ? 'border-slate-200' : 'border-zinc-800'
              }`}>
                <div className="flex items-center gap-3">
                  <Terminal className="w-6 h-6 text-cyan-400" />
                  <h2 className={`text-xl md:text-3xl font-black uppercase font-mono ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    Open Source Tools, CLI &amp; Diagnostics
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {ESSENTIAL_TOOLS.map((tool, idx) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    className={`p-4 border-2 text-left space-y-2 hover:border-cyan-400 transition ${
                      isLight 
                        ? 'bg-white border-slate-200 text-slate-900 shadow-sm' 
                        : 'bg-zinc-950 border-zinc-800 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-cyan-400 text-black uppercase">
                        {tool.category}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold font-sans text-white">
                      {tool.name}
                    </h3>
                    <p className={`text-xs font-sans ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                      {tool.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 6: QUANTIFIABLE RESOURCE NUMBERS (MIDDLE SCREEN METRICS) */}
        <AnimatePresence>
          {step === 6 && (
            <motion.div
              key="step6-resource-metrics"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15, transition: { duration: 0.6 } }}
              className={`my-auto text-center ${isReelMode ? 'py-4 space-y-4' : 'py-16 space-y-8'}`}
            >
              <div className={`grid gap-3 mx-auto ${
                isReelMode ? 'grid-cols-2 max-w-xs' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl'
              }`}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 border-2 space-y-1 text-center ${
                    isLight 
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950 shadow-md' 
                      : 'border-emerald-400 bg-emerald-950/40 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                  }`}
                >
                  <h2 className="text-xs font-black font-mono text-emerald-500 uppercase tracking-wide">
                    Curated Books
                  </h2>
                  <span className={`font-black font-mono block ${
                    isReelMode ? 'text-3xl font-black' : 'text-4xl md:text-6xl'
                  } ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    120+
                  </span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 border-2 space-y-1 text-center ${
                    isLight 
                      ? 'border-amber-300 bg-amber-50 text-amber-950 shadow-md' 
                      : 'border-amber-400 bg-amber-950/40 text-white shadow-[0_0_30px_rgba(245,158,11,0.3)]'
                  }`}
                >
                  <h2 className="text-xs font-black font-mono text-amber-500 uppercase tracking-wide">
                    IT Certifications
                  </h2>
                  <span className={`font-black font-mono block ${
                    isReelMode ? 'text-3xl font-black' : 'text-4xl md:text-6xl'
                  } ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    85+
                  </span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 border-2 space-y-1 text-center ${
                    isLight 
                      ? 'border-red-300 bg-red-50 text-red-950 shadow-md' 
                      : 'border-red-400 bg-red-950/40 text-white shadow-[0_0_30px_rgba(239,68,68,0.3)]'
                  }`}
                >
                  <h2 className="text-xs font-black font-mono text-red-500 uppercase tracking-wide">
                    Tech Educators
                  </h2>
                  <span className={`font-black font-mono block ${
                    isReelMode ? 'text-3xl font-black' : 'text-4xl md:text-6xl'
                  } ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    60+
                  </span>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 border-2 space-y-1 text-center ${
                    isLight 
                      ? 'border-cyan-300 bg-cyan-50 text-cyan-950 shadow-md' 
                      : 'border-cyan-400 bg-cyan-950/40 text-white shadow-[0_0_30px_rgba(6,182,212,0.3)]'
                  }`}
                >
                  <h2 className="text-xs font-black font-mono text-cyan-500 uppercase tracking-wide">
                    Global Hackathons
                  </h2>
                  <span className={`font-black font-mono block ${
                    isReelMode ? 'text-3xl font-black' : 'text-4xl md:text-6xl'
                  } ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    45+
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 7: GRAND FINALE - MAPIT ORIGINAL LOGO & CLOSING CTA */}
        <AnimatePresence>
          {step === 7 && (
            <motion.div
              key="step7-original-logo"
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

                {/* Closing Call to Action: Visit itmap.in to MapIT */}
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

export default ResourcesLaunch;
