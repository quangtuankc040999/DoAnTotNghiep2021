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
    <div class="empty" v-else>
      <img
        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png"
      />
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
  data() {
    return {
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
      getAllProductPaginationAction: "PRODUCTS/getAllProductPagination",
      getProductsByCategoryNameAction: "PRODUCTS/getProductByCategoryName",
      getProductByCategoryDetailAction: "PRODUCTS/getProductByCategoryDetail",
    }),
  },
  created() {
    this.getAllProductPaginationAction({ page: 1 });
    if (this.$route.params.categoryName) {
      this.getProductsByCategoryNameAction({
        category: this.$route.params.categoryName,
        page: 1,
      });
      if (this.$route.params.categoryDetail) {
        this.getProductByCategoryDetailAction({
          category: this.$route.params.categoryName,
          categoryDetail: this.$route.params.categoryDetail,
          page: 1,
        });
      }
    }
  },
  watch: {
    page() {
      if (this.$route.params.categoryName) {
        this.getProductsByCategoryNameAction({
          category: this.$route.params.categoryName,
          page: this.page,
        });
        if (this.$route.params.categoryDetail) {
          this.getProductByCategoryDetailAction({
            category: this.$route.params.categoryName,
            categoryDetail: this.$route.params.categoryDetail,
            page: this.page,
          });
        }
      } else {
        this.getAllProductPaginationAction({ page: this.page });
      }
    },
    $route() {
      if (this.$route.params.categoryName) {
        this.getProductsByCategoryNameAction({
          category: this.$route.params.categoryName,
          page: 1,
        });
        if (this.$route.params.categoryDetail) {
          this.getProductByCategoryDetailAction({
            category: this.$route.params.categoryName,
            categoryDetail: this.$route.params.categoryDetail,
            page: 1,
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
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