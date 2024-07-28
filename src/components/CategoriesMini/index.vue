<template>
  <div>
    <div
      v-for="cate, i in categories"
      :key="i"
      class="categories-mini__item flex"
      :style="{'--left': calculate(i).toString() + 'px'}"
    >
      <el-icon
        v-if="i === 0"
        class="categories-mini__icon"
        :size="18"
      >
        <Folder />
      </el-icon>
      <el-icon
        v-if="i > 0"
        class="categories-mini__icon"
        :size="18"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-v-746b41f0=""
        ><path
          d="M26.9041 18.8547C25.8483 19.9158 24.5926 20.757 23.2096 21.3296C21.8266 21.9023 20.3438 22.1949 18.8469 22.1907L6.2215 22.1907L10.4911 26.4615C10.7586 26.747 10.9046 27.1254 10.8982 27.5166C10.8919 27.9079 10.7337 28.2813 10.4571 28.5581C10.1805 28.8348 9.80716 28.9932 9.41594 28.9998C9.02471 29.0063 8.64625 28.8606 8.36053 28.5932L1.44084 21.6735C1.15854 21.3906 0.999999 21.0073 0.999999 20.6077C0.999999 20.208 1.15854 19.8247 1.44084 19.5418L8.16386 12.8175C8.30408 12.6776 8.47048 12.5666 8.65359 12.4909C8.83669 12.4153 9.03291 12.3764 9.23103 12.3766C9.42915 12.3767 9.6253 12.4159 9.80827 12.4919C9.99124 12.5679 10.1575 12.6791 10.2974 12.8194C10.4374 12.9596 10.5484 13.126 10.6241 13.3091C10.6997 13.4922 10.7386 13.6884 10.7384 13.8865C10.7382 14.0846 10.699 14.2808 10.6231 14.4638C10.5471 14.6467 10.4358 14.813 10.2956 14.9529L6.06246 19.1776L18.8469 19.1776C21.0689 19.1756 23.1993 18.2917 24.77 16.7199C26.3406 15.1481 27.223 13.0171 27.2234 10.795L27.2234 3.56457C27.2234 3.16501 27.3821 2.78181 27.6646 2.49928C27.9472 2.21674 28.3304 2.05802 28.7299 2.05802C29.1295 2.05802 29.5127 2.21674 29.7952 2.49928C30.0777 2.78181 30.2365 3.16501 30.2365 3.56457L30.2365 10.795C30.2424 12.2922 29.9509 13.7756 29.3788 15.1591C28.8068 16.5427 27.9656 17.7988 26.9041 18.8547V18.8547Z"
          fill="currentColor"
        /></svg>
      </el-icon>
      <router-link
        class="link categories-mini__link"
        :to="'/categories?category=' + cate.to"
      >
        {{ cate.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      default: () => [],
      type: Array
    }
  },
  methods: {
    calculate(i) {
      const base = i * 16
      const indent = i * 8
      const margin = i * 5
      return base + indent + margin
    }
  }
}
</script>

<style>
.categories-mini__item {
  padding-inline-start: var(--left, 0px);
  margin-bottom: 3px;
  overflow: hidden;
}
.categories-mini__icon {
  transform: scaleX(-1);
  margin-right: 5px;
  color: var(--bl-color-regular-text) !important;
}
.categories-mini__link {
  color: var(--bl-color-regular-text);
}
.categories-mini__link:hover {
  color: var(--bl-moonlight-blue-5);
}
</style>
