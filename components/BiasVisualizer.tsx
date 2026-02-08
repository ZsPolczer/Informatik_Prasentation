import React, { useState, useEffect } from 'react';

export const BiasVisualizer: React.FC = () => {
    // -1 = Links extrem, 0 = Neutral, 1 = Rechts extrem
    const [dataPoints, setDataPoints] = useState<number[]>([]);
    const [bias, setBias] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Train the model with a specific leaning
    const train = (direction: 'left' | 'center' | 'right' | 'mixed') => {
        setIsAnimating(true);
        const newPoints: number[] = [];
        const count = 20;

        for (let i = 0; i < count; i++) {
            let val = 0;
            // Random Gaussian-like distribution based on direction
            if (direction === 'left') val = -0.8 + (Math.random() * 0.4); // -0.8 to -0.4
            if (direction === 'right') val = 0.4 + (Math.random() * 0.4); // 0.4 to 0.8
            if (direction === 'center') val = -0.2 + (Math.random() * 0.4); // -0.2 to 0.2
            if (direction === 'mixed') val = -1 + (Math.random() * 2); // -1 to 1

            newPoints.push(Math.max(-1, Math.min(1, val)));
        }

        setDataPoints(prev => {
            const updated = [...prev, ...newPoints].slice(-200); // Keep last 200 points to keep it responsive
            return updated;
        });

        setTimeout(() => setIsAnimating(false), 500);
    };

    const reset = () => {
        setDataPoints([]);
    };

    // Calculate average bias
    useEffect(() => {
        if (dataPoints.length === 0) {
            setBias(0);
            return;
        }
        const sum = dataPoints.reduce((a, b) => a + b, 0);
        setBias(sum / dataPoints.length);
    }, [dataPoints]);

    return (
        <div className="bg-cyber-card/40 border border-cyber-border/50 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group">

            {/* HEADER */}
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-2xl">⚖️</span>
                Bias & Daten-Qualität
            </h3>
            <p className="text-sm text-gray-400 mb-6 max-w-2xl">
                Eine KI ist nur so neutral wie ihre Trainingsdaten. Wenn man einer KI nur einseitige Meinungen "füttert", übernimmt sie diese Sichtweise als absolute Wahrheit.
                <br /><span className="text-cyber-accent text-xs mt-1 block">Simuliere das Training durch Klicken der Buttons unten:</span>
            </p>

            {/* VISUALIZATION AREA */}
            <div className="relative h-40 bg-black/40 rounded-lg mb-6 border border-gray-800 overflow-hidden flex items-end justify-center px-4 pt-4 pb-0">

                {/* BACKGROUND GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-blue-900/20 pointer-events-none" />

                {/* LABELS */}
                <div className="absolute top-2 left-4 text-xs font-bold text-red-500">Links-Extrem</div>
                <div className="absolute top-2 right-4 text-xs font-bold text-blue-500">Rechts-Extrem</div>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-500">Neutral</div>

                {/* MIDDLE LINE */}
                <div className="absolute top-8 bottom-0 left-1/2 w-0.5 bg-gray-700/50 -translate-x-1/2" />

                {/* DATA POINTS (Scatter Plot styled as histogram heaps) */}
                {dataPoints.map((point, i) => (
                    <div
                        key={i}
                        className="absolute bottom-0 w-2 h-2 rounded-full opacity-60 transition-all duration-500"
                        style={{
                            left: `${(point + 1) * 50}%`,
                            bottom: `${Math.random() * 80}%`, // Visual stacking approximation
                            backgroundColor: point < -0.3 ? '#ef4444' : point > 0.3 ? '#3b82f6' : '#10b981',
                            transform: 'translateX(-50%)',
                            width: '6px',
                            height: '6px'
                        }}
                    />
                ))}

                {/* BIAS NEEDLE */}
                <div
                    className="absolute top-8 bottom-0 w-1 bg-white shadow-[0_0_15px_white] transition-all duration-700 ease-out z-10"
                    style={{
                        left: `${(bias + 1) * 50}%`
                    }}
                >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-1 rounded transform -translate-y-full">
                        KI-Meinung
                    </div>
                </div>

            </div>

            {/* CONTROLS */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <button
                    onClick={() => train('left')}
                    className="px-3 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-900/50 rounded flex flex-col items-center gap-1 transition-all active:scale-95"
                >
                    <span className="text-xs text-red-400 font-bold">Nur Links trainieren</span>
                </button>

                <button
                    onClick={() => train('center')}
                    className="px-3 py-2 bg-green-900/30 hover:bg-green-900/50 border border-green-900/50 rounded flex flex-col items-center gap-1 transition-all active:scale-95"
                >
                    <span className="text-xs text-green-400 font-bold">Nur Mitte trainieren</span>
                </button>

                <button
                    onClick={() => train('right')}
                    className="px-3 py-2 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-900/50 rounded flex flex-col items-center gap-1 transition-all active:scale-95"
                >
                    <span className="text-xs text-blue-400 font-bold">Nur Rechts trainieren</span>
                </button>

                <button
                    onClick={() => train('mixed')}
                    className="px-3 py-2 bg-cyber-accent/10 hover:bg-cyber-accent/30 border border-cyber-accent/30 rounded flex flex-col items-center gap-1 transition-all active:scale-95 col-span-2 md:col-span-1"
                >
                    <span className="text-xs text-cyber-accent font-bold">Ausgewogen (Realität)</span>
                    <span className="text-[9px] text-gray-400">Alle Perspektiven</span>
                </button>

                <button
                    onClick={reset}
                    className="px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded flex items-center justify-center gap-1 transition-all active:scale-95 col-span-2 md:col-span-1"
                >
                    <span className="text-xs text-gray-300">Reset</span>
                </button>
            </div>

            {/* EXPLANATION */}
            <div className="mt-4 p-3 bg-black/30 border border-cyber-border/30 rounded text-xs text-gray-400">
                <strong>Erkenntnis:</strong>
                {Math.abs(bias) < 0.2 && dataPoints.length > 10 ? (
                    <span className="text-green-400 ml-1">Das Modell ist ausgewogen! Es kennt alle Extreme, landet aber im Durchschnitt in der neutralen Mitte. Das ist das Ziel von gutem Training.</span>
                ) : Math.abs(bias) > 0.2 ? (
                    <span className="text-red-400 ml-1">Bias erkannt! Das Modell tendiert stark in eine Richtung, weil ihm die Gegenperspektive fehlt. Es hält seine einseitige Sicht für die "Normalität".</span>
                ) : (
                    <span className="ml-1">Füttere das Modell mit Daten, um zu sehen, wie sich das "Weltbild" der KI formt.</span>
                )}
            </div>

        </div>
    );
};
