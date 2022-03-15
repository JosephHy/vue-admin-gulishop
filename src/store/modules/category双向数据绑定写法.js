import { reqCategory1, reqCategory2, reqCategory3 } from "@/api/goods/category";
const categoryAbout = {
  namespaced: true,
  state: {
    category1List: [],
    category2List: [],
    category3List: [],
  },
  mutations: {
    SET_CATEGORY1(state, data) {
      state.category1List = data;
    },
    SET_CATEGORY2(state, data) {
      state.category2List = data;
    },
    SET_CATEGORY3(state, data) {
      state.category3List = data;
    },
  },
  actions: {
    async getCategory1({ commit }) {
      const res = await reqCategory1();
      console.log(res)
      if(res && res.code === 200) commit("SET_CATEGORY1", res.data);
      else return Promise.reject(new Error("属性获取失败"))
    },
    async getCategory2({ commit }, category2Id) {
      const res = await reqCategory2(category2Id);
      console.log(res)
      if(res && res.code === 200) commit("SET_CATEGORY2", res.data);
      else return Promise.reject(new Error("属性获取失败"))
    },
    async getCategory3({ commit }, category3Id) {
      const res = await reqCategory3(category3Id);
      console.log(res)
      if(res && res.code === 200) commit("SET_CATEGORY3", res.data);
      else return Promise.reject(new Error("属性获取失败"))
    }
  }

}
export default categoryAbout