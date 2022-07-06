import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      name: '',
    },
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    disabled: false,
  },
  getters: {
    targetCategory: state => state.targetCategory,
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = payload.categories.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    updateName(state, name) {
      state.targetCategory.name = name;
    },
    initTargetCategory(state) {
      state.targetCategory = {
        id: null,
        name: '',
      };
    },
    doneMessage(state) {
      state.doneMessage = 'カテゴリー名を登録しました';
    },
    toggleDisabled(state) {
      state.disabled = !state.disabled;
    },
  },
  actions: {
    // カテゴリー一覧取得
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((res) => {
        const payload = {
          categories: res.data.categories,
        };
        commit('doneGetAllCategories', payload);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    updateName({ commit }, name) {
      commit('updateName', name);
    },
    // カテゴリー追加
    postCategory({ commit, rootGetters }) {
      commit('toggleDisabled');
      return new Promise((resolve) => {
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/targetCategory'].name);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleDisabled');
          commit('doneMessage');
          resolve();
        }).catch((err) => {
          commit('toggleDisabled');
          commit('failRequest', { message: err.message });
        });
      }).finally(() => {
        commit('initTargetCategory');
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
