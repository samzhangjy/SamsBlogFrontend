<template>
  <div class="archive">
    <v-container>
      <div class="mb-10"></div>
      <h1 class="display-2 text-center">设置</h1>
      <br>
      <v-divider></v-divider>
      <br>
      <h1>账户</h1>
      <br>
      <br>
      <h3>重置密码</h3>
      <v-form ref="form" v-model="valid">
        <v-text-field v-model="newPassword" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'" name="input-10-1" label="新密码"
            @click:append="show1 = !show1"></v-text-field>
        <v-text-field v-model="confirmPassword" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.match]"
            :type="show2 ? 'text' : 'password'" name="input-10-1" label="重复密码"
            @click:append="show2 = !show2"></v-text-field>
        <v-btn :disabled="!valid" @click="resetUserPassword" depressed>
          重置密码
        </v-btn>
      </v-form>
      <v-snackbar v-model="snackbar" :color="color" top>
        {{ text }}
        <v-btn text @click="snackbar = false">
          关闭
        </v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  name: 'Settings',
  data: function () {
    return {
      newPassword: '',
      confirmPassword: '',
      valid: false,
      show1: false,
      show2: false,
      snackbar: false,
      color: '',
      text: '',
      rules: {
        required: value => !!value || '必填',
        match: value => this.newPassword === value || '密码必须一致'
      }
    }
  },
  methods: {
    resetUserPassword: function () {
      const password = this.newPassword
      AuthService.resetPassword({
        password: password,
        username: this.$store.state.user.username
      })
      this.snackbar = true
      this.text = '更改成功'
      this.color = 'green'
    }
  }
}
</script>

<style scoped>
.action {
  text-decoration: none;
}
.post:hover {
  cursor: pointer;
}
</style>
