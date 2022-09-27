// 实现对axios的二次封装
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
const service = axios.create({
  // process.env  获取当前环境下的环境变量
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 一小时过期
})
const TimeOut = 3600 // 超时时间
// 对比时间是否超时
function IsCheckTimeOut() {
  const currenTime = Date.now() // 每次接口调用获取当前时间
  const timeStamp = (currenTime - store.state.user.hrsaasTime) / 1000
  // console.log(timeStamp)
  return timeStamp > TimeOut // true则是token超时
}

// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // console.log(store.getters.token)
    // console.log(111)
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token 超时'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  // 1、考虑把 哪些数据抛出去
  // 2、接口成功  并且  业务逻辑成功
  //  3、 没有成功  Promise.reject  抛出错误

  const { data, message, success } = response.data
  if (success) { // 业务逻辑成功
    return data
  }
  Message.error(message)
  //  业务逻辑没有成功   需要手动new Error 然后把错误抛出去
  return Promise.reject(new Error(message))
}, error => {
  // console.log(error)
  if (error.response?.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('token 超时')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})

export default service
