<template>
  <Structure :no-body="true">
    <template #header>
      <Header />
    </template>
    <template #top>
      <MenuContainer />
    </template>
  </Structure>
</template>

<script>
import Structure from '@/components/Structure'
import Header from '@/components/Header'
import MenuContainer from '@/components/MenuContainer'
import { scrollToTop } from '@/utils/utils'
export default {
  components: {
    Structure,
    Header,
    MenuContainer
  },
  beforeUnmount() {
    scrollToTop()
  }
}
</script>

<style>
.menu-child {
  padding: 10px 20px;
  color: var(--bl-color-primary-text);
}
</style>
