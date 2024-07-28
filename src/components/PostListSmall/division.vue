<template>
  <div
    :id="data"
    f-jc-sb
    f-ai-c
    class="flex post-list-small__division"
  >
    <span
      class="font"
      s-larger
    >{{ data }}</span>
    <span
      v-if="showSort"
      class="flex border-button font post-list-small__division-icon"
      no-select
      pointer
      f-center
      @click="changeSortOrder()"
    >
      <el-icon
        class="post-list-small__division-icon--docu"
        :size="25"
      ><Document /></el-icon>
      <el-icon
        v-if="!ascendingOrder"
        class="post-list-small__division-icon--sort"
        :size="25"
      ><SortUp /></el-icon>
      <el-icon
        v-if="ascendingOrder"
        class="post-list-small__division-icon--sort"
        :size="25"
        style="transform: scaleX(-1);"
      ><SortDown /></el-icon>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      default: '',
      type: String
    },
    ascendingOrder: {
      default: true,
      type: Boolean
    },
    showSort: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    changeSortOrder() {
      this.$emit('changeSortOrder', !this.ascendingOrder)
    }
  }
}
</script>

<style>
.post-list-small__division {
  scroll-margin-top: 60px;
}
.post-list-small__division-icon {
  font-size: 16px;
  width: 50px;
  height: 50px;
  position: relative;
}
.post-list-small__division-icon--docu {
  position: absolute !important;
  left: 6px;
}
.post-list-small__division-icon--sort {
  position: absolute !important;
  left: 26px;
}
</style>
