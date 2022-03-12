import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

function getDefaultState() {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}
const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const res = await login({ username: username.trim(), password: password });
    if (res && res.code === 20000) {
      commit("SET_TOKEN", res.data.token);
      setToken(res.data.token);
    } else {
      alert("登录失败")
    }
  },

  // get user info
 async getInfo({ commit, state }) {
   const res = await getInfo(state.token);
   if(res && res.code === 20000) {
     commit("SET_NAME", res.data.name);
     commit("SET_AVATAR", res.data.avatar);
   } else {
     alert("信息验证失败，请重新登录");
   }
  },

  // user logout
  async logout({ commit, state }) {
    const res = await logout(state.token);
    if(res && res.code === 20000) {
      // 在actions中可以不使用dispatch，直接调取actions中的方法？
      removeToken();
      resetRouter();
      commit('RESET_STATE');
    } else {
      alert("退出失败，请重试")
    }
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

