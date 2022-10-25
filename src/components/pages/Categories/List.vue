<template>
  <div class="categories">
    <app-category-post
      class="category-post"
      :category="targetName"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :access="access"
      :disabled="disabled"
      @clear-message="clearMessage"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      class="category-list"
      :theads="theads"
      :categories="categories"
      :access="access"
      @open-modal="openModal"
      @handle-click="handleClick"
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
      targetName: '',
    };
  },
  computed: {
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    categories() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    disabled() {
      return this.$store.state.categories.loading;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    openModal(categoryId) {
      this.$store.dispatch('categories/confirmDeleteCategory', categoryId);
      this.toggleModal();
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue(event) {
      this.targetName = event.target.value;
    },
    handleSubmit() {
      this.$store.dispatch('categories/createCategory', this.targetName).then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory');
      this.toggleModal();
    },
  },
};
</script>
<style lang="scss" scoped>
  .categories {
    display: flex;
  }
  .category-post {
    width: 40%;
    padding-right: 30px;
  }
  .category-list {
    width: 100%;
    border-left: 5px solid $separator-color;
  }
</style>
