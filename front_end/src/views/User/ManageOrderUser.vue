<template>
  <div class="manage-order">
    <div class="bar">
      <div class="status wait" @click="toListWaitting()">
        <v-badge
          bordered
          color="error"
          v-bind:value="listWaitting.length > 0 ? listWaitting.length : 0"
          :content="listWaitting.length"
          offset-x="10"
          offset-y="10"
        >
          <v-icon large>mdi-wallet-outline </v-icon>
        </v-badge>
        Chờ xác nhận
      </div>
      <div class="status delivery" @click="toListDelivery()">
        <v-badge
          bordered
          color="error"
          v-bind:value="listDelivery.length > 0 ? listDelivery.length : empty"
          :content="listDelivery.length"
          offset-x="10"
          offset-y="10"
        >
          <v-icon large>mdi-truck-outline</v-icon>
        </v-badge>
        Đang giao
      </div>
      <div class="status cancel" @click="toListCancel()">
        <v-badge
          bordered
          color="error"
          v-bind:value="listCancel.length > 0 ? listCancel.length : empty"
          :content="listCancel.length"
          offset-x="10"
          offset-y="10"
        >
          <v-icon large> mdi-archive-cancel-outline </v-icon>
        </v-badge>
        Đã huỷ
      </div>
      <div class="status rate" @click="toListRate()">
        <v-badge
          bordered
          color="error"
          v-bind:value="listDone.length > 0 ? listDone.length : empty"
          :content="listDone.length"
          offset-x="10"
          offset-y="10"
        >
          <v-icon large> mdi-star-circle-outline </v-icon>
        </v-badge>
        Đánh giá
      </div>

      <div class="status rated" @click="toListRated()">
        <v-badge
          bordered
          color="error"
          v-bind:value="listRated.length > 0 ? listRated.length : empty"
          :content="listRated.length"
          offset-x="10"
          offset-y="10"
        >
          <v-icon large> mdi-check-circle  </v-icon>
        </v-badge>
        Đã hoàn thành
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "manage-order",
  data() {
    return {
      empty: 0,
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      userInfo: "USER/userInfo",
      userInfoAuth: "AUTH/userInfo",
      orderInfor: "PAYMENT/listOrder",
      listWaitting: "PAYMENT/listWaitting",
      listDelivery: "PAYMENT/listDelivery",
      listCancel: "PAYMENT/listCancel",
      listDone: "PAYMENT/listDone",
      listRated: "PAYMENT/listRated",
    }),
  },
  methods: {
    toListWaitting() {
      this.$router.push(`/profile/user/manage-order/waitting`);
      this.getWaittingOrderAction(this.userInfoAuth._id);
    },
    toListDelivery() {
      this.$router.push(`/profile/user/manage-order/delivery`);
      this.getDeliveryOrderAction(this.userInfoAuth._id);
    },
    toListCancel() {
      this.$router.push(`/profile/user/manage-order/cancel`);
      this.getCancelOrderAction(this.userInfoAuth._id);
    },
    toListRate() {
      this.$router.push(`/profile/user/manage-order/rate`);
      this.getDoneOrderAction(this.userInfoAuth._id);
    },
      toListRated() {
      this.$router.push(`/profile/user/manage-order/rated`);
      this.getRatedOrderAction(this.userInfoAuth._id);
    },

    ...mapActions({
      getUserByToken: "AUTH/getUserByToken",
      getWaittingOrderAction: "PAYMENT/getOrderWattingUser",
      getDeliveryOrderAction: "PAYMENT/getOrderDeliveryUser",
      getCancelOrderAction: "PAYMENT/getOrderCancelUser",
      getDoneOrderAction: "PAYMENT/getOrderDoneUser",
      getRatedOrderAction: "PAYMENT/getOrderRatedUser",
    }),
  },
  created() {
   if (localStorage.getItem("token")) {
      this.getUserByToken();
    }
    this.getWaittingOrderAction(this.userInfoAuth._id);
    this.getDeliveryOrderAction(this.userInfoAuth._id);
    this.getCancelOrderAction(this.userInfoAuth._id);
    this.getDoneOrderAction(this.userInfoAuth._id);
    this.getRatedOrderAction(this.userInfoAuth._id);
  },
};
</script>

<style lang="scss" scoped>
.manage-order {
  width: 100%;
  min-height: 100vh;
  .bar {
    display: flex;
    flex-direction: row;
    .status {
      display: flex;
      flex-direction: column;
      height: 100px;
      width: 20%;
      align-self: center;
      justify-content: center;
      text-align: center;
      margin: 20px;
      font-size: 1.3rem;
      border: 3px solid rgb(226, 218, 218, 0.5);
      border-radius: 10px;
    }
  }
}
</style>