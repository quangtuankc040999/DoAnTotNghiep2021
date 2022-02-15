<template>
  <div class="product-item">
    <div class="product">
      <div class="product-infor">
        <table v-if="productItem">
          <tbody>
            <tr>
              <td style="width: 20%; font-weight: 400">
                <img v-bind:src="productItem.product.image[0]" alt="" />
              </td>
              <td style="width: 60%; font-weight: 400">
                {{ productItem.product.title }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="rating">
        <ul class="list">
          <li
            @click="rate(star)"
            v-for="star in maxStars"
            :class="{ active: star <= stars }"
            :key="star.stars"
            class="star"
          >
            <i :class="star <= stars ? 'bx bxs-star' : 'bx bx-star'"></i>
          </li>
        </ul>
      </div>
      <textarea
        v-model="rattingRequest.content"
        name=""
        id=""
        rows="3"
        placeholder="Nhập đánh giá của bạn"
        style="width: 90%"
      ></textarea>
      <div class="img">
        <ul v-if="rattingRequest.images.length">
          <li
            v-for="(imgRatting, index) in rattingRequest.images"
            :key="index"
            class="imgItem"
          >
            <img :src="imgRatting" alt="" />
            <div class="cover">
              <i @click="deleteImg(index)">
                <v-icon large>mdi-delete-circle </v-icon></i
              >
            </div>
          </li>
        </ul>
        <div class="btn">
          <v-btn class="addImg" @click="handleUpload()">
            <div class="btn-content">
              <v-icon class="icon">mdi-camera </v-icon>
              <p class="img-add">Thêm ảnh</p>
            </div>
          </v-btn>
          <input
            type="file"
            accept="image/*"
            @change="onFileChange"
            style="display: none"
            ref="uploadInputs"
          />
        </div>
      </div>
    </div>
    <div class="btn-container">
      <v-btn
        class="btn-post"
        @click="postComment()"
        >Gửi đánh giá
      </v-btn>
    </div>

    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Product-item-comment",
  props: ["productItem", "indexProduct", "idProduct"],

  data() {
    return {
      maxStars: 5,
      stars: 5,
      hasCounter: true,
      rattingRequest: {
        product: this.productItem,
        star: 0,
        images: [],
        content: "",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      postCommentAction: "RATTING/postNewComment",
    }),
    postComment() {
      this.postCommentAction(this.rattingRequest);
    },
    deleteImg(index) {
      for (let i = 0; i < this.rattingRequest.image.length; i++) {
        if (i == index) {
          this.rattingRequest.images.splice(index, 1);
        }
      }
    },
    handleUpload() {
      this.$refs.uploadInputs.click();
    },
    onFileChange(e) {
      this.isDisableButton = true;
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "wfcqkljk");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dj5xafymg/image/upload",
          formData
        )
        .then((response) => {
          this.rattingRequest.images.push(response.data.url);
          this.isDisableButton = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    rate(star) {
      if (typeof star === "number" && star <= this.maxStars && star >= 0) {
        console.log(star);
        this.stars = this.stars === star ? star - 1 : star;
        this.rattingRequest.star = this.stars;
      }
    },
  },
  watch: {
  },
};
</script>

<style lang="scss" scoped>
td {
  padding: 10px;
}
.product-item {
  margin-bottom: 10px;
}
input,
select,
textarea {
  border: 1px solid rgb(179, 174, 174);
  width: 90%;
  padding: 10px;
  border-radius: 4px;
  .detail-adress {
    margin-top: 100px !important;
  }
}
.rating {
  display: flex;
  flex-direction: column;
  align-items: left;
  color: #b7b7b7;
  .list {
    padding: 0;
    margin: 0 20px 0 0;
    &:hover {
      .star {
        color: #ffe100;
      }
    }
    .star {
      display: inline-block;
      font-size: 20px;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        ~ .star:not(.active) {
          color: inherit;
        }
      }
      &:first-child {
        margin-left: 0;
      }
      &.active {
        color: #ffe100;
      }
    }
  }
}
.img {
  display: flex;
  ul {
    li {
      position: relative;
      display: flex;
      img {
        width: 150px;
        height: 150px;
        margin: 5px;
      }
      .cover {
        display: none;
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 100;
        background-color: rgba(56, 51, 51, 0.3);
      }
    }
  }
}
.imgItem:hover .cover {
  display: flex;
  flex-wrap: wrap;
  i {
    color: white;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
<style scoped>
.addImg {
  background-color: rgb(255, 255, 255) !important;
  color: rgba(41, 39, 39, 0.5) !important;
  width: 100px !important;
  height: 100px !important;
  border: 1px dashed rgb(207, 201, 201);
  font-size: 0.2rem !important;
  padding: 2px !important;
}
.icon {
  font-size: 2rem !important;
}
.img-add {
  color: rgba(41, 39, 39, 0.5) !important;
  font-size: 0.7rem !important;
  text-transform: none !important;
  text-align: center;
  border: none;
  margin: 0;
  padding: 0;
}
.btn-content {
  display: flex;
  flex-direction: column;
}
.btn-post {
  background-color: #d26e4b !important;
  color: white !important;
  margin-top: 20px;
  width: 90%;
}
.btn-container {
  text-align: center;
}
</style>