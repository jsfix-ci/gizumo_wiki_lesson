<template lang="html">
  <div class="category">
    <article class="category__content">
      <app-category-post
        :access="access"
        @updateValue="updateValue"
      />
    </article>
    <app-category-list
      class="category__article"
      :access="access"
      :theads="theads"
      :categories="categoryList"
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
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
    updateValue(target) {
      this.$store.dispatch('categories/updateValue', target);
    },
  },
};
</script>

<style lang="postcss" scoped>
.category {
  display: flex;
  height: 100vh;

  &__content {
    width: 40%;
    border-right: 1px solid #333;
    padding-right: 20px;
    margin-right: 20px;
  }

  &__article {
    width: 60%;
  }
}
</style>
