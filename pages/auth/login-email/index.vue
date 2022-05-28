<template>
  <div class="auth-login-email">
    <div class="wrapper">
      <div class="header-auth flex items-center justify-between">
        <nuxt-link to="/">
          <IconLogo />
        </nuxt-link>
        <Button primary class="flex items-center">
          <IconRegister />
          ثبت نام
        </Button>
      </div>
      <BoxDark>
        <div class="box-auth">
          <div class="send-otp" v-if="!showBoxVerifyEmail">
            <div class="title mb-30">
              <h2 class="text-18 mb-15">ورور از طریق ایمیل</h2>
              <p class="text-12 text-light">لطفا ایمیل خود را وارد کنید</p>
            </div>
            <div class="mb-40">
              <h4 class="text-12 mb-10 pr-15">ایمیل</h4>
              <TextField
                placeholder="ایمیل"
                class="mb-20"
                v-model="loginInfo.email"
                @onEnter="sendOtp"
              />
            </div>
            <Button secondary block class="mb-40" @onClick="sendOtp">
              ورود
            </Button>
            <nuxt-link to="/" class="block text-center">
              ورود از طریق ایمیل
            </nuxt-link>
          </div>
          <div class="verify-otp" v-if="showBoxVerifyEmail">
            <div class="title mb-30">
              <h2 class="text-18 mb-15">کد فعالسازی</h2>
              <p class="text-12 text-light">
                یک کد به آدرس
                {{ loginInfo.email }}
                ارسال شد . لطفا کد را وارد کنید
              </p>
            </div>
            <div class="mb-40">
              <TextField
                placeholder="کد فعالسازی"
                class="mb-20"
                type="pass"
                v-model="loginInfo.otp"
              />
            </div>
            <p
              class="block text-center mb-40 cursor-pointer"
              @onClick="sendOtp"
            >
              دریافت مجدد کد
            </p>
            <Button secondary block class="mb-40" @onClick="verifyOtp">
              ثبت
            </Button>
            <p
              class="text-center cursor-pointer"
              @click="showBoxVerifyEmail = !showBoxVerifyEmail"
            >
              ایمیل را اشتباه وارد کرده اید
            </p>
          </div>
        </div>
      </BoxDark>
    </div>
  </div>
</template>

<script>
import './style.scss'
import AuthService from '@/service/Auth'
export default {
  layout: 'auth',
  middleware({ store, redirect }) {
    if (process.client) {
      const token = (localStorage && localStorage['token']) || ''
      if (token) {
        return redirect("/")
      }
    }
  },
  data() {
    return {
      showBoxVerifyEmail: false,
      loginInfo: {
        email: '',
        otp: '',
        sign: '',
      },
    }
  },
  methods: {
    async sendOtp() {
      if (this.validateEmail()) {
        await this.sendOtpByEmailLogin()
      }
    },
    async sendOtpByEmailLogin() {
      try {
        const httpRequst = await AuthService.sendOtpEmailByLogin({
          email: this.loginInfo.email,
        })
        if (httpRequst.isSuccess) {
          this.loginInfo = {
            ...this.loginInfo,
            sign: httpRequst?.data?.sign || '',
          }
          this.showBoxVerifyEmail = !this.showBoxVerifyEmail
        }
      } catch (error) {
        ////
      }
    },
    validateEmail() {
      const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/
      return regex.test(this.loginInfo.email)
    },
    async verifyOtp() {
      try {
        const httpRequest = await AuthService.verifyOtpEmailByLogin({
          otp: this.loginInfo.otp,
          sign: this.loginInfo.sign,
        })
        if (httpRequest.isSuccess) {
          const token = httpRequest?.data?.token || ''
          localStorage.setItem('token', token)
          this.showBoxVerifyEmail = !this.showBoxVerifyEmail;
          this.$router.push("/")
        }
      } catch (error) {
        //
      }
    },
  },
}
</script>

<style>
</style>