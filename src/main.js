import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import { createPinia } from 'pinia'
loadFonts()
const pinia = createPinia()

// install plugin
createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')
