<template>
  <div class="sidebar-user">
    <v-card class="mx-auto" max-width="300" tile>
      <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="manageAccount">Quản lý tài khoản</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-wallet </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="manageOrder()">Quản lý đơn hàng</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  methods: {
    manageOrder() {
      this.$router.push(`/profile/user/manage-order/waitting`);
    },
    manageAccount() {
      this.$router.push(`/profile/user/manage-account/`);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-user{
}
</style>
<style scoped>
.v-sheet.v-card:not(.v-sheet--outlined){
  box-shadow: none;
}
</style>