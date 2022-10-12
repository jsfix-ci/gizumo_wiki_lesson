
import axios from '@Helpers/axiosDefault';


export default {
  namespaced: true,
  state: {
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    disabled: false,
    deleteCategoryId: null,
    deleteCategoryName: '',
    editCategoryName: '',
    editCategoryId: null,
  },
  mutations: {
    setAllCategories(state, payload) {
      state.categoryList = payload.reverse();
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    displayDoneMessage(state, { message }) {
      state.doneMessage = message;
    },
    toggleDisabled(state) {
      state.disabled = !state.disabled;
    },
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
    },
    updateValue(state, $event) {
      state.editCategoryName = $event.target.value;
    },
    confirmEditCategory(state, payload) {
      state.editCategoryName = payload.data.category.name;
      state.editCategoryId = payload.data.category.id;
    },
    clearCategory(state) {
      state.editCategoryName = '';
      state.editCategoryId = null;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((response) => {
        commit('setAllCategories', response.data.categories);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters }, targetCategory) {
      return new Promise((resolve) => {
        commit('toggleDisabled');
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: {
            name: targetCategory,
          },
        }).then(() => {
          commit('toggleDisabled');
          commit('displayDoneMessage', { message: 'カテゴリーを追加しました。' });
          resolve();
        }).catch((err) => {
          commit('toggleDisabled');
          commit('failRequest', { message: err.message });
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
    deleteCategory({ commit, rootGetters }, deleteCrticleId) {
      return new Promise((resolve) => {
        commit('clearMessage');
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${deleteCrticleId}`,
        }).then(() => {
          commit('doneDeleteCategory');
          commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    updateValue({ commit }, $event) {
      commit('updateValue', $event);
    },
    setEditCategoryName({ commit, rootGetters }, id) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
      }).then((response) => {
        commit('confirmEditCategory', response);
      });
    },
    editCategory({ commit, rootGetters, state }) {
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'PUT',
          url: `/category/${state.editCategoryId}`,
          data: {
            name: state.editCategoryName,
          },
        }).then(() => {
          commit('displayDoneMessage', { message: 'カテゴリーを更新しました' });
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    clearCategory({ commit }) {
      commit('clearCategory');
    },
  },
};
