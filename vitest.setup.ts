mimport { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { config } from '@vue/test-utils'
import { vi } from 'vitest' 

// 1. Inicializa o Vuetify
const vuetify = createVuetify({
  components,
  directives,
})

// 2. Disponibiliza o Vuetify globalmente para o @vue/test-utils
// Isso garante que todos os componentes 'v-*' sejam renderizados
config.global.plugins = [vuetify]

// 3. Mock (Dublê) do SweetAlert2
// Não queremos que pop-ups reais apareçam durante os testes
// vi.fn() é um "espião" que veremos se foi chamado
vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(), 
  },
}))

// 4. Mock da diretiva v-mask
// Apenas dizemos ao Vue para ignorá-la durante os testes
config.global.directives = {
  mask: () => {}, 
}