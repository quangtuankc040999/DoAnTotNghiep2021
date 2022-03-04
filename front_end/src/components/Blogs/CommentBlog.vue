<template>
  <div class="comment-blog">
    <div class="commentAll">
      <div class="avatar">
        <v-avatar v-if="comment.author.avatar"
          ><img :src="comment.author.avatar" alt=""
        /></v-avatar>
        <v-avatar v-else color="teal lighten-1">
          <span class="white--text text-h6"
            >{{ comment.author.firstName.charAt(0)
            }}{{ comment.author.lastName.charAt(0) }}</span
          >
        </v-avatar>
      </div>
      <div class="comment">
        <p
          v-if="comment.blog.author === comment.author._id"
          style="font-size: 10px"
        >
          <v-chip outlined class="ma-1" color="black" small> Tác giả </v-chip>
        </p>
        <p class="text">{{ comment.content }}</p>

        <h6>
          <vue-time-cus :time="comment.createdAt" />
          <span @click="rep">Trả lời</span>
        </h6>
        <h6 v-if="comment.reply.length > 0" v-show="!isShow">
          <v-icon small>mdi-reply</v-icon>
          <span @click="isShow = !isShow">
            Xem thêm {{ comment.reply.length }} phản hồi</span
          >
        </h6>
      </div>
    </div>

    <div class="reply" v-bind:class="{ show: isShow }">
      <div class="old-reply" v-for="(rep, i) in comment.reply" :key="i">
        <div class="avatar">
          <v-avatar v-if="rep.authorReply.avatar"
            ><img :src="rep.authorReply.avatar" alt=""
          /></v-avatar>
          <v-avatar v-else color="teal lighten-1">
            <span class="white--text text-h6"
              >{{ rep.authorReply.firstName.charAt(0)
              }}{{ rep.authorReply.lastName.charAt(0) }}</span
            >
          </v-avatar>
        </div>
        <div class="comment">
          <p
            v-if="comment.blog.author === rep.authorReply._id"
            style="font-size: 10px"
          >
            <v-chip outlined class="ma-1" color="black" small> Tác giả </v-chip>
          </p>
          <p class="text">{{ rep.contentReply }}</p>
        </div>
      </div>
      <div class="input-reply">
        <v-text-field
          id="input"
          label="Nhập bình luận của bạn vào đây ... "
          v-model="replyComment"
          v-on:keyup="handleReply"
          append-icon="mdi-send "
        ></v-text-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vueTimeCus from "../../components/VueTimeCusNoTime.vue";
export default {
  props: ["comment"],
  components: {
    vueTimeCus,
  },
  data() {
    return {
      isShow: false,
      replyComment: "",
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "AUTH/userInfo",
    }),
  },
  methods: {
    rep() {
      this.isShow = !this.isShow;
      document.getElementById("input").focus();
    },
    handleReply(e) {
      if (e.keyCode === 13) {
        if (this.replyComment != "") {
          this.updateCommentBlogAction({
            commentBlogId: this.comment._id,
            contentReply: this.replyComment,
            blogId: this.comment.blog._id,
          }).then(() => {
            this.replyComment = "";
          });
        }
      }
    },
    ...mapActions({
      updateCommentBlogAction: "COMMENTBLOG/updateCommentBlog",
    }),
  },
};
</script>

<style lang="scss" scoped>
.comment-blog {
  .commentAll {
    padding: 10px 0;
    display: flex;
    width: 100% !important;
    .avatar {
      margin: auto 0;
    }
    .comment {
      padding: 2px;
      border-radius: 20px;
      margin-left: 10px;

      width: 70% !important;
      display: flex;
      flex-direction: column;
      h6 {
        display: flex;
        font-size: 0.7rem;
        margin-left: 20px;
        margin-top: 0px;
        span {
          margin-left: 10px;
          cursor: pointer;
        }
        span:hover {
          text-decoration: underline;
          transform: scale(1.1);
          color: navy;
        }
      }
    }
  }
}
p {
  margin-bottom: 5px !important;
  margin-left: 20px;
}
.v-btn {
  text-transform: none;
}
.reply {
  transition: 0.5s;
  margin-left: 40px !important;
  opacity: 0;
  height: 0px !important;
  pointer-events: none;
  .old-reply {
    padding: 10px 0;
    display: flex;
    width: 100% !important;
    .avatar {
      margin: auto 0;
    }
    .comment {
      padding: 2px;
      border-radius: 20px;
      margin-left: 10px;

      width: calc(70% - 40px) !important;
      display: flex;
      flex-direction: column;
      h6 {
        font-size: 0.7rem;
        margin-left: 20px;
        margin-top: 0px;
      }
    }
  }
}
.input-reply {
  width: 70%;
  margin-left: 20px;
}
.show {
  opacity: 1;
  height: auto !important;
  transition: opacity 0.5s ease;
  pointer-events: auto;
}
.text {
  font-size: 1.2rem;
}
</style>