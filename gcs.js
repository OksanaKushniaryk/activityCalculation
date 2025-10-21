// =======================================
// GINI COEFFICIENT for ACTIVITY — CALCULATOR
// GCS = 100 * (1 - G)
// G   = (Σ|x_i - x_j|) / (2 * N^2 * μ)
// x_i — steps in 2-hour bin (awake only)
// N   — number of bins; μ = (Σ x_i)/N
// =======================================

// --------- EDITABLE INPUTS ---------

// Put your 2-hour awake bins here (yesterday or today).
// Example: your yesterday's data (uncomment to test):
// const bins = [45, 650, 156, 1672, 367, 207, 100, 332];

const bins = [45, 650, 156, 1672, 367, 207, 100, 332]; // <- change freely

// (Optional) labels for nicer printing; length must match bins
const labels = ["08-10","10-12","12-14","14-16","16-18","18-20","20-22","22-24"];

// Rounding in console output
const ROUND = 4;


// --------- CORE FUNCTIONS ---------

function validateBins(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("Provide a non-empty array of 2-hour awake bins.");
  }
  if (!arr.every(v => Number.isFinite(v) && v >= 0)) {
    throw new Error("All bins must be finite, non-negative numbers.");
  }
}

function mean(arr) {
  const sum = arr.reduce((s, v) => s + v, 0);
  return sum / arr.length;
}

// Efficient Σ|xi - xj| using sorting + prefix sums: O(N log N)
function computeG_simple(arr) {
  const N = arr.length;
  const mu = arr.reduce((a, b) => a + b, 0) / N;
  let sum = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      sum += Math.abs(arr[i] - arr[j]);
    }
  }
  return sum / (2 * N * N * mu);
}


function computeGCS(binArray) {
  validateBins(binArray);
  const N = binArray.length;
  const mu = mean(binArray);
  if (mu === 0) {
    // no steps at all during awake bins → perfectly "even" zeros
    return { N, mu, G: 0, GCS: 100 };
  }
  const G = computeG_simple(binArray);
  const G_clamped = Math.max(0, Math.min(1, G)); // numeric safety
  const GCS = 100 * (1 - G_clamped);
  return { N, mu, G: G_clamped, GCS };
}


// --------- RUN & PRINT ---------

try {
  const { N, mu, G, GCS } = computeGCS(bins);

  console.log("=======================================");
  console.log("GINI COEFFICIENT for ACTIVITY — RESULT");
  console.log("=======================================");
  if (labels.length === bins.length) {
    bins.forEach((v, i) => console.log(`${labels[i]}: ${v}`));
  } else {
    console.log(`Bins: [${bins.join(", ")}]`);
  }
  console.log("---------------------------------------");
  console.log(`N (bins)    : ${N}`);
  console.log(`μ (avg/bin) : ${mu.toFixed(2)}`);
  console.log(`G (0..1)    : ${G.toFixed(ROUND)}`);
  console.log(`➡️ GCS       : ${GCS.toFixed(2)}`);
  console.log("=======================================");
} catch (e) {
  console.error("Error:", e.message);
}


// --------- OPTIONAL HELPERS ---------
// If you have 1-hour bins → fold into 2-hour bins
function aggregateTo2hBins(hourly) {
  if (!Array.isArray(hourly) || hourly.length % 2 !== 0) {
    throw new Error("Provide an array of hourly values with even length.");
  }
  const out = [];
  for (let i = 0; i < hourly.length; i += 2) {
    out.push(hourly[i] + hourly[i + 1]);
  }
  return out;
}

// If you have 5-min data → 2 hours = 24 * 5min samples
function aggregate5minTo2hBins(fiveMin) {
  if (!Array.isArray(fiveMin) || fiveMin.length % 24 !== 0) {
    throw new Error("5-min array length must be a multiple of 24.");
  }
  const out = [];
  for (let i = 0; i < fiveMin.length; i += 24) {
    let sum = 0;
    for (let k = 0; k < 24; k++) sum += fiveMin[i + k];
    out.push(sum);
  }
  return out;
}
