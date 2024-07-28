<template>
  <Structure :no-body="true">
    <template #header>
      <Header />
    </template>
    <template #top>
      <HomeContainer />
    </template>
  </Structure>
</template>

<script>
import Structure from '@/components/Structure'
import Header from '@/components/Header'
import HomeContainer from '@/components/HomeContainer'
import { scrollToTop } from '@/utils/utils'
export default {
  components: {
    Structure,
    Header,
    HomeContainer
  },
  beforeUnmount() {
    scrollToTop()
  }
}
</script>

<style>

</style>
