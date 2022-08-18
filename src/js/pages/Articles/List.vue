<template lang="html">
  <div class="articles">
    <app-article-list
      :title="title"
      :target-array="articlesList"
      :done-message="doneMessage"
      :access="access"
      :page-data="pageData"
      border-gray
      @openModal="openModal"
      @handleClick="handleClick"
      @pageLoading="pageLoading"
    />
  </div>
</template>

<script>
import { ArticleList } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleList: ArticleList,
  },
  mixins: [Mixins],
  // クエリーが切り替わったタイミングで実行
  beforeRouteUpdate(to, from, next) {
    this.fetchArticles(Number(to.query.page));
    next();
  },
  data() {
    return {
      title: 'すべて',
    };
  },
  computed: {
    articlesList() {
      return this.$store.state.articles.articleList;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    pageData() {
      return this.$store.state.articles.pageData;
    },
  },
  created() {
    this.fetchArticles(this.$route.query.page ? Number(this.$route.query.page) : 1);
  },
  methods: {
    // モーダル表示処理（引数には押した記事のIDが入る）
    openModal(articleId) {
      // 削除する予定の項目としてstateに保存する
      this.$store.dispatch('articles/confirmDeleteArticle', articleId);
      this.toggleModal();
    },
    // モーダル内の削除ボタン実行後の処理
    handleClick() {
      // 削除を行うactionsを呼ぶ
      this.$store.dispatch('articles/deleteArticle');
      this.toggleModal();
      // クエリーがついていいたら
      if (this.$route.query.category) {
        const { category } = this.$route.query;
        this.title = category;
        this.$store.dispatch('articles/filteredArticles', category)
          .then(() => {
            if (this.$store.state.articles.articleList.length === 0) {
              this.$router.push({ path: '/notfound' });
            }
          }).catch(() => {
            // console.log(err);
          });
      } else {
        this.$store.dispatch('articles/getAllArticles');
      }
    },
    // created後にデータを取得するための処理
    fetchArticles(id) {
      if (this.$route.query.category) {
        const { category } = this.$route.query;
        this.title = category;
        this.$store.dispatch('articles/filteredArticles', category)
          .then(() => {
            if (this.$store.state.articles.articleList.length === 0) {
              this.$router.push({ path: '/notfound' });
            }
          }).catch(() => {
            // console.log(err);
          });
      } else {
        this.$store.dispatch('articles/getAllArticles', id);
      }
    },

    pageLoading(id) {
      this.$router.push({
        path: '/articles',
        query: { page: id },
      });
    },
  },
};
</script>
