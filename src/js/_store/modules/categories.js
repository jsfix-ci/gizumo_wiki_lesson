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
    editCategory: {
      id: null,
      name: '',
    },
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
    setCategoryDetail(state, { categoryId, categoryName }) {
      state.editCategory.id = categoryId;
      state.editCategory.name = categoryName;
    },
    updateEditValue(state, payload) {
      state.editCategory.name = payload;
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
    getCategoryDetail({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then(({ data }) => {
        const categoryName = data.category.name;
        commit('setCategoryDetail', { categoryId, categoryName });
      }).catch((err) => {
        const errTxt = err.message;
        commit('failRequest', errTxt);
      });
    },
    editCategoryName({ commit, rootGetters, state }) {
      return new Promise((resolve) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', state.editCategory.name);
        axios(rootGetters['auth/token'])({
          method: 'PUT',
          url: `/category/${state.editCategory.id}`,
          data,
        }).then(() => {
          resolve();
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'カテゴリー名を更新しました' });
        }).catch((err) => {
          commit('toggleLoading');
          const errTxt = err.message;
          commit('failRequest', errTxt);
        });
      });
    },
    updateEditValue({ commit }, inputText) {
      commit('updateEditValue', inputText);
    },
  },
};
