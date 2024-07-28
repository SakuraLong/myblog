<template>
  <div>
    <h2 class="aside-h2">
      {{ $t('PostsNav.title') }}
    </h2>
    <nav
      ref="nav"
      class="posts-nav"
    >
      <ul>
        <li
          v-for="item, i in list"
          :key="i"
        >
          <a
            class="link"
            :href="item.to"
          >
            {{ item.name }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      default: () => {
        return [
          {
            name: '',
            to: ''
          }
        ]
      },
      type: Array
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
    this.$nextTick(() => {
      this.onScroll()
    })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll(e) {
      // 不用监听list改变 list改变时肯定已经滚动到顶部
      const aContainer = this.$refs.nav
      const aElements = Array.from(aContainer.querySelectorAll('a'))
      const idList = aElements.map((a) => a.getAttribute('href').slice(1))
      const hElements = idList.map((id) => document.getElementById(id))
      const hUse = hElements.filter((h) => h !== null).map((h) => {
        return {
          h,
          top: h.getBoundingClientRect().top
        }
      })
      const l = hUse.length
      for (let i = 0; i < l; i++) {
        const h = hUse[i]
        const a = aElements[i]
        const offset = 60
        if (h.top <= 40 + offset && (!hUse[i + 1] || hUse[i + 1].top > 40 + offset)) {
          a.setAttribute('aria-current', 'true')
        } else {
          a.removeAttribute('aria-current')
        }
      }
    }
  }
}
</script>

<style>
.posts-nav {
}
.posts-nav > ul {
  padding-inline-start: 15px;
  color: var(--bl-color-regular-text);
}
.posts-nav > ul > li {
  /* list-style: none; */
  margin-bottom: 5px;
}
.posts-nav > ul > li > a {
  display: inline-block;
  padding: 5px;
  padding-left: 0px;
  color: var(--bl-color-regular-text);
}
.posts-nav > ul > li > a:hover {
  text-decoration: underline;
}
.posts-nav > ul > li:has(a[aria-current]) {
  color: var(--bl-moonlight-blue-5);
}
.posts-nav > ul > li > a[aria-current] {
  color: var(--bl-moonlight-blue-5);
}
</style>
