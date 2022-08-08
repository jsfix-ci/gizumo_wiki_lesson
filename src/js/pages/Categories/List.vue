<template lang="html">
  <div class="categories-wrapper">
    <app-category-post
    class="category-post"
    
     />
    <app-category-list 
      class="category-list"
      :categories="categories"
      :theads="theads"
    />
  </div>
</template>

<script>
import { CategoryList,CategoryPost } from '@Components/molecules';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories.categories;
    }
  },
  created() {
    this.$store.dispatch('categories/AllCategories');
  },

};
</script>


<style lang="postcss" scoped>
.categories-wrapper {
  display: flex;
}

.category-list {
  width: 60%;
}

.category-post {
  width: 40%;
  padding-right: 20px;
    margin-right: 20px;
  border-right: 2px solid #eee;
}


.category-list {
    tr {
      height: 30px;
    }
    &__head {
      th {
        height: 100px;
      }
    }
    &__body {
      td {
        height: 100px;
        &.is-disabled {
          height: 100px;
        }
      }
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
      .fade-enter, .fade-leave-to {
        opacity: 0;
      }
    }
}
</style>

