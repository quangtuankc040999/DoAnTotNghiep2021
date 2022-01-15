const state = {
    productCart: []
};

const mutations = {
    setProductCart(state, productCartInfor) {
        state.productCart.push(productCartInfor);
      },
};
const getters = {
    productCart(state) {
        return state.productCart;
      },
 
};
const actions = {
  setProductCart({ commit }, product) {
      commit('setProductCart', product);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

