# Design System Reference

Use this document to reproduce the exact visual style of this webapp in new projects.

## Philosophy

- **Minimalist terminal aesthetic** — inspired by Bloomberg/professional trading terminals
- **Utility over decoration** — no shadows, no gradients, no blur effects
- **Compact density** — smaller font sizes, tighter spacing than typical web apps
- **Dual theme** — light and dark mode; dark mode is the primary professional aesthetic
- **Token-driven** — every color, size, and spacing value comes from CSS custom properties

---

## Theming

Themes are toggled via `data-theme="dark"` on `<html>`. Light mode is the default; dark mode overrides all tokens. Colors shift to be more vibrant in dark mode (higher opacity tints, brighter accents).

---

## Color Tokens

### Neutrals

| Token | Light | Dark |
|---|---|---|
| `--system-bg` | `#fafafa` | `#111` |
| `--card-bg` | `#fff` | `#181818` |
| `--text-primary` | `#111` | `#eee` |
| `--text-secondary` | `#666` | `#aaa` |
| `--text-tertiary` | `#999` | `#777` |
| `--separator` | `#ddd` | `#333` |
| `--fill-tertiary` | `#eee` | `#222` |
| `--fill-quaternary` | `#f5f5f5` | `#1a1a1a` |

### Semantic Colors

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--blue-action` | `#007AFF` | `#0A84FF` | Primary action, links |
| `--blue-hover` | `#0066D6` | `#409CFF` | Hover state |
| `--green-safe` | `#34C759` | `#30D158` | Success, safe status |
| `--red-danger` | `#FF3B30` | `#FF453A` | Error, danger |
| `--orange-warning` | `#FF9500` | `#FF9F0A` | Warning |
| `--purple-accent` | `#AF52DE` | `#BF5AF2` | Accent |
| `--pink-accent` | `#FF2D55` | `#FF375F` | Accent |
| `--teal-accent` | `#5AC8FA` | `#64D2FF` | Accent |
| `--indigo-accent` | `#5856D6` | `#5E5CE6` | Accent |

### Tints (Semi-transparent Backgrounds)

Used for badges, alerts, and status indicators. Each semantic color has tint variants:

- **Standard tint**: 12% opacity (light) / 18% opacity (dark) — e.g. `rgba(0, 122, 255, 0.12)`
- **Subtle tint**: 8% opacity (light) / 12% opacity (dark) — for hover/background
- **Strong tint**: 15% opacity (light) / 25% opacity (dark) — for emphasis

Pattern: `--{color}-tint`, `--{color}-tint-subtle`, `--{color}-tint-strong`

---

## Typography

### Font Stacks

```
--font-system: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif
--font-mono:   "SF Mono", SFMono-Regular, ui-monospace, Menlo, Monaco, monospace
```

### Scale (Compact)

| Token | Size | Usage |
|---|---|---|
| `--text-2xs` | 8px | Tiny labels |
| `--text-xs` | 10px | Section titles, uppercase labels |
| `--text-xxs` | 11px | Small captions |
| `--text-sm` | 12px | Card labels, form labels |
| `--text-base` | 13px | Body text (default) |
| `--text-lg` | 14px | Navigation, slightly emphasized text |
| `--text-xl` | 17px | Page titles (h1) |
| `--text-2xl` | 20px | Large headings |
| `--text-3xl` | 24px | Hero metrics |
| `--text-4xl` | 28px | Large display |
| `--text-5xl` | 34px | Largest display |

### Conventions

- Body: 13px, line-height 1.5, `--font-system`
- Page title (h1): 17px, weight 600, letter-spacing -0.02em
- Section labels: 10px, uppercase, weight 700, letter-spacing 0.02em
- Card labels: 12px, uppercase, weight 500
- Numeric data: `font-variant-numeric: tabular-nums` for column alignment
- Monospace for code blocks and data: `--font-mono`

---

## Spacing

8px base grid. All spacing uses CSS custom properties:

| Token | Value |
|---|---|
| `--space-quarter` | 2px |
| `--space-half` | 4px |
| `--space-1-5` | 6px |
| `--space-1` | 8px |
| `--space-2-5` | 10px |
| `--space-2` | 12px |
| `--space-3` | 16px |
| `--space-4` | 24px |
| `--space-5` | 32px |
| `--space-6` | 40px |
| `--space-8` | 56px |

---

## Borders, Radii, Shadows

- **Borders**: `1px solid var(--separator)` everywhere. Clean hairline borders, never thick.
- **Radii**: Minimal, square-ish corners:
  - `--radius-sm` / `--radius-md`: 4px (most elements)
  - `--radius-lg`: 6px (modals, larger cards)
  - `--radius-xl`: 8px
  - `--radius-full`: 999px (pills, badges, toggles)
- **Shadows**: Explicitly set to `none` at all levels. Zero box-shadows anywhere.

---

## Transitions & Animation

```
--apple-ease:      cubic-bezier(0.25, 1, 0.5, 1)   /* Apple-style spring easing */
--duration-fast:   0.15s                              /* Hover, button press */
--duration-normal: 0.3s                               /* Panel transitions */
--duration-slow:   0.5s                               /* Page-level animations */
```

- All transitions use `--apple-ease`
- Hover: background color change only (no lift, no shadow, no scale)
- Active/press: `scale(0.98)` on buttons, `scale(0.92)` on icon buttons
- Loading spinner: 24px circle, 2px border, 0.8s linear infinite rotation

