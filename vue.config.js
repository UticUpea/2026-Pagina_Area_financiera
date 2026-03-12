const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        crypto: false,
        util: require.resolve("util/"), // <-- Agregado para cryptr
      },
    },
  },
});
