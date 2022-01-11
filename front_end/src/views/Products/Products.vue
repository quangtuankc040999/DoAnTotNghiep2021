<template>
  <div>
    <navigation />
    <div class="container">
      <side-bar class="side-bar" />
      <list-product class="list-product" />
    </div>
    <footer-rubik />
  </div>
</template>

<script>
import Navigation from "../../components/Navigation.vue";
import FooterRubik from "../../components/Footer.vue";
import SideBar from "../../components/Products/SideBar.vue";
import ListProduct from "../../components/Products/ListProduct.vue";
import { mapActions } from "vuex";
export default {
  name: "Product",
  components: {
    Navigation,
    FooterRubik,
    SideBar,
    ListProduct,
  },
  methods: {
    ...mapActions({
      getUserByToken: "AUTH/getUserByToken",
      getAllProduct: "PRODUCTS/getAllProduct",
    }),
  },
  created() {
    this.getUserByToken();
    this.getAllProduct();
  },
};
</script>

<style scoped>
.container {
  max-width: 90% !important;
  display: flex;
  justify-content: center;
  width: 80% !important;
}
.side-bar {
  margin: 0 20px 0 0;
  width: 20%;
}
.list-product {
  width: 70%;
}
</style>

