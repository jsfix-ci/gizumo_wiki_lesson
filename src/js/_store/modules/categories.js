import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories:[],
  },
  mutations: {
    AllCategories(state, payload) {
      state.categories = payload;
    },
  },
  actions: {
    AllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token']) ({
        method: 'GET',
        url:'/category',
      }).then(({ data }) => {
        commit('AllCategories', data.categories.reverse());
      }).catch((err) => {
        const errTxt = err.message;
        commit('failRequest', errTxt);
      });
    },
  },

};