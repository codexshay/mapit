import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Sparkles, Bot, Terminal, RefreshCw, AlertCircle, Minimize2 } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface AICareerAssistantProps {
  onNavigateToSection?: (
    sectionType: 'certs' | 'tools-skills' | 'channels' | 'bookshelf' | 'hackathons' | 'youtubeTeachers' | 'map' | 'taxonomy' | 'libraries',
    searchQuery: string
  ) => void;
  setActiveTab?: (tabId: string) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  isLight?: boolean;
  onCompareRoles?: (roleAId: string, roleBId: string) => void;
}

const AntIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Abdomen */}
    <ellipse cx="7" cy="12" rx="3.5" ry="2.5" fill="currentColor" />
    {/* Thorax */}
    <circle cx="13" cy="12" r="2" fill="currentColor" />
    {/* Head */}
    <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    {/* Antennae */}
    <path d="M19 11.5 Q20.5 10.5 21 11" />
    <path d="M19 12.5 Q20.5 13.5 21 13" />
    {/* Left (top) legs */}
    <path d="M14 10 Q15.5 7.5 17 8.5" />
    <path d="M13 10 Q13 7 13 7.5" />
    <path d="M12 10 Q10.5 7.5 9.5 8" />
    {/* Right (bottom) legs */}
    <path d="M14 14 Q15.5 16.5 17 15.5" />
    <path d="M13 14 Q13 17 13 16.5" />
    <path d="M12 14 Q10.5 16.5 9.5 16" />
  </svg>
);

