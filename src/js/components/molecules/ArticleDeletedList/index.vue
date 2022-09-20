<template>
  <div class="deleted-list">
    <app-heading :level="1">削除済み記事一覧</app-heading>
    <app-router-link
      to="/articles"
      hover-opacity
      small
      white
      round
      bg-lightgreen
      class="deleted-list__back-link"
    >
      すべての記事一覧へ戻る
    </app-router-link>
  </div>
</template>

<script>
import { Heading, RouterLink } from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
  },
};
</script>

<style lang="postcss" scoped>
  .deleted-list__back-link {
    margin-top: 16px;
  }
</style>
