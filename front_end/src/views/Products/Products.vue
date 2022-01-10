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
    }),
  },
  created() {
    this.getUserByToken();
  },
};
</script>

<style scoped>
.container{
display: flex;
width: 85% !important;
}
.side-bar{
  width: 30%;
}
.list-product{
  width: 65%;
}
</style>

