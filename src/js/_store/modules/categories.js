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
    isLoading: false,
    deleteCategory: {
      id: null,
      name: '',
    },
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
    doneMessage(state, { message }) {
      state.doneMessage = message;
    },
    toggleDisabled(state) {
      state.isLoading = !state.isLoading;
    },
    confirmDeleteCategory(state, { id, name }) {
      state.deleteCategory = {
        id,
        name,
      };
    },
    doneDeleteCategory(state) {
      state.deleteCategory = {
        id: null,
        name: '',
      };
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
          commit('doneMessage', { message: 'カテゴリー名を登録しました' });
          resolve();
        }).catch((err) => {
          commit('toggleDisabled');
          commit('failRequest', { message: err.message });
        }).finally(() => {
          commit('initTargetCategory');
        });
      });
    },
    confirmDeleteCategory({ commit }, { id, name }) {
      commit('confirmDeleteCategory', { id, name });
    },
    // カテゴリー削除
    deleteCategory({ commit, state, rootGetters }) {
      commit('clearMessage');
      return new Promise((resolve) => {
        const data = new URLSearchParams();
        data.append('id', state.deleteCategory.id);
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${state.deleteCategory.id}`,
          data,
        }).then(() => {
          commit('doneMessage', { message: 'カテゴリー名を削除しました' });
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.message });
        }).finally(() => {
          commit('doneDeleteCategory');
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
