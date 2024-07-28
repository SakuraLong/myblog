<template>
  <div class="nav">
    <h2 class="aside-h2">Navigation</h2>
    <nav>
      <item
        v-for="item, i in items"
        :key="i"
        :to="item[0]"
        :name="item[1]"
        :icon="item[2]"
      />
    </nav>
  </div>
</template>

<script>
import item from './item.vue'
import store from '@/store'
export default {
  components: {
    item
  },
  data() {
    return {
      items: store.state.navItems
    }
  }
}
</script>

<style>

</style>
