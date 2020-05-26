<template>
  <div class="tags">
    <v-container>
      <div class="mb-10"></div>
      <h1 class="display-2 text-center">友情链接</h1>
      <br>
      <v-divider></v-divider>
      <br>
      <v-btn v-if="$store.state.isLoggedIn" @click="$router.push('/links/add')" outlined>
        添加友链
      </v-btn>
      <div v-if="loading">
        <div v-for="n in 3" :key="n">
          <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
        </div>
      </div>
      <v-list-item-group>
        <v-list-item two-line v-for="(link, index) in links" :key="index">
          <v-list-item-content>
            <a :href="link.URL" target="_blank" class="action">
              <v-list-item-title>
                {{ link.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ link.description }}
              </v-list-item-subtitle>
            </a>
          </v-list-item-content>
          <v-list-item-action v-if="$store.state.isLoggedIn">
            <v-btn @click="$router.push(`/links/edit/${link.id}`)" icon>
              <v-icon>edit</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action v-if="$store.state.isLoggedIn">
            <v-btn @click="deleteLink(link.id, index)" icon>
              <v-icon>delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-container>
  </div>
</template>

<script>
import LinkService from '@/services/LinkService'

export default {
  name: 'link',
  data: function () {
    return {
      links: [],
      loading: true
    }
  },
  methods: {
    deleteLink: function (linkId, index) {
      LinkService.deleteLink(linkId)
      this.links.splice(index, 1)
    }
  },
  created: async function () {
    await LinkService.getAllLinks().then((value) => {
      this.links = value.data.data
      this.loading = false
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
