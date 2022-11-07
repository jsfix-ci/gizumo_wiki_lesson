<template lang="html">
  <section>
    <app-article-trashed
      :theads="theads"
      :trashed-articles="trashedArticles"
    />
  </section>
</template>

<script>
import { ArticleTrashed } from '@Components/molecules';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
  },
  data() {
    return {
      theads: ['タイトル', '本文', '作成日'],
    };
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
