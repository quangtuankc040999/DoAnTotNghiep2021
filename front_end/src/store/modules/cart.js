import http from '../../service/api.js';
const state = {
  productCart: []
};

const mutations = {
  pushProductCart(state, productCartInfor) {
    state.productCart.push(productCartInfor);
  },
  updateQuantityProductFromCart(state, productCartInfor) {
    state.productCart[productCartInfor.index].quantity = productCartInfor.quantity + productCartInfor.quantity_old
  },
  setProductCartDB(state, productCartInfor) {
    state.productCart = productCartInfor;
  },
};
const getters = {
  productCart(state) {
    return state.productCart;
  },

};
const actions = {
  userProductCart({ commit }, userId) {
    http.get(`/user/cart/${userId}`).then((response) => {
      commit('setProductCartDB', response.data.data.productCart);
    });
  },
  pushProductToCart({ commit }, product) {
    commit('pushProductCart', product);
  },
  pushProductToCartDB({ commit }, params) {
    http
      .put(`/user/cart/${params.id}`, params.product)
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, {
          root: true,
        });
      });
  },
  updateQuantityProductFromCartDB({ commit }, params){
    http
    .put(`/user/cart/update/${params.id}`, params.product)
    .catch((error) => {
      commit('ERROR/setErrorMessage', error.response.data.message, {
        root: true,
      });
    });
  },
  updateQuantityProductFromCart({ commit }, product) {
    commit('updateQuantityProductFromCart', product);
  },
  removeProductFromCartDB({ commit }, params){
    http
    .put(`/user/cart/remove/${params.id}`, params.product)
    .catch((error) => {
      commit('ERROR/setErrorMessage', error.response.data.message, {
        root: true,
      });
    });
  },
  clearProductCart({ commit }, userId){
    http
    .put(`/user/cart/clear/${userId}`)
    .catch((error) => {
      commit('ERROR/setErrorMessage', error.response.data.message, {
        root: true,
      });
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

