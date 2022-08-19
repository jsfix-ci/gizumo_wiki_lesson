<template lang="html">
  <app-category-edit
    :access="access"
    :category="categoryName"
    :done-message="doneMessage"
    :error-message="errorMessage"
    :disabled="loading"
    :editCategoryName="editCategoryName"
  />
</template>

<script>
import { CategoryEdit } from '@Components/molecules';


export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryName() {
      return this.$store.state.categories.targetCategory;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    editCategoryName() {
      return this.$store.state.categories.editCategoryName;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategory', id);
  },


};
</script>
