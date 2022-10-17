import axios from '@Helpers/axiosDefault';

export default {
  state: {
    category: {
      id: null,
      name: '',
    },
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    loading: false,
  },
  mutations: {
    doneGetAllCategories(state, { categories }) {
      state.categoryList = categories.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.loading = false;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const categories = res.data.categories.map(data => ({
          id: data.id,
          name: data.name,
        }));
        commit('doneGetAllCategories', { categories });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
