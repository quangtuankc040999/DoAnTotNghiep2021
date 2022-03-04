<template>
  <div class="product-detail" v-if="productById">
    <div class="container-product">
      <div class="list-img">
        <div class="img">
          <!-- <vueper-slides
            lazy
            lazy-load-on-drag
            class="no-shadow slides"
            :visible-slides="1"
            slide-multiple
            :slide-ratio="1"
            :arrows-outside="false"
          >
            <vueper-slide
              class="slide"
              v-for="(img, i) in productById.image"
              :key="i"
              :image="img"
            >
            </vueper-slide>
          </vueper-slides> -->
          <v-carousel hide-delimiter-background show-arrows-on-hover cycle>
            <v-carousel-item
              v-for="(item, i) in productById.image"
              :key="i"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <div class="image">
                <img
                  class="product_img"
                  :src="item"
                  alt=""
                  @click="showGalery(item, i)"
                />
              </div>
            </v-carousel-item>
          </v-carousel>
        </div>
      </div>
      <div class="product-infor">
        <div class="category">
          <router-link :to="`/products/${productById.category_name}`"
            >{{ productById.category_name }}
          </router-link>
          <span> / </span>
          <router-link
            :to="`/products/${productById.category_name}/${productById.category_detail}`"
            >{{ productById.category_detail }}
          </router-link>
        </div>
        <p class="title">{{ productById.title }}</p>
        <div class="price">
          <h4>{{ formatPrice(productById.sale_price) }}</h4>
          <div class="discount" v-if="productById.discount > 0">
            <h6 class="old-price">
              {{ formatPrice(productById.starting_price) }}
            </h6>
            <h6 class="discount-persent">-{{ productById.discount }}%</h6>
          </div>
        </div>
        <p>Còn lại {{ productById.inventory }} sản phẩm</p>
        <div class="action-buy">
          <v-card flat class="py-12">
            <v-card-text>
              <v-row align="center" justify="center">
                <v-btn-toggle mandatory>
                  <v-btn @click="updateCart('subtract')"> - </v-btn>
                  <span class="cart-quantity">{{ product_quantity }}</span>
                  <v-btn @click="updateCart('add', productById.inventory)">
                    +
                  </v-btn>
                </v-btn-toggle>
              </v-row>
            </v-card-text>
          </v-card>
          <div class="select-btn">
            <v-btn
              v-if="userInfoAuth"
              class="btn-add-cart"
              @click="
                setProductCart(
                  userInfoAuth._id,
                  {
                    idProduct: productById._id,
                    product: productById,
                    quantity: product_quantity,
                  },
                  productCarts
                )
              "
            >
              MUA HÀNG
            </v-btn>
            <v-btn v-else class="btn-add-cart" @click="goToLogin">
              MUA HÀNG
            </v-btn>
          </div>
        </div>
        <p class="danh-muc">
          <span>Danh mục: </span> {{ productById.category_name }},{{
            productById.category_detail
          }}
        </p>
        <p class="product-key">
          <span>Từ khoá: </span>
          <!-- <span v-for="i in productById.product_key" v-bind:key="i"
            >{{ i }},
          </span> -->
          <span>{{ productById.product_key }}</span>
        </p>
      </div>
    </div>
    <div class="description">
      <p class="description-title">Thông tin sản phẩm</p>
      <div
        class="post-content ql-editor"
        v-html="productById.description"
      ></div>
    </div>
    <p class="comment-title">Đánh giá sản phẩm</p>
    <div v-if="listCommentProduct">
      <div v-if="listCommentProduct.listComment.length > 0">
        <div class="star-total">
          <div class="div1">
            <AwesomeVueStarRating
              :star="Math.round(listCommentProduct.starAvg)"
              :disabled="this.disabled"
              :maxstars="this.maxstars"
              :starsize="this.starsize"
              :hasresults="this.hasresults"
              :hasdescription="this.hasdescription"
            />
            <span>{{ listCommentProduct.starAvg }} trên 5</span>
          </div>
          <span>(Có {{ listCommentProduct.numberComment }} đánh giá)</span>
        </div>
        <comment-item
          v-for="(comment, index) in listCommentProduct.listComment"
          :key="index"
          :comment="comment"
          :indexComment="index"
          class="comment"
        />
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="listCommentProduct.numberPages"
            :total-visible="7"
            circle
          ></v-pagination>
        </div>
      </div>
      <div v-else>Chưa có đánh giá</div>
    </div>

    <div class="gallery" v-bind:class="{ show: isShow }">
      <div class="gallery_inner">
        <!-- <img :src="srcImg" /> -->
        <div
          class="img_gallery"
          :style="{ backgroundImage: 'url(' + this.srcImg + ')' }"
        ></div>
      </div>
      <div class="close">
        <v-btn text @click="isShow = false">
          <v-icon large color="grey lighten-5">mdi-close-thick</v-icon>
        </v-btn>
      </div>

      <div class="pre" v-if="curentIndex > 0">
        <v-btn text @click="changImage('pre')">
          <v-icon x-large color="grey lighten-5">mdi-chevron-left </v-icon>
        </v-btn>
      </div>
      <div class="next" v-if="curentIndex < productById.image.length -1">
        <v-btn text @click="changImage('next')">
          <v-icon x-large color="grey lighten-5">mdi-chevron-right </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
