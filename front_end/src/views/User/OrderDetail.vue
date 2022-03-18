<template>
  <div class="container-order">
    <div class="_1AsWWl"></div>
    <div class="infor">
      <div class="address">
        <p>Địa chỉ nhận hàng:</p>
        <span class="name">{{ orderById.customerName }}</span>
        <br />
        <span>{{ orderById.customerPhone }}</span>
        <br />
        <span>{{ orderById.localization }}</span>
        <br />
      </div>
      <v-card-text class="py-0">
        <v-timeline align-top dense>
          <v-timeline-item color="blue" small>
            <v-row class="pt-1">
              <v-col cols="3">
                <strong><vue-time-cus :time="orderById.createdAt" /></strong>
              </v-col>
              <v-col>
                <div class="text-caption">
                  Đặt hàng thành công, chờ đơn hàng được xác nhận
                </div>
              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item
            color="blue"
            small
            v-for="(status, i) in orderById.listStatus"
            :key="i"
          >
            <v-row class="pt-1">
              <v-col cols="3">
                <strong><vue-time-cus :time="status.time" /></strong>
              </v-col>
              <v-col>
                <div class="text-caption">{{ status.status }}</div>
              </v-col>
            </v-row>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </div>
    <div class="order-content" v-if="orderById.product.length > 0">
      <div class="product">
        <table>
          <tbody>
            <tr v-for="(product, index) in orderById.product" :key="index">
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
        <table style="float: right">
          <tr>
            <td>Tổng tiền hàng:</td>
            <td>{{ formatPrice(totalPrice(orderById.product)) }}</td>
          </tr>
          <tr>
            <td>Phí vận chuyển:</td>
            <td>{{ formatPrice(15000) }}</td>
          </tr>
          <tr>
            <td>Tổng số tiền:</td>
            <td class="all-total">{{ formatPrice(orderById.total) }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VueTimeCus from "../../components/VueTimeCus.vue";
export default {
  name: "order-detail",
  components: {
    VueTimeCus,
  },
  computed: {
    ...mapGetters({
      userInfoAuth: "AUTH/userInfo",
      orderById: "PAYMENT/orderById",
    }),
  },
  methods: {
    totalPrice(productCart) {
      return productCart.reduce(
        (total, product) =>
          total + product.quantity * product.product.sale_price,
        0
      );
    },
    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    ...mapActions({
      getOrderByIdAction: "PAYMENT/getOrderById",
    }),
  },
  created() {
    this.getOrderByIdAction(this.$route.params.orderId);
  },
};
</script>

<style lang="scss" scoped>
._1AsWWl {
  display: block !important;
  height: 0.1875rem;
  width: 100vw !important;
  background-position-x: -1.875rem !important;
  background-image: repeating-linear-gradient(
    45deg,
    #6fa6d6,
    #6fa6d6 33px,
    transparent 0,
    transparent 41px,
    #f18d9b 0,
    #f18d9b 74px,
    transparent 0,
    transparent 82px
  );
}

.container-order {
  width: 95% !important;
  .infor {
    width: 100%;
    display: flex;
    .address {
      margin-left: 20px;
      margin-top: 20px;
      width: 30%;
      flex-basis: 1 !important;
      p {
        text-transform: uppercase;
        font-size: 18px;
      }

      span {
        color: rgba(0, 0, 0, 0.54);
        font-size: 12px;
        white-space: pre-line;
      }
      .name {
        color: rgb(0, 0, 0) !important;
        font-size: 14px !important;
        text-transform: uppercase;
      }
    }
    .py-0 {
      flex-basis: 1 !important;
    }
  }
}
.order-content {
  margin-top: 30px;
  .product {
    border-bottom: rgba(177, 171, 171, 0.5) 1px solid;
    td {
      padding: 1% !important;
    }
  }
  .total-price {
    margin-right: 50px !important;
    tr {
      td {
        padding: 15px;
      }
      .all-total {
        color: rgb(224, 0, 0);
        font-size: 1.5rem;
      }
    }
    text-align: right;
    margin: 2% 20px;
    span {
      span {
      }
    }
  }
}
img {
  width: 100%;
  height: 100%;
}
</style>