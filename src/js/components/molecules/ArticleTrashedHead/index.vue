<template lang="html">
  <div class="trashed-head">
    <app-heading :level="1">削除済み記事一覧</app-heading>
    <app-router-link
      to="/articles"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="trashed-head__create-link"
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
.trashed-head {
  &__create-link {
    margin-top: 16px;
  }
}
</style>
