import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: '',
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
  },
  getters: {
    targetCategory: state => state.targetCategory,
  },

  mutations: {
    setCategoryList(state, payload) {
      state.categoryList = payload.reverse();
    },
    updateValue(state, target) {
      state.targetCategory = target.target.value;
    },
    initCategory(state) {
      state.targetCategory = '';
    },
    doneMessage(state) {
      state.doneMessage = 'カテゴリーを追加しました';
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
  },

  actions: {
    updateValue({ commit }, target) {
      commit('updateValue', target);
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((res) => {
        commit('setCategoryList', res.data.categories);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters }) {
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: {
            name: rootGetters['categories/targetCategory'],
          },
        }).then(() => {
          resolve();
          commit('doneMessage');
        }).catch((err) => {
          commit('failRequest', { message: err.message });
        });
        commit('initCategory');
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
