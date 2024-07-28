<template>
  <Structure :no-body="true">
    <template #header>
      <Header />
    </template>
    <template #top>
      <div class="manage-home-top">
        <ManageHomeController />
      </div>
    </template>
  </Structure>
</template>

<script>
import Structure from '@/components/Structure'
import Header from '@/components/Header'
import ManageHomeController from '@/components/ManageHomeController'
export default {
  components: {
    Structure,
    Header,
    ManageHomeController
  }
}
</script>

<style>
.manage-home-top {
  width: 100%;
  height: calc(100vh - 60px);
  padding-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}
</style>
