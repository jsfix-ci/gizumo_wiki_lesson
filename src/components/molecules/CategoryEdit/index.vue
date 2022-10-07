<template>
  <form @submit.prevent="updateCategory">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      class="category-edit__link"
      underline
      hover-opacity
      to="/categories"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      v-validate="'required'"
      class="category-edit__input"
      name="category"
      type="text"
      placeholder="更新するカテゴリー名を入力してください"
      data-vv-as="カテゴリー名"
      :error-message="errors.collect('category')"
      :value="editCategoryName"
      @update-value="$emit('update-value', $event)"
    />
    <app-button
      class="category-edit__submit"
      button-type="submit"
      round
      :disabled="disabled || !access.edit"
    >
      {{ buttonText }}
    </app-button>
    <div v-if="errorMessage" class="category-edit__message">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <div v-if="doneMessage" class="category-edit__message">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </form>
</template>

<script>
import {
  Heading, Input, Button, RouterLink, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appRouterLink: RouterLink,
    appText: Text,
  },
  props: {
    access: {
      type: Object,
      default: () => ({}),
    },
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
    editCategoryName: {
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
    updateCategory() {
      if (!this.access.edit) return;
      this.$emit('clear-message');
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('handle-submit');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category-edit {
  &__link {
    margin-top: 16px;
  }

  &__input {
    margin-top: 16px;
  }

  &__submit {
    margin-top: 16px;
  }

  &__message {
    margin-top: 16px;
  }
}
</style>
