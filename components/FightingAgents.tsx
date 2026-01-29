import React, { useEffect, useRef, useState } from 'react';

// --- CONFIG & CONSTANTS ---
const ARENA_WIDTH = 800;
const ARENA_HEIGHT = 500;
const AGENT_RADIUS = 12;
const BULLET_SPEED = 9; // Fast bullets
const AGENT_SPEED = 3.5; // Fast agents
const COOLDOWN = 15; // Rapid fire
const MAX_FRAMES_PER_ROUND = 900; // ~15 seconds

// --- GEOMETRY TYPES ---
interface Bullet { x: number; y: number; vx: number; vy: number; owner: 'NN' | 'BOT'; id: number; }
interface Obstacle { x: number; y: number; w: number; h: number; }

// --- SIMPLE CRUDE NEURAL NETWORK ---
const INPUT_SIZE = 8; // Added Cooldown
const HIDDEN_SIZE = 12; // Increased brain power
const OUTPUT_SIZE = 3; // Turn, Move, Shoot

class SimpleNN {
  weights1: number[][]; // Input -> Hidden
  bias1: number[];
  weights2: number[][]; // Hidden -> Output
  bias2: number[];

  constructor(copyFrom?: SimpleNN) {
    if (copyFrom) {
      this.weights1 = copyFrom.weights1.map(row => [...row]);
      this.bias1 = [...copyFrom.bias1];
      this.weights2 = copyFrom.weights2.map(row => [...row]);
      this.bias2 = [...copyFrom.bias2];
    } else {
      // Init random weights
      this.weights1 = Array(INPUT_SIZE).fill(0).map(() => Array(HIDDEN_SIZE).fill(0).map(() => Math.random() * 2 - 1));
      this.bias1 = Array(HIDDEN_SIZE).fill(0).map(() => Math.random() * 2 - 1);
      this.weights2 = Array(HIDDEN_SIZE).fill(0).map(() => Array(OUTPUT_SIZE).fill(0).map(() => Math.random() * 2 - 1));
      this.bias2 = Array(OUTPUT_SIZE).fill(0).map((_, i) => {
        if (i === 2) return Math.random() * 1.5 + 0.5; // Bias SHOOT (index 2) to be positive (0.5 to 2.0)
        return Math.random() * 2 - 1;
      });
    }
  }

  mutate(rate: number) {
    const mutateVal = (v: number) => {
      if (Math.random() < rate) return v + (Math.random() * 2 - 1) * 0.5; // Small tweak
      if (Math.random() < 0.005) return Math.random() * 2 - 1; // Rare total reset
      return v;
    };
    this.weights1 = this.weights1.map(row => row.map(mutateVal));
    this.bias1 = this.bias1.map(mutateVal);
    this.weights2 = this.weights2.map(row => row.map(mutateVal));
    this.bias2 = this.bias2.map(mutateVal);
  }

  predict(inputs: number[]): number[] {
    // Layer 1
    const hidden = this.bias1.map((b, i) => {
      let sum = b;
      for (let j = 0; j < INPUT_SIZE; j++) sum += inputs[j] * this.weights1[j][i];
      return Math.tanh(sum);
    });

    // Layer 2
    const output = this.bias2.map((b, i) => {
      let sum = b;
      for (let j = 0; j < HIDDEN_SIZE; j++) sum += hidden[j] * this.weights2[j][i];
      return Math.tanh(sum); // Output -1 to 1
    });

    return output;
  }
}

// --- GAME STATE ---
interface GameState {
  nnAgent: { x: number, y: number, angle: number, hp: number, cooldown: number, brain: SimpleNN };
  botAgent: { x: number, y: number, angle: number, hp: number, cooldown: number, reactionTimer: number };
  bullets: Bullet[];
  obstacles: Obstacle[];
  frame: number;
  bestBrain: SimpleNN;
  currentScore: number;
  generation: number;
  bestScore: number;
  nnWins: number;
  botWins: number;
}


