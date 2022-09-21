<template lang="html">
  <table class="deleted-table">
    <thead class="deleted-table__head">
      <tr>
        <th v-for="(thead, index) in $options.theads" :key="index">
          <app-text tag="span" theme-color bold>
            {{ thead }}
          </app-text>
        </th>
      </tr>
    </thead>
    <tbody name="fade" tag="tbody" class="deleted-table__body">
      <tr v-for="deleted in deletedList" :key="deleted.id">
        <td>
          <app-text tag="span" small>{{ formatText(deleted.title) }}</app-text>
        </td>
        <td>
          <app-text tag="span" small>{{ formatText(deleted.content) }}</app-text>
        </td>
        <td>
          <app-text tag="span" small>{{ formatDate(deleted.created_at) }}</app-text>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Text } from '@Components/atoms';

export default {
  theads: ['タイトル', '本文', '作成日'],
  components: {
    appText: Text,
  },
  props: {
    deletedList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    formatText() {
      return text => (text.length > 30 ? `${text.slice(0, 30)}...` : text);
    },
    formatDate() {
      return date => date.slice(0, 10);
    },
  },
};
</script>

<style lang="postcss" scoped>
.deleted-table {
  width: 100%;
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
    }
  }
}
</style>
