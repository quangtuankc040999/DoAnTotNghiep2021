
  <template>
  <div class="list-product" v-if="productInfor">
    <div class="products" v-if="productInfor.length > 0">
      <div class="pro">
        <product
          v-for="(product, index) in productInfor"
          :key="index"
          :product="product"
          :indexProduct="index"
          class="product"
        />
      </div>

      <v-pagination
        v-if="numberPages > 1"
        class="pagination"
        v-model="page"
        :length="numberPages"
        circle
      ></v-pagination>
    </div>
    <div class= "empty" v-else>
      <img
        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png"
      />
      Rất tiếc không có sản phẩm nào thỏa điều kiện tìm kiếm
    </div>
  </div>
</template>
<script>
import Product from "../../components/Products/ProductCard.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { Product },
  data() {
    return {
      minPrice: 0,
      maxPrice: 0,
      page: 1,
    };
  },
  computed: {
    ...mapGetters({
      productInfor: "PRODUCTS/productInfor",
      numberRecords: "PRODUCTS/numberRecords",
      numberPages: "PRODUCTS/numberPages",
    }),
  },
  methods: {
    ...mapActions({
      getAllProductByPriceAction: "PRODUCTS/getAllProductByPrice",
    }),
  },
  created() {
    this.minPrice = this.$route.query.min_price;
    this.maxPrice = this.$route.query.max_price;
    this.getAllProductByPriceAction({
      page: 1,
      body: { minPrice: this.minPrice, maxPrice: this.maxPrice },
    });
  },
  watch: {
    page() {
      this.getAllProductByPriceAction({
        page: this.page,
        body: { minPrice: this.minPrice, maxPrice: this.maxPrice },
      });
    },
    $route() {
      this.minPrice = this.$route.query.min_price;
      this.maxPrice = this.$route.query.max_price;
      this.getAllProductByPriceAction({
        page: 1,
        body: { minPrice: this.minPrice, maxPrice: this.maxPrice },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.empty{
  display: flex;
  flex-direction: column;
  align-items: center;
  img{
    height: 200px;
    width: 200px;
  }
}
.pagination {
  margin-top: 100px;
}
.list-product {
  margin-bottom: 80px;
  margin-top: 34px;
  .products {
    .pro {
      display: grid;
      // margin: 0 auto;
      grid-template: 1fr / 1fr 1fr 1fr;
      grid-gap: 50px;
      grid-row-gap: 80px;
      width: 100%;
      .product {
        height: 350px;
        width: 25%;
      }
    }
  }
}
</style>