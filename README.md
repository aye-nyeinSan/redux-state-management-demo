# Kanban Board Project 

## What this is
A small TypeScript React app that demonstrates a Notion-like kanban board built with Redux Toolkit and a drag‑and‑drop library — intended as a demo of Redux state management for tasks/columns. 

### Stack
- **Language(s):** TypeScript (primary), CSS, small bits of JavaScript/HTML  
- **Framework / runtime:** React + Vite (TypeScript + Vite dev tooling)  
- **Notable libraries:** Redux Toolkit (store + slices), React (UI), Vite (dev/build), a drag‑and‑drop library (used for the kanban interactions — referenced in repo description), TypeScript for types

## How it's organized
```
package.json                # npm scripts & deps (Vite + React + Redux Toolkit, etc.)
vite.config.ts             # Vite config for dev/build
tsconfig*.json             # TypeScript configs
index.html                 # app entry HTML
src/
  main.tsx                 # React entry — renders <App /> and provides Redux Provider
  App.tsx                  # top-level app component (small)
  index.css, style.css     # global styles
  logo.svg                 # logo asset
  app/
    store.ts               # configures Redux store
    createAppSlice.ts      # app-level slice (app metadata/settings)
    hooks.ts               # typed useAppDispatch/useAppSelector helpers
  features/
    tasks/
      tasksSlice.ts        # Redux slice: tasks state, reducers, actions
      TasksView.tsx        # main kanban view that composes columns/cards + DnD
    (other example feature dirs present: counter, quotes, cake, icecream)
  components/
    TaskColumn.tsx         # column container UI for tasks
    TaskCard.tsx           # individual task card UI + DnD handlers
    ui/
      card.tsx             # small presentational Card component
  data/
    tasksdemo.json         # sample demo data for initial board state
  utils/                   # utility helpers (small)
  vite-env.d.ts
  setupTests.ts            # test setup
App.test.tsx               # example test for the app
README.md                  # short README / link
```

How it fits together: main.tsx mounts the React app and wires the Redux store (src/app/store.ts). The tasks feature is implemented with a Redux Toolkit slice (src/features/tasks/tasksSlice.ts) that models columns and cards; the UI (TasksView, TaskColumn, TaskCard) reads from the store and dispatches slice actions when drag-and-drop or edits occur. Sample data lives in src/data/tasksdemo.json and styles are in src/style.css and src/index.css. Vite provides the dev server and build pipeline.

## How to run it
Shortest path (typical for a Vite + npm project):

1. Install dependencies:
   ```
   npm install
   ```
2. Start dev server:
   ```
   npm run dev
   ```
3. Build for production:
   ```
   npm run build
   ```
4. Run tests (if scripts exist in package.json):
   ```
   npm test
   ```
<hr>

## Demo

https://github.com/user-attachments/assets/7f1e8d31-caa6-4a1e-aa91-e5569cbd1f74

