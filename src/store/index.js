import Vue from 'vue'
import Vuex from 'vuex'
// 导入存储数据到localStorage中的方法
import { getLocal } from '@/utils/mylocal'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      // 在项目打开时应该从localStorage中取出来userInfo在vuex中
      userInfo: getLocal('userInfo') || {}
    },
  },
  getters: {},
  mutations: {
    // 定义一个setuserInfo的函数修改状态
    setUserInfo(state, payload) {
      // 给state里的userInfo赋值
      state.userInfo = payload
    }
  },
  actions: {},
  modules: {}
})