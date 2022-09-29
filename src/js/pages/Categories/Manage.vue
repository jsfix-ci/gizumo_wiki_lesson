<!-- eslint-disable linebreak-style -->
<template>
  <div class="category">
    <div class="category_post">
      <app-category-post
        :access="access"
      />
    </div>
    <div class="category_list">
      <app-category-list
        :access="access"
        :theads="theads"
        :categories="categoryList"
      />
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->
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
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },

  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>
<style lang='postcss' scoped>
  .category {
    display: flex;
    &_post {
      width: 40%;
    }
    &_list {
      width: 60%;
    }
  }
</style>
