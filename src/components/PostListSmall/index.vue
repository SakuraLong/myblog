<template>
  <div
    class="flex gap"
    g-2
    f-c
  >
    <component
      :is="d.type"
      v-for="d, i in renderData"
      :key="i"
      :data="d.data"
      :type="renderType"
      :show-sort="i === 0"
      :ascending-order="ascendingOrder"
      @changeSortOrder="changeSortOrder"
    />
  </div>
</template>

<script>
import { deepClone } from '@/utils/utils'
import item from './item.vue'
import division from './division.vue'
export default {
  components: {
    item,
    division
  },
  data() {
    return {
      renderData: [],
      renderType: 'showTime',
      ascendingOrder: true
    }
  },
  methods: {
    changeSortOrder(order) {
      this.$emit('changeSortOrder', order)
    },
    render(posts, ascendingOrder, type) {
      this.ascendingOrder = ascendingOrder
      posts = deepClone(posts)
      let rd = []
      if (type === 'time') {
        this.renderType = 'showTime'
        rd = this.renderBase(posts, 'publicationTimeOrigin', this.getYMDFromTimestamp, (post, t) => {
          post.showTime = t.md
        })
      } else if (type === 'wordCount') {
        this.renderType = 'wordCount'
        rd = this.renderBase(posts, 'wordCount', this.getWordCount)
      } else if (type === 'idEn') {
        this.renderType = 'idEn'
        rd = this.renderBase(posts, 'idEn', this.getIdEn)
      } else if (type === 'pinyin') {
        this.renderType = 'titlePinyin'
        rd = this.renderBase(posts, 'titlePinyin', this.getIdEn)
      }
      this.renderNav(rd)
      this.renderData = rd
    },
    renderNav(list) {
      const res = []
      list.forEach((item) => {
        if (item.type === 'division') {
          res.push({
            name: item.data,
            to: '#' + item.data
          })
        }
      })
      this.$emit('renderNav', res)
    },
    renderBase(posts, key, func, funcToValue) {
      const res = []
      let curentData = ''
      posts.forEach((post) => {
        const t = func(post[key])
        if (curentData !== t.curentData) {
          const division = {
            type: 'division',
            data: t.division
          }
          res.push(division)
          curentData = t.curentData
        }
        if (funcToValue) funcToValue(post, t)
        res.push(
          {
            type: 'item',
            data: post
          }
        )
      })
      return res
    },
    getYMDFromTimestamp(timestamp) {
      const date = new Date(timestamp)
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const year = date.getFullYear().toString()
      return {
        md: `${month}-${day}`,
        division: year,
        curentData: year
      }
    },
    getWordCount(wordCount) {
      const n = parseInt(wordCount / 500) * 500
      return {
        division: n,
        curentData: n
      }
    },
    getIdEn(idEn) {
      const n = idEn.charAt(0).toLocaleUpperCase()
      return {
        division: n,
        curentData: n
      }
    }
  }
}
</script>

<style>

</style>
