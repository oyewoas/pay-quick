
# PayQuick — Frontend Coding Exercise

PayQuick is a small React + TypeScript + Vite application that demonstrates a payments dashboard with authentication, protected routes, profile and transaction lists. It is intended as a compact, production-like front-end demo that uses modern patterns: Type-safe forms, Redux Toolkit for state, RTK Query for data fetching, Tailwind CSS for styling, and a json-server-based mock API for local development.

---

## Screenshots

The repository includes screenshot placeholders under `public/screenshots/`.

- `public/screenshots/login.png` — Login screen
- `public/screenshots/dashboard.png` — Dashboard (profile + transactions)
- `public/screenshots/profile.png` — Profile details view

Embedded screenshots:

![Login](/public/screenshots/login.png)

![Dashboard](/public/screenshots/dashboard.png)

---

## Features

- Login form with validation (react-hook-form + zod)
- Token persistence in Redux and `localStorage`
- Protected dashboard route (React Router v6)
- Profile and transactions fetched from a mock JSON API (json-server)
- Tailwind CSS driven UI with reusable components and skeleton loaders
- Vitest + React Testing Library basic test setup

---

## Prerequisites

- Node.js 22+ (or a recent LTS)
- npm (or pnpm/yarn) — examples below use npm

---

## Setup and run (development)

1. Install dependencies

```bash
npm install
```

1. Start the mock API server (open a separate terminal)

```bash
npm run mock-server
```

The mock API runs on [http://localhost:3001](http://localhost:3001). It is implemented in `server.ts` and reads `mock/db.json` for data.

1. Start the frontend development server

```bash
npm run dev
```

Open the app at [http://localhost:5173](http://localhost:5173).

To run both mock server and frontend together use:

```bash
npm run start
```

---

## Available scripts

- `npm run dev` — start the Vite development server
- `npm run mock-server` — run the mock API (via `ts-node server.ts`)
- `npm run start` — run mock server and dev server concurrently
- `npm run build` — TypeScript build and Vite production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint
- `npm run test` — run tests with Vitest
- `npm run test:watch` — run tests in watch mode
- `npm run coverage` — run tests and collect coverage

---

## Mock API (implementation details)

The mock API is implemented with `json-server` and small custom middleware in `server.ts`. It serves data from `mock/db.json` and exposes these endpoints:

- `POST /login` — accepts a username/password and returns a token and a user object
- `POST /logout` — invalidates the token (mock)
- `GET /profile/:id` — returns the profile for a user id (requires Authorization header)
- `GET /transactions` — returns transactions for the authenticated user

Protected endpoints expect an `Authorization: Bearer <token>` header. See `mock/db.json` for sample users and data.

---

## Architectural decisions

State management: Redux Toolkit

- Redux Toolkit is used to manage global state (authentication, profile and transactions). The toolkit reduces boilerplate and provides strong TypeScript ergonomics. Auth state includes a token and user object. The token is mirrored to `localStorage` so the user remains signed in across page reloads.

Data fetching: RTK Query

- RTK Query is used for remote data fetching for profile and transactions. It integrates with the Redux store, supports caching and provides hooks for components. The API slices attach the authorization header using `prepareHeaders` so the token from the store is included automatically.

Authentication and routing

- Authentication is implemented as a token stored in Redux and persisted to `localStorage` for development convenience. A `ProtectedRoute` component guards the dashboard route and redirects unauthenticated users to `/login`.

UI and styling

- Tailwind CSS is used for styling. Components are small and focused with skeleton loaders to improve perceived performance. The app prioritizes mobile-first layouts and accessible controls.

Testing

- Vitest and React Testing Library are used for unit and component tests. Tests are configured to run in a Vite-native environment (jsdom).

Mocking approach for tests

- For local development the mock API runs via `json-server`. For unit/component tests, consider using MSW (Mock Service Worker) to simulate network responses without starting the server.

---

## Where to look in the code

- `src/pages/Login.tsx` — login form
- `src/pages/Dashboard.tsx` — protected dashboard combining profile and transactions
- `src/components/ui/` — ProfileCard, TransactionsList, ErrorCard, Skeletons
- `src/store/slices/` — `authSlice`, `profileSlice`, `transactionsSlice`
- `src/services/` — RTK Query API slices for auth, profile and transactions
- `server.ts` and `mock/db.json` — mock API implementation and data
