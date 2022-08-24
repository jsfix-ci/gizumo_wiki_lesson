<template lang="html">
  <app-category-edit
    :access="access"
    :done-message="doneMessage"
    :error-message="errorMessage"
    :disabled="loading"
    :edit-category-name="editCategoryName"
    @clearMessage="clearMessage"
    @updateValue="updateValue"
    @handleSubmit="handleSubmit"
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
      return this.$store.state.categories.editCategory.name;
    },
  },
  created() {
    this.clearMessage();
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategoryDetail', id);
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue(inputEvent) {
      this.$store.dispatch('categories/updateEditValue', inputEvent.target.value);
    },
    handleSubmit() {
      if (this.loading) {
        return;
      }
      this.$store.dispatch('categories/updateCategoryName');
    },
  },


};
</script>
