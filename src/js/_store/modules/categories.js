import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      category: {
        id: null,
        name: '',
      },
    },
    categoryList: [],
    errorMessage: '',
    theadName: ['カテゴリー名'],
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = payload;
    },
    failRequest(state, message) {
      state.errorMessage = message;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      // console.log(rootGetters);
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((res) => {
        // console.log(res);
        const payload = res.data.categories;
        commit('doneGetAllCategories', payload);
      }).catch((err) => {
        // console.log(err);
        commit('failRequest', err.message);
      });
    },
  },
};
