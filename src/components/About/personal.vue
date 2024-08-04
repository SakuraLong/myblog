<template>
  <div
    class="about-personal flex gap"
    f-c
    g-mini
  >
    <div>
      <span
        name
        v-html="BlogManager.data.personalInfo.name"
      />
    </div>
    <div>
      <span
        about
        v-html="BlogManager.data.personalInfo.about"
      />
    </div>
  </div>
</template>

<script>
import BlogManager from '@/assets/js/BlogManager'
export default {
  data() {
    return {
      BlogManager
    }
  }
}
</script>

<style>
.about-personal span[name] {
  font-size: 20px;
  color: var(--bl-color-regular-text);
}
.about-personal span[about] {
  font-size: 17px;
  color: var(--bl-color-regular-text);
}
</style>
