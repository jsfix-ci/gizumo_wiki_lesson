<template>
  <div class="categories">
    <app-category-post
      class="category-post"
      :category="category"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :access="access"
    />
    <app-category-list
      class="category-list"
      :theads="theads"
      :categories="categories"
      :access="access"
    />
  </div>
</template>
<script>
import { CategoryList, CategoryPost } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    category() {
      return this.$store.state.category;
    },
    errorMessage() {
      return this.$store.state.errorMessage;
    },
    doneMessage() {
      return this.$store.state.doneMessage;
    },
    categories() {
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
<style lang="scss" scoped>
  .categories {
    display: flex;
  }
  .category-post {
    width: 40%;
    padding-right: 30px;
  }
  .category-list {
    border-left: 5px solid $separator-color;
  }
</style>
