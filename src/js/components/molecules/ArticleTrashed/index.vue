<template lang="html">
  <div class="article-trashed">
    <app-heading>削除済み記事一覧</app-heading>
    <app-router-link
      to="/articles"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="article-trashed__create-link"
    >
      すべての記事一覧へ戻る
    </app-router-link>
    <app-list-item />
  </div>
</template>

<script>
import { Heading, RouterLink, ListItem } from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
    appListItem: ListItem,
  },
  props: {
    targetArray: {
      type: Array,
      default: () => [],
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="postcss" scoped>
  .article-trashed {
    &__create-link {
      margin-top: 15px;
    }
  }
</style>
