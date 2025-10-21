module.exports = {
  "/api/": {
    target: "https://poetrydb.org",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, "")
  }
}