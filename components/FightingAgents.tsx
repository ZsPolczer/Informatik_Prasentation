import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

class Agent {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  energy: number;
  maxSpeed: number;
  id: number;

  constructor(x: number, y: number, id: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.radius = 4;
    this.energy = 100;
    this.maxSpeed = 2;
    this.id = id;
  }

  update(width: number, height: number, food: Point[]) {
    // 1. Find nearest food
    let nearestFood: Point | null = null;
    let minDist = Infinity;

    for (const f of food) {
      const d = Math.hypot(f.x - this.x, f.y - this.y);
      if (d < minDist) {
        minDist = d;
        nearestFood = f;
      }
    }

    // 2. Steer towards food or wander
    if (nearestFood && minDist < 150) {
      const angle = Math.atan2(nearestFood.y - this.y, nearestFood.x - this.x);
      this.vx += Math.cos(angle) * 0.2;
      this.vy += Math.sin(angle) * 0.2;
    } else {
      // Random wandering
      this.vx += (Math.random() - 0.5) * 0.5;
      this.vy += (Math.random() - 0.5) * 0.5;
    }

    // 3. Limit speed
    const speed = Math.hypot(this.vx, this.vy);
    if (speed > this.maxSpeed) {
      this.vx = (this.vx / speed) * this.maxSpeed;
      this.vy = (this.vy / speed) * this.maxSpeed;
    }

    // 4. Move
    this.x += this.vx;
    this.y += this.vy;

    // 5. Bounce off walls
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // 6. Keep in bounds
    this.x = Math.max(0, Math.min(width, this.x));
    this.y = Math.max(0, Math.min(height, this.y));

    // 7. Lose energy
    this.energy -= 0.2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // Color depends on energy (Green -> Red)
    const opacity = Math.max(0.2, this.energy / 100);
    ctx.fillStyle = `rgba(0, 242, 255, ${opacity})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00f2ff';
    ctx.fill();
    ctx.closePath();
  }
}

export const FightingAgents: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [agentCount, setAgentCount] = useState(0);
  
  // Refs for simulation state to avoid re-renders during animation loop
  const agentsRef = useRef<Agent[]>([]);
  const foodRef = useRef<Point[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initial Setup
    const initSimulation = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = 400;
      
      // Spawn Agents
      agentsRef.current = Array.from({ length: 15 }, (_, i) => 
        new Agent(Math.random() * canvas.width, Math.random() * canvas.height, i)
      );

      // Spawn Food
      foodRef.current = Array.from({ length: 20 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
      }));
    };

    initSimulation();

    const loop = () => {
      // Clear Screen with trail effect
      ctx.fillStyle = 'rgba(13, 17, 23, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update & Draw Food
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ff0055';
      foodRef.current.forEach(f => {
        ctx.beginPath();
        ctx.arc(f.x, f.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update & Draw Agents
      for (let i = agentsRef.current.length - 1; i >= 0; i--) {
        const agent = agentsRef.current[i];
        agent.update(canvas.width, canvas.height, foodRef.current);
        agent.draw(ctx);

        // Eat Food
        for (let j = foodRef.current.length - 1; j >= 0; j--) {
          const f = foodRef.current[j];
          const dist = Math.hypot(agent.x - f.x, agent.y - f.y);
          if (dist < 10) {
            agent.energy = Math.min(100, agent.energy + 30);
            foodRef.current.splice(j, 1);
            // Respawn food randomly
            if (Math.random() > 0.5) {
                foodRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height
                });
            }
          }
        }

        // Death logic
        if (agent.energy <= 0) {
          agentsRef.current.splice(i, 1);
        }
      }

      // Randomly spawn food over time
      if (Math.random() < 0.05) {
        foodRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height
        });
      }

      setAgentCount(agentsRef.current.length);
      frameRef.current = requestAnimationFrame(loop);
    };

    loop();

    const handleResize = () => {
        canvas.width = canvas.parentElement?.clientWidth || 600;
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleReset = () => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    agentsRef.current = Array.from({ length: 15 }, (_, i) => 
        new Agent(Math.random() * canvas.width, Math.random() * canvas.height, i)
    );
    foodRef.current = Array.from({ length: 20 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
    }));
  };

  return (
    <div className="bg-[#0d1219] border border-cyber-border rounded-xl p-6 shadow-2xl relative overflow-hidden group">
        <div className="flex justify-between items-center mb-4 relative z-10">
            <div>
                <h2 className="text-2xl text-white font-bold flex items-center gap-2">
                    <span className="text-cyber-accent">⚡</span> Fighting Agents
                </h2>
                <p className="text-xs text-gray-400 font-mono mt-1">
                    Simulation: Agents (Blau) suchen Nahrung (Rot) um zu überleben.
                </p>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <span className="block text-[10px] text-gray-500 font-mono uppercase">Population</span>
                    <span className="text-xl font-bold text-cyber-accent font-mono">{agentCount}</span>
                </div>
                <button 
                    onClick={handleReset}
                    className="px-4 py-2 bg-cyber-card border border-cyber-border hover:border-cyber-accent text-white rounded transition-colors text-sm uppercase font-bold tracking-wider"
                >
                    Reset
                </button>
            </div>
        </div>
        
        <div className="relative rounded-lg overflow-hidden border border-cyber-border/50 bg-black aspect-video">
            <canvas ref={canvasRef} className="w-full h-full block" />
            
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        </div>
    </div>
  );
};
