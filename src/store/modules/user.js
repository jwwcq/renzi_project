import { login } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async LoginAction({ commit }, LoginData) {
      const data = await login(LoginData)
      commit('SET_TOKEN', data)
    }
  }

}
