<template>
  <div>
    <v-navigation-drawer v-model="expand" bottom app>
      <template v-slot:prepend>
        <v-list-item two-line :class="extraClasses">
          <v-list-item-avatar>
            <img src="../assets/logo.png">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Sam Zhang</v-list-item-title>
            <v-list-item-subtitle>Keep coding forever</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group active-class="primary--text text--accent-4">
          <v-list-item v-for="(link, index) in links" :key="index" :to="link.link">
            <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon v-if="showToggle" @click.stop="toggle" ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" class="title">Sam's Blog</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!$store.state.isLoggedIn" href="https://github.com/samzhangjy" target="_blank" text>
        <span class="mr-2">GitHub</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-menu v-else offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text>
            <span class="mr-2">{{ $store.state.user.username }}</span>
            <v-icon>person</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" :to="item.link">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-if="$store.state.isLoggedIn" @click="logOut" text>
        <span class="mr-2">登出</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon @click="dialog=true">mdi-magnify</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">搜索</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field autofocus autocomplete="off" v-model="query" label="搜索" solo-inverted flat></v-text-field>
              <h3>搜索结果</h3>
              <!-- <v-divider></v-divider> -->
              <!-- <br> -->
              <v-list-item v-for="(post, index) in results" :key="index">
                <v-list-item-content>
                  <v-list-item-title @click="dialog=false">
                    <router-link :to="getPostLink(post.id)">
                      {{ post.title }}
                    </router-link>
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ post.description }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">取消</v-btn>
            <v-btn color="blue darken-1" text @click="search">搜索</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-tooltip nudge-left="150" right>
        <template v-slot:activator="{ on }">
          <v-btn @click="toggleDark()" v-on="on" icon>
            <v-icon v-if="darkMode">mdi-brightness-7</v-icon>
            <v-icon v-else>mdi-brightness-4</v-icon>
          </v-btn>
        </template>
        <span v-if="darkMode">浅色模式</span>
        <span v-else>深色模式</span>
      </v-tooltip>
    </v-app-bar>
    <!-- <div class="mb-10"></div> -->
    <v-snackbar v-model="snackbar" :color="color" top>
      {{ text }}
      <v-btn text @click="snackbar = false">
        关闭
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import PostService from '@/services/PostService'

export default {
  name: 'Navbar',
  data: function () {
    return {
      darkMode: false,
      links: [
        { icon: 'mdi-home', link: '/', text: '首页' },
        { icon: 'mdi-archive', link: '/archive', text: '归档' },
        { icon: 'mdi-tag', link: '/tags/all', text: '标签集合' },
        { icon: 'mdi-link', link: '/links', text: '友情链接' },
        { icon: 'person', link: '/about', text: '关于' }
      ],
      items: [
        { title: '写文章', link: '/post/new' },
        { title: '设置', link: '/settings' }
      ],
      snackbar: false,
      text: '',
      color: '',
      // Show the menu toggle or not
      showToggle: true,
      expand: false,
      extraClasses: '',
      dialog: false,
      results: [],
      query: ''
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      try {
        this.$router.push('/')
      } catch {
        console.log('Error while logging out. Skipping for now.')
      }
      this.snackbar = true
      this.text = '登出成功'
      this.color = 'success'
    },
    toggle () {
      this.expand = !this.expand
    },
    toggleDark: function () {
      this.darkMode = !this.darkMode
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    search: async function () {
      if (this.query === '') this.results = []
      else {
        await PostService.searchPost({
          query: this.query
        }).then((value) => {
          this.results = value.data.data
        })
      }
    },
    getPostLink: function (id) {
      return `/post/${id}`
    }
  },
  watch: {
    query: async function () {
      if (this.query === '') this.results = []
      else {
        await PostService.searchPost({
          query: this.query
        }).then((value) => {
          this.results = value.data.data
        })
      }
    }
  }
}
</script>
