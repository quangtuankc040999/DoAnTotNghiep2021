<template>
  <div class="product-card">
    <div class="container">
      <div class="out-of-stock" v-if="product.inventory == 0">
        <span>Hết hàng</span>
      </div>
      <div class="img">
        <b-carousel
          id="carousel-1"
          :interval="4000"
          controls
          md
          label-next=""
          label-prev=""
          style="width: 100%; height: 200px"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide v-for="(i, index) in product.image" :key="index">
            <template #img>
              <img class="d-block img-fluid" :src="i" alt="image slot" />
            </template>
          </b-carousel-slide>
        </b-carousel>
      </div>
      <div class="product">
        <div class="product-infor">
          <div class="name">
            <h6>{{ product.category_name }}</h6>
            <h3 @click="viewProductDetail">{{ product.title }}</h3>
          </div>
        </div>
        <div class="product-price">
          <h4>{{ formatPrice(product.sale_price) }}</h4>
          <div class="discount" v-if="product.discount > 0">
            <h6 class="old-price">
              {{ formatPrice(product.starting_price) }}
            </h6>
            <h6 class="discount-persent">-{{ product.discount }}%</h6>
          </div>
        </div>
        <div class="select-btn">
          <button
            class="btn-add-cart"
            @click="viewProductDetail"
          >XEM CHI TIẾT
          </button>
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
.container {
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  padding: 0;
  height: 350px;
  width: 200px;
  border: 3px rgba(212, 208, 208, 0.4) solid;
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
    opacity: 1.2;
  }
  .product {
    height: 100px;
  }
  .product-infor {
    h6 {
      color: #2e97f4;
      opacity: 0.9;
      font-size: 0.7em;
      text-align: center;
    }
    h3 {
      color: #000000;
      font-size: 1em;
      opacity: 0.9;
      text-align: center;
      cursor: pointer;
    }
  }
  .product-price {
    text-align: center;
    h4 {
      font-weight: 700;
      font-size: 1em;
    }
    .discount {
      display: flex;
      flex-direction: row;
      justify-content: center;
      text-align: center;
      .old-price {
        margin-right: 10px;
        text-decoration: line-through;
        font-size: 0.8em;
        opacity: 0.4;
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
  .select-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .btn-add-cart {
      cursor: pointer;
      font-size: 0.7em;
      font-weight: 700;
      background-color: #9e9e9e;
      padding: 5px 10px;
      color: rgb(255, 255, 255, 0.9);
      border-radius: 2px;
    }
    .btn-add-cart:hover {
      background-color: #3d3a3a;
    }
  }
}
</style>