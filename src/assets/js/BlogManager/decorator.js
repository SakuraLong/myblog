function dfs(obj, func) {
  function dfs_(currentObj) {
    Object.keys(currentObj).forEach((key) => {
      if (typeof currentObj[key] === 'object') {
        dfs_(currentObj[key])
      } else {
        func(currentObj, key, currentObj[key])
      }
    })
  }

  if (typeof obj === 'object' && obj !== null) {
    dfs_(obj)
  } else {
    throw new Error('The input must be an object.')
  }
  return obj
}

function time(obj, option = ['publicationTime', 'modificationTime']) {
  function format(utcTimestamp) {
    const date = new Date(utcTimestamp)
    const options = {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      timeZoneName: 'short'
    }
    const formatter = new Intl.DateTimeFormat('default', options)
    const formattedDate = formatter.format(date)
    return formattedDate
  }
  function analyse(obj, key) {
    if (option.indexOf(key) !== -1) {
      const date = new Date(parseInt(obj[key]))
      const dateString = date.toISOString().slice(0, 10) // YYYY-MM-DD
      obj[key + 'Origin'] = obj[key]
      obj[key + 'Format'] = format(obj[key])
      obj[key] = dateString
    }
  }
  return dfs(obj, analyse)
}

function readingTime(obj, option = ['wordCount']) {
  const KEY = 'readingTime'
  const wordsPerMinute = 250
  function analyse(obj, key) {
    if (option.indexOf(key) !== -1) {
      obj[KEY] = Math.ceil(parseInt(obj[key]) / wordsPerMinute).toString() + 'm'
    }
  }
  return dfs(obj, analyse)
}

function wordCount(obj, option = ['wordCount']) {
  const KEY = 'wordCountStr'
  function analyse(obj, key) {
    if (option.indexOf(key) !== -1) {
      obj[KEY] = parseFloat((parseInt(obj[key]) / 1000).toFixed(1)).toString() + 'K'
    }
  }
  return dfs(obj, analyse)
}

function to(obj, option = ['idEn']) {
  const KEY = 'to'
  function analyse(obj, key, value) {
    if (option.indexOf(key) !== -1) {
      obj[KEY] = '/post/' + value
    }
  }
  return dfs(obj, analyse)
}

function tagsSize(list, min = 16, max = 40, step = 2) {
  list.forEach((item) => {
    item.size = Math.min(max, min + item.amount * step)
  })
  return list
}

function tagsColor(startHex, endHex, list, min = 16, max = 40) {
  function interpolateColor(startHex, endHex, amount, min, max) {
    // 将十六进制颜色转换为RGB数组
    function hexToRgb(hex) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return [r, g, b]
    }
    // 将RGB数组转换回十六进制颜色
    function rgbToHex(r, g, b) {
      return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    }
    // 线性插值函数
    function lerp(start, end, amount) {
      return start + (end - start) * amount
    }
    // 获取RGB颜色数组
    const startRgb = hexToRgb(startHex)
    const endRgb = hexToRgb(endHex)
    // 计算插值比例
    const ratio = (amount - min) / (max - min)
    // 计算插值后的RGB颜色
    const interpolatedRgb = startRgb.map((component, index) => {
      return Math.round(lerp(component, endRgb[index], ratio))
    })
    // 将插值后的RGB颜色转换回十六进制
    return rgbToHex(interpolatedRgb[0], interpolatedRgb[1], interpolatedRgb[2])
  }
  list.forEach((item) => {
    item.color = interpolateColor(startHex, endHex, item.size || min, min, max)
  })
  return list
}

function categoriesUnfold(categories, category) {
  const categoriesList = category.split('/')
  function dfs(categories, level) {
    const currentCategory = categoriesList[level] || ''
    categories.forEach((category) => {
      if (category.name === currentCategory) {
        category.unfold = true
      } else {
        category.unfold = false
      }
      dfs(category.children, level + 1)
    })
  }
  dfs(categories, 0)
  return categories
}

function deleteCategoriesUnfold(obj) {
  const KEY = 'unfold'
  function analyse(obj, key) {
    if (KEY === key) {
      delete obj[key]
    }
  }
  return dfs(obj, analyse)
}

function sortByCategoryIntroduce(items) {
  return items.sort((a, b) => {
    if (a.sortByCategoryIntroduce && !b.sortByCategoryIntroduce) {
      return -1
    }
    if (!a.sortByCategoryIntroduce && b.sortByCategoryIntroduce) {
      return 1
    }
    return 0
  })
}

export default {
  time,
  readingTime,
  to,
  wordCount,
  tagsSize,
  tagsColor,
  categoriesUnfold,
  sortByCategoryIntroduce,
  deleteCategoriesUnfold
}
