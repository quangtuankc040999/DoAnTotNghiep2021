import http from '../../service/api.js';
const state = {
    // listCommentProduct: null
};

const getters = {
    // listCommentProduct(state) {
    //     return state.listCommentProduct
    // }
};
const mutations = {
    // setListCommentProductById(state, listComment) {
    //     state.listCommentProduct = listComment;
    // },
};
const actions = {
    createNewLog({ commit }, params) {
        http
            .post(`/log/`, params)
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
            });
    },
    createNewLogXuat({ commit }, params) {
        http
            .post(`/log/out`, params)
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
            })
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
