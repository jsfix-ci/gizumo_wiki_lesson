import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: {
      id: null,
      name: '',
    },
    categoryList: [],
    disabled: false,
    doneMessage: '',
    errorMessage: '',
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    getInputCategories(state, event) {
      state.category.name = event;
    },
    toggleDisabled(state) {
      state.disabled = !state.disabled;
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
    displayErrorMessage(state) {
      state.errorMessage = 'すでに存在してるカテゴリーです！';
    },
  },
  actions: {
    postCategory({ state, commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('toggleDisabled');
        commit('clearMessage');
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: {
            name: state.category.name,
          },
        }).then(() => {
          resolve();
          commit('toggleDisabled');
          commit('deleteCategoryName');
          commit('displayDoneMessage');
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
        }).catch((err) => {
          console.log({ message: err.message });
          commit('toggleDisabled');
          commit('displayErrorMessage');
          reject();
        });
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
    getInputCategories({ commit }, event) {
      commit('getInputCategories', event);
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
