<template>
  <div
    class="header flex"
    f-center
  >
    <headerDefault />
    <headerSmall />
  </div>
</template>

<script>
import headerDefault from './headerDefault.vue'
import headerSmall from './headerSmall.vue'
export default {
  components: {
    headerDefault,
    headerSmall
  }
}
</script>

<style>
.header {
  position: relative;
  height: 60px;
  border-bottom: 1px solid var(--bl-color-base-border);
  background-color: var(--bl-color-lighter-fill);
}
</style>
