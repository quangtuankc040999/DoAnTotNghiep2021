<template>
  <div>
    <navigation />
    <div class="payment-container">
      <form @submit.prevent="makeOrder">
        <div class="form-order">
          <h3>Thanh toán vào giao hàng</h3>
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
          <div class="province group">
            <label for="">Tỉnh- Thành phố</label>
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

          <div class="district group">
            <label for="">Quận - Huyện</label>
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

          <div class="ward group">
            <label for="">Phường - xã</label>
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
            />
            <div class="errors">
              <p v-show="showErrors.emptyAddressDetail" class="errors">
                Nhập địa chỉ giao hàng cụ thể
              </p>
            </div>
          </div>
          <div class="add-infor">
            <label>Thông tin bổ sung</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Thông tin về giờ giấc nhận hàng..."
              v-model="orderInput.additionalInformation"
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
                <td>{{ product.product.title }} x {{ product.quantity }}</td>
                <td>
                  {{
                    formatPrice(
                      calOne(product.quantity, product.product.sale_price)
                    )
                  }}
                </td>
              </tr>
              <tr>
                <td>tạm tính</td>
                <td>{{ formatPrice(totalPrice(productCarts)) }}</td>
              </tr>
              <tr>
                <td>giao hàng</td>
                <td>{{ formatPrice(15000) }}</td>
              </tr>
              <tr>
                <td>Tổng cộng</td>
                <td>{{ formatPrice(15000 + totalPrice(productCarts)) }}</td>
              </tr>
            </tbody>
          </table>
          <v-btn :disabled="disabledMakeOrder" type="submit">Dat hang</v-btn>
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
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        localization:"",
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
        this.newOrderAction(this.orderInput);
      }
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      this.orderInput.localization = this.selectedProvince + this.selectedDistrict +  this.selectedCity + this.addressDetail;
      const errors = this.validationOrderInput(this.orderInput);
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
    "orderInput.CustomerPhone"() {
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
    "orderInput.localization.provinces"() {
      Vue.set(this.showErrors, "emptyProvince", null);
      this.disabledMakeOrder = false;
      this.clearErrorMessage();
    },
    "orderInput.localization.districts"() {
      Vue.set(this.showErrors, "emptyDistrict", null);
      this.disabledMakeOrder = false;
      this.clearErrorMessage();
    },
    "orderInput.localization.ward"() {
      Vue.set(this.showErrors, "emptyWard", null);
      this.disabledMakeOrder = false;
      this.clearErrorMessage();
    },
    "orderInput.localization.addressDetail"() {
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
</style>