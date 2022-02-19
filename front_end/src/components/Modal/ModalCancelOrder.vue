<template>
  <b-modal
    id="modalCancel"
    ref="modalCancel"
    hide-footer
    size="lg md"
    class="col-lg-6"
    hide-header-close
    scrollable
    @hide="doWhenHide"
  >
    <div class="order-infor">
      <table>
        <tr>
          <td style="width: 20%"><label>Mã đơn hàng: </label></td>
          <td>
            <label>{{ orderById._id }}</label>
          </td>
        </tr>
        <tr>
          <td style="width: 20%"><label>Tên khách hàng: </label></td>
          <td>
            <label>{{ orderById.customerName }}</label>
          </td>
        </tr>
        <tr>
          <td style="width: 20%"><label>Sản phẩm: </label></td>
          <td>
            <div
              v-for="product in orderById.product"
              :key="product.product._id"
            >
              <label
                >{{ product.product.title }} * {{ product.quantity }}</label
              >
            </div>
          </td>
        </tr>
        <tr>
          <td><label style="width: 20%">Địa chỉ: </label></td>
          <td>{{ orderById.localization }}</td>
        </tr>
      </table>
      <div v-show="isShow" class="question">
        <p>Bạn có thực sự muốn huỷ đơn hàng này không?</p>
        <v-btn @click="hideModal" style="background-color: #BDBDBD">
          Không, cảm ơn</v-btn
        >
        <v-btn @click="confirmCacel" style="background-color: #616161">
          Có, tôi muốn huỷ</v-btn
        >
      </div>
    </div>
    <div v-show="!isShow" class="reason-cancel">
      <p>Hãy cho tôi biết lý do bạn muốn huỷ</p>

      <textarea v-model="note" rows="4" placeholder="Nhập vào đây ...." />
      <p v-show="showErrors" class="errors">
        Hãy nhập lý do bạn huỷ đơn hàng vào đây
      </p>
      <v-btn
        style="background-color: #616161"
        @click="cancelOrder(orderById._id)"
        >Xác nhận</v-btn
      >
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "modal-cancel",
  props: ["orderById"],
  data() {
    return {
      note: "",
      isShow: true,
      showErrors: false,
    };
  },
  methods: {
    cancelOrder(orderId) {
      if (this.note != "") {
        this.cancelOrderAction({
          orderId: orderId,
          body: {
            status: "Đã huỷ",
            note: this.note,
          },
        })
          .then(() => {
            this.hideModal();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.showErrors = true;
      }
    },
    confirmCacel() {
      this.isShow = !this.isShow;
    },
    show() {
      this.$refs.modalCancel.show();
    },
    doWhenHide() {
      this.note = "";
      this.isShow = true;
      this.showErrors = false;
    },
    hideModal() {
      this.$refs.modalCancel.hide();
    },
    ...mapActions({
      cancelOrderAction: "ORDERADMIN/cancelOrder",
    }),
  },
  watch: {
    note() {
      this.showErrors = false;
    },
  },
};
</script>

<style lang="scss" scoped>
p{
  font-size: 1rem !important;
  color: rgb(118, 118, 233);
  margin-top: 10px;
  margin-left: 15px;
}
textarea {
  border: 1px solid rgb(179, 174, 174);
  width: 90%;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  margin-left: 15px;
}
.order-infor {
  width: 100% !important;
  table {
    width: 90%;
    td {
      padding: 5px 10px !important;
    }
  }
}
.reason-cancel {
  width: 100% !important;
}
.v-btn {
  margin: 0 15px;
  color: rgb(255, 255, 255) !important;
}
.errors {
  color: rgb(231, 61, 61);
  font-size: 1em;
  font-style: italic;
  margin-top: 3px ;
}
</style>