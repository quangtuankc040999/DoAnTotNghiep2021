<template>
  <b-modal
    id="modalPreview"
    ref="modalPreview"
    hide-footer
    size="lg md"
    class="col-lg-12"
    hide-header-close
    scrollable
  >
    <div class="post-view">
      <div class="container quillWrapper" v-if="blogById">
        <h2 >{{ blogById.blogTitle }}</h2>
        <img :src="blogById.blogCoverPhoto" alt="" />
        <div class="post-content ql-editor" v-html="blogById.blogHTML"></div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: ["blogById"],
  methods: {
    show() {
      this.$refs.modalPreview.show();
    },
    hideModal() {
      this.$refs.modalPreview.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.post-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 30px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>