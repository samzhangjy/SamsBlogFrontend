<template>
  <div class="archive">
    <v-container>
      <div class="mb-10"></div>
      <h1 class="display-2 text-center">归档</h1>
      <br>
      <v-divider></v-divider>
      <br>
      <v-timeline>
        <v-timeline-item v-for="(post, index) in posts" :key="index" color="primary" large>
          <template v-slot:opposite>
            <span>{{ post.createdAt | moment("YYYY-M-D") }}</span>
          </template>
          <v-card class="elevation-2" @click="$router.push(`/post/${post.id}`)">
            <v-card-title class="headline">{{ post.title }}</v-card-title>
            <v-card-text>
              {{ post.description }}
              <br><br>
              <v-chip @click="$router.push(`/tags/${tag.name}`)" class="ma-1" small v-for="(tag, index) in post.Tags" :key="index">
                {{ tag.name }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </div>
</template>

<script>
import PostService from '@/services/PostService'

export default {
  name: 'post',
  data: function () {
    return {
      posts: []
    }
  },
  methods: {
    getEditLink: function (postId) {
      return `/post/edit/${postId}`
    },
    deleteItem: function (postId, index) {
      PostService.deletePost(postId)
      this.posts.splice(index, 1)
      this.$router.push('/')
    }
  },
  created: async function () {
    await PostService.getAllPosts().then((value) => {
      this.posts = value.data.data
    })
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
