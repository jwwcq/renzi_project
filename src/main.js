import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import locale from 'element-ui/lib/locale/lang/en'  // lang i18n  英文包

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 引入所有指令  并用as关键字起个别名接收 是一个对象
import * as directives from '@/directives'
// console.log(directives)
// console.log(Object.keys(directives)) // 获取对象的属性名  是一个数组

import components from '@/components/index'
Vue.use(components)

Object.keys(directives).forEach(ele => {
  //  自定义属性名    自定义属性的内容
  Vue.directive(ele, directives[ele])
})
// import { imgerror } from '@/directives'
// 自定义指令名字    自定义指令内容
// Vue.directive('imgerror', imgerror)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// 模拟数据
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
