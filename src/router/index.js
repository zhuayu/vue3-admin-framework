import { createRouter, createWebHistory } from 'vue-router'
import cookies from 'js-cookie'
import routes from './routes'
import NProgress from 'nprogress'
import userService from '@/services/user'
import permissionService from '@/services/permission'
import { useStore } from '@/stores/index.js'

const TOKEN_KEY = 'web_token'
const appRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  }
})

// 只触发一次的锁
appRouter.firstInit = false
appRouter.beforeEach(async (to, from, next) => {
  NProgress.start()

  if (to.meta.title) document.title = to.meta.title

  const store = useStore()
  const token = cookies.get(TOKEN_KEY)

  // 没有 TOKEN 的情况下的处理，要么跳走，要么去登录页面。
  if (!token && !['AccountLogin'].includes(to.name)) {
    next({ name: 'AccountLogin' })
    return
  }

  // 有 TOKEN 的情况下只请求一次用户信息
  if (token && !appRouter.firstInit) {
    try {
      const userInfo = await userService.getUserInfo()
      const permissions = await permissionService.getPermissions()
      store.setUserInfo(userInfo)
      store.setPermissions(permissions)

      // 没有任何权限要么跳走，要么去提示页面
      if (!permissions?.length) {
        next({ name: 'Forbidden' })
        return
      }

      appRouter.firstInit = true
    } catch (e) {
      next()
    }
  }

  next()
})

// eslint-disable-next-line
appRouter.afterEach((to, from) => {
  NProgress.done()
})

export default appRouter
