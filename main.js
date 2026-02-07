const THEME_KEY = "trantor-theme";
const LANGUAGE_KEY = "trantor-language";
const DEFAULT_THEME = "light";
const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = ["en", "zh"];

const BOOKS = [
  {
    id: "the-wolf-of-investing",
    title: "The Wolf of Investing",
    author: "Jordan Belfort",
    publicationLanguage: "en",
    fileBase: "The Wolf of Investing",
    descriptions: {
      en: "Jordan Belfort's guide to low-fee indexing, compounding, and long-horizon portfolio discipline.",
      zh: "乔丹·贝尔福特关于低费率指数投资、复利增长与长期持有纪律的实战框架。"
    }
  },
  {
    id: "the-intelligent-investor",
    title: "The Intelligent Investor, 3rd Ed.",
    author: "Benjamin Graham",
    publicationLanguage: "en",
    fileBase: "The Intelligent Investor, 3rd Ed.",
    descriptions: {
      en: "Benjamin Graham's case that temperamental discipline and margin of safety matter more than intelligence for long-term investment success.",
      zh: "本杰明·格雷厄姆强调：长期投资胜负不在聪明，而在性格纪律与安全边际。"
    }
  },
  {
    id: "xiaodao-jingjixue",
    title: "小岛经济学",
    author: "Peter Schiff & Andrew Schiff",
    publicationLanguage: "zh",
    fileBase: "小岛经济学",
    descriptions: {
      en: "A parable-driven argument that sustainable prosperity comes from savings, production, and capital investment.",
      zh: "用寓言解释经济增长：储蓄与生产才是繁荣根源，货币超发只会制造繁荣幻象。"
    }
  }
];

