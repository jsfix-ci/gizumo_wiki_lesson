import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    category: '',
    errorMessage: '',
  },
  mutations: {
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    doneGetAllCategories(state, categories) {
      state.categoryList = categories;
    },
    updateValue(state, category) {
      state.category = category;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        commit('doneGetAllCategories', res.data.categories.reverse());
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateValue({ commit }, category) {
      commit('updateValue', category);
    },
    postCategory({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
      }).then(res => {
        commit('donePostCategories', res.data.categories.reverse());
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
