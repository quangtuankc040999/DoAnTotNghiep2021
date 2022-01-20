<template>
  <div class="nav">
    <div class="content">
      <div class="logo">
        <a href="/"><img src="../assets/Logo-design-Width.png" /></a>
      </div>
      <div class="search-box">
        <v-text-field
          label="Tìm kiếm"
          prepend-inner-icon="mdi-magnify "
        ></v-text-field>
      </div>
      <div class="action" v-if="!userInfoAuth">
        <ul>
          <router-link tag="li" to="/login">Đăng nhập</router-link>
          <router-link tag="li" to="/signup">Đăng ký</router-link>
        </ul>
      </div>
      <div class="action" v-else>
        <ul>
          <router-link tag="li" to="/profile"
            >Xin chào: {{ userInfoAuth.firstName }}{{ userInfoAuth.lastName }}
            <v-icon>mdi-account</v-icon></router-link
          >
          <!-- <li @click="logout">Đăng xuất</li> -->
        </ul>
      </div>
      <div v-if="productCart.length > 0" class="cart">
        <div @click="showCart = !showCart">
          Giỏ hàng/{{ formatPrice(totalPrice(productCart)) }}
          <v-badge
            bordered
            color="error"
            v-bind:content="totalQuantity(productCart)"
            offset-x="10"
            offset-y="10"
          >
            <v-icon>mdi-basket </v-icon>
          </v-badge>

          <div v-if="showCart" class="cart-dropdown" >
            <ul class="cart-dropdown__list">
              <li v-for="(product, index) in productCart" :key="index">
                <img v-bind:src="product.product.image[0]" alt="" />
                {{ product.product.title }}
                <br />
                {{ product.quantity }} *
                {{ formatPrice(product.product.sale_price) }}
              </li>
            </ul>
            <p>
              <span>Tạm tính:</span> {{ formatPrice(totalPrice(productCart)) }}
            </p>
            <div class="btn-action">
              <router-link to="/cart">
                <v-btn class="watch-cart"> XEM GIỎ HÀNG </v-btn>
              </router-link>
              <router-link to="/payment">
                <v-btn class="payment"> THANH TOÁN </v-btn>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="cart">
        <div>
          <router-link to="/cart">
            Giỏ hàng/0đ
            <v-icon>mdi-basket </v-icon>
          </router-link>
        </div>
      </div>
      <div class="navigation-drawes">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-navigation-drawer v-model="drawer" absolute right temporary>
          <v-list nav dense>
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <router-link to="/"
                ><v-list-item>
                  <v-list-item-title>Trang Chủ</v-list-item-title>
                </v-list-item>
              </router-link>

              <router-link to="/blog"
                ><v-list-item>
                  <v-list-item-title>Blog</v-list-item-title>
                </v-list-item>
              </router-link>

              <router-link to="/products"
                ><v-list-item>
                  <v-list-item-title>Sản phẩm</v-list-item-title>
                </v-list-item>
              </router-link>

              <router-link to="/contact"
                ><v-list-item>
                  <v-list-item-title>Liên hệ</v-list-item-title>
                </v-list-item>
              </router-link>

              <router-link v-if="!userInfoAuth" to="/login"
                ><v-list-item>
                  <v-list-item-title>Đăng nhập</v-list-item-title>
                </v-list-item>
              </router-link>
              <li v-else @click="logout">
                <v-list-item>
                  <v-list-item-title>Đăng xuất</v-list-item-title>
                </v-list-item>
              </li>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    drawer: false,
    group: null,
    showCart: false,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
  computed: {
    ...mapGetters({
      productCart: "CART/productCart",
      userInfo: "USER/userInfo",
      userInfoAuth: "AUTH/userInfo",
    }),
  },
  methods: {
    ...mapActions({
      getUserByToken: "AUTH/getUserByToken",
    }),

    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    logout() {
      this.logoutAction();
    },
    ...mapActions({
      logoutAction: "AUTH/logout",
    }),
    totalQuantity(productCart) {
      return productCart.reduce(
        (total, product) => total + product.quantity,
        0
      );
    },
    totalPrice(productCart) {
      return productCart.reduce(
        (total, product) =>
          total + product.quantity * product.product.sale_price,
        0
      );
    },
  },
};
</script>

<style lang="scss" >
.logo,
.action,
.cart,
.navigation-drawes {
  align-self: flex-end;
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: 0.8em;
  color: rgba(102, 102, 102, 0.85);
  text-transform: uppercase;
}
.nav {
  background-color: none;
  width: 80%;
  margin: 0 auto;
  padding: 7.5px 20px;
  border-bottom: 3px rgba(187, 166, 166, 0.3) solid;
}
.search-box {
  width: 20%;
}
.action {
  width: 22%;
  margin-bottom: 0 !important;
}
.cart {
  width: 20%;
  position: relative;
}
img {
  width: 100%;
  height: 100%;
}
.content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-self: center;
  margin-bottom: 10px;
}
.logo {
  width: 20%;
}
ul {
  display: flex;
  list-style: none;
  margin-bottom: 0 !important;
}
.v-input {
  height: 20px !important;
  background-color: none;
}
li {
  margin: 5px 0px;
  cursor: pointer;
  list-style: none;
}
a {
  color: rgba(0, 0, 0, 0.87);
  text-decoration: none;
}
.navigation-drawes {
  border: 1px solid rgba(102, 102, 102, 0.85);
  border-radius: 10px;
}
.v-badge__badge {
  background-color: rgba(214, 100, 100, 0.8);
}
.cart-dropdown {
  background: white;
  border: 1px solid lightgray;
  border-radius: 3px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  color: rgb(10, 10, 10);
  font-size: 1rem;
  font-weight: 300;
  overflow: auto;
  padding: 0 1rem;
  position: absolute;
  top: 30px;
  left: -10px;
  z-index: 1000;
  right: 0;
  width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .cart-dropdown__list {
    overflow-y: auto;
    list-style: none;
    display: flex;
    height: 300px;
    flex-direction: column;
    align-items: center;

    li {
      width: 90%;
      margin: 0.4rem 0;
      display: flex;
      align-items: center;
      padding-bottom: 5px;
      border-bottom: rgba(177, 171, 171, 0.5) 1px solid;
      img {
        height: 90%;
        width: 50%;
        margin-right: 10px;
      }
    }
  }
  p {
    width: 90%;
    color: black !important;
    font-weight: 700;
    text-align: center;
    border-bottom: rgba(177, 171, 171, 0.5) 2px solid;
    span {
      text-transform: unset !important;
      color: rgba(177, 171, 171, 0.9);
    }
  }
  .btn-action {
    width: 90%;
    text-align: center;
    cursor: pointer;
    a:hover {
      text-decoration: none;
    }
    .watch-cart {
      width: 100%;
      color: white !important;
      font-weight: 700;
      background-color: #9e9e9e !important;
      margin-bottom: 10px;
    }
    .payment {
      width: 100%;
      color: white !important;
      font-weight: 700;
      background-color: #d26e4b !important;
      margin-bottom: 10px;
    }
  }
}
</style>