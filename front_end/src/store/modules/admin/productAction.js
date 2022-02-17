import http from '../../../service/api';
const state = {
};

const getters = {

};
const mutations = {
};
const actions = {
    addProduct({ commit }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .post(`/product/`, params, "Thêm sản phẩm thành công")
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
    updateProduct({ commit }, params) {
        http
            .put(`/product/update/${params.productId}`, params.body, "Chỉnh sửa sản phẩm thành công")
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
