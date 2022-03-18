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
      getUserAction: "USER/getUser",
    }),
  },
  created() {
    if (localStorage.getItem("token")) {
      this.getUserByToken();
    }
    if (this.userInfoAuth) {
      this.getUserAction(this.userInfoAuth._id);
      this.getProductCart(this.userInfoAuth._id);
    }
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  width: 100% !important;
  display: flex;
  margin: 0 auto;
}
.side-bar {
  margin: 0 4% 0 0;
  width: 20%;
}
.infor {
  width: 76% !important;
}
</style>