// import { VueperSlides, VueperSlide } from "vueperslides";
import { mapActions, mapGetters } from "vuex";
import commentItem from "../../components/Products/CommentItem.vue";
import AwesomeVueStarRating from "awesome-vue-star-rating";
export default {
  components: {
    // VueperSlides,
    // VueperSlide,
    commentItem,
    AwesomeVueStarRating,
  },
  data() {
    return {
      curentIndex: 0,
      isShow: false,
      srcImg: "",
      page: 1,
      hasresults: false,
      hasdescription: false,
      starsize: "1x", //[xs,lg,1x,2x,3x,4x,5x,6x,7x,8x,9x,10x],
      maxstars: 5,
      disabled: true,

      index: localStorage.getItem("index"),
      productId: localStorage.getItem("productID"),
      product_quantity: 1,
    };
  },
  computed: {
    ...mapGetters({
      listCommentProduct: "RATTING/listCommentProduct",
      productById: "PRODUCTS/productById",
      userInfoAuth: "AUTH/userInfo",
      userInfor: "USER/userInfo",
      productCarts: "CART/productCart",
    }),
  },
  methods: {
    showGalery(src, i) {
      this.srcImg = src;
      this.isShow = true;
      this.curentIndex = i;
    },
    changImage(action) {
      switch (action) {
        case "pre":
          this.curentIndex--;
          this.srcImg = this.productById.image[this.curentIndex];
          break;
        case "next":
          this.curentIndex++;
          this.srcImg = this.productById.image[this.curentIndex];
          break
      }
    },
    top(number) {
      return Math.ceil(number);
    },
    goToLogin() {
      this.$router.push(`/login`);
    },
    totalStar(listComment) {
      return (
        listComment.reduce((total, comnent) => total + comnent.star, 0) /
        listComment.length
      );
    },
    ...mapActions({
      getProductInforAction: "PRODUCTS/getProduct",
      getProductCartOfUserAction: "CART/userProductCart",
      pushProductToCartAction: "CART/pushProductToCart",
      pushProductToCartDBAction: "CART/pushProductToCartDB",
      updateQuantityProductFromCartDBAction:
        "CART/updateQuantityProductFromCartDB",
      updateQuantityProductFromCartAction: "CART/updateQuantityProductFromCart",
      getCommentProductByIdProductAction:
        "RATTING/getCommentProductByIdProduct",
      getUserAction: "USER/getUser",
    }),
    setProductCart(userId, product, productCarts) {
      let check = false; // kiem tra san pham co trong gio hang hay chua
      for (let index in productCarts) {
        if (product.product._id == productCarts[index].product._id) {
          check = true; // check san pham da co trong gio hang roi
          this.updateQuantityProductFromCartDBAction({
            id: userId,
            product: {
              idProduct: product.product._id,
              quantity: product.quantity,
              quantity_old: productCarts[index].quantity,
            },
          });
          this.updateQuantityProductFromCartAction({
            index: index,
            idProduct: product.product._id,
            quantity: product.quantity,
            quantity_old: productCarts[index].quantity,
          });
          break;
        }
      }
      if (!check) {
        this.pushProductToCartAction(product);
        this.pushProductToCartDBAction({ id: userId, product: product });
      }
    },

    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    updateCart(updateType, inventory) {
      if (updateType === "subtract") {
        if (this.product_quantity !== 0) {
          this.product_quantity--;
        }
      } else {
        if (this.product_quantity < inventory) {
          this.product_quantity++;
        }
      }
    },
  },
  created() {
    if (this.userInfoAuth) {
      this.getUserAction(this.userInfoAuth_id);
      this.getProductCartOfUserAction(this.userInfoAuth._id);
    }
    this.getProductInforAction(this.$route.params.id);
    this.getCommentProductByIdProductAction({
      productId: this.$route.params.id,
      page: 1,
    });
  },
  watch: {
    page() {
      this.getCommentProductByIdProductAction({
        productId: this.$route.params.id,
        page: this.page,
      });
    },
    $route() {
      if (this.$route.params.id) {
        this.$router.go();
        this.getProductInforAction(this.$route.params.id);
        this.getCommentProductByIdProductAction(this.$route.params.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
a {
  text-decoration: none;
}
p {
  font-size: 1rem;
  color: $color !important;
  text-transform: uppercase !important;
  padding-bottom: 10px;
  border-bottom: rgba(177, 171, 171, 0.5) 3px solid;
}
.star-total {
  display: flex;
  padding: 15px;
  margin-bottom: 3%;
  width: 100%;
  .div1 {
    margin-right: 2%;
    text-align: center;
    align-content: center;
    span {
      font-size: 1.3rem;
      font-weight: 700;
      color: rgb(243, 210, 62);
    }
  }
}
.vueperslide--loading .vueperslide__content-wrapper {
  display: none !important;
}
.product-detail {
  width: 90%;
  height: 100%;
}
.img {
  max-width: 370px;
  max-height: 410px;
}
.container-product {
  display: flex;
  width: 100%;
  .product-infor {
    padding-top: 20px;
    margin-left: 40px;
    width: 50%;
    .category {
      text-transform: uppercase;
      font-weight: 300;
      font-size: 0.9em;
      color: rgba(102, 102, 102, 0.85);
      a {
        color: rgba(102, 102, 102, 0.85);
      }
    }
    .title {
      color: #dd9933 !important;
      font-weight: 700;
      font-size: 2rem !important;
      line-height: 1.3;
      border-bottom: none;
    }
    .price {
      h4 {
        font-weight: 700;
        font-size: 1.8em;
      }
      .discount {
        display: flex;
        flex-direction: row;
        .old-price {
          margin-right: 10px;
          text-decoration: line-through;
          font-size: 1.3em;
          opacity: 0.5;
          font-weight: lighter !important;
        }
        .discount-persent {
          background-color: #c62828;
          color: white;
          padding: 5px;
          font-weight: 700 !important;
          border-radius: 4px;
        }
      }
    }
    p {
      border: none !important;
      color: rgb(126, 43, 43) !important;
      text-transform: none !important;
      width: 100% !important;
    }
    .action-buy {
      display: flex;
      align-self: center;
      span {
        justify-content: center;
        align-self: center;
        font-size: 20px !important;
        margin: 0 1rem;
      }
      .select-btn {
        display: flex;
        justify-content: center;
        align-self: center;
        margin-left: 20px;
        .btn-add-cart {
          background-color: #d26e4b;
          color: rgb(255, 255, 255, 0.9);
        }
      }
    }
    .danh-muc {
      margin-top: 20px;
      border-bottom: none;
      text-transform: unset !important;
      color: black !important;
      span {
        color: #2e97f4 !important;
      }
    }
    .product-key {
      border-bottom: none;
      text-transform: unset !important;
      color: black !important;
      span:first-child {
        color: #2e97f4 !important;
      }
    }
  }
}
.description {
  .description-title {
    font-size: 1.2em;
    font-weight: 700;
    border: none;
  }
  .description-content {
    border-bottom: none;
    text-transform: unset !important;
    color: black !important;
  }
}
.v-application .py-12 {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.text-center {
  float: right !important;
}
.comment-title {
  font-size: 1.2em;
  font-weight: 700;
  border: none;
}
// .slides:hover .slide {
//   transition: scale(1.2) !important;
// }
.v-carousel {
  max-width: 370px !important;
  max-height: 370px !important;
  width: 370px !important;
  height: 370px !important;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 4px;
}
.product_img {
  max-height: 100%;
  height: auto;
  max-width: 100%;
  width: 100%;
  object-position: center !important;
  object-fit: cover;
  transition: 0.5s;
}
.image:hover .product_img {
  transform: scale(1.1) !important;
}

.gallery {
  position: fixed;
  width: 100vw !important;
  height: 100vh !important;
  background-color: rgb(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 1;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.8);
  transition: 0.5s;
}
.gallery_inner {
  display: flex;
  align-items: center;
  margin: 0 auto;
  // img {
  //   margin: 0 auto;
  //   height: auto;
  //   width: 70%;
  // }
  .img_gallery {
    height: 70vh !important;
    width: 40vw !important;
    background-size: 40vw 70vh;
  }
}
.show {
  opacity: 1;
  pointer-events: auto;
  transform: scale(1);
}
.close {
  position: fixed;
  top: 20px;
  right: 20px;
  color: white !important;
}
.pre {
  position: fixed;
  left: 20px;
}
.next {
  position: fixed;
  right: 20px;
}
</style>
