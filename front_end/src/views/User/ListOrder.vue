<template>
  <div>
    <div class="list-order" v-if="orderInfor.length > 0">
      <order-item
        v-for="(order, index) in orderInfor"
        :key="index"
        :orderItem="order"
        :indexOrder="index"
        :idOrder="order._id"
        class="order"
      />
    </div>
    <div class="order-empty" v-else>
      <img
        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png"
      />
      Chưa có đơn hàng
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import orderItem from "../../components/User/OrderItem.vue";
export default {
  data() {
    return {
      idOrder: "",
    };
  },
  components: { orderItem },
  computed: {
    ...mapGetters({
      orderById: "PAYMENT/orderById",
      userInfo: "USER/userInfo",
      userInfoAuth: "AUTH/userInfo",
      orderInfor: "PAYMENT/listOrder",
    }),
  },
  methods: {
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
    this.getUserByToken();
    if (this.$route.params.statusOrder == "waitting") {
      this.getWaittingOrderAction(this.userInfoAuth._id);
    } else if (this.$route.params.statusOrder == "delivery") {
      this.getDeliveryOrderAction(this.userInfoAuth._id);
    } else if (this.$route.params.statusOrder == "cancel") {
      this.getCancelOrderAction(this.userInfoAuth._id);
    } else if (this.$route.params.statusOrder == "rate") {
      this.getDoneOrderAction(this.userInfoAuth._id);
    } else if (this.$route.params.statusOrder == "rated") {
      this.getRaredOrderAction(this.userInfoAuth._id);
    }
  },
  watch: {
    $route() {
      if (this.$route.params.statusOrder) {
        if (this.$route.params.statusOrder == "waitting") {
          this.getWaittingOrderAction(this.userInfoAuth._id);
        } else if (this.$route.params.statusOrder == "delivery") {
          this.getDeliveryOrderAction(this.userInfoAuth._id);
        } else if (this.$route.params.statusOrder == "cancel") {
          this.getCancelOrderAction(this.userInfoAuth._id);
        } else if (this.$route.params.statusOrder == "rate") {
          this.getDoneOrderAction(this.userInfoAuth._id);
        } else if (this.$route.params.statusOrder == "rated") {
          this.getRaredOrderAction(this.userInfoAuth._id);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.order-empty {
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  text-align: center;
  img {
    width: 118px;
    height: 117px;
    margin: 20px auto;
  }
}
</style>
