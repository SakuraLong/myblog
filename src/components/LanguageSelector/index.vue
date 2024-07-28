<template>
  <div
    class="lang-selector flex"
    f-ai-c
    no-select
  >
    <details ref="details">
      <summary
        class="border-button flex"
        bb-small
        f-ai-c
        pointer
      >
        <el-icon :size="18">
          <svg
            t="1721531009807"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4250"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="200"
            height="200"
          ><path
            d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64zM307.648 711.168l-4.224 1.792a513.024 513.024 0 0 0-83.392 48.32 383.04 383.04 0 0 0 216.192 127.232c-56.768-56.064-99.712-115.2-128.64-177.28z m407.296 22.208l-5.76 10.688c-27.264 49.28-63.68 96.512-109.056 141.76a383.232 383.232 0 0 0 185.728-104.64l-1.28-0.96a558.464 558.464 0 0 0-69.632-46.848z m-174.464-58.112l0.064 179.2c50.56-47.808 89.472-97.408 116.864-148.992a427.264 427.264 0 0 0-116.928-30.208z m-64-1.536a481.92 481.92 0 0 0-108.224 15.872c24.768 51.52 60.736 100.992 108.16 148.608zM894.656 544h-125.44a464 464 0 0 1-28.032 130.752 624.704 624.704 0 0 1 101.248 69.952l-15.616-12.8a381.888 381.888 0 0 0 67.84-187.904z m-630.272 0h-135.04c4.928 60.16 23.744 116.288 53.248 165.376a567.744 567.744 0 0 1 101.952-58.112A456.768 456.768 0 0 1 264.384 544z m440.64 0L540.48 544v67.008a490.88 490.88 0 0 1 142.72 35.84 398.08 398.08 0 0 0 21.824-102.848zM476.48 544h-147.84c2.176 28.672 7.424 56.768 15.744 84.352l0.384 1.28a543.808 543.808 0 0 1 131.712-19.968V544z m-347.136-64h135.04c2.176-31.872 7.488-63.104 16-93.696a571.84 571.84 0 0 1-99.712-57.472l-4.48-3.264A381.632 381.632 0 0 0 129.344 480z m558.4-89.28l-11.264 4.736a488.448 488.448 0 0 1-135.936 33.088l-0.064 51.456h164.544a399.744 399.744 0 0 0-17.28-89.28z m-347.008 17.92l-0.896 3.264a399.36 399.36 0 0 0-11.264 68.16L476.48 480v-50.112a541.376 541.376 0 0 1-135.744-21.248z m492.8-106.624l8.896-7.232a629.12 629.12 0 0 1-96.704 67.456c12.992 38.144 20.8 77.44 23.488 117.76h125.44a381.76 381.76 0 0 0-61.12-177.984z m-471.424 45.632a448.64 448.64 0 0 0 114.368 18.176l-0.064-180.032c-51.52 51.776-89.536 105.6-114.304 161.856z m178.432-178.112V364.16c40.896-4.288 82.496-15.36 123.392-32.832-27.52-56.256-68.608-110.08-123.392-161.92z m-104.32-34.048l-8.384 1.792a384 384 0 0 0-215.872 135.04l-10.88-7.872c34.112 25.856 67.328 46.08 100.8 61.44 28.672-66.944 73.6-130.432 134.336-190.4z m163.84 2.624l11.52 11.648c46.72 48.704 83.328 99.648 109.504 152.768 21.632-12.544 42.88-27.008 63.488-43.2l9.6-7.744a383.68 383.68 0 0 0-194.112-113.472z"
            fill="currentColor"
            p-id="4251"
          /></svg>
        </el-icon>
        <span>{{ nowLang[0] }}</span>
        <el-icon :size="18">
          <ArrowDown class="lang-selector__arrow-down" />
          <ArrowUp class="lang-selector__arrow-up" />
        </el-icon>
      </summary>
      <div :class="{'lang-selector__langs--absolubte': absolubte}">
        <div
          v-for="item, i in langs"
          :key="i"
          class="border-button flex"
          bb-small
          f-ai-c
          pointer
          @click="changeLang(i)"
        >
          <span>{{ item[0] }}</span>
        </div>
      </div>
    </details>
  </div>
</template>

<script>
import { get, set } from '@/utils/stroage'
export default {
  props: {
    absolubte: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      KEY: 'blog-lang',
      langs: [
        ['简体中文', 'zh-Hans', 0],
        ['English', 'en', 1]
      ],
      nowLang: ['简体中文', 'zh-Hans', 0]
    }
  },
  created() {
    this.nowLang = get(0, this.KEY, this.nowLang, 'JSON')
  },
  mounted() {
    window.addEventListener('click', this.autoClose)
  },
  unmounted() {
    window.removeEventListener('click', this.autoClose)
  },
  methods: {
    changeLang(index) {
      this.$i18n.locale = this.langs[index][1]
      this.nowLang = this.langs[index]
      set(0, this.KEY, this.nowLang, 'JSON')
    },
    autoClose(e) {
      const details = this.$refs.details
      const summary = details.querySelector('summary')
      if (!summary.contains(e.target)) {
        details.open = false
      }
    }
  }
}
</script>

<style>
.lang-selector {
  color: var(--bl-color-primary-text);
}
.lang-selector > details {
  position: relative;
}
.lang-selector__langs--absolubte {
  border-radius: 5px;
  position: absolute;
  top: 100%;
  padding: 8px;
  border: 1px solid var(--bl-color-base-border);
  box-shadow: var(--bl-shadow-02);
  background-color: var(--bl-color-lighter-fill);
  width: 120px;
}
.lang-selector > details > summary,
.lang-selector > details > div > *{
  padding: 5px;
}
.lang-selector > details > summary > *:nth-child(n+2),
.lang-selector > details > div > * > *:nth-child(n+2) {
  margin-left: 5px;
}
.lang-selector > details .lang-selector__arrow-up {
  display: none;
}
.lang-selector > details[open] .lang-selector__arrow-down {
  display: none;
}
.lang-selector > details[open] .lang-selector__arrow-up {
  display: inline;
}
</style>
