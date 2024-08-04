<template>
  <div
    class="live2d-message font padding"
    :class="{'live2d-message--show': show}"
    no-select
  >
    <span>{{ showMessage }}</span>
  </div>
</template>

<script>
import Timer from '@/utils/timer'
export default {
  props: {
    message: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      timer: new Timer(),
      show: false
    }
  },
  computed: {
    showMessage() {
      const i = this.message.lastIndexOf('$')
      if (i === -1) return 'cccccccccccccccccc'
      else return this.message.slice(0, i)
    }
  },
  watch: {
    message() {
      this.show = true
      this.timer.restart('message')
    }
  },
  beforeUnmount() {
    this.timer.removeTimeoutListener('message', this.timeout.bind(this))
    this.timer.destroy()
  },
  created() {
    this.timer.create('message', false, 3000)
    this.timer.addTimeoutListener('message', this.timeout.bind(this))
  },
  methods: {
    timeout() {
      this.show = false
      this.$nextTick(() => {
        this.$emit('clearMessage')
      })
    }
  }
}
</script>

<style>
.live2d-message {
  position: absolute;
  top: 0;
  transform: translateY(-100%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  border: 1px solid var(--bl-elysia-base);
  border-radius: 10px;
  word-break: break-all;
  background-color: var(--bl-elysia-background-color);
  animation-name: message-shake;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
  animation-timing-function: ease-in-out;
}
.live2d-message--show {
  opacity: 1;
  transition: opacity 0.2s;
}
@keyframes message-shake {
  from {
    rotate: -1deg;
  }
  to {
    rotate: 1deg;
  }
}
</style>
