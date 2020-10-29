const pxtoviewport = require("postcss-px-to-viewport");
const path = require("path");
module.exports = {
  style: {
    postcss: {
      plugins: [
        pxtoviewport({
          viewportWidth: 375,
        }),
      ],
    },
  },
  webpack: {
    alias: {
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@asset": path.resolve(__dirname, "./src/asset"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
};
