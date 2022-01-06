<template>
  <div>
      <navigation/>
      products
      <footer-rubik/>
  </div>
</template>

<script>
import Navigation from '../../components/Navigation.vue';
import FooterRubik from '../../components/Footer.vue'
export default {
  name: 'Product',
  components: {
    Navigation,
    FooterRubik
  },

}
</script>

<style>

</style>