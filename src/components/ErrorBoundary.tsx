import * as React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[250px] w-full p-6 flex flex-col items-center justify-center text-center bg-[#070b14] border-2 border-red-500/40 text-slate-100 font-mono my-4 rounded-none shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4 text-red-400">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          
          <h3 className="text-base font-bold text-red-400 uppercase tracking-wider mb-2">
            {this.props.fallbackTitle || 'A Section Interface Error Occurred'}
          </h3>
          
          <p className="text-xs text-slate-400 max-w-md mb-4 leading-relaxed font-sans">
            A temporary component state issue occurred while rendering this section. You can safely reset this view without reloading the full application.
          </p>

          {this.state.error?.message && (
            <div className="w-full max-w-lg bg-black/60 border border-red-900/40 p-2.5 mb-5 text-[11px] text-red-300 font-mono overflow-x-auto text-left">
              <span className="text-[10px] text-red-500 uppercase font-bold block mb-1">Error Trace:</span>
              {this.state.error.message}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={this.handleReset}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset View State
            </button>

            <button
              onClick={this.handleReload}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" /> Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
