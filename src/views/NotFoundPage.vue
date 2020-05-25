<template>
  <div class="not-found">
    <NotFoundPage/>
  </div>
</template>

<script>
// @ is an alias to /src
import NotFoundPage from '@/components/NotFound.vue'

export default {
  name: 'NotFound',
  components: {
    NotFoundPage
  }
}
</script>
