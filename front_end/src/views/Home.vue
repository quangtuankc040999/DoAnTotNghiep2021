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
export default {
  name: 'Home',
  components: {
    Navigation,
    FooterRubik,
  },

}
</script>

<style>

</style>
