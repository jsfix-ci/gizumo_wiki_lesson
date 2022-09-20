<template>
  <ul class="page-nation">
    <template v-if="currentPage > 3">
      <li
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
        class="page-nation-dots"
      >
        …
      </li>
    </template>
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
    <template v-if="currentPage < lastPage - 2">
      <li
        class="page-nation-dots"
      >
        …
      </li>
      <li
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
