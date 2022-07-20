<template>
  <div>
    <app-heading :level="1">カテゴリー管理</app-heading>
    <div class="category-edit__back">
      <app-router-link
        block
        underline
        key-color
        hover-opacity
        to="/categories"
      >
        カテゴリー一覧へ戻る
      </app-router-link>
    </div>

    <form @submit.prevent="editCategory">
      <div class="category-edit__input">
        <app-input
          v-validate="'required'"
          name="category"
          type="text"
          data-vv-as="カテゴリー名"
          :error-messages="errors.collect('category')"
          :value="category"
          @updateValue="$emit('updateValue', $event)"
        />
      </div>
      <div class="category-edit__btn">
        <app-button
          button-type="submit"
          :disabled="disabled || !access.edit"
          round
        >
          {{ buttonText }}
        </app-button>
      </div>

      <div v-if="errorMessage" class="users-detail__notice">
        <app-text bg-error>{{ errorMessage }}</app-text>
      </div>

      <div v-if="doneMessage" class="users-detail__notice">
        <app-text bg-success>{{ doneMessage }}</app-text>
      </div>
    </form>
  </div>
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
    category: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    doneMessage: {
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
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '変更権限がありません';
      return this.disabled ? '更新中です...' : '更新';
    },
  },
  methods: {
    editCategory() {
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
.category-edit {
  &__back {
    margin-top: 20px;
  }
  &__input {
    margin-top: 20px;
  }
  &__btn {
    margin-top: 20px;
  }
}

.users-detail {
  &__notice {
    margin-top: 20px;
  }
}
</style>
