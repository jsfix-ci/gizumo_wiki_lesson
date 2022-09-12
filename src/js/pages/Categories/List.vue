<template>
  <div class="categories">
    <app-category-Post
      class="categories__post"
      :access="access"
      :error-messages="errorMessage"
      :category="categoryName"
      :done-message="doneMessage"
      :disabled="loading"
      @updateValue="updateValue"
      @handleSubmit="handleSubmit"
      @clearMessage="clearMessage"
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
    access() {
      return this.$store.getters['auth/access'];
    },
    categoriesList() {
      return this.$store.state.categories.categoriesList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    categoryName() {
      return this.$store.state.categories.targetCategory;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategoriesList');
  },
  methods: {
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) {
        return;
      }
      this.$store.dispatch('categories/postCategory').then(() => {
        this.$store.dispatch('categories/getCategoriesList');
      });
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
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
