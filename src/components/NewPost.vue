<template>
  <v-container>
    <div class="mb-10"></div>
    <v-alert text type="error" v-html="error" v-if="error"></v-alert>
    <h1 class="display-2 text-center">新的博客</h1>
    <br>
    <v-divider></v-divider>
    <br>
    <v-form ref="form" v-model="valid">
      <v-text-field label="背景URL" :rules="[rules.required]" v-model="imageURL"></v-text-field>
      <v-text-field label="标题" :rules="[rules.required]" v-model="title"></v-text-field>
      <v-textarea label="简介" :rules="[rules.required]" v-model="description"></v-textarea>
      <mavon-editor codeStyle="atom-one-dark" :rules="[rules.required]" v-model="value" :ishljs="true" ref="mEditor" style="z-index: 100"/>
      <br>
      <v-combobox v-model="tags" :items="allTags.data" chips
        color="blue-grey lighten-2" label="标签" item-text="name" item-value="name"
        multiple>
      </v-combobox>
      <br>
      <div class="text-center">
        <v-btn :disabled="!valid || !$store.state.isLoggedIn" @click="newPost" large>提交</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import PostService from '@/services/PostService'
import TagService from '@/services/TagService'

export default {
  name: 'NewPost',

  data: function () {
    return {
      value: '',
      error: null,
      title: '',
      imageURL: '',
      rules: {
        required: value => !!value || '必填'
      },
      valid: false,
      description: '',
      tags: [],
      allTags: []
    }
  },
  methods: {
    newPost: async function () {
      if (!this.$store.state.isLoggedIn) {
        this.error = '请登录后再来添加博客'
      } else {
        const HTMLContent = this.$refs.mEditor.d_render
        const markdownContent = this.value
        const tags = this.tags
        await PostService.addPost({
          title: this.title,
          markdownContent: markdownContent,
          HTMLContent: HTMLContent,
          author: this.$store.state.user.username,
          description: this.description,
          imageURL: this.imageURL,
          tags: tags
        }).then((value) => {
          this.$router.push('/')
        })
      }
    }
  },
  created: async function () {
    await TagService.getAllTags().then((value) => {
      this.allTags = value.data
    })
  }
}
</script>
