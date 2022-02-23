<template>
  <div class="listBlog">
    <modal-preview v-if="blogById" :blogById="blogById" ref="modalPreview" />
    <v-data-table
      :headers="headers"
      :items="listBlogs"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>
            <div class="avatar">
              <v-avatar v-if="item.author.avatar"
                ><img :src="item.author.avatar" alt=""
              /></v-avatar>
              <v-avatar v-else color="teal lighten-1">
                <span class="white--text text-h6"
                  >{{ item.author.firstName.charAt(0)
                  }}{{ item.author.lastName.charAt(0) }}</span
                >
              </v-avatar>
              <span style="margin-left: 10px">
                {{ item.author.firstName }}{{ item.author.lastName }}
              </span>
            </div>
          </td>
          <td>{{ item.blogTitle }}</td>
          <td>
            {{ item.blogTopic }}
          </td>

          <td>
            <vue-time-cus-no-time :time="item.createdAt" />
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  v-bind="attrs"
                  v-on="on"
                  @click="showModalPreview(item._id)"
                  ><v-icon small>mdi-eye</v-icon></v-btn
                >
              </template>
              <span>Xem preview</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on" @click="updateBlog({blogId: item._id, body: {isCensored: true}})"
                  ><v-icon small>mdi-check-circle </v-icon></v-btn
                >
              </template>
              <span>Kiểm duyệt</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on" @click="deleteBlog({blogId: item._id, body: {isDeleted: true}})"
                  ><v-icon small>mdi-delete </v-icon></v-btn
                >
              </template>
              <span>Xoá blog</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import modalPreview from "../../Modal/ModalPreviewBlog.vue";
import vueTimeCusNoTime from "../../VueTimeCusNoTime.vue";
export default {
  name: "list-blogs",
  components: { vueTimeCusNoTime, modalPreview },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Tác giả",
          align: "start",
          width: "20%",
        },
        {
          text: "Tên bài viết",
          align: "start",
          width: "20%",
        },
        {
          text: "Chủ đề",
          width: "20%",
          sortable: false,
        },
        {
          text: "Ngày đăng",
          width: "10%",
          sortable: false,
        },
        {
          text: "Hành động",
          width: "10%",
          sortable: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      listBlogs: "BLOGS/listBlogs",
      blogById: "BLOGS/blogById",
    }),
  },
  methods: {
    showModalPreview(idBlog) {
      this.getBlogByIdAction(idBlog);
      this.$refs.modalPreview.show();
    },
    updateBlog(params) {
      this.updateBlogsAction(params);
    },
    deleteBlog(params) {
      this.deleteBlogAction(params);
    },
    ...mapActions({
      getAllBlogAdminAction: "BLOGS/getAllBlogsAdmin",
      getBlogByIdAction: "BLOGS/getBlogById",
      updateBlogsAction: "BLOGS/updateBlog",
      deleteBlogAction: "BLOGS/deleteBlog",
    }),
  },
  created() {
    this.getAllBlogAdminAction();
  },
};
</script>

<style lang="scss" scoped>
td {
  padding: 20px 10px 10px 20px !important;
}
.v-btn {
  min-width: 30px !important;
}
</style>