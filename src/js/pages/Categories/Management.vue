<template lang="html">
  <div class="category">
    <app-category-post
      class="category-post"
      :access="access"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="disabled"
      :category="targetCategory"
      @handleSubmit="handleSubmit"
      @updateValue="uptargetCategory"
      @clearMessage="clearMessage"
    />
    <app-category-list
      class="category-list"
      :categories="CategoriesList"
      :access="access"
      />
    </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  data() {
    return {
      targetCategory: '',
    };
  },
  computed: {
    CategoriesList() {
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
    category() {
      return this.$store.state.categories.targetCategory;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategories', this.targetCategory).then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    uptargetCategory(event) {
      this.targetCategory = event.target.value;
    },
  },
};
</script>

<style lang="postcss" scoped>
  .category {
    display: flex;
    height: 100%;
    &-post {
      padding-right: 2%;
      width: 50%;
      border-right: 1px solid #ccc;
    }
    &-list {
      margin-left: 2%;
      width: 48%;
      overflow-y: scroll;
      background-color: #fff;
    }
  }
</style>
