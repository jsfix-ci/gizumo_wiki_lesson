import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: {},
    errorMessage: '',
  },
  mutations: {
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    doneGetAllCategories(state, payload) {
      state.category = { ...state.category, ...payload.category };
    },
  },
  actions: {
    // カテゴリー一覧取得
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          category: res.data.categories,
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
