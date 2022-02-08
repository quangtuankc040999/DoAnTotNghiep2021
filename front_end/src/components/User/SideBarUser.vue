<template>
  <div class="sidebar-user">
    <ul>
      <li @click="manageOrder()">
        <v-icon>mdi-content-paste </v-icon>Quản lý đơn hàng
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    manageOrder() {
      this.$router.push(`/profile/user/manage-order/`);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>