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

1. A singleton `Featureflow.Client` is created once at startup with `apiKey` and `withFeatures` declarations.
2. A single middleware attaches `req.featureflow = client` and builds `req.ffUser` via `Featureflow.UserBuilder` on every request. This is where user identity and attributes (used for targeting rules) are defined.

**Startup/shutdown in `bin/www`:**

- `client.ready(callback)` must resolve before `server.listen()` is called.
- `client.close()` is called on `SIGINT` for graceful shutdown.

**Feature evaluation in `routes/index.js`:**

- `req.featureflow.evaluate('feature-key', req.ffUser).isOn()` — evaluates a feature flag for the user
- `req.featureflow.evaluate('feature-key', req.ffUser).value()` — returns the variant string
- `req.featureflow.evaluateAll(req.ffUser)` — evaluates all features at once

**Views:** EJS templates in `views/`. The route renders either `index.ejs` or `indexExampleFeature.ejs` depending on whether `node-demo-feature` is on for the user.

**Configuration:** Set your Featureflow Server Environment SDK Key (starts with `srv-env-`) via env var or directly in `app.js`:

```bash
FEATUREFLOW_API_KEY=srv-env-YOUR_KEY_HERE yarn start
```