const UI_COPY = {
  en: {
    controls: {
      switchToLight: "Switch to light mode",
      switchToDark: "Switch to dark mode",
      switchLanguage: "Switch language"
    },
    home: {
      pageTitle: "Trantor Notes | The Source Code of Great Books",
      pageDescription:
        "Trantor Notes extracts the mental models, logic chains, and actionable frameworks from non-fiction books — and deletes the rest.",
      heroHeadline: "The Source Code of Great Books.",
      heroSub:
        "Most non-fiction is 90% filler and 10% insight. We remove the anecdotes, repetition, and padding so you can run the core logic directly.",
      exploreCta: "Explore the Library",
      howItWorksCta: "See how it works",
      contrastBookLabel: "The Book",
      contrastBookDetail:
        "300 pages. Anecdotes, repetition, publisher mandates, and the author's third story about a childhood dog.",
      contrastNoteLabel: "The Trantor Note",
      contrastNoteDetail:
        "Mental models, first-principle logic chains, actionable frameworks, and counter-intuitive data points.",
      contrastClosing:
        "You wouldn't read an app's binary code to use it. Reading should work the same way.",
      pillarSignalTitle: "Signal Only",
      pillarSignalText:
        "No retelling. No fluff. We keep only unique insights, non-obvious facts, and ideas you can apply.",
      pillarFirstTitle: "First Principles",
      pillarFirstText:
        "We rebuild the argument premise by premise, so you understand why it works, not only what to do.",
      pillarActionTitle: "Actionable Output",
      pillarActionText:
        "Each note follows one strict structure: Core Thesis, Mental Models, High-Signal Insights, Logic Chain, and What to Ignore.",
      protocolLabel: "Our Protocol",
      protocolQuote:
        "We treat non-fiction books as cognitive software packages: strip the packaging, keep the executable code.",
      protocolText:
        "Others retell a story in 15 minutes. We deliver the logic tree and decisive data points. If a chapter is filler, we tell you to skip it.",
      libraryLabel: "Library",
      libraryTitle: "Published Notes",
      footerTagline: "Signal extracted. Noise deleted."
    },
    book: {
      pageTitlePrefix: "Trantor Notes | ",
      pageDescriptionPrefix: "Summary of ",
      pageDescriptionSuffix: " on Trantor Notes.",
      headerSubtitle: "Book details and full summary.",
      backToLibrary: "Back to Library",
      summaryLabel: "Summary",
      viewMarkdown: "View Markdown",
      loadingBook: "Loading book...",
      loadingSummary: "Loading summary...",
      summaryLanguageAria: "Summary language",
      authorPrefix: "Author: ",
      publicationPrefix: "Published language: ",
      languageEn: "English",
      languageZh: "Chinese",
      footerTagline: "Focus on signal, not noise.",
      noBookSpecified: "No book specified.",
      bookNotFound: "Book not found.",
      fileProtocolError:
        "Cannot load summary from file:// — run <code>npm run dev</code> and open the local URL.",
      summaryVersionMissing: "No {language} summary file is available for this book yet.",
      summaryLoadFailed:
        "Unable to load summary. Please ensure the dev server is running with <code>npm run dev</code>."
    },
    labels: {
      book: "Book",
      publicationBadgePrefix: "Original",
      readSummary: "Read Summary"
    }
  },
  zh: {
    controls: {
      switchToLight: "切换到浅色模式",
      switchToDark: "切换到深色模式",
      switchLanguage: "切换网站语言"
    },
    home: {
      pageTitle: "Trantor Notes | 伟大书籍的源代码",
      pageDescription:
        "Trantor Notes 从非虚构书中抽取心智模型、推理链与可执行框架，删除冗余噪音。",
      heroHeadline: "伟大书籍的源代码。",
      heroSub:
        "大多数非虚构作品里，真正有用的往往只有一小部分。我们去掉铺垫、重复和叙事包装，只留下能直接执行的核心逻辑。",
      exploreCta: "浏览书库",
      howItWorksCta: "看看我们怎么做",
      contrastBookLabel: "原书",
      contrastBookDetail:
        "300 页里常常混着故事、重复、出版包装，以及作者第三次讲童年往事。",
      contrastNoteLabel: "Trantor 笔记",
      contrastNoteDetail:
        "只保留思维模型、第一性原理推导、可执行框架和反直觉数据点。",
      contrastClosing:
        "你不会为了用一个 App 去读它的二进制代码，读书也应该如此。",
      pillarSignalTitle: "只留高信号",
      pillarSignalText:
        "不复述、不注水。我们只保留真正稀缺、可迁移、可执行的关键信息。",
      pillarFirstTitle: "回到第一性原理",
      pillarFirstText:
        "我们按前提逐层重建作者论证，让你看懂“为什么成立”，而不只是“该做什么”。",
      pillarActionTitle: "直接可执行",
      pillarActionText:
        "每篇笔记都遵循固定五段：核心论点、思维模型、高信号洞察、逻辑链、可忽略内容。",
      protocolLabel: "我们的方法",
      protocolQuote:
        "我们把非虚构书当成“认知软件包”：先拆包装，再交付可执行代码。",
      protocolText:
        "别人追求 15 分钟复述故事，我们交付逻辑树和关键证据。凡是注水章节，会直接告诉你跳过。",
      libraryLabel: "书库",
      libraryTitle: "Published Notes",
      footerTagline: "提取信号，删除噪音。"
    },
    book: {
      pageTitlePrefix: "Trantor Notes | ",
      pageDescriptionPrefix: "Trantor Notes 上《",
      pageDescriptionSuffix: "》的摘要。",
      headerSubtitle: "书籍信息与完整摘要。",
      backToLibrary: "返回书库",
      summaryLabel: "摘要",
      viewMarkdown: "查看 Markdown",
      loadingBook: "正在加载书籍信息...",
      loadingSummary: "正在加载摘要内容...",
      summaryLanguageAria: "摘要语言",
      authorPrefix: "作者：",
      publicationPrefix: "原始出版语言：",
      languageEn: "英文",
      languageZh: "中文",
      footerTagline: "聚焦信号，忽略噪音。",
      noBookSpecified: "未指定书籍。",
      bookNotFound: "未找到这本书。",
      fileProtocolError:
        "无法通过 file:// 加载摘要，请运行 <code>npm run dev</code> 后再访问。",
      summaryVersionMissing: "当前没有该书的 {language} 版本摘要。",
      summaryLoadFailed: "摘要加载失败，请确认已运行 <code>npm run dev</code>。"
    },
    labels: {
      book: "第",
      publicationBadgePrefix: "原文",
      readSummary: "阅读摘要"
    }
  }
};

const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const languageToggle = document.getElementById("languageToggle");

let uiLanguage = normalizeLanguage(readStorage(LANGUAGE_KEY));
let activeBook = null;
let currentSummaryLanguage = uiLanguage;
let summaryLoadToken = 0;

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Storage can fail in privacy contexts; safely ignore.
  }
}

