<template>
  <div class="tags">
    <v-container>
      <div class="mb-10"></div>
      <h1 class="display-2 text-center">所有标签</h1>
      <br>
      <v-divider></v-divider>
      <br>
      <v-list rounded>
        <v-list-item-group>
          <v-list-item v-for="(tag, index) in tags" :key="index" @click="$router.push(`/tags/${tag.name}`)">
            <v-list-item-content>
              <v-list-item-title>
                {{ tag.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ tag.Posts.length }}篇博客
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  </div>
</template>

<script>
import TagService from '@/services/TagService'

export default {
  name: 'tag',
  data: function () {
    return {
      tags: []
    }
  },
  created: async function () {
    const tags = await TagService.getAllTags()
    this.tags = tags.data.data
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
