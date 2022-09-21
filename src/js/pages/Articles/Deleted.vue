<template>
  <div>
    <app-article-deleted-list />
    <app-article-deleted-table
      :deleted-list="deletedList"
    />
  </div>
</template>

<script>
import { ArticleDeletedList, ArticleDeletedTable } from '@Components/molecules';

export default {
  components: {
    appArticleDeletedList: ArticleDeletedList,
    appArticleDeletedTable: ArticleDeletedTable,
  },
  computed: {
    deletedList() {
      return this.$store.state.articles.deletedList;
    },
  },
  created() {
    this.$store.dispatch('articles/getDeletedArticles');
  },
};
</script>
