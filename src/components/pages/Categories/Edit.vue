<template>
  <app-category-edit
    :category-id="categoryId"
    :category-name="categoryName"
    :loading="loading"
    :access="access"
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
  },
  methods: {
    editedName($event) {
      this.$store.dispatch('categories/editedName', $event.target.value);
    },
    updateCategory() {
      this.$store.dispatch('categories/updateCategory');
      console.log('adf');
    },
  },
};
</script>
