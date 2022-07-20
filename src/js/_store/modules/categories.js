import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: {
      id: null,
      name: '',
    },
    categoryList: [],
    isConnecting: false,
    doneMessage: '',
    errorMessage: '',
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    updateInputCategories(state, event) {
      state.category.name = event;
    },
    toggleIsConnecting(state) {
      state.isConnecting = !state.isConnecting;
    },
    deleteCategoryName(state) {
      state.category.name = '';
    },
    displayDoneMessage(state) {
      state.doneMessage = 'カテゴリー作成しました！';
    },
    displayDeleteMessage(state) {
      state.category.id = null;
      state.doneMessage = 'カテゴリー削除しました！';
    },
    clearMessage(state) {
      state.doneMessage = null;
      state.errorMessage = null;
    },
    displayErrorMessage(state, { message }) {
      state.errorMessage = message;
    },
    setDeleteCategoryId(state, { id }) {
      state.category.id = id;
    },
  },
  actions: {
    postCategory({
      commit,
      state,
      dispatch,
      rootGetters,
    }) {
      commit('toggleIsConnecting');
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: {
          name: state.category.name,
        },
      }).then(() => {
        commit('toggleIsConnecting');
        commit('deleteCategoryName');
        commit('displayDoneMessage');
        dispatch('getAllCategories');
      }).catch((err) => {
        commit('toggleIsConnecting');
        commit('displayErrorMessage', { message: err.message });
      });
    },
    deleteCategory({
      commit,
      rootGetters,
      dispatch,
      state,
    }) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${state.category.id}`,
      }).then(() => {
        commit('displayDeleteMessage');
        dispatch('getAllCategories');
      }).catch((err) => {
        commit('displayErrorMessage', { message: err.message });
      });
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      })
        .then((res) => {
          const payload = {
            categories: res.data.categories.reverse(),
          };
          commit('doneGetAllCategories', payload);
        })
        .catch((err) => {
          commit('failRequest', { message: err.message });
        });
    },
    updateInputCategories({ commit }, event) {
      commit('updateInputCategories', event);
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    setDeleteCategoryId({ commit }, { id }) {
      commit('setDeleteCategoryId', { id });
    },
  },
};
