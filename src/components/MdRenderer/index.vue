<template>
  <div
    class="markdown-body"
    :class="{'md-renderer--small': small}"
  >
    <article v-html="mdHtml" />
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import init from './init'
import BlogManager from '@/BlogManager'
import Clipboard from 'clipboard'
import { message, generateRandomStringBase } from '@/utils/utils'
export default {
  props: {
    text: {
      default: '',
      type: String
    },
    idEn: {
      default: '',
      type: String
    },
    small: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      md: null,
      mdHtml: '',
      clipboard: null,
      generateRandomString: generateRandomStringBase(),
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" ><path fill="currentColor" d="M128 320v576h576V320zm-32-64h640a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32M960 96v704a32 32 0 0 1-32 32h-96v-64h64V128H384v64h-64V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32M256 672h320v64H256zm0-192h320v64H256z"></path></svg>'
    }
  },
  watch: {
    text() {
      this.render()
    }
  },
  created() {
    const md = new MarkdownIt({
      highlight: (str, lang) => {
        const codeIndex = this.generateRandomString()
        const button = `<span class="md-copy-btn" title="点击复制" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}">${this.svg}</span>`
        const pre = '<pre class="hljs"><code>'
        const suf = '</code></pre>'
        const code = md.utils.escapeHtml(str)
        const copyCode = `<textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${code}</textarea>`
        if (lang && hljs.getLanguage(lang)) {
          try {
            return pre + button +
              hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
              suf + copyCode
          } catch (__) {
            //
          }
        }
        return pre + button + code + suf + copyCode
      }
    })
    init(md, this, {
      baseUrl: BlogManager.data.blog.imageBaseUrl + this.idEn + '/'
    })
    this.md = md
  },
  mounted() {
    this.render()
    this.$nextTick(() => {
      this.clipboard = new Clipboard('.md-copy-btn')
      // 复制成功失败的提示
      this.clipboard.on('success', (e) => {
        message('复制成功', 'success')
      })
      this.clipboard.on('error', (e) => {
        message('复制失败')
      })
    })
  },
  beforeUnmount() {
    this.clipboard.destroy()
  },
  methods: {
    render() {
      this.mdHtml = this.md.render(this.text)
    },
    renderToc(tocHtml, ast) {
      this.$emit('renderToc', tocHtml, ast)
    }
  }
}
</script>

<style>
.markdown-body {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 45px;
  overflow: auto;
}
.markdown-body pre {
  position: relative;
}
.markdown-body pre:hover .md-copy-btn {
  pointer-events: all;
  transition: opacity 0.2s;
  opacity: 1;
}
.md-renderer--small {
  padding: 15px !important;
}
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
.md-copy-btn {
  pointer-events: none;
  transition: opacity 0.2s;
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}
.md-copy-btn > svg {
  width: 20px;
  height: 20px;
}

/* MarkdownItContainer tip warning */
.md-c-c {
  padding: 8px 16px;
  background-color: var(--bg-color);
  border-radius: 4px;
  border-left: 5px solid var(--border-color);
  margin: 20px 0;
}
.md-c-c > p {
  margin: 0;
}
.md-c-c > p:first-child {
  font-weight: 700;
  margin-bottom: 16px;
}
.md-c-c--tip {
  --bg-color: rgba(64, 158, 255, 0.1);
  --border-color: #296dff;
}
.md-c-c--warning {
  --bg-color: rgba(245, 108, 108, 0.1);
  --border-color: #f56c6c;
}
.md-c-c--success {
  --bg-color: #67c23a1c;
  --border-color: #67C23A;
}
.md-c-c--info {
  --bg-color: #90939929;
  --border-color: #909399;
}
/* MarkdownItContainer image */
.md-c-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 16px;
  text-align: center;
}
.md-c-img > p {
  margin-bottom: 5px !important;
}
.md-c-img > span {
  font-style: italic;
  font-size: 14px;
}
.md-c-img img {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE/Edge */
  user-select: none; /* 标准语法 */
}
/* MarkdownItLayout container */
.md-layout-c {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
/* MarkdownItLayout item */
.md-layout-i {
  padding: 10px;
  box-sizing: border-box;
}
</style>
