<template>
  <div class="category">
    <div class="category_post">
      <app-category-post
        :access="access"
      />
    </div>
    <div class="category_list">
      <app-category-list
        :access="access"
        :theads="theads"
        :categories="categoryList"
      />
    </div>
  </div>
</template>
<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
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
<style lang='postcss' scoped>
  .category {
    display: flex;
    &_post {
      padding-right: 10px;
      width: 40%;
      border-right: 1px solid rgb(180, 180, 180);
    }
    &_list {
      width: 60%;
      margin-left: 10px;
    }
  }
</style>
