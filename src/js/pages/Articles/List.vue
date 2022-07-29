<template lang="html">
  <div class="articles">
    <app-article-list
      :title="title"
      :target-array="articlesList"
      :done-message="doneMessage"
      :access="access"
      :is-prev-disabled="isPrevDisabled"
      :is-next-disabled="isNextDisabled"
      border-gray
      @openModal="openModal"
      @handleClick="handleClick"
      @prevPage="prevPage"
      @nextPage="nextPage"
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
  beforeRouteUpdate(to, from, next) {
    this.fetchArticles();
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
    isPrevDisabled() {
      return this.$store.state.articles.isPrevDisabled;
    },
    isNextDisabled() {
      return this.$store.state.articles.isNextDisabled;
    },
  },
  created() {
    this.fetchArticles();
  },
  methods: {
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
      } else {
        this.$store.dispatch('articles/getAllArticles');
      }
    },
    fetchArticles() {
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
    prevPage() {
      if (this.$store.state.articles.isPrevDisabled) return;
      const currentPage = this.$store.state.articles.current_page;
      const { lastPage } = this.$store.state.articles.lastPage;
      if (currentPage === lastPage) {
        this.$store.dispatch('articles/toggleNextDisabled');
      }
      this.$store.dispatch('articles/prevPageCount');
      this.$store.dispatch('articles/getAllArticles');
    },
    nextPage() {
      if (this.$store.state.articles.isNextDisabled) return;
      if (this.$store.state.articles.current_page === 1) {
        this.$store.dispatch('articles/togglePrevDisabled');
      }
      this.$store.dispatch('articles/nextPageCount');
      this.$store.dispatch('articles/getAllArticles');
    },
  },
};
</script>
