<template>
  <div class="auth-login-phone">
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
          <div class="send-otp" v-if="!showBoxVerifyPhone">
            <div class="title mb-30">
              <h2 class="text-18 mb-15">ورود از طریق شماره تلفن همراه</h2>
              <p class="text-12 text-light">
                لطفا کشور خود را انتخاب کنید و شماره تلفن همراه خود را وارد کنید
              </p>
            </div>
            <div class="mb-40">
              <h4 class="text-12 mb-10 pr-15">شماره تلفن همراه</h4>
              <TextField
                placeholder="شماره تلفن همراه"
                class="mb-20"
                v-model="loginInfo.phoneNumber"
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
          <div class="verify-otp" v-if="showBoxVerifyPhone">
            <div class="title mb-30">
              <h2 class="text-18 mb-15">کد فعالسازی</h2>
              <p class="text-12 text-light">
                یک کد به شماره
                {{ loginInfo.phoneNumber }}
                پیامک شد . لطفا کد را وارد کنید
              </p>
            </div>
            <div class="mb-40">
              <TextField placeholder="کد فعالسازی" class="mb-20" type="pass" />
            </div>
            <p class="block text-center mb-40 cursor-pointer">دریافت مجدد کد</p>
            <Button secondary block class="mb-40"> ثبت </Button>
            <p
              class="text-center cursor-pointer"
              @click="showBoxVerifyPhone = !showBoxVerifyPhone"
            >
              شماره را اشتباه وارد کرده اید ؟
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
  data() {
    return {
      showBoxVerifyPhone: false,
      loginInfo: {
        phoneNumber: '',
      },
    }
  },
  methods: {
    async sendOtp() {
      this.showBoxVerifyPhone = !this.showBoxVerifyPhone
      try {
        const httpRequest = await AuthService.sendOtpByPhoneLogin({
          phone: '09364384344',
        });
        console.log(httpRequest);
      } catch (error) {}
    },
  },
}
</script>

<style>
</style>