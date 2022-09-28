export default {
  methods: {
    toggleModal() {
      this.$root.$emit('toggle-modal');
    },
  },
};
