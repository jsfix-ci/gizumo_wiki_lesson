<template lang="html">
  <div class="categories-wrapper">
    <app-category-post
      class="category-post"
      :access="access"
      :category="categoryName"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :disabled="loading"
      @handleSubmit="handleSubmit"
      @updateValue="updateValue"
      @clearMessage="clearMessage"
    />
    <app-category-list
      class="category-list"
      :access="access"
      :categories="categories"
      :theads="theads"
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
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories.categories;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryName() {
      return this.$store.state.categories.targetCategory;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
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
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    handleSubmit() {
      if (this.loading) {
        return;
      }
      this.$store.dispatch('categories/postCategory')
        .then(() => {
          this.$store.dispatch('categories/getAllCategories');
        });
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event.target.value);
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
      this.$store.dispatch('categories/deleteCategory')
        .then(() => {
          this.$store.dispatch('categories/getAllCategories');
        });
    },
  },
};
</script>

<style lang="postcss" scoped>
.categories-wrapper {
  display: flex;
}

.category-list {
  width: 60%;
}

.category-post {
  width: 40%;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 2px solid #eee;
}
</style>
