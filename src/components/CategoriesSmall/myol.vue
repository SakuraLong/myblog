<template>
  <ol>
    <component
      :is="item.children.length === 0 ? 'myli' : 'my-details'"
      v-for="item, i in categories"
      :key="i"
      :to="'/categories?category=' + item.params"
      :name="item.name"
      :categories="item.children"
    />
  </ol>
</template>

<script>
import myli from './myli.vue'
export default {
  name: 'MyOl',
  components: {
    myli
  },
  props: {
    categories: {
      default: () => [],
      type: Array
    }
  },
  // 在组件中异步注册：在组件的beforeCreate钩子中，使用异步方式注册循环引用的组件，例如
  beforeCreate() {
    // this.$options.components.mydetails = () => import('./mydetails.vue')
  }
}
</script>

<style>

</style>
