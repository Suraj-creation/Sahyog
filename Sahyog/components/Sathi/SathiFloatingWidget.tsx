
import React, { useEffect, useRef } from 'react';
import { UIMode } from '../../types';

interface Props {
  isActive: boolean;
  isListening: boolean;
  message: string;
  onActivate: () => void;
  onClose: () => void;
  uiMode: UIMode;
  isLive: boolean;
}

const SathiFloatingWidget: React.FC<Props> = ({ isActive, isListening, message, onActivate, onClose, uiMode, isLive }) => {
  const barsRef = useRef<HTMLDivElement>(null);

  // Simple purely visual waveform effect when listening
  useEffect(() => {
    if (!isListening || !barsRef.current) return;
    const interval = setInterval(() => {
      const bars = barsRef.current?.children;
      if (!bars) return;
      for (let i = 0; i < bars.length; i++) {
        (bars[i] as HTMLElement).style.height = `${Math.random() * 100}%`;
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isListening]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-end justify-center p-4">
      <div className={`w-full max-w-xl rounded-3xl p-8 relative transition-all animate-slide-up shadow-2xl overflow-hidden ${uiMode === UIMode.HIGH_CONTRAST ? 'bg-black border-2 border-yellow-400' : 'bg-white'}`}>
        
        {/* Animated background glow */}
        {isLive && (
            <div className="absolute inset-0 bg-blue-500/5 pointer-events-none animate-pulse"></div>
        )}

        <div className="flex flex-col items-center gap-8 relative z-10">
          {/* SATHI Avatar with Live Indicator */}
          <div className="relative">
            <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center shadow-2xl overflow-hidden transition-all duration-500 ${isListening ? 'border-blue-500 scale-105 shadow-blue-500/20' : 'border-slate-100'}`}>
              <img src="https://picsum.photos/seed/sathi-live/300/300" alt="SATHI Avatar" className={`w-full h-full object-cover transition-all ${isListening ? 'brightness-110' : 'grayscale-[20%]'}`} />
              
              {/* Visual Audio Bars Overlay */}
              {isListening && (
                  <div ref={barsRef} className="absolute inset-0 flex items-center justify-center gap-1 px-6 bg-blue-600/20">
                      {[...Array(8)].map((_, i) => (
                          <div key={i} className="w-1 bg-white rounded-full transition-all duration-100 h-1/2"></div>
                      ))}
                  </div>
              )}
            </div>
            
            <div className={`absolute -bottom-1 -right-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${isLive ? 'bg-green-500' : 'bg-slate-400'}`}>
                {isLive ? 'Live' : 'Ready'}
            </div>
          </div>

          {/* Transcription Display */}
          <div className="text-center w-full space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-slate-800">SATHI AI</h2>
            <div className={`min-h-[100px] flex items-center justify-center p-6 rounded-2xl transition-all border ${isListening ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100'}`}>
              <p className={`text-xl font-medium leading-tight ${isListening ? 'text-blue-900' : 'text-slate-600 opacity-80'}`}>
                {isListening ? `"${message}"` : message}
              </p>
            </div>
          </div>

          {/* Live Action Button */}
          <div className="w-full flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all active:scale-95"
              >
                End Call
              </button>
              <button 
                disabled={isListening}
                className={`flex-[2] py-4 rounded-2xl flex items-center justify-center gap-3 transition-all ${isListening ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20'} text-white font-black text-lg`}
              >
                {isListening ? (
                    <div className="flex gap-1">
                        <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                ) : (
                    <>
                        <i className="fa-solid fa-microphone"></i>
                        Speak Now
                    </>
                )}
              </button>
          </div>
          
          <p className="text-xs font-bold opacity-30 uppercase tracking-[0.2em]">Full Hands-Free Conversation</p>
        </div>
      </div>
    </div>
  );
};

export default SathiFloatingWidget;
