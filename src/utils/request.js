// 实现对axios的二次封装
import axios from 'axios'

const service = axios.create({
  baseURL: '/dev',
  timeout: 5000
})

export default service
