import http from '../../service/api.js';
const state = {
  productInfor: null,
  productById: null
};

const getters = {
  productInfor(state) {
    return state.productInfor;
  },
  productById(state) {
    return state.productById;
  },

};
const mutations = {
  setProductInfor(state, productInfor) {
    state.productInfor = productInfor;
  },
  setProductInforById(state, productInfor) {
    state.productById = productInfor;
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
    console.log(params, '---------------')
    http.get(`/product/${params}`).then((response) => {
      commit('setProductInforById', response.data.data);
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
