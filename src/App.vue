<template>
  <v-app>
    <link rel="stylesheet" href="./assets/markdown.css">
    <Navbar />

    <v-content>
      <transition name="slide-x-transition" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </v-content>
    <Bottom />
  </v-app>
</template>

<script>
import Bottom from '@/components/Bottom.vue'
import Navbar from '@/components/Navbar.vue'
// import AuthService from '@/services/AuthService'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    Bottom,
    Navbar
  },
  methods: {
    navigate: function (path) {
      this.$router.push(path)
    }
  },
  watch: {
    $route: {
      handler: function (to, from) {
        if (to.meta.login && !this.$store.state.isLoggedIn) this.navigate('/')
        if (to.meta.title) {
          document.title = to.meta.title + ' - Sam\'s Blog'
        } else {
          document.title = 'Sam\'s Blog'
        }
      },
      immediate: true
    }
  }// ,
  // created: function () {
  //   this.$store.state.token = this.$cookies.get('token')
  //   if (this.$store.state.token) {
  //     this.$store.state.isLoggedIn = true
  //   } else {
  //     this.$store.state.isLoggedIn = false
  //   }
  // }
}
</script>

<style>
@import url('./assets/markdown.css');
@import url('./assets/highlight/styles/default.css');

.title {
  cursor: hand;
  color: white !important;
  text-decoration: none;
}
.fade-enter-active,
.fade-leave-active
{
    transition: opacity .3s
}

.fade-enter,
.fade-leave-to
{
    opacity: 0
}
</style>
