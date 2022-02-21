<template>
  <v-card class="side-bar">
    <v-navigation-drawer>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <img v-if="userInfoAuth.avatar" :src="userInfoAuth.avatar" alt="" />
          <v-avatar v-else color="teal lighten-1">
            <span class="white--text text-h6"
              >{{ userInfoAuth.firstName.charAt(0)
              }}{{ userInfoAuth.lastName.charAt(0) }}</span
            >
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-title
          >{{ userInfoAuth.firstName
          }}{{ userInfoAuth.lastName }}</v-list-item-title
        >
        <!-- <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn> -->
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link @click="toSinglePage">
          <v-list-item-icon>
            <v-icon>mdi-account </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Singleplayer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Multiplayer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense>
        <v-list-item link @click="manageHome">
          <v-list-item-icon>
            <v-icon>mdi-logout </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Trở về trang chủ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>


<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Sidebar",
  data: () => ({
    drawer: true,
    mini: true,
  }),
  components: {},
  computed: {
    ...mapGetters({
      userInfoAuth: "AUTH/userInfo",
    }),
  },
  methods: {
    // manageLogout() {
    //   this.logoutAction();
    // },
    manageHome() {
      this.$router.push(`/`);
    },
    toSinglePage() {
      this.$router.push(`/play-rubik/single-player`);
    },
    // manageStore() {
    //   this.$router.push(`/admin/manage-store/`);
    // },
    // manageChat() {
    //   this.$router.push(`/admin/manage-chat/${this.roomChats[0]._id}`);
    // },
    ...mapActions({
      getUserByToken: "AUTH/getUserByToken",
      getUser: "USER/getUser",
      logoutAction: "AUTH/logout",
    }),
  },
  created() {
    if (localStorage.getItem("token")) {
      this.getUserByToken();
    }
    if (this.userInfoAuth) {
      this.getUser(this.userInfoAuth._id);
    }
  },
};
</script>
<style scoped>
.side-bar {
  height: 100%;
  background-color: rgb(238, 238, 238) !important;
}
.v-navigation-drawer{
  background-color: rgb(238, 238, 238) !important;
  height: 100vh !important;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
</style>