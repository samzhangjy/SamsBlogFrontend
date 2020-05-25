<template>
  <div class="edit-post-page">
    <EditPost/>
  </div>
</template>

<script>
// @ is an alias to /src
import EditPost from '@/components/EditPost.vue'

export default {
  name: 'EditPostPage',
  components: {
    EditPost
  }
}
</script>
