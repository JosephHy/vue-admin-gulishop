import { reqCategory1, reqCategory2, reqCategory3 } from "@/api/goods/category";
const categoryAbout = {
  namespaced: true,
  state: {
    category1Id: "",
    category2Id: "",
    category3Id: "",
    category1List: [],
    category2List: [],
    category3List: [],
  },
  mutations: {
    SET_CATEGORY1(state, data) {
      state.category1List = data;
    },
    SET_CATEGORY2(state, {data, category1Id}) {
      state.category2List = data;
      state.category1Id = category1Id;
      // 改变1级清除2,3级
      state.category2Id = "";
      state.category3Id = "";
      state.category3List = []
    },
    SET_CATEGORY3(state, {data, category2Id}) {
      state.category3List = data;
      state.category2Id = category2Id;
      state.category3Id = "";
    },
    SET_CATEGORY3ID(state, category3Id) {
      state.category3Id = category3Id;
    }
  },
  actions: {
    async getCategory1({ commit }) {
      const res = await reqCategory1();
      if (res && res.code === 200) commit("SET_CATEGORY1", res.data);
      else return Promise.reject(new Error("属性获取失败"))
    },
    async getCategory2({ commit }, category1Id) {
      const res = await reqCategory2(category1Id);
      if (res && res.code === 200) commit("SET_CATEGORY2", {data:res.data, category1Id });
      else return Promise.reject(new Error("属性获取失败"))
    },
    async getCategory3({ commit }, category2Id) {
      const res = await reqCategory3(category2Id);
      if (res && res.code === 200) commit("SET_CATEGORY3", {data:res.data, category2Id});
      else return Promise.reject(new Error("属性获取失败"))
    }
  }

}
export default categoryAbout