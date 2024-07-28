<template>
  <router-link
    :to="to"
    :title="title"
    :style="{
      margin: margin.toString() + 'px'
    }"
  >
    <component :is="icon" />
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      default: '/',
      type: String
    },
    icon: {
      default: '',
      type: String
    },
    pos: {
      default: 'relative', // relative lt rt lb rb
      type: String
    },
    margin: {
      default: 0,
      type: Number
    },
    title: {
      default: '',
      type: String
    }
  }
}
</script>

<style>

</style>