---

## Layout

### Page Structure

```
<header>          Sticky, card-bg, bottom border, z-100
  <header-inner>  900px max-width, flex space-between, title + theme toggle
<main>            900px max-width, flex column, 16px gap, 16px padding
  <section>       Cards and content
<footer>          Centered, tertiary text, 24px padding
```

### Container

- Max-width: **900px** (narrower than typical)
- Centered with `margin: 0 auto`
- Padding: 16px
- Sections spaced with 16px gap

### Grid

- 2-column grid for cards: `grid-template-columns: repeat(2, 1fr)`, gap 8px
- Collapses to 1 column at **768px** (single responsive breakpoint)

---

## Component Patterns

### Card

```
Background: var(--card-bg)
Border: 1px solid var(--separator)
Padding: 12px
Border-radius: 4px
Shadow: none
```

### Button

**Primary**: Full-width, `--blue-action` bg, white text, 14px weight-600. In dark mode: `#333` bg with `#444` border.
**Secondary**: `--fill-tertiary` bg, `--text-primary` color.
**Danger**: `--red-danger` bg, white text.
**Ghost**: Transparent bg, `--blue-action` text.
Sizes: default (10px 12px), small (8px 12px), extra-small (6px 10px), large (14px 24px).
All: no shadow, `--radius-md`, weight 500.

### Segmented Control (Tab Selector)

```
Container: fill-tertiary bg, 2px padding, 2px gap, 4px radius
Segment:   Transparent bg, 13px weight-500, 6px 12px padding
Selected:  card-bg (light) or #333 (dark), no shadow
```

### Badge

Inline-flex, `--radius-full`, 6px 12px padding, 12px weight-600.
Variants use tint bg + semantic color text:
- Primary (blue), Success (green), Warning (orange), Danger (red), Neutral (gray fill)

### Input

```
Background: var(--card-bg)
Border: 1px solid var(--separator)
Padding: 12px
Border-radius: 4px
Focus: blue border, no shadow, no outline
```

### Table

- Width 100%, border-collapse
- Header: uppercase, 10px, weight 600, secondary text color
- Rows: 1px separator bottom border
- Cell padding: 8px vertical, 12px horizontal
- Dark mode: alternating rows at `#141414`

### Modal

```
Overlay:  Fixed, black at 40% (light) / 80% (dark), no blur
Panel:    card-bg, 1px border, 6px radius, 500px max-width, no shadow
Header:   Bottom border, 16px padding
Body:     16px padding, overflow-y auto
Footer:   Top border, flex end, 12px gap between buttons
```

### Alert

Flex row, 12px padding, `--radius-md`, 12px font.
Variants: info (blue tint+text), success (green), warning (orange), danger (red).

### Nav Card (Navigation Item)

```
Flex row, 10px 12px padding, 4px radius, 1px border
Icon box: 28x28px, tinted bg, 16x16 SVG
Title: 13px weight-500
Hover: fill-quaternary bg (no lift, no shadow)
```

### Toggle Switch

```
Track: 51x31px, fill-tertiary bg, full radius
Knob:  27x27px, white, circle, subtle shadow
Active: green-safe bg, knob slides 20px right
```

### Status Badge

Inline-flex, full radius, 6px 12px padding.
Contains 8x8px colored dot + label.
States: ok (green), rebalance (orange), danger (red).

---

## Utility Class System

The design system provides utility classes (not Tailwind, custom):

- **Flex**: `.flex`, `.flex-col`, `.items-center`, `.justify-between`, `.gap-{n}`
- **Spacing**: `.p-{n}`, `.px-{n}`, `.py-{n}`, `.m-{n}`, `.mt-{n}`, `.mb-{n}`, `.mx-auto`
- **Text**: `.text-{size}`, `.text-{color}`, `.font-{weight}`, `.uppercase`, `.truncate`, `.mono`
- **Grid**: `.grid`, `.grid-2`, `.grid-3`, `.grid-4`, `.col-span-{n}`
- **Display**: `.hidden`, `.block`, `.relative`, `.absolute`, `.sticky`
- **Size**: `.w-full`, `.w-auto`, `.size-{n}` (square)
- **Border**: `.border`, `.border-top`, `.border-bottom`, `.rounded`, `.rounded-full`
- **Background**: `.bg-card`, `.bg-system`, `.bg-surface`

Spacing tokens map to class suffixes: `quarter`=2px, `half`=4px, `1`=8px, `2`=12px, `3`=16px, `4`=24px, `5`=32px, `6`=40px.

---

## Key Principles for Reproduction

1. **Use CSS custom properties for everything** — no hardcoded colors or sizes in components
2. **Dark mode = token override** — same HTML, different values via `[data-theme="dark"]` selector
3. **No shadows, ever** — depth is communicated through borders and background color contrast
4. **Compact by default** — 13px body, 12px padding, 4px radius, 8px gaps
5. **Apple-inspired interactions** — spring easing, subtle scale on press, no flashy animations
6. **900px container** — content is intentionally narrow for focused reading
7. **Single breakpoint** — 768px, grids collapse to 1 column, otherwise no responsive scaling
8. **Semantic tints** — status colors always appear as tinted backgrounds + solid text, never solid-color blocks
9. **System fonts only** — no custom web fonts loaded, uses native OS font stack
10. **Tabular nums** — all numeric/financial data uses `font-variant-numeric: tabular-nums`
