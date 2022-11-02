<template>
  <ul class="page-nation-lists">
    <template v-if="4 <= currentPage">
      <li class="page-nation-list">
        <app-button @click="$emit('handle-page-button-click', 1)">
          1
        </app-button>
      </li>
      <li class="page-nation-list page-nation-list-dots">…</li>
    </template>
    <li
      v-for="page in pageRange"
      :key="page"
      class="page-nation-list"
    >
      <app-button
        :disabled="currentPage === page"
        @click="$emit('handle-page-button-click', page)"
      >
        {{ page }}
      </app-button>
    </li>
    <template v-if="currentPage <= totalPages - 3">
      <li class="page-nation-list page-nation-list-dots">…</li>
      <li class="page-nation-list">
        <app-button @click="$emit('handle-page-button-click', totalPages)">
          {{ totalPages }}
        </app-button>
      </li>
    </template>
  </ul>
</template>

<script>
import { Button } from '@Components/atoms';

export default {
  components: {
    appButton: Button,
  },
  computed: {
    currentPage() {
      return this.$store.state.articles.pageData.currentPage;
    },
    totalPages() {
      return this.$store.state.articles.pageData.totalPages;
    },
    pageRange() {
      if (this.totalPages === null) {
        return false;
      }
      const range = [...Array(this.totalPages).keys()].map(i => i + 1);
      if (this.currentPage <= 3) {
        return range.slice(0, 5);
      }
      if (this.totalPages - 2 <= this.currentPage) {
        return range.slice(-5);
      }
      return range.slice(this.currentPage - 3, this.currentPage + 2);
    },
  },
};
</script>

<style lang="scss" scoped>
.page-nation {
  &-lists {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 32px;
  }
  &-list {
    margin-left: 16px;
    &:first-child {
      margin-left: 0;
    }
    &-dots{
      font-size: 20px;
      color: #c0c6c9;
    }
  }
}
</style>
