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
      state.loading = true;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.loading = false;
    },
    doneGetAllCategories(state, categories) {
      state.categoryList = categories;
      state.loading = false;
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
      commit('toggleLoading');
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
      commit('toggleLoading');
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: name,
        }).then(() => {
          commit('displayDoneMessage');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
  },
};
