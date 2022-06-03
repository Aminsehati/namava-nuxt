<template>
  <div class="account-fullName-page">
    <div class="t_title">
      <h2 class="text-center lg:text-20 md:text-18 text-16">
        ویرایش نام و نام خانوادگی
      </h2>
    </div>
    <div class="box_account">
      <div v-if="!filters.loading">
        <div class="firstName_item mb-40">
          <label class="block mb-10 pr-15 lg:text-14 text-12"> نام </label>
          <TextField light placeholder="نام" v-model="userInfo.firstName" />
        </div>
        <div class="lastName_item mb-30">
          <label class="block mb-10 pr-15 lg:text-14 text-12">
            نام خانوادگی
          </label>
          <TextField
            light
            placeholder="نام خانوادگی"
            v-model="userInfo.lastName"
          />
        </div>
        <Button secondary block class="text-white" @onClick="updateUserInfo">
          ویرایش
        </Button>
      </div>
      <div class="loading-wrapper" v-else-if="filters.loading">
        <Loading dark />
      </div>
    </div>
  </div>
</template>

<script>
import './style.scss'
import AccountService from '~/service/account'
export default {
  layout: 'account',
  data() {
    return {
      userInfo: {
        firstName: '',
        lastName: '',
      },
      filters: {
        loading: false,
      },
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      this.filters.loading = true
      try {
        const httpRequest = await AccountService.getUserInfo()
        if (httpRequest.isSuccess) {
          const item = httpRequest.data.item
          this.userInfo = {
            ...this.userInfo,
            firstName: item?.firstName || '',
            lastName: item?.lastName || '',
          }
          this.filters.loading = false
        }
      } catch (error) {
        ///
      }
    },
    async updateUserInfo() {
      this.filters.loading = true
      try {
        const params = {
          firstName: this.userInfo.firstName,
          lastName: this.userInfo.lastName,
        }
        const httpRequest = await AccountService.updateUserInfo(params);
        console.log(httpRequest);
        if (httpRequest.isSuccess) {
          this.filters.loading = false
          this.$router.push('/account')
        }
      } catch (error) {
      } finally {
      }
    },
  },
}
</script>

<style>
</style>