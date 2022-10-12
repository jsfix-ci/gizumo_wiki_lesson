<template lang="html">
  <app-category-edit
    :disabled="toggleDisabled"
    :access="access"
    :done-message="doneMessage"
    :error-message="errorMessage"
    :category="editCategoryName"
    @updateValue="updateValue"
    @editCategory="editCategory"
  />
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    toggleDisabled() {
      return this.$store.state.categories.disabled;
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
    editCategoryName() {
      return this.$store.state.categories.editCategoryName;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/setEditCategoryName', id);
  },
  methods: {
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event);
    },
    editCategory(categoryId) {
      this.$store.dispatch('categories/editCategory', categoryId)
        .then(() => {
          this.$store.dispatch('categories/getAllCategories');
        });
    },
  },
};
</script>

<style>
</style>
