<template>
  <div>
    <navigation />
    <div class="container">
      <side-bar class="side-bar" />
      <router-view/>
    </div>
    <footer-rubik />
  </div>
</template>

<script>
import Navigation from "../../components/Navigation.vue";
import FooterRubik from "../../components/Footer.vue";
import SideBar from "../../components/Products/SideBar.vue";
import { mapActions } from "vuex";
export default {
  name: "Product",
  components: {
    Navigation,
    FooterRubik,
    SideBar,
    // ListProduct,
  },
  methods: {
    ...mapActions({
      getUserByToken: "AUTH/getUserByToken",
      getProductCart: 'CART/userProductCart'

    }),
  },
  created() {
    this.getUserByToken();
    this.getProductCart(this.userInfoAuth._id)

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

