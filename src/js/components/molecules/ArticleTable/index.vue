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
              {{ article.title | readMore(30, '...') }}
            </app-text>
          </td>
          <td>
            <app-text tag="span" small>
              {{ article.content | readMore(30, '...') }}
            </app-text>
          </td>
          <td>
            <app-text tag="span" small>
              {{ article.created_at | displayDate(10) }}
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
  filters: {
    readMore(text, length, suffix) {
      let articleText = '';
      if (text.length > 30) {
        articleText = text.substring(0, length) + suffix;
      } else {
        articleText = text.substring(0, length);
      }
      return articleText;
    },
    displayDate(text, length) {
      return text.substring(0, length);
    },
  },
  props: {
    targetArray: {
      type: Array,
      required: true,
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
