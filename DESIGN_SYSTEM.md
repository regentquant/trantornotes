# Trantor Notes Design System

## Styling Audit

- Current stack: vanilla CSS (`/Users/curryyao/Desktop/trantornotes/styles.css`) plus semantic HTML classes.
- Tailwind: no `tailwind.config.*`, no PostCSS Tailwind plugin, and no Tailwind utility pipeline detected.
- CSS-in-JS: not used.
- Existing style references in repo: no standalone style guide file before this refactor.

## Phase 1: Token Foundation

The token foundation is centralized in `:root` and `[data-theme=\"dark\"]` in `/Users/curryyao/Desktop/trantornotes/styles.css`.

- Color tokens: palette + semantic aliases (`--color-accent`, tint variants, surface/text/border states, status colors).
- Spacing scale: `--space-0` through `--space-12`.
- Typography scale: `--font-size-xs` through `--font-size-display`.
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`.
- Shadows: `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`.
- Z-index: `--z-base`, `--z-header`, `--z-modal`, `--z-toast`.
- Motion: duration/easing tokens (`--duration-*`, `--ease-standard`).

Legacy aliases (`--sp-*`, `--text-*`, etc.) are retained to prevent regressions while the new semantic token names are adopted.

## Phase 2: Utility Classes

Utility primitives now include:

- Layout: `u-flex`, `u-grid`, `u-flex-col`, `u-wrap`, alignment and justification helpers.
- Gap: `u-gap-1` to `u-gap-6`.
- Spacing: margin/padding helpers such as `u-mb-*`, `u-mt-*`, `u-p-*`.
- Text: alignment, size, weight, transform, and semantic color helpers.
- Common helpers: display (`u-hidden`, `u-block`), rounded, shadow, background, width/prose constraints.

Compatibility aliases are included for old utility names (`flex`, `items-center`, `justify-between`, `gap-2`, `mb-2`, `text-sm`).

## Phase 3: Component Library

Reusable components in `/Users/curryyao/Desktop/trantornotes/styles.css`:

- Cards: `card`, `card-section`, `card-interactive`.
- Buttons: `btn`, `btn-primary`, `btn-secondary`, `btn-ghost`, `btn-link`, `btn-sm`.
- Badges: `badge`, `badge-neutral`, `badge-accent`.
- Alerts: `alert`, `alert-info`, `alert-success`, `alert-danger`.
- Modal primitives: `modal`, `modal-backdrop`, `modal-panel`.
- Form primitives: `form-grid`, `form-field`, `form-label`, `input`, `select`, `textarea`, `form-hint`.
- Table primitives: `table-wrap`, `table`.

## Phase 4: Page Refactoring

Refactors applied:

- Removed static inline styles from `/Users/curryyao/Desktop/trantornotes/book.html`.
- Replaced inline styling with utility/component classes (`card-section`, spacing/text utilities, button-link styles).
- Updated library card rendering in `/Users/curryyao/Desktop/trantornotes/main.js` to use component classes (`btn`, `badge-*`, `card-interactive`) consistently.
- Preserved runtime inline behavior where necessary (none required after this pass).
