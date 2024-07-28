<template>
  <Structure>
    <template #header>
      <Header />
    </template>
    <template #top>
      <div class="error">
        <div>
          <h1>{{ errorTitle }}</h1>
          <p>{{ errorBody }}</p>
          <hr>
          <router-link
            class="link"
            to="/"
          >返回主页</router-link>
        </div>
      </div>
    </template>
  </Structure>
</template>

<script>
import Structure from '@/components/Structure'
import Header from '@/components/Header'
import store from '@/store'
import router from '@/router'
export default {
  components: {
    Structure,
    Header
  },
  data() {
    return {
      errorTitle: '',
      errorBody: ''
    }
  },
  mounted() {
    if (store.state.errorMsg === null) {
      router.push({
        path: '/'
      })
      return
    }
    this.errorTitle = store.state.errorMsg.title
    this.errorBody = store.state.errorMsg.body
    store.state.errorMsg = null
  }
}
</script>

<style>
.error {
  color: var(--bl-color-danger-base);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.error a {
  font-weight: bold;
}
</style>