function normalizeLanguage(language) {
  return SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
}

function getCopy(language = uiLanguage) {
  return UI_COPY[language] || UI_COPY[DEFAULT_LANGUAGE];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setText(id, text) {
  const node = document.getElementById(id);
  if (!node) return;
  node.textContent = text;
}

function setHtml(id, htmlString) {
  const node = document.getElementById(id);
  if (!node) return;
  node.innerHTML = htmlString;
}

function setMetaDescription(content) {
  const meta = document.querySelector('meta[name="description"]');
  if (!meta) return;
  meta.setAttribute("content", content);
}

function localizePublicationLanguage(language) {
  const copy = getCopy();
  return language === "zh" ? copy.book.languageZh : copy.book.languageEn;
}

function getBookMarkdownPath(book, language) {
  const suffix = normalizeLanguage(language);
  return `./books/${encodeURIComponent(`${book.fileBase}-${suffix}.md`)}`;
}

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  html.setAttribute("data-theme", nextTheme);

  if (!themeToggle) return;

  const copy = getCopy();
  themeToggle.innerHTML = nextTheme === "dark" ? "&#9788;" : "&#9789;";
  themeToggle.setAttribute(
    "aria-label",
    nextTheme === "dark" ? copy.controls.switchToLight : copy.controls.switchToDark
  );
}

function initTheme() {
  const savedTheme = readStorage(THEME_KEY);
  applyTheme(savedTheme || DEFAULT_THEME);

  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    writeStorage(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  });
}

function applyHomeCopy() {
  const copy = getCopy();
  document.title = copy.home.pageTitle;
  setMetaDescription(copy.home.pageDescription);

  setText("homeHeroHeadline", copy.home.heroHeadline);
  setText("homeHeroSub", copy.home.heroSub);
  setText("homeExploreCta", copy.home.exploreCta);
  setText("homeHowItWorksCta", copy.home.howItWorksCta);

  setText("homeContrastBookLabel", copy.home.contrastBookLabel);
  setText("homeContrastBookDetail", copy.home.contrastBookDetail);
  setText("homeContrastNoteLabel", copy.home.contrastNoteLabel);
  setText("homeContrastNoteDetail", copy.home.contrastNoteDetail);
  setText("homeContrastClosing", copy.home.contrastClosing);

  setText("homePillarSignalTitle", copy.home.pillarSignalTitle);
  setText("homePillarSignalText", copy.home.pillarSignalText);
  setText("homePillarFirstTitle", copy.home.pillarFirstTitle);
  setText("homePillarFirstText", copy.home.pillarFirstText);
  setText("homePillarActionTitle", copy.home.pillarActionTitle);
  setText("homePillarActionText", copy.home.pillarActionText);

  setText("homeProtocolLabel", copy.home.protocolLabel);
  setText("homeProtocolQuote", copy.home.protocolQuote);
  setText("homeProtocolText", copy.home.protocolText);

  setText("homeLibraryLabel", copy.home.libraryLabel);
  setText("homeLibraryTitle", copy.home.libraryTitle);
  setText("homeFooterTagline", copy.home.footerTagline);
}

function applyBookPageCopy() {
  const copy = getCopy();

  setText("bookPageSubtitle", copy.book.headerSubtitle);
  setText("bookBackLink", copy.book.backToLibrary);
  setText("bookSummaryLabel", copy.book.summaryLabel);
  setText("bookMarkdownLink", copy.book.viewMarkdown);
  setText("bookMetaLoadingText", copy.book.loadingBook);
  setText("articleStatusText", copy.book.loadingSummary);
  setText("bookFooterTagline", copy.book.footerTagline);

  const summarySwitcher = document.getElementById("bookSummaryLanguageSwitcher");
  if (summarySwitcher) {
    summarySwitcher.setAttribute("aria-label", copy.book.summaryLanguageAria);
  }

  if (activeBook) {
    renderBookMeta(activeBook);
  }
}

