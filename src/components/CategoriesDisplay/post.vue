<template>
  <div class="cd-item-post">
    <router-link
      class="link flex"
      :to="post.to"
      inline-flex
      f-ai-c
    >
      <el-icon :size="18">
        <Document />
      </el-icon>
      <span>{{ post.title }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      default: () => {
        return {
          idEn: '',
          title: ''
        }
      },
      type: Object
    }
  }
}
</script>

<style>
.cd-item-post {
  /* margin-bottom: 10px; */
}
.cd-item-post > a:hover {
  color: var(--bl-moonlight-blue-5);
}
.cd-item-post > a > i {
  margin-right: 5px;
}
</style>
