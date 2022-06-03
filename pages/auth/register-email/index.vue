<template>
  <div class="auth-register-email">
    <div class="wrapper">
      <div class="header-auth flex items-center justify-between">
        <nuxt-link to="/">
          <IconLogo />
        </nuxt-link>
        <Button primary class="flex items-center" @onClick="$router.push('/auth/login-phone')">
          <IconRegister />
          ورود
        </Button>
      </div>
      <BoxDark>
        <div class="loading-wrapper" v-if="filters.loading">
          <Loading />
        </div>
        <div class="box-auth" v-else>
          <div class="send-otp" v-if="!showBoxVerifyEmail">
            <div class="title mb-30">
              <h2 class="xl:text-18 text-16 mb-15">ثبت نام از طریق ایمیل</h2>
              <p class="text-12 text-light">لطفا ایمیل خود را وارد کنید</p>
            </div>
            <div class="mb-40">
              <h4 class="text-12 mb-10 pr-15">ایمیل</h4>
              <TextField
                placeholder="ایمیل"
                class="mb-20"
                v-model="registerInfo.email"
                @onEnter="sendOtp"
              />
            </div>
            <Button secondary block class="mb-40" @onClick="sendOtp">
              ثبت نام
            </Button>
            <nuxt-link to="/" class="block text-center xl:text-14 text-12">
              ثبت نام از طریق شماره همراه
            </nuxt-link>
          </div>
          <div class="verify-otp" v-if="showBoxVerifyEmail">
            <div class="title mb-30">
              <h2 class="text-18 mb-15">کد فعالسازی</h2>
              <p class="text-12 text-light">
                یک کد به آدرس
                {{ registerInfo.email }}
                ارسال شد . لطفا کد را وارد کنید
              </p>
            </div>
            <div class="mb-40">
              <TextField
                placeholder="کد فعالسازی"
                class="mb-20"
                type="pass"
                v-model="registerInfo.otp"
                @onEnter="verifyOtp"
              />
            </div>
            <p
              class="block text-center mb-40 cursor-pointer xl:text-14 text-12"
              @click="sendOtp"
            >
              دریافت مجدد کد
            </p>
            <Button secondary block class="mb-40" @onClick="verifyOtp">
              ثبت
            </Button>
            <p
              class="text-center cursor-pointer xl:text-14 text-12"
              @click="showBoxVerifyEmail = !showBoxVerifyEmail"
            >
              ایمیل را اشتباه وارد کرده اید
            </p>
          </div>
          <Alert :text="error.message" class="mt-30" v-if="error.message" />
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
      registerInfo: {
        email: '',
        otp: '',
        sign: '',
      },
      filters: {
        loading: false,
      },
      error: {
        message: '',
      },
    }
  },
  methods: {
    async sendOtp() {
      if (this.validateEmail()) {
        await this.sendOtpByEmailRegister()
      }
    },
    async sendOtpByEmailRegister() {
      this.filters.loading = true
      this.error.message = ''
      try {
        const httpRequest = await AuthService.sendOtpByEmailRegister({
          email: this.registerInfo.email,
        })
        if (httpRequest.isSuccess) {
          this.registerInfo = {
            ...this.registerInfo,
            sign: httpRequest?.data?.sign || '',
          }
          if (!this.showBoxVerifyEmail) {
            this.showBoxVerifyEmail = !this.showBoxVerifyEmail
          }
          this.filters.loading = false
        }
      } catch (error) {
        this.filters.loading = false
        this.error.message = error?.response?.data?.messages?.email || ''
      }
    },
    validateEmail() {
      const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/
      return regex.test(this.registerInfo.email)
    },
    async verifyOtp() {
      this.filters.loading = true
      try {
        const httpRequest = await AuthService.verifyOtpByEmailRegister({
          otp: this.registerInfo.otp,
          sign: this.registerInfo.sign,
        })
        if (httpRequest.isSuccess) {
          const token = httpRequest?.data?.token || ''
          localStorage.setItem('token', token)
          this.showBoxVerifyEmail = !this.showBoxVerifyEmail
          this.filters.loading = false
          this.$router.push('/')
        }
      } catch (error) {
        this.filters.loading = false
        this.error.message = 'رمز یکبار مصرف نامعتبر است'
      }
    },
  },
}
</script>

<style>
</style>