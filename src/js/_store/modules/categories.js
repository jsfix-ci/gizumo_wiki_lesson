import axios from '@Helpers/axiosDefault';
// import Cookies from 'js-cookie';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    disabled: false,
    doneMessage: '',
    errorMessage: '',
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    toggleDisabled(state) {
      state.disabled = !state.disabled;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    displayDoneMessage(state, payload) {
      state.doneMessage = payload.message;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((res) => {
        const payload = {
          categories: res.data.categories.reverse(),
        };
        commit('doneGetAllCategories', payload);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategories({ commit, rootGetters }, targetCategory) {
      return new Promise((resolve) => {
        commit('toggleDisabled');
        commit('clearMessage');
        const data = new URLSearchParams();
        data.append('name', targetCategory);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleDisabled');
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
          resolve();
        }).catch((err) => {
          commit('toggleDisabled');
          commit('failRequest', { message: err.message });
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
