<template>
  <div class="blogs">
    <blog-post :post="welcomeScreen" />
    <blog-post
      :post="post"
      v-for="(post, index) in sampleBlogPost"
      :key="index"
    />

    <div class="blog-card-wrap">
      <h3>View More Recent Blogs</h3>
      <div class="toggle-edit" v-if="userInfo && userInfo.role.name == 'Admin'">
        <span>Toggle Editing Post</span>
        <input type="checkbox" v-model="editPost" />
      </div>
      <div class="container">
        <div class="blog-cards">
          <BlogCards
            :post="post"
            :editPost="editPost"
            v-for="(post, index) in blogCardsInfor"
            :key="index"
          />
        </div>
      </div>
      <div class="text-center">
        <v-pagination v-if="numberPages >1"
          v-model="page"
          :length="numberPages"
          circle
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "../../components/Blogs/BlogPost.vue";
import BlogCards from "../../components/Blogs/BlogCard.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Blog",
  components: {
    BlogPost,
    BlogCards,
  },
  data() {
    return {
      page: 1,
      editPost: false,
      welcomeScreen: {
        title: "Xin chào!",
        blogPost:
          "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding",
      },
      sampleBlogPost: [
        {
          blogTitle: "Title blog post",
          blogHTML:
            "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
          blogCoverPhoto:
            "https://images.unsplash.com/photo-1562975327-29a8cbfd5be6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "USER/userInfo",
      blogCardsInfor: "BLOGS/listBlogs",
      numberRecords: "BLOGS/numberRecords",
      numberPages: "BLOGS/numberPages",
    }),
  },
  methods: {
    ...mapActions({
      getAllBlogsAction: "BLOGS/getAllBlogsPagination",
    }),
  },
  created() {
    this.getAllBlogsAction({ page: 1 });
  },
  watch: {
    page() {
      this.getAllBlogsAction({ page: this.page });
    },
  },
};
</script>

<style lang="scss" scoped>
.blogs {
  min-width: 200px !important;
}
.blog-card-wrap {
  h3{
    margin-left: 70px;
  }
  position: relative;
  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: 100px;
    right: 120px;

    span {
      margin-right: 16px;
    }

    input[type="checkbox"] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: rgb(197, 197, 197);
      outline: none;
      width: 30px;
      height: 15px;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input[type="checkbox"]:before {
      content: "";
      position: absolute;
      width: 15px;
      height: 15px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type="checkbox"]:before {
      background: rgb(158, 158, 158);
      left: 18px;
    }
  }
}
</style>