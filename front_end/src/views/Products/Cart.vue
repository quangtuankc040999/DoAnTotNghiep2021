<template>
  <div>
    <navigation />
    <div v-if="productCarts.length > 0" class="cart-container">
      <div class="product-list">
        <v-data-table
          :headers="headers"
          :items="productCarts"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td class="cart-td product-info">
                <v-btn
                  text
                  class="btn-del"
                  @click="
                    removeProductFromCart(userInfoAuth._id, {
                      idProduct: item.product._id,
                    })
                  "
                >
                  <v-icon>mdi-close-circle-outline</v-icon>
                </v-btn>
                <img :src="item.product.image[0]" alt="" />
              </td>
              <td>
                <router-link
                  :to="`/products/product-detail/${item.product._id}`"
                >
                  <span>{{ item.product.title }}</span>
                </router-link>
              </td>
              <td class="cart-td">
                {{ formatPrice(item.product.sale_price) }}
              </td>
              <td class="cart-td">
                <v-card flat class="py-12">
                  <v-card-text>
                    <v-row align="center" justify="center">
                      <v-btn-toggle mandatory>
                        <v-btn
                          @click="
                            updateQuantityCart(
                              'subtract',
                              item.product.inventory,
                              item
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
                          >{{ item.quantity }}</span
                        >
                        <v-btn
                          @click="
                            updateQuantityCart(
                              'add',
                              item.product.inventory,
                              item
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
              <td class="cart-td">
                {{
                  formatPrice(calOne(item.quantity, item.product.sale_price))
                }}
              </td>
            </tr>
          </template>
        </v-data-table>

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
            <td class="blue1">Tạm tính:</td>
            <td class="price">{{ formatPrice(totalPrice(productCarts)) }}</td>
          </tr>
          <tr>
            <td class="blue1">Phí giao hàng:</td>
            <td class="price">
              {{ formatPrice(15000) }}
            </td>
          </tr>
          <tr>
            <td class="blue1">Tổng:</td>
            <td class="price">
              {{ formatPrice(totalPrice(productCarts) + 15000) }}
            </td>
          </tr>
        </table>
        <router-link to="/payment">
          <v-btn class="btn-payment"> TIẾN HÀNH THANH TOÁN </v-btn>
        </router-link>
      </div>
    </div>
    <div v-else class="cart-empty">
      <img src="../../assets/empty-cart.png" alt="" />
      <router-link to="/products">
        <v-btn class="back-products"> TRỞ LẠI CỬA HÀNG </v-btn>
      </router-link>
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
  data() {
    return {
      headers: [
        {
          text: "Sản phẩm",
          align: "start",
          value: "title",
          width: "20%",
        },
        { text: "", value: "", width: "20%", sortable: false },
        { text: "Giá bán", value: "", width: "15%" },
        {
          text: "Số lượng",
          value: "category_name",
          align: "center",
          width: "10%",
        },
        { text: "Tạm tính", value: "sale_price", width: "20%" },
      ],
    };
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
      getUserAction: 'USER/getUser',
      removeProductFromCartAction: "CART/removeProductFromCartDB",
    }),
    removeProductFromCart(userId, product) {
      this.removeProductFromCartAction({
        id: userId,
        product: { idProduct: product.idProduct },
      });
    },
  },
  created() {
    this.getUserByToken();
    if (this.userInfoAuth) {
      this.getUserAction(this.userInfoAuth._id);
      this.getProductCartOfUserAction(this.userInfoAuth._id);
    }
  },
};
</script>

<style lang="scss" scoped>
a {
  color: rgb(0, 0, 0) !important;
  font-weight: 400;
  margin-left: 0;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
  color: #646161 !important;
  font-weight: 500;
}
.cart-container {
  display: flex;
  margin: 0 auto;
  width: 90%;
  .product-list {
    width: 70%;
    border-right: 1px solid rgba(156, 151, 151, 0.5);
    padding-right: 2%;
    margin-right: 2%;
    margin-top: 5px;

    .action-cart {
      display: flex;
      justify-content: left;
      margin-top: 4%;
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
    width: 30%;
    height: 50%;
    padding: 10px;
    padding-top: 0;
    margin-top: 5px;
    p {
      font-weight: 700;
    }
    tr {
      td {
        padding: 10px 0;
        border-bottom: 1px solid rgba(201, 182, 182, 0.5);
      }
    }
    table {
      width: 100%;
      .price {
        font-weight: 700;
      }
      .blue1 {
        color: #2e97f4 !important;
        font-weight: 700;
        font-size: 1rem;
      }
    }
  }
}
.cart-empty {
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
  img {
    width: 188px;
    height: 177px;
    margin: 20px auto;
  }
  .back-products {
    background: rgb(41, 39, 39, 0.4) !important;
    border: 2px solid rgba(94, 92, 92, 0.6);
    color: rgba(255, 249, 249);
    border-radius: 0;
    font-weight: 700;
    cursor: pointer;
    margin: 0 20px 20px 0;
  }
}
</style>
<style scoped>
.product-info {
  padding: 2px !important;
}
.cart-td {
  font-size: 1rem !important;
  font-weight: 700;
}
.btn-payment {
  background-color: #d26e4b !important;
  color: white !important;
  font-weight: 700;
  margin-top: 20px;
  width: 100%;
}
.btn-del {
  min-width: 20px !important;
  padding: 0 !important;
  margin: 5px;
}
td img {
  padding-right: 10px;
  height: 130px;
  width: 130px;
}
.v-application .py-12 {
  padding: 0 !important;
}
</style>