// 实现对axios的二次封装
import axios from 'axios'

const service = axios.create({
  // process.env  获取当前环境下的环境变量
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

export default service
