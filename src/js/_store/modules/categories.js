import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
    targetCategory: '',
    doneMessage: '',
    loading: false,
    deleteCategoryId: null,
    deleteCategoryName: '',
    editCategoryName: '',
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
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
    },
    getCategory(state, payload) {
      state.editCategoryName = payload;
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
    updateValue({ commit }, $event) {
      commit('updateValue', $event);
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
    getCategory({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then(({ data }) => {
        console.log(data.category.name);
        commit('getCategory', data.category.name);
      }).catch((err) => {
        const errTxt = err.message;
        commit('failRequest', errTxt);
      });
    },
  },
};
