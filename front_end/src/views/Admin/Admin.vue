<template>
  <div>
      <navigation/>
       <div class="container">
      <side-bar-admin class="side-bar" />
      <router-view/>
    </div>
      <footerRubik/>
  </div>
</template>

<script>
import Navigation from '../../components/Navigation.vue';
import FooterRubik from '../../components/Footer.vue';
import sideBarAdmin from '../../components/Admin/SidebarAdmin.vue'

export default {
  name: 'Admin',
  components: {
    Navigation,
    FooterRubik,
    sideBarAdmin
  },

}
</script>

<style lang="scss" scoped>
.container {
  max-width: 90% !important;
  width: 80% !important;
  display: flex;
  justify-content: center;
  width: 80% !important;
}
.side-bar {
  margin: 0 20px 0 0;
  width: 20%;
}
</style>