function applyLanguage(language, { persist = true } = {}) {
  uiLanguage = normalizeLanguage(language);
  html.setAttribute("lang", uiLanguage === "zh" ? "zh-CN" : "en");

  if (persist) {
    writeStorage(LANGUAGE_KEY, uiLanguage);
  }

  if (languageToggle) {
    const copy = getCopy();
    languageToggle.innerHTML = "&#127760;";
    languageToggle.setAttribute("aria-label", copy.controls.switchLanguage);
    languageToggle.setAttribute("title", copy.controls.switchLanguage);
  }

  if (document.getElementById("bookGrid")) {
    applyHomeCopy();
    renderBookGrid();
  }

  if (document.getElementById("bookArticle")) {
    applyBookPageCopy();
    if (activeBook) {
      loadBookSummary(activeBook, uiLanguage);
    }
  }

  const activeTheme = html.getAttribute("data-theme") || DEFAULT_THEME;
  applyTheme(activeTheme);
}

function initLanguage() {
  applyLanguage(readStorage(LANGUAGE_KEY), { persist: false });

  if (!languageToggle) return;

  languageToggle.addEventListener("click", () => {
    const nextLanguage = uiLanguage === "zh" ? "en" : "zh";
    applyLanguage(nextLanguage, { persist: true });
  });
}

function renderBookGrid() {
  const grid = document.getElementById("bookGrid");
  if (!grid) return;

  const copy = getCopy();

  grid.innerHTML = BOOKS.map((book, index) => {
    const description = book.descriptions[uiLanguage] || book.descriptions.en;
    const bookNumber = String(index + 1).padStart(2, "0");
    const numberBadge = uiLanguage === "zh"
      ? `${copy.labels.book}${bookNumber}本`
      : `${copy.labels.book} ${bookNumber}`;
    const publicationBadge = `${copy.labels.publicationBadgePrefix} ${book.publicationLanguage.toUpperCase()}`;

    return `
      <article class="card card-interactive book-card">
        <div class="u-flex u-wrap u-gap-2 u-mb-3">
          <span class="badge badge-neutral">${escapeHtml(numberBadge)}</span>
          <span class="badge badge-accent">${escapeHtml(publicationBadge)}</span>
        </div>
        <h3 class="book-card-title">${escapeHtml(book.title)}</h3>
        <p class="book-card-description">${escapeHtml(description)}</p>
        <div class="book-card-footer">
          <span class="book-card-meta">${escapeHtml(book.author)}</span>
          <a class="btn btn-primary btn-sm" href="./book.html?id=${encodeURIComponent(book.id)}" target="_blank">${escapeHtml(copy.labels.readSummary)}</a>
        </div>
      </article>
    `;
  }).join("");
}

function showStatus(statusElement, { type = "info", message = "", spinner = false, allowHtml = false }) {
  if (!statusElement) return;

  statusElement.classList.remove("hidden", "alert-danger", "alert-success", "alert-info");

  if (type === "danger") {
    statusElement.classList.add("alert-danger");
  } else if (type === "success") {
    statusElement.classList.add("alert-success");
  } else {
    statusElement.classList.add("alert-info");
  }

  const messageHtml = allowHtml ? message : escapeHtml(message);
  statusElement.innerHTML = `${spinner ? '<span class="spinner" aria-hidden="true"></span>' : ""}<span>${messageHtml}</span>`;
}

function hideStatus(statusElement) {
  if (!statusElement) return;
  statusElement.classList.add("hidden");
}

function renderBookMeta(book) {
  const copy = getCopy();
  document.title = `${copy.book.pageTitlePrefix}${book.title}`;
  setMetaDescription(`${copy.book.pageDescriptionPrefix}${book.title}${copy.book.pageDescriptionSuffix}`);

  setText("bookTitle", book.title);
  setText("bookAuthor", `${copy.book.authorPrefix}${book.author}`);
  setText(
    "bookPublication",
    `${copy.book.publicationPrefix}${localizePublicationLanguage(book.publicationLanguage)}`
  );
  setText("bookDescription", book.descriptions[uiLanguage] || book.descriptions.en);
}

function setSummaryLanguageButtons(language) {
  const normalized = normalizeLanguage(language);
  const enButton = document.getElementById("summaryLangEn");
  const zhButton = document.getElementById("summaryLangZh");

  if (enButton) {
    enButton.classList.toggle("is-active", normalized === "en");
    enButton.setAttribute("aria-pressed", normalized === "en" ? "true" : "false");
  }

  if (zhButton) {
    zhButton.classList.toggle("is-active", normalized === "zh");
    zhButton.setAttribute("aria-pressed", normalized === "zh" ? "true" : "false");
  }
}

