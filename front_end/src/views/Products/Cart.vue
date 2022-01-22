<template>
  <div>
    <navigation />
    <div v-if="productCarts.length > 0" class="cart-container">
      <div class="product-list">
        <table class="table-infor">
          <thead>
            <tr>
              <th style="width: 50%" colspan="2">sản phẩm</th>
              <th style="width: 15%">Giá</th>
              <th style="width: 25%">Số lượng</th>
              <th style="width: 15%">Tạm tính</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in productCarts" :key="index">
              <td style="width: 25%">
                <button
                  class="btn-del"
                  @click="
                    removeProductFromCart(userInfoAuth._id, {
                      idProduct: product.product._id,
                    })
                  "
                  >x</button
                >
                <img v-bind:src="product.product.image[0]" alt="" />
              </td>
              <td style="width: 25%; font-weight: 400">
                <router-link
                  :to="`/products/product-detail/${product.product._id}`"
                >
                  <span>{{ product.product.title }}</span>
                </router-link>
              </td>
              <td style="width: 15%">
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
              <td style="width: 15%">
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
            <v-btn class="back-products"
              ><v-icon>mdi-arrow-left-circle</v-icon>TIẾP TỤC XEM SẢN PHẨM
            </v-btn>
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
a{
    color: rgb(0, 0, 0) !important;
    font-weight: 400;
    margin-left: 0;
}
a:hover {
  text-decoration: none;
  color: #646161 !important;
  font-weight: 500;
}
.cart-container {
  display: flex;
  margin: 0 auto;
  width: 80%;
  .product-list {
    width: 60%;
    border-right: 1px solid rgba(156, 151, 151, 0.5);
    padding-right: 2%;
    margin-right: 2%;
    .table-infor {
      margin-bottom: 20px;
      thead tr th {
        text-transform: uppercase;
        color: #2e97f4;
        border-bottom: rgba(177, 171, 171, 0.5) 3px solid;
        font-size: 1.1rem;
      }
      td img {
        padding: 10px;
        padding-right: 0;
        height: 130px;
        width: 130px;
      }
      td {
        font-size: 20px !important;
        text-align: left;
        font-weight: 600;
      }
      tbody tr {
        margin-top: 10px;
        border-bottom: rgba(177, 171, 171, 0.5) 0.5px solid;
      }
      tbody tr td .btn-del {
        padding-bottom: 30px;
        text-align: center;
        width: 30px !important;
        height: 30px !important;
        color: rgba(173, 173, 173, 0.4);
        border: 2px solid rgba(173, 173, 173, 0.4);
        border-radius: 50%;
        cursor: pointer;
      }
      tbody tr td .btn-del:hover {
        color: black;
        border: 2px solid rgba(0, 0, 0, 0.9);
      }
    }
    .action-cart {
      display: flex;
      justify-content: left;
      .back-products {
        background: rgb(253, 253, 253);
        border: 2px solid rgba(94, 92, 92, 0.6);
        color: rgba(94, 92, 92, 0.6);
        border-radius: 0;
        font-weight: 700;
        cursor: pointer;
        margin: 0 20px 20px 0;
      }
      .back-products:hover {
        background-color: #9e9e9e;
        color: white;
      }
      .update-cart {
        border-radius: 0;
        background-color: #9e9e9e;
        color: white;
        font-weight: 700;
      }
      .update-cart:hover {
        border-radius: 0;
        background-color: #615f5f;
        color: white;
        font-weight: 700;
      }
    }
  }
  .cal-price {
    width: 40%;
  }
}
</style>