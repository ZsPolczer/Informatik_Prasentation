import React, { ReactNode, useState } from 'react';
import { chatCompletion } from '../services/aiService';

export const Glossary: React.FC = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;

    // Optimistic UI update
    const userMsg = input;
    setInput('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);

    setIsLoading(true);

    try {
      const answer = await chatCompletion(userMsg);
      setChatHistory(prev => [...prev, { role: 'ai', content: answer }]);
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'ai', content: "Fehler bei der Anfrage. Bitte versuche es später." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="hidden lg:block w-[300px] h-[calc(100vh-2rem)] fixed top-0 right-0 border-l border-cyber-border/50 bg-[#090c10]/80 backdrop-blur-md p-6 overflow-y-auto z-20 m-4 rounded-xl border flex flex-col">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <h3 className="text-lg font-mono font-bold text-cyber-accent mb-6 border-b border-cyber-border/50 pb-2 tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-cyber-accent rounded-full animate-pulse"></span>
          Wissensdatenbank
        </h3>

        <div className="space-y-6">
          <GlossaryItem
            title="Temperature (τ)"
            content={
              <>
                Ein Parameter, der die <span className="text-cyber-accent font-bold">Wahrscheinlichkeitsverteilung</span> beeinflusst. Hohe Werte erhöhen die Kreativität (Zufall), niedrige Werte erzwingen Logik.
              </>
            }
          />
          <GlossaryItem
            title="Neural Weights"
            content={
              <>
                Die <span className="text-cyber-accent font-bold">Stärke der Verbindung</span> zwischen Neuronen. Das Wissen der KI ist in diesen Zahlen als Matrix gespeichert.
              </>
            }
          />
          <GlossaryItem
            title="Bias (Reizschwelle)"
            content={
              <>
                Ein Wert, der bestimmt, ab wann ein <span className="text-cyber-accent font-bold">Neuron feuert</span>. Er verschiebt die Aktivierungsschwelle unabhängig von den Inputs.
              </>
            }
          />
          <GlossaryItem
            title="Aktivierungsfunktion"
            content={
              <>
                Mathematik (wie <span className="text-cyber-accent font-bold">Sigmoid</span> oder <span className="text-cyber-accent font-bold">Tanh</span>), die den Output eines Neurons "quetscht" und komplexe Logik ermöglicht.
              </>
            }
          />
          <GlossaryItem
            title="Hidden Layers"
            content={
              <>
                Die <span className="text-cyber-accent font-bold">versteckten Schichten</span> zwischen Input und Output. Hier findet die eigentliche Merkmalsextraktion und Abstraktion statt.
              </>
            }
          />
          <GlossaryItem
            title="Deep Learning"
            content={
              <>
                Ein Teilgebiet von Machine Learning, das <span className="text-cyber-accent font-bold">mehrlagige neuronale Netze</span> verwendet, um extrem komplexe Muster zu verstehen.
              </>
            }
          />
          <GlossaryItem
            title="Backpropagation"
            content={
              <>
                Der Lernalgorithmus: Der <span className="text-cyber-accent font-bold">Fehler</span> wird rückwärts durch das Netz geleitet, um die Gewichte mathematisch korrekt anzupassen.
              </>
            }
          />
          <GlossaryItem
            title="Epoche (Trainingszyklus)"
            content={
              <>
                Ein kompletter <span className="text-cyber-accent font-bold">Trainingsdurchlauf</span> durch den gesamten Datensatz. Modelle benötigen oft tausende Epochen zum Lernen.
              </>
            }
          />
          <GlossaryItem
            title="Parameter"
            content={
              <>
                Die Summe aller <span className="text-cyber-accent font-bold">Gewichte und Biases</span>. Sie definieren das gesamte Gehirn des Modells (z.B. GPT-4 hat Billionen davon).
              </>
            }
          />
          <GlossaryItem
            title="Perzeptron"
            content={
              <>
                Der <span className="text-cyber-accent font-bold">Urvater</span> der neuronalen Netze. Eine simple Struktur, die nur eine Entscheidungsebene besitzt.
              </>
            }
          />
          <GlossaryItem
            title="Vektoren & Matrizen"
            content={
              <>
                Die <span className="text-cyber-accent font-bold">Sprache der KI</span>. Alle Informationen (Bilder, Text) werden in Zahlenlisten umgewandelt und mit Matrizen berechnet.
              </>
            }
          />
          <GlossaryItem
            title="Mutation"
            content={
              <>
                Ein Prozess in <span className="text-cyber-accent font-bold">evolutionären Algorithmen</span>: Zufällige kleine Änderungen am "Erbgut" (Gewichten), um neue Strategien zu finden.
              </>
            }
          />
          <GlossaryItem
            title="AGI (General Intelligence)"
            content={
              <>
                Künstliche <span className="text-cyber-accent font-bold">allgemeine Intelligenz</span>. Eine KI, die jede intellektuelle Aufgabe so gut wie ein Mensch bewältigen kann.
              </>
            }
          />
          <GlossaryItem
            title="ASI (Superintelligence)"
            content={
              <>
                Künstliche <span className="text-cyber-accent font-bold">Superintelligenz</span>. Eine Intelligenz, die die menschlichen Fähigkeiten in absolut jedem Bereich milliardenfach übertrifft.
              </>
            }
          />
          <GlossaryItem
            title="Singularität"
            content={
              <>
                Der hypothetische Zeitpunkt, an dem die KI sich <span className="text-cyber-accent font-bold">selbst verbessert</span> und der Fortschritt für Menschen unvorhersehbar schnell wird.
              </>
            }
          />
          <GlossaryItem
            title="Exponentielles Wachstum"
            content={
              <>
                Eine Entwicklung, die sich in <span className="text-cyber-accent font-bold">festen Zeitabständen verdoppelt</span>. Das menschliche Gehirn unterschätzt diese Geschwindigkeit oft massiv.
              </>
            }
          />
        </div>
      </div>

      {/* CHAT SECTION AT BOTTOM */}
      <div className="mt-6 pt-6 border-t border-cyber-border/50 shrink-0">
        <h3 className="text-sm font-mono font-bold text-cyber-accent mb-4 tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
          Frag die KI
        </h3>

        <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto custom-scrollbar mb-4">
          {chatHistory.map((msg, i) => (
            <div key={i} className={`p-2 rounded text-xs leading-relaxed ${msg.role === 'user' ? 'bg-gray-800 text-gray-300 ml-4' : 'bg-purple-900/20 text-purple-300 mr-4 border border-purple-500/30'}`}>
              {msg.content}
            </div>
          ))}
          {isLoading && <div className="text-xs text-purple-500 animate-pulse font-mono">Denkt nach...</div>}
        </div>

        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Frage stellen..."
            className="w-full bg-black/40 border border-cyber-border rounded px-3 py-2 text-xs text-white focus:border-purple-500 outline-none pr-8 transition-colors"
          />
          <button
            onClick={handleAsk}
            disabled={isLoading || !input.trim()}
            className="absolute right-1 top-1 p-1 text-purple-500 hover:text-white disabled:opacity-50 transition-colors"
          >
            ➤
          </button>
        </div>
      </div>
    </aside>
  );
};

// Helper component for cleaner code
const GlossaryItem: React.FC<{ title: string, content: ReactNode }> = ({ title, content }) => (
  <details className="group border border-transparent hover:border-cyber-border/50 rounded-lg transition-all duration-300 bg-black/20 open:bg-black/40 open:border-cyber-accent/30">
    <summary className="list-none cursor-pointer font-bold text-white group-open:text-cyber-accent transition-colors p-3 flex justify-between items-center select-none">
      {title}
      <span className="text-xs text-gray-600 group-open:rotate-180 transition-transform duration-300">▼</span>
    </summary>
    <div className="px-3 pb-3">
      <p className="text-sm text-gray-400 leading-relaxed border-t border-gray-800 pt-2 mt-1">
        {content}
      </p>
    </div>
  </details>
);