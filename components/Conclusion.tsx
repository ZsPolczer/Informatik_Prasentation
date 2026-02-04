import React, { useState, useEffect } from 'react';

const Conclusion: React.FC = () => {
    const [lakeMichiganFilledPercentage, setLakeMichiganFilledPercentage] = useState(0);
    const [takeoffType, setTakeoffType] = useState<'slow' | 'fast'>('slow');

    // Animation for the Lake Michigan effect
    useEffect(() => {
        const interval = setInterval(() => {
            setLakeMichiganFilledPercentage((prev) => (prev >= 100 ? 0 : prev + 1));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-12 animate-fade-in pb-20">
            {/* --- HEADER --- */}
            <section>
                <h2 className="text-3xl font-black text-white mb-4 border-l-4 border-cyber-accent pl-4">
                    Fazit: Die Zukunft der Intelligenz
                </h2>
                <p className="text-gray-400 text-lg">
                    Wohin führt uns die aktuelle Entwicklung? Um das Ausmaß der kommenden Veränderungen zu verstehen, müssen wir die Natur von exponentiellem Wachstum und die Qualität von Intelligenz betrachten.
                </p>
            </section>

            {/* --- INTELLIGENCE STAIRCASE --- */}
            <section className="bg-cyber-card/30 border border-cyber-border/50 rounded-2xl p-8 backdrop-blur-md">
                <h3 className="text-xl font-bold text-cyber-accent mb-8 flex items-center gap-2">
                    <span className="text-2xl">🪜</span> Die Treppe der Intelligenz (Intelligence Staircase)
                </h3>

                <div className="relative h-[400px] flex items-end justify-between px-4">
                    {/* Steps */}
                    {[
                        { name: 'Ameise', height: '10%', color: 'bg-gray-700', label: 'Insekten-Intelligenz' },
                        { name: 'Huhn', height: '25%', color: 'bg-gray-600', label: 'Basis-Bewusstsein' },
                        { name: 'Schimpanse', height: '45%', color: 'bg-blue-900', label: 'Komplexe Problemlösung' },
                        { name: 'Mensch', height: '60%', color: 'bg-cyber-accent', label: 'Top-Spezies (Aktuell)', active: true },
                        { name: 'AGI', height: '80%', color: 'bg-purple-600', label: 'Künstliche Allgemeine Intelligenz', pulse: true },
                        { name: 'ASI', height: '100%', color: 'bg-red-600', label: 'Superintelligenz (Level: Gott)', pulse: true },
                    ].map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center w-1/7 group relative">
                            <div
                                className={`w-16 ${step.color} rounded-t-lg transition-all duration-500 overflow-visible relative ${step.pulse ? 'animate-pulse' : ''} ${step.active ? 'ring-4 ring-cyber-accent/30 shadow-[0_0_20px_rgba(0,242,255,0.4)]' : ''}`}
                                style={{ height: step.height }}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono text-gray-400 font-bold bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {step.label}
                                </div>
                            </div>
                            <span className={`mt-4 text-xs font-bold uppercase tracking-tighter ${step.active ? 'text-cyber-accent' : 'text-gray-500'}`}>
                                {step.name}
                            </span>
                        </div>
                    ))}

                    {/* Connectors/Ratio Lines */}
                    <div className="absolute left-[54%] bottom-[60%] w-[12%] border-t-2 border-dashed border-gray-500 opacity-50"></div>
                    <div className="absolute right-[22%] bottom-[80%] w-[12%] border-t-2 border-dashed border-gray-500 opacity-50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    <div className="space-y-4">
                        <h4 className="text-white font-bold">Qualität vs. Geschwindigkeit</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Der Unterschied zwischen uns und einem Schimpansen ist nicht die "Rechengeschwindigkeit". Es sind unsere <strong>kognitiven Module</strong>.
                            Ein Schimpanse kann lernen, was ein Wolkenkratzer ist, aber er wird nie verstehen, dass Menschen diese gebaut haben. Unser Gehirn hat eine andere <strong>Intelligenz-Qualität</strong>.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-white font-bold">Der Sprung zu ASI</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            AGI (Artificial General Intelligence) wäre nur zwei Stufen über uns – dasselbe Verhältnis wie zwischen Mensch und Schimpanse.
                            Sobald eine KI menschliches Niveau erreicht, beginnt die <strong>Intelligenz-Explosion</strong>. Sie verbessert sich selbst in Millisekunden.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- EXPONENTIAL GROWTH --- */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-cyber-card/30 border border-cyber-border/50 rounded-2xl p-8 backdrop-blur-md flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-cyber-accent mb-6 flex items-center gap-2">
                        <span className="text-2xl">💧</span> Exponentielles Wachstum
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                        Stellen Sie sich vor, der leere Lake Michigan wird mit Wassertropfen gefüllt. Das Volumen verdoppelt sich alle 18 Monate.
                    </p>
                    <div className="space-y-4">
                        <div className="flex justify-between text-xs font-mono text-gray-500">
                            <span>Tag 1: 1 Tropfen</span>
                            <span>... fast leer ...</span>
                            <span>Kurz vor Ende: VOLL</span>
                        </div>
                        <div className="h-4 bg-gray-800 rounded-full overflow-hidden border border-cyber-border">
                            <div
                                className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300"
                                style={{ width: `${Math.pow(2, (lakeMichiganFilledPercentage / 100) * 10) / 1024 * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-center text-gray-600 italic">
                            Nach 30 Verdopplungen ist ein See voll, der 29 Verdopplungen lang fast leer aussah.
                        </p>
                    </div>
                </div>

                {/* --- TAKEOFF TIMELINE --- */}
                <div className="bg-cyber-card/30 border border-cyber-border/50 rounded-2xl p-8 backdrop-blur-md">
                    <h3 className="text-xl font-bold text-cyber-accent mb-6 flex items-center gap-2">
                        <span className="text-2xl">🚀</span> Der Takeoff (Entwicklung seit 1940)
                    </h3>

                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setTakeoffType('slow')}
                            className={`px-4 py-1 rounded-full text-xs font-bold border transition-all ${takeoffType === 'slow' ? 'bg-cyber-accent/20 border-cyber-accent text-cyber-accent' : 'border-gray-700 text-gray-600'}`}
                        >
                            Slow Takeoff
                        </button>
                        <button
                            onClick={() => setTakeoffType('fast')}
                            className={`px-4 py-1 rounded-full text-xs font-bold border transition-all ${takeoffType === 'fast' ? 'bg-red-500/20 border-red-500 text-red-500' : 'border-gray-700 text-gray-600'}`}
                        >
                            Fast Takeoff
                        </button>
                    </div>

                    <div className="relative h-48 border-l border-b border-gray-700 ml-8 mb-4">
                        {/* 1940 Marker */}
                        <div className="absolute left-0 bottom-0 w-1 h-1 bg-white rounded-full"></div>
                        <div className="absolute -left-10 bottom-[-20px] text-[10px] text-gray-500 font-mono">1940</div>

                        {/* Present Marker */}
                        <div className="absolute left-1/2 bottom-0 w-[1px] h-full border-l border-dashed border-gray-700"></div>
                        <div className="absolute left-1/2 bottom-[-20px] -translate-x-1/2 text-[10px] text-gray-500 font-mono">Heute</div>

                        {/* Growth Curve */}
                        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                            {/* Baseline development */}
                            <path
                                d="M 0 192 Q 100 190, 200 180"
                                fill="none"
                                stroke="#4b5563"
                                strokeWidth="2"
                            />

                            {/* Slow Takeoff */}
                            {takeoffType === 'slow' && (
                                <path
                                    className="animate-fade-in"
                                    d="M 200 180 Q 250 150, 400 20"
                                    fill="none"
                                    stroke="#00f2ff"
                                    strokeWidth="3"
                                    strokeDasharray="5,5"
                                />
                            )}

                            {/* Fast Takeoff */}
                            {takeoffType === 'fast' && (
                                <path
                                    className="animate-fade-in"
                                    d="M 200 180 L 220 170 L 230 10"
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="4"
                                />
                            )}
                        </svg>

                        <div className="absolute right-0 bottom-[-20px] text-[10px] text-gray-500 font-mono">Zukunft</div>
                        <div className="absolute -left-8 top-0 text-[10px] text-gray-500 font-mono rotate-270" style={{ transform: 'rotate(-90deg)', transformOrigin: 'left top' }}>Intelligenz</div>
                    </div>

                    <p className="text-[11px] text-gray-500 leading-tight">
                        {takeoffType === 'slow'
                            ? "Der 'Slow Takeoff' vermutet eine stetige, aber kontrollierbare Entwicklung über Jahrzehnte nach Erreichen von AGI."
                            : "Der 'Fast Takeoff' (Singularität) geht davon aus, dass ASI innerhalb von Minuten oder Stunden nach AGI entsteht."}
                    </p>
                </div>
            </section>

            {/* --- FINAL QUOTE --- */}
            <section className="text-center py-12 border-t border-cyber-border/30">
                <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/50 rounded-lg mb-6">
                    <span className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest">Warnung: Unvorhersehbarkeit</span>
                </div>
                <h2 className="text-4xl font-black text-white italic mb-6">
                    "The first ultra-intelligent machine is the last invention that man need ever make."
                </h2>
                <p className="text-gray-500 font-mono text-sm">— Irving John Good (1965)</p>
            </section>
        </div>
    );
};

export default Conclusion;
