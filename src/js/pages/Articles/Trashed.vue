<template lang="html">
  <app-article-trashed
    :trashed-articles="trashedArticles"
  />
</template>

<script>
import { ArticleTrashed } from '@Components/molecules';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
  },
  computed: {
    trashedArticles() {
      return this.$store.state.articles.trashedArticles;
    },
  },
  created() {
    this.getTrashedArticles();
  },
  methods: {
    getTrashedArticles() {
      this.$store.dispatch('articles/getTrashedArticles');
    },
  },
};
</script>
