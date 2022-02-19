import http from '../../service/api.js';
const state = {
  categoryInfo: [],
};

const getters = {
  categoryInfo(state) {
    return state.categoryInfo;
  },
};
const mutations = {
  setCategory(state, categoryInfo) {
    state.categoryInfo = categoryInfo;
  },

};
const actions = {
  getCategory({ commit }) {
    http.get(`/category/`).then((response) => {
      commit('setCategory', response.data.data);
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
