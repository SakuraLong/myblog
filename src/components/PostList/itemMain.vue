<template>
  <main>
    <MdRenderer
      :text="post.abstract"
      :id-en="post.idEn"
      :small="true"
    />
  </main>
</template>

<script>
import MdRenderer from '@/components/MdRenderer'
export default {
  components: {
    MdRenderer
  },
  props: {
    post: {
      default: () => {
        return {
          abstract: '',
          idEn: ''
        }
      },
      type: Object
    }
  }
}
</script>

<style>
</style>
