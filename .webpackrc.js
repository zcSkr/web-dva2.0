import { resolve } from 'path';

export default {
  "entry": "src/index.js",
  "publicPath": "/",
  "extraBabelPlugins": [
    "transform-decorators-legacy",
    "transform-class-properties",
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }],
  ],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  },
  "alias": {
    src: resolve(__dirname, 'src'),
    routes: resolve(__dirname, "src/routes"),
    components: resolve(__dirname, "src/components"),
    models: resolve(__dirname, "src/models"),
    services: resolve(__dirname, "src/services"),
    config: resolve(__dirname, "src/config"),
    assets: resolve(__dirname, "src/assets"),
    common: resolve(__dirname, "src/common"),
    utils: resolve(__dirname, "src/utils"),
  },
  "hash": false,
  "disableCSSModules": false,
  "ignoreMomentLocale": true,
  "urlLoaderExcludes": [
    /\.svg$/,
  ]
}
