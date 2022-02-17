<template>
  <div class="sidebar-store">
    <v-card  class="mx-auto" max-width="300" tile>
      <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title @click="toImportGoods"
                >Nhập hàng</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title @click="toViewLog">Log</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toImportGoods() {
      this.$router.push(`/admin/manage-store/in-goods`);
    },
     toViewLog() {
      this.$router.push(`/admin/manage-store/view-log`);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-store{
  // padding-top: 20px;

}
.v-list-item-group{
}
</style>