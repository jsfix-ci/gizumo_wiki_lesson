<template>
  <div class="wrapper">
    <app-category-post
      class="category-post"
      :access="access"
      :category="category"
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
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    category() {
      return this.$store.state.categories.category;
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
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event.target.value);
    },
    clearMessage() {
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
