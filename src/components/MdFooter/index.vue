<template>
  <footer>
    <div
      class="md-footer__change flex"
      f-jc-sb
    >
      <router-link
        class="link"
        l-hover
        :to="data.last.to"
      >
        <span>{{ $t('MdFooter.prev') }}</span>
        <span>{{ data.last.title }}</span>
      </router-link>
      <router-link
        class="link"
        l-hover
        :to="data.next.to"
      >
        <span>{{ $t('MdFooter.next') }}</span>
        <span>{{ data.next.title }}</span>
      </router-link>
    </div>
  </footer>
</template>

<script>
import BlogManager from '@/assets/js/BlogManager'
export default {
  props: {
    id: {
      default: -1,
      type: Number
    }
  },
  computed: {
    data() {
      const posts = new BlogManager().pm.getLastAndNextById(this.id)
      const last = posts.last
      const next = posts.next
      const defaultData = {
        to: '',
        title: ''
      }
      return {
        last: last || defaultData,
        next: next || defaultData
      }
    }
  }
}
</script>

<style>
.md-footer__change {
  padding: 45px;
  padding-top: 10px !important;
}
@media (max-width: 767px) {
  .md-footer__change {
    padding: 15px !important;
    padding-top: 10px !important;
  }
}
</style>
