<template>
  <div class="order-item">
    <modalRatting :orderItem="orderItem" ref="modalRatting" />
    <modal-cancel-order
      v-if="orderItem"
      :orderById="orderItem"
      ref="modalCancelOrder"
    />
    <div class="order-head">
      <p @click="toOrderDetail(orderItem._id)">
        Mã đơn hàng: {{ orderItem._id }}
      </p>
    </div>
    <div class="order-content" v-if="orderItem.product.length > 0">
      <div class="product">
        <table>
          <tbody>
            <tr v-for="(product, index) in orderItem.product" :key="index">
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
          >Tổng số tiền: <span>{{ formatPrice(orderItem.total) }}</span></span
        >
      </div>
    </div>
    <div class="order-footer">
      <v-btn v-if="orderItem.status == 'Chờ xác nhận'" class="btn"
        >Chỉnh sửa</v-btn
      >
      <v-btn
        v-if="orderItem.status == 'Chờ xác nhận'"
        class="btn"
        @click="showModalCancel()"
        >Huỷ đơn hàng</v-btn
      >
      <v-btn
        v-if="orderItem.status == 'Đã đóng gói, đang vận chuyển'"
        class="btn"
        @click="
          updateOrder({
            orderId: orderItem._id,
            body: { status: 'Đã hoàn thành', id: userInfoAuth._id },
          })
        "
        >Đã nhận được hàng</v-btn
      >
      <v-btn v-if="orderItem.status == 'Đã huỷ'" class="btn">Mua lại</v-btn>
      <v-btn
        v-if="orderItem.status == 'Đã hoàn thành'"
        class="btn"
        @click="showModalRatting(orderItem._id)"
        >Đánh giá</v-btn
      >
      <v-btn class="btn chat" @click="openShowChat">Liên hệ người bán</v-btn>
    </div>
  </div>
</template>
<script>
import modalRatting from "./ModalRatting.vue";
import modalCancelOrder from "../../components/Modal/ModalCancelOrder.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "order-item",
  components: { modalRatting, modalCancelOrder },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfoAuth: "AUTH/userInfo",
    }),
  },
  props: ["orderItem", "indexOrder", "idOrder", "idCustomer"],
  methods: {
    showModalRatting() {
      this.$refs.modalRatting.show();
    },
    showModalCancel() {
      this.$refs.modalCancelOrder.show();
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
      getUserAction: "USER/getUser",
      updateOrderAction: "PAYMENT/updateOrder",
      toggleShowChatAction: "CHAT/toggleShowChat",
    }),
    openShowChat() {
      this.toggleShowChatAction(true);
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
.order-item {
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