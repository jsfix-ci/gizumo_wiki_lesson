<template>
  <div class="categories">
    <app-category-Post
      class="categories__post"
      :errorMessage="errorMessage"
    />
    <app-category-List
      class="categories__list"
      :theads="theads"
      :categories="categoriesList"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

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
    categoriesList() {
      return this.$store.state.categories.categoriesList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategoriesList');
  },
};
</script>

<style lang="postcss" scoped>
.categories {
  display: flex;
  &__post {
    width: 40%;
    border-right: 1px solid #c0c0c0;
    padding-right: 20px;
    margin-right: 20px;
  }
  &__list {
    width: 60%;
  }
}
</style>
