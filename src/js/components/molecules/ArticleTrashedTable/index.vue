<template lang="html">
  <table class="trashed-table">
    <thead class="trashed-table__head">
      <tr>
        <th v-for="(thead, index) in theads" :key="index">
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
    <tbody class="trashed-table__body">
      <tr v-for="trashed in trashedList" :key="trashed.id">
        <td>
          <app-text
            tag="span"
          >
            {{ cutText(trashed.title) }}
          </app-text>
        </td>
        <td>
          <app-text
            tag="span"
          >
            {{ cutText(trashed.content) }}
          </app-text>
        </td>
        <td>
          <app-text
            tag="span"
          >
            {{ formatDate(trashed.created_at) }}
          </app-text>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Text } from '@Components/atoms';

export default {
  components: {
    appText: Text,
  },
  props: {
    theads: {
      type: Array,
      default: () => [],
    },
    trashedList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    cutText() {
      return text => (text.length >= 30 ? `${text.slice(0, 30)}...` : text);
    },
    formatDate() {
      return data => data.slice(0, 10);
    },
  },
};
</script>

<style lang="postcss" scoped>
.trashed-table {
  width: 100%;
  text-align: left;
  background-color: #fff;
  margin-top: 16px;
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
