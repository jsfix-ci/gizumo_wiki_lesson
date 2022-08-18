<template lang="html">
  <div class="page-wrapper">
    <app-button
      class="page-item"
      :class="{'button--disabled' : 1 === currentPage}"
      @click="setPage(1)"
    >
      1
    </app-button>
    <div class="page-item">
      ・・・
    </div>
    <div
      v-for="num in currentPages"
      :key="num"
      class="page-item"
    >
      <app-button
        :class="{'button--disabled' : num === currentPage}"
        @click="setPage(num)"
      >
        {{ num }}
      </app-button>
    </div>
    <div class="page-item">
      ・・・
    </div>
    <app-button
      class="page-item"
      :class="{'button--disabled' : lastPage === currentPage}"
      @click="setPage(lastPage)"
    >
      {{ lastPage }}
    </app-button>
  </div>
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
    setPage(page) {
      this.$emit('nextPage', page);
    },
  },
};
</script>
<style lang="postcss" scoped>
.page-wrapper {
  text-align: center;
  margin-top: 30px;
  .page-item {
    margin-left: 15px;
    display: inline-block;
  }
}
</style>
