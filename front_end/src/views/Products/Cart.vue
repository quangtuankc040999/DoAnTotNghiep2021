<template>
  <div>
    <navigation />
    <div v-if="productCarts.length > 0" class="cart-container">
      <div class="product-list">
        <table>
          <thead>
            <tr>
              <th style="width: 45%">sản phẩm</th>
              <th style="width: 10%">Giá</th>
              <th style="width: 25%">Số lượng</th>
              <th style="width: 10%">Tạm tính</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in productCarts" :key="index">
              <td style="width: 45%">
                <v-btn
                  @click="
                    removeProductFromCart(userInfoAuth._id, {
                      idProduct: product.product._id,
                    })
                  "
                  >x</v-btn
                >
                <img v-bind:src="product.product.image[0]" alt="" />
                <span>{{ product.product.title }}</span>
              </td>
              <td style="width: 10%">
                {{ formatPrice(product.product.sale_price) }}
              </td>
              <td style="width: 25%">
                <v-card flat class="py-12">
                  <v-card-text>
                    <v-row align="center" justify="center">
                      <v-btn-toggle mandatory>
                        <v-btn
                          @click="
                            updateQuantityCart(
                              'subtract',
                              product.product.inventory,
                              product
                            )
                          "
                        >
                          -
                        </v-btn>
                        <span
                          class="cart-quantity"
                          style="
                            justify-content: center;
                            align-self: center;
                            font-size: 20px !important;
                            margin: 0 1rem;
                          "
                          >{{ product.quantity }}</span
                        >
                        <v-btn
                          @click="
                            updateQuantityCart(
                              'add',
                              product.product.inventory,
                              product
                            )
                          "
                        >
                          +
                        </v-btn>
                      </v-btn-toggle>
                    </v-row>
                  </v-card-text>
                </v-card>
              </td>
              <td style="width: 10%">
                {{
                  formatPrice(
                    calOne(product.quantity, product.product.sale_price)
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="action-cart">
          <router-link to="/products">
            <v-btn class="back-products"> TIẾP TỤC XEM SẢN PHẨM </v-btn>
          </router-link>
          <v-btn
            class="update-cart"
            @click="updateCart(userInfoAuth._id, productCarts)"
          >
            CẬP NHẬT GIỎ HÀNG
          </v-btn>
        </div>
      </div>
      <div class="cal-price">
        <p>CỘNG GIỎ HÀNG</p>
        <table>
          <tr>
            <td>Tạm tính:</td>
            <td>{{ formatPrice(totalPrice(productCarts)) }}</td>
          </tr>
          <tr>
            <td>Phí giao hàng:</td>
            <td>
              {{ formatPrice(15000) }}
            </td>
          </tr>
          <tr>
            <td>Tổng:</td>
            <td>{{ formatPrice(totalPrice(productCarts) + 15000) }}</td>
          </tr>
        </table>
        <router-link to="/payment">
          <v-btn class="payment"> TIẾN HÀNH THANH TOÁN </v-btn>
        </router-link>
      </div>
    </div>
    <div v-else class="cart-container">
      <p>Giỏ hàng trống</p>
    </div>

    <footer-rubik />
  </div>
</template>

<script>
import Navigation from "../../components/Navigation.vue";
import FooterRubik from "../../components/Footer.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    Navigation,
    FooterRubik,
  },
  computed: {
    ...mapGetters({
      userInfo: "USER/userInfo",
      userInfoAuth: "AUTH/userInfo",
      productCarts: "CART/productCart",
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
    updateQuantityCart(updateType, inventory, product) {
      if (updateType === "subtract") {
        if (product.quantity !== 1) {
          product.quantity--;
        }
      } else {
        if (product.quantity < inventory) {
          product.quantity++;
        }
      }
    },
    updateCart(userId, productCarts) {
      for (let index in productCarts) {
        this.updateQuantityProductFromCartDBAction({
          id: userId,
          product: {
            idProduct: productCarts[index].product._id,
            quantity: productCarts[index].quantity,
            quantity_old: 0,
          },
        });
      }
      this.$router.go();
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
    ...mapActions({
      getUserByToken: "AUTH/getUserByToken",
      getProductCartOfUserAction: "CART/userProductCart",
      updateQuantityProductFromCartDBAction:
        "CART/updateQuantityProductFromCartDB",
      removeProductFromCartAction: "CART/removeProductFromCartDB",
    }),
    removeProductFromCart(userId, product) {
      this.removeProductFromCartAction({
        id: userId,
        product: { idProduct: product.idProduct },
      });
      this.$router.go();
    },
  },
  created() {
    this.getUserByToken();
    this.getProductCartOfUserAction(this.userInfoAuth._id);
  },
};
</script>

<style lang="scss" scoped>
.cart-container {
  display: flex;
  margin: 0 auto;
  width: 80%;
  .product-list {
    width: 60%;
    border-right: 1px solid rgba(156, 151, 151, 0.5);
    padding-right: 2%;
    margin-right: 2%;

    td img {
      height: 100px;
      width: 100px;
    }
  }
  .cal-price {
    width: 40%;
  }
}
</style>