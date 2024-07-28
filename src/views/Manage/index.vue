<template>
  <router-view />
</template>

<script>
export default {
  beforeRouteLeave(to, from, next) {
    // console.log('beforeRouteLeave')
    // const answer = window.confirm('如果是刷新页面，则存储的数据会丢失，必须重新从登录页面进入')
    // if (answer) {
    //   next()
    // } else {
    //   next(false)
    // }
    next()
  },
  mounted() {
    window.addEventListener('beforeunload', this.beforeunload)
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload)
  },
  methods: {
    beforeunload(e) {
      const msg = '刷新页面，管理页面存储的数据会丢失，必须重新从登录页面进入以获取数据'
      e.returnValue = msg
      return msg
    }
  }
}
</script>

<style>

</style>
