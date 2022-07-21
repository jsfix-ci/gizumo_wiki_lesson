<template lang="html">
  <section>
    <app-heading :level="1">カテゴリー管理</app-heading>
    <div class="make-space-top">
      <app-router-link
        underline
        hover-opacity
        :to="`/categories`"
      >カテゴリー一覧へ戻る</app-router-link>
    </div>
    <div class="make-space-top">
      <app-input
        name="category"
        type="text"
        v-validate="'required'"
        data-vv-as="カテゴリー名"
        :error-messages="errors.collect('category')"
        :value="categoryName"
        @updateValue="$emit('updateValue', $event)"
      ></app-input>
    </div>
    <div class="make-space-top">
      <app-button
        button-type="submit"
        round
        :disabled="disabled || !access.edit"
        @click="updateCategory"
      >
      {{ buttonText }}
      </app-button>
    </div>
    <div v-if="errorMessage" class="make-space-top">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="make-space-top">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </section>
</template>

<script>
import {
  Button,
  Heading,
  Input,
  RouterLink,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appButton: Button,
    appHeading: Heading,
    appInput: Input,
    appRouterLink: RouterLink,
    appText: Text,
  },
  props: {
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
  created() {
    const categoryId = this.$route.params.id;
    this.$store.dispatch('categories/getCategoryName', categoryId);
  },
  computed: {
    categoryName() {
      return this.$store.state.categories.category.name;
    },
    buttonText() {
      if (!this.access.edit) return '更新権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    updateCategory() {
      if (!this.access.edit) return;
      this.$store.dispatch('categories/clearMessage');
      this.$validator.validate().then((valid) => {
        if (valid) this.$store.dispatch('categories/updateCategoryName');
      });
    },
  },
};
</script>

<style lang="postcss" scoped>

.make-space-top {
  margin-top: 20px;
}

</style>
