<template>
  <v-card max-width="450" class="mx-auto sidebar-chat">
    <v-list three-line>
      <template v-for="item in roomChats" class="room-sidebar">
        <v-list-item :key="item.title" @click="toRoomChat(item._id)">
          <v-list-item-avatar>
            <v-img
              v-if="item.member.avatar.length != 0"
              :src="item.member.avatar"
            ></v-img>
            <v-avatar v-else size="45" color="red lighten-1" class="img">
              <span class="white--text"
                >{{ item.member.firstName.charAt(0)
                }}{{ item.member.lastName.charAt(0) }}</span
              >
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              v-html="item.member.lastName + ' ' + item.member.firstName"
            ></v-list-item-title>
            <v-list-item-subtitle
              v-html="item.member.email"
            ></v-list-item-subtitle>
          </v-list-item-content>
          <badge-notification  class="badge-notification" :idRoom="item._id" />
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import BadgeNotification from "./BadgeNotification.vue";
export default {
  props: ["roomChats"],
  components: {
    BadgeNotification,
  },
  data: () => ({}),
  computed: {
    ...mapGetters({}),
  },
  methods: {
    toRoomChat(idRoom) {
      this.$router.push(`/admin/manage-chat/${idRoom}`);
    },
  },
};
</script>

<style scoped>
.content {
  display: flex !important;
  flex-direction: row;
  height: 100vh;
  width: 100%;
  justify-content: flex-start;
  align-self: left !important;
  margin-bottom: 10px;
}
.sidebar-chat {
  overflow-y: auto;
}
.v-list-item {
  border-bottom: 1px solid rgb(216, 216, 216) !important;
}
.badge-notification{
  margin-left: 0 !important;
}
</style>
