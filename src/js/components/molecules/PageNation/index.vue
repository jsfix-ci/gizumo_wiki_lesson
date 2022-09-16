<template>
  <ul class="page-nation">
    <li
      v-if="first"
      class="page-nation-button"
    >
      <app-button
        hover-opacity
        @click="$emit('movePage', 1)"
      >
        {{ 1 }}
      </app-button>
    </li>
    <li
      v-if="first"
      class="page-nation-dots"
    >
      …
    </li>
    <li
      v-for="page in range"
      :key="page"
      class="page-nation-button"
    >
      <app-button
        hover-opacity
        :disabled="isCurrentPage(page)"
        @click="$emit('movePage', page)"
      >
        {{ page }}
      </app-button>
    </li>
    <li
      v-if="last"
      class="page-nation-dots"
    >
      …
    </li>
    <li
      v-if="last"
      class="page-nation-button"
    >
      <app-button
        class="page-nation-button"
        hover-opacity
        @click="$emit('movePage', lastPage)"
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
    range() {
      const range = [...Array(this.lastPage).keys()].map(i => i += 1);
      if (this.currentPage <= 3) {
        const animals = range.slice(0, 5);
        return animals;
      } else if (this.currentPage >= this.lastPage - 2) {
        const animals = range.slice(this.lastPage - 5, this.lastPage + 1);
        return animals;
      } else {
        const animals = range.slice(this.currentPage - 3, this.currentPage + 2);
        return animals;
      }
    },
    first() {
      let first;
      if (this.currentPage <= 3) {
        first = false;
      } else {
        first = true;
      }
      return first;
    },
    last() {
      let last;
      if (this.currentPage >= this.lastPage - 2) {
        last = false;
      } else {
        last = true;
      }
      return last;
    },
     isCurrentPage() {
      return page => this.currentPage === page;
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
