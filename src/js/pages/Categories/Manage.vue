<template>
  <div class="category">
    <app-category-post
      :access="access"
      @updateValue="updateValue"
      class="category_post"
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
  methods: {
    updateValue(target) {
      this.$store.dispatch('categories/updateValue', target);
    },
  }
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
