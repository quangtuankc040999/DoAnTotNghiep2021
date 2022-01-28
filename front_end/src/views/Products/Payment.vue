<template>
  <div>
    <navigation />
    <div class="payment-container">
      <form @submit.prevent="makeOrder">
        <div class="form-order">
          <h3>Thanh toán vào giao hàng</h3>
          <h5>Thông tin cá nhân</h5>
          <div class="form-group">
            <input
              type="text"
              placeholder="Tên khách hàng"
              v-model="orderInput.customerName"
            />
            <div class="errors">
              <p v-show="showErrors.emptyCustomerName" class="errors">
                Tên khách hàng không được bỏ trống
              </p>
              <p v-show="showErrors.customerNameMaxLength" class="errors">
                Tên khách hàng dài quá sô ký tự quy định
              </p>
            </div>
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Số điện thoại"
              v-model="orderInput.customerPhone"
            />
            <div class="errors">
              <p v-show="showErrors.emptyCustomerPhone" class="errors">
                Số điện thoại không được bỏ trống
              </p>
              <p v-show="showErrors.customerPhoneMaxLength" class="errors">
                Số điện thoại dài quá sô ký tự quy định
              </p>
            </div>
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Email"
              v-model="orderInput.customerEmail"
            />
            <div class="errors">
              <p v-show="showErrors.emptyEmail" class="errors">
                Email không được bỏ trống
              </p>
              <p v-show="showErrors.invalidEmail" class="errors">
                Email không đúng định dạng
              </p>
            </div>
          </div>
          <h5>Địa chỉ</h5>
          <label for="">Tỉnh- Thành phố</label>
          <div class="province group">
            <select
              v-model="selectedProvince"
              @change="fetchDistricts"
              :disabled="!provinces.length"
            >
              <option
                v-for="province in provinces"
                :key="province.id"
                :value="province"
              >
                {{ province.Name }}
              </option>
            </select>
            <div class="errors">
              <p v-show="showErrors.emptyProvince" class="errors">
                Vui lòng chọn 1 tỉnh - thành phố
              </p>
            </div>
          </div>
          <label for="">Quận - Huyện</label>
          <div class="district group">
            <select
              v-model="selectedDistrict"
              @change="fetchCities"
              :disabled="!districts.length"
            >
              <option
                v-for="district in districts"
                :key="district.id"
                :value="district"
              >
                {{ district.Name }}
              </option>
            </select>
            <div class="errors">
              <p v-show="showErrors.emptyDistrict" class="errors">
                Vui lòng chọn 1 quận - huyện
              </p>
            </div>
          </div>
          <label for="">Phường - xã</label>
          <div class="ward group">
            <select v-model="selectedCity" :disabled="!cities.length">
              <option v-for="city in cities" :key="city.id" :value="city">
                {{ city.Name }}
              </option>
            </select>
            <div class="errors">
              <p v-show="showErrors.emptyWard" class="errors">
                Vui lòng chọn 1 Phường - xã
              </p>
            </div>
          </div>
          <div class="detail-adress">
            <input
              type="text"
              placeholder="Địa chỉ cụ thể"
              v-model="addressDetail"
              style="margin-top: 20px !important"
            />
            <div class="errors">
              <p v-show="showErrors.emptyAddressDetail" class="errors">
                Nhập địa chỉ giao hàng cụ thể
              </p>
            </div>
          </div>
          <div class="add-infor">
            <h5>Thông tin bổ sung</h5>
            <textarea
              name=""
              id=""
              rows="4"
              placeholder="Ghi chú về đơn hàng. Ví dụ: Thông tin về giờ giấc giao hàng chi tiết hơn..."
              v-model="orderInput.additionalInformation"
              style="width: 90%"
            ></textarea>
          </div>
        </div>
        <div class="your-order">
          <h3>Đơn hàng của bạn</h3>
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Tạm tính</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in productCarts" :key="index">
                <td>
                  {{ product.product.title }} x <b>{{ product.quantity }}</b>
                </td>
                <td class="price">
                  {{
                    formatPrice(
                      calOne(product.quantity, product.product.sale_price)
                    )
                  }}
                </td>
              </tr>
              <tr>
                <td class="blue">Tạm tính</td>
                <td class="price">
                  {{ formatPrice(totalPrice(productCarts)) }}
                </td>
              </tr>
              <tr>
                <td class="blue">Giao hàng</td>
                <td class="price">{{ formatPrice(15000) }}</td>
              </tr>
              <tr>
                <td class="blue">Tổng cộng</td>
                <td class="price">
                  {{ formatPrice(15000 + totalPrice(productCarts)) }}
                </td>
              </tr>
            </tbody>
          </table>
          <v-btn :disabled="disabledMakeOrder" type="submit" class="btn-make-order"> Đặt hàng </v-btn>
        </div>
      </form>
    </div>
    <footer-rubik />
  </div>
