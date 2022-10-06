import request from '@/utils/request'

/**
 * 获取组织架构数据
 **/
export function getDepartmentsAPI() {
  return request({
    url: '/company/department'
  })
}

/**
 *  新增部门接口
 *
 * ****/
export const addDepartments = (data) => {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
