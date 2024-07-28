<template>
  <div
    ref="item"
    class="m-search-list-item"
  >
    <router-link
      :to="'/post/' + path"
      class="link flex"
      f-ai-c
      f-c
    >
      <div
        class="m-search-list-item__header"
        m-title
      >
        {{ showTitle }}
      </div>
      <div class="m-search-list-item__preview">{{ showPreview }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: '',
      type: String
    },
    preview: {
      default: '',
      type: String
    },
    index: {
      default: 0,
      type: Number
    },
    path: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      showTitle: '',
      showPreview: '',
      timer: null,
      sonTimer: null
    }
  },
  watch: {
    title() {
      this.$refs.item.classList.remove('m-search-list-item--rotate')
      if (this.timer) clearTimeout(this.timer)
      const delay = this.index * 80
      this.$refs.item.style.animationDelay = delay.toString() + 'ms'
      this.$refs.item.classList.toggle('m-search-list-item--rotate')
      this.timer = setTimeout(() => {
        this.showTitle = this.title
        this.showPreview = this.preview
        if (this.sonTimer) clearTimeout(this.sonTimer)
        this.sonTimer = setTimeout(() => {
          this.$refs.item.classList.toggle('m-search-list-item--rotate')
          this.$refs.item.style.animationDelay = '0ms'
        }, 250)
      }, 250 + delay)
    }
  },
  mounted() {
    this.showTitle = this.title
    this.showPreview = this.preview
  },
  beforeUnmount() {
    if (this.timer) clearTimeout(this.timer)
    if (this.sonTimer) clearTimeout(this.sonTimer)
  }
}
</script>

<style>
.m-search-list-item {
  width: 100%;
  border-top: 1px dashed var(--bl-color-darker-border);
  transition: .3s;
}
.m-search-list-item:hover {
  transition: .3s;
  background-color: var(--bl-selected-background-color);
}
.m-search-list-item--rotate {
  animation-name: rotate;
  animation-duration: 500ms;
}
@keyframes rotate {
  0% {
    transform: rotateX(0deg);
    color:inherit
  }
  50% {
    transform: rotateX(180deg);
    color: transparent;
  }
  100% {
    transform: rotateX(360deg);
    color:inherit
  }
}
.m-search-list-item__header {
  font-weight: bold;
  font-size: 24px;
  margin: 5px 0;
}
.m-search-list-item__preview {
  margin: 5px 0;
  padding: 0px 50px;
}
</style>
