<template>
  <div class="sidebar-admin">
    Side bar Admin
    <ul>
      <li @click="manageProduct()">Quản lý sản phẩm</li>
      <li @click="manageOrder()">Quản lý đơn hàng</li>
       <li @click="manageUser()">Quản lý Khác hàng</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    manageProduct() {
      this.$router.push(`/admin/manage-product/`);
    },
    manageOrder() {
      this.$router.push(`/admin/manage-order/`);
    },
    manageUser() {
      this.$router.push(`/admin/manage-user/`);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>