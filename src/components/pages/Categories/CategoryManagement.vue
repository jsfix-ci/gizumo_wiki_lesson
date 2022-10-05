<template>
  <div class="category">
    <article class="category__content">
      <app-category-post
        :access="access"
        :category="category"
        :error-message="errorMessage"
        :done-message="doneMessage"
        :disabled="isLoading"
        @update-value="updateValue"
        @clear-message="clearMessage"
        @handle-submit="handleSubmit"
      />
    </article>
    <div class="category__article">
      <app-category-list
        class="vertical-line"
        :access="access"
        :theads="theads"
        :categories="categoryList"
      />
    </div>
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  data() {
    return {
      theads: ['カテゴリー名'],
      category: '',
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    isLoading() {
      return this.$store.state.categories.loading;
    },
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
    updateValue($event) {
      this.category = $event.target.value;
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    handleSubmit() {
      if (this.disabled) {
        return;
      }
      this.$store.dispatch('categories/postCategory', this.category)
        .then(() => {
          this.fetchCategories();
          this.category = '';
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  .category {
    display: flex;
  }

  .category__content {
    width: 40%;
  }

  .category__article {
    width:60%;
  }

  .vertical-line {
    border-left: 1px solid rgb(220,220,220);
    padding-left: 20px;
    margin-left: 20px;
  }
</style>
