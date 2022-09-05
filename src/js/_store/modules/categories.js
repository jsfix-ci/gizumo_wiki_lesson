import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoriesList: [],
    errorMessage: '',
  },
  mutations: {
    putCategoriesList(state, payload) {
      state.categoriesList = payload;
    },
    failRequest(state, payload) {
      state.errorMessage = payload;
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
  },
};
