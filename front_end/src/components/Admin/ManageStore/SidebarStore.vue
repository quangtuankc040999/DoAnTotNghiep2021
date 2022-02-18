<template>
  <div class="sidebar-store">
    <v-card>
      <v-tabs color="deep-purple accent-4" right>
        <v-tab>Nhập hàng</v-tab>
        <v-tab>Log</v-tab>
        <v-tab-item><import-goods/> </v-tab-item>
        <v-tab-item><view-log/> </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import ImportGoods from './ImportGoods.vue';
import ViewLog from './ViewLog.vue';
export default {
  components: { ImportGoods, ViewLog },
  component: {
    ImportGoods,
    ViewLog
  },
  data() {
    return {};
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.sidebar-store {
  // padding-top: 20px;
}
.v-list-item-group {
}
.v-tabs{
  min-height: 100vh  !important;
}
</style>