// --- COMPONENT ---
export const FightingAgents: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // UI Controls
  const [mutationRate, setMutationRate] = useState(0.1);
  const [simGenerations, setSimGenerations] = useState(50);
  const [isSimulating, setIsSimulating] = useState(false);
  const [displayGen, setDisplayGen] = useState(1);
  const [displayScore, setDisplayScore] = useState(0);

  // Mutable Game State
  const state = useRef<GameState>({
    nnAgent: { x: 50, y: 50, angle: 0, hp: 100, cooldown: 0, brain: new SimpleNN() },
    botAgent: { x: 750, y: 450, angle: Math.PI, hp: 100, cooldown: 0, reactionTimer: 0 },
    bullets: [],
    obstacles: [
      { x: 300, y: 150, w: 200, h: 20 },
      { x: 300, y: 330, w: 200, h: 20 },
      { x: 150, y: 200, w: 20, h: 100 },
      { x: 630, y: 200, w: 20, h: 100 }
    ],
    frame: 0,
    bestBrain: new SimpleNN(),
    currentScore: 0,
    generation: 1,
    bestScore: -Infinity,
    nnWins: 0,
    botWins: 0
  });

  const requestRef = useRef<number>(0);

  // --- PHYSICS ENGINE ---
  const checkCol = (x: number, y: number, r: number, rects: Obstacle[]) => {
    if (x < r || x > ARENA_WIDTH - r || y < r || y > ARENA_HEIGHT - r) return true;
    return rects.some(o => x > o.x - r && x < o.x + o.w + r && y > o.y - r && y < o.y + o.h + r);
  };

  const updatePhysics = (s: GameState, fastMode: boolean) => {
    s.frame++;

    // 1. SENSORS
    const dx = s.botAgent.x - s.nnAgent.x;
    const dy = s.botAgent.y - s.nnAgent.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angleToEnemy = Math.atan2(dy, dx);
    let relAngle = angleToEnemy - s.nnAgent.angle;
    while (relAngle > Math.PI) relAngle -= Math.PI * 2;
    while (relAngle < -Math.PI) relAngle += Math.PI * 2;

    // Raycast LOS
    let los = 1;
    for (let i = 1; i <= 5; i++) {
      if (checkCol(s.nnAgent.x + dx * (i / 5), s.nnAgent.y + dy * (i / 5), 2, s.obstacles)) { los = 0; break; }
    }

    // Wall Sensors (Raycasting)
    const castRay = (angOffset: number) => {
      const rayLen = 150; // Increased range (was 40)
      const steps = 10;
      const ax = Math.cos(s.nnAgent.angle + angOffset);
      const ay = Math.sin(s.nnAgent.angle + angOffset);

      for (let i = 1; i <= steps; i++) {
        const dist = (i / steps) * rayLen;
        const cx = s.nnAgent.x + ax * dist;
        const cy = s.nnAgent.y + ay * dist;
        if (checkCol(cx, cy, 5, s.obstacles)) { // Check a bit smaller radius for ray
          return 1.0 - (i / steps); // 1.0 = TOUCHING, 0.0 = FAR
        }
      }
      return 0.0;
    };

    const inputs = [
      relAngle / Math.PI,    // 0: Angle to enemy (-1 to 1)
      dist / ARENA_WIDTH,    // 1: Distance relative to arena width
      los,                   // 2: Can I see enemy? (0 or 1)
      castRay(0),            // 3: Wall Forward (Analog)
      castRay(-0.5),         // 4: Wall Left (Analog)
      castRay(0.5),          // 5: Wall Right (Analog)
      s.nnAgent.cooldown / COOLDOWN, // 6: My Cooldown (0 to 1)
      1                      // 7: Bias
    ];

    const [turn, move, shoot] = s.nnAgent.brain.predict(inputs);

    // 2. NN ACTIONS
    s.nnAgent.angle += turn * 0.15; // Limit turn speed

    // REWARD/PUNISHMENT LOGIC

    // Penalize spinning endlessly (if turn is consistently high)
    if (Math.abs(turn) > 0.8) s.currentScore -= 0.5; // Increased penalty

    // Reward facing the enemy (Aiming)
    if (Math.abs(relAngle) < 0.2 && los === 1) {
      s.currentScore += 0.2; // Continuous reward for good aim
    }

    // Move
    let speed = 0;
    if (move > 0) speed = AGENT_SPEED; // Forward on positive
    else if (move < -0.2) speed = -AGENT_SPEED * 0.5; // Backward on strong negative

    if (Math.abs(speed) > 0) {
      const nextX = s.nnAgent.x + Math.cos(s.nnAgent.angle) * speed;
      const nextY = s.nnAgent.y + Math.sin(s.nnAgent.angle) * speed;

      if (!checkCol(nextX, nextY, AGENT_RADIUS, s.obstacles)) {
        s.nnAgent.x = nextX;
        s.nnAgent.y = nextY;
        s.currentScore += 0.05; // Reward movement
      } else {
        s.currentScore -= 1.0; // HEAVY penalty for hitting wall
      }
    } else {
      s.currentScore -= 0.01; // Tiny penalty for standing still
    }

    // Shoot
    if (shoot > 0.0 && s.nnAgent.cooldown <= 0) {
      s.bullets.push({
        x: s.nnAgent.x + Math.cos(s.nnAgent.angle) * 20,
        y: s.nnAgent.y + Math.sin(s.nnAgent.angle) * 20,
        vx: Math.cos(s.nnAgent.angle) * BULLET_SPEED,
        vy: Math.sin(s.nnAgent.angle) * BULLET_SPEED,
        owner: 'NN',
        id: Math.random()
      });
      s.nnAgent.cooldown = COOLDOWN;

      // REWARD: Shooting when looking/aiming at enemy is good
      if (Math.abs(relAngle) < 0.3 && los === 1) {
        s.currentScore += 15; // Increased reward for good shot
      } else {
        s.currentScore -= 2; // Penalty for wasting ammo / undefined shooting
      }
    }
    if (s.nnAgent.cooldown > 0) s.nnAgent.cooldown--;


    // 3. BOT LOGIC
    const bDx = s.nnAgent.x - s.botAgent.x;
    const bDy = s.nnAgent.y - s.botAgent.y;
    const bDist = Math.sqrt(bDx * bDx + bDy * bDy);
    const bAngle = Math.atan2(bDy, bDx);
    let bRelAngle = bAngle - s.botAgent.angle;
    while (bRelAngle > Math.PI) bRelAngle -= Math.PI * 2;
    while (bRelAngle < -Math.PI) bRelAngle += Math.PI * 2;

    s.botAgent.angle += bRelAngle * 0.1;

    let bSpeed = 0;
    if (bDist > 300) bSpeed = AGENT_SPEED * 0.6; // Chase slowly
    else if (bDist < 100) bSpeed = -AGENT_SPEED * 0.5; // Back up

    if (Math.abs(bSpeed) > 0.1) {
      const nx = s.botAgent.x + Math.cos(s.botAgent.angle) * bSpeed;
      const ny = s.botAgent.y + Math.sin(s.botAgent.angle) * bSpeed;
      if (!checkCol(nx, ny, AGENT_RADIUS, s.obstacles)) { s.botAgent.x = nx; s.botAgent.y = ny; }
    }

    if (Math.abs(bRelAngle) < 0.3 && s.botAgent.cooldown <= 0 && bDist < 450) {
      let clearShot = true;
      for (let i = 1; i < 5; i++) { if (checkCol(s.botAgent.x + bDx * (i / 5), s.botAgent.y + bDy * (i / 5), 2, s.obstacles)) clearShot = false; }

      if (clearShot) {
        // If seeing enemy for first time, set reaction delay
        if (s.botAgent.reactionTimer === 0) {
          s.botAgent.reactionTimer = Math.floor(Math.random() * 6) + 6; // 6-12 frames (~100-200ms)
        } else {
          s.botAgent.reactionTimer--;

          // Ready to fire?
          if (s.botAgent.reactionTimer <= 1) {
            s.bullets.push({
              x: s.botAgent.x + Math.cos(s.botAgent.angle) * 20,
              y: s.botAgent.y + Math.sin(s.botAgent.angle) * 20,
              vx: Math.cos(s.botAgent.angle) * BULLET_SPEED,
              vy: Math.sin(s.botAgent.angle) * BULLET_SPEED,
              owner: 'BOT',
              id: Math.random()
            });
            s.botAgent.cooldown = COOLDOWN * 1.5;
            s.botAgent.reactionTimer = 0; // Reset
          }
        }
      } else {
        s.botAgent.reactionTimer = 0; // Lost LoS, reset timer
      }
    } else {
      s.botAgent.reactionTimer = 0; // Not aiming/in range, reset timer
    }
    if (s.botAgent.cooldown > 0) s.botAgent.cooldown--;

    // 4. BULLETS & HITS
    for (let i = s.bullets.length - 1; i >= 0; i--) {
      const b = s.bullets[i];
      b.x += b.vx;
      b.y += b.vy;

      if (b.x < 0 || b.x > ARENA_WIDTH || b.y < 0 || b.y > ARENA_HEIGHT) { s.bullets.splice(i, 1); continue; }
      if (s.obstacles.some(o => b.x > o.x && b.x < o.x + o.w && b.y > o.y && b.y < o.y + o.h)) { s.bullets.splice(i, 1); continue; }

      const hitNN = (b.owner === 'BOT') && Math.hypot(b.x - s.nnAgent.x, b.y - s.nnAgent.y) < AGENT_RADIUS + 5;
      const hitBot = (b.owner === 'NN') && Math.hypot(b.x - s.botAgent.x, b.y - s.botAgent.y) < AGENT_RADIUS + 5;

      if (hitNN) {
        s.nnAgent.hp -= 20;
        s.currentScore -= 150; // Big Punishment
        s.bullets.splice(i, 1);
      } else if (hitBot) {
        s.botAgent.hp -= 20;
        s.currentScore += 300; // HUGE Reward
        s.bullets.splice(i, 1);
      }
    }

    // 5. ROUND END
    let roundOver = false;
    let success = false;

    if (s.nnAgent.hp <= 0) { roundOver = true; success = false; s.botWins++; }
    else if (s.botAgent.hp <= 0) { roundOver = true; success = true; s.nnWins++; s.currentScore += 1000; }
    else if (s.frame > MAX_FRAMES_PER_ROUND) {
      roundOver = true;
      success = false;
      s.currentScore -= 500; // PENATLY FOR TIMEOUT to discourage hiding
    }

    if (roundOver) {
      // Did we do better?
      if (success || s.currentScore > s.bestScore) {
        s.bestScore = s.currentScore;
        s.bestBrain = new SimpleNN(s.nnAgent.brain); // Save
      }

      // Reset
      s.nnAgent.x = 80; s.nnAgent.y = 80; s.nnAgent.angle = 0; s.nnAgent.hp = 100; s.nnAgent.cooldown = 0;
      s.botAgent.x = ARENA_WIDTH - 80; s.botAgent.y = ARENA_HEIGHT - 80; s.botAgent.angle = Math.PI; s.botAgent.hp = 100; s.botAgent.cooldown = 0; s.botAgent.reactionTimer = 0;
      s.bullets = [];
      s.frame = 0;
      s.currentScore = 0;
      s.generation++;

      // New Brain from Best Brain + Mutation
      s.nnAgent.brain = new SimpleNN(s.bestBrain);
      s.nnAgent.brain.mutate(paramsRef.current.mutationRate); // Use REF for latest rate
    }

    return roundOver;
  };

  const handleSimulate = async () => {
    setIsSimulating(true);
    // Allow UI to update
    setTimeout(() => {
      const s = state.current;
      const target = s.generation + simGenerations;
      const startT = performance.now();

      // Simulation Loop
      while (s.generation < target) {
        const roundResult = updatePhysics(s, true);
        // If stuck in a round too long, break round
        if (s.frame > MAX_FRAMES_PER_ROUND + 10) {
          // Force round end
          s.frame = MAX_FRAMES_PER_ROUND + 1;
          updatePhysics(s, true);
        }
        if (performance.now() - startT > 2000) break; // Safety
      }

      setDisplayGen(s.generation);
      setDisplayScore(Math.floor(s.bestScore));
      setIsSimulating(false);
    }, 50);
  };

  // --- MAIN LOOP ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = ARENA_WIDTH;
    canvas.height = ARENA_HEIGHT;

    const render = () => {
      updatePhysics(state.current, false);

      // Clear
      ctx.fillStyle = '#0d1219'; ctx.fillRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT);
      // Grid
      ctx.strokeStyle = '#1e2530'; ctx.beginPath();
      for (let x = 0; x < ARENA_WIDTH; x += 40) { ctx.moveTo(x, 0); ctx.lineTo(x, ARENA_HEIGHT); }
      for (let y = 0; y < ARENA_HEIGHT; y += 40) { ctx.moveTo(0, y); ctx.lineTo(ARENA_WIDTH, y); }
      ctx.stroke();

      const s = state.current;

      // Obstacles
      ctx.fillStyle = '#161b22'; ctx.strokeStyle = '#00f2ff';
      s.obstacles.forEach(o => { ctx.fillRect(o.x, o.y, o.w, o.h); ctx.strokeRect(o.x, o.y, o.w, o.h); });

      // NN Agent
      ctx.save(); ctx.translate(s.nnAgent.x, s.nnAgent.y); ctx.rotate(s.nnAgent.angle);
      ctx.fillStyle = '#00f2ff'; ctx.beginPath(); ctx.arc(0, 0, AGENT_RADIUS, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.fillRect(0, -2, 20, 4);
      ctx.restore();
      ctx.fillStyle = '#0f0'; ctx.fillRect(s.nnAgent.x - 15, s.nnAgent.y - 25, 30 * (Math.max(0, s.nnAgent.hp) / 100), 4);

      // Bot Agent
      ctx.save(); ctx.translate(s.botAgent.x, s.botAgent.y); ctx.rotate(s.botAgent.angle);
      ctx.fillStyle = '#ff0055'; ctx.beginPath(); ctx.arc(0, 0, AGENT_RADIUS, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.fillRect(0, -2, 20, 4);
      ctx.restore();
      ctx.fillStyle = '#0f0'; ctx.fillRect(s.botAgent.x - 15, s.botAgent.y - 25, 30 * (Math.max(0, s.botAgent.hp) / 100), 4);

      // Bullets
      s.bullets.forEach(b => {
        ctx.fillStyle = b.owner === 'NN' ? '#00f2ff' : '#ff0055';
        ctx.beginPath(); ctx.arc(b.x, b.y, 4, 0, Math.PI * 2); ctx.fill();
      });

      if (isSimulating) { // This wont update correctly due to closure unless we check ref
        // handled by overlay below
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Only mount once.


  // We need a wrapper to ensure `updatePhysics` gets the latest Mutation Rate
  // We'll use a Ref to sync the UI setting to the Game Loop
  const paramsRef = useRef({ mutationRate: 0.1 });
  useEffect(() => { paramsRef.current.mutationRate = mutationRate; }, [mutationRate]);

  return (
    <div className="bg-[#0d1219] border border-cyber-border rounded-xl p-6 shadow-2xl relative overflow-hidden group">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 relative z-10 gap-6">
        <div>
          <h2 className="text-2xl text-white font-bold flex items-center gap-2">
            <span className="text-cyber-accent">⚡</span> 1v1 Evolution Arena
          </h2>
          <div className="flex gap-4 mt-2 text-xs font-mono">
            <span className="text-cyber-accent flex items-center gap-1">AI (Cyan)</span>
            <span className="text-[#ff0055] flex items-center gap-1">Bot (Red)</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="bg-black/40 p-2 rounded border border-cyber-border/30 flex items-center gap-3">
            <div className="flex flex-col">
              <label className="text-[10px] text-gray-400 uppercase font-mono">Mutation Rate</label>
              <div className="flex items-center gap-2">
                <input
                  type="range" min="0.01" max="1.0" step="0.01"
                  value={mutationRate}
                  onChange={(e) => setMutationRate(parseFloat(e.target.value))}
                  className="w-24 accent-cyber-accent h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-cyber-accent font-mono w-8">{(mutationRate * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          <div className="bg-black/40 p-2 rounded border border-cyber-border/30 flex items-center gap-2">
            <div className="flex flex-col">
              <label className="text-[10px] text-gray-400 uppercase font-mono">Train Speed</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={simGenerations}
                  onChange={(e) => setSimGenerations(parseInt(e.target.value))}
                  className="w-16 bg-black border border-gray-700 rounded text-white text-xs px-2 py-1 font-mono focus:border-cyber-accent outline-none"
                />
                <button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="px-3 py-1 bg-cyber-accent/20 border border-cyber-accent text-cyber-accent hover:bg-cyber-accent hover:text-black text-xs uppercase font-bold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSimulating ? '...' : 'Simulieren'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HUD */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-black/40 p-2 rounded border border-gray-800 text-center">
          <div className="text-[9px] text-gray-500 uppercase font-mono">Generation</div>
          <div className="text-xl text-white font-mono font-bold animate-pulse">{displayGen}</div>
        </div>
        <div className="bg-black/40 p-2 rounded border border-gray-800 text-center">
          <div className="text-[9px] text-gray-500 uppercase font-mono">High Score</div>
          <div className="text-xl text-yellow-400 font-mono font-bold">{displayScore.toFixed(0)}</div>
        </div>
        <div className="bg-black/40 p-2 rounded border border-gray-800 text-center">
          <div className="text-[9px] text-gray-500 uppercase font-mono">Bot Wins</div>
          <div className="text-xl text-[#ff0055] font-mono font-bold">{state.current.botWins}</div>
        </div>
        <div className="bg-black/40 p-2 rounded border border-cyber-border/50 text-center">
          <div className="text-[9px] text-gray-500 uppercase font-mono">AI Wins</div>
          <div className="text-xl text-cyber-accent font-mono font-bold">{state.current.nnWins}</div>
        </div>
      </div>

      <div className="relative rounded-lg overflow-hidden border border-cyber-border/50 bg-black aspect-video w-full group-hover:border-cyber-accent/50 transition-colors">
        <canvas ref={canvasRef} className="w-full h-full block object-contain" />

        {isSimulating && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-20">
            <div className="w-12 h-12 border-4 border-cyber-accent border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-cyber-accent font-mono font-bold text-lg animate-pulse">TRAINING IN PROGRESS...</div>
            <div className="text-gray-400 text-xs mt-2">Simulating {simGenerations} generations in background</div>
          </div>
        )}
      </div>
    </div>
  );
};
