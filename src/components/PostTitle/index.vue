<template>
  <header class="font">
    <div
      class="flex margin width-100"
      margin0="tlr"
      f-jc-c
    >
      <router-link
        v-if="link"
        class="font link"
        :to="post.to"
        w-b
        s-larger
      >
        <span title-f>{{ post.title }}</span>
      </router-link>
      <span
        v-else
        class="font"
        s-larger
        w-b
        title-f
      >{{ post.title }}</span>
    </div>
    <div no-select>
      <div
        class="flex gap"
        f-jc-c
        g-mini
      >
        <span
          :title="$t('PostTitle.publicationTime') + post.publicationTimeFormat"
          class="flex gap"
          inline-flex
          f-ai-c
          g-mini
        >
          <el-icon><EditPen /></el-icon>
          <span>{{ post.publicationTime }}</span>
        </span>
        <span v-if="post.modificationTime">-</span>
        <span
          v-if="post.modificationTime"
          :title="$t('PostTitle.modificationTime') + post.modificationTimeFormat"
          class="flex gap"
          f-ai-c
          g-mini
        >
          <el-icon><Edit /></el-icon>
          <span>{{ post.modificationTime }}</span>
        </span>
      </div>
      <div
        class="flex gap"
        f-jc-c
        g-mini
      >
        <span
          :title="$t('PostTitle.wordCount')"
          class="flex gap"
          f-ai-c
          g-mini
        >
          <el-icon><Document /></el-icon>
          <span>{{ post.wordCountStr }}</span>
        </span>
        <span>-</span>
        <span
          :title="$t('PostTitle.readingTime')"
          class="flex gap"
          f-ai-c
          g-mini
        >
          <el-icon><Clock /></el-icon>
          <span>{{ post.readingTime }}</span>
        </span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    post: {
      default: () => {
        return {
          title: '',
          to: '',
          publicationTime: '',
          modificationTime: '',
          wordCountStr: '',
          readingTime: ''
        }
      },
      type: Object
    },
    link: {
      default: true,
      type: Boolean
    }
  }
}
</script>

<style>
</style>
