<template>
  <div class="wrapper">
    <app-category-post
      :access="access"
      :error-message="errorMessage"
    />
    <app-category-list
      :categories="categories"
      :theads="theads"
      :access="access"
    />
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    category() {
      return this.$store.state.categories.categories;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display:flex;
  justify-content: space-between;
}
</style>
