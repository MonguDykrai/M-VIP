<template>
  <div id="register">

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
      <input type="tel" ref="captchaInput" placeholder="请输入验证码" id="captcha" maxlength="6" v-model="captcha"
        autocomplete="off" @input.stop="iptCaptcha" @focus.stop="focusCaptcha" @blur.stop="blurCaptcha">
      <button @click.stop="getCaptcha" :disabled="getCaptchaDisabled" :class="{'get-captcha-disabled': getCaptchaDisabled}">
        {{ getCaptchaTxt }}
      </button>
      <font-awesome-icon icon="times-circle" v-show="appearCaptchaClearBtn" @click.stop="clearCaptcha" />
    </div>

    <div class="login-button-wrapper">
      <button @click.stop="login" :disabled="loginBtnDisabled" :class="{'login-btn-disabled': loginBtnDisabled}">手机号注册登录</button>
    </div>

    <div class="term-wrapper">
      <p>同意《唯品会服务条款》、《隐私条款》、《唯品支付用户服务协议》、《唯品信用服务协议》</p>
    </div>

    <fieldset>
      <legend>或</legend>
      <button disabled>密码登录</button>
    </fieldset>

  </div>
</template>

<script>
  import tools from '../assets/js/tools.js'
  const ip = tools.getIp()

  export default {
    name: 'register',
    props: {},
    data: function () {
      return {
        phoneNumber: null,
        captcha: '',
        arrivedCaptcha: '',
        captchaRequested: false,
        getCaptchaDisabled: true,
        getCaptchaTxt: '获取验证码',
        sandClock: 0,
        warningMsg: '',
        appearWarningMsg: false,
        appearPhoneNumberClearBtn: false,
        appearCaptchaClearBtn: false,
        loginBtnDisabled: true,
      }
    },
    methods: {
      getCaptcha: function () {
        const { phoneNumber } = this
        const { isValidPhoneNumber } = this.$_m_tools

        if (!isValidPhoneNumber(phoneNumber)) {
          this.appearWarningMsg = true // 显示 错误提示信息
          this.warningMsg = '手机号码格式错误' // 设置 错误提示信息
          return
        }

        this.appearWarningMsg = false // 隐藏 错误提示信息，改善用户体验

        fetch(`http://${ip}/get-captcha`, {
          headers: {
            'Content-type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            phoneNumber
          })
        })
          .then(function (res) {
            // console.log(res)
            return res.json()
          })
          .then(data => {
            const { code } = data

            if (code === 1) {
              const { captcha, interval } = data.data
              this.arrivedCaptcha = captcha
              this.captchaRequested = true // 验证码已请求至少一次
              this.sandClock = interval - 1 // 从 59 开始倒计时

              this.getCaptchaDisabled = true // 禁用 获取验证码按钮

              this.$refs.captchaInput.focus() // 验证码输入框获得焦点

              this.getCaptchaTxt = `${this.sandClock}秒后重新获取`

              const timerID = setInterval(() => {

                if (this.sandClock <= 0) {
                  this.getCaptchaTxt = '重新获取'

                  if (this.phoneNumber !== '') {
                    this.getCaptchaDisabled = false // 启用 获取验证码按钮
                  }

                  clearInterval(timerID) // 清除定时器
                  return
                }

                --this.sandClock // 间隔 1 秒钟 -1
                this.getCaptchaTxt = `${this.sandClock}秒后重新获取`
              }, 1000)
            }
          })
      },

      login: function () {
        const { captcha, phoneNumber } = this
        const { isValidPhoneNumber } = this.$_m_tools

        if (!isValidPhoneNumber(phoneNumber)) {
          this.appearWarningMsg = true // 显示 错误提示信息
          this.warningMsg = '手机号格式错误' // 设置 错误提示信息
          return
        }

        fetch(`http://${ip}/login`, {
          headers: {
            'Content-type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            phoneNumber,
            captcha
          })
        })
          .then(function (res) {
            return res.json()

          })
          .then(data => {
            const { msg, code, token, status } = data

            if (code == 0) {
              this.appearWarningMsg = true // 显示 错误提示信息
              this.warningMsg = msg // 设置 错误提示信息

              return
            }

            if (code == 400) {
              this.appearWarningMsg = true // 显示 错误提示信息
              this.warningMsg = msg // 设置 错误提示信息

              return
            }

            if (token) {
              localStorage.setItem('jwt', token)
              localStorage.setItem('status', status)
            }

            this.$router.push({ path: '/' })

          })


      },

      closeCurrView: function () {
        this.$router.push({ path: '/' })
      },

      iptPhoneNumber: function (e) {
        const { value } = e.target

        this.appearPhoneNumberClearBtn = false // 隐藏 清空手机号按钮

        if (value !== '') {
          this.appearPhoneNumberClearBtn = true // 显示 清空手机号按钮
          this.appearWarningMsg = false // 隐藏 错误提示信息
          this.getCaptchaDisabled = false // 启用 获取验证码按钮

          if (this.captcha !== '') {
            this.loginBtnDisabled = false // 启用 手机号注册登录按钮
          }

          return
        }

        this.loginBtnDisabled = true // 禁用 手机号注册登录按钮
        this.getCaptchaDisabled = true // 禁用 获取验证码按钮
      },

      iptCaptcha: function (e) {
        const { value } = e.target

        this.appearCaptchaClearBtn = false // 隐藏 清空验证码按钮

        if (value !== '') {
          this.appearCaptchaClearBtn = true // 显示 清空验证码按钮
          this.appearWarningMsg = false // 隐藏 错误提示信息

          if (this.phoneNumber !== '') {
            this.loginBtnDisabled = false // 启用 手机号注册登录按钮
          }

          return
        }

        this.loginBtnDisabled = true // 禁用 手机号注册登录按钮
      },

      focusPhoneNumber: function () {
        const { phoneNumber } = this

        if (phoneNumber) {
          this.appearPhoneNumberClearBtn = true // 显示 清空手机号按钮
        }
      },

      focusCaptcha: function () {
        const { captcha } = this

        if (captcha) {
          this.appearCaptchaClearBtn = true // 显示 清空验证码按钮
        }
      },

      blurPhoneNumber: function () {
        this.appearPhoneNumberClearBtn = false // 隐藏 清空手机号按钮
      },

      blurCaptcha: function () {
        this.appearCaptchaClearBtn = false // 隐藏 清空验证码按钮
      },

      clearPhoneNumber: function () {
        this.phoneNumber = '' // 重置 手机号输入框
        this.appearPhoneNumberClearBtn = false // 隐藏 清空手机号按钮
        this.warningMsg = '' // 重置 错误提示信息
        this.appearWarningMsg = false // 隐藏 错误提示信息

        this.loginBtnDisabled = true // 禁用 手机号注册登录按钮
        this.getCaptchaDisabled = true // 禁用 获取验证码按钮
      },

      clearCaptcha: function () {
        this.captcha = '' // 重置 验证码输入框
        this.appearCaptchaClearBtn = false // 隐藏 清空验证码按钮
        this.warningMsg = '' // 重置 错误提示信息
        this.appearWarningMsg = false // 隐藏 错误提示信息

        this.loginBtnDisabled = true // 禁用 手机号注册登录按钮
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
      color: #4a90e2;
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

  .get-captcha-disabled {
    color: #98989f !important;
  }

  .login-btn-disabled {
    color: #ee9eca !important;
  }
</style>