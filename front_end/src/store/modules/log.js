import http from '../../service/api.js';
const state = {
    listLog: []
};

const getters = {
    listLog(state) {
        return state.listLog
    }
};
const mutations = {
    setListLog(state, listLog) {
        state.listLog = listLog;
    },
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
    getAllLog({ commit }, params) {
        http.get(`/log/get/${params}`)
            .then((response) => {
                commit('setListLog', response.data.data)
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
