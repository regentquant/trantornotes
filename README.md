# Trantor Notes

Trantor Notes is a compact reading journal site for book notes and summaries.

## Local development

Run:

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
```

Build output is generated in `dist/` and includes all markdown files under `books/`.

## Deployment

GitHub Actions deploys the static site to GitHub Pages using:

- `.github/workflows/deploy.yml`

After pushing to `main`, enable Pages in repository settings and set **Build and deployment** source to **GitHub Actions**.
