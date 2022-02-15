<template>
  <v-card class="side-bar">
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini">
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

        <v-list-item-title>Trang quản lý</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link @click="manageProduct">
          <v-list-item-icon>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Quản lý sản phẩm</v-list-item-title>
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
    items: [
      { title: "Quản lý tài khoản", icon: "mdi-home-city" },
      { title: "Quản lý sản phẩm", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
    mini: true,
  }),
  components: {},
  computed: {
    ...mapGetters({
      rooms: "CHAT/rooms",
      // notifications: 'NOTIFICATION/notifications',
      userInfoAuth: "AUTH/userInfo",
      // userRole: 'AUTH/userRole',
    }),
  },
  methods: {
    manageProduct() {
      this.$router.push(`/admin/manage-product/`);
    },
    ...mapActions({
      getUserByToken: "AUTH/getUserByToken",
      getUser: "USER/getUser",
      //     // getAllChatByIdRoom: 'CHAT/getAllChatByIdRoom',
      //     // addCurrentRoom: 'CHAT/addCurrentRoom',
      //     // removeUnreadNotification: 'NOTIFICATION/removeUnreadNotification',
    }),

    //   clearMessage() {
    //     this.messages = 0;
    //   },

    //   handleClickChatRoom() {
    //     this.$router.push(`/chatroom/`);
    //   },
    //   handleClickChatRoomItem(room) {
    //     this.removeUnreadNotification(room._id);
    //     this.$router.push(`/chatroom/${room._id}`);
    //     this.mini = true;
    //   },

    //   handleClickProjectManagement() {},
  },
  created() {
    this.getUserByToken();
  },
  // watch: {},
};
</script>
<style scoped>
.side-bar{
  height: 100%;
}
.v-sheet.v-card:not(.v-sheet--outlined){
  box-shadow: none;
}
</style>