<template>
  <div class="category">
    <app-category-post
      class="category_post"
      :category="targetCategory"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :access="access"
      :disabled="toggleDisabled"
      @updateValue="updateValue"
      @handleSubmit="handleSubmit"
      @clearMessage="clearMessage"
    />
    <app-category-list
      class="category_list"
      :access="access"
      :theads="theads"
      :categories="categoryList"
      :delete-category-name="deleteCategoryName"
      @openModal="openModal"
      @handleClick="handleClick"
    />
  </div>
</template>
<script>
import { CategoryPost, CategoryList } from '@Components/molecules';
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
      targetCategory: '',
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    toggleDisabled() {
      return this.$store.state.categories.disabled;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategoryName;
    },
    deleteCategoryId() {
      return this.$store.state.categories.deleteCategoryId;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    updateValue($event) {
      this.targetCategory = $event.target.value;
    },
    handleSubmit() {
      this.$store.dispatch('categories/postCategory', this.targetCategory)
        .then(() => {
          this.$store.dispatch('categories/getAllCategories');
          this.targetCategory = '';
        });
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    openModal(categoryId, categoryName) {
      this.$store.dispatch('categories/confirmDeleteCategory', {
        categoryId,
        categoryName,
      });
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory', this.deleteCategoryId)
        .then(() => {
          this.$store.dispatch('categories/getAllCategories');
          this.toggleModal();
        });
    },
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
