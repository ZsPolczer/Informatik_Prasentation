import React, { useState } from 'react';
import { Glossary } from './components/Glossary';
import { TemperatureDemo } from './components/TemperatureDemo';
import { FightingAgents } from './components/FightingAgents';
import { PerceptronVisualizer } from './components/PerceptronVisualizer';
import { BiasVisualizer } from './components/BiasVisualizer';
import Conclusion from './components/Conclusion';

export type ModuleType = 'intro' | 'temp' | 'perceptron' | 'agents' | 'conclusion';

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
                <iframe
                  className="w-full h-full border-0"
                  src="https://www.youtube.com/embed/b7lpkW-CsFo?si=eV5wE7RLd7l3kR5o"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {activeModule === 'temp' && (
            <div className="space-y-12">
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl text-white font-bold mb-2">Wie generiert KI Antworten?</h2>
                  <p className="text-gray-400">Verstehe die Architektur und den Einfluss von "Temperatur" auf die Kreativität von KI-Modellen.</p>
                </div>
              </div>

              {/* --- DEEP DIVE SECTION --- */}
              <div className="animate-fade-in">
                <h3 className="text-xl font-bold text-cyber-accent mb-6 flex items-center gap-2 border-b border-cyber-border/30 pb-2">
                  <span className="text-2xl">⚡</span> Theorie: Die Technik hinter GPT
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* CARD 1: GRUNDPRINZIP */}
                  <div className="bg-cyber-card/40 border border-cyber-border/50 rounded-xl p-6 hover:bg-cyber-card/60 transition-colors">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-cyber-accent">01.</span> Grundprinzip & Daten
                    </h4>
                    <ul className="space-y-4 text-sm text-gray-400 leading-relaxed">
                      <li className="flex gap-3">
                        <span className="text-cyber-accent mt-0.5">▸</span>
                        <div>
                          <strong className="text-gray-200 block">Definition (GPT):</strong>
                          Generative Pretrained Transformer.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyber-accent mt-0.5">▸</span>
                        <div>
                          <strong className="text-gray-200 block">Kernaufgabe:</strong>
                          Statistische <span className="text-cyber-accent">Vorhersage des nächsten Tokens</span> basierend auf dem bisherigen Kontext.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyber-accent mt-0.5">▸</span>
                        <div>
                          <strong className="text-gray-200 block">Iterativer Prozess:</strong>
                          Jede Vorhersage wird Teil des neuen Inputs – eine Endlosschleife der Generierung.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyber-accent mt-0.5">▸</span>
                        <div>
                          <strong className="text-gray-200 block">Hochdimensionale Einbettung:</strong>
                          GPT nutzt <span className="text-cyber-accent">12.288 Dimensionen</span>, um Wörter als Punkte in einem geometrischen Koordinatensystem zueinander in Beziehung zu setzen.
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* CARD 2: ARCHITEKTUR */}
                  <div className="bg-cyber-card/40 border border-cyber-border/50 rounded-xl p-6 hover:bg-cyber-card/60 transition-colors">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-cyber-accent">02.</span> Der Transformer-Block
                    </h4>
                    <ul className="space-y-4 text-sm text-gray-400 leading-relaxed">
                      <li className="flex gap-3">
                        <span className="text-cyber-accent mt-0.5">▸</span>
                        <div>
                          <strong className="text-gray-200 block">Schicht 1: Self-Attention:</strong>
                          Vektoren "sprechen" miteinander. Das Modell passt die Bedeutung je nach Kontext an (z.B. "Bank" als Geldinstitut vs. Sitzgelegenheit).
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyber-accent mt-0.5">▸</span>
                        <div>
                          <strong className="text-gray-200 block">Schicht 2: Multilayer Perceptron (MLP):</strong>
                          Das "Faktenwissen". Hier werden gespeicherte Informationen abgerufen, die über den Kontext hinausgehen.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyber-accent mt-0.5">▸</span>
                        <div>
                          <strong className="text-gray-200 block">Rekursion:</strong>
                          Diese zwei Schichten wiederholen sich (bei GPT-3 z.B. <span className="text-cyber-accent">96 Mal</span>), um immer komplexere Abstraktionen zu bilden.
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* CARD 3: PARAMETER & SKALIERUNG */}
                  <div className="bg-cyber-card/40 border border-cyber-border/50 rounded-xl p-6 hover:bg-cyber-card/60 transition-colors">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-cyber-accent">03.</span> Parameter & Dimensionen
                    </h4>
                    <ul className="space-y-4 text-sm text-gray-400 leading-relaxed">
                      <li className="flex gap-3">
                        <span className="text-cyber-accent mt-0.5">▸</span>
                        <div>
                          <strong className="text-gray-200 block">Kontextfenster:</strong>
                          GPT verarbeitet tausende Vektoren gleichzeitig – jeder ein komplexer Punkt im Raum (Tokenisierung).
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyber-accent mt-0.5">▸</span>
                        <div>
                          <strong className="text-gray-200 block">Parameter-Gewalt:</strong>
                          GPT-3 nutzt <span className="text-cyber-accent">175 Milliarden Parameter</span>, organisiert in ca. 30.000 Matrizen, um die Gewichtung zu steuern.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyber-accent mt-0.5">▸</span>
                        <div>
                          <strong className="text-gray-200 block">Mathematische Grundlage:</strong>
                          Das Modell basiert auf gewichteten Summen und Matrizenmultiplikation – eine hochkomplexe Weiterentwicklung der linearen Regression.
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* CARD 4: OUTPUT STEUERUNG */}
                  <div className="bg-cyber-card/40 border border-cyber-border/50 rounded-xl p-6 hover:bg-cyber-card/60 transition-colors">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-cyber-accent">04.</span> Softmax & Temperatur
                    </h4>
                    <ul className="space-y-4 text-sm text-gray-400 leading-relaxed">
                      <li className="flex gap-3">
                        <span className="text-cyber-accent mt-0.5">▸</span>
                        <div>
                          <strong className="text-gray-200 block">Softmax-Funktion:</strong>
                          Wandelt die internen Zahlenwerte in eine <span className="text-cyber-accent">Wahrscheinlichkeitsverteilung</span> um (Summe = 100%).
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyber-accent mt-0.5">▸</span>
                        <div>
                          <strong className="text-gray-200 block">Temperatur = 0 (Greedy):</strong>
                          Das Modell wählt immer das Wort mit der höchsten Wahrscheinlichkeit (deterministisch).
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyber-accent mt-0.5">▸</span>
                        <div>
                          <strong className="text-gray-200 block">Temperatur &gt; 0 (Kreativ):</strong>
                          Die Verteilung wird flacher. Wörter mit geringerer Wahrscheinlichkeit erhalten eine Chance <span className="text-red-400">➜ Risiko für Halluzinationen steigt</span>.
                        </div>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* --- INTERACTIVE DEMO --- */}
              <div className="pb-12">
                <h3 className="text-xl font-bold text-cyber-accent mb-6 flex items-center gap-2 border-b border-cyber-border/30 pb-2">
                  <span className="text-2xl">🎮</span> Live-Simulation: Temperatur in Aktion
                </h3>
                <TemperatureDemo />
              </div>
            </div>
          )}

          {activeModule === 'perceptron' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl text-white font-bold mb-2">Machine Learning (Perzeptron)</h2>
                <p className="text-gray-400">Ein Blick in die einfachste Form eines neuronalen Netzes: Das Perzeptron. Zeichne eine Zahl!</p>
              </div>

              <div className="mb-12">
                <PerceptronVisualizer />
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
                        <strong className="text-gray-200">Hidden Layers:</strong> Das "Gehirn" zwischen Input und Output. In diesen Schichten findet die <span className="text-cyber-accent">Merkmalsextraktion</span> statt: Die KI lernt, Kanten, Kurven und schließlich ganze Formen zu abstrahieren. Ohne diese Schichten könnte ein Modell nur extrem einfache (lineare) Probleme lösen – Hidden Layers ermöglichen erst echtes "Deep Learning" und logisches Verständnis komplexer Muster.
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
                        <strong className="text-gray-200">Sigmoid:</strong> Die Aktivierungsfunktion <span className="italic font-serif">σ(x)</span> wandelt beliebige Summen in Werte zwischen 0 und 1 um. Dies simuliert das "Feuern" eines biologischen Neurons (aktiv vs. inaktiv).
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* --- NEW SIMPLIFIED MATH BOX --- */}
              <div className="mb-12 bg-gradient-to-r from-cyber-accent/10 to-blue-600/10 border border-cyber-accent/30 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-8xl">🍳</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-cyber-accent text-black flex items-center justify-center font-mono">!</span>
                  Mathematik einfach erklärt: Das "KI-Rezept"
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                  <div className="space-y-2">
                    <div className="text-cyber-accent font-bold uppercase text-xs tracking-widest">Schritt 1: Die Zutaten</div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Jeder Pixel (Input) ist eine Zutat. Die <strong className="text-white">Gewichte</strong> bestimmen, wie viel wir davon nehmen. Salz ist wichtig (positives Gewicht), Dreck wollen wir nicht (negatives Gewicht).
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-cyber-accent font-bold uppercase text-xs tracking-widest">Schritt 2: Der Koch</div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Der Koch (Neuron) wirft alles in einen Topf. Der <strong className="text-white">Bias</strong> ist sein persönlicher Geschmack: Nur wenn die Suppe würzig genug ist, reicht er sie weiter.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-cyber-accent font-bold uppercase text-xs tracking-widest">Schritt 3: Der Filter (Sigmoid)</div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Die <strong className="text-white">Sigmoid-Funktion</strong> sorgt dafür, dass die Antwort sauber bleibt. Sie "quetscht" das Ergebnis auf eine Skala von <span className="text-white">0% (Ungenießbar)</span> bis <span className="text-white">100% (Perfekt!)</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* --- BIAS VISUALIZER (NEW) --- */}
              <div className="mb-12">
                <BiasVisualizer />
              </div>
            </div>
          )}

          {activeModule === 'agents' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl text-white font-bold mb-2">Neurale Netze (Evolution)</h2>
                <p className="text-gray-400">Beobachte, wie KI-Agenten über Generationen lernen, zu überleben und zu kämpfen.</p>
              </div>

              {/* --- EDUCATIONAL CONTENT --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-fade-in">

                {/* CARD 1: BIOLOGICAL BRAIN */}
                <div className="bg-cyber-card/40 border border-cyber-border/50 rounded-xl p-6 backdrop-blur-sm hover:border-cyber-accent/50 transition-colors">
                  <h3 className="text-lg text-cyber-accent font-bold mb-4 flex items-center gap-2">
                    <span className="text-xl">🧠</span> Das biologische Vorbild
                  </h3>
                  <ul className="space-y-4 text-sm text-gray-400 leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-cyber-accent mt-0.5">▸</span>
                      <div>
                        <strong className="text-gray-200 block">Neuronen & Synapsen:</strong>
                        Unser Gehirn besteht aus Milliarden von Nervenzellen (Neuronen), die über Verbindungen (Synapsen) kommunizieren.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyber-accent mt-0.5">▸</span>
                      <div>
                        <strong className="text-gray-200 block">Elektrische Signale:</strong>
                        Wenn ein Neuron stark genug stimuliert wird, "feuert" es ein elektrisches Signal ab, das an andere Neuronen weitergegeben wird.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyber-accent mt-0.5">▸</span>
                      <div>
                        <strong className="text-gray-200 block">Lernen durch Verstärkung:</strong>
                        "Neurons that fire together, wire together." Wenn wir etwas lernen, werden bestimmte Verbindungen stärker (dicker), andere schwächer. Das Gehirn baut sich physisch um.
                      </div>
                    </li>
                  </ul>
                </div>

                {/* CARD 2: ARTIFICIAL BRAIN */}
                <div className="bg-cyber-card/40 border border-cyber-border/50 rounded-xl p-6 backdrop-blur-sm hover:border-cyber-accent/50 transition-colors">
                  <h3 className="text-lg text-cyber-accent font-bold mb-4 flex items-center gap-2">
                    <span className="text-xl">💻</span> Die künstliche Kopie (KI)
                  </h3>
                  <ul className="space-y-4 text-sm text-gray-400 leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-cyber-accent mt-0.5">▸</span>
                      <div>
                        <strong className="text-gray-200 block">Knoten & Gewichte:</strong>
                        Statt Neuronen haben wir mathematische "Knoten". Statt Synapsen haben wir "Gewichte" (Zahlenwerte).
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyber-accent mt-0.5">▸</span>
                      <div>
                        <strong className="text-gray-200 block">Schichten (Layers):</strong>
                        Ein Signal (Input) wandert durch mehrere Schichten von Knoten, wird jedes Mal mit Gewichten multipliziert und am Ende als Ergebnis (Output) ausgegeben.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyber-accent mt-0.5">▸</span>
                      <div>
                        <strong className="text-gray-200 block">Iteratives Lernen:</strong>
                        Die KI "lernt" nicht biologisch, sondern indem sie ihre Gewichte (Zahlen) nach und nach anpasst, um Fehler zu minimieren oder Belohnungen zu maximieren.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* --- ARENA EXPLANATION --- */}
              <div className="mb-12 bg-gradient-to-r from-cyber-accent/10 to-purple-600/10 border border-cyber-accent/30 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-8xl">⚔️</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-cyber-accent text-black flex items-center justify-center font-mono">!</span>
                  Wie funktioniert die "AI Arena"?
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                  {/* Step 1: Sensation */}
                  <div className="space-y-3">
                    <div className="text-cyber-accent font-bold uppercase text-xs tracking-widest border-b border-cyber-accent/30 pb-1">Schritt 1: Wahrnehmung (Input)</div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Der Agent hat "Sensoren" (wie Augen). Er füttert sein Gehirn mit Zahlen:
                    </p>
                    <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
                      <li>Winkel zum Gegner</li>
                      <li>Distanz zum Gegner</li>
                      <li>Sehe ich ihn? (Ja/Nein)</li>
                      <li>Abstand zu Wänden</li>
                      <li>Eigener Cooldown</li>
                    </ul>
                  </div>

                  {/* Step 2: Processing */}
                  <div className="space-y-3">
                    <div className="text-cyber-accent font-bold uppercase text-xs tracking-widest border-b border-cyber-accent/30 pb-1">Schritt 2: Das Gehirn (Verarbeitung)</div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Diese Zahlen fließen durch das neuronale Netz.
                      <br /><br />
                      In den <strong>Hidden Layers</strong> werden die Informationen verknüpft (z.B. "Gegner nah" + "Cooldown bereit" = "Gute Chance").
                    </p>
                  </div>

                  {/* Step 3: Action */}
                  <div className="space-y-3">
                    <div className="text-cyber-accent font-bold uppercase text-xs tracking-widest border-b border-cyber-accent/30 pb-1">Schritt 3: Entscheidung (Output)</div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Am Ende kommen 3 Zahlen heraus, die die Aktionen steuern:
                    </p>
                    <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
                      <li><strong>Drehung:</strong> Links oder Rechts?</li>
                      <li><strong>Bewegung:</strong> Vor oder Zurück?</li>
                      <li><strong>Schießen:</strong> Feuer? (Ja/Nein)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* --- NEURAL NETWORK TECHNICAL DETAILS --- */}
              <div className="mb-12 bg-black/40 border border-cyber-accent/20 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-lg text-white font-bold mb-4 flex items-center gap-2">
                  <span className="text-cyber-accent">🧠</span> Technische Details des Neuralen Netzes
                </h3>
                <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
                  <div>
                    <div className="text-cyber-accent font-semibold mb-2">📊 Architektur: 2-Schichten Netzwerk</div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-400 ml-4">
                      <li><strong>Input Layer:</strong> 8 Neuronen (Sensor-Daten)</li>
                      <li><strong>Hidden Layer:</strong> 12 Neuronen mit tanh-Aktivierung</li>
                      <li><strong>Output Layer:</strong> 3 Neuronen (Aktionen)</li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-cyber-accent font-semibold mb-2">📥 Inputs (8 Werte, normalisiert -1 bis 1):</div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-400 ml-4">
                      <li><strong>Winkel zum Gegner</strong> (normalisiert durch π)</li>
                      <li><strong>Distanz zum Gegner</strong> (relativ zur Arena-Breite)</li>
                      <li><strong>Line-of-Sight</strong> (0 = blockiert, 1 = freie Sicht)</li>
                      <li><strong>Wandsensor vorne</strong> (0 = weit, 1 = sehr nah)</li>
                      <li><strong>Wandsensor links</strong> (Analog-Wert)</li>
                      <li><strong>Wandsensor rechts</strong> (Analog-Wert)</li>
                      <li><strong>Waffen-Cooldown</strong> (0 = bereit, 1 = leer)</li>
                      <li><strong>Bias</strong> (immer 1, ermöglicht Schwellenwerte)</li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-cyber-accent font-semibold mb-2">🔄 Hidden Layer (12 Neuronen):</div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-400 ml-4">
                      <li>Jedes Neuron empfängt alle 8 Inputs mit individuellen Gewichten</li>
                      <li><strong>Aktivierungsfunktion:</strong> tanh (Output: -1 bis 1)</li>
                      <li>Erlaubt <strong>nicht-lineare</strong> Entscheidungen (z.B. "WENN nah UND Cooldown bereit DANN schießen")</li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-cyber-accent font-semibold mb-2">📤 Outputs (3 Aktionen, -1 bis 1):</div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-400 ml-4">
                      <li><strong>Drehung:</strong> -1 = links drehen, 0 = geradeaus, +1 = rechts drehen</li>
                      <li><strong>Bewegung:</strong> -1 = rückwärts, 0 = stehen, +1 = vorwärts</li>
                      <li><strong>Schießen:</strong> \u003e0 = Feuer!, \u003c0 = nicht schießen</li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-cyber-accent font-semibold mb-2">🎯 Lernen (Evolutionärer Algorithmus):</div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-400 ml-4">
                      <li><strong>Fitness-Funktion:</strong> Belohnung für Treffer (+300), Strafe für Tod (-150)</li>
                      <li><strong>Selektion:</strong> Bester Agent überlebt und wird kopiert</li>
                      <li><strong>Mutation:</strong> Gewichte werden leicht zufällig verändert (Mutationsrate konfigurierbar)</li>
                      <li><strong>Keine Backpropagation:</strong> Reines Trial-and-Error über Generationen</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* --- EVOLUTION BOX --- */}
              <div className="mb-12 bg-cyber-card/20 border border-cyber-border/30 rounded-xl p-6">
                <h3 className="text-lg text-cyber-accent font-bold mb-4">🧬 Wie lernt der Agent? (Evolution)</h3>
                <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
                  <p>
                    Hier gibt es keinen Lehrer, der sagt "Das war falsch!". Stattdessen nutzen wir das Prinzip der <strong>Ameisen-Evolution</strong>:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-black/40 p-3 rounded border border-cyber-border/20 text-center">
                      <div className="text-2xl mb-2">🎲</div>
                      <div className="font-bold text-white mb-1">1. Zufall</div>
                      <div className="text-xs">Am Anfang ist das Gehirn komplett zufällig. Der Agent zuckt nur wild herum.</div>
                    </div>
                    <div className="bg-black/40 p-3 rounded border border-cyber-border/20 text-center">
                      <div className="text-2xl mb-2">💀</div>
                      <div className="font-bold text-white mb-1">2. Selektion</div>
                      <div className="text-xs">Wer stirbt oder nichts trifft, wird gelöscht. Wer lange überlebt oder trifft, bekommt Punkte (Highscore).</div>
                    </div>
                    <div className="bg-black/40 p-3 rounded border border-cyber-border/20 text-center">
                      <div className="text-2xl mb-2">👶</div>
                      <div className="font-bold text-white mb-1">3. Vererbung</div>
                      <div className="text-xs">Der Gewinner der Runde darf sich "fortpflanzen". Sein Gehirn wird in die nächste Runde kopiert.</div>
                    </div>
                    <div className="bg-black/40 p-3 rounded border border-cyber-border/20 text-center">
                      <div className="text-2xl mb-2">✨</div>
                      <div className="font-bold text-white mb-1">4. Mutation</div>
                      <div className="text-xs">Die Kopie wird leicht verändert (Mutiert). Vielleicht ist der Neue etwas besser? Wenn ja ➜ Neuer Champion!</div>
                    </div>
                  </div>
                </div>
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
      <Glossary activeModule={activeModule} />

    </div>
  );
};

export default App;