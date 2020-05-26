import Vue from 'vue'
import Vuex from 'vuex'
// 引入本地存储功能
import { setItem, getItem } from '../utils/storage'

Vue.use(Vuex)

/* 定义本地存储key */
const tokenKey = 'token_User'

export default new Vuex.Store({
  state: {
    // user: JSON.parse(window.localStorage.getItem(tokenKey))
    user: getItem(tokenKey)
  },
  mutations: {
    setUser(state, data) {
      state.user = data

      // 将token存入本地存储中
      // window.localStorage.setItem(tokenKey, JSON.stringify(state.user))
      setItem(tokenKey, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
