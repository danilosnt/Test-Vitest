// Plugins
import Components from "unplugin-vue-components/vite";
import Vue from "@vitejs/plugin-vue";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import ViteFonts from "unplugin-fonts/vite";
import Layouts from "vite-plugin-vue-layouts";
import VueRouter from "unplugin-vue-router/vite";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    Layouts(),
    Vue({
      template: { transformAssetUrls },
    }),
    // ==================================================================
    // CORREÇÃO AQUI: Nós removemos a opção 'styles'
    // ==================================================================
    Vuetify({
      autoImport: true,
      // styles: { ... } FOI REMOVIDO DAQUI
    }),
    Components(),
    ViteFonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3000,
  },
  // ==================================================================
  // CORREÇÃO AQUI: Adicionamos esta seção para injetar o SASS
  // ==================================================================
  css: {
    preprocessorOptions: {
      scss: {
        // Importa seu arquivo de settings globalmente em todos os componentes
        // Use o alias '@' que você já definiu
        additionalData: `@import "@/styles/settings.scss";`,
      },
    },
  },
});