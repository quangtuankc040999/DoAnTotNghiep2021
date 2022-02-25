<template>
  <div>
       <v-badge 
          v-if="badge && badge.length < 9"
          color="red"
          :content="badge.length"
          :value="badge.length"
          left
        >
        </v-badge>
        <v-badge 
          v-else-if="badge && badge.length >= 9"
          color="red"
          :content="'9+'"
          left
        >
        </v-badge>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["idRoom"],
  computed: {
    ...mapGetters({
      notificationsAdmin: "CHAT/notificationsAdmin",
    }),
    badge() {
      return this.notificationsAdmin.find(
        (element) => element.roomId == this.idRoom
      );
    },
  },
};
</script>

<style>
</style>