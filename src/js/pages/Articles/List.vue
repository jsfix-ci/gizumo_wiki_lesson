<template lang="html">
  <div class="articles">
    <app-article-list
      :title="title"
      :target-array="articlesList"
      :done-message="doneMessage"
      :access="access"
      border-gray
      @openModal="openModal"
      @handleClick="handleClick"
    />
    <app-article-pager
      :articles="articlesList"
      :disabled="disabled"
      @handlePageClick="handlePageClick"
    />
  </div>
</template>

<script>
import { ArticleList, ArticlePager } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleList: ArticleList,
    appArticlePager: ArticlePager,
  },
  mixins: [Mixins],
  beforeRouteUpdate(to, from, next) {
    this.fetchArticles(to.query.page);
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
    perPage() {
      return this.$store.state.articles.perPage;
    },
    totalPage() {
      return this.$store.state.articles.totalPage;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    currentPage() {
      return this.$store.state.categories.currentPage;
    },
  },
  created() {
    this.fetchArticles(this.$route.query.page);
  },
  methods: {
    handlePageClick(pageId) {
      this.$router.push({
        path: '/articles',
        query: { page: pageId },
      });
    },
    openModal(articleId) {
      this.$store.dispatch('articles/confirmDeleteArticle', articleId);
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('articles/deleteArticle');
      this.toggleModal();
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
      }
    },
    fetchArticles(pageId) {
      this.$store.dispatch('articles/pageMove', pageId);
    },
  },
};
</script>
