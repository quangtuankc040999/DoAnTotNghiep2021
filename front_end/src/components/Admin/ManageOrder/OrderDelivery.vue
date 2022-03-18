<template>
  <div class="order-waiting">
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
        :items="listOrderDelivery"
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
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VueTimeCusNoTime from "../../VueTimeCusNoTime.vue";
export default {
  name: "order-watiing",
  components: { VueTimeCusNoTime },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Mã đơn hàng",
          align: "start",
          value: "title",
          width: "10%",
          sortable: true,
        },
        {
          text: "Tên khách hàng",
          align: "start",
          value: "title",
          width: "10%",
          sortable: true,
        },
        {
          text: "Số điện thoại",
          value: "image",
          width: "10%",
          sortable: true,
        },
        {
          text: "Đơn hàng",
          value: "category_name",
          width: "15%",
          align: "center",
          sortable: true,
        },
        { text: "Địa chỉ", value: "sale_price", width: "20%", sortable: true },
        {
          text: "Ngày đặt hàng",
          value: "",
          width: "15%",
          align: "center",
          sortable: true,
        },
        {
          text: "Tổng thu",
          value: "",
          width: "15%",
          align: "center",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      listOrderDelivery: "ORDERADMIN/listDelivery",
    }),
  },
  methods: {
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
      updateProductAction: "PRODUCTACTION/outProduct",
      createNewLogAction: "LOG/createNewLogXuat",
      updateOrderAction: "ORDERADMIN/acceptOrder",
      buyProductAction: "PRODUCTACTION/buyProduct",
      listOrderDeliveryAction: "ORDERADMIN/getAllOrderDelivery",
    }),
  },
  created() {
    this.listOrderDeliveryAction();
  },
};
</script>

<style scoped>
td {
  padding: 30px 10px !important;
  text-align: center;
  font-size: 13px !important;
}
</style>