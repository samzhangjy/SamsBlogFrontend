<template>
  <v-container class="text-center">
    <!-- <v-divider /> -->
    <br>
    <span>&copy; 2020 Sam's Blog | <router-link v-if="!$store.state.isLoggedIn" to="/login">登录</router-link><span v-if="$store.state.isLoggedIn">已登录为{{ $store.state.user.username }}</span></span>
  </v-container>
</template>

<script>
export default {
  name: 'Bottom'
}
</script>
