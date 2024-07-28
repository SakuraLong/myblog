import { message } from '@/utils/utils'

class RouterManager {
  constructor(bm) {
    this.bm = bm
  }
  /**
   * 根据路由信息判断当前是否需要向服务器请求数据
   * 需要请求则发请求返回Promise
   * 数据已经存在则返回Promise.resolve()
   *
   * @param {Object} routerData 路由信息
   * @param {Object} fromRouterData 来自的路由信息
   * @param {Object} meta 其他信息
   * @returns Promise对象
   */
  getReadyPromise(routerData, fromRouterData, meta) {
    const promiseList = [
      this.bm.pm.readyPromise,
      this.bm.cm.readyPromise,
      this.bm.sm.readyPromise
    ]
    const posts = new Promise((resolve, reject) => {
      Promise.all(promiseList).then(() => {
        if (routerData.name === 'post') {
          if (routerData.params.pathMatch && routerData.params.pathMatch.length === 1) {
          // 是去往post的合法帖子检索路径
            const idEn = routerData.params.pathMatch[0]
            this.bm.pm.getPostByIdEn(idEn).then(() => {
              resolve()
            }).catch((err) => {
              reject(err)
            })
          } else {
            reject('非法的文章检索路径')
          }
        } else if (routerData.name === 'manageEditor') {
          if (routerData.params.pathMatch && routerData.params.pathMatch.length === 2) {
            const type = routerData.params.pathMatch[0]
            const idEn = routerData.params.pathMatch[1]
            if (type === 'draft') {
              this.bm.sm.dm.getPostByIdEn(idEn).then(() => {
                resolve()
              }).catch((err) => {
                reject(err)
              })
            } else if (type === 'post') {
              this.bm.sm.pm.getPostByIdEn(idEn).then(() => {
                resolve()
              }).catch((err) => {
                reject(err)
              })
            } else {
              reject('非法的文章检索路径')
            }
          } else {
            reject('非法的文章检索路径')
          }
        } else {
          resolve()
        }
      }).catch((err) => {
        reject(err)
      })
    })
    const resPromiseList = [
      posts,
      this.bm.fm.readyPromise
    ]
    return Promise.all(resPromiseList)
  }
}

export default RouterManager
