<template>
  <div class="category">
    <article class="category__content">
      <app-category-post
        :access="access"
      />
    </article>
    <div class="vertical-line" />
    <div class="category__article">
      <app-category-list
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
  },
};
</script>

<style scoped>
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
    margin: 0 2rem;
    width: 2px;
    background-color: rgb(220, 220, 220);
  }
</style>
