import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: {
      id: null,
      name: '',
    },
    deleteCategoryId: null,
    deleteCategoryName: '',
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    loading: false,
  },
  getters: {
    deleteCategoryId: state => state.deleteCategoryId,
    deleteCategoryName: state => state.deleteCategoryName,
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    doneGetAllCategories(state, categories) {
      state.categoryList = categories.reverse();
    },
    failRequest(state, payload) {
      state.errorMessage = payload.message;
    },
    displayDoneMessage(state, payload) {
      state.doneMessage = payload.message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    openDeleteModal(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
    },
    updateCategory(state, { category }) {
      state.category = { ...state.category, ...category };
    },
    editedName(state, payload) {
      state.category = { ...state.category, name: payload.name };
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        commit('doneGetAllCategories', res.data.categories);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    createCategory({ commit, rootGetters }, category) {
      commit('toggleLoading');

      return new Promise(resolve => {
        const data = new URLSearchParams();
        data.append('name', category);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(response => {
          if (response.data.code === 0) throw new Error(response.data.message);
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.response.data.message });
        });
      });
    },
    openDeleteModal({ commit }, { categoryId, categoryName }) {
      commit('openDeleteModal', { categoryId, categoryName });
    },
    deleteCategory({ commit, rootGetters, state }) {
      commit('clearMessage');
      return new Promise(resolve => {
        const data = new URLSearchParams();
        data.append('id', state.deleteCategoryId);
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${state.deleteCategoryId}`,
          data,
        }).then(response => {
          if (response.data.code === 0) throw new Error(response.data.message);
          commit('doneDeleteCategory');
          commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    editedName({ commit }, name) {
      commit({
        type: 'editedName',
        name,
      });
    },
    updateCategory({ commit, rootGetters, state }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('id', state.category.id);
      data.append('name', state.category.name);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${state.category.id}`,
        data,
      }).then(res => {
        console.log(res);
        const payload = {
          category: {
            id: res.data.category.id,
            name: res.data.category.name,
          },
        };
        commit('updateCategory', payload);
        commit('toggleLoading');
      });
    },

  },
};
