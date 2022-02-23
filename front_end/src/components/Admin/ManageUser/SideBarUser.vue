<template>
  <div class="sidebar-user">
    <v-card>
      <v-tabs color="deep-purple accent-4" right>
        <v-tab>Khách hàng</v-tab>
        <v-tab>Bài viết</v-tab>
        <v-tab-item><list-user/> </v-tab-item>
        <v-tab-item><list-blogs/> </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import ListUser from './ListUser.vue';
import ListBlogs from './ListBlog.vue';
export default {
  components: {
    ListUser,
    ListBlogs
  },
  data() {
    return {};
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.sidebar-user {
  // padding-top: 20px;
}
.v-list-item-group {
}
.v-tabs{
  min-height: 100vh  !important;
}
</style>