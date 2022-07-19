<template>
  <div class="categories">
    <div class="categories-post">
      <app-category-post
        :access="access"
        :disabled="disabled"
        :category="category"
        :error-message="errorMessage"
        :done-message="doneMessage"
        @updateValue="inputValue"
        @handleSubmit="handleSubmit"
        @clearMessage="clearMessage"
      />
    </div>
    <div class="categories-border" />
    <div class="categories-list">
      <app-category-list
        :categories="categoryList"
        :access="access"
        :theads="thead"
      />
    </div>
  </div>
</template>


<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  data() {
    return {
      thead: ['カテゴリー名'],
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    disabled() {
      return this.$store.state.categories.isConnecting;
    },
    category() {
      return this.$store.state.categories.category.name;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    inputValue($event) {
      this.$store.dispatch('categories/getInputCategories', $event.target.value);
    },
    handleSubmit() {
      if (this.disabled) return;
      this.$store.dispatch('categories/postCategory');
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
    &-post {
      width: 29%;
      margin-right: 1%;
    }
    &-border {
      width: 0%;
      border-left: 1px solid #ccc;
    }
    &-list {
      width: 69%;
      margin-left: 1%;
    }
  }
</style>
