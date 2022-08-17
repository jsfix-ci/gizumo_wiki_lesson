import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
    targetCategory: '',
    doneMessage: '',
    loading: false,
  },

  mutations: {
    resetTargetCategory(state) {
      state.targetCategory = '';
    },
    getAllCategories(state, payload) {
      state.categories = payload;
    },
    failRequest(state, errTxt) {
      state.errorMessage = errTxt;
    },
    updateValue(state, payload) {
      state.targetCategory = payload;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    displayDoneMessage(state, { message }) {
      state.doneMessage = message;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(({ data }) => {
        commit('getAllCategories', data.categories.reverse());
      }).catch((err) => {
        const errTxt = err.message;
        commit('failRequest', errTxt);
      });
    },
    postCategory({ commit, rootGetters, state }) {
      return new Promise((resolve) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', state.targetCategory);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
          commit('resetTargetCategory');
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          const errTxt = err.message;
          commit('failRequest', errTxt);
        });
      });
    },
    updateValue({ commit }, $event) {
      commit('updateValue', $event);
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
