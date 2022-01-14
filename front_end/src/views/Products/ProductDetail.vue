<template>
  <div class="product-detail">
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
              v-for="(img, i) in productInfor[index].image"
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
          <router-link :to="`/products/${productInfor[index].category_name}`"
            >{{ productInfor[index].category_name }}
          </router-link>
          <span> / </span>
          <router-link
            :to="`/products/${productInfor[index].category_name}/${productInfor[index].category_detail}`"
            >{{ productInfor[index].category_detail }}
          </router-link>
        </div>
        <p class="title">{{ productInfor[index].title }} </p>
        <div class="price">
          <h4>{{ formatPrice(productInfor[index].sale_price) }}</h4>
          <div class="discount" v-if="productInfor[index].discount > 0">
            <h6 class="old-price">
              {{ formatPrice(productInfor[index].starting_price) }}
            </h6>
            <h6 class="discount-persent">
              -{{ productInfor[index].discount }}%
            </h6>
          </div>
        </div>
        <div class="action-buy">
          <v-card flat class="py-12">
            <v-card-text>
              <v-row align="center" justify="center">
                <v-btn-toggle v-model="toggle_exclusive" mandatory>
                  <v-btn> - </v-btn>
                  <v-btn> + </v-btn>
                </v-btn-toggle>
              </v-row>
            </v-card-text>
          </v-card>
          <div class="select-btn">
            <v-btn class="btn-add-cart" color="primary"> MUA HÀNG </v-btn>
          </div>
        </div>
        <p class="danh-muc">
          <span>Danh mục: </span> {{ productInfor[index].category_name }},{{
            productInfor[index].category_detail
          }}
        </p>
        <p class="product-key">
          <span>Từ khoá: </span>
          <span v-for="i in productInfor[index].product_key" v-bind:key="i"
            >{{ i }},
          </span>
        </p>
      </div>
    </div>
    <div class="description">
      <p class="description-title">description</p>
      <p class="description-content">{{ productInfor[index].description }}</p>
    </div>
  </div>
</template>
<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      index: localStorage.getItem("index"),
    };
  },
  computed: {
    ...mapGetters({
      productInfor: "PRODUCTS/productInfor",
    }),
  },
  methods: {
    ...mapActions({
      getProductInforAction: "PRODUCTS/getProduct",
    }),
    getProductInfor(productId) {
      this.getProductInforAction(productId);
    },
    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
  },
};
</script>

<style lang="scss" scoped>
.vueperslide--loading .vueperslide__content-wrapper {
  display: none !important;
}
.product-detail {
  width: 100%;
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
    padding-top: 20px ;
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
    .action-buy {
      display: flex;
      align-self: center;
      .select-btn {
        display: flex;
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
    font-size: 1.4em;
    font-weight: 700;
  }
  .description-content {
    border-bottom: none;
    text-transform: unset !important;
    color: black !important;
  }
}
</style>