export default function AICareerAssistant({ 
  onNavigateToSection, 
  setActiveTab,
  isOpen: isOpenProp,
  onOpenChange,
  isLight: isLightProp = false,
  onCompareRoles
}: AICareerAssistantProps) {
  const isLight = true; // Lock internal theme to always be light/white, ignoring outer theme updates
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = isOpenProp !== undefined ? isOpenProp : localIsOpen;
  const setIsOpen = onOpenChange || setLocalIsOpen;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const chatCache = useRef<Record<string, string>>({});

  // Close chatbox when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const toggleBtn = document.getElementById("toggle-ai-assistant");
      const target = event.target as HTMLElement;

      // Ignore closing if the user interact with theme-switching elements
      if (target && (target.getAttribute("data-theme-switch") === "true" || target.closest("[data-theme-switch]"))) {
        return;
      }

      // Check if mouse down is outside the drawer and outside the toggle button
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        toggleBtn &&
        !toggleBtn.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Load chat history on mount (Always resets on page reload)
  useEffect(() => {
    localStorage.removeItem("mapit_assistant_history");
    setMessages([
      {
        role: "assistant",
        content: "Hi, I am Pam, ready to help.😀 \nAsk me anything, or try one of the starter prompts below!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
    ]);
  }, []);

  // Save chat history
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("mapit_assistant_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Autoscroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorStatus(null);
    const userMsg: ChatMessage = {
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    const cacheKey = JSON.stringify(updatedMessages);
    if (chatCache.current[cacheKey]) {
      setTimeout(() => {
        const cachedContent = chatCache.current[cacheKey];
        const aiMsg: ChatMessage = {
          role: "assistant",
          content: cachedContent,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsLoading(false);
      }, 150);
      return;
    }

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      chatCache.current[cacheKey] = data.message;
      
      const aiMsg: ChatMessage = {
        role: "assistant",
        content: data.message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || "Could not connect to the Gemini server. Verify your API key configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Restore factory settings and wipe neural chat log?")) {
      const defaultState: ChatMessage[] = [
        {
          role: "assistant",
          content: "Hi, I am Pam, ready to help.😀 \nAsk me anything, or try one of the starter prompts below!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
      ];
      setMessages(defaultState);
      localStorage.setItem("mapit_assistant_history", JSON.stringify(defaultState));
      setErrorStatus(null);
    }
  };

  const starterPrompts = [
    { label: "How roles relate?", prompt: "How do different IT roles relate to each other in the career map?" },
    { label: "Highest income roles", prompt: "Which are the highest income roles in the IT taxonomy and how can I reach them?" },
    { label: "Suggest certs for Support", prompt: "What are the best certifications to enter IT Support and SysAdmin roles?" },
    { label: "DevOps vs. Cloud Architect", prompt: "Explain the difference between a DevOps Engineer and a Cloud Infrastructure Architect. Which pays better?" }
  ];

  return (
    <>
      {/* Retron-glowing Floating Toggle Button */}
      <div className="fixed bottom-22 md:bottom-5 right-5 z-[9990]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="toggle-ai-assistant"
          style={{ cursor: "pointer" }}
          className="relative bg-[#070b13] border-2 border-[#10b981] p-3.5 shadow-[0_0_15px_rgba(16,185,129,0.4)] text-[#10b981] hover:text-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all cursor-pointer select-none group flex items-center justify-center gap-2 rounded-none"
          title="Open Pam Space Coach Link"
        >
          <Bot className="w-5 h-5 animate-pulse" />
          <span className="hidden md:inline font-mono text-xs font-black tracking-widest uppercase">
            sPAM me
          </span>
          {messages.length > 1 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#ec4899] text-white text-[9px] font-mono px-1 border border-white font-black animate-bounce">
              {messages.length - 1}
            </span>
          )}
        </button>
      </div>

      {/* Slide-out Terminal Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%", opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.8 }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.55 }}
            id="ai-assistant-drawer"
            className={`fixed top-0 bottom-0 right-0 h-[100dvh] w-full sm:w-[450px] border-l-3 border-[#10b981] z-[9999] flex flex-col font-mono shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-md ${
              isLight 
                ? "bg-[#f8fafc]/95 text-slate-800" 
                : "bg-[#040710]/95 text-white"
            }`}
          >
            {/* Header */}
            <div className={`p-4 flex items-center justify-between select-none shrink-0 border-b-2 ${
              isLight 
                ? "bg-slate-50 border-slate-200" 
                : "bg-[#070c18] border-[#121c38]"
            }`}>
              <div className="flex items-center gap-2">
                <h2 className={`text-sm font-black uppercase tracking-wider flex items-center gap-1 ${
                  isLight ? "text-slate-800" : "text-white"
                }`}>
                  <span className="text-[#10b981]">PAM</span>
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleClearHistory}
                  style={{ cursor: "pointer" }}
                  className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition border border-transparent hover:border-red-500/20"
                  title="Clear Neutro-Link Data"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{ cursor: "pointer" }}
                  className="p-1.5 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition border border-transparent hover:border-emerald-500/30"
                  title="Minimize Drawer"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{ cursor: "pointer" }}
                  className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-red-500/10 transition border border-transparent hover:border-rose-500/30"
                  title="Close Drawer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main Conversation Window */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar select-text bg-white"
              style={{
                backgroundColor: "#ffffff",
                backgroundImage: "none"
              }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-1 text-[9px] text-gray-500 select-none mb-0.5 font-bold uppercase">
                      <div className="w-1 h-1 bg-[#10b981] rounded-full animate-ping" />
                      <span>Pam</span>
                    </div>
                  )}
                  <div
                    className={`p-3 max-w-[85%] text-xs leading-relaxed space-y-1 rounded-none border break-words ${
                      msg.role === "user"
                        ? (isLight 
                            ? "bg-[#ec4899]/5 border-[#ec4899]/30 text-slate-800" 
                            : "bg-[#ec4899]/5 border-[#ec4899]/30 text-slate-100")
                        : (isLight 
                            ? "bg-emerald-50/90 border-[#10b981]/30 text-emerald-950 shadow-[0_0_8px_rgba(16,185,129,0.05)]" 
                            : "bg-[#071318]/70 border-[#10b981]/30 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.05)]")
                    }`}
                  >
                    {/* Render basic markdown parsing: lines, paragraphs, lists, bold */}
                    {msg.content.split("\n\n").map((para, pIdx) => {
                      if (!para.trim()) return null;
                      return (
                        <p key={pIdx}>
                          {para.split("\n").map((line, lIdx) => {
                            if (line.startsWith("- ") || line.startsWith("* ")) {
                              return (
                                <span key={lIdx} className={`block pl-3 relative ${isLight ? "text-slate-700" : "text-slate-200"}`}>
                                  <span className="absolute left-0 text-[#10b981]">›</span>
                                  {parseLineContent(line.substring(2), setActiveTab, onNavigateToSection, messages, isLight, onCompareRoles)}
                                </span>
                              );
                            }
                            return (
                              <span key={lIdx} className="block">
                                {parseLineContent(line, setActiveTab, onNavigateToSection, messages, isLight, onCompareRoles)}
                              </span>
                            );
                          })}
                        </p>
                      );
                    })}
                  </div>
                  <span className="text-[8px] mt-0.5 select-none font-medium text-gray-500">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1 text-[9px] text-emerald-500 select-none mb-0.5 font-bold uppercase animate-pulse">
                    <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                    <span>PAM_PROCESSING...</span>
                  </div>
                  <div className={`p-3 border text-xs font-bold tracking-widest flex items-center gap-1.5 animate-pulse rounded-none ${
                    isLight 
                      ? "bg-emerald-50/50 border-emerald-500/20 text-emerald-800" 
                      : "bg-[#071318]/50 border border-emerald-500/20 text-emerald-400"
                  }`}>
                    <Terminal className="w-3.5 h-3.5" />
                    QUERYING GEMINI NEURAL NET...
                  </div>
                </div>
              )}

              {errorStatus && (
                <div className={`p-3 border-2 text-xs flex gap-2 rounded-none ${
                  isLight 
                    ? "bg-red-50 border-red-500/30 text-red-800" 
                    : "bg-red-950/20 border border-red-500/40 text-rose-400"
                }`}>
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <div className="space-y-1">
                    <p className={`font-bold uppercase tracking-wider ${isLight ? "text-red-700" : "text-red-400"}`}>Connection Interrupted</p>
                    <p className="text-[11px] leading-normal">{errorStatus}</p>
                    <p className="text-[9px] text-slate-500">Enable your API key in settings or query a local host fallback.</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Preset Starters */}
            {messages.length <= 1 && (
              <div className={`p-3 border-t shrink-0 select-none ${
                isLight ? "bg-slate-50 border-slate-200" : "bg-[#03060c] border-t border-[#121c38]"
              }`}>
                <p className="text-[10px] text-gray-500 font-bold uppercase mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#10b981]" /> SUGGESTED DIAGNOSTIC TRIGGERS:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {starterPrompts.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(s.prompt)}
                      style={{ cursor: "pointer" }}
                      className={`p-2 border text-left hover:border-[#10b981] hover:bg-[#10b981]/5 transition duration-200 text-[10px] rounded-none truncate cursor-pointer leading-tight font-mono select-none ${
                        isLight 
                          ? "border-slate-200 bg-white text-slate-600 hover:text-slate-900" 
                          : "border-[#1e2e54] bg-[#060a14] text-slate-300 hover:text-white"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className={`p-3 border-t-2 flex gap-2 shrink-0 select-none ${
                isLight ? "bg-slate-50 border-slate-200" : "bg-[#070c18] border-t-2 border-[#121c38]"
              }`}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Pam about skills, certs, paths..."
                className={`flex-1 border focus:border-[#10b981] text-base md:text-xs p-2.5 outline-none font-mono rounded-none shrink-0 ${
                  isLight 
                    ? "bg-white border-slate-300 text-slate-800 placeholder-slate-400" 
                    : "bg-black/50 border border-[#1e2e54] text-white placeholder-slate-600"
                }`}
                disabled={isLoading}
              />
              <button
                type="submit"
                style={{ cursor: isLoading || !input.trim() ? "not-allowed" : "pointer" }}
                className={`px-3 border-2 transition font-bold text-xs uppercase cursor-pointer flex items-center justify-center rounded-none ${
                  isLoading || !input.trim()
                    ? "border-slate-300 text-slate-400 bg-transparent cursor-not-allowed"
                    : "border-[#10b981] hover:bg-[#10b981]/10 shadow-[0_0_8px_rgba(16,185,129,0.15)]"
                }`}
                disabled={isLoading || !input.trim()}
              >
                <AntIcon className={`w-5 h-5 shrink-0 ${isLoading || !input.trim() ? "text-[#10b981]/50" : "text-[#10b981]"}`} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Simple Helper function to parse bold text "**text**" in messages
function parseBoldText(text: string, isLight: boolean = false) {
  const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <strong key={i} className={isLight ? "text-slate-900 font-bold bg-black/5 px-0.5 border-b border-black/10" : "text-white font-bold bg-white/5 px-0.5 border-b border-white/20"}>
          {part}
        </strong>
      );
    }
    return <span key={i}>{parseInlineCode(part, isLight)}</span>;
  });
}

// Simple Helper function to parse inline codes "`code`"
function parseInlineCode(text: string, isLight: boolean = false) {
  const parts = text.split(/`([\s\S]*?)`/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <code key={i} className={isLight ? "bg-slate-100 text-[#be123c] px-1 font-mono rounded text-[11px] border border-[#ec4899]/15" : "bg-black/50 text-[#ec4899] px-1 font-mono rounded text-[11px] border border-[#ec4899]/20"}>
          {part}
        </code>
      );
    }
    return part;
  });
}

// Interactive custom parser function that resolves markdown links and maps them to in-site action triggers
function parseLineContent(
  line: string, 
  setActiveTab?: (tabId: string) => void,
  onNavigateToSection?: (
    sectionType: 'certs' | 'tools-skills' | 'channels' | 'bookshelf' | 'hackathons' | 'youtubeTeachers' | 'map' | 'taxonomy' | 'libraries',
    searchQuery: string
  ) => void,
  messages: ChatMessage[] = [],
  isLight: boolean = false,
  onCompareRoles?: (roleAId: string, roleBId: string) => void
) {
  const parts = line.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const text = linkMatch[1];
      const href = linkMatch[2];
      
      const isAction = href.startsWith("action:");
      if (isAction) {
        const handleActionClick = () => {
          if (href.startsWith("action:tab:")) {
            const tabName = href.replace("action:tab:", "");

            // Try to extract a query from the user's latest messages to do a smart nested navigation
            let activeQuery = "";
            const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
            if (lastUserMsg) {
              activeQuery = lastUserMsg.content;
            }

            const extractMainITKeyword = (textStr: string): string | null => {
              const t = textStr.toLowerCase();
              const keywords = [
                'sysadmin', 'system admin', 'system administrator',
                'devops', 'site reliability', 'sre', 'platform engineer',
                'cybersecurity', 'security', 'cyber', 'pentest', 'soc analyst', 'grc', 'audit',
                'cloud', 'aws', 'azure', 'gcp',
                'network', 'networking', 'noc',
                'data science', 'machine learning', 'ml', 'ai engineer', 'ai',
                'data analyst', 'data analytics', 'big data', 'business intelligence',
                'software developer', 'software engineer', 'programmer', 'frontend', 'backend', 'fullstack',
                'qa tester', 'software testing', 'sdet',
                'ui/ux', 'ux designer', 'ui designer',
                'wordpress', 'shopify', 'web developer',
                'salesforce', 'servicenow',
                'it support', 'helpdesk', 'desktop support', 'service desk'
              ];
              for (const kw of keywords) {
                if (t.includes(kw)) {
                  return kw;
                }
              }
              return null;
            };

            if ((tabName === 'map' || tabName === 'taxonomy' || tabName === 'libraries') && activeQuery) {
              const matchedKeyword = extractMainITKeyword(activeQuery);
              if (matchedKeyword) {
                if (tabName === 'libraries') {
                  onNavigateToSection?.('certs', matchedKeyword);
                } else {
                  onNavigateToSection?.(tabName as any, matchedKeyword);
                }
                return;
              }
            }

            setActiveTab?.(tabName);
          } else if (href.startsWith("action:navigate:")) {
            const actionParts = href.replace("action:navigate:", "").split(":");
            if (actionParts.length >= 2) {
              const sectionType = actionParts[0] as any;
              const searchQuery = decodeURIComponent(actionParts.slice(1).join(":"));
              onNavigateToSection?.(sectionType, searchQuery);
            }
          } else if (href.startsWith("action:compare:")) {
            const actionParts = href.replace("action:compare:", "").split(":");
            if (actionParts.length >= 2) {
              const rA = actionParts[0];
              const rB = actionParts[1];
              onCompareRoles?.(rA, rB);
            }
          }
        };

        return (
          <button
            key={i}
            onClick={handleActionClick}
            style={{ cursor: "pointer" }}
            className={`inline-flex items-center gap-1 font-bold ${
              isLight 
                ? "text-emerald-700 hover:text-emerald-950 bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20 hover:border-emerald-500" 
                : "text-[#10b981] hover:text-white bg-emerald-500/10 hover:bg-emerald-500/25 border-emerald-500/30 hover:border-emerald-500"
            } px-1.5 py-0.5 border transition rounded-none font-mono text-[11px] align-baseline my-0.5 cursor-pointer`}
            title={`Navigate to ${text}`}
          >
            <Sparkles className="w-2.5 h-2.5 shrink-0 text-emerald-400 animate-pulse" />
            {text}
          </button>
        );
      } else {
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-0.5 font-bold ${
              isLight 
                ? "text-sky-700 hover:text-sky-900 bg-sky-50 px-1.5 py-0.5 border border-sky-200 hover:border-sky-400" 
                : "text-sky-400 hover:text-sky-300 hover:underline bg-sky-950/20 px-1.5 py-0.5 border border-sky-400/20 hover:border-sky-400/40"
            } rounded-none text-[11px] align-baseline my-0.5 cursor-pointer`}
          >
            {text}
            <span className="text-[10px]">↗</span>
          </a>
        );
      }
    }
    
    // Normal text part: parse bold and inline code
    return <React.Fragment key={i}>{parseBoldText(part, isLight)}</React.Fragment>;
  });
}
