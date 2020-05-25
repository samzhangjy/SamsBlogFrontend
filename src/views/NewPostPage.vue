<template>
  <div class="new-post-page">
    <NewPost/>
  </div>
</template>

<script>
// @ is an alias to /src
import NewPost from '@/components/NewPost.vue'

export default {
  name: 'NewPostPage',
  components: {
    NewPost
  }
}
</script>
