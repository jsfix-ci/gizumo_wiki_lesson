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
    editCategoryName: '',
    editCategoryId: null,
  },


  mutations: {
    editCategory(state, payload) {
      state.editCategoryName = payload.name;
      state.editCategoryId = payload.id;
    },
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
      this.state.deleteCategoryName = '';
      this.state.deleteCategoryId = null;
    },
    updateValue(state, payload) {
      state.editCategoryName = payload;
    },
    editDoneMessage(state) {
      state.doneMessage = '更新に成功しました';
    },
  },

  actions: {
    updateValue({ commit }, event) {
      commit('updateValue', event);
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
    deleteCategory({ commit, rootGetters }, deleteCategoryId) {
      commit('clearMessage');
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${deleteCategoryId}`,
        }).then(() => {
          commit('deleteDoneMessage');
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    getCategoryDetail({ commit, rootGetters }, categoryId) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then(({ data }) => {
        commit('editCategory', data.category);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    updateCategory({ commit, rootGetters, state }) {
      commit('toggleLoading');
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${state.editCategoryId}`,
        data: {
          name: state.editCategoryName,
        },
      }).then(() => {
        commit('toggleLoading');
        commit('editDoneMessage');
      }).catch((err) => {
        commit('toggleLoading');
        commit('failRequest', { message: err.message });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
