<template>
  <div class="container">
    <div
      class="blog-cover-photo"
      :style="{ backgroundImage: `url(${blogById.blogCoverPhoto})` }"
    ></div>
    <div class="main-container">
      <div class="content-blog">
        <div class="blog-title">
          <h2>{{ blogById.blogTitle }}</h2>
        </div>
        <div class="blog-info">
          <h6 v-if="blogById.author">
            Tác giả:
            {{ blogById.author.lastName }} {{ blogById.author.firstName }}
          </h6>
          <h6>
            {{
              new Date(blogById.createdAt).toLocaleString("en-us", {
                dateStyle: "long",
              })
            }}
          </h6>
        </div>
        <div class="post-content ql-editor" v-html="blogById.blogHTML"></div>
      </div>
      <div class="list-blog">
        <div class="new-blog">
          <p>Bài viết mới nhất</p>
          <ul>
            <li
              v-for="(blog, index) in this.blogLastest"
              :key="index"
              @click="handelClick(blog._id)"
            >
              {{ blog.blogTitle }}
            </li>
          </ul>
        </div>
        <div class="same-topic">
          <p>Bài viết cùng chủ đề</p>
          <ul>
            <li
              v-for="(blog, index) in this.blogTopic"
              :key="index"
              @click="handelClick(blog._id)"
            >
              {{ blog.blogTitle }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h5>Bình luận ({{numberRecords}})</h5>
    <div v-if="userInfoAuth" class="comment-blog">
      <div class="div1">
        <div class="avatar">
          <v-avatar v-if="userInfoAuth.avatar"
            ><img :src="userInfoAuth.avatar" alt=""
          /></v-avatar>
          <v-avatar v-else color="teal lighten-1">
            <span class="white--text text-h6"
              >{{ userInfoAuth.firstName.charAt(0)
              }}{{ userInfoAuth.lastName.charAt(0) }}</span
            >
          </v-avatar>
        </div>
        <div class="input-comment">
          <v-text-field
            label="Nhập bình luận của bạn vào đây ... "
            v-model="commentBlog"
            v-on:keyup="handelComment"
            append-icon="mdi-send "
          ></v-text-field>
        </div>
      </div>
      <comment-blog
        class="comment1"
        :comment="comment"
        v-for="(comment, index) in listComment"
        :key="index"
      />
      <v-pagination
        v-if="numberPages > 1"
        v-model="page"
        :length="numberPages"
        circle
      ></v-pagination>
    </div>
    <div v-else class="comment-blog">
      <h6>Hãy đăng nhập để xem đánh giá hoặc là tham gia đánh giá!</h6>
      <router-link to="/login">Đăng nhập </router-link>
    </div>
  </div>
</template>

<script>
import commentBlog from "../../components/Blogs/CommentBlog.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "blog-detail",
  components: {
    commentBlog,
  },
  data() {
    return {
      commentBlog: "",
      page: 1,
      image: "",
    };
  },
  computed: {
    ...mapGetters({
      blogById: "BLOGS/blogById",
      blogLastest: "BLOGS/lastestBlog",
      blogTopic: "BLOGS/blogTopic",
      userInfoAuth: "AUTH/userInfo",
      listComment: "COMMENTBLOG/listComment",
      numberPages: "COMMENTBLOG/numberPages",
      numberRecords: "COMMENTBLOG/numberRecords",
    }),
  },
  methods: {
    handelComment(e) {
      if (e.keyCode === 13) {
        this.commentBlogAction({
          blogId: this.blogById._id,
          commentContent: this.commentBlog,
        }).then(() => {
          this.commentBlog = "";
        });
      }
    },
    handelClick(blogId) {
      this.$router.push(`/blog/detail/${blogId}`);
    },
    ...mapActions({
      commentBlogAction: "COMMENTBLOG/createNewComment",
      getBlogByIdAction: "BLOGS/getBlogById",
      getBlogLastestAction: "BLOGS/getLastestBlog",
      commentBlogsAction: "COMMENTBLOG/createNewComment",
      getCommentByBlogIdAction: "COMMENTBLOG/getAllCommentByBlogId",
    }),
  },
  created() {
    this.getBlogByIdAction(this.$route.params.blogId);
    this.getCommentByBlogIdAction({
      blogId: this.$route.params.blogId,
      page: 1,
    });
    this.getBlogLastestAction();
  },
  watch: {
    page() {
      this.getCommentByBlogIdAction({
        blogId: this.$route.params.blogId,
        page: this.page,
      });
    },
    $route() {
      this.$router.go();
      this.getBlogByIdAction(this.$route.params.blogId);
      this.getBlogLastestAction();
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-cover-photo {
  margin: 0 !important;
  padding: 0 !important;
  height: 300px;
  width: 100% !important;
  background-size: cover;
}
.main-container {
  display: flex;
  margin: 0 !important;
  position: relative;

  .content-blog {
    max-width: 80%;
    width: 80%;
    padding: 30px;
  }
  .list-blog {
    width: 20%;
    box-shadow: 2px 4px #e2e2e2;
    border-radius: 20px;
    border: 1px solid gray;
    position: absolute;
    top: 20px;
    right: 0px;
    padding: 20px;
    p{
      text-transform: uppercase;
      color: rgb(210,110,75);
      font-weight: 600;
    }
    ul {
      li {
        cursor: pointer;
        color: rgb(102, 92, 247);
        margin: 10px 0;
        max-width: 100% !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      li:hover {
        color: rgb(7, 0, 99);
        text-decoration: underline;
      }
    }
  }
}
.comment-blog {
  .div1 {
    display: flex;
    width: 90% !important;
    .avatar {
      width: 6% !important;
    }
    .input-comment {
      width: 80% !important;
    }
  }
}
.blog-info {
  h6 {
    font-size: .9rem;
    margin-left: 10px;
  }
}
.blog-title{
  h2{
    font-size: 2.5rem !important;
    text-transform: uppercase;
    font-weight: 600;
    color: rgb(210,110,75);
  }
}
</style>