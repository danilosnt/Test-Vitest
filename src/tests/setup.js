import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { config } from '@vue/test-utils'

const vuetify = createVuetify({ components, directives })

config.global.plugins = [vuetify]
