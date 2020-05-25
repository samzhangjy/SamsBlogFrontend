<template>
  <div class="login">
    <LoginPage/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginPage from '@/components/Login.vue'

export default {
  name: 'Login',
  components: {
    LoginPage
  }
}
</script>
