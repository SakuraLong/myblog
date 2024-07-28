<template>
  <div
    class="cd-item flex gap"
    f-c
    g-07
  >
    <div
      class="cd-item__name flex"
      f-ai-c
    >
      <el-icon
        :size="18"
        :class="{'cd-item__name-icon--unfold': unfold}"
        no-select
        pointer
        @click="changeFold"
      >
        <FolderAdd v-show="!unfold" />
        <FolderRemove v-show="unfold" />
      </el-icon>
      <router-link
        :to="'/categories?category=' + item.params"
        class="link cd-item__name-link"
      >
        {{ item.name }}
      </router-link>
    </div>
    <div
      v-show="unfold && (item.children.length > 0 || posts.length > 0)"
      class="cd-item__fold flex gap"
      f-c
      g-07
    >
      <CDItem
        v-for="item_, i in item.children"
        :key="i"
        :item="item_"
      />
      <post
        v-for="p, i in posts"
        :key="i"
        :post="p"
      />
    </div>
  </div>
</template>

<script>
import BlogManager from '@/BlogManager'
import post from './post.vue'
export default {
  name: 'CDItem',
  components: {
    post
  },
  props: {
    item: {
      default: () => {
        return {
          name: '',
          params: '',
          children: [],
          unfold: false
        }
      },
      type: Object
    }
  },
  data() {
    return {
      unfold: false,
      posts: []
    }
  },
  created() {
    this.unfold = this.item.unfold
    const bm = new BlogManager()
    this.posts = BlogManager.decorator.sortByCategoryIntroduce(bm.pm.sortByPublicationTime(false, bm.cm.getPosts(this.item.params)))
  },
  methods: {
    changeFold() {
      this.unfold = !this.unfold
    }
  }
}
</script>

<style>
.cd-item {
  /* margin-bottom: 10px; */
}
.cd-item__name {
  /* margin-bottom: 10px; */
}
.cd-item__name > i {
  margin-right: 5px;
  color: var(--bl-color-primary-text);
}
.cd-item__fold {
  padding-inline-start: 15px;
}
.cd-item__name-link:hover,
.cd-item__name-icon--unfold {
  color: var(--bl-moonlight-blue-5) !important;
}
</style>
