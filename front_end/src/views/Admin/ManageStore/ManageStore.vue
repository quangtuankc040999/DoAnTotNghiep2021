<template>
  <div class="manage-store">
    <sidebar-store class="sidebar-store" />
    <router-view class="main-store"/>
  </div>
</template>

<script>
import SidebarStore from "../../../components/Admin/ManageStore/SidebarStore.vue";
import SibarStoreAdmin from "../../../components/Admin/ManageStore/SidebarStore.vue";
export default {
  components: { SidebarStore },
  component: {
    SibarStoreAdmin,
  },
};
</script>

<style lang="scss" scoped>
.manage-store{
    // display: flex;
    height: 100%;
    .sidebar-store{
      width: 100% !important;
    }
    .main-store{
      width: 100% !important
    }
}
</style>