import React, { useState, useEffect, useRef } from 'react';
import { NetworkDiagram } from './NetworkDiagram';

const TOTAL_PIXELS = 100; // 10x10 grid

export const PerceptronVisualizer: React.FC = () => {
    // --- STATE ---
    const [inputGrid, setInputGrid] = useState<number[]>(new Array(TOTAL_PIXELS).fill(0));
    const [weights, setWeights] = useState<{ [key: number]: number[] }>(() => {
        const initialWeights: { [key: number]: number[] } = {};
        for (let i = 0; i <= 9; i++) {
            initialWeights[i] = new Array(TOTAL_PIXELS).fill(0).map(() => Math.random() * 0.1);
        }
        return initialWeights;
    });

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isEraserMode, setIsEraserMode] = useState(false);
    const [currentlyViewing, setCurrentlyViewing] = useState(0);
    const [prediction, setPrediction] = useState<number | null>(null);
    const [message, setMessage] = useState<string>('Zeichne eine Zahl!');

    const gridRef = useRef<HTMLDivElement>(null);

    // --- AI LOGIC ---
    const predict = (currentGrid: number[]) => {
        let bestLabel = -1;
        let bestScore = -Infinity;

        for (let label = 0; label <= 9; label++) {
            let score = 0;
            for (let i = 0; i < TOTAL_PIXELS; i++) {
                score += currentGrid[i] * weights[label][i];
            }
            if (score > bestScore) {
                bestScore = score;
                bestLabel = label;
            }
        }
        setPrediction(bestLabel);
        setCurrentlyViewing(bestLabel);
        return bestLabel;
    };

    const train = (correctLabel: number) => {
        const currentPrediction = prediction !== null ? prediction : predict(inputGrid);

        setWeights(prev => {
            const newWeights = { ...prev };
            const correctWeights = [...newWeights[correctLabel]];
            const wrongWeights = currentPrediction !== correctLabel ? [...newWeights[currentPrediction]] : null;

            for (let i = 0; i < TOTAL_PIXELS; i++) {
                if (inputGrid[i] === 1) {
                    correctWeights[i] += 1;
                    if (wrongWeights) {
                        wrongWeights[i] -= 1;
                    }
                }
            }

            newWeights[correctLabel] = correctWeights;
            if (wrongWeights && currentPrediction !== null) {
                newWeights[currentPrediction] = wrongWeights;
            }
            return newWeights;
        });

        setMessage(`Gelernt: Das war eine ${correctLabel}!`);
        setCurrentlyViewing(correctLabel);

        setTimeout(() => {
            clearGrid();
            setMessage('Zeichne die nächste Zahl!');
        }, 800);
    };

    const clearGrid = () => {
        setInputGrid(new Array(TOTAL_PIXELS).fill(0));
        setPrediction(null);
    };

    const handleCellAction = (index: number, isRightClick: boolean = false) => {
        const shouldErase = isRightClick || isEraserMode;
        setInputGrid(prev => {
            const newGrid = [...prev];
            newGrid[index] = shouldErase ? 0 : 1;
            return newGrid;
        });
    };

    // Run prediction whenever the grid changes
    useEffect(() => {
        if (!isMouseDown && inputGrid.some(v => v === 1)) {
            predict(inputGrid);
        }
    }, [inputGrid, isMouseDown]);

    // Handle global mouse up
    useEffect(() => {
        const handleMouseUp = () => setIsMouseDown(false);
        window.addEventListener('mouseup', handleMouseUp);
        return () => window.removeEventListener('mouseup', handleMouseUp);
    }, []);

    // --- RENDERING HELPERS ---
    const getHeatmapColor = (weight: number, maxAbsWeight: number) => {
        if (maxAbsWeight === 0) return 'rgba(255, 255, 255, 0.05)';
        const intensity = Math.abs(weight) / maxAbsWeight;
        if (weight > 0) return `rgba(0, 242, 255, ${intensity * 0.8 + 0.1})`; // Blueish (Cyber)
        if (weight < 0) return `rgba(255, 46, 99, ${intensity * 0.8 + 0.1})`; // Reddish
        return 'rgba(255, 255, 255, 0.05)';
    };

    const maxAbsWeight = Math.max(...weights[currentlyViewing].map(Math.abs), 0.001);

    return (
        <section className="relative group mb-16">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-accent to-blue-600 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>

            <div className="relative bg-[#0d1219]/95 backdrop-blur-xl border border-cyber-border rounded-xl p-6 md:p-8 shadow-2xl">
                <header className="mb-8 border-b border-cyber-border/50 pb-4">
                    <h2 className="text-3xl text-white font-bold tracking-tight flex items-center gap-3">
                        <span className="w-2 h-8 bg-cyber-accent rounded-sm inline-block"></span>
                        Perzeptron Visualisierung
                    </h2>
                    <p className="text-gray-400 mt-2 text-sm font-mono uppercase tracking-wider">
                        Wie eine KI einfache Muster erkennt und lernt.
                    </p>
                </header>

                {/* Update the grid to be 3 columns on XL screens */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-8 items-start justify-items-center">

                    {/* LEFT: INPUT */}
                    <div className="flex flex-col items-center space-y-6 w-full max-w-[320px]">
                        <div className="w-full flex justify-between items-center mb-2">
                            <span className="text-xs font-mono text-cyber-accent uppercase tracking-widest">Input: Zeichnung</span>
                            <button
                                onClick={() => setIsEraserMode(!isEraserMode)}
                                className={`text-[10px] px-2 py-1 rounded border font-mono transition-all ${isEraserMode ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-cyber-accent/10 border-cyber-accent/50 text-cyber-accent'}`}
                            >
                                {isEraserMode ? 'RADIERGUMMI AKTIV' : 'STIFT AKTIV'}
                            </button>
                        </div>

                        <div
                            className="grid grid-cols-10 grid-rows-10 gap-0 border-4 border-cyber-border bg-gray-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-crosshair select-none"
                            onMouseDown={() => setIsMouseDown(true)}
                            onContextMenu={(e) => e.preventDefault()}
                        >
                            {inputGrid.map((val, i) => (
                                <div
                                    key={`in-${i}`}
                                    onMouseMove={() => isMouseDown && handleCellAction(i)}
                                    onMouseDown={(e) => handleCellAction(i, e.button === 2)}
                                    className={`w-7 h-7 md:w-8 md:h-8 transition-colors duration-75 ${val === 1 ? 'bg-white shadow-[0_0_8px_white]' : 'bg-transparent border-[0.5px] border-white/5'}`}
                                />
                            ))}
                        </div>

                        <div className="w-full bg-black/40 p-4 rounded-lg border border-cyber-border text-center min-h-[80px] flex flex-col justify-center">
                            <div className="text-cyber-accent font-mono text-xs uppercase mb-1">{message}</div>
                            <div className="text-2xl font-bold text-white tracking-widest">
                                {prediction !== null ? `Vorhersage: ${prediction}` : '...'}
                            </div>
                        </div>

                        <div className="w-full space-y-3">
                            <div className="text-[10px] text-center text-gray-500 font-mono uppercase tracking-tighter">Korrektur: Was ist das wirklich?</div>
                            <div className="grid grid-cols-5 gap-2">
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                                    <button
                                        key={`train-${n}`}
                                        onClick={() => train(n)}
                                        className="py-2 bg-cyber-card border border-cyber-border hover:border-cyber-accent text-white font-bold rounded transition-all active:scale-95 text-sm"
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={clearGrid}
                                className="w-full py-2 mt-2 bg-red-900/20 border border-red-500/50 text-red-500 hover:bg-red-600 hover:text-white rounded transition-all font-bold text-xs uppercase"
                            >
                                Canvas Löschen
                            </button>
                        </div>
                    </div>

                    {/* CENTER: NETWORK DIAGRAM (Only visible on large screens or stacked) */}
                    <div className="hidden xl:flex flex-col items-center justify-center pt-8">
                        <NetworkDiagram inputActive={inputGrid.some(v => v === 1)} prediction={prediction} />
                        <p className="text-[10px] text-gray-500 font-mono mt-4 text-center max-w-[200px]">
                            Visuelle Simulation der Schichten. In echt passieren hier 13.002 Berechnungen.
                        </p>
                    </div>

                    {/* RIGHT: WEIGHTS */}
                    <div className="flex flex-col items-center space-y-6 w-full max-w-[320px]">
                        <div className="w-full flex justify-between items-center mb-2">
                            <span className="text-xs font-mono text-cyber-accent uppercase tracking-widest">Brain: Gewichte für "{currentlyViewing}"</span>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-cyber-accent"></span>
                                    <span className="text-[8px] text-gray-500 font-mono uppercase">Positiv</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                                    <span className="text-[8px] text-gray-500 font-mono uppercase">Negativ</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-10 grid-rows-10 gap-0 border-4 border-cyber-border bg-gray-950 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            {weights[currentlyViewing].map((w, i) => (
                                <div
                                    key={`weight-${i}`}
                                    style={{ backgroundColor: getHeatmapColor(w, maxAbsWeight) }}
                                    className="w-7 h-7 md:w-8 md:h-8 border-[0.5px] border-white/5 transition-colors duration-300"
                                />
                            ))}
                        </div>

                        <p className="text-gray-500 text-xs italic text-center max-w-xs leading-relaxed">
                            Die hellen Cyan-Bereiche zeigen an, wo das Perzeptron eine Zeichnung <span className="text-cyber-accent font-bold">erwartet</span>. Pinke Bereiche führen zu einer <span className="text-pink-500 font-bold">Abwertung</span>.
                        </p>

                        <div className="w-full">
                            <div className="text-[10px] text-center text-gray-500 font-mono uppercase tracking-tighter mb-3">Gewichte untersuchen für...</div>
                            <div className="grid grid-cols-5 gap-2">
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                                    <button
                                        key={`view-${n}`}
                                        onClick={() => setCurrentlyViewing(n)}
                                        className={`py-1.5 font-bold rounded transition-all text-xs ${currentlyViewing === n ? 'bg-cyber-accent text-black shadow-[0_0_10px_rgba(0,242,255,0.5)]' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
