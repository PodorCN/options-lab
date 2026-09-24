# Options Lab: Black-Scholes Greeks

Interactive Black-Scholes-Merton explorer. Single static page, no build step.

**Live:** https://podorcn.github.io/options-lab/

## Features
- 17 Greeks: price, delta, gamma, vega, theta, rho, epsilon (psi), vanna, charm, vomma, veta, speed, zomma, color, ultima, dual delta, dual gamma
- Any Greek vs any input (S, K, T, σ, r, q), with overlay families of curves
- 3D surface and heatmap over any two inputs
- "All Greeks" small-multiples view
- Time-decay animation
- Multi-leg strategies (presets: spreads, straddle/strangle, butterfly, iron condor, calendar, collar, risk reversal, ratio) with per-leg Greek breakdown and payoff at front expiry
- Trader units toggle (per day / per vol point / per 1%)

## Model
Black-Scholes-Merton with continuous dividend yield q. Formulas follow Hull, *Options, Futures, and Other Derivatives*, and Wikipedia's *Greeks (finance)*; every Greek is verified against finite differences. Theta, charm, veta and color use calendar-time decay (∂/∂t = −∂/∂T).

Charts: [Plotly.js](https://plotly.com/javascript/) 2.35.2 via CDN.

## License
MIT
