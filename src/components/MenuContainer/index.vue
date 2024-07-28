<template>
  <TopStructure>
    <template #aside>
      <About />
    </template>
    <template #main>
      <smallHeader />
      <router-view />
      <aside class="menu-container-aside">
        <About />
      </aside>
    </template>
  </TopStructure>
</template>

<script>
import TopStructure from '@/components/TopStructure'
import About from '@/components/About'
import smallHeader from './smallHeader.vue'
export default {
  components: {
    TopStructure,
    About,
    smallHeader
  },
  data() {
    return {
    }
  },
  mounted() {
  }
}
</script>

<style>
.menu-container-aside {
  display: none;
  padding: 0px 20px;
}
@media (max-width: 900px) {
  .menu-container-aside {
    display: block !important;
  }
}
</style>
