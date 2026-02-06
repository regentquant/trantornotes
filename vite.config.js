const { defineConfig } = require("vite");
const { resolve } = require("path");

module.exports = defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        book: resolve(__dirname, "book.html")
      }
    }
  }
});
