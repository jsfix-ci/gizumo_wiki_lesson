<template lang="html">
  <section class="category-post">
    <div class="category-post__child">
      <app-category-post
        :access="access"
        :error-message="errorMessage"
        :done-message="doneMessage"
      />
    </div>
    <app-category-list
      class="category-list__child"
      :theads="theadName"
      :categories="categoriesList"
      :access="access"
    />
  </section>
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
      doneMessage: '',
      theadName: ['カテゴリー名'],
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.categories.categoryList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
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
.category-post {
  display: flex;
}
.category-post__child {
  width: 30%;
  border-right: solid 1px rgb(214, 212, 212);
  padding-right: 20px;
}
.category-list__child {
  width: 70%;
  padding-left: 20px;
}
</style>
