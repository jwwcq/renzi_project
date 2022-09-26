// 实现对axios的二次封装
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
const service = axios.create({
  // process.env  获取当前环境下的环境变量
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(config => {
  // console.log(config)
  if (store.getters.token) {
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
  Message.error(error.message)
  return Promise.reject(error)
})

export default service
