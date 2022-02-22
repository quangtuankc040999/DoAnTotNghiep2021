<template>
  <div>
    <navigation />
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Navigation from "../../components/Blogs/NavigationBlog.vue";
export default {
  components:{
    Navigation
  },
  computed: {
    ...mapGetters({
      userInfoAuth: "AUTH/userInfo",
    }),
  },
  methods: {
    ...mapActions({
      getUserByToken: "AUTH/getUserByToken",
      getUserAction: "USER/getUser",
    }),
  },
  created() {
    if (localStorage.getItem("token")) {
      this.getUserByToken();
    }
    if (this.userInfoAuth) {
      this.getUserAction(this.userInfoAuth._id);
    }
  },
};
</script>

<style>
</style>