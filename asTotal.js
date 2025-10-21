// ==========================================
// ACTIVITY SCORE CALCULATOR (without TECS)
// AS = 0.25*SS + 0.25*AMS + 0.15*CS + 0.10*GCS
// ==========================================

// ---------- EDITABLE INPUTS ----------

// Subscores (0–100 scale)
const SS  = 18.57;  // Steps Score
const AMS = 36.14;  // Active Minutes Score
const CS  = 0.00;   // Consistency Score
const GCS = 47.23;  // Gini Coefficient Score

// ---------- CORE FUNCTION ----------

function computeActivityScore({ SS, AMS, CS, GCS }) {
  const wSS = 0.25, wAMS = 0.25, wCS = 0.15, wGCS = 0.10;
  const weightsSum = wSS + wAMS + wCS + wGCS; // 0.75

  const AS_raw =
    wSS * SS +
    wAMS * AMS +
    wCS * CS +
    wGCS * GCS;

  // Normalize to 0–100
  const AS_normalized = AS_raw / weightsSum;

  return { AS_raw, AS_normalized, weightsSum };
}

// ---------- RUN & PRINT ----------

const { AS_raw, AS_normalized, weightsSum } =
  computeActivityScore({ SS, AMS, CS, GCS });

console.log("=================================");
console.log("ACTIVITY SCORE CALCULATOR");
console.log("=================================");
console.log(`SS   (Steps Score)          : ${SS}`);
console.log(`AMS  (Active Minutes Score) : ${AMS}`);
console.log(`CS   (Consistency Score)    : ${CS}`);
console.log(`GCS  (Gini Coefficient)     : ${GCS}`);
console.log("---------------------------------");
//console.log(`Weight sum used     : ${weightsSum.toFixed(2)}`);
//console.log(`AS (raw, unscaled)  : ${AS_raw.toFixed(2)}`);
console.log(`AS (normalized 0–100): ${AS_normalized.toFixed(2)}`);
console.log("=================================");
