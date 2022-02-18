import http from '../../../service/api.js';
const state = {
    orderById: null,
    listOrder: [],
    listWaitting: [],
    listDelivery: [],
    listRated: [],
};

const getters = {
    orderById(state) {
        return state.orderById
    },
    listOrder(state) {
        return state.listOrder;
    },
    listWaitting(state) {
        return state.listWaitting;
    },
    listDelivery(state) {
        return state.listDelivery;
    },
    listRated(state) {
        return state.listRated;
    },
};
const mutations = {
    setOrderInfor(state, orderInfor) {
        state.listOrder = orderInfor;
    },
    setListWaitting(state, listWaitting) {
        state.listWaitting = listWaitting;
    },
    setListDelivery(state, listDelivery) {
        state.listDelivery = listDelivery;
    },
    setListRated(state, listRated) {
        state.listRated = listRated;
    },
};
const actions = {
    acceptOrder({ commit, dispatch }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .put(`/order/user/${params.orderId}`, params.body, 'Hoàn thành đóng gói sản phẩm')
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                dispatch('ORDERADMIN/getAllOrderWatting', '', { root: true })
                commit('ERROR/setIsLoading', false, { root: true });

            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
                commit('ERROR/setIsLoading', false, { root: true });

            });
    },
    cancelOrder({ commit, dispatch }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .put(`/order/user/${params.orderId}`, params.body, 'Huỷ đơn hàng thành công')
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                dispatch('ORDERADMIN/getAllOrderWatting', '', { root: true })
                commit('ERROR/setIsLoading', false, { root: true });

            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
                commit('ERROR/setIsLoading', false, { root: true });

            });
    },
    getAllOrderWatting({ commit }) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .get(`/order/admin/waitting-order`)
            .then((response) => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                // commit('setOrderInfor', response.data.data);
                commit('setListWaitting', response.data.data);
                commit('ERROR/setIsLoading', false, { root: true });

            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
                commit('ERROR/setIsLoading', false, { root: true });

            });
    },
    getAllOrderDelivery({ commit }) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .get(`/order/admin/delivery-order`)
            .then((response) => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                // commit('setOrderInfor', response.data.data);
                commit('setListDelivery', response.data.data);
                commit('ERROR/setIsLoading', false, { root: true });

            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
                commit('ERROR/setIsLoading', false, { root: true });

            });
    },
    getAllOrderRated({ commit }) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .get(`/order/admin/rated-order`)
            .then((response) => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                // commit('setOrderInfor', response.data.data);
                commit('setListRated', response.data.data);
                commit('ERROR/setIsLoading', false, { root: true });

            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
                commit('ERROR/setIsLoading', false, { root: true });

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
