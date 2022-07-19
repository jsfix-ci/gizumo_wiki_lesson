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
      state.category.name = null;
    },
    displayDoneMessage(state) {
      state.doneMessage = 'カテゴリー作成しました！';
    },
    clearMessage(state) {
      state.doneMessage = null;
      state.errorMessage = null;
    },
    displayErrorMessage(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    postCategory({ state, commit, rootGetters }) {
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
          this.dispatch('categories/getAllCategories');
        }).catch((err) => {
          commit('toggleIsConnecting');
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
  },
};
