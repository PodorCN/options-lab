# Options Lab

Interactive Black-Scholes-Merton explorer. Static pages, no build step.

| Page | What it does |
|---|---|
| `index.html` Greeks Lab | 17 Greeks vs any input, surfaces, heatmaps, multi-leg Greeks |
| `payoff.html` Payoff Lab | Strategy P&L at expiry and before it, exact max profit / max loss / breakevens, risk-neutral P(profit), put–call parity table |

Shared code: `assets/lab.css` (theme and components, light + dark) and `assets/bsm.js` (pricing engine).

**Live:** https://podorcn.github.io/options-lab/

## Greeks Lab
- 17 Greeks: price, delta, gamma, vega, theta, rho, epsilon (psi), vanna, charm, vomma, veta, speed, zomma, color, ultima, dual delta, dual gamma
- Any Greek vs any input (S, K, T, σ, r, q), with overlay families of curves
- 3D surface and heatmap over any two inputs
- "All Greeks" small-multiples view
- Time-decay animation
- Multi-leg strategies (presets: spreads, straddle/strangle, butterfly, iron condor, calendar, collar, risk reversal, ratio) with per-leg Greek breakdown and payoff at front expiry
- Trader units toggle (per day / per vol point / per 1%)

## Payoff Lab
- 15 presets in three groups: directional (long call/put, bull call, bear put, risk reversal), stock + options (covered call, protective put, collar), volatility (straddle, short straddle, strangle, butterfly, short iron condor, reverse iron condor), plus custom legs
- Market inputs S, σ, r, q, days to expiry; four named strikes K₁–K₄
- Expiry P&L plus a "days passed" slider and play button that re-price every leg with BSM
- Net premium, max profit, max loss and breakevens solved exactly on the piecewise-linear payoff; risk-neutral probability of profit
- Position Δ, Γ, vega, Θ, ρ and a quote table that shows put–call parity for every strike

## Model
Black-Scholes-Merton with continuous dividend yield q. Formulas follow Hull, *Options, Futures, and Other Derivatives*, and Wikipedia's *Greeks (finance)*; every Greek is verified against finite differences. Theta, charm, veta and color use calendar-time decay (∂/∂t = −∂/∂T).

Charts: [Plotly.js](https://plotly.com/javascript/) 2.35.2 via CDN.

## License
MIT
