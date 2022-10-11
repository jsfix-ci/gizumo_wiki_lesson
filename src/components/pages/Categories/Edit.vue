<template>
  <app-category-edit
    :access="access"
    :disabled="isLoading"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :edit-category-name="editCategoryName"
    @update-value="updateValue"
    @clear-message="clearMessage"
    @handle-submit="updateCategory"
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
    isLoading() {
      return this.$store.state.categories.loading;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    editCategoryName() {
      return this.$store.state.categories.editCategory.name;
    },
  },
  created() {
    this.clearMessage();
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategoryDetail', id);
  },
  methods: {
    updateValue($event) {
      this.$store.dispatch('categories/updateEditValue', $event.target.value);
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateCategory() {
      if (this.isLoading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
