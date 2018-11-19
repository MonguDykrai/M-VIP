import Vue from 'vue'
import VueRouter from 'vue-router'

import Register from '../components/Register'
import UserFav from '../components/UserFav'

Vue.use(VueRouter)

const routes = [
  { path: '/register', component: Register },
  { path: '/user-fav', component: UserFav }
]

export const router = new VueRouter({
  mode: 'history',
  routes
})