<template>
  <b-modal
    id="modalPreview"
    ref="modalPreview"
    hide-footer
    size="lg md"
    class="col-lg-12"
    hide-header
    scrollable
  >
    <div class="post-view" v-if="blogById">
      <div class="container quillWrapper" v-if="blogById">
        <img :src="blogById.blogCoverPhoto" alt="" />
        <h2>{{ blogById.blogTitle }}</h2>
        <div class="post-content ql-editor" v-html="blogById.blogHTML"></div>
      </div>
    </div>
    <div class="post-view" v-else>
      <div class="container quillWrapper">
        <img v-if="blogCoverPhotoURL" :src="blogCoverPhotoURL" alt="" />
        <h2 v-if="blogTitle">{{ blogTitle }}</h2>
        <div
          v-if="blogHtml"
          class="post-content ql-editor"
          v-html="blogHtml"
        ></div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: ["blogById", "blogTitle", "blogHtml", "blogCoverPhotoURL"],
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
    height: 300px;
    margin-bottom: 32px;
  }
}
</style>