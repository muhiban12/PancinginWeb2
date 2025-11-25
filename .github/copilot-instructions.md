<!-- .github/copilot-instructions.md for PancinginWeb2 -->
# Copilot / AI Agent Instructions

Keep guidance short, actionable and tied to this repository's patterns.

- Project layout: frontend (root `src/`, Vite + Vue 3) and backend inside `src/backend/` (Express + MySQL). Key entrypoints:
  - Frontend: `src/main.js`, `vite.config.js`, components `src/components/`, views `src/views/`, services `src/service/*.js`.
  - Backend: `src/backend/server.js`, routes `src/backend/routes/`, controllers `src/backend/controller/`, models `src/backend/models/`, DB config `src/backend/config/db.js`.

- Dev commands (run from repository root unless noted):
  - Install frontend deps: `npm install` (root).
  - Run frontend dev: `npm run dev` (starts Vite).
  - Build frontend: `npm run build`.
  - Lint/format: `npm run lint`, `npm run format`.
  - Backend: `cd src/backend && npm install` then `npm run dev` (uses `nodemon`) or `npm start` to run once.

- API & runtime conventions:
  - Frontend HTTP client: `src/service/api.js` sets `baseURL: http://localhost:3000/api` and automatically injects `Authorization: Bearer <token>` from `localStorage`.
  - Backend listens on `process.env.PORT || 3000` and already enables CORS (`src/backend/server.js`).
  - Database connection is a pooled `mysql2/promise` instance in `src/backend/config/db.js`. Default port is `3307` in that file — ensure `.env` matches your MySQL setup.
  - Controllers typically access DB via `const db = req.app.get('db')` (see `produkcontroller.js`). Follow that pattern for new controllers.
  - Protected routes use `verifyToken` middleware (`src/backend/middleware/verifytoken.js`) — attach it in `server.js` or per-route.

- Adding a backend endpoint (minimal checklist):
  1. Create controller method in `src/backend/controller/YourController.js` (use `req.app.get('db')` and try/catch error handling).
  2. Add route file in `src/backend/routes/yourroute.js` and export an Express router.
  3. Register the route in `src/backend/server.js` (choose to protect it with `verifyToken` if needed).
  4. If logic involves DB models, add/extend model in `src/backend/models/`.

- Frontend patterns to follow:
  - Services in `src/service/` wrap `api` calls (e.g., `produkService.js`, `bookingService.js`). Use these services rather than raw axios in components.
  - Global state uses Pinia (`stores/`) — check `stores/counter.js` for example.
  - Routing uses named routes (see `src/router/index.js`); many components use lazy imports for larger views.
  - Authentication token is saved to `localStorage` and relied on by the API interceptor; updates to auth flows must keep this contract.

- Environment and secrets:
  - Backend expects `.env` keys: `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_PORT` (optional), `PORT` (optional), and likely `JWT_SECRET` (used by auth middleware).
  - Frontend uses `import.meta.env` for Vite env vars when needed.

- Quick pointers for common tasks:
  - Run both servers while developing: (1) `cd src/backend && npm run dev` (2) back to repo root `npm run dev` for Vite. Backend default: port 3000; Vite default: 5173.
  - If you add new client API calls, update `src/service/` with a small wrapper and add a corresponding backend route.
  - Use `req.app.get('db')` in controllers rather than creating new connections; that keeps pooling consistent.

- Project-specific gotchas and conventions:
  - Backend lives under `src/backend/` (not top-level). Be careful when running scripts and referencing paths.
  - `server.js` registers public vs protected routes explicitly — check which routes require `verifyToken` to avoid accidental exposure.
  - The DB pool default port (3307) is non-standard; confirm environment or adjust `config/db.js`.
  - Token presence is the simple auth check on the client (`localStorage.getItem('token')`), used in `router.beforeEach` and API requests.

- When uncertain, inspect these files first:
  - `src/service/api.js` (base API behavior)
  - `src/backend/server.js` (route registration & middleware)
  - `src/backend/config/db.js` (DB pooling/port)
  - `src/backend/controller/*` (controller patterns and error handling)
  - `src/router/index.js` (routing & auth guard)

If anything here is unclear or you want the file to include code snippets for specific tasks (e.g., adding a new route + controller), tell me which example and I'll expand it.
