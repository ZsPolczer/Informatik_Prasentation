import React, { useState, useEffect } from 'react';

const Conclusion: React.FC = () => {
    const [lakeMichiganFilledPercentage, setLakeMichiganFilledPercentage] = useState(0);
    const [takeoffType, setTakeoffType] = useState<'slow' | 'fast'>('slow');
    const [useLogScale, setUseLogScale] = useState(true);
    const [zoomLevel, setZoomLevel] = useState(1); // 1, 5, 20

    const toggleZoom = () => {
        setZoomLevel(prev => {
            if (prev === 1) return 5;
            if (prev === 5) return 20;
            if (prev === 20) return 0.1;
            if (prev === 0.1) return 0.5;
            return 1;
        });
    };

    // Animation for the Lake Michigan effect
    useEffect(() => {
        const interval = setInterval(() => {
            setLakeMichiganFilledPercentage((prev) => (prev >= 100 ? 0 : prev + 1));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        { name: 'Ameise', linearHeight: 0.1, logHeight: 15, color: 'bg-gray-700', label: 'Insekten-Intelligenz' },
        { name: 'Huhn', linearHeight: 1, logHeight: 30, color: 'bg-gray-600', label: 'Basis-Bewusstsein' },
        { name: 'Schimpanse', linearHeight: 10, logHeight: 50, color: 'bg-blue-900', label: 'Komplexe Problemlösung' },
        { name: 'Mensch', linearHeight: 20, logHeight: 65, color: 'bg-cyber-accent', label: 'Top-Spezies (Aktuell)', active: true },
        { name: 'AGI', linearHeight: 500, logHeight: 85, color: 'bg-purple-600', label: 'Allgemeine Intelligenz', pulse: true },
        { name: 'ASI', linearHeight: 2500, logHeight: 100, color: 'bg-red-600', label: 'Superintelligenz', pulse: true },
    ];

    return (
        <div className="space-y-12 animate-fade-in pb-20">
            {/* --- HEADER --- */}
            <section>
                <h2 className="text-3xl font-black text-white mb-4 border-l-4 border-cyber-accent pl-4">
                    Fazit: Die Zukunft der Intelligenz
                </h2>
                <p className="text-gray-400 text-lg">
                    Wohin führt uns die aktuelle Entwicklung? Um das Ausmaß der kommenden Veränderungen zu verstehen, müssen wir die Natur von <span className="text-cyber-accent">exponentiellem Wachstum</span> und die Qualität von Intelligenz betrachten.
                </p>
            </section>

            {/* --- INTELLIGENCE STAIRCASE --- */}
            <section className="bg-cyber-card/30 border border-cyber-border/50 rounded-2xl p-8 backdrop-blur-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h3 className="text-xl font-bold text-cyber-accent flex items-center gap-2">
                        <span className="text-2xl">🪜</span> Die Treppe der Intelligenz
                    </h3>

                    <div className="flex flex-col gap-2 self-start md:self-auto">
                        <div className="flex gap-2 bg-black/40 p-1 rounded-lg border border-cyber-border/50">
                            <button
                                onClick={() => setUseLogScale(true)}
                                className={`flex-1 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${useLogScale ? 'bg-cyber-accent text-black' : 'text-gray-500 hover:text-white'}`}
                            >
                                Vergleichbar ({zoomLevel}x)
                            </button>
                            <button
                                onClick={() => setUseLogScale(false)}
                                className={`flex-1 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${!useLogScale ? 'bg-cyber-accent text-black' : 'text-gray-500 hover:text-white'}`}
                            >
                                Realität (Linear)
                            </button>
                        </div>

                        {!useLogScale && (
                            <button
                                onClick={toggleZoom}
                                className="w-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-600"
                            >
                                Zoom: {zoomLevel}x (Klick zum Ändern)
                            </button>
                        )}
                    </div>
                </div>

                {/* Stricter container with overflow hidden to handle zoom clipping */}
                <div className="relative h-[400px] w-full border-b border-gray-700 bg-black/20 rounded-t-lg overflow-hidden flex items-end justify-between px-4">

                    {steps.map((step, idx) => {
                        // Calculate base height (0-100)
                        let heightVal = useLogScale ? step.logHeight : step.linearHeight;

                        // Apply Zoom Level only in Linear Mode
                        if (!useLogScale) {
                            heightVal = heightVal * zoomLevel;
                        }

                        // Cap at 100% for Log mode, but allow overflow for Linear zoom effect if desired 
                        // (but we clipped parent, so it just looks truncated which is perfect)

                        return (
                            <div key={idx} className="flex flex-col items-center justify-end w-1/6 h-full group relative z-10 px-1">
                                <div
                                    className={`w-full max-w-[60px] ${step.color} rounded-t-lg transition-all duration-500 relative flex flex-col justify-end
                                        ${step.pulse ? 'animate-pulse' : ''} 
                                        ${step.active ? 'ring-2 ring-cyber-accent shadow-[0_0_15px_rgba(0,242,255,0.3)]' : 'opacity-80 hover:opacity-100'}`}
                                    style={{
                                        height: `${heightVal}%`,
                                        minHeight: '4px' // Ensure visible sliver even for Ant
                                    }}
                                >
                                    {/* Label on top of bar (or hovering if huge) */}
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 p-2 rounded border border-cyber-border z-20 pointer-events-none">
                                        <span className="text-white font-bold whitespace-nowrap text-xs">{step.name}</span>
                                        <span className="text-cyber-accent text-[10px] whitespace-nowrap">{step.label}</span>
                                    </div>
                                </div>

                                {/* Static Label below */}
                                <span className={`mt-3 text-[10px] md:text-xs font-bold uppercase tracking-tighter text-center
                                    ${step.active ? 'text-cyber-accent' : 'text-gray-500'}`}>
                                    {step.name}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    <div className="space-y-4">
                        <h4 className="text-white font-bold">Qualität vs. Geschwindigkeit</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Der Unterschied zwischen uns und einem Schimpansen ist nicht die "Rechengeschwindigkeit". Es sind unsere <strong>kognitiven Module</strong>.
                            Ein Schimpanse kann lernen, was ein Wolkenkratzer ist, aber er wird nie verstehen, dass Menschen diese gebaut haben. Unser Gehirn hat eine andere <strong className="text-cyber-accent">Intelligenz-Qualität</strong>.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-white font-bold">Der Sprung zu ASI</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            <span className="text-cyber-accent">AGI</span> (Artificial General Intelligence) wäre nur zwei Stufen über uns – dasselbe Verhältnis wie zwischen Mensch und Schimpanse.
                            Sobald eine KI menschliches Niveau erreicht, beginnt die <strong className="text-cyber-accent">Intelligenz-Explosion</strong>. Sie verbessert sich selbst in Millisekunden.
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
                        <div className="relative w-full h-48 bg-gradient-to-b from-gray-900/0 to-blue-900/10 border-b-2 border-l border-r border-gray-700 rounded-b-[50%] overflow-hidden backdrop-blur-sm group">

                            {/* Water */}
                            <div
                                className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-100 ease-linear shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                                style={{ height: `${Math.pow(2, (lakeMichiganFilledPercentage / 100) * 10) / 1024 * 100}%` }}
                            >
                                {/* Water Surface */}
                                <div className="absolute top-0 w-full h-[2px] bg-white/50 shadow-[0_0_10px_white]"></div>
                            </div>

                            {/* Background Grid for Scale */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_25%] pointer-events-none"></div>

                            {/* Overlay Info */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                                <div className="text-xs font-mono text-cyan-200/70 bg-black/40 px-2 py-1 rounded backdrop-blur-md border border-cyan-900/30 whitespace-nowrap">
                                    {lakeMichiganFilledPercentage < 90 ? '...wird gefüllt...' : '⚠️ EXPONENTIAL SPIKE!'}
                                </div>
                                <div className="text-2xl font-black text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] font-mono">
                                    {Math.floor(1940 + (lakeMichiganFilledPercentage / 100) * (2026 - 1940))}
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-center text-gray-400 italic mt-2">
                            Der See bleibt lange leer, bis er in den letzten Momenten plötzlich überläuft. <br />
                            <span className="text-cyan-400 font-mono">Füllstand: {(Math.pow(2, (lakeMichiganFilledPercentage / 100) * 10) / 1024 * 100).toFixed(4)}%</span>
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
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                            {/* Baseline development */}
                            <path
                                d="M 0 192 Q 100 190, 200 180"
                                fill="none"
                                stroke="#4b5563"
                                strokeWidth="3"
                            />

                            {/* Slow Takeoff */}
                            {takeoffType === 'slow' && (
                                <path
                                    className="animate-fade-in"
                                    d="M 200 180 Q 250 150, 400 20"
                                    fill="none"
                                    stroke="#00f2ff"
                                    strokeWidth="4"
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
                                    strokeWidth="5"
                                />
                            )}
                        </svg>

                        <div className="absolute right-0 bottom-[-20px] text-[10px] text-gray-500 font-mono">Zukunft</div>
                        <div className="absolute -left-8 top-0 text-[10px] text-gray-500 font-mono rotate-270" style={{ transform: 'rotate(-90deg)', transformOrigin: 'left top' }}>Intelligenz</div>
                    </div>

                    <p className="text-[11px] text-gray-500 leading-tight">
                        {takeoffType === 'slow'
                            ? "Der <span className='text-cyber-accent'>'Slow Takeoff'</span> vermutet eine stetige, aber kontrollierbare Entwicklung über Jahrzehnte nach Erreichen von AGI."
                            : "Der <span className='text-red-500'>'Fast Takeoff' (Singularität)</span> geht davon aus, dass ASI innerhalb von Minuten oder Stunden nach AGI entsteht."}
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
