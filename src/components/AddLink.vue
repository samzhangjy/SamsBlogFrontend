<template>
  <v-container>
    <div class="mb-10"></div>
    <v-alert text type="error" v-html="error" v-if="error"></v-alert>
    <h1 class="display-2 text-center">添加友链</h1>
    <br>
    <v-divider></v-divider>
    <br>
    <v-form ref="form" v-model="valid">
      <v-text-field label="名称" :rules="[rules.required]" v-model="name"></v-text-field>
      <v-text-field label="链接" :rules="[rules.required]" v-model="URL"></v-text-field>
      <v-textarea label="简介" :rules="[rules.required]" v-model="description"></v-textarea>
      <div class="text-center">
        <v-btn :disabled="!valid || !$store.state.isLoggedIn" @click="addLink" large>添加</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import LinkService from '@/services/LinkService'

export default {
  name: 'AddLink',

  data: function () {
    return {
      value: '',
      error: null,
      name: '',
      URL: '',
      rules: {
        required: value => !!value || '必填'
      },
      description: '',
      valid: false
    }
  },
  methods: {
    addLink: function () {
      if (!this.$store.state.isLoggedIn) {
        this.error = '请登录后再来添加链接'
      } else {
        LinkService.addLink({
          name: this.name,
          URL: this.URL,
          description: this.description
        })
        setTimeout(function () {
          this.$router.push('/links')
        }.bind(this), 2000)
      }
    }
  }
}
</script>
