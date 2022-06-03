<template>
  <div class="account-page">
    <div class="wrapper">
      <div class="t_title">
        <h2 class="text-center lg:text-20 md:text-18 text-16">حساب کاربری</h2>
      </div>
      <div class="box-account-page">
        <div class="white_card">
          <div v-if="!filters.loading">
            <div class="fullName_item flex items-center justify-between mb-25">
              <div>
                <span> نام و نام خانوادگی : </span>
                <span>
                  {{ userInfo.firstName }}
                  {{ userInfo.lastName }}
                </span>
              </div>
              <nuxt-link to="/account/name"> ویرایش </nuxt-link>
            </div>
            <div class="email_item flex items-center justify-between">
              <div>
                <span> ایمیل: </span>
                <span> aminsehati70@gmail.com </span>
              </div>
              <nuxt-link to="/account/attach-email"> افزودن ایمیل </nuxt-link>
            </div>
          </div>
          <div v-else-if="filters.loading" class="loading_wrapper">
            <Loading dark />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './style.scss'
import AccountService from '~/service/account'
export default {
  layout: 'account',
  mounted() {
    this.getUserInfo()
  },
  data() {
    return {
      userInfo: {
        firstName: '',
        lastName: '',
        phone: '',
      },
      filters: {
        loading: false,
      },
    }
  },
  methods: {
    async getUserInfo() {
      this.filters.loading = true
      try {
        const httpRequst = await AccountService.getUserInfo()
        if (httpRequst.isSuccess) {
          const item = httpRequst.data.item
          this.userInfo = {
            ...this.userInfo,
            firstName: item?.firstName || '',
            lastName: item?.lastName || '',
            phone: item?.phone || '',
          }
          this.filters.loading = false
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style>
</style>