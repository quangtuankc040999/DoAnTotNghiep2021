<template>
  <div>
    <navigation />
    <div class="home-container">
      <div class="grid-img">
        <div class="div-1">
          <div class="title">
            <h6>-GAN CUBE-</h6>
            <h4>GAN 251 M PRO 2×2 (LEAP)</h4>
            <button @click="getProductsById('61dd3be18cc285a4e1d3f707')">
              MUA NGAY
            </button>
          </div>
        </div>
        <div class="div-2">
          <div class="action">
            <span>RUBIK 4x4</span>
            <button
              @click="
                getProductsByCategoryDetail('Rubik Tiêu Chuẩn', 'Rubik 4x4')
              "
            >
              XEM NGAY
            </button>
          </div>
        </div>
        <div class="div-3">
          <div class="div3-1">
            <div class="action">
              <span>BIẾN THỂ</span>
              <button @click="getProductsByCategoryName('Rubik Biến Thể')">
                XEM NGAY
              </button>
            </div>
          </div>
          <div class="div3-2">
            <div class="action">
              <span>PHỤ KIỆN</span>
              <button @click="getProductsByCategoryName('Phụ kiện')">
                XEM NGAY
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="new-products" style="">
        <p>Hàng mới lên kệ</p>
        <VueSlickCarousel v-bind="settings" v-if="productInfor">
          <product
            v-for="(product, index) in productInfor"
            :key="index"
            :product="product"
            :indexProduct="index"
            class="product"
          />
        </VueSlickCarousel>
      </div>
      <div class="hot-saler">
        <p>Hàng bán chạy</p>
        <VueSlickCarousel v-bind="settings" v-if="productInfor">
          <product
            v-for="(product, index) in productInfor"
            :key="index"
            :product="product"
            :indexProduct="index"
            class="product"
          />
        </VueSlickCarousel>
      </div>
      <div class="discounting">
        <p>Hàng đang giảm giá!!!</p>
        <VueSlickCarousel v-bind="settings" v-if="productInfor">
          <product
            v-for="(product, index) in productInfor"
            :key="index"
            :product="product"
            :indexProduct="index"
            class="product"
          />
        </VueSlickCarousel>
      </div>
      <div class="new-posts"></div>
    </div>
    <footerRubik />
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import FooterRubik from "../components/Footer.vue";
import VueSlickCarousel from "vue-slick-carousel";
import Product from "../components/Products/ProductCard.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    Navigation,
    FooterRubik,
    VueSlickCarousel,
    Product,
  },
  data() {
    return {
      settings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              initialSlide: 3,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "USER/userInfo",
      userInfoAuth: "AUTH/userInfo",
      productInfor: "PRODUCTS/productInfor",
    }),
  },
  methods: {
    ...mapActions({
      getAllProduct: "PRODUCTS/getAllProduct",
      getUserByToken: "AUTH/getUserByToken",
      getProductCart: "CART/userProductCart",
    }),
    getProductsByCategoryDetail(category, categoryDetail) {
      this.$router.push(`/products/${category}/${categoryDetail}`);
    },
    getProductsByCategoryName(category) {
      this.$router.push(`/products/${category}`);
    },
    getProductsById(productId) {
      this.$router.push(`/products/product-detail/${productId}`);
    },
  },
  created() {
    this.getUserByToken();
    this.getProductCart(this.userInfoAuth._id);
    this.getAllProduct();
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  margin: 0 auto;
  width: 80% !important;
  .grid-img {
    display: flex;
    justify-content: center;
    height: 610px;
    border-bottom: 3px solid rgba(177, 171, 171, 0.5);
    .div-1,
    .div-2,
    .div-3 {
      margin: 15px;
      height: 580px;
      background-size: cover;
      background-position: center;
    }
    .div-2,
    .div3-1,
    .div3-2 {
      position: relative;
      .action {
        width: 100%;
        position: absolute;
        top: 65%;
        display: flex;
        flex-direction: column;
        text-align: center;

        align-items: center;
        color: white !important;
        font-weight: 700 !important;
        span {
          font-size: 1.5rem;
          margin: 5px;
        }
        button {
          border: 1px solid rgb(255, 255, 255);
          width: 40%;
          padding: 5px;
        }
        button:hover {
          background-color: rgba(253, 253, 253, 0.8);
          color: rgba(36, 34, 34, 0.7);
        }
      }
    }
    .div-1 {
      width: 40%;
      background-image: linear-gradient(
          rgba(255, 255, 255, 0.5),
          rgba(100, 84, 84, 0.3)
        ),
        url("https://thegioirubik.com/wp-content/uploads/2020/01/Gan-XS-3.jpg");
      position: relative;
      .title {
        padding-top: 10px;
        background-color: #ece3e3;
        height: 115px;
        text-align: center;
        font-weight: 700;
        color: #dd9933 !important;
        position: absolute;
        width: 100%;
        z-index: 100;
        top: 70%;
        button:hover {
          text-decoration: underline;
          font-size: 18px;
        }
      }
    }
    .div-2 {
      width: 25%;
      background-image: linear-gradient(
          rgba(255, 255, 255, 0.5),
          rgba(100, 84, 84, 0.3)
        ),
        url("https://thegioirubik.com/wp-content/uploads/2019/07/Valk-4M-1-1024x1024.jpg");
    }
    .div-3 {
      width: 20%;
      .div3-1 {
        height: 48%;
        margin-bottom: 10px;
        background-size: cover;
        background-position: center;
        background-image: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(100, 84, 84, 0.3)
          ),
          url("https://thegioirubik.com/wp-content/uploads/2019/09/Bandaged-Sun-Cybe-1.jpg");
      }
      .div3-2 {
        height: 50%;
        background-size: contain;
        background-position: center;
        margin-top: 10px;
        background-image: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(100, 84, 84, 0.3)
          ),
          url("https://thegioirubik.com/wp-content/uploads/2017/06/Speedstack-Timer-Gen-Pro4-bag-Túi-2.jpg");
      }
    }
  }
  .new-products,
  .hot-saler,
  .discounting {
    margin-top: 30px !important;
    text-align: center;
    width: 95%;
    margin: 0 auto;
    p {
      font-size: 1.1rem !important;
      font-weight: 700;
      color: #dd9933 !important;
      border: none;
      margin-bottom: 10px;
    }
  }
}
</style>
<style>
.slick-arrow:before,
.slick-prev:before {
  color: rgb(175, 175, 175) !important;
}
</style>
