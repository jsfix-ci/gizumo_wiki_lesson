<template lang="html">
  <form @submit.prevent="handleSubmit">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      class="category-edit"
      underline
      hover-opacity
      to="/categories"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      class="category-edit__input"
      name="category"
      type="text"
      placeholder="更新するカテゴリー名を入力してください"
      data-vv-as="カテゴリー名"
      :error-messages="errors.collect('category')"
      :value="editCategory"
      @updateValue="$emit('updateValue', $event)"
    />
    <app-button
      class="category-edit__submit"
      button-type="submit"
      round
      :disabled="disabled || !access.edit"
    >
      {{ buttonText }}
    </app-button>
    <div v-if="errorMessage" class="category-edit__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <div v-if="doneMessage" class="category-edit__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </form>
</template>

<script>
import {
  Heading, RouterLink, Input, Button, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
    appInput: Input,
    appButton: Button,
    appText: Text,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    editCategory: {
      type: String,
      default: '',
    },
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '更新権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    handleSubmit() {
      if (!this.access.edit) return;
      this.$emit('clearMessage');
      this.$validator.validate().then((valid) => {
        if (valid) this.$emit('handleSubmit');
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.category-edit {
    margin-top: 16px;
  &__input {
    margin-top: 16px;
  }
  &__submit {
    margin-top: 16px;
  }
  &__notice {
    margin-top: 16px;
  }
}
</style>
