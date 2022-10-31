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

    <form class="category-edit__form">
      <div class="category-edit__input">
        <app-input
          v-validate="'required'"
          name="categoryName"
          type="text"
          placeholder="カテゴリー名"
          data-vv-as=""
          :value="categoryName"
          @update-value="updateValue"
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
  },
};
</script>
