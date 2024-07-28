<!-- 组件注册至全局了 -->
<template>
  <li>
    <details>
      <summary pointer>
        <router-link :to="to">{{ name }}</router-link>
      </summary>
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
    </details>
  </li>
</template>

<script>
import myli from './myli.vue'
export default {
  name: 'MyDetails',
  components: {
    myli
  },
  props: {
    to: {
      default: '/',
      type: String
    },
    name: {
      default: '',
      type: String
    },
    categories: {
      default: () => [],
      type: Array
    }
  }
}
</script>

<style>

</style>
