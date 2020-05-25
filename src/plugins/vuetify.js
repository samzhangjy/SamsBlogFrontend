/* Vuetify initialization */
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// The MD icon
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'md'
  },
  theme: {
    dark: false
  }
})
