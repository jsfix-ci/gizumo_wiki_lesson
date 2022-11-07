<template>
  <div class="article_trashed">
    <app-article-trashed-head />
    <app-article-trashed-list
      :theads="theads"
      :trashed-list="trashedList"
    />
  </div>
</template>

<script>
import { ArticleTrashedHead, ArticleTrashedList } from '@Components/molecules';

export default {
  components: {
    appArticleTrashedHead: ArticleTrashedHead,
    appArticleTrashedList: ArticleTrashedList,
  },
  data() {
    return {
      theads: ['タイトル', '本文', '作成日'],
    };
  },
  computed: {
    trashedList() {
      return this.$store.state.articles.trashedList;
    },
  },
  created() {
    this.$store.dispatch('articles/getTrashedArticles');
  },
};
</script>
