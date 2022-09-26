//  自定义指令

export const imgerror = {
  inserted(el, binding, vnode) {
    //  当前dom
    // console.log(el)
    // binding 当前指令的相关信息
    // console.log(binding)
    // vnode 虚拟节点
    // console.log(vnode)
    // 当图片加载不出来会触发 onerror方法  binding.value自定义指令的value值  (不写死)
    el.onerror = () => {
      el.src = binding.value
    }
  }
}
