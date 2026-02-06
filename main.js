const THEME_KEY = "trantor-theme";
const DEFAULT_THEME = "dark";
const MARKDOWN_FILE = "./The%20Wolf%20of%20Investing.md";

const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const article = document.getElementById("bookArticle");
const articleStatus = document.getElementById("articleStatus");

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "LIGHT" : "DARK";
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const preferredTheme = savedTheme || DEFAULT_THEME;
  applyTheme(preferredTheme);

  themeToggle.addEventListener("click", () => {
    const activeTheme = html.getAttribute("data-theme");
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  });
}

function showError(message) {
  articleStatus.classList.remove("alert-info");
  articleStatus.classList.add("alert-danger");
  articleStatus.innerHTML = `<span>${message}</span>`;
}

function clearStatus() {
  articleStatus.remove();
}

async function renderBookSummary() {
  try {
    const response = await fetch(MARKDOWN_FILE, { cache: "no-store" });
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
    showError(error.message);
  }
}

initTheme();
renderBookSummary();
