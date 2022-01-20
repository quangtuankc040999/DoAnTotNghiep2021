<template>
  <div>
      <navigation/>
      home
      <footerRubik/>
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue';
import FooterRubik from '../components/Footer.vue';
import { mapActions,mapGetters } from 'vuex';
export default {
  name: 'Home',
  components: {
    Navigation,
    FooterRubik,
  },
   computed: {
    ...mapGetters({
      userInfo: "USER/userInfo",
      userInfoAuth: "AUTH/userInfo",
    }),
  },
  methods: {
    ...mapActions({
      getUserByToken: 'AUTH/getUserByToken',
      getProductCart: 'CART/userProductCart'
    })
  },
   created() {
    this.getUserByToken();
    this.getProductCart(this.userInfoAuth._id)
  },

}
</script>

<style>

</style>
