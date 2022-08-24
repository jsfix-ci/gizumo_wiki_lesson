<template lang="html">
  <div>
    <app-article-trashed
      :theads="this.$options.constants.theads"
      :title="this.$options.constants.title"
      :target-array="targetArray"
    />
  </div>
</template>
<script>
import {
  ArticleTrashed,
} from '@Components/molecules';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
  },
  constants: {
    title: '削除済み記事一覧',
    theads: [
      'タイトル',
      '本文',
      '作成日',
    ],
  },
  computed: {
    targetArray() {
      return this.$store.state.articles.trashedArray;
    },
  },
  created() {
    this.setTrashedArticles();
  },
  methods: {
    setTrashedArticles() {
      this.$store.dispatch('articles/getTrashedArticles');
    },
  },
};
</script>
