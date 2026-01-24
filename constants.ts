// Words and their "base scores" (representing unnormalized logits)
// High score = matches the context "Es war einmal..." better
export const WORD_DATA = [
  { word: "eine Prinzessin", baseScore: 10 },
  { word: "ein Ritter", baseScore: 9 },
  { word: "ein Schloss", baseScore: 8 },
  { word: "ein Drache", baseScore: 7 },
  { word: "ein Frosch", baseScore: 5 },
  { word: "ein KI-Modell", baseScore: 3 },
  { word: "eine GPU", baseScore: 2 },
  { word: "ein Toaster", baseScore: 1 },
];

export const COLORS = {
  bg: '#0d1117',
  card: '#161b22',
  accent: '#00f2ff',
  text: '#c9d1d9',
  border: '#30363d',
};

export interface WordProbability {
  word: string;
  probability: number;
}

/**
 * Calculates the Softmax probability distribution for the words based on temperature.
 * P_i = exp(score_i / T) / sum(exp(score_j / T))
 */
export const getProbabilities = (temp: number): WordProbability[] => {
  // Prevent division by zero, though slider minimum is usually 0.1
  const t = Math.max(temp, 0.1);

  // We multiply the raw temperature by a factor to make the slider's range (0.1 - 5.0)
  // cover a wider spectrum of entropy. 
  // A factor of 4.0 ensures that at T=5.0, the distribution is nearly flat (random).
  const entropyScale = 4.0;
  const effectiveT = t * entropyScale;

  // 1. Calculate exponentials
  const exps = WORD_DATA.map(item => ({
    word: item.word,
    exp: Math.exp(item.baseScore / effectiveT)
  }));

  // 2. Sum of exponentials
  const sumExps = exps.reduce((sum, item) => sum + item.exp, 0);

  // 3. Normalize to get probabilities
  const probs = exps.map(item => ({
    word: item.word,
    probability: item.exp / sumExps
  }));

  // 4. Sort descending by probability
  return probs.sort((a, b) => b.probability - a.probability);
};

/**
 * Samples a word based on the calculated probabilities
 */
export const sampleWord = (probs: WordProbability[]): string => {
  const r = Math.random();
  let cumulative = 0;
  for (const p of probs) {
    cumulative += p.probability;
    if (r <= cumulative) {
      return p.word;
    }
  }
  // Fallback (should rarely happen due to float precision)
  return probs[probs.length - 1].word;
};

// Legacy support wrapper if needed, but we will use getProbabilities in the component
export const generateWordByTemperature = (temp: number): string => {
  const probs = getProbabilities(temp);
  return sampleWord(probs);
};