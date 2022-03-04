<template>
  <div class="create-post">
    <modal-preview
      :blogTitle="blogTitle"
      :blogHtml="blogHtml"
      :blogCoverPhotoURL="blogCoverPhotoURL"
      ref="modalPreview"
    />
    <modal-preview-image
      :url="this.blogCoverPhotoURL"
      ref="modalPreviewImage"
    />

    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <v-text-field
          class="text-field"
          dense
          label="Tên bài viết"
          v-model="blogTitle"
        ></v-text-field>
        <v-select
          class="text-field"
          v-model="blogTopic"
          :items="blogTopics"
          dense
          label="Chọn chủ đề"
        ></v-select>
        <div class="upload-file">
          <label for="blog-photo">Ảnh bìa</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            @change="fileChange"
            accept=".png, .jpg, ,jpeg"
          />
          <button
            class="preview"
            :disabled="this.isDisabled"
            @click="showModalPreviewImage"
          >
            Preview
          </button>
          <span>File Chosen: {{ this.blogCoverPhotoChooseName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor
          :editorOptions="editorSettings"
          v-model="blogHtml"
          useCustomImageHandler
          @image-added="imageHandler"
        />
      </div>
      <div class="blog-actions">
        <button @click="createNewBlog">Đăng bài</button>
        <v-btn class="router-button btn-preview" @click="showModalPreview"
          >Xem trước</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import modalPreview from "../../components/Modal/ModalPreviewBlog.vue";
import modalPreviewImage from "../../components/Modal/ModalPreviewCoverPhoto.vue";
import axios from "axios";
import Quill from "quill";
import { mapActions, mapGetters } from "vuex";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
export default {
  name: "CreateBlog",
  components: { modalPreview, modalPreviewImage },
  data() {
    return {
      isDisabled: true,
      blogTitle: "",
      blogHtml: "",
      blogTopic: "",
      blogCoverPhotoURL: "",
      blogCoverPhotoChooseName: "",
      error: null,
      errorMsg: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
      blogTopics: [
        {
          value: "Bài viết về rubik",
          text: "Bài viết về rubik",
        },
        {
          value: "Đánh giá cube",
          text: "Đánh giá cube",
        },
        {
          value: "Sản phẩm mới ra mắt",
          text: "Sản phẩm mới ra mắt",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "AUTH/userInfo",
    }),
  },
  methods: {
    ...mapActions({
      createNewBlogAction: "BLOGS/createNewBlog",
    }),
    showModalPreview() {
      this.$refs.modalPreview.show();
    },
    showModalPreviewImage() {
      this.$refs.modalPreviewImage.show();
    },
    createNewBlog() {
      if (this.blogTitle.length == 0) {
        this.error = true;
        this.errorMsg = "Please ensure you uploaded a title blog!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
      if (this.blogCoverPhotoURL.length == 0) {
        this.error = true;
        this.errorMsg = "Please ensure you uploaded a cover photo!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
      if (this.blogHtml.length == 0) {
        this.error = true;
        this.errorMsg = "Nhập content vao";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
      if (
        this.blogCoverPhotoURL.length !== 0 &&
        this.blogHtml.length !== 0 &&
        this.blogTitle.length !== 0
      ) {
        if (this.userInfo.role === "Admin") {
          this.createNewBlogAction({
            blogTitle: this.blogTitle,
            blogCoverPhoto: this.blogCoverPhotoURL,
            blogHTML: this.blogHtml,
            blogTopic: this.blogTopic,
            isCensored: true,
          })
        } else {
          this.createNewBlogAction({
            blogTitle: this.blogTitle,
            blogCoverPhoto: this.blogCoverPhotoURL,
            blogHTML: this.blogHtml,
            blogTopic: this.blogTopic,
          })
        }
      }
    },
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.blogCoverPhotoChooseName = fileName;
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("upload_preset", "wfcqkljk");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dj5xafymg/image/upload",
          formData
        )
        .then((response) => {
          this.blogCoverPhotoURL = response.data.url;
          this.isDisabled = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "wfcqkljk");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dj5xafymg/image/upload",
          formData
        )
        .then((response) => {
          Editor.insertEmbed(cursorLocation, "image", response.data.url);
          resetUploader();
        });
    },
  },
};
</script>
<style lang="scss" >
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 25px;

    // input:nth-child(1) {
    //   min-width: 300px;
    // }

    // input {
    //   transition: 0.5s ease-in-out all;
    //   padding: 10px 4px;
    //   border: none;
    //   border-bottom: 1px solid #303030;

    //   &:focus {
    //     outline: none;
    //     box-shadow: 0 1px 0 0 #303030;
    //   }
    // }

    .upload-file {
      flex: 1.5;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
.v-select {
  width: 20% !important;
}
// .create-post label{
//   background-color: #fff;
// }
.text-field {
  width: 0px !important;
  margin: 20px 30px 0px 30px;
  label {
    background-color: rgb(255, 255, 255);
    top: -6px !important;
    left: -6px !important;
    height: 30px !important;
  }
}
.btn-preview{
   transition: 0.5s ease-in-out all !important;
    align-self: center !important;
    font-size: 14px !important;
    cursor: pointer !important;
    border-radius: 20px !important;
    padding: 20px 24px !important;
    color: #fff !important;
    background-color: #303030 !important;
    text-decoration: none !important;
    text-transform: none !important;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7) !important;
    }
}
</style>