<template>
  <div class="category">
    <app-category-post
      class="category-post"
      :category="targetCategory"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="disabled"
      :access="access"
      @handle-submit="handleSubmit"
      @update-value="uptargetCategory"
      @clear-message="clearMessage"
    />
    <app-category-list
      class="category-list"
      :categories="categoriesList"
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
    categoriesList() {
      return this.$store.state.categories.categoryList;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
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
    uptargetCategory(event) {
      this.targetCategory = event.target.value;
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  height: 100%;
  &-post {
    padding-right: 2%;
    width: 40%;
    border-right: 1px solid #ccc;
  }
  &-list {
    margin-left: 2%;
    width: 60%;
    overflow-y: scroll;
    background-color: #fff;
  }
}
</style>
