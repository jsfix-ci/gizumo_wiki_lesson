<template lang="html">
  <app-category-edit
    :category="category"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :disabled="isLoading"
    :access="access"
    @updateValue="updateName"
    @clearMessage="clearMessage"
    @handleSubmit="handleSubmit"
  />
</template>

<script>
import {
  CategoryEdit,
} from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    category() {
      return this.$store.state.categories.targetCategory.name;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    isLoading() {
      return this.$store.state.categories.isLoading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategoryDetail', id);
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    updateName($event) {
      this.$store.dispatch('categories/updateName', $event.target.value);
    },
    handleSubmit() {
      this.$store.dispatch('categories/editCategory');
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>
