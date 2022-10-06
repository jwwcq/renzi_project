import request from '@/utils/request'

/**
  * 获取员工的简单列表
  **/
export const getEmployessSimple = () => {
  return request({
    url: '/sys/user/simple'
  })
}
