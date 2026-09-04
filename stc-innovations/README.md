# STC Innovations Website & CAS™ Dashboard

This folder contains the standalone web application for **STC Innovations** — the exclusive commercial development and enterprise licensing provider for the ElevIQ Capability Alignment System™ (CAS).

## Structure
- `src/` — Standalone application components, design system, and pages
- `public/` — Assets including the STC Delta favicon and interface snapshots
- `staticwebapp.config.json` — Azure Static Web Apps deployment configuration
- `vercel.json` — Vercel routing configuration

## Development
```bash
npm install
npm run dev
```
Runs locally at **http://localhost:5174**.

## Production Build
```bash
npm run build
```
Generates production-ready static assets in `dist/`.
