<template lang="html">
  <div class="trashed-list">
    <app-heading :level="1">{{ title }}</app-heading>
    <app-router-link
      to="/articles"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="trashed-list__create-link"
    >
      すべての記事一覧へ戻る
    </app-router-link>
    <table class="trashed-list__table">
      <thead class="trashed-list__thead">
        <tr>
          <th
            v-for="(thead, index) in theads"
            :key="index"
          >
            <app-text
              tag="span"
              theme-color
              bold
            >
              {{ thead }}
            </app-text>
          </th>
        </tr>
      </thead>
      <tbody class="trashed-list__tbody">
        <tr v-for="article in filteredArticles" :key="article.id">
          <td class="trashed-list__title">
            <app-text
              tag="span"
              small
            >
              {{ article.title }}
            </app-text>
          </td>
          <td class="trashed-list__content">
            <app-text tag="span" small>{{ article.content }}</app-text>
          </td>
          <td class="trashed-list__time">
            <app-text tag="span" small>{{ article.created_at }}</app-text>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import {
  Heading,
  Text,
  RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appText: Text,
    appRouterLink: RouterLink,
  },
  props: {
    title: {
      type: String,
      default: 'すべて',
    },
    targetArray: {
      type: Array,
      required: true,
    },
    theads: {
      type: Array,
      required: true,
    },
  },
  computed: {
    filteredArticles() {
      const filteredTitle = (this.targetArray).map(
        (article) => {
          const titleLength = article.title.length;
          const contentLength = article.content.length;
          const articleTitle = titleLength >= 30 ? `${article.title.slice(0, 30)}…` : article.title;
          const articleContent = contentLength >= 30 ? `${article.content.slice(0, 30)}…` : article.content;
          const articleTime = article.created_at.slice(0, 10);
          return {
            ...article,
            title: articleTitle,
            content: articleContent,
            created_at: articleTime,
          };
        },
      );
      return filteredTitle;
    },
  },
};
</script>
<style lang="postcss" scoped>

  .trashed-list {
    &__create-link {
      margin-top: 10px;
    }
    &__table {
      margin-top: 10px;
      width: 100%;
    }
    tr {
    border-bottom: 1px solid var(--separatorColor);
    }
    &__articles {
      margin-top: 16px;
    }
    &__thead {
      text-align: left;
      th {
        padding: 5px 10px;
        vertical-align: middle;
      }
    }
    &__tbody {
      td {
        padding: 10px;
        vertical-align: middle;
      }
    }
    &__title {
      width: 35%;
    }
    &__content {
      width: 55%;
    }
    &__time {
      width: 10%;
    }
  }
</style>
