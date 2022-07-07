<template>
  <div class="categories">
    <div class="categories-post">
      <app-category-post
        :access="access"
      />
    </div>
    <div class="categories-border" />
    <div class="categories-list">
      <app-category-list
        :categories="categoryList"
        :access="access"
        :theads="thead"
      />
    </div>
  </div>
</template>


<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  data() {
    return {
      thead: ['カテゴリー名'],
    };
  },
  computed: {
    categoryList() {
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
  .categories {
    display: flex;
    &-post {
      width: 29%;
      margin-right: 1%;
    }
    &-border {
      width: 0%;
      border-left: 1px solid #ccc;
    }
    &-list {
      width: 69%;
      margin-left: 1%;
    }
  }
</style>
