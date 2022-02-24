<template>
  <div class="chat-page">
    <div class="chat-page-header">
      <span>Chat</span>
      <v-btn text @click="closeChatWindow"
        ><v-icon small>mdi-chevron-down-circle-outline</v-icon>
      </v-btn>
    </div>
    <chat/>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Chat from '../Chat/Chat.vue'
export default {
  components: {
    Chat,
  },
  methods: {
    ...mapActions({
      getAllChatByIdRoom: "CHAT/getAllChatByIdRoom",
      toggleShowChatAction: "CHAT/toggleShowChat",
    }),
    closeChatWindow() {
      this.toggleShowChatAction(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-page {
  background-color: rgb(255, 255, 255);
  border: 1px solid gray;
  .chat-page-header {
    display: flex;
    justify-content: space-between;
  }
}
</style>