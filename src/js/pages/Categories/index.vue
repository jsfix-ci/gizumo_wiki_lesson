<template lang="html">
  <div class="category-wrapper">
    <app-category-post
      class="category-wrapper__post"
      :category="category"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :access="access"
      @updateValue="updateName"
      @clearMessage="clearMessage"
      @handleSubmit="handleSubmit"
    />
    <app-category-list
      class="category-wrapper__list"
      :theads="theads"
      :access="access"
      :categories="categoriesList"
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
      theads: ['カテゴリー名', '', '', ''],
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.categories.categoryList;
    },
    category() {
      return this.$store.state.categories.targetCategory.name;
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
    updateName($event) {
      this.$store.dispatch('categories/updateName', $event.target.value);
    },
    handleSubmit() {
      this.$store.dispatch('categories/postCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>

<style lang="postcss" scoped>
  .category-wrapper{
    display: flex;
    &__post {
      width: 30%;
      padding-right: 10px;
    }
    &__list {
      width: 70%;
      padding-left: 10px;
      border-left: 2px solid var(--separatorColor);
    }
  }
</style>
