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
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    totalPageArray() {
      const totalPageArray = [...Array(this.totalPage).keys()].map(e => e + 1);
      if (this.currentPage < 4) {
        return totalPageArray.slice(1, 5);
      }
      if (this.currentPage > this.totalPage - 3) {
        return totalPageArray.slice(this.totalPage - 5, this.totalPage - 1);
      }
      return totalPageArray.slice(this.currentPage - 3, this.currentPage + 2);
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
