import http from '../../service/api.js';
const state = {
  productInfor: null,
};

const getters = {
  productInfor(state) {
    return state.productInfor;
  },

};
const mutations = {
  setProductInfor(state, productInfor) {
    state.productInfor = productInfor;
  },
};
const actions = {
  getProductByCategoryName({ commit }, params) {
    http.get(`/product/category/${params}`).then((response) => {
      commit('setProductInfor', response.data.data);
    });
  },
  getProductByCategoryDetail({ commit }, params) {
    http.get(`/product/category/${params.category}/${params.categoryDetail}`).then((response) => {
      commit('setProductInfor', response.data.data);
    });
  },
  getAllProduct({ commit }) {
    http.get(`/product/`).then((response) => {
      commit('setProductInfor', response.data.data);
    });
  },
  getProduct({ commit },params) {
    http.get(`/product/${params}`).then((response) => {
      commit('setProductInfor', response.data.data);
    });
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
