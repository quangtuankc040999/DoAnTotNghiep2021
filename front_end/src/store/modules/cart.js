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
    commit('ERROR/setIsLoading', true, { root: true });
    http.get(`/user/cart/${userId}`).then((response) => {
      commit('setProductCartDB', response.data.data.productCart)
      commit('ERROR/setIsLoading', false, { root: true })
    }).catch((error) => {
      commit('ERROR/setErrorMessage', error.response.data.message, {
        root: true,
      })
      commit('ERROR/setIsLoading', false, { root: true })
    });
  },
  pushProductToCart({ commit }, product) {
    commit('pushProductCart', product);
  },
  pushProductToCartDB({ commit }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http
      .put(`/user/cart/${params.id}`, params.product)
      .then(() => {
        commit('ERROR/clearErrorMessage', null, { root: true });
        commit('ERROR/setIsLoading', false, { root: true });
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, {
          root: true,
        });
        commit('ERROR/setIsLoading', false, { root: true });
      });
  },
  updateQuantityProductFromCartDB({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http
      .put(`/user/cart/update/${params.id}`, params.product, "Chỉnh sửa giỏ hàng thành công")
      .then(() => {
        commit('ERROR/setIsLoading', false, { root: true })
        dispatch('CART/userProductCart',params.id, { root: true })
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, {
          root: true,
        })
        commit('ERROR/setIsLoading', false, { root: true })
      });
  },
  updateQuantityProductFromCart({ commit }, product) {
    commit('updateQuantityProductFromCart', product);
  },
  removeProductFromCartDB({ commit, dispatch }, params) {
    commit('ERROR/setIsLoading', true, { root: true });
    http
      .put(`/user/cart/remove/${params.id}`, params.product, "Xoá sản phẩm thành công khỏi giỏ hàng")
      .then(() => {
        dispatch('CART/userProductCart',params.id, { root: true })
        commit('ERROR/clearErrorMessage', null, { root: true });
        commit('ERROR/setIsLoading', false, { root: true })
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, {
          root: true,
        });
        commit('ERROR/setIsLoading', false, { root: true })
      });
  },
  clearProductCart({ commit }, userId) {
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

