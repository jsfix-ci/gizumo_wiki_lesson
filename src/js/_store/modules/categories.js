import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: 'null',
      category: '',
    },
    categoryList: [],
  },
  getters: {
    targetCategory: state => state.targetCategory,
  },

  mutations: {
    setCategoryList(state, payload) {
      state.categoryList = payload.reverse();
    },
    updateValue(state, { name, value }) {
      state.targetCategory = Object.assign({}, state.targetCategory, { [name]: value });
    },
  },

  actions: {
    updateValue({ commit }, target) {
      commit('updateValue', target);
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((res) => {
        commit('setCategoryList', res.data.categories);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
