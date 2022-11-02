<template lang="html">
  <ul class="pageNation__lists">
    <li class="pageNation__list">
      <app-button
        :disabled="currentPage === 1"
        @click="$emit('handlePageClick', 1)"
      >
        1
      </app-button>
    </li>
    <li v-if="currentPage > 3" class="dots pageNation__list">•••</li>
    <li v-for="array in pageNation" :key="array" class="pageNation__list">
      <app-button
        :disabled="currentPage === array"
        @click="$emit('handlePageClick', array)"
      >
        {{ array }}
      </app-button>
    </li>
    <li v-if="currentPage < totalPage - 2" class="dots pageNation__list">•••</li>
    <li class="pageNation__list">
      <app-button
        :disabled="currentPage === totalPage"
        @click="$emit('handlePageClick', totalPage)"
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
    articles: {
      type: Array,
      default() {
        return [];
      },
    },
    perPage: {
      type: Number,
      default: null,
    },
    pageId: {
      type: Number,
      default: null,
    },
    arrays: {
      type: Array,
      default() {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    currentPage: {
      type: Number,
      default: null,
    },
    totalPage: {
      type: Number,
      default: null,
    },
  },
  computed: {
    pageNation() {
      let start = null;
      let end = null;
      const range = 5;
      const newArray = [...Array(this.totalPage).keys()].map(e => e + 1);

      if (this.currentPage <= 3) {
        start = 1;
        end = start + 4;
      } else if (this.currentPage >= this.totalPage - 2) {
        start = this.totalPage - 5;
        end = this.totalPage - 1;
      } else {
        start = this.currentPage - Math.floor(range / 2) - 1;
        end = this.currentPage + Math.floor(range / 2);
      }
      const sliceArray = newArray.slice(start, end);
      return sliceArray;
    },
  },
};
</script>

<style lang="postcss" scoped>
.pageNation__lists {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.pageNation__list {
  margin-left: 20px;
}

.dots {
  font-size: 10px;
  letter-spacing: 3px;
  line-height: 37px;
  color: gray;
}
</style>
