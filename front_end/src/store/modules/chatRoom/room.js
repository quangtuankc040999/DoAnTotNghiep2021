import http from '../../../service/api.js';
// import router from '../../../router/index.js';
const state = {
    roomChatOfUser: {},
    roomChat: []
};
const getters = {
    roomChatOfUser(){
        return state.roomChatOfUser
    },
    roomChat(){
        return state.roomChat
    }
};
const mutations = {
    setRoomChatOfUser(state, roomChatOfUser){
        state.roomChatOfUser = roomChatOfUser
    },
    setRoomChat(state, roomChat){
        state.roomChat = roomChat
    }
};

const actions = {
     getRoomChatUser({commit, dispatch}){
      http.get(`/room/`)
        .then((response) => {
            commit('setRoomChatOfUser', response.data.data)
            commit('ERROR/clearErrorMessage', null, { root: true });

            dispatch('CHAT/getAllChatByIdRoom',response.data.data._id, { root: true })
        })
        .catch((error) => {
            commit('ERROR/setErrorMessage', error.response.data.message, {
                root: true,
            });
        });
    },

    getAllRommChat({commit}){
        http.get(`/room/all-room`)
          .then((response) => {
              commit('setRoomChat', response.data.data)
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

