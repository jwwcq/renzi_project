// 全局注册组件
// import PageTools from '@/components/PageTools/index.vue'
// 定义一个数组
// const components = [PageTools]

// export default {
//   install(Vue) {
//     components.forEach(ele => {
//       Vue.component(ele.name, ele)
//     })
//   }
// }

// export default (Vue) => {
//   components.forEach(ele => {
//     Vue.component(ele.name, ele)
//   })
// }

// require.context(路径，是否查看子目录，正则) ==》返回一个函数
// require.context 返回的函数 有一个keys属性，对应也是一个方法，返回值 找到内容的路径
// require.context 返回的函数 的作用 根据路径 找到对应的模块
const requireComponent = require.context('./', true, /\.vue$/)
const res = requireComponent.keys().map(requireComponent)
export default (Vue) => {
  res.forEach(ele => {
    Vue.component(ele.default.name, ele.default)
  })
}
