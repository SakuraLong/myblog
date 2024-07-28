<template>
  <div
    class="links-item flex width-100 font"
    f-ai-c
    s-small
  >
    <component :is="link[0]" />
    <a
      v-show="!link[4]"
      class="link"
      :href="link[3]"
      target="_blank"
    >
      <span>{{ link[2] }}</span>
    </a>
    <span
      v-show="link[4]"
      :title="link[3]"
      @click="copy"
      @touchend="copy"
    >{{ link[2] }}</span>
  </div>
</template>

<script>
import github from './svg/github.vue'
import blbl from './svg/blbl.vue'
import email from './svg/email.vue'
import { message } from '@/utils/utils'
export default {
  components: {
    github,
    blbl,
    email
  },
  props: {
    link: {
      default: () => [],
      type: Array
    }
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.link[2])
        .then(() => {
          message(this.link[3] + '已复制到剪贴板！', 'success')
        })
        .catch(err => {
          message('复制文本失败：' + err)
        })
    }
  }
}
</script>

<style>
.links-item > a {
  color: var(--bl-color-regular-text) !important;
}
.links-item > span {
  cursor: pointer;
}
.links-item > a:hover,
.links-item > span:hover {
  color: var(--bl-moonlight-blue-5) !important;
}
.links-item > svg {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
</style>
