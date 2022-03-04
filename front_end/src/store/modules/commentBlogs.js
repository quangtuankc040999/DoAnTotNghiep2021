import http from '../../service/api.js';
const state = {
    listComment: [],
    numberPages: 0,
    numberRecords: 0
};

const getters = {
    listComment() {
        return state.listComment
    },
    numberPages(state) {
        return state.numberPages;
    },
    numberRecords(state) {
        return state.numberRecords;
    },
};
const mutations = {
    setListComment(state, listComment) {
        state.listComment = listComment;
    },
    setNumberPages(state, numberPages) {
        state.numberPages = numberPages;
    },
    setNumberRecords(state, numberRecords) {
        state.numberRecords = numberRecords;
    },
};
const actions = {
    createNewComment({ commit, dispatch }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .post(`/comment-blog/`, params)
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                dispatch('COMMENTBLOG/getAllCommentByBlogId', { blogId: params.blogId, page: 1 }, { root: true })
                commit('ERROR/setIsLoading', false, { root: true });

            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
                commit('ERROR/setIsLoading', false, { root: true });

            });
    },
    getAllCommentByBlogId({ commit }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http.get(`/comment-blog/${params.blogId}/${params.page}`).then((response) => {
            commit('setListComment', response.data.data.listComment)
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
    updateCommentBlog({ commit, dispatch }, params) {
        commit('ERROR/setIsLoading', true, { root: true });
        http
            .post(`/comment-blog/${params.commentBlogId}`, params)
            .then(() => {
                commit('ERROR/clearErrorMessage', null, { root: true });
                dispatch('COMMENTBLOG/getAllCommentByBlogId', { blogId: params.blogId, page: 1 }, { root: true })
                commit('ERROR/setIsLoading', false, { root: true });

            })
            .catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, {
                    root: true,
                });
                commit('ERROR/setIsLoading', false, { root: true });

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
