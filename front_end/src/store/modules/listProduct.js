import http from '../../service/api.js';
const state = {
  productInfor: [],
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
    commit('ERROR/setIsLoading', true, { root: true });
    http.get(`/product/category/${params}`).then((response) => {
      commit('setProductInfor', response.data.data)
      commit('ERROR/setIsLoading', false, { root: true })
    })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, {
          root: true,
        })
        commit('ERROR/setIsLoading', false, { root: true })
      });
  },
  getProductByCategoryDetail({ commit }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.get(`/product/category/${params.category}/${params.categoryDetail}`).then((response) => {
      commit('setProductInfor', response.data.data)
      commit('ERROR/setIsLoading', false, { root: true })
    })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, {
          root: true,
        })
        commit('ERROR/setIsLoading', false, { root: true })
      });
  },
  getAllProduct({ commit }) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.get(`/product/`).then((response) => {
      commit('setProductInfor', response.data.data)
      commit('ERROR/clearErrorMessage', null, { root: true })
      commit('ERROR/setIsLoading', false, { root: true })

    }).catch((error) => {
      commit('ERROR/setErrorMessage', error.response.data.message, {
        root: true,
      })
      commit('ERROR/setIsLoading', false, { root: true })
    });
  },
  getProduct({ commit }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.get(`/product/${params}`).then((response) => {
      commit('setProductInforById', response.data.data)
      commit('ERROR/setIsLoading', false, { root: true })
    })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, {
          root: true,
        })
        commit('ERROR/setIsLoading', false, { root: true })
      });
  },
  clearState({ commit }) {
    commit('setProductInforById', null);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
