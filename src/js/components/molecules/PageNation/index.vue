<template lang="html">
  <ul class="pagenation">
    <li>
      <app-button
        @click="$emit('handlePageClick', 1)"
        :disabled="currentPage === 1"
      >
        1
      </app-button>
    </li>
    <li
      v-if="currentPage > 3"
      class="pagenation_dots pagenation_margin"
    >
      ...
    </li>
    <li
      v-for="item in totalPageArray"
      :key="item"
      class="pagenation_margin"
    >
      <app-button
        @click="$emit('handlePageClick', item)"
        :disabled="currentPage === item"
      >
        {{ item }}
      </app-button>
    </li>
    <li
      v-if="currentPage < totalPage - 2"
      class="pagenation_dots pagenation_margin"
    >
      ...
    </li>
    <li
      class="pagenation_margin"
    >
      <app-button
        @click="$emit('handlePageClick', totalPage)"
        :disabled="currentPage === totalPage"
      >
        {{ totalPage }}
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
    totalPage: {
      type: Number,
      default: null,
    },
    currentPage: {
      type: Number,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    totalPageArray() {
      const totalPageArray = [...Array(this.totalPage).keys()].map(e => e + 1);
      let start = null;
      let end = null;
      if (this.currentPage < 4) {
        start = 1;
        end = 5;
      } else if (this.currentPage > this.totalPage - 3) {
        start = this.totalPage - 5;
        end = this.totalPage - 1;
      } else {
        start = this.currentPage - 3;
        end = this.currentPage + 2;
      }
      return totalPageArray.slice(start, end);
    },
  },
};
</script>
<style lang='postcss' scoped>
  .pagenation {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    &_dots {
      padding: 8px 20px;
      display: inline-block;
      font-size: 16px;
      line-height: 1.4;
      color: gray;
    }
    &_margin {
      margin-left: 20px;
    }
  }
</style>
