<template>
  <div>
      <navigation/>
        Profile
      <footer-rubik/>
  </div>
</template>

<script>
import Navigation from '../../components/Navigation.vue';
import FooterRubik from '../../components/Footer.vue'
export default {
  name: 'Profile',
  components: {
    Navigation,
    FooterRubik
  },

}
</script>

<style>

</style>