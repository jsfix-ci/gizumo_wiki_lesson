<template lang="html">
  <div class="update">
    <app-category-update
      :access="access"
      :disabled="disabled"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :update-category-name="updateCategoryName"
      @updateCategoryValue="updateCategoryValue"
      @handleSubmit="handleSubmit"
      @clearMessage="clearMessage"
    />
  </div>
</template>

<script>
import { CategoryUpdate } from '@Components/molecules';

export default {
  components: {
    appCategoryUpdate: CategoryUpdate,
  },
  computed: {
    // 権限の取得
    access() {
      return this.$store.getters['auth/access'];
    },
    // 通信の状況
    disabled() {
      return this.$store.state.categories.loading;
    },
    // エラーメッセージ
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    // 終了メッセージ
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    // 編集カテゴリーの取得
    updateCategoryName() {
      return this.$store.state.categories.updateCategory.name;
    },
  },
  created() {
    this.clearMessage();
    const categoryId = this.$route.params;
    this.$store.dispatch('categories/getCategoryName', categoryId.id);
  },
  methods: {
    // カスタムイベント
    updateCategoryValue($event) {
      this.$store.dispatch('categories/updateCategoryValue', $event.target.value);
    },
    // 更新ボタンのクリック処理
    handleSubmit() {
      this.$store.dispatch('categories/updateCategory').then(() => {
        this.$store.dispatch('categories/allCategories');
      });
    },
    // メッセージ削除
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>
