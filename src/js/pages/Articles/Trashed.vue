<template lang="html">
  <div>
    <app-article-trashed
      :error-message="errorMessage"
    />
    <app-article-table
      v-if="articleList"
      :target-array="articleList"
    />
  </div>
</template>

<script>
import { ArticleTrashed, ArticleTable } from '@Components/molecules';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
    appArticleTable: ArticleTable,
  },
  computed: {
    articleList() {
      return this.$store.state.articles.articleList;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('articles/getTrashedArticles');
  },
};
</script>
