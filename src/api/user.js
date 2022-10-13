import request from '@/utils/request'

export function login(data) {

}

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
export const getUserDetailById = (id) => request({
  url: `/sys/user/${id}`
})

/**
 *  保存用户信息
 * @param {*} data  {}
 * @returns Promise
 */
export const saveUserDetailById = (data) => request({
  url: `/sys/user/${data.id}`,
  method: 'PUT',
  data
})

