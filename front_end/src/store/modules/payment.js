import http from '../../service/api.js';
const state = {
    orderById: null,
    listOrder: [],
    listWaitting: [],
    listDelivery: [],
    listCancel: [],
    listDone: []
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
    listCancel(state) {
        return state.listCancel;
    },
    listDone(state) {
        return state.listDone;
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
    setListCancel(state, listCancel) {
        state.listCancel = listCancel;
    },
    setListDone(state, listDone) {
        state.listDone = listDone;
    },
    setOrderById(state, order) {
        state.orderById = order;
    },
};
const actions = {
    newOrder({ commit }, params) {
        http
            .post('/order/', params, 'Create a new order successfully!')
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
            });
    },
    updateOrder({ commit }, params) {
        http
            .put(`/order/user/${params.orderId}`, params.body)
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
            });

    },
    getOrderById({ commit }, orderId) {
        http
            .get(`/order/user/${orderId}`)
            .then((response) => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                commit('setOrderById', response.data.data);
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
            });
    },
    getOrderWattingUser({ commit }, customerId) {
        http
            .get(`/order/user/waitting-order/${customerId}`)
            .then((response) => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                commit('setOrderInfor', response.data.data);
                commit('setListWaitting', response.data.data);
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
            });
    },
    getOrderDeliveryUser({ commit }, customerId) {
        http
            .get(`/order/user/delivery-order/${customerId}`)
            .then((response) => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                commit('setOrderInfor', response.data.data);
                commit('setListDelivery', response.data.data);

            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
            });
    },
    getOrderCancelUser({ commit }, customerId) {
        http
            .get(`/order/user/cancel-order/${customerId}`)
            .then((response) => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                commit('setOrderInfor', response.data.data);
                commit('setListCancel', response.data.data);
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
            });
    },
    getOrderDoneUser({ commit }, customerId) {
        http
            .get(`/order/user/done-order/${customerId}`)
            .then((response) => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                commit('setOrderInfor', response.data.data);
                commit('setListDone', response.data.data);
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
