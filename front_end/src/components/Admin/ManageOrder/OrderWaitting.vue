<template>
  <div class="order-waiting">
    <modal-cancel-order v-if="orderById" :orderById="orderById" ref="modalCancelOrder" />
    <div class="order-list">
      <v-text-field
        class="search"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="listOrderWaiting"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item._id }}</td>
            <td>{{ item.customerName }}</td>
            <td>
              {{ item.customerPhone }}
            </td>
            <td class="">
              <div v-for="product in item.product" :key="product._id">
                {{ product.product.title }} * {{ product.quantity }}
              </div>
            </td>
            <td>{{ item.localization }}</td>
            <td>
              <vue-time-cus-no-time :time="item.createdAt" />
            </td>
            <td>
              {{ formatPrice(item.total) }}
            </td>
            <td>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text
                    v-bind="attrs"
                    v-on="on"
                    @click="
                      updateOrder({
                        orderId: item._id,
                        body: {
                          status: 'Đã đóng gói, đang vận chuyển',
                          product: item.product,
                        },
                      })
                    "
                    ><v-icon>mdi-package-variant-closed </v-icon></v-btn
                  >
                </template>
                <span>Đã đóng gói</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text v-bind="attrs" v-on="on" @click="showModalCancel(item._id)"
                    ><v-icon>mdi-close-box </v-icon></v-btn
                  >
                </template>
                <span>Từ chối đơn hàng</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VueTimeCusNoTime from "../../VueTimeCusNoTime.vue";
import ModalCancelOrder from "../../Modal/ModalCancelOrder.vue";
export default {
  name: "order-watiing",
  components: { VueTimeCusNoTime, ModalCancelOrder },
  data() {
    return {
      idOrder: "",
      search: "",
      headers: [
        {
          text: "Mã đơn hàng",
          align: "start",
          value: "title",
          width: "10%",
        },
        {
          text: "Tên khách hàng",
          align: "start",
          value: "title",
          width: "10%",
        },
        {
          text: "Số điện thoại",
          value: "image",
          width: "10%",
          sortable: false,
        },
        {
          text: "Đơn hàng",
          value: "category_name",
          width: "15%",
          align: "center",
        },
        { text: "Địa chỉ", value: "sale_price", width: "20%" },
        {
          text: "Ngày đặt hàng",
          value: "",
          width: "15%",
          align: "center",
        },
        {
          text: "Tổng thu",
          value: "",
          width: "15%",
          align: "center",
        },
        {
          text: "Hành động",
          value: "",
          align: "center",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      listOrderWaiting: "ORDERADMIN/listWaitting",
      orderById: "ORDERADMIN/orderById"
    }),
  },
  methods: {
    showModalCancel(idOrder) {
      this.getOrderByIdAction(idOrder)
      this.$refs.modalCancelOrder.show();
    },
    updateOrder(params) {
      this.updateOrderAction(params);
      this.createNewLogAction({
        status: "Xuất hàng",
        logContents: params.body.product,
      });
      for (let product of params.body.product) {
        this.updateProductAction({
          productId: product.idProduct,
          body: { quantity: -product.quantity },
        });
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    ...mapActions({
      getOrderByIdAction: "ORDERADMIN/getOrderById",
      updateProductAction: "PRODUCTACTION/outProduct",
      createNewLogAction: "LOG/createNewLogXuat",
      updateOrderAction: "ORDERADMIN/acceptOrder",
      listOrderWaitingAction: "ORDERADMIN/getAllOrderWatting",
    }),
  },
  created() {
    this.listOrderWaitingAction();
  },
};
</script>

<style>
</style>