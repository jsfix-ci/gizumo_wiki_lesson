<template lang="html">
  <div class="article-list">
    <div v-if="doneMessage" class="article-list__notice--create">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <app-router-link
      to="articles/post"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="article-list__create-link"
    >
      新しいドキュメントを作る
    </app-router-link>
    <transition-group
      class="article-list__articles"
      name="fade"
      tag="ul"
    >
      <app-list-item
        v-for="article in targetArray"
        :key="article.id"
        flex
        beetween
        align-items
        bg-white
        large
        border-bottom-gray
      >
        <app-text
          class="article-list__title"
        >
          {{ article.title }}
        </app-text>
        <div class="article-list__links">
          <app-router-link
            :to="`/articles/${article.id}`"
            theme-color
            underline
            hover-opacity
          >
            詳細
          </app-router-link>
          <app-router-link
            :to="`/articles/${article.id}/edit`"
            white
            bg-lightgreen
            small
            round
            hover-opacity
          >
            更新
          </app-router-link>
          <app-button
            bg-danger
            small
            round
            hover-opacity
            :disabled="!access.delete"
            @click="openModal(article.id)"
          >
            {{ buttonText }}
          </app-button>
        </div>
      </app-list-item>
    </transition-group>
    <app-modal>
      <app-text
        ex-large
      >
        本当に削除しますか?
      </app-text>
      <app-button
        bg-danger
        @click="$emit('handleClick')"
      >
        削除
      </app-button>
    </app-modal>
    <div class="pageNation">
      <app-button
        v-for="page in leftPageButton"
        :key="page"
        :disabled="targetButton(page) ? true : false"
        @click="$emit('pageLoading', page)"
      >
        {{ page }}
      </app-button>
      <div
        v-show="firstDot"
        class="dot button"
      >
        …
      </div>
      <app-button
        v-for="page in centerPageButton"
        :key="page"
        :disabled="targetButton(page) ? true : false"
        @click="$emit('pageLoading', page)"
      >
        {{ page }}
      </app-button>
      <div
        v-show="lastDot"
        class="dot button"
      >
        …
      </div>
      <app-button
        v-for="page in rightPageButton"
        :key="page"
        :disabled="targetButton(page) ? true : false"
        @click="$emit('pageLoading', page)"
      >
        {{ page }}
      </app-button>
    </div>
  </div>
</template>

<script>
import {
  Heading,
  ListItem,
  RouterLink,
  Button,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appListItem: ListItem,
    appRouterLink: RouterLink,
    appButton: Button,
    appText: Text,
  },
  props: {
    className: {
      type: String,
      default: '',
    },
    targetArray: {
      type: Array,
      default: () => [],
    },
    borderGray: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'すべて',
    },
    doneMessage: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    pageData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      firstDot: false,
      lastDot: false,
      range: 5,
    };
  },
  computed: {
    articleTitle() {
      return `${this.title}の一覧`;
    },
    buttonText() {
      return this.access.delete ? '削除' : '削除権限がありません';
    },
    // 最初の2つのボタンを作る処理
    leftPageButton() {
      return this.pageArray(1, 2);
    },
    // 真ん中のボタンを作る処理
    centerPageButton() {
      let first;
      let last;
      const { currentPage, lastPage } = this.pageData;
      const range = this.range;
      if (currentPage <= range) {
        first = 3;
        last = range + 2;
        this.dotchenge(false, true);
      } else if (currentPage > lastPage - range) {
        first = lastPage - range - 1;
        last = lastPage - 2;
        this.dotchenge(true, false);
      } else {
        first = currentPage - 2;
        last = currentPage + 2;
        this.dotchenge(true, true);
      }
      return this.pageArray(first, last);
    },
    // 最後の2つのボタンを作る処理
    rightPageButton() {
      return this.pageArray(this.pageData.lastPage - 1, this.pageData.lastPage);
    },
  },
  methods: {
    dotchenge(first, last) {
      this.firstDot = first;
      this.lastDot = last;
    },
    // ページ番号の配列を作る処理
    pageArray(from, to) {
      const pageNumber = [];
      for (let i = from; i <= to; i += 1) {
        pageNumber.push(i);
      }
      return pageNumber;
    },
    // 選択中のページを確認する処理(真偽地によってクラスを付与している)
    targetButton(page) {
      return page === this.pageData.currentPage;
    },
    openModal(articleId) {
      if (!this.access.delete) return;
      this.$emit('openModal', articleId);
    },
  },
};
</script>

<style lang="postcss" scoped>
  .article-list {
    &__articles {
      margin-top: 16px;
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    &__title {
      width: 60%;
    }
    &__create-link {
      margin-top: 16px;
    }
    &__links {
      *:not(first-child) {
        margin-left: 16px;
      }
    }
    &__notice--create {
      margin-bottom: 16px;
    }
    .pageNation {
      text-align: center;
      margin-top: 50px;
      .dot {
        display: inline-block;
        padding: 8px 10px;
        font-size: 16px;
      }
      .button {
        margin-left: 10px;
      }
    }
  }
</style>
