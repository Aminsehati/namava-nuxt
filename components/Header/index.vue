<template>
  <header class="header">
    <div class="container-sm">
      <div class="logo__area">
        <nuxt-link to="/">
          <IconLogo />
        </nuxt-link>
      </div>
      <nav class="navbar__wrapper">
        <li v-for="navbar in navbarIems" :key="navbar.id">
          <nuxt-link :to="navbar.path">
            {{ navbar.name }}
          </nuxt-link>
        </li>
      </nav>
    </div>
  </header>
</template>

<script>
import './style.scss'
export default {
  data() {
    return {
      navbarIems: [
        {
          id: 1,
          name: 'خانه',
          path: '/',
        },
        {
          id: 2,
          name: 'فیلم ها',
          path: '/movie',
        },
        {
          id: 3,
          name: 'سریال ها',
          path: '/series',
        },
        {
          id: 4,
          name: 'دسته بندی',
          path: '/category',
        },
        {
          id: 5,
          name: 'تازه ها',
          path: '/latest',
        },
      ],
    }
  },
}
</script>

<style>
</style>