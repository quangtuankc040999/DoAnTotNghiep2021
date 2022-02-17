<template>
  <!-- <div>
      <navigation/>
       <div class="container">
      <side-bar-admin class="side-bar" />
      <router-view/>
    </div>
  </div> -->
  <div class="admin-page">
    <side-bar-admin  class="side-bar" />
    <div class="content">
      <!-- <navigation class="nav" /> -->
      <router-view class="main-container" />
    </div>
  </div>
</template>

<script>
// import Navigation from "../../components/Admin/NavigationAdmin.vue";
// import FooterRubik from '../../components/Footer.vue';
import sideBarAdmin from "../../components/Admin/SidebarAdmin.vue";

export default {
  name: "Admin",
  components: {
    // Navigation,
    // FooterRubik,
    sideBarAdmin,
  },
};
</script>


<style lang="scss" scoped>
.admin-page {
  display: flex;
  .content {
    width: 97% !important;
  }
}
.side-bar{
   height: calc(100vh ) !important;
  letter-spacing: 2px !important;
  margin: 0 5px;
}
.main-container {
  background-color: rgb(247, 248, 251);
}

</style>