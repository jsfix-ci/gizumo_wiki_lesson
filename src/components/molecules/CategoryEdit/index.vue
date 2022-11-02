<template>
  <section class="category-edit">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <div class="category-list__back">
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
          data-vv-as=""
          :value="categoryName"
          @update-value="$emit('edited-name', $event)"
        />
      </div>

      <div class="category-edit__button">
        <app-button
          button-type="submit"
          block
        >
          {{ buttonText }}
        </app-button>
      </div>
    </form>
  </section>
</template>

<script>
import {
  Button,
  Heading,
  Input,
  // Text,
  RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appButton: Button,
    appHeading: Heading,
    appInput: Input,
    // appText: Text,
    appRouterLink: RouterLink,
  },

  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
    categoryId: {
      type: String,
      default: '',
    },
    categoryName: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '更新権限がありません';
      return this.loading ? '更新中...' : '更新';
    },
    disabled() {
      return this.access.edit && !this.loading;
    },
  },
  methods: {
    updateCategory() {
      console.log('df');
      // if (!this.access.edit) return;
      this.$emit('clear-message');
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('update-category');
      });
    },
  },
};
</script>
