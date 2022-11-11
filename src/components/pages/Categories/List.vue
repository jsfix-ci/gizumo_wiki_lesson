<template>
  <div class="wrapper">
    <section class="category-post">
      <app-category-post
        :access="access"
        :error-message="errorMessage"
      />
    </section>
    <section class="category-list">
      <app-category-list
        :categories="categoryList"
        :theads="theads"
        :access="access"
      />
    </section>
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
    categoryList() {
      const { categoryList } = this.$store.state.categories;
      return categoryList;
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
section.category-post {
  width: 30%;
}
section.category-list {
  width: 70%;
  border-left:solid 1px $separator-color;
  padding-left: 20px;
  margin-left: 20px;
}
</style>
