<template>
  <div class="act-title">
    <h1>{{ Array.isArray(title) ? $t(title[0]) + title[1] : title === '' ? title : $t(title) }}</h1>
    <span>{{ (pre === '' ? pre : $t(pre)) + amount + (suf === '' ? suf : $t(suf)) }}</span>
  </div>
</template>

<script>
import BlogManager from '@/assets/js/BlogManager'
export default {
  props: {
    type: {
      default: '', // archive category tag custom
      type: String
    },
    custom: {
      default: () => {
        return {
          title: '',
          pre: '',
          suf: '',
          amount: '0'
        }
      },
      type: Object
    }
  },
  data() {
    return {
      title: '',
      pre: 'ACTTitle.pre',
      suf: '',
      amount: '0'
    }
  },
  mounted() {
    switch (this.type) {
      case 'archive':
        this.renderArchive()
        break
      case 'category':
        this.renderCategory()
        break
      case 'tag':
        this.renderTag()
        break
      case 'custom':
        this.renderCustom()
        break
    }
  },
  methods: {
    renderArchive() {
      this.title = 'ACTTitle.title.archive'
      this.suf = 'ACTTitle.suf.archive'
      this.amount = new BlogManager().pm.getPostsList().length.toString()
    },
    renderCategory() {
      this.title = 'ACTTitle.title.category'
      this.suf = 'ACTTitle.suf.category'
      this.amount = new BlogManager().cm.getCategories().length.toString()
    },
    renderTag() {
      this.title = 'ACTTitle.title.tag'
      this.suf = 'ACTTitle.suf.tag'
      this.amount = new BlogManager().tm.getTags().length.toString()
    },
    renderCustom() {
      this.title = this.custom.title
      this.pre = this.custom.pre
      this.suf = this.custom.suf
      this.amount = this.custom.amount
    }
  }
}
</script>

<style>
.act-title {
  padding: 15px 0px;
}
.act-title > h1 {
  margin-block-start: 0;
  margin-block-end: 0;
  color: var(--bl-color-primary-text);
  font-weight: 600;
}
.act-title > span {
  color: var(--bl-color-secondary-text);
}
</style>
