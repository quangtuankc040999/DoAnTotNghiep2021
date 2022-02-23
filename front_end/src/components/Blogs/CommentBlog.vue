<template>
  <div class="comment-blog">
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
      <p v-if="userInfo._id === comment.author._id" style="font-size: 10px">
        <v-chip class="ma-1" color="grey lighten-1" small >
          Tác giả
        </v-chip>
      </p>
      <p>{{ comment.content }}</p>
      <h6><vue-time-cus :time="comment.createdAt" /></h6>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import vueTimeCus from "../../components/VueTimeCusNoTime.vue";
export default {
  props: ["comment"],
  components: {
    vueTimeCus,
  },
  computed: {
    ...mapGetters({
      userInfo: "AUTH/userInfo",
    }),
  },
};
</script>

<style lang="scss" scoped>
.comment-blog {
  padding: 10px 0;
  margin: 15px 0 !important;
  display: flex;
  width: 100% !important;
  .avatar {
    margin: auto 0;
  }
  .comment {
    display: flex;
    flex-direction: column;
    h6 {
      font-size: 0.7rem;
      margin-left: 20px;
      margin-top: 0px;
    }
  }
}
p {
  margin-bottom: 5px !important;
  margin-left: 20px;
}
</style>