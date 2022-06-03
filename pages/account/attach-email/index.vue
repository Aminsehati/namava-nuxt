<template>
  <div class="account-attach-email">
    <div class="account-box">
      <div class="logo__area mb-30">
        <nuxt-link to="/" class="flex justify-center">
          <IconLogo />
        </nuxt-link>
      </div>
      <div v-if="filters.loading" class="loading_wrapper">
        <Loading dark />
      </div>
      <div v-else-if="!filters.loading">
        <div v-if="!hasVerifyEmail">
          <div class="email_item mb-25">
            <label class="block mb-10 xl:text-16 text-14">
              ایمیل خود را وارد کنید
            </label>
            <TextField light v-model="info.email" @onEnter="sendOpt" />
          </div>
          <Button secondary block class="text-white" @onClick="sendOpt">
            ادامه
          </Button>
        </div>
        <div v-else-if="hasVerifyEmail" class="verify_otp">
          <div class="mb-20">
            <p>
              کد تایید برای
              {{ info.email }}
              ارسال شد . لطفا کد را وارد کنید
            </p>
          </div>
          <div class="otp_item mb-25">
            <TextField
              light
              v-model="info.otp"
              @onEnter="verifyOtpAttachEmail"
            />
          </div>
          <Button
            secondary
            block
            class="text-white mb-25"
            @onClick="verifyOtpAttachEmail"
          >
            تایید
          </Button>
          <div
            class="edit_email text-center text-12"
            @click="hasVerifyEmail = !hasVerifyEmail"
          >
            ویرایش ایمیل
          </div>
          <div class="countDown mt-20 text-center text-12" v-if="time !== 0">
            ارسال مجدد کد تا
            {{ time }}
          </div>
          <div
            class="send_again_otp text-12 text-center mt-20"
            v-else
            @click="sendOpt"
          >
            دریافت مجدد کد
          </div>
        </div>
        <Alert
          :text="message.text"
          v-if="message.text"
          class="mt-30 text-white"
        />
      </div>
    </div>
  </div>
</template>

<script>
import './style.scss'

import AccountService from '~/service/account'
export default {
  layout: 'Empty',
  data() {
    return {
      message: {
        text: '',
      },
      info: {
        email: '',
        otp: '',
        sign: '',
      },
      hasVerifyEmail: false,
      filters: {
        loading: false,
      },
      time: 120,
      timer: null,
    }
  },
  methods: {
    validateEmail(email) {
      const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/
      return regex.test(email)
    },
    async sendOpt() {
      this.message.text = ''
      if (this.validateEmail(this.info.email)) {
        await this.sendOtpAttachEmail()
      } else {
        this.message.text = 'فرمت ایمیل صحیح نمیباشد'
      }
    },
    async sendOtpAttachEmail() {
      this.filters.loading = true
      this.message.text = '';
      this.time = 120;
      try {
        const httpRequest = await AccountService.sendOtpAttachEmail({
          email: this.info.email,
        })
        if (httpRequest.isSuccess) {
          this.info = {
            ...this.info,
            sign: httpRequest.data.sign,
          }
          this.filters.loading = false
          if (!this.hasVerifyEmail) {
            this.hasVerifyEmail = !this.hasVerifyEmail
          }
          this.timer = setInterval(this.countdown, 1000)
        }
      } catch (error) {
        ////
      }
    },
    async verifyOtpAttachEmail() {
      this.message.text = ''
      try {
        const httpRequest = await AccountService.verifyOtpAttachEmail({
          otp: this.info.otp,
          sign: this.info.sign,
        })
        if (httpRequest.isSuccess) {
          this.$router.push('/account')
        }
      } catch (error) {
        const message = error.response.data.message
        this.message.text = message
      }
    },
    countdown() {
      this.time--
      if (this.time == 0) {
        clearInterval(this.timer)
      }
    },
  },
  destroyed() {
    clearInterval(this.timer)
  },
}
</script>

<style>
</style>