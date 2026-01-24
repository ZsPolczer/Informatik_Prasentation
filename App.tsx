import React from 'react';
import { Glossary } from './components/Glossary';
import { TemperatureDemo } from './components/TemperatureDemo';
import { FightingAgents } from './components/FightingAgents';
import { AIConsultant } from './components/AIConsultant';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col lg:flex-row">

      {/* --- BACKGROUND ANIMATION LAYER --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Base Radial Gradient: Simulates a light source from top */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#1a2333] via-[#050505] to-[#000000]" />

        {/* Moving Grid Pattern */}
        <div className="absolute inset-0 bg-grid-anim opacity-30" />

        {/* Breathing Blue Glow in Top Center */}
        <div className="absolute top-[-100px] left-1/2 w-[800px] h-[400px] bg-cyber-accent blur-[150px] rounded-full animate-pulse-slow pointer-events-none mix-blend-screen" />
      </div>

      {/* Main Content Area (Z-Index 10 to sit above background) */}
      <main className="relative z-10 flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">

        {/* Header / Intro */}
        <header className="mb-16 text-center md:text-left animate-fade-in">
          <div className="inline-block mb-4 px-3 py-1 border border-cyber-accent/30 rounded-full bg-cyber-accent/10 text-cyber-accent text-xs font-mono tracking-widest uppercase">
            Schulprojekt 2026
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(0,242,255,0.3)]">
            DeepDive KI: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent to-blue-600">Das Skelett</span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyber-border/50 pb-8">
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Eine interaktive Reise in das Gehirn künstlicher Intelligenz.
              Erlebe, wie neuronale Netze "denken" und "sehen".
            </p>

            {/* CREDITS SECTION */}
            <div className="flex items-center gap-4 bg-cyber-card/50 px-4 py-2 rounded-lg border border-cyber-border backdrop-blur-sm">
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-cyber-accent tracking-widest font-mono">CREATED BY</span>
                <div className="text-white font-bold text-sm tracking-wide">
                  ZSOMBOR <span className="text-cyber-accent mx-1">&</span> EDI
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyber-accent to-blue-700 flex items-center justify-center text-black font-bold text-xs shadow-[0_0_10px_rgba(0,242,255,0.5)]">
                AI
              </div>
            </div>
          </div>
        </header>

        {/* Video Wrapper */}
        <div className="group relative rounded-xl p-[1px] bg-gradient-to-br from-cyber-border to-cyber-accent/50 mb-12 shadow-2xl hover:shadow-[0_0_30px_rgba(0,242,255,0.2)] transition-all duration-500">
          <div className="bg-cyber-card rounded-xl overflow-hidden aspect-video relative">
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 group-hover:bg-black/20 transition-all backdrop-blur-[2px] group-hover:backdrop-blur-none">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-cyber-accent flex items-center justify-center mx-auto mb-4 text-cyber-accent group-hover:bg-cyber-accent group-hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,242,255,0.4)]">
                  <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <span className="text-cyber-accent font-mono text-sm tracking-widest uppercase font-bold">
                  Einführungsvideo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Temperature Demo Component */}
        <div className="relative mb-16">
          {/* Decorative line connecting sections */}
          <div className="absolute left-[-20px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyber-accent/30 to-transparent hidden md:block"></div>
          <TemperatureDemo />
        </div>

        {/* Fighting Agents Simulation */}
        <div className="relative mb-16">
          <div className="absolute left-[-20px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyber-accent/30 to-transparent hidden md:block"></div>
          <FightingAgents />
        </div>

        {/* AI Consultant */}
        <div className="relative mb-16">
          <div className="absolute left-[-20px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500/30 to-transparent hidden md:block"></div>
          <AIConsultant />
        </div>

        {/* Placeholder for Next Features */}
        <section className="grid grid-cols-1 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="bg-cyber-card/40 border border-cyber-border/50 rounded-xl p-6 min-h-[200px] flex flex-col items-center justify-center border-dashed backdrop-blur-sm group hover:border-cyber-accent/50 transition-colors cursor-wait">
            <div className="w-12 h-12 rounded-lg bg-gray-800 mb-4 flex items-center justify-center text-2xl group-hover:text-cyber-accent transition-colors">👁️</div>
            <h3 className="text-xl font-bold text-gray-300 group-hover:text-white">Nummernerkennung (MNIST)</h3>
            <p className="text-sm text-gray-500 mt-2 text-center max-w-md">
              Dieses Modul erfordert eine Verbindung zum lokalen Python-Backend.
              <br />
              <span className="text-xs font-mono text-cyber-accent mt-1 block">WAITING FOR FLASK CONNECTION...</span>
            </p>
          </div>
        </section>

      </main>

      {/* Sidebar Glossary */}
      <Glossary />

    </div>
  );
};

export default App;