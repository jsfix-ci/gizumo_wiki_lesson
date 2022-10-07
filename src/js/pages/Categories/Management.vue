<template lang="html">
  <div class="category">
    <app-category-post
      class="category-post"
      :access="access"
    />
    <app-category-list
      class="category-list"
      :categories="CategoriesList"
      :access="access"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  computed: {
    CategoriesList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style lang="postcss" scoped>
  .category {
    display: flex;
    height: 100%;
    &-post {
      padding-right: 2%;
      width: 50%;
      border-right: 1px solid #ccc;
    }
    &-list {
      margin-left: 2%;
      width: 48%;
      overflow-y: scroll;
      background-color: #fff;
    }
  }
</style>
