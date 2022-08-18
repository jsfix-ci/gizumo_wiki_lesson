<template lang="html">
  <ul class="pageNation">
    <li
      v-for="page in leftPageButton"
      :key="page"
      class="pageNation_item"
    >
      <app-button
        :disabled="isCurrentPage(page)"
        @click="$emit('handle-page-button-click', page)"
      >
        {{ page }}
      </app-button>
    </li>
    <li
      v-show="firstDot"
      class="dot button"
    >
      …
    </li>
    <li
      v-for="page in centerPageButton"
      :key="page"
      class="pageNation_item"
    >
      <app-button
        :disabled="isCurrentPage(page)"
        @click="$emit('handle-page-button-click', page)"
      >
        {{ page }}
      </app-button>
    </li>
    <li
      v-show="lastDot"
      class="dot button"
    >
      …
    </li>
    <li
      v-for="page in rightPageButton"
      :key="page"
      class="pageNation_item"
    >
      <app-button
        :disabled="isCurrentPage(page)"
        @click="$emit('handle-page-button-click', page)"
      >
        {{ page }}
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
    pageData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      firstDot: false,
      lastDot: false,
      range: 5,
    };
  },
  computed: {
    // 最初の2つのボタンを作る処理
    leftPageButton() {
      return this.pageArray(1, 2);
    },
    // 真ん中のボタンを作る処理
    centerPageButton() {
      let first;
      let last;
      const { currentPage, lastPage } = this.pageData;
      if (currentPage <= this.range) {
        first = 3;
        last = this.range + 2;
      } else if (currentPage > lastPage - this.range) {
        first = lastPage - this.range - 1;
        last = lastPage - 2;
      } else {
        first = currentPage - 2;
        last = currentPage + 2;
      }
      return this.pageArray(first, last);
    },
    // 最後の2つのボタンを作る処理
    rightPageButton() {
      return this.pageArray(this.pageData.lastPage - 1, this.pageData.lastPage);
    },
    // 現在のページかどうか判定する処理
    isCurrentPage() {
      return page => this.pageData.currentPage === page;
    },
  },
  created() {
    if (this.pageData.currentPage <= this.range) {
      this.dotchenge(false, true);
    } else if (this.pageData.currentPage > this.pageData.lastPage - this.range) {
      this.dotchenge(true, false);
    } else {
      this.dotchenge(true, true);
    }
  },
  methods: {
    dotchenge(first, last) {
      this.firstDot = first;
      this.lastDot = last;
    },
    // ページ番号の配列を作る処理
    pageArray(from, to) {
      const pageNumber = [];
      for (let i = from; i <= to; i += 1) {
        pageNumber.push(i);
      }
      return pageNumber;
    },
  },
};
</script>

<style lang="postcss" scoped>
  .pageNation {
    text-align: center;
    margin-top: 50px;
    &_item {
      display: inline-block;
    }
    .dot {
      display: inline-block;
      padding: 8px 10px;
      font-size: 16px;
    }
    .button {
      margin-left: 10px;
    }
  }
</style>
