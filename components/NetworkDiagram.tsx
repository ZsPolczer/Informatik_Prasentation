import React, { useEffect, useState } from 'react';

interface NetworkDiagramProps {
    inputActive: boolean; // True if user is drawing
    prediction: number | null;
}

export const NetworkDiagram: React.FC<NetworkDiagramProps> = ({ inputActive, prediction }) => {
    // --- LAYOUT CONFIG ---
    const width = 600;
    const height = 200;

    // Layer positions (x-coordinates)
    const xInput = 80;
    const xHidden1 = 220;
    const xHidden2 = 360;
    const xOutput = 500;

    // Node Configurations
    const inputNodes = 8;
    const hidden1Nodes = 12;
    const hidden2Nodes = 10;
    const outputNodes = 10;

    // --- HELPERS ---
    const getNodesY = (count: number, h: number) => {
        const spacing = h / (count + 1);
        return Array.from({ length: count }, (_, i) => spacing * (i + 1));
    };

    const yInput = getNodesY(inputNodes, height);
    const yHidden1 = getNodesY(hidden1Nodes, height);
    const yHidden2 = getNodesY(hidden2Nodes, height);
    const yOutput = getNodesY(outputNodes, height);

    // --- ANIMATION STATE ---
    // Simulate "pulses" traveling through layers
    const [activeLayer, setActiveLayer] = useState<number>(0); // 0=None, 1=Input->H1, 2=H1->H2, 3=H2->Out

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (inputActive) {
            interval = setInterval(() => {
                setActiveLayer(prev => (prev === 3 ? 1 : prev + 1));
            }, 150);
        } else {
            setActiveLayer(0);
        }
        return () => clearInterval(interval);
    }, [inputActive]);

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-cyber-card/20 rounded-xl border border-cyber-border/30 backdrop-blur-sm">
            <h4 className="text-cyber-accent font-mono text-xs uppercase tracking-widest mb-2">Neural Network IO</h4>

            <svg width={width} height={height} className="overflow-visible">
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* --- CONNECTIONS (Input -> Hidden1) --- */}
                {yInput.map((y1, i) =>
                    yHidden1.map((y2, j) => (
                        <line
                            key={`c1-${i}-${j}`}
                            x1={xInput} y1={y1} x2={xHidden1} y2={y2}
                            stroke={activeLayer === 1 && Math.random() > 0.7 ? "#00f2ff" : "#1a2333"}
                            strokeWidth={activeLayer === 1 ? 1.5 : 0.5}
                            strokeOpacity={activeLayer === 1 ? 0.6 : 0.3}
                        />
                    ))
                )}

                {/* --- CONNECTIONS (Hidden1 -> Hidden2) --- */}
                {yHidden1.map((y1, i) =>
                    yHidden2.map((y2, j) => (
                        <line
                            key={`c2-${i}-${j}`}
                            x1={xHidden1} y1={y1} x2={xHidden2} y2={y2}
                            stroke={activeLayer === 2 && Math.random() > 0.7 ? "#00f2ff" : "#1a2333"}
                            strokeWidth={activeLayer === 2 ? 1.5 : 0.5}
                            strokeOpacity={activeLayer === 2 ? 0.6 : 0.3}
                        />
                    ))
                )}

                {/* --- CONNECTIONS (Hidden2 -> Output) --- */}
                {yHidden2.map((y1, i) =>
                    yOutput.map((y2, j) => (
                        <line
                            key={`c3-${i}-${j}`}
                            x1={xHidden2} y1={y1} x2={xOutput} y2={y2}
                            stroke={(activeLayer === 3 || prediction === j) && Math.random() > 0.6 ? "#00f2ff" : "#1a2333"}
                            strokeWidth={prediction === j ? 2 : (activeLayer === 3 ? 1.5 : 0.5)}
                            strokeOpacity={(activeLayer === 3 || prediction === j) ? 0.8 : 0.3}
                        />
                    ))
                )}

                {/* --- NODES: INPUT --- */}
                {yInput.map((y, i) => (
                    <circle
                        key={`in-${i}`} cx={xInput} cy={y} r={4}
                        fill={inputActive && Math.random() > 0.5 ? "#fff" : "#374151"}
                        filter={inputActive ? "url(#glow)" : ""}
                    />
                ))}

                {/* --- NODES: HIDDEN 1 --- */}
                {yHidden1.map((y, i) => (
                    <circle
                        key={`h1-${i}`} cx={xHidden1} cy={y} r={3}
                        fill={activeLayer >= 1 && Math.random() > 0.6 ? "#00f2ff" : "#1f2937"}
                        className="transition-colors duration-100"
                    />
                ))}

                {/* --- NODES: HIDDEN 2 --- */}
                {yHidden2.map((y, i) => (
                    <circle
                        key={`h2-${i}`} cx={xHidden2} cy={y} r={3}
                        fill={activeLayer >= 2 && Math.random() > 0.6 ? "#00f2ff" : "#1f2937"}
                        className="transition-colors duration-100"
                    />
                ))}

                {/* --- NODES: OUTPUT --- */}
                {yOutput.map((y, i) => {
                    const isWinner = prediction === i;
                    return (
                        <g key={`out-${i}`}>
                            {/* Label (Number) */}
                            <text
                                x={xOutput + 15} y={y + 4}
                                fill={isWinner ? "#00f2ff" : "#4b5563"}
                                fontSize="12"
                                fontWeight={isWinner ? "bold" : "normal"}
                                fontFamily="monospace"
                            >
                                {i}
                            </text>
                            <circle
                                cx={xOutput} cy={y} r={isWinner ? 6 : 4}
                                fill={isWinner ? "#00f2ff" : "#374151"}
                                filter={isWinner ? "url(#glow)" : ""}
                                className="transition-all duration-300"
                            />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};
