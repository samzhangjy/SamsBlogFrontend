<template>
  <v-container>
    <div class="mb-10"></div>
    <!-- <div class="text-center absolute-center">
      <v-img src="../assets/logo.png" max-width="100" class="rounded-circle absolute-center absolute"></v-img>
    </div> -->
    <div class="text-center">
      <img src="../assets/logo.png" class="rounded-circle avatar">
    </div>
    <h1 class="text-center">
      Sam's Blog
    </h1>
    <p class="text--lighten-5 text-center">科技 · 生活 · 娱乐</p>
    <br>
    <v-divider></v-divider>
    <br>
    <h2>最新文章</h2>
    <v-row v-if="loading">
      <v-col v-for="n in 4" :key="n" sm="4">
        <v-skeleton-loader :loading="!loaded" type="card" transition="scale-transition"></v-skeleton-loader>
      </v-col>
    </v-row>
    <posts :posts="posts.data"></posts>
  </v-container>
</template>

<script>
import PostService from '@/services/PostService'
import Posts from '@/components/Posts.vue'

export default {
  name: 'Index',
  data: function () {
    return {
      posts: [],
      loaded: false,
      loading: true
    }
  },
  created: async function () {
    await PostService.getLatestPosts().then((value) => {
      this.loaded = true
      this.posts = value.data
      this.loading = false
    })
  },
  components: {
    Posts
  }
}
</script>

<style scroped>
.post-title:hover {
  cursor: pointer;
  text-decoration: underline;
}
.rounded-circle {
  border-radius: 100%;
}
.avatar {
  max-width: 200px;
}
</style>
