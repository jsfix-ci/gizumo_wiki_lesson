<template>
  <div>
    <app-category-edit
      :access="access"
      :error-message="errorMessage"
      :edit-category="editCategory"
      :done-message="doneMessage"
      :disabled="loading"
      @updateValue="updateValue"
      @handleSubmit="handleSubmit"
      @clearMessage="clearMessage"
    />
  </div>
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
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    editCategory() {
      return this.$store.state.categories.editCategory.name;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategoryDetail', id);
  },
  methods: {
    updateValue(inputEvent) {
      this.$store.dispatch('categories/updateEditValue', inputEvent.target.value);
    },
    handleSubmit() {
      if (this.loading) {
        return;
      }
      this.$store.dispatch('categories/editCategoryName');
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>
