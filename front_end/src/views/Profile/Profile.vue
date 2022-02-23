<template>
  <div>
    <navigation />
    <div class="container">
      <side-bar-user class="side-bar" />
      <router-view class="router-view" />
    </div>
    <footerRubik />
    <v-btn @click="toggleShowChat" v-show="!isShow">
      <v-icon large>mdi-forum</v-icon></v-btn
    >
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
    }),
  },
  methods: {
    ...mapActions({
      toggleShowChatAction: "CHAT/toggleShowChat",
      getRoomChatOfUserAction: "ROOM/getRoomChatUser",
    }),
    toggleShowChat() {
      this.toggleShowChatAction(true);
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