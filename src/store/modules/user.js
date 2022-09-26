import { login } from '@/api/login'
import { getUserInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    // 存储userinfo
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    // 退出登录时清空userinfo token
    REMOVE_USER_INFO(state) {
      state.userInfo = {}
      state.token = null
    }
  },
  actions: {
    async LoginAction({ commit }, LoginData) {
      const data = await login(LoginData)
      commit('SET_TOKEN', data)
    },
    async getUserInfo({ commit }) {
      // 获取用户信息
      const data = await getUserInfo()
      //  获取基本信息
      const data1 = await getUserDetailById(data.userId)
      // 接口请求  回来的数据存储在userinfo中
      // 深拷贝  防止数据改变带来的污染
      const result = { ...data, ...data1 }
      commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(result))
    }
  }

}
