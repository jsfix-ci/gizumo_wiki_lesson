<template>
  <div class="wrapper">
    <app-category-post
      class="category-post"
      :disabled="loading"
      :access="access"
      :category="category"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @update-value="updateValue"
      @clear-message="clearMessage"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      class="category-list"
      :categories="categoryList"
      :theads="theads"
      :access="access"
    />
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
    loading() {
      return this.$store.state.categories.loading;
    },
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
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch('categories/postCategory', {
        name: this.category,
      }).then(() => {
        this.category = '';
        this.$store.dispatch('categories/getAllCategories');
      });
    },
    updateValue($event) {
      this.category = $event.target.value;
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
}
.category-post {
  width: 30%;
}
.category-list {
  width: 70%;
  border-left: solid 1px $separator-color;
  padding-left: 20px;
  margin-left: 20px;
}
</style>