function getLanguageLabel(language) {
  return language === "zh" ? getCopy().book.languageZh : getCopy().book.languageEn;
}

async function loadBookSummary(book, language) {
  const article = document.getElementById("bookArticle");
  const articleStatus = document.getElementById("articleStatus");
  const markdownLink = document.getElementById("bookMarkdownLink");
  if (!article || !articleStatus || !markdownLink) return;

  currentSummaryLanguage = normalizeLanguage(language);
  setSummaryLanguageButtons(currentSummaryLanguage);

  const copy = getCopy();
  const markdownPath = getBookMarkdownPath(book, currentSummaryLanguage);
  markdownLink.href = markdownPath;

  if (window.location.protocol === "file:") {
    showStatus(articleStatus, {
      type: "danger",
      message: copy.book.fileProtocolError,
      allowHtml: true
    });
    article.innerHTML = "";
    return;
  }

  showStatus(articleStatus, {
    type: "info",
    message: copy.book.loadingSummary,
    spinner: true
  });

  const currentToken = ++summaryLoadToken;

  try {
    const response = await fetch(markdownPath);
    if (currentToken !== summaryLoadToken) return;

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("missing-summary-version");
      }
      throw new Error(`summary-http-${response.status}`);
    }

    const markdown = await response.text();
    if (currentToken !== summaryLoadToken) return;

    if (window.marked && typeof window.marked.parse === "function") {
      window.marked.setOptions({ gfm: true, breaks: false });
      article.innerHTML = window.marked.parse(markdown);
    } else {
      article.textContent = markdown;
    }

    hideStatus(articleStatus);
  } catch (error) {
    if (currentToken !== summaryLoadToken) return;

    const message = error.message === "missing-summary-version"
      ? copy.book.summaryVersionMissing.replace("{language}", getLanguageLabel(currentSummaryLanguage))
      : copy.book.summaryLoadFailed;

    showStatus(articleStatus, {
      type: "danger",
      message,
      allowHtml: true
    });
    article.innerHTML = "";
  }
}

function renderBookPageError(message) {
  const metaLoading = document.getElementById("bookMetaLoading");
  if (!metaLoading) return;

  showStatus(metaLoading, {
    type: "danger",
    message
  });
}

async function renderBookPage() {
  const copy = getCopy();
  const metaContent = document.getElementById("bookMetaContent");
  const metaLoading = document.getElementById("bookMetaLoading");
  const summarySection = document.getElementById("bookSummarySection");

  const rawBookId = new URLSearchParams(window.location.search).get("id");
  const bookId = rawBookId ? decodeURIComponent(rawBookId) : "";

  if (!bookId) {
    renderBookPageError(copy.book.noBookSpecified);
    return;
  }

  const book = BOOKS.find((candidate) => candidate.id === bookId);
  if (!book) {
    renderBookPageError(copy.book.bookNotFound);
    return;
  }

  activeBook = book;
  renderBookMeta(book);

  if (metaLoading) {
    metaLoading.remove();
  }

  if (metaContent) {
    metaContent.classList.remove("hidden");
  }

  if (summarySection) {
    summarySection.classList.remove("hidden");
  }

  const summaryLanguageSwitcher = document.getElementById("bookSummaryLanguageSwitcher");
  if (summaryLanguageSwitcher) {
    summaryLanguageSwitcher.setAttribute("aria-label", getCopy().book.summaryLanguageAria);
  }

  const enButton = document.getElementById("summaryLangEn");
  const zhButton = document.getElementById("summaryLangZh");

  if (enButton) {
    enButton.addEventListener("click", () => {
      if (!activeBook || currentSummaryLanguage === "en") return;
      loadBookSummary(activeBook, "en");
    });
  }

  if (zhButton) {
    zhButton.addEventListener("click", () => {
      if (!activeBook || currentSummaryLanguage === "zh") return;
      loadBookSummary(activeBook, "zh");
    });
  }

  const initialSummaryLanguage = normalizeLanguage(uiLanguage);
  await loadBookSummary(book, initialSummaryLanguage);
}

initLanguage();
initTheme();

if (document.getElementById("bookArticle")) {
  renderBookPage();
}
