<template lang="html">
  <div class="btn-wrapper">
    <button
      :disabled="isDisabled"
      :class="disabledPrev"
      class="btn"
      @click="clickFirst"
    >
      最初へ
    </button>
    <button
      :disabled="isDisabled"
      :prevLink="prevLink"
      :class="disabledPrev"
      class="btn"
      @click="clickPrev"
    >
      前へ
    </button>
    <button
      :disabled="isDisabled"
      :class="disabledNext"
      :nextLink="nextLink"
      class="btn"
      @click="clickNext"
    >
      次へ
    </button>
    <button
      :disabled="isDisabled"
      :class="disabledNext"
      class="btn"
      @click="clickLast"
    >
      最後へ
    </button>
  </div>
</template>

<script>
export default {
  props: {
    nextLink: {
      type: String,
      default: '',
    },
    prevLink: {
      type: String,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    disabledNext() {
      const nextValue = this.nextLink;
      if (nextValue === null) {
        return 'btn-disabled';
      }
      return '';
    },
    disabledPrev() {
      const prevValue = this.prevLink;
      if (prevValue === null) {
        return 'btn-disabled';
      }
      return '';
    },
  },
  methods: {
    clickLast() {
      if (this.nextLink === null) {
        this.isDisabled = true;
      } else {
        this.$emit('toLast', this.$event);
      }
    },
    clickNext() {
      if (this.nextLink === null) {
        this.isDisabled = true;
      } else {
        this.$emit('toNext', this.$event);
      }
    },
    clickPrev() {
      if (this.prevLink === null) {
        this.isDisabled = true;
      } else {
        this.$emit('toPrev', this.$event);
      }
    },
    clickFirst() {
      if (this.prevLink === null) {
        this.isDisabled = true;
      } else {
        this.$emit('toFirst', this.$event);
      }
    },
  },
};
</script>


<style lang="postcss" scoped>

.btn {
  padding: 8px 20px;
  display: inline-block;
  font-size: 16px;
  line-height: 1.4;
  color: #fff;
  background-color: var(--themeColor);
  margin-left: 20px;
  border-radius: 5px;
  @mixin hoverOpacity;
  &:first-child {
    margin-left: 0;
  }
  &-wrapper {
    display: flex;
    justify-content: center;
  }
  &-disabled {
    background-color: var(--disabledColor);
    cursor: default;
    &:hover {
      opacity: 1;
    }
  }
}

</style>
