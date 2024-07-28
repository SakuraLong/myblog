<template>
  <div>
    <h2 class="aside-h2">
      {{ $t('MdToc.title') }}
    </h2>
    <div
      id="contents-container"
      class="contents-container"
      v-html="tocHtml"
    />
  </div>
</template>

<script>
export default {
  props: {
    tocHtml: {
      default: '',
      type: String
    },
    ast: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      currentA: null
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
    this.onScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll(e) {
      const aContainer = document.getElementById('contents-container')
      const aElements = Array.from(aContainer.querySelectorAll('a'))
      const idList = aElements.map((a) => a.getAttribute('href').slice(1))
      const hElements = idList.map((id) => document.getElementById(id))
      const hUse = hElements.map((h) => {
        return {
          h,
          top: h.getBoundingClientRect().top
        }
      })
      const l = hUse.length
      for (let i = 0; i < l; i++) {
        const h = hUse[i]
        const a = aElements[i]
        if (h.top <= 40 && (!hUse[i + 1] || hUse[i + 1].top > 40)) {
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
.contents-container {
  max-width: 240px;
  color: var(--bl-color-primary-text);
}
.table-of-contents ul {
  padding-inline-start: 0;
}
.table-of-contents li {
  margin: 0;
  list-style: none;
}
.table-of-contents a {
  display: block;
  padding: .5rem 1rem;
  text-decoration: none;
  transition: color .2s;
  color: var(--bl-color-regular-text);
  overflow: hidden;
  border-left: 2px solid var(--bl-color-base-border);
}
.table-of-contents a:hover {
  transition: color .2s;
  color: var(--bl-moonlight-blue-4);
}
.table-of-contents a[aria-current=true] {
  font-weight: bold;
  color: var(--bl-color-primary-text) !important;
  background-color: var(--bl-link-background-color);
  border-left: 2px solid var(--bl-moonlight-blue-5);
}
.table-of-contents a:active {
  text-decoration: none;
}
.table-of-contents a:visited {
  text-decoration: none;
}
</style>
