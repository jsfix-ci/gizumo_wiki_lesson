import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    disabled: false,
    deleteCategoryName: '',
    deleteCategoryId: null,
  },

  getters: {
    deleteCategoryId: state => state.deleteCategoryId,
  },

  mutations: {
    setCategoryList(state, payload) {
      state.categoryList = payload.reverse();
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
    toggleLoading(state) {
      state.disabled = !state.disabled;
    },
    confirmTargetCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryName = categoryName;
      state.deleteCategoryId = categoryId;
    },
    deleteDoneMessage(state) {
      state.doneMessage = 'カテゴリーを削除しました。';
    },
  },

  actions: {
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
    postCategory({ commit, rootGetters }, targetCategory) {
      commit('clearMessage');
      return new Promise((resolve) => {
        commit('toggleLoading');
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: {
            name: targetCategory,
          },
        }).then(() => {
          commit('toggleLoading');
          resolve();
          commit('doneMessage');
        }).catch((err) => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
        });
      });
    },
    confirmTargetCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmTargetCategory', { categoryId, categoryName });
    },
    deleteCategory({ commit, rootGetters }) {
      commit('clearMessage');
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${rootGetters['categories/deleteCategoryId']}`,
        }).then(() => {
          commit('deleteDoneMessage');
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
