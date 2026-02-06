import React from "https://esm.sh/react@18.2.0";
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import { Moon, Sun } from "https://esm.sh/lucide-react@0.468.0";

const THEME_KEY = "trantor-theme";
const DEFAULT_THEME = "dark";
const MARKDOWN_FILE = "./The%20Wolf%20of%20Investing.md";

const html = document.documentElement;
const article = document.getElementById("bookArticle");
const articleStatus = document.getElementById("articleStatus");
const themeToggleRoot = document.getElementById("themeToggleRoot");

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
}

function getCurrentTheme() {
  return html.getAttribute("data-theme") || DEFAULT_THEME;
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const preferredTheme = savedTheme || DEFAULT_THEME;
  applyTheme(preferredTheme);
}

function ThemeSwitcher() {
  const [theme, setTheme] = React.useState(getCurrentTheme());

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
    setTheme(nextTheme);
  }

  const isDark = theme === "dark";
  const icon = isDark
    ? React.createElement(Sun, { size: 16, "aria-hidden": true })
    : React.createElement(Moon, { size: 16, "aria-hidden": true });

  return React.createElement(
    "button",
    {
      className: "theme-toggle-button",
      type: "button",
      onClick: toggleTheme,
      "aria-label": isDark ? "Switch to light mode" : "Switch to dark mode"
    },
    React.createElement("span", { className: "theme-toggle-icon" }, icon),
    React.createElement(
      "span",
      { className: "theme-toggle-text" },
      isDark ? "LIGHT" : "DARK"
    )
  );
}

function mountThemeToggle() {
  if (!themeToggleRoot) {
    return;
  }
  const root = createRoot(themeToggleRoot);
  root.render(React.createElement(ThemeSwitcher));
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
mountThemeToggle();
renderBookSummary();
