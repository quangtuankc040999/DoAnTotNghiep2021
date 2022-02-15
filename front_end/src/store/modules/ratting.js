import http from '../../service/api.js';
const state = {
    listCommentProduct: null
};

const getters = {
    listCommentProduct(state) {
        return state.listCommentProduct
    }
};
const mutations = {
    setListCommentProductById(state, listComment) {
        state.listCommentProduct = listComment;
    },
};
const actions = {
    postNewComment({ commit }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .post(`/product/comment/`, params, "Đã đánh giá thành công sản phẩm")
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
    getCommentProductByIdProduct({ commit }, productId) {
        http.get(`/product/comment/${productId}`,)
            .then((response) => {
                commit('setListCommentProductById', response.data.data);
                commit('ERROR/clearErrorMessage', null, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
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
