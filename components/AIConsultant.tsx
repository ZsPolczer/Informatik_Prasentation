import React, { useState } from 'react';
import { chatCompletion } from '../services/aiService';

export const AIConsultant: React.FC = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAsk = async () => {
        if (!input.trim()) return;

        setIsLoading(true);
        setResponse('Lade Antwort...');

        const result = await chatCompletion(input);
        setResponse(result);
        setIsLoading(false);
    };

    return (
        <section className="relative group mb-16">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>

            <div className="relative bg-[#0d1219]/95 backdrop-blur-xl border border-cyber-border rounded-xl p-6 md:p-8 shadow-2xl">
                <h2 className="text-3xl text-white font-bold tracking-tight flex items-center gap-3 mb-6">
                    <span className="w-2 h-8 bg-purple-500 rounded-sm inline-block"></span>
                    KI Experte fragen
                </h2>

                <p className="text-gray-400 mb-6 font-mono text-sm uppercase tracking-widest">
                    Modell: <span className="text-purple-400">nemotron-3-nano-30b-a3b (via OpenRouter)</span>
                </p>

                <div className="flex flex-col gap-4">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Frage etwas über Neuronale Netze..."
                        className="w-full bg-black/40 border border-cyber-border rounded-lg p-4 text-white font-mono focus:border-purple-500 outline-none transition-colors min-h-[100px]"
                    />

                    <button
                        onClick={handleAsk}
                        disabled={isLoading || !input.trim()}
                        className="w-full py-4 bg-purple-600/20 border border-purple-500 text-purple-400 rounded-lg font-bold uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Denkt nach...' : 'Expertise anfordern'}
                    </button>

                    {response && (
                        <div className="mt-6 p-4 bg-black/60 border border-purple-500/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-mono text-purple-400 uppercase tracking-tighter">KI Antwort</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {response}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
