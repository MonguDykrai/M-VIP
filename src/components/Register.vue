<template>
  <div class="register">

    <div class="logo-wrapper">
      <font-awesome-icon icon="times" @click.stop="closeCurrView" />
      <div class="logo"></div>
      <p class="warning" v-show="appearWarningMsg">
        <font-awesome-icon icon="times-circle" />
        <span>{{ warningMsg }}</span>
      </p>
    </div>

    <div class="phone-wrapper">
      <label for="phone">手机号</label>
      <input type="tel" placeholder="请输入手机号" id="phone" v-model="phoneNumber" maxlength="11" @input.stop="iptPhoneNumber"
        autocomplete="off" @focus.stop="focusPhoneNumber" @blur.stop="blurPhoneNumber">
      <font-awesome-icon icon="times-circle" v-show="appearPhoneNumberClearBtn" @click.stop="clearPhoneNumber" />
    </div>

    <div class="captcha-wrapper">
      <label for="captcha">验证码</label>
      <input type="number" placeholder="请输入验证码" id="captcha" v-model="captcha" autocomplete="off" @input.stop="iptCaptcha"
        @focus.stop="focusCaptcha" @blur.stop="blurCaptcha">
      <button @click.stop="getCaptcha" :disabled="getCaptchaDisabled" :class="{'resend-captcha': resendCaptcha}">
        {{!getCaptchaDisabled ? captchaDisableTxt : `${sandClock}秒后重新获取`}}
      </button>
      <font-awesome-icon icon="times-circle" v-show="appearCaptchaClearBtn" @click.stop="clearCaptcha" />
    </div>

    <div class="login-button-wrapper">
      <button @click="login" :disabled="loginBtnDisabled" :class="{'login-btn-disabled': loginBtnDisabled}">手机号注册登录</button>
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
        phoneNumber: null,
        captcha: '',
        arrivedCaptcha: '',
        captchaRequested: false,
        getCaptchaDisabled: false,
        captchaDisableTxt: '获取验证码',
        resendCaptcha: false,
        sandClock: 0,
        warningMsg: '',
        appearWarningMsg: false,
        appearPhoneNumberClearBtn: false,
        appearCaptchaClearBtn: false,
        loginBtnDisabled: true
      }
    },
    methods: {
      getCaptcha: function (e) {
        const { phoneNumber } = this
        const { isMatched } = this.$tools

        if (!isMatched(phoneNumber)) {
          this.appearWarningMsg = true
          this.warningMsg = '手机号码格式错误'
          return
        }

        fetch(`http://localhost:9090/getCaptcha?phone=${phoneNumber}`)
          // fetch(`http://47.98.145.59:9090/getCaptcha?phone=${phoneNumber}`)
          .then(function (res) {
            // console.log(res)
            return res.json()
          })
          .then(data => {
            const { code } = data

            if (code === 1) {
              const { captcha, interval } = data.data
              this.arrivedCaptcha = captcha
              this.captchaRequested = true // At least one request has been requested.
              this.sandClock = interval - 1 // Countdown starts from 59s

              this.getCaptchaDisabled = true
              this.resendCaptcha = false

              const timerID = setInterval(() => {
                if (this.sandClock <= 0) {
                  this.captchaDisableTxt = '重新获取'
                  this.resendCaptcha = true // 给 '重新获取' 添加 color: #4a90e2
                  this.getCaptchaDisabled = false
                  clearInterval(timerID)
                  return
                }
                --this.sandClock
              }, 1000)
            }
          })
      },

      login: function () {
        const { captcha, captchaRequested, arrivedCaptcha, phoneNumber } = this
        const { isMatched } = this.$tools

        if (!isMatched(phoneNumber)) {
          this.appearWarningMsg = true
          this.warningMsg = '手机号格式错误'
          return
        }

        if (!captchaRequested) {
          this.appearWarningMsg = true
          this.warningMsg = '参数错误，请先获取验证码'
          return
        }

        if (captcha != arrivedCaptcha) {
          this.appearWarningMsg = true
          this.warningMsg = '短信验证码错误，请重试!'
          return
        }

        this.$router.push({ path: '/' })
      },

      closeCurrView: function () {
        this.$router.push({ path: '/' })
      },

      iptPhoneNumber: function (e) {
        const { value } = e.target

        this.appearPhoneNumberClearBtn = false

        if (value !== '') {
          this.appearPhoneNumberClearBtn = true
          this.appearWarningMsg = false

          if (this.captcha !== '') {
            this.loginBtnDisabled = false
          }

          return
        }

        this.loginBtnDisabled = true
      },

      iptCaptcha: function (e) {
        const { value } = e.target

        this.appearCaptchaClearBtn = false

        if (value !== '') {
          this.appearCaptchaClearBtn = true
          this.appearWarningMsg = false

          if (this.phoneNumber !== '') {
            this.loginBtnDisabled = false
          }

          return
        }

        this.loginBtnDisabled = true
      },

      focusPhoneNumber: function () {
        const { phoneNumber } = this

        if (phoneNumber) {
          this.appearPhoneNumberClearBtn = true
        }
      },

      focusCaptcha: function () {
        const { captcha } = this

        if (captcha) {
          this.appearCaptchaClearBtn = true
        }
      },

      blurPhoneNumber: function () {
        this.appearPhoneNumberClearBtn = false
      },

      blurCaptcha: function () {
        this.appearCaptchaClearBtn = false
      },

      clearPhoneNumber: function () {
        this.phoneNumber = ''
        this.appearPhoneNumberClearBtn = false
        this.appearWarningMsg = false

        this.loginBtnDisabled = true
      },

      clearCaptcha: function () {
        this.captcha = ''
        this.appearCaptchaClearBtn = false
        this.appearWarningMsg = false
        
        this.loginBtnDisabled = true
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

    >.warning {
      position: absolute;
      bottom: 6px;
      left: 15px;
      font-size: 12px;
      color: #C93C29;

      >[data-icon="times-circle"] {
        margin-right: 6px;
      }
    }
  }

  .phone-wrapper {
    position: relative;
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

    >[data-icon="times-circle"] {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      font-size: 20px;
      color: #E4E3E6;
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

    >[data-icon="times-circle"] {
      position: absolute;
      top: 50%;
      right: 130px;
      transform: translateY(-50%);
      font-size: 20px;
      color: #E4E3E6;
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
      color: #fff;
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

  .resend-captcha {
    color: #4a90e2 !important;
  }

  .login-btn-disabled {
    color: #ee9eca !important;
  }
</style>