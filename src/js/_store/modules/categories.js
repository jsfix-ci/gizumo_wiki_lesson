
import axios from '@Helpers/axiosDefault';


export default {
  namespaced: true,
  state: {
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    disabled: false,
  },
  mutations: {
    setAllCategories(state, payload) {
      state.categoryList = payload.reverse();
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    toggleDisabled(state) {
      state.disabled = !state.disabled;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((response) => {
        commit('setAllCategories', response.data.categories);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters }, targetCategory) {
      return new Promise((resolve) => {
        commit('toggleDisabled');
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: {
            name: targetCategory,
          },
        }).then(() => {
          commit('toggleDisabled');
          commit('displayDoneMessage', { message: 'カテゴリーを追加しました。' });
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
