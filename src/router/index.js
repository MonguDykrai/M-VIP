import Vue from 'vue'
import VueRouter from 'vue-router'

import Register from '../components/Register'

Vue.use(VueRouter)

const routes = [
  { path: '/register', component: Register }
]

export const router = new VueRouter({
  mode: 'history',
  routes
})