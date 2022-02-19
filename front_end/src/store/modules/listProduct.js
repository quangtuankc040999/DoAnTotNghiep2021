import http from '../../service/api.js';
const state = {
  productInforSearch: [],
  productInfor: [],
  productById: null,
  numberPages: 0,
  numberRecords: 0
};

const getters = {
  productInfor(state) {
    return state.productInfor;
  },
  productInforSearch(state) {
    return state.productInforSearch;
  },
  productById(state) {
    return state.productById;
  },
  numberPages(state) {
    return state.numberPages;
  },
  numberRecords(state) {
    return state.numberRecords;
  },

};
const mutations = {
  setProductInfor(state, productInfor) {
    state.productInfor = productInfor;
  },
  setProductInforSearch(state, productInforSearch) {
    state.productInforSearch = productInforSearch;
  },
  setProductInforById(state, productInfor) {
    state.productById = productInfor;
  },
  setNumberPages(state, numberPages) {
    state.numberPages = numberPages;
  },
  setNumberRecords(state, numberRecords) {
    state.numberRecords = numberRecords;
  },
  clearProductInforSearch(state){
    state.productInforSearch = []
  }

};
const actions = {
  getProductByCategoryName({ commit }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.get(`/fillter-product/category/${params.category}/${params.page}`).then((response) => {
      commit('setProductInfor', response.data.data.listProduct),
        commit('setNumberRecords', response.data.data.numberRecords)
      commit('setNumberPages', response.data.data.numberPages)
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
    http.get(`/fillter-product/category/${params.category}/${params.categoryDetail}/${params.page}`).then((response) => {
      commit('setProductInfor', response.data.data.listProduct)
      commit('setNumberRecords', response.data.data.numberRecords)
      commit('setNumberPages', response.data.data.numberPages)
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

  getAllProductPagination({ commit }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.get(`/fillter-product/all/${params.page}`).then((response) => {
      commit('setProductInfor', response.data.data.listProduct)
      commit('setNumberRecords', response.data.data.numberRecords)
      commit('setNumberPages', response.data.data.numberPages)
      commit('ERROR/clearErrorMessage', null, { root: true })
      commit('ERROR/setIsLoading', false, { root: true })
    }).catch((error) => {
      commit('ERROR/setErrorMessage', error.response.data.message, {
        root: true,
      })
      commit('ERROR/setIsLoading', false, { root: true })
    });
  },

  getAllProductByPrice({ commit }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.put(`/fillter-product/product-price/${params.page}`, params.body).then((response) => {
      commit('setProductInfor', response.data.data.listProduct)
      commit('setNumberRecords', response.data.data.numberRecords)
      commit('setNumberPages', response.data.data.numberPages)
      commit('ERROR/clearErrorMessage', null, { root: true })
      commit('ERROR/setIsLoading', false, { root: true })

    }).catch((error) => {
      commit('ERROR/setErrorMessage', error.response.data.message, {
        root: true,
      })
      commit('ERROR/setIsLoading', false, { root: true })
    });
  },
  getAllProductByBrand({ commit }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.put(`/fillter-product/product-brand/${params.page}`, params.body).then((response) => {
      commit('setProductInfor', response.data.data.listProduct)
      commit('setNumberRecords', response.data.data.numberRecords)
      commit('setNumberPages', response.data.data.numberPages)
      commit('ERROR/clearErrorMessage', null, { root: true })
      commit('ERROR/setIsLoading', false, { root: true })

    }).catch((error) => {
      commit('ERROR/setErrorMessage', error.response.data.message, {
        root: true,
      })
      commit('ERROR/setIsLoading', false, { root: true })
    });
  },
  getAllProductLikeName({ commit }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http.put(`/fillter-product/product-search-name/${params.page}`, params.body).then((response) => {
      commit('setProductInfor', response.data.data.listProduct)
      commit('setNumberRecords', response.data.data.numberRecords)
      commit('setNumberPages', response.data.data.numberPages)
      commit('ERROR/clearErrorMessage', null, { root: true })
      commit('ERROR/setIsLoading', false, { root: true })
    }).catch((error) => {
      commit('ERROR/setErrorMessage', error.response.data.message, {
        root: true,
      })
      commit('ERROR/setIsLoading', false, { root: true })
    });

  },
  getAllProductLikeNameNoPagination({ commit }, params) {
    http.put(`/fillter-product/product-search-name`, params).then((response) => {
      commit('setProductInforSearch', response.data.data)
      commit('ERROR/clearErrorMessage', null, { root: true })
    }).catch((error) => {
      commit('ERROR/setErrorMessage', error.response.data.message, {
        root: true,
      })
    });
  },
  clearProductInforSearch({commit}){
    commit('clearProductInforSearch')
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
