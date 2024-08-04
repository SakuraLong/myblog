export default {
  html: {
    mouseenter: [
      ['img', '', 'alt', (value) => {
        if (value === '艾拉') return '我和艾拉哪个更高性能呢？'
        else return false
      }]
    ]
  }
}
