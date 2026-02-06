const THEME_KEY = "trantor-theme";
const DEFAULT_THEME = "light";

const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  if (themeToggle) {
    themeToggle.innerHTML = theme === "dark" ? "&#9788;" : "&#9789;";
    themeToggle.setAttribute("aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(savedTheme || DEFAULT_THEME);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = html.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }
}

async function fetchBooks() {
  const response = await fetch("./books.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to load book registry.");
  }
  return response.json();
}

function renderBookGrid(books) {
  const grid = document.getElementById("bookGrid");
  if (!grid) return;

  grid.innerHTML = books.map((book, i) => `
    <article class="card book-card">
      <div>
        <span class="badge">Book ${String(i + 1).padStart(2, "0")}</span>
      </div>
      <h3 class="book-card-title">${book.title}</h3>
      <p class="book-card-description">${book.description}</p>
      <div class="book-card-footer">
        <span class="book-card-meta">${book.author}</span>
        <a class="btn-read" href="./book.html?id=${book.id}">Read Summary</a>
      </div>
    </article>
  `).join("");
}

async function renderBookPage() {
  const metaContent = document.getElementById("bookMetaContent");
  const metaLoading = document.getElementById("bookMetaLoading");
  const summarySection = document.getElementById("bookSummarySection");
  const article = document.getElementById("bookArticle");
  const articleStatus = document.getElementById("articleStatus");

  const bookId = new URLSearchParams(window.location.search).get("id");
  if (!bookId) {
    metaLoading.classList.add("alert-danger");
    metaLoading.innerHTML = "<span>No book specified.</span>";
    return;
  }

  try {
    const books = await fetchBooks();
    const book = books.find(b => b.id === bookId);

    if (!book) {
      metaLoading.classList.add("alert-danger");
      metaLoading.innerHTML = "<span>Book not found.</span>";
      return;
    }

    document.title = `Trantor Notes | ${book.title}`;
    document.querySelector('meta[name="description"]').content =
      `Summary of ${book.title} on Trantor Notes.`;

    document.getElementById("bookTitle").textContent = book.title;
    document.getElementById("bookAuthor").textContent = book.author;
    document.getElementById("bookDescription").textContent = book.description;

    const mdPath = `./books/${encodeURIComponent(book.file)}`;
    document.getElementById("bookMarkdownLink").href = mdPath;

    metaLoading.remove();
    metaContent.classList.remove("hidden");
    summarySection.classList.remove("hidden");

    const response = await fetch(mdPath, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Unable to load summary (HTTP ${response.status}).`);
    }

    const markdown = await response.text();

    if (window.marked && typeof window.marked.parse === "function") {
      window.marked.setOptions({ gfm: true, breaks: false });
      article.innerHTML = window.marked.parse(markdown);
    } else {
      article.innerHTML = `<pre>${markdown}</pre>`;
    }

    if (articleStatus) articleStatus.remove();
  } catch (error) {
    if (articleStatus) {
      articleStatus.classList.add("alert-danger");
      articleStatus.innerHTML = `<span>${error.message}</span>`;
    }
  }
}

initTheme();

if (document.getElementById("bookGrid")) {
  fetchBooks().then(renderBookGrid).catch(() => {
    const grid = document.getElementById("bookGrid");
    grid.innerHTML = '<p class="text-secondary">Unable to load books.</p>';
  });
}

if (document.getElementById("bookArticle")) {
  renderBookPage();
}
