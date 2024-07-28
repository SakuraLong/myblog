<template>
  <div class="menu-about">
    <header>
      <div name>
        <span v-html="BlogManager.data.personalInfo.hello" />
        <span>this is <span v-html="BlogManager.data.personalInfo.helloName" /></span>
      </div>
      <Avatar size="large" />
    </header>
    <main>
      <div>
        <span v-html="BlogManager.data.personalInfo.detailAbout" />
      </div>
      <div>
        <h2>{{ $t('Menu.About.aka') }}</h2>
        <ul>
          <li
            v-for="html, i in BlogManager.data.personalInfo.aka"
            :key="i"
            v-html="html"
          />
        </ul>
      </div>
      <div>
        <h2>{{ $t('Menu.About.aboutMe') }}</h2>
        <ul>
          <li
            v-for="html, i in BlogManager.data.personalInfo.aboutMe"
            :key="i"
            v-html="html"
          />
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import { scrollToTop } from '@/utils/utils'
import BlogManager from '@/BlogManager'
export default {
  components: {
    Avatar
  },
  data() {
    return {
      BlogManager: BlogManager
    }
  },
  beforeUnmount() {
    scrollToTop()
  }
}
</script>

<style>
.menu-about {
  padding: 10px 20px;
  color: var(--bl-color-primary-text);
}
.menu-about > header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 35px;
  font-weight: bold;
}
.menu-about > header > div[name] {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
