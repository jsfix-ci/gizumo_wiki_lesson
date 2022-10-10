<template lang="html">
  <article class="category__content">
    <app-category-edit
      :disabled="disabled"
      :access="access"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :category="targetCategory"
      @updateValue="updateValue"
      @handleSubmit="handleSubmit"
    />
  </article>
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  data() {
    return {
    };
  },
  computed: {
    disabled() {
      return this.$store.state.categories.disabled;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    targetCategory() {
      return this.$store.state.categories.editCategoryName;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategoryDetail', id);
  },
  methods: {
    updateValue(current) {
      this.$store.dispatch('categories/updateValue', current.target.value);
    },
    handleSubmit() {
      if (this.disabled) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
