# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
cp .env.example .env   # Set FEATUREFLOW_API_KEY in .env before first run
yarn install            # Install dependencies
yarn start              # Start the server (runs node ./bin/www, serves on http://localhost:3000)
```

There are no tests or linting configured. A VS Code launch config (`.vscode/launch.json`, "Launch Featureflow Example") runs `bin/www` under the debugger on port 3050 (chosen to avoid clashing with other repos' dev servers on 3000 in this multi-repo workspace).

## Architecture

This is an Express.js demo app for [featureflow-node-sdk](https://www.featureflow.io) `^0.7.0`, showing how to integrate Featureflow feature flags.

**Entry point:** `bin/www` starts the HTTP server; `app.js` configures Express.

**Middleware setup in `app.js`:**

1. A singleton `Featureflow.Client` is created once at startup with `apiKey` and `withFeatures` declarations (each entry pins a `key` and a `failoverVariant` used if the SDK can't reach Featureflow).
2. A single middleware attaches `req.featureflow = client` and builds `req.ffUser` via `Featureflow.UserBuilder` on every request. This is where user identity and attributes (used for targeting rules) are defined — currently a hardcoded demo user (`jimmy@example.com`), not derived from real auth.

**Startup/shutdown in `bin/www`:**

- `client.ready(callback)` must resolve before `server.listen()` is called.
- `client.close()` is called on `SIGINT` for graceful shutdown.

**Feature evaluation in `routes/index.js`:**

- `req.featureflow.evaluate('feature-key', req.ffUser)` returns an `Evaluate` object — call `evaluate()` once per feature per request and reuse the result, rather than calling it again for each method below (each call queues its own evaluation event).
- `.isOn()` / `.isOff()` — boolean checks against the `on`/`off` variants
- `.value()` — returns the variant string
- `.jsonValue()` — returns the evaluated variant's JSON config payload (set on the variant in the Featureflow dashboard), or `undefined` if it has none
- `req.featureflow.evaluateAll(req.ffUser)` — evaluates all features at once

The route evaluates the `example-feature` flag (present by default in new Featureflow projects) once via `exampleFeature = req.featureflow.evaluate('example-feature', req.ffUser)`, then calls `.isOn()`, `.value()`, and `.jsonValue()` on that single result.

**Views:** EJS templates in `views/`. The route renders either `index.ejs` or `indexExampleFeature.ejs` depending on whether `example-feature` is on for the user; `error.ejs` handles the catch-all error handler in `app.js`.

**Configuration:** `bin/www` loads `.env` via `dotenv` before requiring `app.js`. Set `FEATUREFLOW_API_KEY` (your Featureflow Server Environment SDK Key, starts with `srv-env-`) in `.env` — copy `.env.example` to get started. `.env` is gitignored; `app.js` falls back to a placeholder string if the var isn't set, so evaluation will use failover variants until a real key is supplied.
