<template lang="html">
  <div class="category">
    <article class="category__content">
      <app-category-post
        :access="access"
        :category="targetCategory"
        :done-message="doneMessage"
        :error-message="errorMessage"
        @updateValue="updateValue"
        @handleSubmit="handleSubmit"
        @clearMessage="clearMessage"
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
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    updateValue(current) {
      this.targetCategory = current.target.value;
    },
    handleSubmit() {
      this.$store.dispatch('categories/postCategory', this.targetCategory).then(() => {
        this.targetCategory = '';
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
