import http from '../../../service/api.js';
const formatDataListByDate = function (data) {
    let list = [];
    let listData = data;
    if (data.length == 0) {
        return []
    }
    else {
        let month = new Date(listData[0].createdAt).getMonth()
        let year = new Date(listData[0].createdAt).getFullYear()
        let totalDate = 0
        switch (month + 1) {
            case 2:
                if ((year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
                    totalDate = 29
                }
                else {
                    totalDate = 28
                }
                break;

            case 4, 6, 9, 11:
                totalDate = 30
                break;
            default:
                totalDate = 31
        }

        for (let i = 1; i <= totalDate; i++) {
            let listItem = listData.filter(
                (item) => new Date(item.createdAt).getDate() == i,
            );
            list.push(listItem.length);
        }
        return list;
    }

};

const formatRevenue = function (data) {
    let list = [];
    let listContent = []
    let listData = data;
    if (data.length == 0) {
        return []
    }
    else {
        let month = new Date(listData[0].createdAt).getMonth()
        let year = new Date(listData[0].createdAt).getFullYear()
        let totalDate = 0
        switch (month + 1) {
            case 2:
                if ((year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
                    totalDate = 29
                }
                else {
                    totalDate = 28
                }
                break;

            case 4, 6, 9, 11:
                totalDate = 30
                break;
            default:
                totalDate = 31
        }
        for (let i = 1; i <= totalDate; i++) {
            let listItem = listData.filter(
                (item) => new Date(item.createdAt).getDate() == i,
            );
            listContent.push(listItem);
        }
        for (let log of listContent) {
            if (log.length > 0) {
                let listRevenueLog = []
                for (let logContent of log) {
                    listRevenueLog.push(logContent.logContents.reduce(
                        (total, product) =>
                            total + product.quantity * product.product.sale_price,
                        0
                    ))
                }
                list.push(listRevenueLog.reduce(
                    (total, revenueLog) =>
                        total + revenueLog,
                    0
                ));

            }
            else{
                list.push(0)
            }
        }
    }
    return list
}
const state = {
    listOrder: [],
    listRevenue: []
};

const getters = {
    listOrder(state) {
        return state.listOrder
    },
    listRevenue(state) {
        return state.listRevenue
    }
};
const mutations = {
    setListOrder(state, listOrder) {
        state.listOrder = formatDataListByDate(listOrder);
    },
    setListRevenue(state, data) {
        state.listRevenue = formatRevenue(data)
    }
};
const actions = {
    getAllOrderByMonth({ commit }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .post(`/order/dashboard/get-order-by-month`, params)
            .then((response) => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                commit('setListOrder', response.data.data);
                commit('ERROR/setIsLoading', false, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setIsLoading', false, { root: true });
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });

            });
    },


    getAllLogStatistical({ commit }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .post(`/log/dashboard/revenue`, params)
            .then((response) => {
                commit('ERROR/setIsLoading', false, { root: true });
                commit('ERROR/clearErrorMessage', null, { root: true });
                commit('setListRevenue', response.data.data);
            })
            .catch((error) => {
                commit('ERROR/setIsLoading', false, { root: true });
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
