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
    updateCategory: {
      id: null,
      name: '',
    },
    doneMessage: '',
    errorMessage: '',
    isLoading: false,
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
    targetCategoryReset(state) {
      state.targetCategory = '';
    },
    // 編集後のカテゴリー名取得
    updateCategoryValue(state, name) {
      state.updateCategory.name = name;
    },
    // 更新するカテゴリーの反映
    updateCategoryName(state, { id, getName }) {
      state.updateCategory.id = id;
      state.updateCategory.name = getName;
    },
    // ローディング状態の反映
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
    // エラー表示
    failRequest(state, payload) {
      state.errorMessage = payload.message;
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
    // 追加する要素
    addTargetCategory({ commit }, name) {
      commit('addTargetCategory', name);
    },
    // カテゴリー作成
    createCategory({ commit, rootGetters, state }) {
      return new Promise((resolve) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', state.targetCategory);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('targetCategoryReset');
          commit('toggleLoading');
          commit('categoryDoneMessage', { message: 'カテゴリーを作成しました' });
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
        });
      });
    },
    // 削除する要素
    addDeleteCategory({ commit }, { categoryId: id, categoryName: name }) {
      commit('addDeleteCategory', { id, name });
    },
    // カテゴリーの削除
    deleteCategory({ commit, rootGetters, state }) {
      return new Promise((resolve) => {
        commit('clearMessage');
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${state.deleteCategory.id}`,
        }).then(() => {
          commit('categoryDoneMessage', { message: 'カテゴリーを削除しました' });
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    // 変更するカテゴリー名の取得
    updateCategoryName({ commit, rootGetters }, id) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
      }).then(({ data }) => {
        const getName = data.category.name;
        commit('updateCategoryName', { id, getName });
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    // 編集後のカテゴリー名取得
    updateCategoryValue({ commit }, name) {
      commit('updateCategoryValue', name);
    },
    // カテゴリーの編集
    updateCategory({ commit, rootGetters, state }) {
      return new Promise((resolve) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', state.updateCategory.name);
        axios(rootGetters['auth/token'])({
          method: 'PUT',
          url: `/category/${state.updateCategory.id}`,
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('categoryDoneMessage', { message: 'カテゴリー名を更新しました' });
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
