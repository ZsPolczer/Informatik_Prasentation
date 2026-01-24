import React, { ReactNode } from 'react';

export const Glossary: React.FC = () => {
  return (
    <aside className="hidden lg:block w-[300px] h-screen sticky top-0 border-l border-cyber-border/50 bg-[#090c10]/80 backdrop-blur-md p-6 overflow-y-auto z-20">
      <h3 className="text-lg font-mono font-bold text-cyber-accent mb-6 border-b border-cyber-border/50 pb-2 tracking-widest uppercase flex items-center gap-2">
        <span className="w-2 h-2 bg-cyber-accent rounded-full animate-pulse"></span>
        Wissensdatenbank
      </h3>
      
      <div className="space-y-6">
        <GlossaryItem 
          title="Temperature (τ)" 
          content={
            <>
              Ein Parameter, der die <span className="text-cyber-accent font-bold">Wahrscheinlichkeitsverteilung</span> beeinflusst. Hohe Werte erhöhen die Entropie (Chaos), niedrige Werte erzwingen Determinismus.
            </>
          } 
        />
        <GlossaryItem 
          title="Neural Weights" 
          content={
            <>
              Die <span className="text-cyber-accent font-bold">Stärke der Verbindung</span> zwischen zwei Neuronen. Das "Wissen" der KI ist in diesen Zahlen als Matrix gespeichert.
            </>
          } 
        />
        <GlossaryItem 
          title="Trainingszyklus" 
          content={
            <>
              Ein kompletter <span className="text-cyber-accent font-bold">Trainingsdurchlauf</span> durch den gesamten Datensatz (auch "Epoche" genannt). Modelle brauchen oft Tausende davon.
            </>
          } 
        />
        <GlossaryItem 
          title="Backpropagation" 
          content={
            <>
              Der Lernalgorithmus: Der <span className="text-cyber-accent font-bold">Fehler</span> wird rückwärts durch das Netz geleitet, um die Gewichte anzupassen.
            </>
          } 
        />
      </div>
    </aside>
  );
};

// Helper component for cleaner code
const GlossaryItem: React.FC<{title: string, content: ReactNode}> = ({ title, content }) => (
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