<template>
  <div class="chat-page">
    <div class="chat-page-header">
      <span>Chat</span>
      <v-btn text @click="closeChatWindow"
        ><v-icon >mdi-chevron-down-circle-outline</v-icon>
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
    align-content: center;
    padding: 5px;
    padding-left: 20px;
    padding-bottom: 0 !important;
    background-color: rgb(210,110,75);
    font-weight: 700;
    text-transform: uppercase;
    color: white;
  }
}
.v-icon{
  color: white !important;
}
</style>