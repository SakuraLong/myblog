<template>
  <div
    class="padding flex gap"
    f-c
    padding0="lr"
  >
    <header
      class="flex font gap"
      f-c
    >
      <div
        class="flex"
        f-ai-c
        f-jc-sb
      >
        <div
          class="about-name"
          @click="clickAboutName"
        >
          <span v-html="BlogManager.data.personalInfo.blogName" />
          <span v-html="BlogManager.data.personalInfo.blogDesc" />
        </div>
        <Avatar />
      </div>
      <personal />
    </header>
    <main>
      <Links />
      <hr class="about-hr">
      <HotTags />
      <hr class="about-hr">
      <BlogMessages />
    </main>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import Links from '@/components/Links'
import HotTags from '@/components/HotTags'
import BlogMessages from '@/components/BlogMessages'
import router from '@/router'
import store from '@/store'
import BlogManager from '@/BlogManager'
import personal from './personal.vue'
export default {
  components: {
    Avatar,
    Links,
    HotTags,
    BlogMessages,
    personal
  },
  data() {
    return {
      amount: 0,
      timer: null,
      BlogManager: BlogManager
    }
  },
  methods: {
    clickAboutName() {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(this.timeout, 500)
      this.amount++
      if (this.amount > 5) {
        store.state.login = true
        router.push('/manage/login')
      }
    },
    timeout() {
      this.amount = 0
      this.timer = 0
    }
  }
}
</script>

<style>
.about-h3 {
  margin-block-start: 0;
  margin-block-end: 0;
}
.about-hr {
  opacity: 0.5;
  border-color: var(--bl-color-lighter-border);
  width: calc(100% / 3 * 2);
  margin: 1rem auto;
}
.about-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.about-name {
  display: flex;
  flex-direction: column;
  user-select: none;
}
.about-name > span {
  font-size: 24px;
  overflow: visible;
}
.about-name > span:first-child {
  margin: 15px 0px;
}
.about-name > span:last-child {
  margin-left: 0px;
  white-space: nowrap;
}
.about-name--elysia {
  color: var(--bl-elysia-base);
}
</style>
