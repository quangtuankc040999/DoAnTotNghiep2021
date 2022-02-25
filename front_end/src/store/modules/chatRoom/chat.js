import http from '../../../service/api.js';
import io from 'socket.io-client';
const socket = io(`${process.env.VUE_APP_SOCKET_URL}:4000`, {
    transports: ['websocket', 'polling', 'flashsocket'],
});
import room from './room'
import auth from '../auth'
const state = {
    isShowChat: false,
    chats: [],
    notifications: [],
    notificationsAdmin: []
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
    notificationsAdmin(state) {
        return state.notificationsAdmin;
    },

};
const cutNotification = function (datas) {
    let arrayResult = []
    let listRooms = room.state.roomChat
    for (let room of listRooms) {
        let array = datas.filter(notification => notification.room === room._id)
        arrayResult.push({ roomId: room._id, length: array.length })
    }
    return arrayResult

}
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
    setNotificationsAdmin(state, notifications) {
        state.notificationsAdmin = cutNotification(notifications);
    },

};

const actions = {
    toggleShowChat({ commit }, data) {
        commit('setToggleShowChat', data)
    },
    getAllChatByIdRoom({ commit, dispatch }, params) {
        http.get(`/chat/${params}`).then((response) => {
            commit('setChats', response.data.data);
        });
        socket.on(
            'new-message',
            function (data) {
                if (auth.state.userInfo.role === "Admin") {
                    dispatch("ROOM/getAllRoomChat", null, { root: true })
                }
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
                if (auth.state.userInfo.role === "Admin") {
                    dispatch('ROOM/getAllRoomChat', null, { root: true })
                }
                dispatch('updateNotification', data.idRoom)
                dispatch('getAllChatByIdRoom', data.idRoom);
                commit('ERROR/clearErrorMessage', null, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
            });
    },
    getAllNotification({ commit }, idRoom) {
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
    getAllNotificationAdmin({ commit }) {
        http
            .get(`/chat/admin/notification`)
            .then((result) => {
                commit('setNotificationsAdmin', result.data.data)
            })
            .catch((response) => {
                commit('ERROR/setErrorMessage', response.data, {
                    root: true,
                });
            });
    },
    updateNotification({ commit, dispatch }, idRoom) {
        http
            .put(`/chat/notification-update/${idRoom}`)
            .then((result) => {
                commit('setNotifications', result.data.data);
                if (auth.state.userInfo.role === "Admin") {
                    dispatch('getAllNotificationAdmin', null)
                }
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

