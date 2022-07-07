import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    targetCategory: '',
    deleteCategory: {
      id: null,
      name: '',
    },
    doneMessage: '',
    errorMessage: '',
    isLoading: false,
  },
  getters: {
    targetCategory: state => state.targetCategory,
  },
  mutations: {
    // 全カテゴリー名の反映
    allCategories(state, payload) {
      state.categories = payload;
    },
    // 削除する内容の反映
    addDeleteCategory(state, { id, name }) {
      state.deleteCategory.id = id;
      state.deleteCategory.name = name;
    },
    // 作成するカテゴリーの反映
    addTargetCategory(state, name) {
      state.targetCategory = name;
    },
    // ローディング状態の反映
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
    // エラー表示
    failRequest(state, message) {
      state.errorMessage = message;
    },
    // 終了メッセージの反映
    categoryDoneMessage(state, payload) {
      state.doneMessage = payload.message;
    },
    // メッセージを空にする
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
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
    // 削除する要素
    addDeleteCategory({ commit }, { categoryId: id, categoryName: name }) {
      commit('addDeleteCategory', { id, name });
    },
    // 追加する要素
    addTargetCategory({ commit }, name) {
      commit('addTargetCategory', name);
    },
    // カテゴリー作成
    createCategory({ commit, rootGetters }) {
      return new Promise((resolve) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/targetCategory']);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('categoryDoneMessage', { message: 'カテゴリーを作成しました' });
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
        });
      });
    },
    //  メッセージクリア
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
