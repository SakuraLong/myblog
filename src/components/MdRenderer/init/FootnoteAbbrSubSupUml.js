import MarkdownItFootnote from 'markdown-it-footnote'
function initMarkdownItFootnote(md) {
  md.use(MarkdownItFootnote)
}

import MarkdownItAbbr from 'markdown-it-abbr'
function initMarkdownItAbbr(md) {
  md.use(MarkdownItAbbr)
}

import MarkdownItSub from 'markdown-it-sub'
function initMarkdownItSub(md) {
  md.use(MarkdownItSub)
}
import MarkdownItSup from 'markdown-it-sup'
function initMarkdownItSup(md) {
  md.use(MarkdownItSup)
}
import MarkdownItTextualUml from 'markdown-it-textual-uml'
function initMarkdownItTextualUml(md) {
  md.use(MarkdownItTextualUml)
}

export default [
  initMarkdownItFootnote,
  initMarkdownItAbbr,
  initMarkdownItSub,
  initMarkdownItSup,
  initMarkdownItTextualUml
]
