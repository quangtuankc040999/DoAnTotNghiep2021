<template>
  <div>
      <navigation/>
      <side-bar/>
      <footer-rubik/>
  </div>
</template>

<script>
import Navigation from '../../components/Navigation.vue';
import FooterRubik from '../../components/Footer.vue';
import SideBar from '../../components/Products/SideBar.vue';
import { mapActions } from 'vuex';
export default {
  name: 'Product',
  components: {
    Navigation,
    FooterRubik,
    SideBar
  },
  methods: {
    ...mapActions({
      getUserByToken: 'AUTH/getUserByToken',
    })
  },
   created() {
    this.getUserByToken();
  },

}
</script>

<style>

</style>