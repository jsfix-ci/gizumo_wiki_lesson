<template>
  <app-category-edit
    :access="access"
    :disabled="disabled"
    :error-message="errorMessage"
    :done-message="doneMessage"
    @updateValue="updateValue"
  />
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  created() {
    this.$store.dispatch('categories/clearMessage');
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    disabled() {
      return this.$store.state.categories.isConnecting;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  methods: {
    updateValue($event) {
      this.$store.dispatch('categories/updateCategories', $event.target.value);
    },
  },
};
</script>
