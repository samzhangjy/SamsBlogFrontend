<template>
  <div>
    <v-skeleton-loader v-if="loading === true" type="image, image"></v-skeleton-loader>
    <v-img height="400" :src="post.imageURL" v-show="loaded" class="grey lighten-3">
      <v-container class="text-center" dark>
        <v-row justify="center" v-if="loadingContent">
          <v-col class="text-center center">
            <v-skeleton-loader type="heading" class="mt-5 ml-12 center"></v-skeleton-loader>
          </v-col>
        </v-row>
        <h1 class="display-2 text-center white--text" :class="extraClass()">{{ post.title }}</h1>
        <br>
        <v-divider></v-divider>
        <br>
        <v-skeleton-loader v-if="loadingContent" type="sentences" class="mt-5 ml-12 center"></v-skeleton-loader>
        <h4>{{ post.createdAt | moment("dddd, YYYY年MMMMDo a") }}</h4>
        <v-container>
          <v-chip @click="$router.push(`/tags/${tag.name}`)" class="ma-1" small v-for="(tag, index) in post.Tags" :key="index">
            {{ tag.name }}
          </v-chip>
        </v-container>
        <v-container v-if="$store.state.isLoggedIn">
          <router-link :to="getEditLink(post.id)" class="action">
            <v-btn icon>
              <v-icon>edit</v-icon>
            </v-btn>
          </router-link>
          <v-btn icon>
            <v-icon @click="dialog = true">delete</v-icon>
          </v-btn>
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="headline">删除文章？</v-card-title>

              <v-card-text>
                你确定要删除该文章吗？此操作不可逆！
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="grey darken-1" text @click="dialog = false">
                  取消
                </v-btn>

                <v-btn color="red darken-1" text @click="deleteItem(post.id)">
                  删除
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-container>
    </v-img>
    <v-container>
      <br>
      <div v-if="loadingContent === true">
        <div v-for="n in 5" :key="n">
          <v-skeleton-loader v-if="loadingContent" loading type="paragraph"></v-skeleton-loader>
          <br>
        </div>
      </div>
      <div class="markdown-body" v-html="post.HTMLContent" :class="extraClass()"></div>
      <br>
      <vue-disqus shortname="samstechblog" identifier="Sam's Blog" url="http://samstechblog.disqus.com"></vue-disqus>

    </v-container>
  </div>
</template>

<script>
import PostService from '@/services/PostService'

export default {
  name: 'ViewPost',
  data: function () {
    return {
      post: {},
      loaded: false,
      loading: true,
      loadingContent: true,
      dialog: false
    }
  },
  created: async function () {
    const readyHandler = () => {
      if (document.readyState === 'complete') {
        this.loading = false
        this.loaded = true
        document.removeEventListener('readystatechange', readyHandler)
      }
    }

    document.addEventListener('readystatechange', readyHandler)

    readyHandler()
    await PostService.getPost(this.$route.params.postId).then((value) => {
      this.post = value.data.data
      this.loadingContent = false
    })
  },
  methods: {
    extraClass: function () {
      if (this.$vuetify.theme.dark) return 'dark'
      return 'light'
    },
    getEditLink: function (postId) {
      return `/post/edit/${postId}`
    },
    deleteItem: function (postId) {
      PostService.deletePost(postId)
      this.dialog = false
      this.$router.push('/')
    }
  }
}
</script>

<style scroped>
.action {
  text-decoration: none;
}
.dark li {
  color: #ffffff;
}
.dark h1 {
  color: #ffffff;
}
.dark h2 {
  color: #ffffff;
}
.dark h3 {
  color: #ffffff;
}
.dark h4 {
  color: #ffffff;
}
.dark h5 {
  color: #ffffff;
}
.dark h6 {
  color: #ffffff;
}
.dark p {
  color: #ffffff;
}
.dark pre {
  background: #1F1F1F;
}
</style>
