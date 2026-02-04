import React, { useState } from 'react';
import { Glossary } from './components/Glossary';
import { TemperatureDemo } from './components/TemperatureDemo';
import { FightingAgents } from './components/FightingAgents';
import { PerceptronVisualizer } from './components/PerceptronVisualizer';
import Conclusion from './components/Conclusion';

type ModuleType = 'intro' | 'temp' | 'perceptron' | 'agents' | 'conclusion';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>('intro');

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
      <main className="relative z-10 flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full lg:pr-[340px]">

        {/* Header / Intro */}
        <header className="mb-4 text-center md:text-left animate-fade-in">
          <div className="inline-block mb-4 px-3 py-1 border border-cyber-accent/30 rounded-full bg-cyber-accent/10 text-cyber-accent text-xs font-mono tracking-widest uppercase">
            Schulprojekt 2026
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(0,242,255,0.3)]">
            DeepDive KI: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent to-blue-600">Das Skelett</span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyber-border/50 pb-8 mb-8">
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

        {/* --- NAVIGATION BAR --- */}
        <nav className="flex flex-wrap gap-2 mb-8 bg-black/20 p-2 rounded-xl border border-cyber-border/30 backdrop-blur-sm">
          {[
            { id: 'intro', label: 'Einführungsvideo' },
            { id: 'temp', label: 'Wie generiert KI Antworten' },
            { id: 'perceptron', label: 'Machine Learning' },
            { id: 'agents', label: 'Neurale Netze' },
            { id: 'conclusion', label: 'Fazit & Ausblick' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id as ModuleType)}
              className={`flex-1 min-w-[140px] px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300 border ${activeModule === item.id
                ? 'bg-cyber-accent/10 border-cyber-accent text-cyber-accent shadow-[0_0_15px_rgba(0,242,255,0.3)]'
                : 'bg-transparent border-transparent text-gray-500 hover:text-white hover:bg-white/5'
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* --- CONTENT AREA --- */}
        <div className="min-h-[500px] animate-fade-in">
          {activeModule === 'intro' && (
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
          )}

          {activeModule === 'temp' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl text-white font-bold mb-2">Wie generiert KI Antworten?</h2>
                <p className="text-gray-400">Verstehe den Einfluss von "Temperatur" auf die Kreativität und Zufälligkeit von KI-Modellen.</p>
              </div>
              <TemperatureDemo />
            </div>
          )}

          {activeModule === 'perceptron' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl text-white font-bold mb-2">Machine Learning (Perzeptron)</h2>
                <p className="text-gray-400">Ein Blick in die einfachste Form eines neuronalen Netzes: Das Perzeptron. Zeichne eine Zahl!</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* --- CARD 1: KONZEPT --- */}
                <div className="bg-cyber-card/40 border border-cyber-border/50 rounded-xl p-6 backdrop-blur-sm hover:border-cyber-accent/50 transition-colors">
                  <h3 className="text-lg text-cyber-accent font-bold mb-3 flex items-center gap-2">
                    <span className="text-xl">🧠</span> Das Konzept
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex gap-2">
                      <span className="text-cyber-accent">●</span>
                      <span>
                        <strong className="text-gray-200">Biologisches Vorbild:</strong> Inspiriert von unserem Gehirn. Neuronen feuern Signale ab.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyber-accent">●</span>
                      <span>
                        <strong className="text-gray-200">Aktivierung:</strong> Jedes Neuron hat einen Wert zwischen 0 (inaktiv/schwarz) und 1 (aktiv/weiß).
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyber-accent">●</span>
                      <span>
                        <strong className="text-gray-200">Das Ziel:</strong> Das Netzwerk soll lernen, abstrakte Muster (wie die Form einer "3") zu erkennen.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* --- CARD 2: STRUKTUR --- */}
                <div className="bg-cyber-card/40 border border-cyber-border/50 rounded-xl p-6 backdrop-blur-sm hover:border-cyber-accent/50 transition-colors">
                  <h3 className="text-lg text-cyber-accent font-bold mb-3 flex items-center gap-2">
                    <span className="text-xl">🏗️</span> Die Architektur
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex gap-2">
                      <span className="text-cyber-accent">●</span>
                      <span>
                        <strong className="text-gray-200">Layer (Schichten):</strong> Information fließt von links nach rechts durch mehrere Schichten.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyber-accent">●</span>
                      <span>
                        <strong className="text-gray-200">Hidden Layers:</strong> Die "versteckten" Schichten in der Mitte verarbeiten die Informationen.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyber-accent">●</span>
                      <span>
                        <strong className="text-gray-200">Output Layer:</strong> Am Ende bleiben genau 10 Neuronen. Das "hellste" gewinnt und ist die vorhergesagte Zahl (0-9).
                      </span>
                    </li>
                  </ul>
                </div>

                {/* --- CARD 3: VISION --- */}
                <div className="bg-cyber-card/40 border border-cyber-border/50 rounded-xl p-6 backdrop-blur-sm hover:border-cyber-accent/50 transition-colors">
                  <h3 className="text-lg text-cyber-accent font-bold mb-3 flex items-center gap-2">
                    <span className="text-xl">👁️</span> Wie es "sieht"
                  </h3>
                  <div className="text-sm text-gray-400 space-y-3">
                    <p>Das Problem wird in kleine Teile zerlegt:</p>
                    <div className="pl-2 border-l-2 border-cyber-accent/30 space-y-2">
                      <div>
                        <span className="text-xs font-mono uppercase text-cyber-accent">Schicht 1</span>
                        <br />Erkennt kleine Kanten und Linien-Abschnitte.
                      </div>
                      <div>
                        <span className="text-xs font-mono uppercase text-cyber-accent">Schicht 2</span>
                        <br />Setzt Linien zu Formen (Kreise, Bögen) zusammen.
                      </div>
                      <div>
                        <span className="text-xs font-mono uppercase text-cyber-accent">Schicht 3</span>
                        <br />Erkennt komplette Ziffern-Strukturen.
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- CARD 4: MATHEMATIK --- */}
                <div className="bg-cyber-card/40 border border-cyber-border/50 rounded-xl p-6 backdrop-blur-sm hover:border-cyber-accent/50 transition-colors">
                  <h3 className="text-lg text-cyber-accent font-bold mb-3 flex items-center gap-2">
                    <span className="text-xl">📐</span> Die Mathematik (13.002 Parameter)
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex gap-2">
                      <span className="text-cyber-accent">●</span>
                      <span>
                        <strong className="text-gray-200">Gewichte (Weights):</strong> Bestimmen die Wichtigkeit einer Verbindung. <span className="text-green-400">Positiv (Grün)</span> bestärkt, <span className="text-red-400">Negativ (Rot)</span> hemmt.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyber-accent">●</span>
                      <span>
                        <strong className="text-gray-200">Bias:</strong> Eine Art "Reizschwelle". Wann feuert das Neuron? Wird am Ende subtrahiert.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyber-accent">●</span>
                      <span>
                        <strong className="text-gray-200">Sigmoid:</strong> <span className="italic font-serif">σ(x)</span> "Quetscht" jede Summe in den Bereich 0 bis 1.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <PerceptronVisualizer />

              {/* Placeholder for Next Features (Moved here as it belongs to ML context) */}
              <section className="grid grid-cols-1 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 mt-8">
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
            </div>
          )}

          {activeModule === 'agents' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl text-white font-bold mb-2">Neurale Netze (Evolution)</h2>
                <p className="text-gray-400">Beobachte, wie KI-Agenten über Generationen lernen, zu überleben und zu kämpfen.</p>
              </div>
              <FightingAgents />
            </div>
          )}

          {activeModule === 'conclusion' && (
            <Conclusion />
          )}
        </div>

      </main>

      {/* Sidebar Glossary */}
      <Glossary />

    </div>
  );
};

export default App;