<template>
  <div class="nav" :class="{ change_color: scrollPosition > 50 }">
    <div class="logo"></div>
    <v-spacer></v-spacer>
    <v-menu v-if="userInfoAuth" offset-y transition="slide-y-transition" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon text v-bind="attrs" v-on="on">
          <img
            class="avt"
            v-if="userInfoAuth.avatar"
            :src="userInfoAuth.avatar"
            alt=""
          />
          <v-avatar v-else color="red" class="avt">
            <span class="white--text"
              >{{ userInfoAuth.firstName.charAt(0)
              }}{{ userInfoAuth.lastName.charAt(0) }}</span
            >
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <router-link tag="li" to="/profile"
            ><i class="bx bx-user-circle"></i>Profile</router-link
          >
        </v-list-item>
        <v-list-item @click="logout">
          <i class="bx bx-exit"></i>Logout
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Navigation",
  data() {
    return {
      scrollPosition: false,
    };
  },
  computed: {
    ...mapGetters({
      userInfoAuth: "AUTH/userInfo",
    }),
  },
  methods: {
    ...mapActions({
      getUserByToken: "AUTH/getUserByToken",
      getUser: "USER/getUser",
    }),
    logout() {
      this.logoutAction();
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
   created(){
    this.getUserByToken()
  
  }
};
</script>
<style scoped>
.nav {
  color: white !important;
  position: fixed;
  padding: 7.5px 20px;
  z-index: 1;
}
.change_color {
  background-color: white !important;
  color: rgb(21, 17, 30) !important;
  border-bottom: 1px solid rgb(201, 197, 197);
}
.change_color .login-btn {
  color: rgb(21, 17, 30) !important;
}
.v-btn {
  border: none;
  height: 40px !important;
  margin-right: 10px;
  font-weight: normal;
  color: white !important;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover {
  background-color: rgb(211, 224, 234);
}
.v-list {
  padding: 0 !important;
  cursor: pointer;
}

li {
  list-style: none;
  cursor: pointer;
}

img {
  width: 50px;
}
.avt {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.logo {
  color: #000;
  font-weight: 900;
  font-size: 20px;
  text-transform: uppercase;
}
.logo img {
  height: 40px;
  width: auto;
}
</style>
