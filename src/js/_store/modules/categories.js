/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import axios from '@Helpers/axiosDefault';
// import Cookies from 'js-cookie';

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
      state.categoryList = payload;
      state.categoryList.reverse();
    },
    addCategoryList(state, payload) {
      console.log(payload);
      state.categoryList.push(payload);
    },
    initPostCategory(state) {
      state.targeCategory = Object.assign({}, {
        id: null,
        category: '',
      });
    },
    updateValue(state, { name, value }) {
      state.targetCategory = Object.assign({}, state.targetCategory, { [name]: value });
      console.log(state.targetCategory);
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
    postCategory({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: {
          name: rootGetters['categories/targetCategory'].category,
        },
      }).then((res) => {
        console.log(res);
        commit('addCategoryList', res.data.category);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
      commit('initPostCategory');
    },
  },
};
