<template>
  <div class="trashed-header">
    <app-heading :level="1">削除済み記事一覧</app-heading>
    <app-router-link
      to="/articles?page=1"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="trashed-header-link"
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

<style lang="scss" scoped>
.trashed {
  &-header {
    &-link {
      margin-top: 15px;
    }
  }
}
</style>
