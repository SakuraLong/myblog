<template>
  <li>
    <router-link :to="to">
      {{ name }}
    </router-link>
  </li>
</template>

<script>
export default {
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
