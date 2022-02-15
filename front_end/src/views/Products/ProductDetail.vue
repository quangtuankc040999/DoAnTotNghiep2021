<template>
  <div class="product-detail" v-if="productById">
    <div class="container-product">
      <div class="list-img">
        <div class="img">
          <vueper-slides
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
              <template #loader>
                <i class="icon icon-loader spinning"></i>
                <span>Loading...</span>
              </template>
            </vueper-slide>
          </vueper-slides>
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
      <p class="description-content">{{ productById.description }}</p>
    </div>
    <p style="font-size: 1.2em; font-weight: 700; border: none">
      Đánh giá sản phẩm
    </p>

    <div v-if="listCommentProduct">
      <div v-if="listCommentProduct.length > 0">
        <div class="star-total">
          <div class="div1">
            <AwesomeVueStarRating
              :star="Math.round(totalStar(listCommentProduct))"
              :disabled="this.disabled"
              :maxstars="this.maxstars"
              :starsize="this.starsize"
              :hasresults="this.hasresults"
              :hasdescription="this.hasdescription"
            />
            <span
              >{{ Math.round(totalStar(listCommentProduct) * 100) / 100 }} trên
              5</span
            >
          </div>
          <span>(Có {{ listCommentProduct.length }} đánh giá)</span>
        </div>
        <comment-item
          v-for="(comment, index) in listCommentProduct"
          :key="index"
          :comment="comment"
          :indexComment="index"
          class="comment"
        />
      </div>
      <div v-else>Chưa có đánh giá</div>
    </div>

    
  </div>
</template>
<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import { mapActions, mapGetters } from "vuex";
import commentItem from "../../components/Products/CommentItem.vue";
import AwesomeVueStarRating from "awesome-vue-star-rating";
export default {
  components: {
    VueperSlides,
    VueperSlide,
    commentItem,
    AwesomeVueStarRating,
  },
  data() {
    return {
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
      productCarts: "CART/productCart",
    }),
  },
  methods: {
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
        this.pushProductToCartAction(product); // ham nay da thay doi cai state roi
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
    this.getProductCartOfUserAction(this.userInfoAuth._id);
    this.getProductInforAction(this.$route.params.id);
    this.getCommentProductByIdProductAction(this.$route.params.id);
  },
  watch: {
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
p {
  font-size: 1rem;
  font-family: "Open Sans", sans-serif !important;
  color: #2e97f4 !important;
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
  width: 370px;
  height: 410px;
}
.container-product {
  display: flex;
  width: 100%;
  .product-infor {
    padding-top: 20px;
    margin-left: 40px;
    width: 50%;
    .category {
      font-family: "Open Sans", sans-serif !important;
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
      font-family: "Open Sans", sans-serif;
      font-size: 1.7em;
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
          font-size: 1em;
          opacity: 0.5;
          font-weight: lighter !important;
        }
        .discount-persent {
          color: rgb(134, 10, 10);
          border: 1px rgb(59, 1, 1) solid;
          padding: 1px;
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
</style>
