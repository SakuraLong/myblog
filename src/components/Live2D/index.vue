<template>
  <div
    ref="container"
    class="live2d-container"
    :style="{
      '--left': left,
      '--right': right,
      '--top': top,
      '--bottom': bottom,
      '--visibility': visibility
    }"
    no-select
    @mousedown="dragStart"
  >
    <Message :message="message" />
    <div
      ref="canvasContainer"
      class="live2d-canvas-container"
    >
      <canvas ref="canvas" />
    </div>
    <div class="live2d-console font">
      <Console
        @changeModel="changeModel"
        @changeCostume="changeCostume"
        @close="close"
      />
    </div>
  </div>
</template>

<script>
import Live2DShower from '@/assets/js/Live2DShower'
import BlogLive2DModels from '@/assets/js/BlogLive2DModels'

import MessageManager from '@/assets/js/MessageManager'
import BlogMessageManagers from '@/assets/js/BlogMessageManagers'

import Message from './message.vue'
import Console from './console.vue'
export default {
  components: {
    Message,
    Console
  },
  props: {
    pos: {
      default: () => {
        return {
          left: '0',
          top: '0',
          right: 'none',
          bottom: 'none'
        }
      },
      type: Object
    },
    dragable: {
      default: true,
      type: Boolean
    },
    direction: {
      default: 'xy',
      type: String
    }
  },
  data() {
    return {
      currentX: '',
      currentY: '',
      initialX: 0,
      initialY: 0,
      dragging: false,
      messageManager: new MessageManager(),
      live2DShower: null,
      live2DModel: null,
      message: '',
      live2DModels: BlogLive2DModels.models,
      messageManagers: BlogMessageManagers.managers,
      selectModelIndex: 0,
      visibility: 'hidden'
    }
  },
  computed: {
    left() {
      return this.currentX || this.pos.left
    },
    right() {
      return this.currentX !== '' ? 'none' : this.pos.right
    },
    top() {
      return this.currentY || this.pos.top
    },
    bottom() {
      return this.currentY !== '' ? 'none' : this.pos.bottom
    },
    useDirection() {
      return this.direction.toLocaleLowerCase()
    },
    SelectModel() {
      return this.live2DModels[this.selectModelIndex]
    }
  },
  mounted() {
    this.messageManager.on('message', this.onmessage, this)
    this.render()
  },
  beforeUnmount() {
    if (this.messageManager) this.messageManager.destroy()
    if (this.live2DShower) this.live2DShower.destroy()
  },
  methods: {
    render() {
      if (this.live2DModel && this.live2DModel._name === this.SelectModel.name) return
      if (this.live2DShower) {
        this.live2DShower.remove()
      }
      this.messageManager.removeAllManagers()
      this.visibility = 'hidden'
      this.$nextTick(async() => {
        const live2DModel = new this.SelectModel()
        const modelMessage = this.SelectModel.message
        if (!this.live2DShower) {
          const live2DShower = new Live2DShower({
            view: this.$refs.canvas,
            autoStart: true,
            resizeTo: this.$refs.canvasContainer,
            backgroundAlpha: 0
          })
          this.live2DShower = live2DShower
        }
        const live2DShower = this.live2DShower
        await live2DShower.add(live2DModel)
        this.live2DModel = live2DModel
        this.visibility = 'visible'

        this.messageManagers.forEach((Manager) => {
          this.messageManager.addManager(Manager, BlogMessageManagers.message, modelMessage)
        })
      })
    },
    onmessage(message) {
      // 同样的消息不会触发watch
      // 为了消息更新
      //
      this.message = message + '$' + Date.now().toString()
    },
    dragStart(e) {
      if (e.target !== this.$refs.canvas) return
      if (!this.dragable) return
      this.initialX = e.offsetX
      this.initialY = e.offsetY
      this.dragging = true

      window.addEventListener('mousemove', this.drag)
      window.addEventListener('mouseup', this.dragEnd)
    },
    drag(e) {
      if (this.dragging) {
        const width = this.$refs.container.getBoundingClientRect().width
        const height = this.$refs.container.getBoundingClientRect().height
        const x = e.clientX - this.initialX
        const y = e.clientY - this.initialY
        let cx = Math.max(0, Math.min(x, window.innerWidth - width)).toString() + 'px'
        let cy = Math.max(0, Math.min(y, window.innerHeight - height)).toString() + 'px'
        if (this.useDirection.indexOf('x') === -1) cx = ''
        if (this.useDirection.indexOf('y') === -1) cy = ''
        this.currentX = cx
        this.currentY = cy
        this.live2DModel.setHitIgnore(true)
      }
    },
    dragEnd() {
      // 最终位置更新
      this.dragging = false

      window.removeEventListener('mousemove', this.drag)
      window.removeEventListener('mouseup', this.dragEnd)
    },
    changeModel() {
      this.selectModelIndex += 1
      if (this.selectModelIndex === this.live2DModels.length) this.selectModelIndex = 0
      this.render()
    },
    changeCostume() {
      if (this.live2DModel) this.live2DModel.costumeTo()
    },
    close() {
      this.$emit('close')
    }
  }

}
</script>

<style>
.live2d-container {
  position: fixed;
  z-index: 999999;
  left: var(--left, none);
  top: var(--top, none);
  right: var(--right, none);
  bottom: var(--bottom, none);
  visibility: var(--visibility);
}
.live2d-canvas-container {
  position: relative;
  width: 310px;
  height: 250px;
  /* width: 500px;
  height: 500px*/
}
.live2d-console {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  transition: opacity 0.3s;
  opacity: 0;
}
.live2d-container:hover .live2d-console {
  transition: opacity 0.3s;
  opacity: 1;
}
</style>
