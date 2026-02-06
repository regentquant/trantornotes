const THEME_KEY = "trantor-theme";
const DEFAULT_THEME = "dark";

const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const article = document.getElementById("bookArticle");
const articleStatus = document.getElementById("articleStatus");

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "LIGHT" : "DARK";
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const preferredTheme = savedTheme || DEFAULT_THEME;
  applyTheme(preferredTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const activeTheme = html.getAttribute("data-theme");
      const nextTheme = activeTheme === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  }
}

function showError(message) {
  if (!articleStatus) {
    return;
  }
  articleStatus.classList.remove("alert-info");
  articleStatus.classList.add("alert-danger");
  articleStatus.innerHTML = `<span>${message}</span>`;
}

function clearStatus() {
  if (articleStatus) {
    articleStatus.remove();
  }
}

async function renderBookSummary(markdownFile) {
  try {
    const response = await fetch(markdownFile, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Unable to read markdown file (HTTP ${response.status}).`);
    }

    const markdown = await response.text();

    if (window.marked && typeof window.marked.parse === "function") {
      window.marked.setOptions({
        gfm: true,
        breaks: false
      });
      article.innerHTML = window.marked.parse(markdown);
    } else {
      article.innerHTML = `<pre>${markdown}</pre>`;
    }

    clearStatus();
  } catch (error) {
    showError(error instanceof Error ? error.message : String(error));
  }
}

initTheme();

if (article && articleStatus) {
  const markdownFile =
    article.getAttribute("data-markdown-source") ||
    "./The%20Wolf%20of%20Investing.md";
  renderBookSummary(markdownFile);
}
