<template>
  <div class="nav">
    <div class="content">
      <div class="logo">
        <a href="/"><img src="../assets/Logo-design-Width.png" /></a>
      </div>
      <div class="search-box">
        <v-text-field
          @click="hoverOut"
          v-on:keyup="searchProduct"
          label="Tìm kiếm"
          v-model="search"
          prepend-inner-icon="mdi-magnify "
        ></v-text-field>
        <div class="search-dropdown" v-if="productInforSearch.length > 0">
          <ul class="search-dropdown__list">
            <li v-for="(product, index) in productInforSearch" :key="index">
              <img v-bind:src="product.image[0]" alt="" />
              <div v-if="product" @click="toProductDetail(product._id)">
                {{ product.title }}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="action" v-if="!userInfoAuth">
        <ul>
          <v-btn text @click="to('login')"> Đăng nhập </v-btn>
          <v-btn text @click="to('signup')"> Đăng ký </v-btn>
        </ul>
      </div>
      <div class="action" v-else>
        <ul>
          <v-btn text @click="to('profile')"
            >Xin chào: {{ userInfoAuth.firstName }} {{ userInfoAuth.lastName }}
            <v-icon>mdi-account</v-icon></v-btn
          >
        </ul>
      </div>
      <div v-if="productCart.length > 0" class="cart">
        <div class="cart-label">
          Giỏ hàng/{{ formatPrice(totalPrice(productCart)) }}
          <v-badge
            v-if="totalQuantity(productCart) <= 9"
            bordered
            color="red darken-1"
            v-bind:content="totalQuantity(productCart)"
            offset-x="10"
            offset-y="10"
          >
            <v-icon>mdi-cart </v-icon>
          </v-badge>
          <v-badge
            v-if="totalQuantity(productCart) > 9"
            bordered
            color="red darken-1"
            v-bind:content="'9+'"
            offset-x="10"
            offset-y="10"
          >
            <v-icon>mdi-cart </v-icon>
          </v-badge>

          <div class="cart-dropdown">
            <ul class="cart-dropdown__list">
              <li v-for="(product, index) in productCart" :key="index">
                <img v-bind:src="product.product.image[0]" alt="" />
                <div
                  v-if="product.product"
                  @click="toProductDetail(product.product._id)"
                >
                  {{ product.product.title }}
                  <br />
                  {{ product.quantity }} *
                  {{ formatPrice(product.product.sale_price) }}
                </div>
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
        <div class="cart-label">
          <v-btn text @click="to('cart')">
            Giỏ hàng/0đ
            <v-icon>mdi-cart </v-icon>
          </v-btn>
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
              <input
                v-on:keyup="searchProductBar"
                v-model="searchBar"
                class="input-search"
                type="text"
                placeholder="Tìm kiếm"
              /><v-icon>mdi-magnify </v-icon>
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
              <router-link v-if="userInfoAuth" to="/play-rubik"
                ><v-list-item>
                  <v-list-item-title>Play</v-list-item-title>
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
    search: "",
    searchBar: "",
    drawer: false,
    group: null,
    showCart: false,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
    search() {
      console.log(this.search);
      if (this.search != "") {
        this.searchMethod();
      } else {
        this.clearProductInforSearch();
      }
    },
  },
  computed: {
    ...mapGetters({
      productInforSearch: "PRODUCTS/productInforSearch",
      productCart: "CART/productCart",
      userInfo: "USER/userInfo",
      userInfoAuth: "AUTH/userInfo",
    }),
  },
  methods: {
    hoverOut() {
      this.clearProductInforSearch();
    },
    toProductDetail(id) {
      this.clearProductInforSearch();
      this.$router.push(`/products/product-detail/${id}`);
    },
    searchMethod() {
      this.getAllProductLikeNameNoPaginationAction({ title: this.search });
    },
    searchProduct(e) {
      if (e.keyCode === 13) {
        this.clearProductInforSearch();
        this.$router.push({
          path: `/products/search/`,
          query: { title: this.search },
        });
      }
    },

    searchProductBar(e) {
      if (e.keyCode === 13) {
        this.clearProductInforSearch();
        this.$router.push({
          path: `/products/search/`,
          query: { title: this.searchBar },
        });
      }
    },

    to(page) {
      if (page && page == "profile") {
        this.clearProductInforSearch();
        this.$router.push("/profile/user/manage-account/");
      } else if (page && page == "login") {
        this.$router.push("/login");
      } else if (page && page == "signup") {
        this.$router.push("/signup");
      } else if (page && page == "cart") {
        this.clearProductInforSearch();
        this.$router.push("/cart");
      }
    },

    ...mapActions({
      getAllProductLikeNameNoPaginationAction:
        "PRODUCTS/getAllProductLikeNameNoPagination",
      getUserByToken: "AUTH/getUserByToken",
      getUser: "USER/getUser",
      logoutAction: "AUTH/logout",
      userProductCartAction: "CART/userProductCart",
      getUserAction: "USER/getUser",
      clearProductInforSearch: "PRODUCTS/clearProductInforSearch",
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
  created() {
    if (localStorage.getItem("token")) {
      this.getUserByToken();
    }
    if (this.userInfoAuth) {
      this.getUserAction(this.userInfoAuth._id);
    }
  },
};
</script>

<style lang="scss" scoped>
.logo,
.action,
.cart,
.navigation-drawes {
  align-self: flex-end;
  font-weight: 700;
  font-size: 0.8em;
  color: rgba(102, 102, 102, 0.85);
  text-transform: uppercase;
}
.nav {
  background-color: none;
  width: 100%;
  margin: 0 auto;
  padding: 0px 20px;
  border-bottom: 1px rgba(187, 166, 166, 0.3) solid;
  .logo {
    width: 20% !important;
    img {
      margin-top: 10px;
      max-width: 100%;
    }
  }
}
.search-box {
  width: 20%;
  margin-bottom: 2px !important;
}
.action {
  width: 20%;
  margin-bottom: 9px !important;
  .v-icon {
    margin-bottom: 7px;
    margin-left: 5px;
  }
}
.cart {
  width: 15%;
  position: relative;
  margin-bottom: 2px !important;
  font-weight: 500;
  .v-icon {
    margin-bottom: 10px;
    margin-left: 5px;
  }
  a {
    color: rgba(102, 102, 102, 0.85) !important;
    text-decoration: none;
  }
  a:hover {
    color: rgba(39, 38, 38, 0.85) !important;
    text-decoration: none;
  }
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
  text-decoration: none !important;
}
.navigation-drawes {
  border: 1px solid rgba(102, 102, 102, 0.85);
  border-radius: 10px;
  margin-bottom: 10px;
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
  padding: 0 0.4rem;
  position: absolute;
  top: 30px !important;
  left: -30px !important;
  z-index: 1000;
  right: 0 !important;
  width: 22rem;
  height: 400px;
  flex-direction: column;
  align-items: center;
  .cart-dropdown__list {
    overflow-y: auto;
    list-style: none;
    display: flex;
    height: 300px;
    flex-direction: column;

    li {
      width: 90%;
      margin: 0.4rem 0;
      display: flex;
      align-items: center;
      border-bottom: rgba(177, 171, 171, 0.5) 1px solid;
      img {
        height: 100%;
        width: 40%;
        margin-right: 10px;
        margin-left: 0;
      }
      div {
        width: 60%;
      }
      .product-cart {
        color: rgb(0, 0, 0) !important;
      }
      .product-cart:hover {
        text-decoration: none;
      }
    }
    li:hover {
      background-color: rgb(216, 216, 216);
    }
  }
  p {
    width: 90%;
    margin-top: 10px;
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
.cart-dropdown {
  display: none;
}
.cart-label {
  top: 7px;
  padding-bottom: 6px;
}
.cart:hover .cart-dropdown {
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.v-list {
  margin-top: 20px;
}
.v-navigation-drawer {
  width: 20% !important;
  background-color: rgb(255, 255, 255) !important;
}
.input-search {
  border: 1px solid rgb(226, 226, 226);
  padding: 10px;
  width: 90%;
  font-weight: 300;
  border-radius: 20px;
}
.search-box {
  position: relative;
  .search-dropdown {
    background: white;
    border: 1px solid lightgray;
    border-radius: 3px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    color: rgb(10, 10, 10);
    font-size: 1rem;
    font-weight: 300;
    overflow: auto;
    padding: 0 0.4rem;
    position: absolute;
    top: 50px !important;
    left: -10px !important;
    z-index: 1000;
    right: 0 !important;
    width: 24rem;
    flex-direction: column;
    align-items: center;
    .search-dropdown__list {
      overflow-y: auto;
      list-style: none;
      display: flex;
      height: 300px;
      flex-direction: column;
      li {
        width: 90%;
        margin: 0.4rem 0;
        display: flex;
        align-items: center;
        img {
          height: 100%;
          width: 40%;
          margin-right: 10px;
          margin-left: 0;
        }
        div {
          width: 60%;
        }
        .product-cart {
          color: rgb(0, 0, 0) !important;
        }
        .product-cart:hover {
          text-decoration: none;
        }
      }
      li:hover {
        background-color: rgb(216, 216, 216);
      }
    }
  }
}
</style>
