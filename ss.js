// steps_score.js
// ONE-FILE Steps Score calculator (Node.js, без імпортів)

// --- Налаштування (міняй під свій день) ----------------------------
const TODAY_STEPS = 624; // x — сьогоднішні кроки
// 7-денна історія кроків від НАЙСТАРІШОГО до НАЙНОВІШОГО дня:
const PAST7 = [3719, 9077, 6028, 2446, 6193, 5852, 624];

// Параметри формули:
const SIGMA = 2000;      // σ — допустиме відхилення
const DEFAULT_MU = 8000; // дефолтний baseline μ, коли 7-денних даних замало/недостатньо
// ---------------------------------------------------------------

// Формула SS:
// if x >= μ → SS = 100
// else SS = 100 * exp(-((μ - x)^2) / (2 * σ^2))
// Baseline μ: зважене середнє за 7 днів із вагами [1,1,1,1,2,2,3]/11,
// але активуємо його лише якщо sum(steps7) > μ_candidate * 5, інакше μ = DEFAULT_MU.

function weightedBaseline7(past7) {
  if (!Array.isArray(past7) || past7.length !== 7) return null;
  const weights = [1, 1, 1, 1, 2, 2, 3]; // oldest → newest
  const wsum = 11;
  let acc = 0;
  for (let i = 0; i < 7; i++) acc += (Number(past7[i]) || 0) * weights[i];
  return acc / wsum;
}

function chooseBaseline(past7, muDefault = 8000) {
  const muCandidate = weightedBaseline7(past7);
  if (!Number.isFinite(muCandidate) || muCandidate <= 0) return muDefault;

  const weekSum = past7.reduce((s, v) => s + (Number(v) || 0), 0);
  // правило активації baseline:
  if (weekSum > muCandidate * 5) return muCandidate;
  return muDefault;
}

function stepsScore({ x, past7, sigma = 2000, muDefault = 8000 }) {
  const today = Number(x) || 0;
  const mu = chooseBaseline(past7, muDefault);

  if (today >= mu) return { score: 100, mu, sigma };

  const diff = mu - today;
  const val = 100 * Math.exp(-((diff ** 2) / (2 * sigma ** 2)));
  return { score: Number(val.toFixed(2)), mu, sigma };
}

// ==== Запуск обчислення з твоїми даними ====
const { score, mu, sigma } = stepsScore({
  x: TODAY_STEPS,
  past7: PAST7,
  sigma: SIGMA,
  muDefault: DEFAULT_MU
});

console.log("---- Steps Score ----");
// console.log("Today (x):", TODAY_STEPS);
// console.log("Past 7 days (oldest → newest):", PAST7.join(", "));
console.log("Baseline (μ) used:", Number(mu.toFixed ? mu.toFixed(2) : mu));
// console.log("Sigma (σ):", sigma);
console.log("Steps Score (SS):", score);
