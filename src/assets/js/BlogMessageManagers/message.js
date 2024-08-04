export default {
  html: {
    mouseenter: [
      // select message attr regexp/func
      ['a', '想看看$0吗？', 'href', (value, element) => {
        const regexpList = [
          [/^\/$/g,               (value) => ['主页']],
          [/^\/archive$/g,        (value) => ['归档']],
          [/^\/categories$/g,     (value) => ['分类']],
          [/^\/tags$/g,           (value) => ['标签']],
          [/^\/search$/g,         (value) => ['检索']],
          [/^\/menu$/g,           (value) => ['菜单']],
          [/^\/menu\/about$/g,    (value) => ['「我」']],
          [/^\/menu\/projects$/g, (value) => ['我的项目']],
          [/^\/menu\/friends$/g,    (value) => ['我的朋友']],
          [/^\/menu\/setting$/g,    (value) => '去更改博客设置吗？'],
          [/^\/categories\?category=(.*)$/g,  (value) => ['分类：' + value[1]]],
          [/^\/tags\?tag=(.*)$/g,             (value) => ['标签：' + value[1]]],
          [/^#fnref(.*)$/g,                   (value) => { return { message: `返回引用${value[1]}` } }],
          [/^#fn(.*)$/g,                      (value) => { return { message: `查看引用${value[1]}` } }],
          [/^#(.*)$/g,                        (value) => ['标题：' + value[1]]],
          [/^\/post\/about$/g,                 (value) => '想看看博客的使用指南吗？'],
          [/^\/post\/(.*)$/g,                 (value) => '文章'],
          [/^\/page\/(.*)$/g,                 (value) => ['第' + value[1] + '页']],
          ['https://beian.miit.gov.cn/',            () => ['备案信息']],
          ['https://github.com/SakuraLong',         () => ['我的Github']],
          ['https://space.bilibili.com/543157486',  () => ['我的B站']],
          [/.*/,      (value) => { return { message: `要去往${value[0]}吗？` } }]
        ]
        let res = null
        for (const regexpData of regexpList) {
          const regexp = regexpData[0]
          const func = regexpData[1]
          if (typeof regexp === 'string') {
            if (regexp === value) {
              res = func()
            }
          } else {
            if (regexp.test(value)) {
              regexp.lastIndex = 0
              res = func(regexp.exec(value))
              if (res === '文章') {
                res = ['文章：' + element.textContent]
              }
            }
          }
          if (res !== null) return res
        }
        return {
          message: value
        }
      }],
      ['.theme-summary', '想要切换主题吗？'],
      ['.theme-item', '想要$1主题吗？', 'data-theme', /^(.*)$/g],
      ['i.live2d-console-button', '想要$0吗？', 'data-console', (value) => {
        switch (value) {
          case 'changeCostume':
            return ['让我换件衣服']
          case 'changeModel':
            return ['换个模型']
          case 'close':
            return ['隐藏我']
          default:
            return false
        }
      }],
      ['span.post-title__time', '文章$1是$2', 'title', /^([^ ]*) (.*)$/g],
      ['span.post-title__data', '文章$0是$1', 'title', (value, element) => {
        const data = element.textContent
        return [value, data]
      }]
    ]
  },
  time: {
    tips: [
      [1000 * 60 * 30, '看了30分钟啦，休息一下眼睛叭'],
      [1000 * 60 * 60, '看了1个小时啦，休息一下眼睛叭'],
      [1000 * 60 * 90, '看了1个半小时啦，休息一下叭'],
      [1000 * 60 * 120, '看了2个小时了，该~休~息~了~！'],
      [1000 * 60 * 180, '看了3个小时了，啊，我要休息了，不提醒你了~~']
    ],
    enter: [
      [[[6, 11]], '早上好~', 'function(value = time)'],
      [[[11, 14]], '中午好~', 'function(value = time)'],
      [[[14, 18]], '下午好~', 'function(value = time)'],
      [[[18, 22]], '晚上好~', 'function(value = time)'],
      [[[22, 24], [0, 6]], '哈~~，这个点还不睡觉嘛？', 'function(value = time)']
    ]
  },
  event: [
    ['loaded', '', 'function(data = data)']
  ]
}
