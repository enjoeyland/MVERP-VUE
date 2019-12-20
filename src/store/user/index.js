import { Message } from 'element-ui'
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {
  setStore,
  getStore,
  removeStore
} from '@/utils/store'

import store from '@/store'
import router from '@/router'
const user = {
  state: {
    token: '',
    name: '',
    roles: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
  },

  actions: {
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
		  if (!data.errMsg) {
			  Message.error(data.errMsg)
		  } else {
			const {commit, dispatch, getters, state, rootState, rootGetters} = store;
			setToken(data.token)
			commit('SET_TOKEN', data.token)
			commit('SET_NAME', data.data.username)
			if (data.data.roles && data.data.roles.length > 0) {
			  commit('SET_ROLES', data.data.roles)
			  var tmpRoutes = []
			  tmpRoutes =  dispatch('GenerateRoutes', data.data.roles)
			  tmpRoutes.then(function(value) {
			    router.addRoutes(value)
			  })
			} else {
			  reject('getInfo: roles must be a non-null array !')
			}  
		  }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },

    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
