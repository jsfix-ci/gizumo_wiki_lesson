import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    categoryList: [],
    doneMessage: '',
    errorMessage: '',
  },
  mutations: {
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    doneGetAllCategories(state, categories) {
      state.categoryList = categories;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    displayDoneMessage(state) {
      state.doneMessage = '成功しました';
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        commit('doneGetAllCategories', res.data.categories.reverse());
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    postCategory({ commit, rootGetters }, name) {
      return new Promise(resolve => {
        commit('toggleLoading');
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: name,
        }).then(() => {
          commit('displayDoneMessage');
          commit('toggleLoading');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          commit('toggleLoading');
        });
      });
    },
  },
};
