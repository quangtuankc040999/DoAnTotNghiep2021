<template>
  <div>
    <navigation />
    <div class="container">
      <side-bar-user class="side-bar" />
      <router-view class="router-view" />
    </div>
    <footerRubik />
    <chat-page
      v-show="isShow"
      class="chat"
    />
    <v-btn @click="toggleShowChat" v-show="!isShow">
      <v-icon>mdi-forum</v-icon>Chat</v-btn
    >
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
    return {
    };
  },
  computed:{
    ...mapGetters({
      isShow: "CHAT/isShowChat",
      roomChatOfUser: "ROOM/roomChatOfUser"
    })
  },
  methods: {
    ...mapActions({
      toggleShowChatAction: "CHAT/toggleShowChat",
      getRoomChatOfUserAction: "ROOM/getRoomChatUser"
    }),
    toggleShowChat() {
      this.toggleShowChatAction(true);
    },
  },
  created(){
    this.getRoomChatOfUserAction()
  }
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
</style>
<style scoped>
.v-btn {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: rgb(212, 91, 91) !important;
  color: whitesmoke !important;
}
</style>