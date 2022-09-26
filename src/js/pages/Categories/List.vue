<template>
  <div class="categories">
    <app-category-Post
      class="categories__post"
      :access="access"
      :error-message="errorMessage"
      :category="categoryName"
      :done-message="doneMessage"
      :disabled="loading"
      @updateValue="updateValue"
      @handleSubmit="handleSubmit"
      @clearMessage="clearMessage"
    />
    <app-category-List
      class="categories__list"
      :access="access"
      :theads="theads"
      :categories="categoriesList"
      :delete-category-name="deleteCategoryName"
      @handleClick="deleteCategory"
      @openModal="openModal"
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
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategoryName;
    },
  },
  created() {
    this.clearMessage();
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
    openModal(categoryId, categoryName) {
      this.$store.dispatch('categories/confirmDeleteCategory',
        {
          categoryId, categoryName,
        });
      this.toggleModal();
    },
    deleteCategory() {
      this.toggleModal();
      this.$store.dispatch('categories/deleteCategory').then(() => {
        this.$store.dispatch('categories/getCategoriesList');
      });
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
