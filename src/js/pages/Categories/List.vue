<template lang="html">
  <div class="category">
    <app-category-post
      class="category-post"
      :access="access"
      :error-message="errorMessage"
      :done-message="doneMessage"
    />
    <app-category-list
      class="category-list"
      :categories="categories"
      :theads="theads"
      :delete-category-name="deleteCategoryName"
      :access="access"
      @openModal="openModal"
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
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    // 全カテゴリーの取得
    categories() {
      return this.$store.state.categories.categories;
    },
    // 削除するカテゴリーの名前
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategory.name;
    },
    // 権限の取得
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  // カテゴリーの取得
  created() {
    this.$store.dispatch('categories/AllCategories');
  },
  methods: {
    // モーダルウィンドウ
    modal() {
      this.$root.$emit('toggleModal');
    },
    // 削除ボタンのクリックイベント
    openModal(categoryId, categoryName) {
      this.modal();
      this.$store.dispatch('categories/AddDeleteCategory', { categoryId, categoryName });
    },
  },
};
</script>

<style lang="postcss" scoped>
.category {
  display: flex;
}

.category-post {
  width: 30%;
  padding-right: 20px;
  margin-right: 20px;
  border-right: solid 2px #c0c0c0;
}

.category-list {
  width: 70%;
}
</style>
