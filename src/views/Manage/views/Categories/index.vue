<template>
  <Structure :no-body="true">
    <template #header>
      <Header />
    </template>
    <template #top>
      <div class="manage-catagories-top">
        <header>
          <router-link
            class="link"
            to="/manage"
          >
            <span>
              返回
            </span>
          </router-link>
        </header>
        <CategoriesManager />
      </div>
    </template>
  </Structure>
</template>

<script>
import Structure from '@/components/Structure'
import Header from '@/components/Header'
import CategoriesManager from '@/components/CategoriesManager'
export default {
  components: {
    Structure,
    Header,
    CategoriesManager
  }
}
</script>

<style>
.manage-catagories-top {
  width: 100%;
  padding-top: 60px;
}
</style>
