<template>
  <span
    class="le-span1"
    :style="{'--max-width': maxWidth.toString() + 'px'}"
  >
    <span
      ref="str2"
      class="le-span2"
      :style="{ '--proportion': 'scaleX(' + proportion.toString() + ')',
                '--left': left.toString() + 'px'
      }"
    >
      {{ str }}
    </span>
    <span
      ref="str3"
      class="le-span3"
    >
      {{ str }}
    </span>
  </span>
</template>

<script>
export default {
  props: {
    str: {
      default: '',
      type: String
    },
    maxWidth: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      proportion: 1,
      left: 0
    }
  },
  watch: {
    str() {
      this.analyse()
    }
  },
  mounted() {
    this.analyse()
  },
  methods: {
    analyse() {
      this.$nextTick(() => {
        const str3 = this.$refs.str3
        const width = str3.getBoundingClientRect().width
        this.proportion = Math.min(1, this.maxWidth / width)
        this.left = Math.max(0, (width - this.maxWidth) / 2) * -1
      })
    }
  }
}
</script>

<style>
.le-span1 {
  position: relative;
  max-width: var(--max-width);
  overflow: hidden;
}
.le-span2 {
  position: relative;
  left: var(--left, 0px);
  display: inline-block;
  transform: var(--proportion);
  word-break: keep-all;
  white-space: nowrap;
}
.le-span3 {
  position: absolute;
  left: 0;
  pointer-events: none;
  visibility: hidden;
  word-break: keep-all;
  white-space: nowrap;
  display: inline-block;
}
</style>
