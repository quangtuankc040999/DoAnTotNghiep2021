import http from '../../service/api.js';
import router from '../../router/index.js';
const state = {
    orderById: null,
    listOrder: [],
    listWaitting: [],
    listDelivery: [],
    listCancel: [],
    listDone: [],
    listRated: []
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
    setListCancel(state, listCancel) {
        state.listCancel = listCancel;
    },
    setListDone(state, listDone) {
        state.listDone = listDone;
    },
    setListRated(state, listRated) {
        state.listRated = listRated;
    },
    setOrderById(state, order) {
        state.orderById = order;
    },
};
const actions = {
    newOrder({ commit, dispatch }, params) {
        console.log(params);
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .post('/order/', params, 'Đặt hàng thành công, chờ xác nhận')
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                commit('ERROR/setIsLoading', false, { root: true })
                dispatch('CART/clearProductCart', params.customerId, {root: true})
                router.push(`/profile/user/manage-order/waitting`)
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
                commit('ERROR/setIsLoading', false, { root: true })
            });
    },
    updateOrder({ commit , dispatch }, params) {
        commit('ERROR/setIsLoading', true, { root: true });

        http
            .put(`/order/user/${params.orderId}`, params.body)
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                dispatch('PAYMENT/getOrderWattingUser', params.body.id, {root: true})
                dispatch('PAYMENT/getOrderDeliveryUser', params.body.id, {root: true})
                dispatch('PAYMENT/getOrderCancelUser', params.body.id, {root: true})
                dispatch('PAYMENT/getOrderDoneUser', params.body.id, {root: true})
                dispatch('PAYMENT/getOrderRatedUser', params.body.id, {root: true})
                commit('ERROR/setIsLoading', false, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
            });

    },
    getOrderById({ commit}, orderId) {
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
                commit('ERROR/setIsLoading', false, { root: true });
            });
    },
    getOrderWattingUser({ commit }, customerId) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .get(`/order/user/waitting-order/${customerId}`)
            .then((response) => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                commit('setOrderInfor', response.data.data);
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
    getOrderDeliveryUser({ commit }, customerId) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .get(`/order/user/delivery-order/${customerId}`)
            .then((response) => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                commit('setOrderInfor', response.data.data);
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
    getOrderCancelUser({ commit }, customerId) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .get(`/order/user/cancel-order/${customerId}`)
            .then((response) => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                commit('setOrderInfor', response.data.data);
                commit('setListCancel', response.data.data);
                commit('ERROR/setIsLoading', false, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
                commit('ERROR/setIsLoading', false, { root: true });

            });
    },
    getOrderDoneUser({ commit }, customerId) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .get(`/order/user/done-order/${customerId}`)
            .then((response) => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                commit('setOrderInfor', response.data.data);
                commit('setListDone', response.data.data);
                commit('ERROR/setIsLoading', false, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
                commit('ERROR/setIsLoading', false, { root: true });

            });
    },
    getOrderRatedUser({ commit }, customerId) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .get(`/order/user/rated-order/${customerId}`)
            .then((response) => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                commit('setOrderInfor', response.data.data);
                commit('setListRated', response.data.data);
                commit('ERROR/setIsLoading', false, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
                commit('ERROR/setIsLoading', false, { root: true });

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
