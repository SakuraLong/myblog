<template>
  <Structure :no-body="true">
    <template #header>
      <Header />
    </template>
    <template #top>
      <div class="search">
        <SearchList />
      </div>
    </template>
  </Structure>
</template>

<script>
import Structure from '@/components/Structure'
import SearchList from '@/components/SearchList'
import Header from '@/components/Header'
import { scrollToTop } from '@/utils/utils'
export default {
  components: {
    Structure,
    SearchList,
    Header
  },
  beforeUnmount() {
    scrollToTop()
  }
}
</script>

<style>
.search {
  position: relative;
  width: 100%;
  height: calc(100vh - 30px);
  padding-top: 30px;
}
</style>
