import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings' // 派生数据
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters,
  plugins: [createPersistedState({
    key: 'token',
    reducer(state) {
      return {
        // 只储存state中的token
        user: {
          token: state.user.token
        }
      }
    }
  })]
})

export default store
