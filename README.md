# CAS Experience Workspace

This workspace is organized to make the frontend and backend responsibilities easy to find.

## Layout

```text
CAS-Experience-App/
  frontend/   # React + Vite app for CAS Experience
  backend/    # Backend placeholder and future API surface
  package.json
  package-lock.json
```

## What lives where

- `frontend/` contains the working CAS Experience site.
- `backend/` is reserved for API, data access, and server-side logic.
- The root currently only holds workspace-level files and documentation.

## Frontend entry points

- `frontend/src/main.jsx` bootstraps the React app and router.
- `frontend/src/App.jsx` contains the routed CAS views and page logic.
- `frontend/src/index.css` defines the CAS palette, typography, and form styles.
- `frontend/vite.config.js` configures Vite, Tailwind, and dependency dedupe.

## Backend status

There is no implemented backend yet. The `backend/` folder exists so future API work has a dedicated place without mixing it into the UI code.