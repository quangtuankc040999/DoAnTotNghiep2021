<template>
  <div class="product-card">
    <div class="container">
      <div class="out-of-stock" v-if="product.inventory == 0">
        <span>Hết hàng</span>
      </div>
      <div class="img" style="position: relative">
        <b-carousel
          id="carousel-1"
          :interval="4000"
          controls
          md
          label-next=""
          label-prev=""
          style="width: 100%; height: 300px; position: relative"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide
            style="position: relative"
            v-for="(i, index) in product.image"
            :key="index"
          >
            <template #img>
              <img class="d-block img-fluid" :src="i" alt="image slot" />
            </template>
          </b-carousel-slide>
        </b-carousel>
        <v-btn text class="btn-add-cart" @click="viewProductDetail">
          XEM CHI TIẾT
        </v-btn>
      </div>

      <div class="product">
        <div class="product-infor">
          <div class="name">
            <h3 @click="viewProductDetail">{{ product.title }}</h3>
            <h6>{{ product.category_name }}</h6>
          </div>
        </div>
        <div class="product-price">
          <h4>{{ formatPrice(product.sale_price) }}</h4>
          <div class="discount" v-if="product.discount > 0">
            <h6 class="old-price">
              {{ formatPrice(product.starting_price) }}
            </h6>
            <!-- <h6 class="discount-persent">-{{ product.discount }}%</h6> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product", "indexProduct"],
  components: {},
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    viewProductDetail() {
      localStorage.setItem("index", this.indexProduct);
      localStorage.setItem("productID", this.product._id);
      this.$router.push(`/products/product-detail/${this.product._id}`);
    },
  },
};
</script> 

<style lang="scss" scoped>
@import "../../assets/style.scss";
.product-card {
}
.container {
  &:hover {
    transform:  scale(1.1);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  margin: 0 auto;
  font-weight: 300;
  text-transform: uppercase;
  padding: 0;
  height: 400px;
  width: 300px;
  margin-bottom: 50px;
  position: relative;
  .out-of-stock {
    display: flex;
    justify-content: center;
    align-content: center;
    color: white;
    font-weight: 700;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 100;
    background-color: rgba(56, 51, 51, 0.3);
    span {
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  .img {
    opacity: 1;
    img {
      max-height: 100%;
      max-width: 100%;
      border: 2px rgba(212, 208, 208, 0.4) solid;
      border-radius: 5px;
    }
  }
  .product {
    height: 100px;
  }
  .product-infor {
    margin-top: 10px;
    h6 {
      color: #a5a5a5;
      opacity: 0.9;
      font-size: 0.7em;
      text-align: center;
    }
    h3 {
      font-weight: 600;
      color: #000000;
      font-size: 17px;
      text-align: center;
      cursor: pointer;
    }
  }
  .product-price {
    text-align: center;
    display: flex;
    justify-content: space-evenly;
    width: 80%;
    margin: 0 auto;
    h4 {
      font-weight: 700;
      font-size: 1.1em;
    }
    .discount {
      display: flex;
      flex-direction: row;
      justify-content: center;
      text-align: center;
      .old-price {
        text-decoration: line-through;
        font-size: 0.9em;
        opacity: 0.6;
        font-weight: lighter !important;
      }
    }
  }
  .select-btn {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
  }
  .v-btn {
    margin: 0 auto !important;
    border-radius: 0 !important;
    padding: 25px 35px !important;
    position: absolute;
    bottom: 5.5px;
    left: 62px;
    background-color: $color;
    color: white;
    font-weight: 600 !important;
    opacity: 0;
  }
  .img:hover .v-btn {
    opacity: 1;
  }
  .img:hover img {
    opacity: 0.6;
  }
}
</style>
<style scoped>
</style>