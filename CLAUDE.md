# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Trantor Notes is a static book summary site. No build tools, no frameworks — just HTML, CSS, vanilla JS, and markdown rendered client-side via marked.js. Deployed to GitHub Pages via GitHub Actions.

## Development

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

No npm, no bundler, no dependencies to install. `book.html` loads marked.js from CDN for markdown rendering.

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml`, which copies static files + the `books/` directory into `_site/` and deploys to GitHub Pages. No per-book deploy config needed.

## Architecture

- `index.html` — Homepage, renders book grid dynamically from the `BOOKS` array in `main.js`
- `book.html` — Single detail template for all books, reads `?id=slug` from URL
- `books/` — Markdown summaries (deployed), EPUBs and extracted `.txt` files
- `styles.css` — Design system using CSS custom properties (light/dark theme)
- `main.js` — Book registry (`BOOKS` array), theme toggle, grid rendering, detail page rendering
- `tools/epub_to_txt.py` — Standalone Python 3 script to extract EPUB to plain text (stdlib only)
- `BOOK_PROMPT.md` — The extraction template all summaries must follow (5-section structure)

## Adding a New Book

1. Add an entry to the `BOOKS` array in `main.js` with `id`, `title`, `author`, `description`, and `file`
2. Place the summary `.md` file in `books/` (filename must match the `file` field)

That's it. The index grid and detail page render dynamically from the registry. No HTML editing or deploy config changes needed.

To extract text from an EPUB first: `python3 tools/epub_to_txt.py "books/Title.epub"`

## Styling Conventions

- CSS custom properties defined in `:root` and `[data-theme="dark"]` — change colors there, not inline
- Accent color is warm rust (`--accent`); don't introduce additional accent color families
- Headings use serif font (`--font-serif`), body uses sans-serif (`--font-body`)
- Component classes: `card`, `book-card`, `book-card-title`, `book-card-meta`, `book-card-description`, `btn-read`, `back-link`, `badge`, `section-label`
- Mobile breakpoint: 768px

## Workflow Rule

After every code change, commit all modified files and push to `main`. This triggers the GitHub Actions deploy pipeline automatically.

## Theme Toggle

`main.js` handles light/dark switching. Default is light. Persisted in localStorage under key `"trantor-theme"`. The toggle button uses sun/moon HTML entities.
