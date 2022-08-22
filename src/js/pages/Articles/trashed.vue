<template lang="html">
  <div class="article_trashed">
    <app-article-trashed-head />
    <app-article-trashed-table
      :theads="theads"
      :trashe-list="trashedList"
    />
  </div>
</template>

<script>
import { ArticleTrashedTable, ArticleTrashedHead } from '@Components/molecules';

export default {
  components: {
    appArticleTrashedHead: ArticleTrashedHead,
    appArticleTrashedTable: ArticleTrashedTable,
  },
  data() {
    return {
      theads: ['タイトル', '本文', '作成日'],
    };
  },
  computed: {
    trashedList() {
      return this.$store.state.articles.articleTrashedList;
    },
  },
  created() {
    this.$store.dispatch('articles/getArticleTrashed');
  },
};
</script>
