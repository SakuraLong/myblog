<template>
  <div
    class="pagination padding flex"
    f-jc-sb
    f-ai-c
    p-phone0="rl"
  >
    <div
      :class="{'pagination--disabled': page === 1}"
      class="border"
      pointer
    >
      <router-link
        :to="prev"
        class="link flex padding"
        p-mini
        f-ai-c
      >
        <div
          class="flex"
          f-ai-c
        >
          <el-icon><ArrowLeft /></el-icon>
          <span>Prev</span>
        </div>
      </router-link>
    </div>
    <div>
      <span>{{ page }}</span>
      <span> / </span>
      <span>{{ pageCount }}</span>
    </div>
    <div
      :class="{'pagination--disabled': page === pageCount}"
      class="border"
      pointer
    >
      <router-link
        :to="next"
        class="link flex padding"
        p-mini
        f-ai-c
      >
        <div
          class="flex"
          f-ai-c
        >
          <span>Next</span>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      default: 1,
      type: Number
    },
    pageCount: {
      default: 1,
      type: Number
    }
  },
  computed: {
    prev() {
      if (this.page === 1) return ''
      if (this.page === 2) return '/'
      return '/page/' + (this.page - 1).toString()
    },
    next() {
      if (this.page === this.pageCount) return '/'
      return '/page/' + (this.page + 1).toString()
    }
  }
}
</script>

<style>
.pagination--disabled {
  pointer-events: none;
  visibility: hidden;
}
.pagination > div > span {
  color: var(--bl-color-primary-text)
}
.pagination > div > a {
  color: var(--bl-color-regular-text) !important;
}
.pagination > div:hover {
  box-shadow: var(--bl-shadow-02);
}
.pagination > div:hover > a {
  color: var(--bl-color-primary-text) !important;
}
</style>
