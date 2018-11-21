import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import { store } from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './assets/css/icon/font_ff0jo8dryy7/iconfont.css'

import tools from './assets/js/tools'

import './assets/css/common-reset.css'
import './assets/css/form-reset.css'

library.add(faTimes)
library.add(faTimesCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.prototype.$_m_tools = tools // [Private property names] style guide

new Vue({
  el: '#app',
  router, // routing
  store,
  components: { App },
  template: '<App/>'
})
