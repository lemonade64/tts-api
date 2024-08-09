const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  latex: true,
  flexsearch: {
    codeblock: false,
  },
});

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["text2wav"],
    outputFileTracingIncludes: {
      "/api/**/*": ["./node_modules/**/*.wasm", "./node_modules/**/*.proto"],
    },
  },
};

module.exports = withNextra(nextConfig);
