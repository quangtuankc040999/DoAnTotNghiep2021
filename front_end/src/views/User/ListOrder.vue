<template>
  <div>
    <div class="list-order" v-if="orderInfor.length > 0">
      <div v-for="(order, index) in orderInfor" :key="index" class="order">
        <div class="order-head">
          <p @click="toOrderDetail(order._id)">Mã đơn hàng: {{ order._id }}</p>
        </div>
        <div class="order-content">
          <div class="product">
            <table>
              <tbody>
                <tr v-for="(product, index) in order.product" :key="index">
                  <td style="width: 10%; font-weight: 400">
                    <img v-bind:src="product.product.image[0]" alt="" />
                  </td>
                  <td style="width: 70%">
                    <strong>{{ product.product.title }}</strong> x
                    {{ product.quantity }} sản phẩm
                  </td>
                  <td style="width: 10%; font-weight: 400">
                    {{ formatPrice(product.product.sale_price) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="total-price">
            <span
              >Tổng số tiền: <span>{{ formatPrice(order.total) }}</span></span
            >
          </div>
        </div>
        <div class="order-footer">
          <v-btn v-if="order.status == 'Chờ xác nhận'" class="btn"
            >Chỉnh sửa</v-btn
          >
          <v-btn
            v-if="order.status == 'Chờ xác nhận'"
            class="btn"
            @click="
              updateOrder({ orderId: order._id, body: { status: 'Đã huỷ' } })
            "
            >Huỷ đơn hàng</v-btn
          >
          <v-btn
            v-if="order.status == 'Đã đóng gói, đang vận chuyển'"
            class="btn"
            @click="
              updateOrder({
                orderId: order._id,
                body: { status: 'Đã hoàn thành' },
              })
            "
            >Đã nhận được hàng</v-btn
          >
          <v-btn v-if="order.status == 'Đã huỷ'" class="btn">Mua lại</v-btn>
          <v-btn
            v-if="order.status == 'Đã hoàn thành'"
            class="btn"
            @click="showModalRatting(order._id)"
            >Đánh giá</v-btn
          >
          <v-btn class="btn chat">Liên hệ người bán</v-btn>
        </div>
      </div>
    </div>
    <div class="order-empty" v-else>
      <img
        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png"
      />
      Chưa có đơn hàng
    </div>
    <modalRatting :idOrder="idOrder" ref="modalRatting" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import modalRatting from "../../components/User/ModalRatting.vue";
export default {
  components: { modalRatting },
  data() {
    return {
      idOrder: "",
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "USER/userInfo",
      userInfoAuth: "AUTH/userInfo",
      orderInfor: "PAYMENT/listOrder",
    }),
  },
  methods: {
    showModalRatting(idOrder) {
      this.idOrder = idOrder;
      this.$refs.modalRatting.show();
    },
    toOrderDetail(orderId) {
      this.$router.push(`/profile/user/manage-order/detail/${orderId}`);
    },
    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    updateOrder(params) {
      this.updateOrderAction(params);
    },

    ...mapActions({
      getUserByToken: "AUTH/getUserByToken",
      getWaittingOrderAction: "PAYMENT/getOrderWattingUser",
      getDeliveryOrderAction: "PAYMENT/getOrderDeliveryUser",
      getCancelOrderAction: "PAYMENT/getOrderCancelUser",
      getDoneOrderAction: "PAYMENT/getOrderDoneUser",
      updateOrderAction: "PAYMENT/updateOrder",
    }),
  },
  created() {
    this.getUserByToken();
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
.list-order {
  .order {
    background-color: rgba(245, 245, 245, 0.5);
    padding: 10px;
    margin: 10px;
    .order-head {
      p {
        font-weight: 700 !important;
      }
    }
    .order-content {
      .product {
        border-bottom: rgba(177, 171, 171, 0.5) 1px solid;
        td {
          padding: 1% !important;
        }
      }
      .total-price {
        text-align: right;
        margin: 2% 0;
        span {
          span {
            color: rgb(224, 0, 0);
            font-size: 1.5rem;
          }
        }
      }
    }
    .order-footer {
      display: flex;
      justify-content: right;
    }
  }
}
</style>
<style scoped>
.btn {
  background-color: #d26e4b !important;
  color: white !important;
  font-weight: 500;
  margin: 0 10px;
  padding: 10px 40px;
}
</style>