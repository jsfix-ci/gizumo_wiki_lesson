import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: {
      id: null,
      name: '',
    },
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    loading: false,
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    applyRequest(state) {
      state.loading = true;
    },
    doneGetAllCategories(state, categories) {
      state.categoryList = categories.reverse();
    },
    failRequest(state, payload) {
      state.errorMessage = payload.message;
    },
    displayDoneMessage(state, payload) {
      state.doneMessage = payload.message;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        commit('doneGetAllCategories', res.data.categories);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    createCategory({ commit, rootGetters }, category) {
      commit('applyRequest');

      return new Promise(resolve => {
        const data = new URLSearchParams();
        data.append('name', category);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(response => {
          if (response.data.code === 0) throw new Error(response.data.message);
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.response.data.message });
        });
      });
    },
  },
};
