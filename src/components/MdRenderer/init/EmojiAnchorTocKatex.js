import { full as MarkdownItEmoji } from 'markdown-it-emoji'
function initMarkdownItEmoji(md) {
  md.use(MarkdownItEmoji)
}

import MarkdownItAnchor from 'markdown-it-anchor'
function initMarkdownItAnchor(md) {
  md.use(MarkdownItAnchor, {
    permalink: MarkdownItAnchor.permalink.linkInsideHeader({
      placement: 'before'
    })
  })
}

import MarkdownItTocDoneRight from 'markdown-it-toc-done-right'
function initMarkdownItTocDoneRight(md, vue) {
  md.use(MarkdownItTocDoneRight, {
    listType: 'ul',
    level: [1],
    callback: (html, ast) => {
      vue.renderToc(html, ast)
    }
  })
}

import MarkdownItKatex from 'markdown-it-katex'
function initMarkdownItKatex(md) {
  md.use(MarkdownItKatex, {
    'throwOnError': false,
    'errorColor': '#cc0000'
  })
}

export default [
  initMarkdownItEmoji,
  initMarkdownItAnchor,
  initMarkdownItTocDoneRight,
  initMarkdownItKatex
]
