<template>
  <div
    class="cd-item flex gap"
    f-c
    g-07
  >
    <div
      class="cd-item__name flex gap"
      f-ai-c
      g-05
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
      <el-input
        v-model="item_.name"
        size="small"
        style="width: 200px;"
      />
      <el-icon
        pointer
        @click="add"
      >
        <Plus />
      </el-icon>
      <el-icon
        pointer
        @click="remove"
      >
        <Minus />
      </el-icon>
      <el-icon
        pointer
        @click="up"
      >
        <ArrowUp />
      </el-icon>
      <el-icon
        pointer
        @click="down"
      >
        <ArrowDown />
      </el-icon>
    </div>
    <div
      v-show="unfold && (item.children.length > 0 || posts.length > 0)"
      class="cd-item__fold flex gap"
      f-c
    >
      <CDItem
        v-for="_, i in item_.children"
        :key="i"
        v-model:item="item_.children[i]"
        :index="i"
        :all="item_.children.length"
        @removeChild="removeChild"
        @upChild="upChild"
        @downChild="downChild"
      />
    </div>
  </div>
</template>

<script>
import BlogManager from '@/BlogManager'
export default {
  name: 'CDItem',
  props: {
    item: {
      default: () => {
        return {
          name: '',
          children: [],
          unfold: false
        }
      },
      type: Object
    },
    index: {
      default: 0,
      type: Number
    },
    all: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      unfold: false,
      posts: []
    }
  },
  computed: {
    item_: {
      get() {
        return this.item
      },
      set(val) {
        this.$emit('update:item', val)
      }
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
    },
    add() {
      const t = {
        name: '',
        children: [],
        unfold: false
      }
      this.item_.children.push(t)
    },
    remove() {
      this.$emit('removeChild', this.index)
    },
    up() {
      this.$emit('upChild', this.index)
    },
    down() {
      this.$emit('downChild', this.index)
    },
    removeChild(i) {
      this.item_.children.splice(i, 1)
    },
    upChild(i) {
      if (i === 0) return
      const child = this.item_.children[i]
      this.item_.children.splice(i, 1)
      this.item_.children.splice(i - 1, 0, child)
    },
    downChild(i) {
      if (i === this.item_.children.length - 1) return
      const child = this.item_.children[i]
      this.item_.children.splice(i, 1)
      this.item_.children.splice(i + 1, 0, child)
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
