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
            >Xin chào: {{ userInfoAuth.firstName
            }}{{ userInfoAuth.lastName }} <v-icon>mdi-account</v-icon></router-link
          >
          <!-- <li @click="logout">Đăng xuất</li> -->
        </ul>
      </div>
      <div class="cart">
        <div>Giỏ hàng/0đ <v-icon>mdi-basket </v-icon></div>
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
    <hr />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
  computed: {
    ...mapGetters({
      userInfo: "USER/userInfo",
      userInfoAuth: "AUTH/userInfo",
    }),
  },
  methods: {
    logout() {
      this.logoutAction();
    },
    ...mapActions({
      logoutAction: "AUTH/logout",
    }),
  },
};
</script>

<style >
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
}
.search-box {
  width: 20%;
}
.action {
  width: 22%;
  margin-bottom: 0 !important;
}
.cart {
  width: 10%;
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
.navigation-drawes{
  border: 1px solid rgba(102, 102, 102, 0.85);
  border-radius: 10px;
}
</style>