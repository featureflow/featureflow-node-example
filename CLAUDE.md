# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn install   # Install dependencies
yarn start     # Start the server (runs node ./bin/www, serves on http://localhost:3000)
```

There are no tests or linting configured.

## Architecture

This is an Express.js demo app for the [featureflow-node-sdk](https://www.featureflow.io), showing how to integrate Featureflow feature flags.

**Entry point:** `bin/www` starts the HTTP server; `app.js` configures Express.

**Middleware setup in `app.js`:**
1. A `userMiddleware` builds a `Featureflow.UserBuilder` and attaches it to `req.ffUser` on every request. This is where user identity and attributes (used for targeting rules) are defined.
2. `Featureflow.ExpressClient` is registered as middleware, attaching `req.featureflow` (the SDK client) to every request.
3. The SDK config in `app.js` includes `apiKey`, `interval` (polling interval in seconds), and `withFeatures` (feature key + failover variant declarations).

**Feature evaluation in `routes/index.js`:**
- `req.featureflow.evaluate('feature-key', req.ffUser).isOn()` — evaluates a feature flag for the user
- `req.featureflow.evaluate('feature-key', req.ffUser).value()` — returns the variant string
- `req.featureflow.evaluateAll(req.ffUser)` — evaluates all features at once

**Views:** EJS templates in `views/`. The route renders either `index.ejs` or `indexExampleFeature.ejs` depending on whether `node-demo-feature` is on for the user.

**Configuration:** Set your Featureflow Server Environment SDK Key (starts with `srv-env-`) in `app.js`:
```js
const API_KEY = 'srv-env-YOUR_KEY_HERE';
```
