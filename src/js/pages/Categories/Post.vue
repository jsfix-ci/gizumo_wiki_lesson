<template lang="html">
  <div>
    <p>access</p>
    <app-category-post 
      class="category-Post"
      :category="category"
    />
  </div>
</template>

<script>
import { CategoryPost } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
  },
  computed: {
    category() {
      return this.$store.state.category.category;
    }
  },
  created() {
    this.$store.dispatch('category/AllCategory');
  },

};