<template>
  <v-container>
    <div class="mb-10"></div>
    <v-alert text type="error" v-html="error" v-if="error"></v-alert>
    <h1 class="display-2 text-center">编辑博客</h1>
    <br>
    <v-divider></v-divider>
    <br>
    <v-form ref="form" v-model="valid">
      <v-text-field label="背景URL" :rules="[rules.required]" v-model="imageURL"></v-text-field>
      <v-text-field label="标题" :rules="[rules.required]" v-model="title"></v-text-field>
      <v-textarea label="简介" :rules="[rules.required]" v-model="description"></v-textarea>
      <mavon-editor codeStyle="atom-one-dark" :rules="[rules.required]" v-model="value" :ishljs="true" ref="mEditor" style="z-index: 100"/>
      <br>
      <v-combobox readonly style="z-index: 10000" v-model="tags" :items="allTags.data" chips
        color="blue-grey lighten-2" label="标签" item-text="name" item-value="name"
        multiple>
      </v-combobox>
      <br>
      <div class="text-center">
        <v-btn :disabled="!valid || !$store.state.isLoggedIn" @click="newPost" large>更新博客</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import PostService from '@/services/PostService'
import TagService from '@/services/TagService'

export default {
  name: 'EditPost',

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
      post: '',
      allTags: [],
      tags: []
    }
  },
  created: async function () {
    await PostService.getPost(this.$route.params.postId).then((value) => {
      this.post = value.data.data
      this.value = this.post.MarkdownContent
      this.title = this.post.title
      this.description = this.post.description
      this.imageURL = this.post.imageURL
      this.tags = this.post.Tags
    })
    await TagService.getAllTags().then((value) => {
      this.allTags = value.data
    })
  },
  methods: {
    newPost: function () {
      if (!this.$store.state.isLoggedIn) {
        this.error = '请登录后再来编辑博客'
      } else {
        const HTMLContent = this.$refs.mEditor.d_render
        const markdownContent = this.value
        PostService.editPost(this.post.id, {
          title: this.title,
          markdownContent: markdownContent,
          HTMLContent: HTMLContent,
          author: this.$store.state.user.username,
          description: this.description,
          imageURL: this.imageURL,
          tags: this.tags
        })
        this.$router.push('/')
      }
    }
  }
}
</script>
