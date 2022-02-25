<template>
  <b-modal
    id="modalPreviewImage"
    ref="modalPreviewImage"
    hide-footer
    size="lg md"
    class="col-lg-12"
    hide-header
    scrollable
  >
    <img :src="url" alt="">
  </b-modal>
</template>

<script>
export default {
  props: ["url"],
  methods: {
    show() {
      this.$refs.modalPreviewImage.show();
    },
    hideModal() {
      this.$refs.modalPreviewImage.hide();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>