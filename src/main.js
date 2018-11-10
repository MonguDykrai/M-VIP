import Vue from 'vue'
import App from './App.vue'
import { router } from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import tools from './assets/js/tools'

import './assets/css/common-reset.css'
import './assets/css/form-reset.css'

library.add(faTimes)
library.add(faTimesCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.prototype.$tools = tools

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
