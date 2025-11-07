import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import VueTheMask from 'vue-the-mask'



import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueTheMask)
}
