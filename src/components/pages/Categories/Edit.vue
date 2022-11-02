<template>
  <app-category-edit
    :category-id="categoryId"
    :category-name="categoryName"
    :loading="loading"
    :access="access"
    :error-message="errorMessage"
    :done-message="doneMessage"
    @edited-name="editedName"
    @update-category="updateCategory"
  />
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  data() {
    return {
      id: '',
      name: '',
    };
  },
  computed: {
    categoryId() {
      const { id } = this.$route.params;
      return id;
    },
    categoryName() {
      const { name } = this.$store.state.categories.category;
      return name;
    },
    loading() {
      return this.$store.state.categories.loading;
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
  },
  created() {
    this.$store.dispatch('categories/getCategory', this.$route.params.id);
  },
  methods: {
    editedName($event) {
      this.$store.dispatch('categories/editedName', $event.target.value);
    },
    updateCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
