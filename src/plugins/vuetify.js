// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { aliases, fa } from 'vuetify/iconsets/fa'
import '@fortawesome/fontawesome-free/css/all.css' // Ensure your project is capable 
// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
})
