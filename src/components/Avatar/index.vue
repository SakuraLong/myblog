<template>
  <div
    class="avatar"
    :size="size"
  >
    <img
      :src="src"
      alt="avatar"
      draggable="false"
    >
  </div>
</template>

<script>
import BlogManager from '@/BlogManager'
export default {
  props: {
    size: {
      default: 'default', // mini large
      type: String
    }
  },
  data() {
    return {
      src: BlogManager.data.personalInfo.avatar || require('./avatar.png')
    }
  }
}
</script>

<style>
.avatar {
  user-select: none;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
}
.avatar[size=default] {
  width: 100px;
  height: 100px;
}
.avatar[size=mini] {
  width: 50px;
  height: 50px;
}
.avatar[size=large] {
  width: 130px;
  height: 130px;
}
.avatar img {
  width: 100%;
}
</style>
