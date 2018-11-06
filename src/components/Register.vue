<template>
  <div class="register">
    <label for="phone">手机号</label>
    <input type="tel" placeholder="请输入手机号" id="phone" v-model="phoneNumber">
    <br>
    <label for="captcha">验证码</label>
    <input type="number" placeholder="请输入验证码" id="captcha">
    <button @click.stop="getCaptcha">获取验证码</button>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'register',
    props: {},
    data: function () {
      return {
        phoneNumber: null
      }
    },
    methods: {
      getCaptcha: function (e) {
        const { phoneNumber } = this
        fetch(`http://localhost:8081/getCaptcha?phone=${phoneNumber}`)
          .then(function (res) {
            // console.log(res)
            return res.json()
          })
          .then(data => {
            console.log(data)
          })
      }
    }
  }
</script>

<style scoped>

</style>