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
import { mapActions } from 'vuex';
export default {
  name: 'Home',
  components: {
    Navigation,
    FooterRubik,
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
