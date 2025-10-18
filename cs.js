// ===============================
// CONSISTENCY SCORE CALCULATOR
// ===============================

// ---- Editable input data ----
// Steps for 7 consecutive days (x1..x7):
const steps7 = [9077, 6028, 2446, 6193, 5852, 5399, 547];

// Reference tolerance (σ_ref):
const sigmaRef = 1500;

// Rounding for printed results:
const ROUND = 2;

// ---- Functions ----

// Mean with fixed denominator 7 (as per your formula)
function mean7(values) {
  if (values.length !== 7) {
    throw new Error(`Expected exactly 7 values, got ${values.length}`);
  }
  const sum = values.reduce((s, v) => s + v, 0);
  return sum / 7;
}

// Population std dev with denominator 7 (your spec):
// σ_w = sqrt( Σ(x_i - x̄)^2 / 7 )
function popStdDev7(values) {
  const m = mean7(values);
  const sumSq = values.reduce((s, v) => s + Math.pow(v - m, 2), 0);
  return Math.sqrt(sumSq / 7);
}

// CS = 100 × max(0, 1 - (σ_w / σ_ref))
function consistencyScore(values, sigmaRef) {
  const sigmaW = popStdDev7(values);
  const cs = 100 * Math.max(0, 1 - sigmaW / sigmaRef);
  return { mean: mean7(values), sigmaW, cs };
}

// ---- Run ----
try {
  const { mean, sigmaW, cs } = consistencyScore(steps7, sigmaRef);

  console.log("=================================");
  console.log("CONSISTENCY SCORE CALCULATOR");
  console.log("=================================");
  console.log(`Steps (7 days): ${steps7.join(", ")}`);
  console.log(`σ_ref: ${sigmaRef}`);
  console.log("---------------------------------");
  console.log(`x̄ (mean, /7)      = ${mean.toFixed(ROUND)}`);
  console.log(`σ_w (std, /7)     = ${sigmaW.toFixed(ROUND)}`);
  console.log(`➡️ Consistency Score (CS) = ${cs.toFixed(ROUND)}`);
  console.log("=================================");
} catch (e) {
  console.error("Error:", e.message);
}
