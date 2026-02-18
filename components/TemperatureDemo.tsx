import React, { useState, useEffect } from 'react';
import { getProbabilities, sampleWord, WordProbability } from '../constants';

export const TemperatureDemo: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(1.0);
  const [output, setOutput] = useState<string>('_');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [probabilities, setProbabilities] = useState<WordProbability[]>([]);

  // Update probabilities whenever temperature changes
  useEffect(() => {
    setProbabilities(getProbabilities(temperature));
  }, [temperature]);

  const handleGenerate = () => {
    setIsThinking(true);
    setOutput('...');

    // Simulate network latency
    setTimeout(() => {
      // Use the *current* probabilities to sample
      const currentProbs = getProbabilities(temperature);
      const result = sampleWord(currentProbs);
      setOutput(result);
      setIsThinking(false);
    }, 400);
  };

  return (
    <section className="relative group">
      {/* Gradient Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl opacity-30 group-hover:opacity-60 blur transition duration-500"></div>

      <div className="relative bg-[#0d1219]/95 backdrop-blur-xl border border-cyber-border rounded-xl p-6 md:p-8 shadow-2xl mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-cyber-border/50 pb-4">
          <div>
            <h2 className="text-3xl text-white font-bold tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 bg-cyber-accent rounded-sm inline-block"></span>
              Temperatur <span className="text-gray-500 text-lg font-mono font-normal">(τ)</span>
            </h2>
            <p className="mt-2 text-gray-400 text-sm max-w-lg">
              Steuere das <span className="text-cyber-accent">"Chaos"</span> im Gehirn der KI. Eine Änderung der Temperatur verändert direkt die <span className="text-cyber-accent">Wahrscheinlichkeiten</span> der nächsten Wörter.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT COLUMN: Controls & Output */}
          <div className="space-y-8">
            {/* Slider Control */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label htmlFor="tempSlider" className="font-mono text-cyber-accent text-sm tracking-widest uppercase">Parameter Einstellung</label>
                <div className="text-3xl font-bold font-mono text-white bg-black/30 px-3 py-1 rounded border border-cyber-border">
                  {temperature.toFixed(1)}
                </div>
              </div>

              <div className="relative h-6 flex items-center mb-2">
                <input
                  type="range"
                  id="tempSlider"
                  min="0.1"
                  max="5.0"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 relative z-10"
                />
                <div className="absolute inset-0 h-2 bg-gradient-to-r from-blue-900 to-cyan-500 rounded-lg blur-[2px] opacity-50 top-2"></div>
              </div>

              <div className="flex justify-between text-[10px] text-gray-500 uppercase font-mono tracking-wider">
                <span>Deterministisch (0.1)</span>
                <span>Kreativ (1.0)</span>
                <span>Zufall (5.0)</span>
              </div>
            </div>

            {/* Output Box */}
            <div className="bg-black/40 p-6 rounded-xl border border-cyber-border/50 relative overflow-hidden min-h-[160px] flex flex-col justify-center">
              {/* Scanline overlay inside box */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>

              <div className="font-mono space-y-3 relative z-10">
                <div className="flex items-start gap-3">
                  <span className="text-gray-600 select-none mt-1">INPUT &gt;</span>
                  <span className="text-gray-300">"Es war einmal..."</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyber-accent select-none mt-1">OUTPUT &gt;</span>
                  <span className={`text-2xl transition-all duration-300 break-words ${isThinking ? 'opacity-50 blur-[2px]' : 'opacity-100 font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'}`}>
                    {output}
                  </span>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isThinking}
                className="mt-6 w-full py-3 bg-cyber-accent/10 border border-cyber-accent text-cyber-accent rounded hover:bg-cyber-accent hover:text-black transition-all duration-300 font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2 group/btn"
              >
                <span className={`w-2 h-2 bg-cyber-accent rounded-full ${isThinking ? 'animate-ping' : ''}`}></span>
                {isThinking ? 'Berechne...' : 'Wort Generieren'}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Probability Graph */}
          <div className="bg-[#050505] rounded-xl p-4 border border-cyber-border/30 h-full max-h-[400px] overflow-y-auto custom-scrollbar">
            <h4 className="text-xs font-mono uppercase text-gray-500 mb-4 border-b border-gray-800 pb-2 flex justify-between">
              <span>Nächstes Wort Vorhersage</span>
              <span>Wahrscheinlichkeit</span>
            </h4>

            <div className="space-y-3">
              {probabilities.map((item, index) => (
                <div key={item.word} className="group relative">
                  <div className="flex justify-between text-sm mb-1 relative z-10">
                    <span className={`font-mono transition-colors ${output === item.word ? 'text-cyber-accent font-bold' : 'text-gray-300'}`}>
                      {index + 1}. {item.word}
                    </span>
                    <span className="text-gray-500 font-mono text-xs">
                      {(item.probability * 100).toFixed(1)}%
                    </span>
                  </div>

                  {/* Bar Background */}
                  <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                    {/* Bar Fill */}
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${index === 0 ? 'bg-cyber-accent shadow-[0_0_10px_rgba(0,242,255,0.5)]' : 'bg-gray-600'
                        }`}
                      style={{ width: `${item.probability * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};