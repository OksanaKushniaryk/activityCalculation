// ===============================
// ACTIVE MINUTES SCORE CALCULATOR
// ===============================

// --- Editable input data ---
// 7-day MVPA (moderate-to-vigorous physical activity) minutes:
const mvpaMinutes = [24, 8, 28, 29, 31, 0, 0]; // m1..m7 (today is the last value)

// Standard deviation tolerance (σₘ):
const sigma_m = 15;

// Minimum recommended by age (adults = 21.4 min/day)
const min_recommended_by_age = 30;

// Weights for 7 days (most recent day has the largest weight)
const weights = [1, 1, 1, 1, 2, 2, 3];

// --- Functions ---

// Weighted 7-day mean (μ_recent)
function weightedRecentMean(values, weights) {
  const num = values.reduce((sum, x, i) => sum + x * weights[i], 0);
  const den = weights.reduce((a, b) => a + b, 0);
  return num / den;
}

// Compute μ_m = max(μ_recent, min_recommended_by_age)
function mu_m(values, weights, minRec) {
  return Math.max(weightedRecentMean(values, weights), minRec);
}

// AMS formula: 100 × exp(-(m - μₘ)² / (2σₘ²))
function computeAMS(m_today, mu_m, sigma_m) {
  const diff = m_today - mu_m;
  const exponent = -Math.pow(diff, 2) / (2 * Math.pow(sigma_m, 2));
  return 100 * Math.exp(exponent);
}

// --- Calculation ---
const m_today = mvpaMinutes[mvpaMinutes.length - 1]; // last value = today's minutes
const muRecent = weightedRecentMean(mvpaMinutes, weights);
const muM = mu_m(mvpaMinutes, weights, min_recommended_by_age);
const AMS = computeAMS(m_today, muM, sigma_m);

// --- Output ---
console.log("=================================");
// console.log("ACTIVE MINUTES SCORE CALCULATOR");
console.log("=================================");
console.log(`7-day MVPA minutes: ${mvpaMinutes.join(", ")}`);
console.log(`Weights: ${weights.join(", ")}`);
console.log(`σₘ (tolerance): ${sigma_m}`);
console.log(`Min recommended by age: ${min_recommended_by_age}`);
console.log("---------------------------------");
console.log(`μ_recent = ${muRecent.toFixed(2)} min/day`);
console.log(`μ_m (final baseline) = ${muM.toFixed(2)} min/day`);
console.log(`Today's MVPA (m) = ${m_today} min`);
console.log("---------------------------------");
console.log(`➡️ Active Minutes Score (AMS) = ${AMS.toFixed(2)}`);
console.log("=================================");
