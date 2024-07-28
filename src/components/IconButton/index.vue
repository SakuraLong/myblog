<template>
  <el-icon :size="size">
    <component :is="icon" />
  </el-icon>
</template>

<script>
export default {
  props: {
    icon: {
      default: '',
      type: String
    },
    size: {
      default: 16,
      type: Number
    }
  }
}
</script>

<style>

</style>
