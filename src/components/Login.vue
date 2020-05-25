<template>
  <v-container class="fill-height" fluid>
    <div class="mb-10"></div>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="6">
        <v-card class="login center">
          <v-card-title class="h1 display-1 text-center center">登录</v-card-title>
          <v-card-text>
            <v-divider/>
            <br>
            <v-alert dense text type="error" v-html="error" v-if="error"></v-alert>
            <v-form ref="form" v-model="valid">
              <v-text-field label="用户名" :rules="[rules.required]" v-model="username"></v-text-field>
              <v-text-field label="密码" type="password" :rules="[rules.required]" v-model="password"></v-text-field>
              <v-btn :disabled="!valid" block rounded large class="blue white--text" @click="login">
                <h3>登录</h3>
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  name: 'Login',

  data: function () {
    return {
      username: '',
      password: '',
      valid: false,
      error: null,
      rules: {
        required: value => !!value || '必填',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthService.login({
          username: this.username,
          password: this.password
        })
        AuthService.loginRemember({ token: response.data.token })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.error = null
        this.$router.push('/')
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.login {
  padding: 10px;
}
.text-center {
  text-align: center !important;
}
</style>
