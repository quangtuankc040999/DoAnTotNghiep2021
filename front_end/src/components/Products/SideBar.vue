<template>
  <div class="side-bar">
    <p>LỌC SẢN PHẨM THEO GIÁ</p>
    <div class="get-border"></div>
    <!-- <vue-range-slider
      ref="slider"
      :tooltip="'hover'"
      :min="0"
      :max="2000000"
      :step="10000"
      v-model="dots"
    ></vue-range-slider> -->
    <v-range-slider max="2000000" min="0" step="10000" v-model="dots">
    </v-range-slider>

    <div class="view-price">
      <span>Giá: {{ formatPrice(minPrice) }}-{{ formatPrice(maxPrice) }}</span>
    </div>
    <v-btn @click="toFilter">LỌC</v-btn>

    <p class="danh-muc">DANH MỤC SẢN PHẨM</p>
    <div class="get-border"></div>
    <v-list class="list-category">
      <v-list-group
        v-for="(category, index) in categoryInfor"
        :key="index"
        no-action
        class="category"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title
              @click="getProductsByCategoryName(category.name)"
            >
              {{ category.name }}
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item-group class="pl-10">
          <v-list-item
            v-for="(categoryDetail, index) in category.categoryDetails"
            :key="index"
            link
            class="category-detail"
            @click="getProductsByCategoryDetail(category.name, categoryDetail)"
          >
            <v-list-item-title style="font-size: 0.7rem">
              {{ categoryDetail }}</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list-group>
    </v-list>
    <p class="danh-muc">LỌC THEO HÃNG</p>
    <div class="get-border"></div>
    <div class="brand">
      <table>
        <tr>
          <td><input type="radio" id="Gan" value="Gan" v-model="brand" /></td>
          <td><label for="Gan">Gan</label></td>
          <td>
            <input type="radio" id="DaYan" value="DaYan" v-model="brand" />
          </td>
          <td><label for="DaYan">DaYan</label></td>
        </tr>
        <tr>
          <td><input type="radio" id="QiYi" value="QiYi" v-model="brand" /></td>
          <td><label for="QiYi">QiYi</label></td>
          <td>
            <input type="radio" id="Yuxin" value="Yuxin" v-model="brand" />
          </td>
          <td><label for="QiYi">Yuxin</label></td>
        </tr>
        <tr>
          <td><input type="radio" id="MoYu" value="MoYu" v-model="brand" /></td>
          <td><label for="MoYu">MoYu</label></td>
          <td>
            <input type="radio" id="Rubik's" value="Rubik's" v-model="brand" />
          </td>
          <td><label for="Rubik's">Rubik's</label></td>
        </tr>
      </table>
      <v-btn @click="toFilterBrand">LỌC</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dots: [0, 2000000],
      minPrice: 0,
      maxPrice: 2000000,
      brand: "",
    };
  },
  computed: {
    ...mapGetters({
      categoryInfor: "SIDEBAR/categoryInfo",
    }),
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    ...mapActions({
      getCategoryInfor: "SIDEBAR/getCategory",
      // getProductsByCategoryNameAction: "PRODUCTS/getProductByCategoryName",
      // getProductByCategoryDetailAction: "PRODUCTS/getProductByCategoryDetail",
    }),
    getProductsByCategoryName(category) {
      // this.getProductsByCategoryNameAction(category);
      this.$router.push(`/products/list/${category}`);
    },
    getProductsByCategoryDetail(category, categoryDetail) {
      // this.getProductByCategoryDetailAction({
      //   category: category,
      //   categoryDetail: categoryDetail,
      // });
      this.$router.push(`/products/list-detail/${category}/${categoryDetail}`);
    },
    toFilter() {
      this.$router.push({
        path: `/filter/price/`,
        query: { min_price: this.minPrice, max_price: this.maxPrice },
      });
    },
    toFilterBrand() {
      this.$router.push({
        path: `/filter/brand/`,
        query: { brand: this.brand },
      });
    },
  },
  created() {
    this.getCategoryInfor();
  },
  watch: {
    dots() {
      this.minPrice = this.dots[0];
      this.maxPrice = this.dots[1];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
.v-btn {
  border-radius: 40px;
  color: white !important;
  font-weight: 700;
  margin-top: 10px;
  background-color: $color !important;
}
.category-detail {
}
.side-bar {
}
.v-list-item__title {
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(102, 102, 102, 0.85) !important;
  text-transform: uppercase !important;
}
p {
  font-size: 1rem;
  color: $color !important;
  font-weight: 700;
  text-transform: uppercase !important;
  margin-bottom: 0 !important;
}
.get-border {
  margin-top: 10px;
  height: 0px;
  width: 30px;
  border-bottom: 3px solid rgb(212, 212, 212);
  margin-bottom: 10px;
}
.danh-muc {
  margin-top: 20px;
}
.view-price {
  margin-top: -5px;
  margin-bottom: 5px;
  span {
    width: 100% !important;
    font-size: 0.8em;
    color: $color;
    float: right;
  }
}
.brand {
  table {
    width: 90% !important;
  }
}
</style>
