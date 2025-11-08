import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    // O vuetify precisa ser configurado para funcionar nos testes
    vuetify({ autoImport: true }),
  ],
  test: {
    // Configura o ambiente de DOM (o "navegador falso")
    environment: 'happy-dom',

    // Arquivo de setup para inicializar o Vuetify antes de cada teste
    setupFiles: ['./vitest.setup.ts'],

    // Para usar 'describe', 'it', 'expect' globalmente
    globals: true, 

    // Configuração extra para o Vuetify
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
  },
})