</template>

<script>
import address from "../../constant/address.js";
import Navigation from "../../components/Navigation.vue";
import FooterRubik from "../../components/Footer.vue";
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";
export default {
  name: "Payment",
  data() {
    return {
      orderInput: {
        customerId: "",
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        localization: "",
        additionalInformation: "",
        product: [],
        total: "",
      },
      addressDetail: "",
      showErrors: {},
      provinces: address.address,
      disabledMakeOrder: false,
      districts: [],
      cities: [],
      selectedProvince: {
        Districts: [],
        Id: null,
        Name: null,
      },
      selectedDistrict: {
        Id: null,
        Name: null,
        Wards: [],
      },
      selectedCity: {
        Id: null,
        Name: null,
        Level: null,
      },
    };
  },
  components: {
    Navigation,
    FooterRubik,
  },
  computed: {
    ...mapGetters({
      userInfo: "USER/userInfo",
      userInfoAuth: "AUTH/userInfo",
      productCarts: "CART/productCart",
      validationOrderInput: "VALIDATION/validateOrderInput",
      productById: "PRODUCTS/productById",
    }),
  },
  methods: {
    async fetchDistricts() {
      this.cities = [];
      this.districts = this.selectedProvince.Districts;
    },
    async fetchCities() {
      this.cities = this.selectedDistrict.Wards;
    },
    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    calOne(quantity, salePrice) {
      return quantity * salePrice;
    },
    totalPrice(productCart) {
      return productCart.reduce(
        (total, product) =>
          total + product.quantity * product.product.sale_price,
        0
      );
    },
    makeOrder() {
      if (!this.validateBeforeSubmit()) {
        this.disabledMakeOrder = true;
        return;
      } else {
        this.orderInput.customerId = this.userInfoAuth._id;
        this.orderInput.total = 15000 + this.totalPrice(this.productCarts);
        this.orderInput.product = this.productCarts;
        for (let index in this.productCarts) {
          this.getProductInforAction(this.productCarts[index].idProduct);
          this.updateProductAction({
            productId: this.productCarts[index].idProduct,
            body: {
              inventory:
                this.productById.inventory - this.productCarts[index].quantity,
            },
          });
        }
        this.clearCartAction(this.userInfoAuth._id);
        this.newOrderAction(this.orderInput);
      }
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      this.orderInput.localization =
        this.selectedProvince.Name +
        " - " +
        this.selectedDistrict.Name +
        " - " +
        this.selectedCity.Name +
        " - " +
        this.addressDetail;
      const errors = this.validationOrderInput(
        this.orderInput,
        this.selectedProvince,
        this.selectedDistrict,
        this.selectedCity,
        this.addressDetail
      );
      if (errors) {
        Vue.set(
          this.showErrors,
          "emptyCustomerName",
          this.showErrors && !!errors && errors.emptyCustomerName
        );
        Vue.set(
          this.showErrors,
          "customerNameMaxLength",
          this.showErrors && !!errors && errors.customerNameMaxLength
        );
        Vue.set(
          this.showErrors,
          "emptyCustomerPhone",
          this.showErrors && !!errors && errors.emptyCustomerPhone
        );
        Vue.set(
          this.showErrors,
          "customerPhoneMaxLength",
          this.showErrors && !!errors && errors.customerPhoneMaxLength
        );
        Vue.set(
          this.showErrors,
          "emptyEmail",
          this.showErrors && !!errors && errors.emptyEmail
        );
        Vue.set(
          this.showErrors,
          "invalidEmail",
          this.showErrors && !!errors && errors.invalidEmail
        );
        Vue.set(
          this.showErrors,
          "emptyProvince",
          this.showErrors && !!errors && errors.emptyProvince
        );
        Vue.set(
          this.showErrors,
          "emptyDistrict",
          this.showErrors && !!errors.emptyDistrict
        );
        Vue.set(
          this.showErrors,
          "emptyWard",
          this.showErrors && !!errors && errors.emptyWard
        );
        Vue.set(
          this.showErrors,
          "emptyAddressDetail",
          this.showErrors && !!errors && errors.emptyAddressDetail
        );
        passedValidate = false;
      }
      return passedValidate;
    },
    ...mapActions({
      clearErrorMessage: "ERROR/clearErrorMessage",
      getUserByToken: "AUTH/getUserByToken",
      getProductCartOfUserAction: "CART/userProductCart",
      newOrderAction: "PAYMENT/newOrder",
      updateProductAction: "PRODUCTACTION/updateProduct",
      getProductInforAction: "PRODUCTS/getProduct",
      clearCartAction: "CART/clearProductCart",
    }),
  },
  created() {
    this.getUserByToken();
    this.getProductCartOfUserAction(this.userInfoAuth._id);
  },
  watch: {
    "orderInput.customerName"() {
      Vue.set(this.showErrors, "emptyCustomerName", null);
      Vue.set(this.showErrors, "customerNameMaxLength", null);
      this.disabledMakeOrder = false;
      this.clearErrorMessage();
    },
    "orderInput.customerPhone"() {
      Vue.set(this.showErrors, "emptyCustomerPhone", null);
      Vue.set(this.showErrors, "customerPhoneMaxLength", null);
      this.disabledMakeOrder = false;
      this.clearErrorMessage();
    },
    "orderInput.customerEmail"() {
      Vue.set(this.showErrors, "emptyEmail", null);
      Vue.set(this.showErrors, "invalidEmail", null);
      this.disabledMakeOrder = false;
      this.clearErrorMessage();
    },
    selectedProvince() {
      Vue.set(this.showErrors, "emptyProvince", null);
      this.disabledMakeOrder = false;
      this.clearErrorMessage();
    },
    selectedDistrict() {
      Vue.set(this.showErrors, "emptyDistrict", null);
      this.disabledMakeOrder = false;
      this.clearErrorMessage();
    },
    selectedCity() {
      Vue.set(this.showErrors, "emptyWard", null);
      this.disabledMakeOrder = false;
      this.clearErrorMessage();
    },
    addressDetail() {
      Vue.set(this.showErrors, "emptyAddressDetail", null);
      this.disabledMakeOrder = false;
      this.clearErrorMessage();
    },
  },
};
</script>

