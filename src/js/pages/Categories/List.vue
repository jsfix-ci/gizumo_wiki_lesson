<template lang="html">
  <div class="category-wrapper">
    <app-category-post
      class="category-wrapper__post"
      :category="category"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="isLoading"
      :access="access"
      @updateValue="updateName"
      @clearMessage="clearMessage"
      @handleSubmit="handleSubmit"
    />
    <app-category-list
      class="category-wrapper__list"
      :theads="theads"
      :categories="categoriesList"
      :delete-category-name="deleteCategoryName"
      :access="access"
      @openModal="openModal"
      @handleClick="handleClick"
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
      theads: ['カテゴリー名', '', '', ''],
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.categories.categoryList;
    },
    category() {
      return this.$store.state.categories.targetCategory.name;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    isLoading() {
      return this.$store.state.categories.isLoading;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategory.name;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/initTargetCategory');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    updateName($event) {
      this.$store.dispatch('categories/updateName', $event.target.value);
    },
    handleSubmit() {
      this.$store.dispatch('categories/postCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    openModal(id, name) {
      this.toggleModal();
      this.$store.dispatch('categories/confirmDeleteCategory', { id, name });
    },
    handleClick() {
      this.toggleModal();
      this.$store.dispatch('categories/deleteCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
  .category-wrapper{
    display: flex;
    &__post {
      width: 30%;
      padding-right: 10px;
    }
    &__list {
      width: 70%;
      padding-left: 10px;
      border-left: 2px solid var(--separatorColor);
    }
  }
</style>
