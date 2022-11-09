import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    disabled: false,
    errorMessage: '',
    doneMessage: '',
    deleteCategoryId: null,
    deleteCategoryName: '',
  },
  getters: {
    deleteCategoryId: state => state.deleteCategoryId,
    deleteCategoryName: state => state.deleteCategoryName,
  },
  mutations: {
    doneGetCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
    },
    confirmDeleteCategories(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
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
      }).then(res => {
        const payload = {
          categories: res.data.categories.reverse(),
        };
        commit('doneGetCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    confirmDeleteCategories({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategories', { categoryId, categoryName });
    },
    deleteCategories({ commit, rootGetters, state }) {
      return new Promise(resolve => {
        commit('clearMessage');
        const data = new URLSearchParams();
        data.append('id', state.deleteCategoryId);
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${state.deleteCategoryId}`,
          data,
        }).then(() => {
          commit('doneDeleteCategory');
          commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    postCategories({ commit, rootGetters }, targetCategory) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('toggleDisabled');
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
        }).catch(err => {
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
