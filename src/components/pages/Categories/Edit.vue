<template>
  <div>
    <app-category-edit
      :category-name="categoryName"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="disabled"
      :access="access"
      @edited-name="editedName"
      @update-categories="updateCategories"
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
    categoryName() {
      const { name } = this.$store.state.categories.targetCategory;
      return name;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getCategories', this.$route.params.id);
  },
  methods: {
    editedName($event) {
      this.$store.dispatch('categories/editedName', $event.target.value);
    },
    updateCategories() {
      if (this.disabled) return;
      this.$store.dispatch('categories/updateCategories');
    },
  },
};
</script>
