<template>
  <ul class="page-nation">
    <li
      v-if="isShowFirstPageNation"
      class="page-nation-button"
    >
      <app-button
        hover-opacity
        @click="$emit('handle-page-button-click', 1)"
      >
        1
      </app-button>
    </li>
    <li
      v-if="isShowFirstPageNation"
      class="page-nation-dots"
    >
      …
    </li>
    <li
      v-for="page in pageRange"
      :key="page"
      class="page-nation-button"
    >
      <app-button
        hover-opacity
        :disabled="currentPage === page"
        @click="$emit('handle-page-button-click', page)"
      >
        {{ page }}
      </app-button>
    </li>
    <li
      v-if="isShowLastPageNation"
      class="page-nation-dots"
    >
      …
    </li>
    <li
      v-if="isShowLastPageNation"
      class="page-nation-button"
    >
      <app-button
        class="page-nation-button"
        hover-opacity
        @click="$emit('handle-page-button-click', lastPage)"
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
  computed: {
    currentPage() {
      return this.$store.state.articles.pageData.currentPage;
    },
    lastPage() {
      return this.$store.state.articles.pageData.lastPage;
    },
    pageRange() {
      const pageRange = [...Array(this.lastPage).keys()].map(i => i + 1);
      if (this.currentPage <= 3) {
        const slicedPageRange = pageRange.slice(0, 5);
        return slicedPageRange;
      } if (this.currentPage >= this.lastPage - 2) {
        const slicedPageRange = pageRange.slice(this.lastPage - 5, this.lastPage + 1);
        return slicedPageRange;
      }
      const slicedPageRange = pageRange.slice(
        this.currentPage - 3, this.currentPage + 2,
      );
      return slicedPageRange;
    },
    isShowFirstPageNation() {
      let firstPageNation;
      if (this.currentPage <= 3) {
        firstPageNation = false;
      } else {
        firstPageNation = true;
      }
      return firstPageNation;
    },
    isShowLastPageNation() {
      let lastPageNation;
      if (this.currentPage >= this.lastPage - 2) {
        lastPageNation = false;
      } else {
        lastPageNation = true;
      }
      return lastPageNation;
    },
  },
};

</script>

<style lang="postcss" scoped>
  .page-nation {
    text-align: center;
    margin-top: 50px;
    &-dots {
      padding: 8px 18px;
      display: inline-block;
      font-size: 16px;
    }
    &-button {
      display: inline-block;
    }
    &-button + &-button {
      margin-left: 15px;
    }
  }
  </style>
