
import axios from '@Helpers/axiosDefault';


export default {
  namespaced: true,
  state: {
    categoryList: [],
    targetCategory: [],
    postCategory: [],
  },
  mutations: {
    setAllCategories(state, payload) {
      state.categoryList = payload.reverse();
    },
    updateValue(state, { name, value }) {
      cousole.log(name);
      console.log(value);
      state.targetCategory = Object.assign({}, state.targetCategory, { [name]: value });
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((response) => {
        commit('setAllCategories', response.data.categories);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    updateValue({ commit }, target) {
      commit('updateValue', target);
    },
  },
};
