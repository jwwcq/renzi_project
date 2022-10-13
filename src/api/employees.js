import request from '@/utils/request'

/**
  * 获取员工的简单列表
  **/
export const getEmployessSimple = () => {
  return request({
    url: '/sys/user/simple'
  })
}
/**
 * 获取员工的综合列表数据
 * ***/
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** *
 *  封装一个导入员工的接口
 *
 * ***/

export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

export const getEmployeeInfo = (id) => {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/**
 *  保存员工基本信息
 * @param {*} data {}
 * @returns Promise
 */
export const saveEmployeeInfo = (data) => {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'PUT',
    data
  })
}
/**
 *  获取岗位信息
 * @param {*} id
 * @returns Promise
 */
export const getEmployeesJobInfo = (id) => {
  return request({
    url: `/employees/${id}/jobs`
  })
}
/**
 *  保存岗位信息
 * @param {*} data {}
 * @returns Promise
 */
export const saveEmployeesJobInfo = (data) => {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'PUT',
    data
  })
}
