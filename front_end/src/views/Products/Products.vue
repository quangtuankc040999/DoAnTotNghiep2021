<template>
  <div>
    <navigation />
    <div class="container">
      <side-bar class="side-bar" />
      <router-view class="infor" />
    </div>
    <footer-rubik />
  </div>
</template>

<script>
import Navigation from "../../components/Navigation.vue";
import FooterRubik from "../../components/Footer.vue";
import SideBar from "../../components/Products/SideBar.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Product",
  components: {
    Navigation,
    FooterRubik,
    SideBar,
    // ListProduct,
  },
  computed: {
    ...mapGetters({
      userInfoAuth: "AUTH/userInfo",
    }),
  },

  methods: {
    ...mapActions({
      getUserByToken: "AUTH/getUserByToken",
      getProductCart: "CART/userProductCart",
    }),
  },
  created() {
    this.getUserByToken();
    this.getProductCart(this.userInfoAuth._id);
  },
};
</script>

<style scoped>
.container {
  width: 80% !important;
  display: flex;
}
.side-bar {
  margin: 0 20px 0 0;
  width: 20%;
}
.infor{
  width: 70% !important;
}
</style>

