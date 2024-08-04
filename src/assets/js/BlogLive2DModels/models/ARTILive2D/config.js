export default {
  name: 'atri',
  url: '/static/live2D/atri/',
  analyseJson: {
    config: {
      default: {
        value: 30,
        blend: 'Add'
      }
    },
    expressionGroups: [
      {
        dark: 'Param10'
      },
      {
        pajamas: 'Param18', // 睡衣
        bikini: 'Param17',
        blood: 'Param36'
      },
      {
        blush: 'ParamCheek', // 脸红
        highlightOut: 'Param21', // 高光消失
        wightEyes: 'Param22', // 白眼
        no: {
          id: 'Param39',
          value: -30
        },
        yes: 'Param39',
        birds: 'Param37', // 小鸟
        kani: 'Param38' // 螃蟹
      }
    ]
  }
}
