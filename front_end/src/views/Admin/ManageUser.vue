<template>
  <div class="manage-user">
    <sidebar-user/>
  </div>
</template>

<script>
import sidebarUser from '../../components/Admin/ManageUser/SideBarUser.vue'
export default {
  name: "manage-user",
  components: {
    sidebarUser
  },
};
</script>

<style lang="scss" scoped>
.manage-user{
  width: 100%;
}
</style>