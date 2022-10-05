<template>
  <div class="category">
    <app-category-post
      class="category_post"
      :category="targetCategory"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :access="access"
      :disabled="toggleLoading"
      @updateValue="updateValue"
      @handleSubmit="handleSubmit"
      @clearMessage="clearMessage"
    />
    <app-category-list
      :access="access"
      :theads="theads"
      :categories="categoryList"
      class="category_list"
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
    toggleLoading() {
      return this.$store.state.categories.disabled;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    updateValue($event) {
      console.log($event);
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
