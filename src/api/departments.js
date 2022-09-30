import request from '@/utils/request'

/**
 * 获取组织架构数据
 **/
export function getDepartmentsAPI() {
  return request({
    url: '/company/department'
  })
}
