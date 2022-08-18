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
    <app-page-nation
      :current-pages="currentPages"
      :last-page="lastPage"
      :current-page="currentPage"
      @handle-page-button-click="fetchArticles"
    />
  </div>
</template>

<script>
import { ArticleList, PageNation } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleList: ArticleList,
    appPageNation: PageNation,
  },
  mixins: [Mixins],
  beforeRouteUpdate(to, from, next) {
    next();
  },
  data() {
    return {
      title: 'すべて',
      showPages: 2,
    };
  },
  computed: {
    currentPage() {
      return this.$store.state.articles.pages.currentPage;
    },
    currentPages() {
      const targetPage = this.$store.state.articles.pages.currentPage;
      if (targetPage === 1 || targetPage === 2 || targetPage === 3) {
        const targetPages = [2, 3, 4, 5, 6];
        return targetPages;
      }
      const targetLastPage = this.$store.state.articles.pages.lastPage;
      if (
        targetLastPage === targetPage
        || targetLastPage - 1 === targetPage
        || targetLastPage - 2 === targetPage
      ) {
        const targetPages = [
          targetLastPage - 5,
          targetLastPage - 4,
          targetLastPage - 3,
          targetLastPage - 2,
          targetLastPage - 1,
        ];
        return targetPages;
      }
      const targetPages = [
        targetPage - 2,
        targetPage - 1,
        targetPage,
        targetPage + 1,
        targetPage + 2,
      ];
      return targetPages;
    },
    lastPage() {
      return this.$store.state.articles.pages.lastPage;
    },
    articlesList() {
      return this.$store.state.articles.articleList;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    const pageId = this.$route.query.page;
    this.fetchArticles(pageId);
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
        this.$store.dispatch('articles/getArticles');
      }
    },
    fetchArticles(page) {
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
        this.$router.push({ query: { page } });
        const pageId= this.$route.query.page;
        this.$store.dispatch('articles/getArticles', pageId);
      }
    },
  },
};
</script>
