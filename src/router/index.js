import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import BlogManager from '@/BlogManager'
import { message } from '@/utils/utils'

import Home from '@/views/Home'
import Post from '@/views/Post'
import Archive from '@/views/Archive'
import Search from '@/views/Search'
import Tags from '@/views/Tags'
import Categories from '@/views/Categories'
import Error from '@/views/Error'
import Menu from '@/views/Menu'
import MenuAbout from '@/views/Menu/views/About'
import MenuProjects from '@/views/Menu/views/Projects'
import MenuFriends from '@/views/Menu/views/Friends'

import Login from '@/views/Login'

import store from '@/store'

NProgress.configure({ showSpinner: false })

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      refresh: true
    }
  },
  {
    path: '/page/:pagination',
    name: 'page',
    component: Home,
    meta: {
      refresh: true
    }
  },
  {
    path: '/post/:pathMatch(.*)*',
    name: 'post',
    component: Post,
    meta: {
      refresh: true,
      title: '文章 - '
    }
  },
  {
    path: '/archive',
    name: 'archive',
    component: Archive,
    meta: {
      title: '归档 - '
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      title: '检索 - '
    }
  },
  {
    path: '/tags',
    name: 'tags',
    component: Tags,
    meta: {
      title: '标签 - '
    }
  },
  {
    path: '/categories',
    name: 'categories',
    component: Categories,
    meta: {
      title: '分类 - '
    }
  },
  {
    path: '/error',
    name: 'error',
    component: Error,
    meta: {
      title: '错误 - '
    }
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu,
    redirect: '/menu/about',
    children: [
      {
        path: 'about',
        name: 'menuAbout',
        component: MenuAbout,
        meta: {
          type: 'about',
          title: '关于 - '
        }
      },
      {
        path: 'projects',
        name: 'menuProjects',
        component: MenuProjects,
        meta: {
          type: 'projects',
          title: '项目 - '
        }
      },
      {
        path: 'friends',
        name: 'menuFriends',
        component: MenuFriends,
        meta: {
          type: 'friends',
          title: '友链 - '
        }
      }
    ]
  },
  {
    path: '/manage/login',
    name: 'login',
    component: Login,
    meta: {
      store: true,
      storeKey: 'login'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const bm = new BlogManager()
  if (from.name === 'login' && to.name === 'manageHome') {
    bm.sm.init()
  }
  return bm.rm.getReadyPromise(to, from).then(() => {
    next()
  }).catch((err) => {
    store.state.errorMsg = {
      title: '跳转查询资源出现错误',
      body: err
    }
    next('/error')
  })
})

router.afterEach((to, from, next) => {
  if (!router.hasRoute(to.name)) {
    store.state.errorMsg = {
      title: '页面跳转出现错误',
      body: '页面:' + to.fullPath + ' 不存在'
    }
    router.replace('/error')
  } else if (to.meta && to.meta.store) {
    const storeKey = to.meta.storeKey
    if (!store.state[storeKey]) {
      store.state.errorMsg = {
        title: '页面跳转出现错误',
        body: '页面:' + to.fullPath + ' 不存在'
      }
      router.replace('/error')
    } else {
      store.state[storeKey] = null
    }
  }
  NProgress.done()
})

export default router
