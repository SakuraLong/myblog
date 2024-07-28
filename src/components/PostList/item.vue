<template>
  <div
    class="flex gap border padding"
    f-c
    text
  >
    <PostTitle :post="post" />
    <itemMain :post="post" />
    <itemFooter :post="post" />
  </div>
</template>

<script>
import PostTitle from '@/components/PostTitle'
import itemMain from './itemMain.vue'
import itemFooter from './itemFooter.vue'
export default {
  components: {
    PostTitle,
    itemMain,
    itemFooter
  },
  props: {
    post: {
      default: () => {
        return {
          title: '',
          to: '',
          abstract: '',
          publicationTime: '',
          modificationTime: '',
          wordCount: '',
          readingTime: '',
          tags: [],
          categories: []
        }
      },
      type: Object
    }
  }
}
</script>

<style>
</style>
