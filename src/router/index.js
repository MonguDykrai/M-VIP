import Vue from 'vue'
import VueRouter from 'vue-router'

import Register from '../components/Register'
import UserFavProduct from '../components/UserFavProduct'

Vue.use(VueRouter)

const routes = [
  { path: '/register', component: Register },
  { path: '/user-fav-product', component: UserFavProduct }
]

export const router = new VueRouter({
  mode: 'history',
  routes
})