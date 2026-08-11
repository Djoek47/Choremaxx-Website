/**
 * No-op stub for the legacy v0 "Built with v0" injector.
 *
 * The Vercel project Build Command is still configured as:
 *   node .v0/inject-built-with-v0.mjs && next build
 *
 * That script was never committed to this repo (it lived in the v0
 * sandbox). Leaving a harmless stub here keeps deployments green
 * until the Build Command is switched to a plain `next build` /
 * `pnpm build` in the Vercel project settings.
 */
process.exit(0);
