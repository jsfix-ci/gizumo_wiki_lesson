<template lang="html">
  <div>
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      class="category-management-update__link"
      underline
      hover-opacity
      :to="'/categories'"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      class="category-management-update__input"
      v-validate="'required'"
      name="name"
      type="text"
      placeholder="変更後のカテゴリー名を入力してください"
      data-vv-as="カテゴリー名"
      :error-messages="errors.collect('name')"
      :value="updateCategoryName"
      @updateValue="$emit('updateCategoryValue', $event)"
    />
    <app-button
      class="category-management-update__submit"
      button-type="submit"
      round
      :disabled="disabled || !access.create"
      @click="updateCategory"
    >
      {{ buttonText }}
    </app-button>

    <div v-if="errorMessage" class="category-management-update__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="category-management-update__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </div>
</template>

<script>
import {
  Heading, Input, Button, Text, RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appText: Text,
    appRouterLink: RouterLink,
  },
  props: {
    updateCategoryName: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    errorMessage: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
    },
  },
  computed: {
    // 作成ボタンのテキスト切り替え
    buttonText() {
      if (!this.access.create) return '更新権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    // 更新ボタンのクリック処理
    updateCategory() {
      if (!this.access.create) return;
      this.$emit('clearMessage');
      this.$validator.validate().then((valid) => {
        if (valid) this.$emit('handleSubmit');
      });
    },
  },
};
</script>
<style lang="postcss" scoped>
  .category-management-update {
    &__input {
      margin-top: 16px;
    }
    &__submit {
      margin-top: 16px;
    }
    &__notice {
      margin-top: 16px;
    }
    &__link {
      margin-top: 16px;
    }
  }
</style>
