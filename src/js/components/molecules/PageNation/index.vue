<template lang="html">
  <ul class="page-wrapper">
    <li>
      <app-button
        class="page-item"
        :class="{'button--disabled' : 1 === currentPage}"
        @click="handlePageButtonClick(1)"
      >
        1
      </app-button>
    </li>
    <li>
      <div
        v-if="!(currentPage === 1)"
        class="page-item"
      >
        ・・・
      </div>
    </li>
    <li
      v-for="num in currentPages"
      :key="num"
      class="page-item"
    >
      <app-button
        :class="{'button--disabled' : num === currentPage}"
        @click="handlePageButtonClick(num)"
      >
        {{ num }}
      </app-button>
    </li>
    <li>
      <div
        v-if="!(currentPage === lastPage)"
        class="page-item"
      >
        ・・・
      </div>
    </li>
    <li>
      <app-button
        class="page-item"
        :class="{'button--disabled' : lastPage === currentPage}"
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
    showPages: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    currentPages: {
      type: Array,
      default: () => [],
    },
    lastPage: {
      type: Number,
      default: 0,
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
