<template>
  <div
    v-if="show"
    ref="selector"
    class="m-selector"
  >
    <div class="m-selector-container">
      <div class="container__mask">
        <div d-type="background" />
        <div>
          <div
            v-if="selected"
            ref="selected"
            d-type="selected"
          >
            <div d-type="left" />
            <div d-type="right" />
          </div>
          <div
            v-else
            d-type="none-selected"
          />
        </div>
        <div>
          <div
            v-for="i in 3"
            :key="i"
            d-type="line"
            :line-i="i"
          />
        </div>
      </div>
      <div class="container__msg">
        <div class="msg--shadow">
          <div class="msg--mouse" />
          <div class="msg--arrows">
            <component
              :is="arrow"
              v-for="arrow, i in arrowList"
              :key="i"
              color="#fff"
              :arrow-i="i"
            />
          </div>
        </div>
        <div class="msg--selected-name">{{ selectedName }}</div>
      </div>
      <div class="container__items">
        <div
          v-for="icon, i in iconList"
          :key="i"
          :icon-i="i"
        >
          <component :is="icon.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import store from '@/store'
export default {
  props: {
    hrefList: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      iconList: [{
        icon: 'HomeFilled',
        name: '主页',
        routeName: 'home'
      },
      {
        icon: 'Collection',
        name: '归档',
        routeName: 'archive'
      },
      {
        icon: 'Folder',
        name: '分类',
        routeName: 'categories'
      },
      {
        icon: 'Menu',
        name: '菜单',
        routeName: 'menu'
      },
      {
        icon: 'PriceTag',
        name: '标签',
        routeName: 'tags'
      },
      {
        icon: 'Search',
        name: '搜索',
        routeName: 'search'
      }],
      arrowList: ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'],
      show: false,
      selected: false,
      ele: null,
      MAX: 400,
      MIN: -400,
      x: 0,
      y: 0,
      selectedIndex: null,
      selectedName: '移动鼠标以选择',
      defaultStr: '移动鼠标以选择',
      t: false
    }
  },
  mounted() {
    window.addEventListener('keydown', this.keydown)
    window.addEventListener('keyup', this.keyup)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.keydown)
    window.removeEventListener('keyup', this.keyup)
  },
  methods: {
    init() {
      this.ele = this.$refs.selector
      this.ele.requestPointerLock =
        this.ele.requestPointerLock ||
        this.ele.mozRequestPointerLock ||
        this.ele.webkitRequestPointerLock
      document.exitPointerLock =
        document.exitPointerLock ||
        document.mozExitPointerLock ||
        document.webkitExitPointerLock
    },
    getPos(e) {
      const weight = 0.8
      const movementX =
        e.movementX ||
        e.mozMovementX ||
        e.webkitMovementX ||
        0
      const movementY =
        e.movementY ||
        e.mozMovementY ||
        e.webkitMovementY ||
        0
      return { x: movementX * weight, y: movementY * weight }
    },
    keydown(e) {
      if (e.key === 'Tab' && !this.t) {
        e.preventDefault()
        if (!this.show) {
          this.show = true
          store.state.selectorShow = true
          this.$nextTick(() => {
            this.init()
            window.addEventListener('wheel', this.scroll, { passive: false })
            this.ele.addEventListener('mousemove', this.mousemove)
            // document.body.style.overflow = 'hidden'
            if (this.ele.requestPointerLock) this.ele.requestPointerLock()
          })
        }
      } else if (e.key === 't') {
        this.t = true
      }
    },
    keyup(e) {
      if (e.key === 'Tab' && !this.t) {
        e.preventDefault()
        if (this.show) {
          this.ele.removeEventListener('mousemove', this.mousemove)
          window.removeEventListener('wheel', this.scroll, { passive: false })
          if (document.exitPointerLock) document.exitPointerLock()
          this.show = false
          // document.body.style.overflow = 'auto'
          this.x = 0
          this.y = 0
          this.selected = false
          store.state.selectorShow = false
          this.selectFunc()
        }
      } else if (e.key === 't') {
        this.t = false
      }
    },
    mousemove(e) {
      const pos = this.getPos(e)
      this.x = this.x + pos.x
      this.y = this.y + pos.y
      this.x = this.x > this.MAX ? this.MAX : this.x < this.MIN ? this.MIN : this.x
      this.y = this.y > this.MAX ? this.MAX : this.y < this.MIN ? this.MIN : this.y
      this.checkSelected()
    },
    scroll(e) {
      e.preventDefault()
    },
    checkSelected() {
      const l = Math.sqrt(this.x ** 2 + this.y ** 2)
      if (Math.abs(this.x) < 200 && Math.abs(this.y) < 200) {
        this.selected = false
        this.selectedIndex = null
        this.selectedName = this.defaultStr
      } else {
        this.selected = true
        this.$nextTick(() => {
          const x = this.x
          const y = this.y
          const cos = y * -1 / l
          const angle = x < 0 ? 360 - (Math.acos(cos) / Math.PI) * 180 : (Math.acos(cos) / Math.PI) * 180
          const r = 360
          const amount = 6
          const every = r / amount
          let selectedI = 0
          for (let i = 0; i < amount; i++) {
            const s = -every / 2 + i * every
            const f = every / 2 + i * every
            if (angle >= s && angle < f) {
              selectedI = i
              break
            }
          }
          this.showSelected(amount, selectedI)
        })
      }
    },
    showSelected(amount, i) {
      this.selectedIndex = i
      this.selectedName = this.iconList[i].name
      const deg = 360 / amount * i
      this.$refs.selected.style.transform = 'rotate(' + deg.toString() + 'deg)'
    },
    selectFunc() {
      if (this.selectedIndex !== null) {
        const routeName = this.iconList[this.selectedIndex].routeName
        router.push({
          name: routeName
        })
      }
      this.selectedIndex = null
      this.selectedName = this.defaultStr
    }
  }
}
</script>