<style lang="scss" scoped>
.errors {
  text-align: start;
  margin-left: 5px;
  font-size: 85%;
  border: none !important;
  color: red !important;
  text-transform: none !important;
  font-style: italic;
}
input,
select,
textarea {
  border: 1px solid rgb(179, 174, 174);
  width: 90%;
  padding: 10px;
  border-radius: 4px;
  .detail-adress {
    margin-top: 100px !important;
  }
}
h3,
h5 {
  color: #dd9933 !important;
  margin: 10px 0;
}
.payment-container {
  width: 70%;
  margin: 20px auto;
  form {
    display: flex;
    .form-order {
      width: 60%;
    }
    .your-order {
      height: 50%;
      width: 35%;
      border: 2px solid rgb(187, 178, 178);
      border-radius: 4px;
      padding: 30px;
      padding-top: 0;
      table {
        width: 100% !important;
        thead {
          tr {
            border-bottom: 2px solid rgba(201, 182, 182, 0.5);
            th {
              text-transform: uppercase;
              color: #2e97f4 !important;
            }
          }
        }
        tbody {
          tr {
            td {
              padding: 10px 0;
              border-bottom: 1px solid rgba(201, 182, 182, 0.5);
            }
          }
          .price {
            font-weight: 700;
          }
          .blue {
            color: #2e97f4 !important;
            font-weight: 700;
            font-size: 1rem;
          }
        }
      }
    }
  }
}
</style>
<style scoped>
.btn-make-order {
  background-color:  #d26e4b  !important;
  color: white !important;
  font-weight: 700;
  margin-top: 20px ;
  width: 100%;
}
</style>