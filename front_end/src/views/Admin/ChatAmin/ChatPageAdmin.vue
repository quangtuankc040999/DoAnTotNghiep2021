<template>
  <div class="chat-page">
    <side-bar-chat :roomChats="roomChats"  class="sidebar-chat" />
    <router-view class="chat-room"/>
  </div>
</template>

<script>
import SideBarChat from "../../../components/Admin/ChatAdmin/SidebarChat.vue";
import {  mapGetters } from 'vuex'
export default {
  components: {
    SideBarChat,
  },
  computed: {
    ...mapGetters({
      roomChats: "ROOM/roomChat",
    }),
  },
};
</script>

<style lang="scss" scoped>
.chat-page {
  display: flex;
  width: 100%;
  .sidebar-chat {
    height: 100vh !important;
  }
  .chat-room {
    height: 100vh !important;
  }
}
</style>