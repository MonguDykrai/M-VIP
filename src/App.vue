<template>
  <div id="app">
    <app-home></app-home>
    <router-link to="/register" v-show="this.$route.path === '/'" exact>注册</router-link>
    <router-link to="/user-fav" v-show="this.$route.path === '/'" exact>我的收藏</router-link>
    <router-view></router-view>
    <br>
    <button @click.stop="logout" v-show="this.$route.path === '/'">退出</button>
  </div>
</template>

<script>
  import cookies from 'js-cookie'
  import AppHome from './components/Home'

  export default {
    name: 'app', // 首字母自动转为大写
    components: {AppHome},
    data: function () {
      return {}
    },
    methods: {
      logout: function () {
        localStorage.removeItem('jwt')
        localStorage.removeItem('status')
      }
    },
  }
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>