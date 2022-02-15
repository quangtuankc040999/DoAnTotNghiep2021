import http from '../../service/api.js';
const state = {
  userInfo: null,
  memberInfor: null,
};

const getters = {
  userInfo(state) {
    return state.userInfo;
  },
  memberInfor(state) {
    return state.memberInfor;
  },
};
const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setMemberInfor(state, userInfo) {
    state.memberInfor = userInfo;
  },
};
const actions = {
  searchMember({ commit }, params) {
    http
      .post('/user', params)
      .then((result) => {
        commit('setMemberInfor', result.data.data);
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
      });
  },
  removeMemberInfor({ commit }, params) {
    commit('setMemberInfor', params);
  },
  editUser({ dispatch }, params) {
    http.put(`/user/${params.id}`, params.user, "Đã cập nhật thông tin thành công").then(() => {
      dispatch('getUser', params.id);
    });
  },
  getUser({ commit }, params) {
    http.get(`/user/${params}`).then((response) => {
      commit('setUserInfo', response.data.data);
      commit('AUTH/setUserInfo', response.data.data, {root: true});
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