import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    loading: false,
    deleteCategoryId: null,
    deleteCategoryName: '',
    editCategory: {
      id: null,
      name: '',
    },
  },

  mutations: {
    setCategoryList(state, payload) {
      state.categoryList = payload;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    displayDoneMessage(state, { message }) {
      state.doneMessage = message;
    },
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
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
    setCategoryDetail(state, { categoryId, categoryName }) {
      state.editCategory.id = categoryId;
      state.editCategory.name = categoryName;
    },
    updateEditValue(state, payload) {
      state.editCategory.name = payload;
    },
    doneUpdateCategory(state) {
      state.editCategory.id = null;
      state.editCategory.name = '';
    },
  },

  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        commit('setCategoryList', res.data.categories.reverse());
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters }, category) {
      commit('toggleLoading');
      return new Promise(resolve => {
        const params = new URLSearchParams();
        params.append('name', category);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          params,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'カテゴリーを追加しました。' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          commit('toggleLoading');
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
    deleteCategory({ commit, rootGetters }, categoryId) {
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${categoryId}`,
        }).then(() => {
          commit('doneDeleteCategory');
          commit('displayDoneMessage', { message: 'カテゴリーを削除しました。' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    getCategoryDetail({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        methods: 'GET',
        url: `/category/${categoryId}`,
      }).then(({ data }) => {
        const categoryName = data.category.name;
        commit('setCategoryDetail', { categoryId, categoryName });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateEditValue({ commit }, editCategoryName) {
      commit('updateEditValue', editCategoryName);
    },
    updateCategory({ commit, rootGetters, state }) {
      commit('clearMessage');
      commit('toggleLoading');
      const params = new URLSearchParams();
      params.append('name', state.editCategory.name);
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'PUT',
          url: `/category/${state.editCategory.id}`,
          params,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'カテゴリーを更新しました。' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
  },
};
