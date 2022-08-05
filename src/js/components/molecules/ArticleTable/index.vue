<template lang="html">
  <div>
    <table class="article-table">
      <thead class="article-table__head">
        <tr>
          <th v-for="(thead, index) in $options.const.theads" :key="index">
            <app-text tag="span" theme-color bold>
              {{ thead }}
            </app-text>
          </th>
        </tr>
      </thead>
      <transition-group name="fade" tag="tbody" class="article-table__body">
        <tr v-for="article in targetArray" :key="article.id">
          <td>
            <app-text tag="span" small>
              {{ readMore(article.title) }}
            </app-text>
          </td>
          <td>
            <app-text tag="span" small>
              {{ readMore(article.content) }}
            </app-text>
          </td>
          <td>
            <app-text tag="span" small>
              {{ displayDate(article.created_at) }}
            </app-text>
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script>
import { Text } from '@Components/atoms';

export default {
  const: {
    theads: ['タイトル', '本文', '作成日'],
  },
  components: {
    appText: Text,
  },
  props: {
    targetArray: {
      type: Array,
      required: true,
    },
  },
  computed: {
    readMore() {
      return articleText => (articleText.length > 30 ? `${articleText.substring(0, 30)}...` : articleText);
    },
    displayDate() {
      return createdDate => createdDate.substring(0, 10);
    },
  },
};
</script>

<style lang="postcss" scoped>
  .article-table {
    width: 100%;
    margin-top: 10px;
    tr {
      border-bottom: 1px solid var(--separatorColor);
    }
    &__head {
      th {
        text-align: left;
        padding: 5px 10px;
      }
    }
    &__body {
      td {
        padding: 5px;
        vertical-align: middle;
      }
    }
  }
</style>
