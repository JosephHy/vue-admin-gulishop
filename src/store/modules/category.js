import { reqGetCategory1, reqGetCategory2, reqGetCategory3 } from "@/api/goods/category";
export default {
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
    SET_CATEGORY2(state, { data, id1 }) {
      // 同时设置id和list
      state.category2List = data;
      state.category1Id = id1;
      // 在选择新的一级分类时要把原本的二三级清除
      state.category2Id = "";
      state.category3Id = "";
      // 并清除3级列表的数据
      state.category3List = [];
    },
    SET_CATEGORY3(state, { data, id2 }) {
      // 同时设置id和list
      state.category3List = data;
      state.category2Id = id2;
      // 在选择新的二级分类时要把原本的三级清除
      state.category3Id = "";
    },
    SET_CATEGORY_3ID(state, id3) {
      // 设置category3id
      state.category3Id = id3;
    }
  },
  actions: {
    // 获取一级分类数据
    async getCategory1({ commit }) {
      const res = await reqGetCategory1();
      if (res && res.code === 200) commit("SET_CATEGORY1", res.data);
      else throw Error("请求失败");
    },
    // 获取二级分类数据
    async getCategory2({ commit }, id1) {
      const res = await reqGetCategory2(id1);
      if (res && res.code === 200) {
        const data = res.data;
        commit("SET_CATEGORY2", { data, id1 });
      } else throw Error("请求失败");
    },
    // 获取三级分类数据
    async getCategory3({ commit }, id2) {
      const res = await reqGetCategory3(id2);
      if (res && res.code === 200) {
        const data = res.data;
        commit("SET_CATEGORY3", { data, id2 });
      } else throw Error("请求失败");
    }
  }

}