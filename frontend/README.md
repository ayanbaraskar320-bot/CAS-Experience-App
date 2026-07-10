# CAS Experience Frontend

This folder contains the working React app for the CAS Experience product site.

## Frontend structure

```text
frontend/
	index.html
	package.json
	vite.config.js
	src/
		App.jsx
		App.css
		index.css
		main.jsx
		assets/
	public/
```

## Main app files

- `src/main.jsx` mounts the app and wraps it in React Router.
- `src/App.jsx` holds the full routed experience, shared shell, selector, and page views.
- `src/index.css` defines the CAS visual tokens and base form styles.
- `vite.config.js` enables the React plugin, Tailwind, and React dedupe settings.

## How to run

From `frontend/`:

```bash
npm run dev
npm run build
npm run lint
```

## Notes

- This project is frontend-only right now.
- Backend code should go in the sibling `../backend/` folder when it is added.
