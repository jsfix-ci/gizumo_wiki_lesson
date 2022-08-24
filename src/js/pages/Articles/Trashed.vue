<template lang="html">
  <div>
    <app-article-trashed
      v-if="targetArray"
      :theads="this.$options.constants.theads"
      :title="this.$options.constants.title"
      :target-array="targetArray"
    />
    <app-notice
      v-if="!targetArray"
      notice-text="削除された記事はありません。"
      link-path="/articles"
      link-text="記事一覧に戻る"
    />
  </div>
</template>
<script>
import {
  ArticleTrashed,
  Notice,
} from '@Components/molecules';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
    appNotice: Notice,
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
