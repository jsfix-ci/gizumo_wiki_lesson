/* eslint-disable linebreak-style */

import axios from '@Helpers/axiosDefault';


export default {
  namespaced: true,
  state: {
    categoryList: [],
  },
  mutations: {
    setAllCategories(state, payload) {
      state.categoryList = payload.reverse();
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        withCredentials: true,
        method: 'GET',
        url: '/category',
      }).then((response) => {
        commit('setAllCategories', response.data.categories);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
