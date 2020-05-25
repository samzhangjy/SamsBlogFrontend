import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store/store'
import { sync } from 'vuex-router-sync'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueCookies from 'vue-cookies'
import 'highlight.js/styles/atom-one-dark.css'
import Highlight from 'vue-markdown-highlight'
import VueMoment from 'vue-moment'

const moment = require('moment')
require('moment/locale/zh-cn')

Vue.use(Highlight)
Vue.use(VueCookies)
Vue.use(mavonEditor)
Vue.use(VueMoment, { moment })

Vue.$cookies.config('7d')

sync(store, router)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
