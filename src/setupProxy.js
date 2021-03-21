const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://gorest.co.in",
      changeOrigin: true,
      secure: false,
      logLevel: "debug",
      pathRewrite: {
        "^/api": ""
      }
    })
  );
};
