<!--
structure 中的left和right插槽 传递的组件，不能通过函数传递数据
每一次插槽改变位置都会重新创建组件实例
-->
<template>
  <div class="structure-outer">
    <header>
      <slot name="header" />
    </header>
    <div>
      <slot name="top" />
    </div>
    <div
      v-if="!noBody"
      class="structure"
      :class="{
        'structure--only-main': onlyMain,
        'structure--aside-padding': asidePadding
      }"
    >
      <aside v-if="!onlyMain">
        <div greater767less1200>
          <slot :name="greater767less1200right" />
          <slot :name="greater767less1200left" />
        </div>
        <div greater1200>
          <slot :name="greater1200left" />
        </div>
      </aside>
      <main>
        <slot name="main" />
      </main>
      <aside
        v-if="!onlyMain"
        :class="{'structure__r-aside--visible': rightAsideVisible}"
      >
        <div less767>
          <slot :name="less767right" />
          <slot :name="less767left" />
        </div>
        <div greater1200>
          <slot :name="greater1200right" />
        </div>
      </aside>
    </div>
    <div
      shadow
      :class="{'shadow-visible': rightAsideVisible}"
      @click="toggleAside"
    />
    <div
      v-if="!noBody"
      class="structure__icon"
      @click="toggleAside"
    >
      <el-icon :size="20">
        <Expand v-show="rightAsideVisible" />
        <Fold v-show="!rightAsideVisible" />
      </el-icon>
    </div>
    <footer>
      <slot name="footer">
        <Footer />
      </slot>
    </footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
export default {
  components: {
    Footer
  },
  props: {
    onlyMain: {
      default: false,
      type: Boolean
    },
    noBody: {
      default: false,
      type: Boolean
    },
    asidePadding: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      rightAsideVisible: false,
      innerWidth: window.innerWidth
    }
  },
  computed: {
    greater767less1200left() {
      return this.innerWidth > 767 && this.innerWidth < 1200 ? 'left' : null
    },
    greater767less1200right() {
      return this.innerWidth > 767 && this.innerWidth < 1200 ? 'right' : null
    },
    less767left() {
      return this.innerWidth <= 767 ? 'left' : null
    },
    less767right() {
      return this.innerWidth <= 767 ? 'right' : null
    },
    greater1200left() {
      return this.innerWidth >= 1200 ? 'left' : null
    },
    greater1200right() {
      return this.innerWidth >= 1200 ? 'right' : null
    }
  },
  mounted() {
    window.addEventListener('resize', this.resize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resize)
    document.body.classList.remove('body--structure-aside-visible')
  },
  methods: {
    toggleAside() {
      this.rightAsideVisible = !this.rightAsideVisible
      if (this.rightAsideVisible) document.body.classList.add('body--structure-aside-visible')
      else document.body.classList.remove('body--structure-aside-visible')
    },
    resize() {
      this.innerWidth = window.innerWidth
    }
  }
}
</script>

<style>
.structure-outer {
  width: 100%;
  position: relative;
}
.structure__icon {
  position: fixed;
  cursor: pointer;
  bottom: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid var(--bl-moonlight-blue-5);
  z-index: 9999;
  color: var(--bl-moonlight-blue-5);
}
@media (min-width: 767px) {
  .structure__icon {
    display: none !important;
  }
}
.structure-outer > header {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 500;
}
.structure {
  display: flex;
  justify-content: right;
}
.structure--only-main {
  justify-content: center !important;
}
.structure > aside,
.structure > main {
  background-color: var(--bl-color-lighter-fill);
}
.structure > aside {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 300px;
  overflow: auto;
}
.structure--aside-padding > aside {
  height: calc(100vh - 60px - 60px) !important;
  padding-top: 60px !important;
  padding-bottom: 60px !important;
}
@media (max-width: 767px) {
  .structure > aside {
    height: calc(100vh - 60px - 60px) !important;
    padding-top: 60px !important;
    padding-bottom: 60px !important;
  }
}
.structure > aside:first-child {
  left: 0;
  display: none;
}
.structure > aside:last-child {
  right: -300px;
}
.structure > main {
  width: 100%;
}
.structure > aside > div[greater1200],
.structure > aside > div[greater767less1200] {
  display: none;
  padding: 20px;
}
.structure > aside > div[greater767less1200],
.structure > aside > div[less767] {
  padding: 20px;
}
.structure > aside > div[greater767less1200] {
  padding-right: 50px;
}
@media (max-width: 767px) {
  .structure-outer > div[shadow] {
    z-index: 900;
    background-color: rgba(0, 0, 0, 0);
    pointer-events: none;
    transition: background-color .3s;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
  .structure-outer > .shadow-visible {
    background-color: rgba(0, 0, 0, 0.5) !important;
    pointer-events: all !important;
    transition: background-color .3s;
  }
  .structure > aside:last-child {
    z-index: 999;
    transition: right .3s;
    position: fixed !important;
  }
  .structure__r-aside--visible {
    transition: right .3s;
    right: 0px !important;
  }
  .body--structure-aside-visible {
    overflow: hidden !important;
  }
}
@media (min-width: 767px) {
  .structure > aside:first-child {
    width: 33%;
    display: block;
  }
  .structure > aside:last-child {
    display: none;
  }
  .structure > main {
    width: 67%;
  }
  .structure > aside > div[less767] {
    display: none;
  }
  .structure > aside > div[greater767less1200] {
    display: block;
  }
}
@media (min-width: 1200px) {
  .structure > aside:first-child {
    width: 20%;
  }
  .structure > aside:last-child {
    display: block;
    right: 0;
    width: 20%;
  }
  .structure {
    justify-content: center;
  }
  .structure > main {
    width: 60%;
  }
  .structure > aside > div[greater767less1200] {
    display: none;
  }
  .structure > aside > div[greater1200] {
    display: block;
  }
}
@media (min-width: 1500px) {
  .structure > aside:first-child {
    width: 300px;
    left: calc((100% - 1500px) / 2);
  }
  .structure > aside:last-child {
    width: 300px;
    right: calc((100% - 1500px) / 2);
  }
  .structure > main {
    width: 900px;
  }
}
</style>
