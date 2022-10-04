import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    clearMessage: '',
    loading: false,
  },

  mutations: {
    setCategoryList(state, payload) {
      state.categoryList = payload;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーを追加しました。';
    },
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
  },

  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        commit('setCategoryList', res.data.categories.reverse());
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters }, category) {
      commit('toggleLoading');
      return new Promise(resolve => {
        const params = new URLSearchParams();
        params.append('name', category);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          params,
        }).then(() => {
          commit('toggleLoading');
          commit('donePostCategory');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          commit('toggleLoading');
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
