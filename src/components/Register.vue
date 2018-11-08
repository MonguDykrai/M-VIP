<template>
  <div class="register">

    <div class="logo-wrapper">
      <font-awesome-icon icon="times" @click.stop="closeRegView" />
      <div class="logo"></div>
    </div>

    <div class="phone-wrapper">
      <label for="phone">手机号</label>
      <input type="tel" placeholder="请输入手机号" id="phone" v-model="phoneNumber" maxlength="11">
    </div>

    <div class="captcha-wrapper">
      <label for="captcha">验证码</label>
      <input type="number" placeholder="请输入验证码" id="captcha" v-model="captcha">
      <button @click.stop="getCaptcha">获取验证码</button>
    </div>

    <div class="login-button-wrapper">
      <button @click="login">手机号注册登录</button>
    </div>

    <div class="term-wrapper">
      <p>同意《唯品会服务条款》、《隐私条款》、《唯品支付用户服务协议》、《唯品信用服务协议》</p>
    </div>

    <fieldset>
      <legend>或</legend>
      <button>密码登录</button>
    </fieldset>

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
        // fetch(`http://47.98.145.59:9090/getCaptcha?phone=${phoneNumber}`)
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
      },
      closeRegView: function () {
        this.$router.push({ path: '/' })
      }
    }
  }
</script>

<style scoped lang="less">
  .logo-wrapper {
    position: relative;
    height: 170px;
    width: 100%;
    background-image: url("../assets/images/手机号注册登录/login_bg.3a93a8bf.jpg");

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

    >[data-icon="times"] {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 23px;
    }
  }

  .phone-wrapper {
    height: 52px;
    line-height: 52px;
    padding: 16px 0 16px 15px;
    border-bottom: 1px solid #E7E7E7;
    box-sizing: border-box;

    >label {
      float: left;
      margin-right: 15px;
      font-size: 16px;
      height: 20px;
    }

    >input {
      float: left;
      font-size: 16px;
      height: 20px;
    }
  }

  .captcha-wrapper {
    position: relative;
    height: 52px;
    line-height: 52px;
    padding-left: 15px;
    border-bottom: 1px solid #E7E7E7;

    >label {
      float: left;
      margin-right: 15px;
      font-size: 16px;
      height: 52px;
      line-height: 52px;
    }

    >input {
      float: left;
      font-size: 16px;
      height: 20px;
      padding: 16px 0 15px;
    }

    >button {
      position: absolute;
      right: 0;
      height: 52px;
      line-height: 52px;
      width: 120px;
      font-size: 16px;
      border-left: 1px solid #E7E7E7;
      color: #98989f;
    }
  }

  .login-button-wrapper {
    padding: 30px 15px 0;

    >button {
      display: block;
      height: 44px;
      line-height: 44px;
      width: 100%;
      text-align: center;
      background: #de3d96;
      border-radius: 3px;
      font-size: 16px;
      color: #ee9eca;
    }
  }

  .term-wrapper {
    padding: 15px 15px 45px;

    >p {
      font-size: 12px;
    }
  }

  fieldset {
    text-align: center;
    color: #dbdbdb;
    border-top: 1px solid #dbdbdb;
    font-size: 12px;

    >legend {
      width: 32px;
    }

    >button {
      height: 36px;
      line-height: 36px;
      padding: 0 14px;
      border-radius: 3px;
      display: inline-block;
      border: 1px solid #e4007f;
      color: #e4007f;
      text-decoration: none;
      margin: 13px auto;
      font-size: 14px;
    }
  }
</style>