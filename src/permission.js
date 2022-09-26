import router from '@/router'
import store from './store'

// 自定义一个白名单
const whiteList = ['/login', '/404']

// 1.判断token:是否存在
// 1.1存在处于登录状态是否去往登录页处于则去首页否则放行
// 1.2不存在不处于登录状态去往页面是否处于白名单处于则放行否则登录页

router.beforeEach((to, from, next) => {
  if (store.getters.token) { // 判断是否有token
    if (to.path === '/login') { //  如果有token  前往的页面是登录页面则组织跳转  并且跳转到首页
      next('/')
    } else { // 有token 跳往除登录以外的其它页面  则放行
      next()
    }
  } else {
    if (whiteList.includes(to.path)) { // 没有token 判断跳转的页面是否在白名单里 如果在 则跳转  否则跳转到登录页面
      next()
    } else {
      next('/login')
    }
  }
})
