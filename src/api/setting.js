import request from '@/utils/request'

export const getRoleListAPI = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

/** *
 * 新增角色
 * ***/
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}

/**
 *  更新角色
 */
export const updateRole = (data) => {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}
/**
 * 删除角色
 */
export const delRoleAPI = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}
/**
 *  获取公司信息
 */
export const getCompanyInfoAPI = (companyId) => {
  return request({
    url: `/company/${companyId}`
  })
}
