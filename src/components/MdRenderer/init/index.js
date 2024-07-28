import Container from './Container'
import EmojiAnchorTocKatex from './EmojiAnchorTocKatex'
import FootnoteAbbrSubSupUml from './FootnoteAbbrSubSupUml'
import Image from './Image'
import Layout from './Layout'

const plugins = [
  ...Container,
  ...EmojiAnchorTocKatex,
  ...FootnoteAbbrSubSupUml,
  ...Image,
  ...Layout
]

export default function init(md, vue, meta) {
  plugins.forEach((func) => {
    func(md, vue, meta)
  })
}