<style>
.m-selector {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--bl-color-primary-text);
}
.m-selector-container {
  position: relative;
  width: 400px;
  height: 400px;
}
.m-selector-container > div,
.m-selector-container > .container__mask > div,
.m-selector-container div[d-type='selected'],
.m-selector-container div[d-type='none-selected'] {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
}
.m-selector-container div[d-type='selected'],
.m-selector-container div[d-type='none-selected'] {
  border-radius: 50%;
  overflow: hidden;
}
.m-selector-container div[d-type='none-selected'] {
  background-color: var(--bl-color-lighter-fill);
}
.m-selector-container > .container__mask {
  mask: radial-gradient(transparent 125px, #000 130px);
}
.m-selector-container > .container__items > div {
  position: absolute;
  width: 45px;
  height: 45px;
}
.m-selector-container > .container__msg > .msg--shadow {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #6FAFFC5f;
  box-shadow: 0px 0px 100px #6FAFFC;
}
.m-selector-container > .container__msg > .msg--selected-name {
  position: absolute;
  font-size: 18px;
  top: 260px;
  font-family: "Microsoft YaHei", "SimSun", sans-serif;
  letter-spacing: 0.1em;
  background-color: var(--bl-selected-background-color);
  padding: 5px;
  border-radius: 2px 5px;
}
.m-selector-container > .container__msg > div > .msg--mouse {
  width: 100%;
  height: 100%;
  background: var(--bl-color-lighter-fill);
  -webkit-mask-image: url("./img/mouse.png");
  -webkit-mask-size: 50px;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
}
.m-selector-container > .container__msg > div > .msg--arrows {
  position: absolute;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.m-selector-container div[d-type='background'] {
  border-radius: 50%;
  background-color: #ADD2FF;
  box-shadow: inset 0px 0px 50px #6FAFFC;
}
.m-selector-container div[d-type='selected'] > div {
  width: 50%;
  height: 100%;
  background-color: var(--bl-color-lighter-fill);
}
.m-selector-container div[d-type='selected'] > div[d-type='left'] {
  transform-origin: 100% 50%;
  transform: rotate(-30deg);
}
.m-selector-container div[d-type='selected'] > div[d-type='right'] {
  transform-origin: 0% 50%;
  transform: rotate(30deg);
}
.m-selector-container div[d-type='line'] {
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: var(--bl-color-base-border);
}
.m-selector-container div[line-i='0'] {
  transform: rotate(0deg);
}
.m-selector-container div[line-i='1'] {
  transform: rotate(120deg);
}
.m-selector-container div[line-i='2'] {
  transform: rotate(240deg);
}
.m-selector-container > .container__items > div[icon-i='0'] {
  top: 15px;
}
.m-selector-container > .container__items > div[icon-i='1'] {
  right: 40px;
  top: 95px;
}
.m-selector-container > .container__items > div[icon-i='2'] {
  right: 40px;
  bottom: 95px;
}
.m-selector-container > .container__items > div[icon-i='3'] {
  bottom: 15px;
}
.m-selector-container > .container__items > div[icon-i='4'] {
  left: 40px;
  bottom: 95px;
}
.m-selector-container > .container__items > div[icon-i='5'] {
  left: 40px;
  top: 95px;
}
.m-selector-container > .container__msg > div > .msg--arrows > svg {
  position: absolute;
  width: 30px;
  height: 30px;
}
.m-selector-container > .container__msg > div > .msg--arrows > svg[arrow-i='0'] {
  top: 0px;
}
.m-selector-container > .container__msg > div > .msg--arrows > svg[arrow-i='1'] {
  right: 0px;
}
.m-selector-container > .container__msg > div > .msg--arrows > svg[arrow-i='2'] {
  bottom: 0px;
}
.m-selector-container > .container__msg > div > .msg--arrows > svg[arrow-i='3'] {
  left: 0px;
}
</style>
