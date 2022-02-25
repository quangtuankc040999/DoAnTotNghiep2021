import http from '../../service/api.js';
const state = {
    listBlogs: [],
    blogById: {},
    numberPages: 0,
    numberRecords: 0,
    blogTopic: [],
    lastestBlog: [],
    listAds: []
};

const getters = {
    listAds(state) {
        return state.listAds;
    },
    listBlogs(state) {
        return state.listBlogs;
    },
    blogById(state) {
        return state.blogById;
    },
    numberPages(state) {
        return state.numberPages;
    },
    numberRecords(state) {
        return state.numberRecords;
    },
    blogTopic(state) {
        return state.blogTopic;
    },
    lastestBlog(state) {
        return state.lastestBlog;
    },
};
const mutations = {
    setListAds(state, listAds) {
        state.listAds = listAds;
    },
    setListBlogs(state, listBlogs) {
        state.listBlogs = listBlogs;
    },
    setBlogById(state, blogInfor) {
        state.blogById = blogInfor;
    },
    setNumberPages(state, numberPages) {
        state.numberPages = numberPages;
    },
    setNumberRecords(state, numberRecords) {
        state.numberRecords = numberRecords;
    },
    setBlogTopic(state, blogTopic) {
        state.blogTopic = blogTopic;
    },
    setLastestBlog(state, lastestBlog) {
        state.lastestBlog = lastestBlog;
    },
};
const actions = {
    createNewBlog({ commit, dispatch }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        if (params.isCensored) {
            // đăng bài cho admin
            http
                .post(`/blog/`, params, "Bài đăng của bạn đã được upload thành công")
                .then((response) => {
                    commit('ERROR/clearErrorMessage', null, { root: true });
                    commit('ERROR/setIsLoading', false, { root: true });
                    if(response.data.data.blogTopic === "Sản phẩm mới ra mắt"){
                        dispatch('createNewAd', {blogCoverPhoto: response.data.data.blogCoverPhoto, blogId: response.data.data._id})
                    }
                })
                .catch((error) => {
                    commit('ERROR/setErrorMessage', error.response.data.message, {
                        root: true,
                    });
                    commit('ERROR/setIsLoading', false, { root: true });

                });
        }
        else {
            //đăng bài cho user
            http
                .post(`/blog/`, params, "Bài đăng của bạn đã được upload thành công, chờ kiểm duyệt")
                .then(() => {
                    commit('ERROR/clearErrorMessage', null, { root: true });
                    commit('ERROR/setIsLoading', false, { root: true });
                })
                .catch((error) => {
                    commit('ERROR/setErrorMessage', error.response.data.message, {
                        root: true,
                    });
                    commit('ERROR/setIsLoading', false, { root: true });

                });
        }

    },
    updateBlog({ commit, dispatch }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .put(`/blog/update/${params.blogId}`, params.body, "Thành công")
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                dispatch("BLOGS/getAllBlogsAdmin", null, {root: true})
                commit('ERROR/setIsLoading', false, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
                commit('ERROR/setIsLoading', false, { root: true });
            });
    },
    deleteBlog({ commit, dispatch }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .put(`/blog/delete/${params.blogId}`, params.body, "Thành công")
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                dispatch("BLOGS/getAllBlogsAdmin", null, {root: true})
                commit('ERROR/setIsLoading', false, { root: true });
            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
                commit('ERROR/setIsLoading', false, { root: true });
            });
    },
    getAllBlogsPagination({ commit }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http.get(`/blog/all/${params.page}`).then((response) => {
            commit('setListBlogs', response.data.data.listBlogs)
            commit('setNumberRecords', response.data.data.numberRecords)
            commit('setNumberPages', response.data.data.numberPages)
            commit('ERROR/clearErrorMessage', null, { root: true })
            commit('ERROR/setIsLoading', false, { root: true })
        }).catch((error) => {
            commit('ERROR/setErrorMessage', error.response.data.message, {
                root: true,
            })
            commit('ERROR/setIsLoading', false, { root: true })
        });
    },
    getBlogById({ commit, dispatch }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http.get(`/blog/detail/${params}`).then((response) => {
            commit('setBlogById', response.data.data)
            dispatch("BLOGS/getBlogByTopic", { blogTopic: response.data.data.blogTopic }, { root: true })
            commit('ERROR/setIsLoading', false, { root: true })
        })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                })
                commit('ERROR/setIsLoading', false, { root: true })
            });
    },
    getBlogByTopic({ commit }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http.put(`/blog/topic`, params).then((response) => {
            commit('setBlogTopic', response.data.data)
            commit('ERROR/setIsLoading', false, { root: true })
        })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                })
                commit('ERROR/setIsLoading', false, { root: true })
            });
    },
    getLastestBlog({ commit }) {
        commit('ERROR/setIsLoading', true, { root: true });
        http.get(`/blog/lastest`).then((response) => {
            commit('setLastestBlog', response.data.data)
            commit('ERROR/setIsLoading', false, { root: true })
        })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                })
                commit('ERROR/setIsLoading', false, { root: true })
            });
    },
    getAllBlogsAdmin({ commit }) {
        commit('ERROR/setIsLoading', true, { root: true });
        http.get(`/blog/admin`).then((response) => {
            commit('setListBlogs', response.data.data)
            commit('ERROR/setIsLoading', false, { root: true })
        })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                })
                commit('ERROR/setIsLoading', false, { root: true })
            });
    },
    createNewAd({ commit }, params){
        http
        .post(`/blog/ad/`, params)
        .then(() => {
            commit('ERROR/clearErrorMessage', null, { root: true });
        })
        .catch((error) => {
            commit('ERROR/setErrorMessage', error.response.data.message, {
                root: true,
            });
        });
    },
    getAds({ commit }) {
        http.get(`/blog/ad/`).then((response) => {
            commit('setListAds', response.data.data)
        })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                })
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
