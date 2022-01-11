<template>
  <div class="list-product">
    <div class="products" v-if="productInfor.length > 0">
      <product
        v-for="(product, index) in productInfor"
        :key="index"
        :product="product"
        :indexProduct="index"
        class="product"
      />
    </div>
    <div class="products" v-else>
      Rất tiếc không có sản phẩm nào thỏa điều kiện tìm kiếm
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Product from "../Products/ProductCard.vue";
export default {
  components: {
    Product,
  },
  computed: {
    ...mapGetters({
      productInfor: "PRODUCTS/productInfor",
    }),
  },
};
</script>

<style lang="scss" scoped>
.list-product {
  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .product {
      height: 350px;
      width: 25%;
      margin: 15px;
    }
  }
}
</style>