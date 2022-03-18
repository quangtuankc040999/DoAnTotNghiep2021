<template>
  <div class="sidebar-store">
    <v-card>
      <v-tabs color="deep-purple accent-4" right>
        <v-tab>Đơn hàng chờ xác nhận</v-tab>
        <v-tab>Đơn hàng đang vận chuyển</v-tab>
        <!-- <v-tab>Đơn hàng đã đánh giá</v-tab> -->
        <v-tab-item><order-waitting /> </v-tab-item>
        <v-tab-item><order-delivery/> </v-tab-item>
        <!-- <v-tab-item><order-rated/> </v-tab-item> -->

      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import OrderWaitting from './OrderWaitting.vue';
import OrderDelivery from './OrderDelivery.vue';
// import OrderRated from './OrderRated.vue'
export default {
  components: { OrderWaitting, OrderDelivery },
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