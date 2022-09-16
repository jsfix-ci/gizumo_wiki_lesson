<template>
  <div class="page-nation">
    <div v-if="currentPage > 3" class="page-nation__first">
      <app-button
        :disabled="1 === currentPage"
        @click="$emit('getPage', 1)"
      >
        1
      </app-button>
      <app-text
        class="page-nation__text"
      >
        ...
      </app-text>
    </div>
    <app-button
      v-for="(page, index) in pageNation"
      :key="index"
      class="page-nation__button"
      :disabled="page === currentPage"
      @click="$emit('getPage', page)"
    >
      {{ page }}
    </app-button>
    <div v-if="currentPage < lastPage - 2" class="page-nation__last">
      <app-text
        class="page-nation__text"
      >
        ...
      </app-text>
      <app-button
        class="page-nation__next"
        :disabled="lastPage === currentPage"
        @click="$emit('getPage', lastPage)"
      >
        {{ lastPage }}
      </app-button>
    </div>
  </div>
</template>

<script>
import { Button, Text } from '@Components/atoms';

export default {
  components: {
    appButton: Button,
    appText: Text,
  },
  props: {
    lastPage: {
      type: Number,
      default: null,
    },
    currentPage: {
      type: Number,
      default: null,
    },
    pageNation: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="postcss" scoped>
  .page-nation {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    &__first {
      display: flex;
    }
    &__button {
      margin-left: 20px;
    }
    &__text {
      margin-left: 20px;
    }
    &__last {
      display: flex;
    }
    &__next {
      margin-left: 20px;
    }
  }
</style>
