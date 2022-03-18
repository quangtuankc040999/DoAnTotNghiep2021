import http from '../../service/api.js';
import router from '../../router/index.js';
import { decodeToken } from '../../utils/helper';

const formatDataUser = function (data) {
  if (data) {
    const dataFormat = {
      _id: data._id,
      avatar: data.avatar,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role
    };
    return dataFormat;
  } else {
    return data
  }
};

const state = {
  userInfo: null,
};

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = formatDataUser(userInfo);
  },
};
const getters = {
  userInfo(state) {
    return state.userInfo;
  },

};
const actions = {
  login({ commit }, params) {
    commit('ERROR/setIsLoading', true, { root: true });

    http
      .post('/auth/login', params)
      .then((response) => {
        commit('setUserInfo', response.data.data);
        localStorage.setItem('token', response.data.data.token);
        commit('ERROR/clearErrorMessage', null, { root: true });
        commit('ERROR/setIsLoading', false, { root: true });
        if (response.data.data.role.name == "User") {
          router.push("/")
        }
        else if (response.data.data.role.name == "Admin") {
          router.push("/admin/dashboard")
        }
      })
      .catch((err) => {
        commit('ERROR/setErrorMessage', err.response.data.message, {
          root: true,
        });
        commit('ERROR/setIsLoading', false, { root: true });

      });
  },
  register({ commit }, params) {
    commit('ERROR/setIsLoading', true, { root: true });

    http
      .post('/auth/register', params, 'Đăng ký tài khoản mới thành công!')
      .then(() => {
        commit('ERROR/clearErrorMessage', null, { root: true });
        commit('ERROR/setIsLoading', false, { root: true });

        router.push('/login');
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, {
          root: true,
        });
        commit('ERROR/setIsLoading', false, { root: true });

      });
  },
  getUserByToken({ commit }) {
    commit('setUserInfo', decodeToken());
    commit('ERROR/clearErrorMessage', null, { root: true });
  },
  logout({ commit }) {
    localStorage.clear();
    commit('setUserInfo', null);
    commit('ERROR/clearErrorMessage', null, { root: true });
    router.go();
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

