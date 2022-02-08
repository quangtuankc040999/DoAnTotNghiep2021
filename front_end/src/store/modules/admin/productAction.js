import http from '../../../service/api';
const state = {
};

const getters = {

};
const mutations = {
};
const actions = {
    addProduct({ commit }, params) {
        console.log(params)
        http
            .post(`/product/`, params)
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
            });
    },
    updateProduct({ commit }, params) {
        http
            .put(`/product/update/${params.productId}`, params.body)
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
            });
    },
    deleteProduct({ commit }, productId) {
        http
            .put(`/product/delete/${productId}`)
            .then(() => {
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
