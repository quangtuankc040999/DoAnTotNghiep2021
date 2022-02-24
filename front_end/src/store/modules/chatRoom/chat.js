import http from '../../../service/api.js';
import io from 'socket.io-client';
const socket = io(`${process.env.VUE_APP_SOCKET_URL}:4000`, {
    transports: ['websocket', 'polling', 'flashsocket'],
});
// import router from '../../router/index.js';
const state = {
    isShowChat: false,
    chats: [],
    notifications: []
};
const getters = {
    isShowChat() {
        return state.isShowChat
    },
    chats() {
        return state.chats
    },
    notifications(state) {
        return state.notifications;
      },

};
const mutations = {
    setNotifications(state, notifications) {
        state.notifications = notifications;
      },
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
                if (data.message.idRoom === params) {
                    dispatch('getAllChatByIdRoom', params);
                    dispatch('CHAT/getAllNotification', params, { root: true });
                }
            }.bind(this),
        );
    },

    sendMessage({ commit, dispatch }, data) {
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
    },
    getAllNotification({commit}, idRoom){
        http
        .get(`/chat/notification/${idRoom}`)
        .then((result) => {
          commit('setNotifications', result.data.data);
        })
        .catch((err) => {
          commit('ERROR/setErrorMessage', err.response.data.message, {
            root: true,
          });
        });
    },
    updateNotification({commit}, idRoom){
        http
        .put(`/chat/notification-update/${idRoom}`)
        .then((result) => {
          commit('setNotifications', result.data.data);
        })
        .catch((err) => {
          commit('ERROR/setErrorMessage', err.response.data.message, {
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

