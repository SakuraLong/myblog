<template>
  <footer>
    <div
      class="flex width-100"
      f-jc-sb
    >
      <div>
        <CapsuleLinkButton
          v-for="tag, i in post.tags"
          :key="i"
          :name="tag"
          :to="'/tags?tag=' + tag"
        />
      </div>
      <div>
        <CapsuleLinkButton
          :name="post.categories.join(' > ')"
          :to="'/categories?category=' + post.categories.join('/')"
        />
      </div>
    </div>
  </footer>
</template>

<script>
import CapsuleLinkButton from '@/components/CapsuleLinkButton'
export default {
  components: {
    CapsuleLinkButton
  },
  props: {
    post: {
      default: () => {
        return {
          categories: [],
          tags: []
        }
      },
      type: Object
    }
  }
}
</script>

<style>

</style>
