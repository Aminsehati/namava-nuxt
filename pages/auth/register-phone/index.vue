<template>
  <div class="auth-register-phone">
    <div class="wrapper">
      <div class="header-auth flex items-center justify-between">
        <nuxt-link to="/">
          <IconLogo />
        </nuxt-link>
        <Button
          primary
          class="flex items-center"
          @onClick="$router.push('/auth/register-email')"
        >
          <IconRegister />
          ثبت نام
        </Button>
      </div>
      <BoxDark>
        <div class="loading-wrapper" v-if="filters.loading">
          <Loading />
        </div>
        <div class="box-auth" v-else>
          <div class="send-otp" v-if="!showBoxVerifyPhone">
            <div class="title mb-30">
              <h2 class="mb-15 lg:text-18 md:text-16">
                ورود از طریق شماره تلفن همراه
              </h2>
              <p class="text-12 text-light">
                لطفا کشور خود را انتخاب کنید و شماره تلفن همراه خود را وارد کنید
              </p>
            </div>
            <div class="mb-40">
              <h4 class="text-12 mb-10 pr-15">شماره تلفن همراه</h4>
              <TextField
                placeholder="شماره تلفن همراه"
                class="mb-20"
                v-model="registerInfo.phoneNumber"
                @onEnter="sendOtp"
              />
            </div>
            <Button secondary block class="mb-40" @onClick="sendOtp">
              ورود
            </Button>
            <nuxt-link
              to="/auth/login-email"
              class="block text-center lg:text-14 text-12"
            >
              ورود از طریق ایمیل
            </nuxt-link>
          </div>
          <div class="verify-otp" v-if="showBoxVerifyPhone">
            <div class="title mb-30">
              <h2 class="lg:text-18 md:text-16 mb-15">کد فعالسازی</h2>
              <p class="text-12 text-light">
                یک کد به شماره
                {{ registerInfo.phoneNumber }}
                پیامک شد . لطفا کد را وارد کنید
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
              class="block text-center mb-40 cursor-pointer lg:text-14 text-12"
              @click="sendOtp"
            >
              دریافت مجدد کد
            </p>
            <Button secondary block class="mb-40" @onClick="verifyOtp">
              ثبت
            </Button>
            <p
              class="text-center cursor-pointer lg:text-14 text-12"
              @click="showBoxVerifyPhone = !showBoxVerifyPhone"
            >
              شماره را اشتباه وارد کرده اید ؟
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
        return redirect('/')
      }
    }
  },
  data() {
    return {
      showBoxVerifyPhone: false,
      registerInfo: {
        phoneNumber: '',
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
    validatePhoneNumber() {
      const regex = /^((\+98|0)9\d{9})$/gm
      return regex.test(this.registerInfo.phoneNumber)
    },
    async sendOtp() {
      if (this.validatePhoneNumber()) {
        await this.sendOtpByPhoneLogin()
      }
    },
    async sendOtpByPhoneLogin() {
      this.filters.loading = true
      this.error.message = ''
      try {
        const httpRequest = await AuthService.sendOtpByPhoneRegister({
          phone: this.registerInfo.phoneNumber,
        })
        if (httpRequest.isSuccess) {
          this.registerInfo.sign = httpRequest.data.sign
          if (!this.showBoxVerifyPhone) {
            this.showBoxVerifyPhone = !this.showBoxVerifyPhone
          }
          this.filters.loading = false
        }
      } catch (error) {
        this.filters.loading = false
        this.error.message = error.response.data.messages.phone
      } finally {
        this.filters.loading = false
      }
    },
    async verifyOtp() {
      this.filters.loading = true
      this.error.message = ''
      try {
        const httpRequest = await AuthService.verifyOtpByPhoneRegister({
          otp: this.registerInfo.otp,
          sign: this.registerInfo.sign,
        })
        if (httpRequest.isSuccess) {
          const token = httpRequest?.data?.token || ''
          localStorage.setItem('token', token)
          this.showBoxVerifyPhone = !this.showBoxVerifyPhone
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