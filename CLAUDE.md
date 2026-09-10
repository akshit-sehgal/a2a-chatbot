# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # production build to dist/
npm run preview  # serve the built dist/
npm run lint     # ESLint (flat config, eslint.config.js)
```

No test runner is configured.

## State of the project

This is an early scaffold for a chatbot app, not a mature codebase. `src/App.jsx` is a stub, `server/index.js` is empty (no backend framework installed yet), `src/styles/_theme.scss` is empty, and there are no commits on `main` yet. Expect to create structure rather than fit into it.

## Architecture

Vite + React 19, plain JSX (no TypeScript). Entry chain: `index.html` → `src/main.jsx` (StrictMode + `createRoot`) → `src/App.jsx`.

Styling is Sass (`sass-embedded`), split in two layers:

- **Global** — `src/styles.scss`, imported once in `main.jsx`. Holds the reset, `@use`s `src/styles/_fonts.scss` and `src/styles/_theme.scss`, and sets `html { font-size: 62.5% }` so **1rem = 10px**. Always size in `rem`, never `px`.
- **Per-component** — `styles.module.scss` CSS modules colocated with each component.

Colors come from CSS custom properties (`var(--bg)`, `var(--text)`, …) defined in `src/styles/_theme.scss`. That file is currently empty, so any variable referenced from a component must be added there first.

## Component conventions

The `create-new-component` skill (`.claude/skills/create-new-component/SKILL.md`) is the authority for new components, hooks, pages, and routes — read it before creating one. Its key rules:

- One CamelCase folder per component containing `index.jsx`, `constants.js`, `utils.js`, `styles.module.scss`.
- Arrow-function components, default export, semantic HTML, props destructured on their own lines.
- Order inside a component: state/refs/memos/props → event handlers (`onClick`, `onChange`) → `useEffect` → `renderX()` helpers → final `return`. Long JSX is split into `renderHeader`/`renderBody`-style helpers rather than inlined.
- Strings and labels live in `constants.js` (component-local) or `src/constants.js` (shared); utilities in the component's `utils.js` or `src/utils` — check `src/utils` for an existing one first.
- BEM class names, and shared base components (inputs, modals, dropdowns) belong in `src/components/shared`.

Two things the skill's example assumes that the repo does not yet provide: the `classnames` package (`import cx from 'classnames'`) is not installed, and the `@/` import alias is not configured in `vite.config.js`. Install/configure them before following those parts of the example, or use relative imports.

### Important coding guidelines (MUST FOLLOW)

- When implmenting a new route/page/component/hook always invoke the `/create-new-component` skill
- Always use arrow functions.
- Within any file, ensure that constants/strings are defined in `src/constants.js`.
- While writing functional/logical code within a component, ensure that it is split into multiple functions and ensure that each function is responsible for only one task.
- Always follow sentence casing for text/labels
- For adding svgs, always create svgs in `@assets/icons` folder and name them using `kebab-case` and use them in `<img>` tags.
