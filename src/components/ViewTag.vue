<template>
  <div class="tags">
    <v-container>
      <div class="mb-10"></div>
      <h1 class="display-2 text-center">标签“{{ tag.name }}”</h1>
      <br>
      <v-divider></v-divider>
      <br>
      <posts :posts="tag.Posts"></posts>
    </v-container>
  </div>
</template>

<script>
import TagService from '@/services/TagService'
import Posts from '@/components/Posts.vue'

export default {
  name: 'ViewTag',
  data: function () {
    return {
      tag: {}
    }
  },
  components: {
    Posts
  },
  created: async function () {
    const name = this.$route.params.tagName
    const tag = await TagService.getTag(name)
    this.tag = tag.data.data
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
