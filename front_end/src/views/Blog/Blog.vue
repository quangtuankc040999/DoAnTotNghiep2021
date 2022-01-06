<template>
  <div>
      <navigation/>
      Blogs
      <footerRubik/>
  </div>
</template>

<script>
import Navigation from '../../components/Navigation.vue';
import FooterRubik from '../../components/Footer.vue';

export default {
  name: 'Blog',
  components: {
    Navigation,
    FooterRubik,
  },

}
</script>

<style>

</style>