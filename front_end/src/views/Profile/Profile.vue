<template>
  <div>
    <navigation />

    <div class="container">
      <side-bar-user class="side-bar" />
      <router-view class="router-view" />
    </div>
    <footerRubik />

    <v-btn @click="toggleShowChat" v-show="!isShow">
      <v-badge
        v-if="notifications"
        bordered
        color="red darken-1"
        :content="notifications.length"
        :value="notifications.length"
        offset-x="-25"
        offset-y="-15"
      >
      </v-badge>
      <svg width="36" height="36" viewBox="0 0 36 36">
        <path
          fill="white"
          d="M1 17.99C1 8.51488 8.42339 1.5 18 1.5C27.5766 1.5 35 8.51488 35 17.99C35 27.4651 27.5766 34.48 18 34.48C16.2799 34.48 14.6296 34.2528 13.079 33.8264C12.7776 33.7435 12.4571 33.767 12.171 33.8933L8.79679 35.3828C7.91415 35.7724 6.91779 35.1446 6.88821 34.1803L6.79564 31.156C6.78425 30.7836 6.61663 30.4352 6.33893 30.1868C3.03116 27.2287 1 22.9461 1 17.99ZM12.7854 14.8897L7.79161 22.8124C7.31238 23.5727 8.24695 24.4295 8.96291 23.8862L14.327 19.8152C14.6899 19.5398 15.1913 19.5384 15.5557 19.8116L19.5276 22.7905C20.7193 23.6845 22.4204 23.3706 23.2148 22.1103L28.2085 14.1875C28.6877 13.4272 27.7531 12.5704 27.0371 13.1137L21.673 17.1847C21.3102 17.4601 20.8088 17.4616 20.4444 17.1882L16.4726 14.2094C15.2807 13.3155 13.5797 13.6293 12.7854 14.8897Z"
        ></path>
      </svg>
    </v-btn>

    <transition name="chat-page">
      <chat-page v-show="isShow" class="chat" />
    </transition>
  </div>
</template>

<script>
import Navigation from "../../components/Navigation.vue";
import FooterRubik from "../../components/Footer.vue";
import ChatPage from "../../components/Chat/ChatPage.vue";
import SideBarUser from "../../components/User/SideBarUser.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Profile",
  components: {
    Navigation,
    FooterRubik,
    SideBarUser,
    ChatPage,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isShow: "CHAT/isShowChat",
      roomChatOfUser: "ROOM/roomChatOfUser",
      notifications: "CHAT/notifications",
    }),
  },
  methods: {
    ...mapActions({
      toggleShowChatAction: "CHAT/toggleShowChat",
      getRoomChatOfUserAction: "ROOM/getRoomChatUser",
      updateNotificationAction: "CHAT/updateNotification",
      getAllChatByIdRoom: "CHAT/getAllChatByIdRoom",
    }),
    toggleShowChat() {
      this.toggleShowChatAction(true);
      this.getAllChatByIdRoom(this.roomChatOfUser._id);
      this.updateNotificationAction(this.roomChatOfUser._id);
    },
  },
  created() {
    this.getRoomChatOfUserAction();
  },
};
</script>

<style lang="scss" scoped>
.chat {
  transition: 1s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;
  position: fixed;
  width: 500px;
  height: 400px;
  bottom: 0;
  right: 0;
}
.container {
  min-height: 100vh;
  width: 100% !important;
  display: flex;

  transition: 1s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;
}
.side-bar {
  margin: 0 10px 0 0;
  width: 20%;
}
.router-view {
  width: 80% !important;
  border-left: 1px solid rgb(158, 147, 147, 0.5);
}
.v-btn {
  &:hover {
    transform: rotateZ(-20deg) scale(1.1);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}
.chat-page-enter-active,
.chat-page-leave-active {
  transition: all 1s ease;
}

.chat-page-enter {
  transform: translateY(300px);
}

.chat-page-enter-to {
  transform: translateY(0);
}

.chat-page-leave-to {
  transform: translateY(400px);
}
</style>
<style scoped>
.v-btn {
  position: fixed;
  height: 60px !important;
  width: 60px !important;
  bottom: 40px;
  border-radius: 50%;
  right: 40px;
  background-color: rgb(212, 91, 91) !important;
  color: whitesmoke !important;
}
</style>