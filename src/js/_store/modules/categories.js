import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: {
      id: null,
      name: '',
      updateName: '',
    },
    categoryList: [],
    isConnecting: false,
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    // これがないと外からrootGettersで取得できない
    categoryList: state => state.categoryList,
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    inputCategories(state, event) {
      state.category.name = event;
    },
    updateCategories(state, event) {
      state.category.updateName = event;
    },
    toggleIsConnecting(state) {
      state.isConnecting = !state.isConnecting;
    },
    deleteCategoryName(state) {
      state.category.name = '';
    },
    setCategoryData(state, { id, name }) {
      state.category.updateName = name;
      state.category.id = id;
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
    displayUpdatedMessage(state) {
      state.doneMessage = 'カテゴリー更新しました！';
    },
    deleteUpdateCategory(state) {
      state.category.id = null;
      state.category.updateName = '';
    },
  },
  actions: {
    getCategoryName({ commit, rootGetters }, id) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
      }).then((val) => {
        const { name } = val.data.category;
        commit('setCategoryData', { id, name });
      }).catch((err) => {
        commit('displayErrorMessage', { message: err.message });
      });
    },
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
    updateCategories({ commit }, event) {
      commit('updateCategories', event);
    },
    inputCategories({ commit }, event) {
      commit('inputCategories', event);
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    setDeleteCategoryId({ commit }, { id }) {
      commit('setDeleteCategoryId', { id });
    },
    deleteCategoryName({ commit }) {
      commit('deleteCategoryName');
    },
    updateCategoryName({
      state,
      rootGetters,
      commit,
    }) {
      commit('clearMessage');
      commit('toggleIsConnecting');
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${state.category.id}`,
        data: {
          name: state.category.updateName,
        },
      })
        .then(() => {
          commit('toggleIsConnecting');
          commit('displayUpdatedMessage');
        })
        .catch((err) => {
          commit('toggleIsConnecting');
          commit('displayErrorMessage', { message: err.message });
        });
    },
    deleteUpdateCategory({ commit }) {
      commit('deleteUpdateCategory');
    },
  },
};
