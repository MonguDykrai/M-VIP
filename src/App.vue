<template>
  <div id="app">
    <router-link to="/register" v-show="this.$route.path === '/'">注册</router-link>
    <router-link to="/user-fav" v-show="this.$route.path === '/'">我的收藏</router-link>
    <router-view></router-view>
    <br>
    <button @click.stop="logout" v-show="this.$route.path === '/'">退出</button>
  </div>
</template>

<script>
  import cookies from 'js-cookie'

  export default {
    name: 'app', // 首字母自动转为大写
    components: {},
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