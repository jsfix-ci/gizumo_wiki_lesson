<template lang="html">
  <div class="category">
    <article class="category__content">
      <app-category-post
        :access="access"
        :category="targetCategory"
        :done-message="doneMessage"
        :error-message="errorMessage"
        :disabled="disabled"
        @updateValue="updateValue"
        @handleSubmit="handleSubmit"
        @clearMessage="clearMessage"
      />
    </article>
    <app-category-list
      class="category__article"
      :access="access"
      :theads="theads"
      :delete-category-name="deleteCategoryName"
      :categories="categoryList"
      @handleClick="handleClick"
      @openModal="openModal"
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
    disabled() {
      return this.$store.state.categories.disabled;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategoryName;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    updateValue(current) {
      this.targetCategory = current.target.value;
    },
    handleSubmit() {
      if (this.disabled) return;
      this.$store.dispatch('categories/postCategory', this.targetCategory).then(() => {
        this.targetCategory = '';
        this.$store.dispatch('categories/getAllCategories');
      });
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    openModal(categoryId, categoryName) {
      this.$store.dispatch('categories/confirmTargetCategory',
        { categoryId, categoryName });
      this.toggleModal();
    },
    handleClick(categoryId) {
      if (!this.access.delete) return;
      this.$store.dispatch('categories/deleteCategory', categoryId).then(() => {
        this.toggleModal();
        this.$store.dispatch('categories/getAllCategories');
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.category {
  display: flex;
  height: 100vh;

  &__content {
    width: 40%;
    border-right: 1px solid #333;
    padding-right: 20px;
    margin-right: 20px;
  }

  &__article {
    width: 60%;
  }
}
</style>
