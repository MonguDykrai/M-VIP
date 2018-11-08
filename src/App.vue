<template>
  <div id="app">
    <router-link to="/register" v-show="this.$route.path === '/'">注册</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app', // 首字母自动转为大写
    components: {},
    data: function () {
      return {}
    }
  }
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>