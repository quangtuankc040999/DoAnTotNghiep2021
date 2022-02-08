<template>
  <div>
    {{ orderById }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "order-detail",
  computed: {
    ...mapGetters({
      userInfoAuth: "AUTH/userInfo",
      orderById: "PAYMENT/orderById",
    }),
  },
  methods: {
    ...mapActions({
      getOrderByIdAction: "PAYMENT/getOrderById",
    }),
  },
  created() {
    this.getOrderByIdAction(this.$route.params.orderId);
  },
};
</script>

<style>
</style>