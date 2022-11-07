<template lang="html">
  <div>
    <section class="article-trashed">
      <app-heading :level="1">削除済記事一覧</app-heading>
    </section>
    <app-router-link
      to="/articles?page=1"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="article-lists"
    >
      全ての記事一覧へ戻る
    </app-router-link>
    <table class="trashed-table">
      <thead class="trashed-table__head">
        <tr>
          <th v-for="(thead, index) in theads" :key="index">
            <app-text tag="span" theme-color bold>
              {{ thead }}
            </app-text>
          </th>
        </tr>
      </thead>
      <tbody class="trashed-table__body">
        <tr v-for="article in trashedArticles" :key="article.id">
          <td class="trashed-table__title">
            <app-text tag="span" small>{{ formatText(article.title) }}</app-text>
          </td>
          <td class="trashed-table__content">
            <app-text tag="span" small>{{ formatText(article.content) }}</app-text>
          </td>
          <td class="trashed-table__create">
            <app-text tag="span" small>{{ formatDate(article.created_at) }}</app-text>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  Heading,
  RouterLink,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
    appText: Text,
  },
  props: {
    theads: {
      type: Array,
      default: () => [],
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    trashedArticles: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    formatText() {
      return text => (text.length >= 30 ? `${text.substring(0, 30)}...` : text);
    },
    formatDate() {
      return date => date.substring(0, 10);
    },
  },
};
</script>
<style lang="postcss" scoped>
.article-lists {
  margin-top: 10px;
}
.trashed-table {
  width: 100%;
  margin-top: 40px;
  text-align: left;
  background-color: #fff;
  tr {
    border-bottom: 1px solid var(--separatorColor);
  }
  &__head {
    th {
      padding: 5px 10px;
      vertical-align: middle;
    }
  }
  &__body {
    td {
      padding: 10px;
      vertical-align: middle;
      &.is-disabled {
        color: var(--disabledColor);
        font-size: 12px;
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
  &__title {
    width: 40%;
  }
  &__content {
    width: 50%;
  }
  &__create {
    width: 8%;
  }
}
</style>
