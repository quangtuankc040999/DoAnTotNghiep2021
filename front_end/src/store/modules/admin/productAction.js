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
    updateProduct({ commit,dispatch }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .put(`/product/update/${params.productId}`, params.body, "Chỉnh sửa sản phẩm thành công")
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                commit('ERROR/setIsLoading', false, { root: true });
                dispatch('PRODUCTS/getAllProduct', null, {root: true})
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
                commit('ERROR/setIsLoading', false, { root: true });
            });
    },
    deleteProduct({ commit,dispatch }, productId) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .put(`/product/delete/${productId}`, null, 'Xoá sản phẩm thành công')
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                commit('ERROR/setIsLoading', false, { root: true });
                dispatch('PRODUCTS/getAllProduct', null, {root: true})
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
                commit('ERROR/setIsLoading', false, { root: true });

            });
    },
    importProduct({ commit }, params) {
        commit('ERROR/setIsLoading', true, { root: true });

        http
            .put(`/product/update/${params.productId}`, params.body, "Nhập hàng thành công")
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
            });
    },
    outProduct({ commit }, params) {
        http
            .put(`/product/update/${params.productId}`, params.body, "Xuất kho thành công")
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
            });
    },
    buyProduct({ commit }, params) {
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
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
