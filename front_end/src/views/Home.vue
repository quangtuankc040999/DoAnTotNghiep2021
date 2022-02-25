<template>
  <div>
    <navigation class="navigation" />
    <div class="ad">
      <v-carousel hide-delimiters>
        <v-carousel-item
          v-for="(item, i) in listAds"
          :key="i"
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
          <advertisement :url="item.adBanner" :linkBlog="item.linkBlog"/>
        </v-carousel-item>
      </v-carousel>
    </div>
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
      <div class="hot-saler">
        <p>Hàng bán chạy</p>
        <VueSlickCarousel v-bind="settings" v-if="productInfor.length">
          <product
            v-for="(product, index) in productInfor"
            :key="index"
            :product="product"
            :indexProduct="index"
            class="product-item"
          />
        </VueSlickCarousel>
      </div>
      <div class="new-posts"></div>
    </div>
    <div class="foot">
      <div class="why-rubik">
        <why-rubik />
      </div>
      <div class="contact-us">
        <contact-us />
      </div>
    </div>
    <footerRubik />
  </div>
</template>

<script>
import Advertisement from "../components/Advertisement/Advertisement.vue";
import WhyRubik from "../components/Home/why-rubik/Why-rubik.vue";
import ContactUs from "../components/Home/contact/Contact.vue";
import Navigation from "../components/Navigation.vue";
import FooterRubik from "../components/Footer.vue";
import VueSlickCarousel from "vue-slick-carousel";
import Product from "../components/Products/ProductCard.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    Advertisement,
    ContactUs,
    WhyRubik,
    Navigation,
    FooterRubik,
    VueSlickCarousel,
    Product,
  },
  data() {
    return {
      items: [
        {
          src: "https://www.gancube.com/wp-content/uploads/2021/09/Lark20210924-212043.jpg",
        },
        {
          src: "https://www.gancube.com/wp-content/uploads/2021/12/20211211-101245.jpg",
        },
        {
          src: "http://en.qiyitoys.net/images/l/page_index/1628581612Spy4.jpg",
        },
      ],
      settings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
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
      listAds: "BLOGS/listAds"
    }),
  },
  methods: {
    ...mapActions({
      getAllProduct: "PRODUCTS/getAllProduct",
      getUserByToken: "AUTH/getUserByToken",
      getProductCart: "CART/userProductCart",
      getUserAction: "USER/getUser",
      getAdsAction: "BLOGS/getAds"
    }),
    getProductsByCategoryDetail(category, categoryDetail) {
      this.$router.push(`/products/list-detail/${category}/${categoryDetail}`);
    },
    getProductsByCategoryName(category) {
      this.$router.push(`/products/list/${category}`);
    },
    getProductsById(productId) {
      this.$router.push(`/products/product-detail/${productId}`);
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      this.getUserByToken();
    }
    if (this.userInfoAuth) {
      this.getUserAction(this.userInfoAuth._id);
      this.getProductCart(this.userInfoAuth._id);
    }
    this.getAllProduct();
    this.getAdsAction();
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  margin: 0 auto;
  width: 100% !important;
  .grid-img {
    display: flex;
    justify-content: center;
    height: 610px;
    width: 80% !important;
    margin: 15px auto;
    margin-bottom: 0px;

    .div-1,
    .div-2,
    .div-3 {
      margin: 5px;
      height: 500px;
      background-size: cover;
      background-position: center;
    }
    .div-2 {
      .action {
        top: 75%;
      }
    }
    .div3-1,
    .div3-2 {
      .action {
        top: 55%;
      }
    }
    .div-2,
    .div3-1,
    .div3-2 {
      position: relative;
      .action {
        width: 100%;
        position: absolute;
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
          rgba(255, 255, 255, 0.3),
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
      width: 30%;
      background-image: linear-gradient(
          rgba(255, 255, 255, 0.3),
          rgba(100, 84, 84, 0.3)
        ),
        url("https://thegioirubik.com/wp-content/uploads/2019/07/Valk-4M-1-1024x1024.jpg");
    }
    .div-3 {
      width: 25%;
      .div3-1 {
        height: 48%;
        margin-bottom: 10px;
        background-size: cover;
        background-position: center;
        background-image: linear-gradient(
            rgba(255, 255, 255, 0.3),
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
            rgba(255, 255, 255, 0.3),
            rgba(100, 84, 84, 0.3)
          ),
          url("https://thegioirubik.com/wp-content/uploads/2017/06/Speedstack-Timer-Gen-Pro4-bag-Túi-2.jpg");
      }
    }
  }
  .new-products,
  .hot-saler,
  .discounting {
    margin-top: 10px !important;
    text-align: center;
    width: 80%;
    margin: 0 auto !important;
    height: 550px !important;
    p {
      font-size: 1.5rem !important;
      font-weight: 700;
      color: #dd9933 !important;
      border: none;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
  }
  .product-item {
  }
}
.foot {
  width: 100% !important;
  position: relative;
  margin-bottom: 775px;
  .contact-us {
    position: absolute;
    top: 423px;
    right: 0;
    left: 0;
  }
}
</style>
<style>
.slick-arrow:before,
.slick-prev:before {
  color: rgb(175, 175, 175) !important;
}
</style>
