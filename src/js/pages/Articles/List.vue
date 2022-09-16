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
      :last-page="lastPage"
      :current-page="currentPage"
      :page-nation="pageNation"
      @getPage="getPage"
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
    lastPage() {
      return this.$store.state.articles.lastPage;
    },
    currentPage() {
      return this.$store.state.articles.currentPage;
    },
    pageNation() {
      const pageArray = [...Array(this.lastPage)].map((_, i) => i + 1);
      if (this.currentPage < 3) return pageArray.slice(0, 5);
      if (this.currentPage > this.lastPage - 2) {
        return pageArray.slice(this.lastPage - 5, this.lastPage);
      }
      return pageArray.slice(this.currentPage - 3, this.currentPage + 2);
    },
  },
  created() {
    this.fetchArticles(Number(this.$route.query.page) || 1);
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
        this.$store.dispatch('articles/getPageArticles');
      }
    },
    fetchArticles(pageNum) {
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
        this.$store.dispatch('articles/getPageArticles', pageNum);
      }
    },
    getPage(pageNum) {
      this.$router.push({
        path: '/articles',
        query: { page: pageNum },
      });
    },
  },
};
</script>
