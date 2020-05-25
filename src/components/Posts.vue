<template>
  <div class="posts">
    <div class="mb-10"></div>
    <v-row>
      <v-col v-for="(post, index) in posts" :key="index" sm="4">
        <v-card class="post">
          <v-sheet @click="$router.push('/post/' + post.id)">
          <v-list-item>
            <v-list-item-avatar>
              <img src="../assets/logo.png">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{ post.title }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ post.createdAt | moment("dddd, YYYY年MMMMDo a") }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img class="grey" :src="post.imageURL"></v-img>
          </v-sheet>
          <v-card-text>
            <v-container>
              {{ post.description }}
              <v-divider></v-divider>
            </v-container>
            <div class="text--primary">
              <v-container>
                <v-chip @click="$router.push(`/tags/${tag.name}`)" class="ma-1" small v-for="(tag, index) in post.Tags" :key="index">
                  {{ tag.name }}
                </v-chip>
              </v-container>
            </div>
          </v-card-text>
          <v-card-actions v-if="$store.state.isLoggedIn">
            <v-container>
              <router-link :to="getEditLink(post.id)" class="action">
                <v-btn icon>
                  <v-icon>edit</v-icon>
                </v-btn>
              </router-link>
              <v-btn icon>
                <v-icon @click="deleteItem(post.id, index)">delete</v-icon>
              </v-btn>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- <strong v-else>还没有一篇博客呢</strong> -->
  </div>
</template>

<script>
import PostService from '@/services/PostService'

export default {
  name: 'post',
  props: ['posts'],
  methods: {
    getEditLink: function (postId) {
      return `/post/edit/${postId}`
    },
    deleteItem: function (postId, index) {
      PostService.deletePost(postId)
      this.posts.splice(index, 1)
      this.$router.push('/')
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
