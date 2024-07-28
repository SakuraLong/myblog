import MarkdownItContainer from 'markdown-it-container'
function initContainers(md) {
  const list = ['warning', 'tip', 'info', 'success']
  list.forEach((item) => {
    md.use(MarkdownItContainer, item, {
      render: function(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          // opening tag
          return '<div class="md-c-c md-c-c--' + item + '"><p>' + item.toLocaleUpperCase() + '</p>\n'
        } else {
          // closing tag
          return '</div>\n'
        }
      }
    })
  })
}
function initMarkdownItContainer(md) {
  initContainers(md)

  md.use(MarkdownItContainer, 'spoiler', {
    validate: function(params) {
      return params.trim().match(/^spoiler\s+(.*)$/)
    },
    render: function(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/)

      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n'
      } else {
        // closing tag
        return '</details>\n'
      }
    }
  })
  md.use(MarkdownItContainer, 'image', {
    validate: function(params) {
      return params.trim().match(/^image\s+(.*)$/)
    },
    render: function(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^image\s+(.*)$/)

      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<div class="md-c-img">\n'
      } else {
        // closing tag
        // 在closing tag使用info信息需要去改源码
        return '<span>' + (m[1] === 'null' ? '' : md.utils.escapeHtml(m[1])) + '</span></div>\n'
      }
    }
  })
}

export default [
  initMarkdownItContainer
]
