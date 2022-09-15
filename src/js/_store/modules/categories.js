import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoriesList: [],
    errorMessage: '',
    targetCategory: '',
    doneMessage: '',
    loading: false,
    deleteCategoryId: null,
    deleteCategoryName: '',
  },
  mutations: {
    resetTargetCategory(state) {
      state.targetCategory = '';
    },
    putCategoriesList(state, payload) {
      state.categoriesList = payload;
    },
    failRequest(state, payload) {
      state.errorMessage = payload;
    },
    updateValue(state, payload) {
      state.targetCategory = payload;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    displayDoneMessage(state, { message }) {
      state.doneMessage = message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
    },
  },
  actions: {
    getCategoriesList({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(({ data }) => {
        commit('putCategoriesList', data.categories.reverse());
      }).catch((err) => {
        const errTxt = err.message;
        commit('failRequest', errTxt);
      });
    },
    updateValue({ commit }, $event) {
      commit('updateValue', $event);
    },
    postCategory({ commit, rootGetters, state }) {
      commit('clearMessage');
      commit('toggleLoading');
      return new Promise((resolve) => {
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
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    deleteCategory({ commit, rootGetters, state }) {
      commit('clearMessage');
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${state.deleteCategoryId}`,
        }).then(() => {
          commit('doneDeleteCategory');
          commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
          resolve();
        }).catch((err) => {
          const errTxt = err.message;
          commit('failRequest', errTxt);
        });
      });
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
  },
};
