import http from '../../../service/api.js';
import io from 'socket.io-client';
const socket = io(`${process.env.VUE_APP_SOCKET_URL}:4000`, {
    transports: ['websocket', 'polling', 'flashsocket'],
});
// import router from '../../router/index.js';
const state = {
    isShowChat: false,
    chats: []
};
const getters = {
    isShowChat() {
        return state.isShowChat
    },
    chats() {
        return state.chats
    }

};
const mutations = {
    setToggleShowChat(state, data) {
        state.isShowChat = data
    },
    setChats(state, data) {
        state.chats = data;
    },
};

const actions = {
    toggleShowChat({ commit }, data) {
        commit('setToggleShowChat', data)
    },
    getAllChatByIdRoom({ commit, dispatch }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http.get(`/chat/${params}`).then((response) => {
            commit('ERROR/setIsLoading', false, { root: true });
            commit('setChats', response.data.data);
        });
        socket.on(
            'new-message',
            function (data) {
                if (data.message.room === params) {
                    dispatch('getAllChatByIdRoom', params);
                    dispatch('NOTIFICATION/getAllNotification', params, { root: true });
                }
            }.bind(this),
        );
    },

    sendMessage({ commit, dispatch}, data) {
        console.log(data);
        http.post(`/chat/`, data)
            .then((response) => {
                socket.emit('save-message', response.data.data);
                dispatch('getAllChatByIdRoom', data.idRoom);
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

