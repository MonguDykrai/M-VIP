<template>
  <div class="register">
    <div class="pic-wrapper">
      <div class="logo"></div>
    </div>
    <label for="phone">手机号</label>
    <input type="tel" placeholder="请输入手机号" id="phone" v-model="phoneNumber">
    <br>
    <label for="captcha">验证码</label>
    <input type="number" placeholder="请输入验证码" id="captcha" v-model="captcha">
    <button @click.stop="getCaptcha">获取验证码</button>
    <br>
    <button @click="login">手机号注册登录</button>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'register',
    props: {},
    data: function () {
      return {
        phoneNumber: '',
        captcha: '',
        arrivedCaptcha: ''
      }
    },
    methods: {
      getCaptcha: function (e) {
        const { phoneNumber } = this
        // this.arrivedCaptcha = '123456'

        fetch(`http://localhost:8081/getCaptcha?phone=${phoneNumber}`)
          .then(function (res) {
            // console.log(res)
            return res.json()
          })
          .then(data => {
            const { code } = data

            if (code === 1) {
              const { captcha } = data.data
              this.arrivedCaptcha = captcha
            }
          })
      },
      login: function () {
        const { captcha, arrivedCaptcha } = this

        if (captcha == arrivedCaptcha) {
          this.$router.push({ path: '/' })
        }
      }
    }
  }
</script>

<style scoped>
.pic-wrapper {
  position: relative;
  height: 170px;
  width: 100%;
  background-image: url("../assets/images/手机号注册登录/login_bg.3a93a8bf.jpg");
}

.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50px;
  width: 125px;
  background-image: url("../assets/images/手机号注册登录/newlogo.85329d50.png");
  background-size: contain;
}
</style>