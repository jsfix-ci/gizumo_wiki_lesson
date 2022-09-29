import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    errorMessage: '',
  },

  mutations: {
    setCategoryList(state, payload) {
      state.categoryList = payload;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
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
  },
};
