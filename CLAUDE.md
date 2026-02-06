# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Trantor Notes is a static book summary site. No build tools, no frameworks — just HTML, CSS, vanilla JS, and markdown rendered client-side via marked.js. Deployed to GitHub Pages via GitHub Actions.

## Development

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

No npm, no bundler, no dependencies to install. The detail pages load marked.js from CDN for markdown rendering.

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml`, which copies specific files into `_site/` and deploys to GitHub Pages. **Important:** The deploy script explicitly lists files to copy — when adding a new book, the workflow must be updated to include the new markdown file.

## Architecture

- `index.html` — Homepage with book grid
- `notes/<book-slug>.html` — Detail pages that fetch and render markdown via marked.js
- `styles.css` — Full design system using CSS custom properties (light/dark theme)
- `main.js` — Theme toggle (localStorage persistence) + markdown fetch/render
- `books/` — Source EPUBs and extracted .txt files (not deployed)
- `summaries/` — Markdown summaries (not deployed; the deployed copy lives at root)
- `BOOK_PROMPT.md` — The extraction template all summaries must follow (5-section structure)
- `epub_to_txt.py` — Standalone Python 3 script to extract EPUB to plain text (stdlib only)

## Adding a New Book

1. Place EPUB in `books/`, extract text: `python3 epub_to_txt.py "books/Title.epub"`
2. Write summary markdown following the 5-section format in `BOOK_PROMPT.md` (Core Thesis, Mental Models, High-Signal Insights, First Principles Logic Chain, What to Ignore)
3. Save markdown at root level (e.g., `Title.md`) — this is what gets deployed and fetched by the detail page
4. Copy `notes/the-wolf-of-investing.html` as a template, update: title, meta description, author, description text, and `data-markdown-source` attribute pointing to the markdown file
5. Add a card to `index.html` inside `.book-grid` with badge number, title, description, author, and link
6. Update `.github/workflows/deploy.yml` to include the new markdown file in the `cp` commands

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
