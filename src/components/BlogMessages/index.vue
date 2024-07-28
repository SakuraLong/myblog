<template>
  <div
    class="flex gap"
    f-c
  >
    <h3
      class="about-h3 font"
      s-biger
    >{{ $t('BlogMessage.title') }}</h3>
    <div
      class="flex gap"
      f-w
    >
      <div
        v-for="item, i in list"
        :key="i"
        class="flex font"
        f-c
      >
        <span>{{ Array.isArray(item.msg) ? item.msg[0] + $t(item.msg[1]) : item.msg }}</span>
        <span>{{ $t(item.title) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import BlogManager from '@/BlogManager'
export default {
  data() {
    return {
      list: []
    }
  },
  watch: {
    '$i18n.locale'(newVal, oldVal) {
      this.changeLang(newVal)
    }
  },
  mounted() {
    this.list = new BlogManager().getMsg(this.$i18n.locale)
  },
  methods: {
    changeLang(lang) {
      this.list = new BlogManager().getMsg(lang)
    }
  }
}
</script>

<style>
</style>
