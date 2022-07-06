import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    deleteCategory: {
      id: null,
      name: '',
    },
    errorMessage: '',
  },
  mutations: {
    // 全カテゴリー名の取得
    allCategories(state, payload) {
      state.categories = payload;
    },
    // 削除する内容
    addDeleteCategory(state, { id, name }) {
      state.deleteCategory.id = id;
      state.deleteCategory.name = name;
    },
    // エラー表示
    failRequest(state, message) {
      state.errorMessage = message;
    },
  },
  actions: {
    // 全カテゴリー名の取得
    allCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(({ data }) => {
        commit('allCategories', data.categories.reverse());
      }).catch((err) => {
        const errTxt = err.message;
        commit('failRequest', errTxt);
      });
    },
    addDeleteCategory({ commit }, { categoryId: id, categoryName: name }) {
      commit('addDeleteCategory', { id, name });
    },
  },
};
