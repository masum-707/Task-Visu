"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const node_url_1 = require("node:url");
exports.default = (0, vite_1.defineConfig)({
  resolve: {
    alias: {
      "@": (0, node_url_1.fileURLToPath)(
        new node_url_1.URL("./ts", import.meta.url),
      ),
    },
  },
});
