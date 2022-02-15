<template>
  <div class="list-product" v-if="productInfor">
    <div class="products" v-if="productInfor.length > 0">
      <product
        v-for="(product, index) in productInfor"
        :key="index"
        :product="product"
        :indexProduct="index"
        class="product"
      />
    </div>
    <div  v-else>
      Rất tiếc không có sản phẩm nào thỏa điều kiện tìm kiếm
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Product from "../../components/Products/ProductCard.vue";
export default {
  components: {
    Product,
  },
  computed: {
    ...mapGetters({
      productInfor: "PRODUCTS/productInfor",
    }),
  },
  methods: {
    ...mapActions({
      getAllProduct: "PRODUCTS/getAllProduct",
      getProductsByCategoryNameAction: "PRODUCTS/getProductByCategoryName",
      getProductByCategoryDetailAction: "PRODUCTS/getProductByCategoryDetail",
    }),
  },
  created() {
    this.getAllProduct();
    if (this.$route.params.categoryName) {
      this.getProductsByCategoryNameAction(this.$route.params.categoryName);
      if (this.$route.params.categoryDetail) {
        this.getProductByCategoryDetailAction({
          category: this.$route.params.categoryName,
          categoryDetail: this.$route.params.categoryDetail,
        });
      }
    }
  },
  watch: {
    $route() {
      if (this.$route.params.categoryName) {
        this.getProductsByCategoryNameAction(this.$route.params.categoryName);
        if (this.$route.params.categoryDetail) {
          this.getProductByCategoryDetailAction({
            category: this.$route.params.categoryName,
            categoryDetail: this.$route.params.categoryDetail,
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-product {
  .products {
    display: grid;
    grid-template: 1fr 1fr  / 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
    width: 100%;
    .product {
      height: 350px;
      width: 25%;
    }
  }
}
</style>