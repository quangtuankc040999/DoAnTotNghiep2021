import http from '../../service/api.js';
const state = {
};

const getters = {

};
const mutations = {
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
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
