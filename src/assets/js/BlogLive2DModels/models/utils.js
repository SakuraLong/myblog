export function createExpressions(config) {
  const basePath = config.basePath || 'expressions/expressions'
  const baseName = config.baseName || 'expressions-'
  const file = config.file || '.exp3.json'
  const join = config.join || '-'
  const configExpressionGroups = config.expressionGroups || []
  const expressionGroups = []
  const expressionOptionMapList = []
  const cartesianProduct = (arr) => {
    // 检查输入是否至少包含两个数组
    if (arr.length < 2) {
      throw new Error('需要至少两个数组进行组合')
    }
    const result = []
    const combine = (index, path) => {
      // 检查是否到达数组的最后一个元素
      if (index === arr.length - 1) {
        for (const item of arr[index]) {
          const n = path.concat()
          n.push(item)
          result.push(n)
        }
      } else {
        // 否则，递归地将当前数组的每个元素与路径组合
        for (const item of arr[index]) {
          const n = path.concat()
          n.push(item)
          combine(index + 1, n)
        }
      }
    }
    // 从第一个数组开始递归组合
    combine(0, [])
    return result
  }
  const buildData = (data) => {
    data.default = data.default || ''
    return Array.from(Object.entries(data))
  }
  configExpressionGroups.forEach((group) => {
    expressionGroups.push(buildData(group))
    expressionOptionMapList.push(new Map())
    const data = buildData(group)
    data.forEach((item) => {
      expressionOptionMapList.at(-1).set(item[0], true)
    })
  })

  const fileNames = cartesianProduct(expressionGroups)
  const expressions = fileNames.map((item) => {
    return {
      Name: baseName + item.map((item_) => item_[0] === 'default' ? '' : item_[0]).join(join),
      File: basePath + item.map((item_) => item_[0] === 'default' ? '' : item_[0]).join(join) + file
    }
  })

  return {
    expressions,
    expressionOptionMapList
  }
}
