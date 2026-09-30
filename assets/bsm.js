// Options Lab shared pricing engine (Black-Scholes-Merton with continuous dividend yield q).
// Loaded as a classic script: npdf, ncdf and bsm become globals used by every page.
const SQ2PI = Math.sqrt(2 * Math.PI);
function npdf(x) { return Math.exp(-0.5 * x * x) / SQ2PI; }
function ncdf(x) {
  // Cody-style rational approx via erfc (W. J. Cody / Numerical Recipes erfc, |err| < 1.2e-7)
  const z = Math.abs(x) / Math.SQRT2;
  const t = 1 / (1 + 0.5 * z);
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 +
    t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
    t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? 1 - 0.5 * r : 0.5 * r;
}
// p = {S, K, T, sig, r, q}; returns raw (unscaled) greeks for call (c) and put (p)
function bsm(p) {
  const S = Math.max(p.S, 1e-8), K = Math.max(p.K, 1e-8);
  const T = Math.max(p.T, 1e-6), s = Math.max(p.sig, 1e-6), r = p.r, q = p.q;
  const sT = Math.sqrt(T), vs = s * sT;
  const d1 = (Math.log(S / K) + (r - q + 0.5 * s * s) * T) / vs;
  const d2 = d1 - vs;
  const eq = Math.exp(-q * T), er = Math.exp(-r * T);
  const Nd1 = ncdf(d1), Nd2 = ncdf(d2), Nm1 = ncdf(-d1), Nm2 = ncdf(-d2);
  const nd1 = npdf(d1), nd2 = npdf(d2);

  const gamma = eq * nd1 / (S * vs);
  const vega = S * eq * nd1 * sT;
  const vanna = -eq * nd1 * d2 / s;
  const vomma = vega * d1 * d2 / s;
  const veta = S * eq * nd1 * sT * (q + (r - q) * d1 / vs - (1 + d1 * d2) / (2 * T));
  const speed = -gamma / S * (d1 / vs + 1);
  const zomma = gamma * (d1 * d2 - 1) / s;
  const color = eq * nd1 / (2 * S * T * vs) * (2 * q * T + 1 + (2 * (r - q) * T - d2 * vs) / vs * d1);
  const ultima = -vega / (s * s) * (d1 * d2 * (1 - d1 * d2) + d1 * d1 + d2 * d2);
  const dualGamma = er * nd2 / (K * vs);
  const thetaCommon = -S * eq * nd1 * s / (2 * sT);
  const charmCommon = eq * nd1 * (2 * (r - q) * T - d2 * vs) / (2 * T * vs);

  const c = {
    price: S * eq * Nd1 - K * er * Nd2,
    delta: eq * Nd1, gamma, vega,
    theta: thetaCommon - r * K * er * Nd2 + q * S * eq * Nd1,
    rho: K * T * er * Nd2,
    epsilon: -S * T * eq * Nd1,
    vanna, charm: q * eq * Nd1 - charmCommon,
    vomma, veta, speed, zomma, color, ultima,
    dualDelta: -er * Nd2, dualGamma,
  };
  const pu = {
    price: K * er * Nm2 - S * eq * Nm1,
    delta: -eq * Nm1, gamma, vega,
    theta: thetaCommon + r * K * er * Nm2 - q * S * eq * Nm1,
    rho: -K * T * er * Nm2,
    epsilon: S * T * eq * Nm1,
    vanna, charm: -q * eq * Nm1 - charmCommon,
    vomma, veta, speed, zomma, color, ultima,
    dualDelta: er * Nm2, dualGamma,
  };
  return { c, p: pu, d1, d2 };
}
