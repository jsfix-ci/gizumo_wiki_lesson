<template lang="html">
  <ul class="page-wrapper">
    <li>
      <app-button
        class="page-item"
        :disabled="1 === currentPage ? true : false"
        @click="handlePageButtonClick(1)"
      >
        1
      </app-button>
    </li>
    <li v-if="!(currentPage === 1)">
      <div
        class="page-item"
      >
        ・・・
      </div>
    </li>
    <li
      v-for="num in organizedPages"
      :key="num"
      class="page-item"
    >
      <app-button
        :disabled="num === currentPage ? true : false"
        @click="handlePageButtonClick(num)"
      >
        {{ num }}
      </app-button>
    </li>
    <li  v-if="!(currentPage === lastPage)">
      <div
        class="page-item"
      >
        ・・・
      </div>
    </li>
    <li>
      <app-button
        class="page-item"
        :disabled="lastPage === currentPage ? true : false"
        @click="handlePageButtonClick(lastPage)"
      >
        {{ lastPage }}
      </app-button>
    </li>
  </ul>
</template>
<script>
import { Button } from '@Components/atoms';

export default {
  components: {
    appButton: Button,
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Array,
      default: () => [],
    },
    lastPage: {
      type: Number,
      default: 0,
    },
  },
  computed: {
      totalPages() {
      const targetTotalPages = [...Array(this.lastPage).keys()].map(i => i + 1);
      return targetTotalPages;
    },
    organizedPages() {
      const pages = this.totalPages;
      const showPage = this.$store.state.articles.pages.currentPage;
      if (showPage <= 3) {
        const showPages = pages.slice(1, 6);
        return showPages;
      }
      const targetLastPage = this.$store.state.articles.pages.lastPage;
      if (
        targetLastPage - 2 <= showPage
      ) {
        const showPages = pages.slice(this.lastPage - 6, this.lastPage - 1);
        return showPages;
      }
      const showPages = pages.slice(showPage - 3, showPage + 2);
      return showPages;
    },
  },
  methods: {
    handlePageButtonClick(pageId) {
      if (pageId === this.currentPage) {
        return;
      }
      this.$emit('handle-page-button-click', pageId);
    },
  },
};
</script>
<style lang="postcss" scoped>
.page-wrapper {
  text-align: center;
  margin-top: 30px;
  li {
    margin-left: 15px;
    display: inline-block;
  }
}
</style>
