<template lang="html">
  <section class="category-post">
    <div class="category-post__child">
      <app-category-post
        :access="access"
        :error-message="errorMessage"
        :done-message="doneMessage"
        :disabled="false"
      />
    </div>
    <app-category-list
      class="category-list__child"
      :theads="theadName"
      :categories="categoriesList"
      :access="access"
    />
  </section>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

// @Components/moleculesはmolecules配下のindex.jsを指してる
// {}でインポートするのは名前付きインポートのため、
// v-bindは:~~~ = ""で~~~の部分が子コンポーネントに渡される
// categoriesListはcomputed内のcategoriesList

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  data() {
    return {
      disabled: '',
      doneMessage: '',
      access: {
        create: true,
        delete: true,
      },
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.categories.categoryList;
      // ここのcategoriesは_storeのindex.jsのモジュールで指定してる= category.js
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    theadName() {
      return this.$store.state.categories.theadName;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    // ('categoriesはcategories.jsのこと、getAllCategoriesはactionの中')
    // createdは非同期でDOMが生成されたあとに表示される
  },
};
</script>

<style lang="postcss" scoped>
.category-post {
  display: flex;
}
.category-post__child {
  width: 30%;
  border-right: solid 1px rgb(214, 212, 212);
  padding-right: 20px;
}
.category-list__child {
  width: 70%;
  padding-left: 20px;
}
</style>
