<template>
  <div
    class="m-search-list flex width-100"
    f-ai-c
    f-c
  >
    <div
      ref="header"
      class="m-search-list__header flex width-100"
      f-ai-c
      f-c
      :class="{'m-search-list__header--sticky': sticky}"
    >
      <input
        v-model="key"
        type="text"
        :placeholder="$t('SearchList.search')"
        spellcheck="false"
      >
      <div class="m-search-list__amount">
        {{ $t('SearchList.searchResPre') }}
        {{ list.length }}
        {{ $t('SearchList.searchResSuf') }}
      </div>
    </div>
    <TransitionGroup
      name="m-search-list-group"
      @enter="onEnter"
      @leave="onLeave"
    >
      <item
        v-for="post, i in list"
        :key="i"
        :title="post.title"
        :data-index="i"
        :index="i"
        :preview="post.abstract"
        :path="post.idEn"
      />
    </TransitionGroup>
  </div>
</template>

<script>
import item from './item.vue'
import BlogManager from '@/assets/js/BlogManager'
import store from '@/store'
export default {
  components: {
    item
  },
  data() {
    return {
      list: [],
      key: store.state.searchKey,
      sticky: false
    }
  },
  watch: {
    key(n) {
      store.state.searchKey = n
      this.list = new BlogManager().pm.search(n)
    }
  },
  mounted() {
    this.list = new BlogManager().pm.search(this.key)
  },
  methods: {
    onEnter(el, done) {
      const delay = parseInt(el.getAttribute('data-index')) * 80
      el.style.transitionDelay = delay.toString() + 'ms'
      setTimeout(() => {
        el.style.transitionDelay = '0ms'
        done(el)
      }, delay + 500)
    },
    onLeave(el, done) {
      const delay = parseInt(el.getAttribute('data-index')) * 80
      el.style.transitionDelay = delay.toString() + 'ms'
      setTimeout(() => {
        el.style.transitionDelay = '0ms'
        done(el)
      }, delay + 500)
    },
    scroll() {
      if (this.$refs.header.getBoundingClientRect().top < 10) {
        this.sticky = true
      } else {
        this.sticky = false
      }
    }
  }
}
</script>

<style>
.m-search-list {
  padding-top: 50px;
}
.m-search-list__header {
  position: sticky;
  top: 60px;
  background-color: transparent;
  transition: .3s;
  padding: 5px 0;
  color: var(--bl-color-primary-text);
  background-color: var(--bl-color-lighter-fill);
}
.m-search-list__header--sticky {
  transition: .3s;
  background-color: var(--bl-color-lighter-fill);
}
.m-search-list input {
  border: 1px solid var(--bl-color-dark-border);
  width: calc(100% - 10px * 2 - 10px * 2);
  max-width: 700px;
  height: 60px;
  border-radius: 50px;
  padding: 0px 10px;
  margin: 0px 10px;
  outline: none;
  font-size: 30px;
  text-align: center;
  color: var(--bl-color-primary-text);
  background-color: var(--bl-color-lighter-fill);
}
.m-search-list input:focus {
  border: 1px solid var(--bl-color-dark-border);
}
.m-search-list__amount {
  margin: 5px 0px;
}

.m-search-list-group-enter-active,
.m-search-list-group-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease, color 0.5s ease;
  transform: rotateX(0deg);
  pointer-events: none !important;
}
.m-search-list-group-enter-from,
.m-search-list-group-leave-to {
  opacity: 0;
  color: transparent;
}
.m-search-list-group-enter-from {
  transform: rotateX(180deg);
}
.m-search-list-group-leave-to {
  transform: rotateX(-180deg);
}
</style>
