<template>
  <div class="projects-list-item border">
    <header
      class="flex"
      f-center
    >
      <span>{{ project.name }}</span>
    </header>
    <main
      class="flex gap"
      f-center
      f-c
    >
      <span :title="$t('Menu.Projects.Item.introduce')">{{ project.intr }}</span>
      <span
        msg
        :title="$t('Menu.Projects.Item.additionalInformation')"
      >{{ project.msg }}</span>
    </main>
    <footer
      class="flex gap"
      f-center
    >
      <el-tooltip
        :effect="theme"
        :content="$t('Menu.Projects.Item.duty') + ': ' + project.person"
        placement="bottom"
      >
        <el-icon :size="20">
          <User />
        </el-icon>
      </el-tooltip>
      <el-tooltip
        :effect="theme"
        :content="$t('Menu.Projects.Item.responsibleContent') + ': ' + project.do"
        placement="bottom"
      >
        <el-icon :size="20">
          <Memo />
        </el-icon>
      </el-tooltip>
      <a
        v-show="project.github"
        class="link flex"
        f-ai-c
        target="_blank"
        :href="project.github"
        title="github"
      >
        <el-icon :size="20">
          <svg
            t="1720787232424"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5653"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="200"
            height="200"
          ><path
            d="M64 512c0 195.2 124.8 361.6 300.8 422.4 22.4 6.4 19.2-9.6 19.2-22.4v-76.8c-134.4 16-140.8-73.6-150.4-89.6-19.2-32-60.8-38.4-48-54.4 32-16 64 3.2 99.2 57.6 25.6 38.4 76.8 32 105.6 25.6 6.4-22.4 19.2-44.8 35.2-60.8-144-22.4-201.6-108.8-201.6-211.2 0-48 16-96 48-131.2-22.4-60.8 0-115.2 3.2-121.6 57.6-6.4 118.4 41.6 124.8 44.8 32-9.6 70.4-12.8 112-12.8 41.6 0 80 6.4 112 12.8 12.8-9.6 67.2-48 121.6-44.8 3.2 6.4 25.6 57.6 6.4 118.4 32 38.4 48 83.2 48 131.2 0 102.4-57.6 188.8-201.6 214.4 22.4 22.4 38.4 54.4 38.4 92.8v112c0 9.6 0 19.2 16 19.2C832 876.8 960 710.4 960 512c0-246.4-201.6-448-448-448S64 265.6 64 512z"
            fill="currentColor"
            p-id="5654"
          /></svg>
        </el-icon>
      </a>
      <a
        v-show="project.link"
        class="link flex"
        f-ai-c
        target="_blank"
        :href="project.link"
        title="展示地址"
      >
        <el-icon :size="20">
          <View />
        </el-icon>
      </a>
      <!-- <p>负责内容: {{ project.do }}</p>
      <p>职责: {{ project.person }}</p>
      <p v-show="project.github">Github: {{ project.github }}</p>
      <p v-show="project.link">展示链接: {{ project.link }}</p> -->
    </footer>
  </div>
</template>

<script>
import ThemeManager from '@/assets/js/ThemeManager'
export default {
  props: {
    project: {
      default: () => {
        return {
          name: '',
          person: '',
          intr: '',
          do: '',
          github: '',
          link: '',
          msg: ''
        }
      },
      type: Object
    }
  },
  data() {
    return {
      theme: new ThemeManager().useMode === 0 ? 'light' : 'dark'
    }
  },
  mounted() {
    new ThemeManager().on('change', this.themeChange, this)
  },
  beforeUnmount() {
    new ThemeManager().off('change', this.themeChange, this)
  },
  methods: {
    themeChange(data) {
      this.theme = data.useMode === 0 ? 'light' : 'dark'
    }
  }
}
</script>

<style>
.projects-list-item {
  width: 400px;
  height: 200px;
  background-color: var(--bl-color-light-fill);
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  overflow: hidden;
  transition: box-shadow .3s;
}
.projects-list-item:hover {
  transition: box-shadow .3s;
  box-shadow: var(--bl-shadow-03);
}
.projects-list-item > header,
.projects-list-item > footer {
  height: 40px;
}
.projects-list-item > main {
  height: calc(100% - 40px * 2 - 10px * 2);
  overflow: auto;
  padding: 10px;
  font-size: 14px;
}

.projects-list-item > header > span {
  font-size: 17px;
  font-weight: bold;
}
.projects-list-item > main > span[msg]{
  font-style: italic;
  color: var(--bl-color-regular-text);
}
</style>
