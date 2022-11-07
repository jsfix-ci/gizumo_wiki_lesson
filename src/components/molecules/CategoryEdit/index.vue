<template>
  <section class="category-edit">
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

    <form class="category-edit__form" @submit.prevent="updateCategory">
      <div class="category-edit__input">
        <app-input
          v-validate="'required'"
          name="categoryName"
          type="text"
          placeholder="カテゴリー名"
          data-vv-as="カテゴリー名"
          :error-messages="errors.collect('categoryName')"
          :value="categoryName"
          @update-value="$emit('edited-name', $event)"
        />
      </div>

      <div class="category-edit__submit">
        <app-button
          button-type="submit"
          round
          :disabled="loading || !access.edit"
        >
          {{ buttonText }}
        </app-button>
      </div>

      <div v-if="errorMessage" class="category-edit__notice">
        <app-text bg-error>{{ errorMessage }}</app-text>
      </div>
      <div v-if="doneMessage" class="category-edit__notice">
        <app-text bg-success>{{ doneMessage }}</app-text>
      </div>
    </form>
  </section>
</template>

<script>
import {
  Button,
  Heading,
  Input,
  Text,
  RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appButton: Button,
    appHeading: Heading,
    appInput: Input,
    appText: Text,
    appRouterLink: RouterLink,
  },

  props: {
    categoryName: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    doneMessage: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '更新権限がありません';
      return this.loading ? '更新中...' : '更新';
    },
  },
  methods: {
    updateCategory() {
      if (!this.access.edit) return;
      this.$emit('clear-message');
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('update-category');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category-edit{
  &__back {
    margin-top: 16px;
  }
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
