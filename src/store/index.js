import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    count: 0,
    count2: 10000
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--
  }
})