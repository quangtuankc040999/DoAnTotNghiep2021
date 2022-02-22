<template>
  <div class="comment-blog">
    <div class="avatar">
      <v-avatar v-if="comment.author.avatar"
        ><img :src="comment.author.avatar" alt=""
      /></v-avatar>
      <v-avatar v-else color="teal lighten-1">
        <span class="white--text text-h6"
          >{{ userInfoAuth.firstName.charAt(0)
          }}{{ userInfoAuth.lastName.charAt(0) }}</span
        >
      </v-avatar>
    </div>
    <div class="comment">
      <p>{{ comment.content }}</p>
      <h6><vue-time-cus :time="comment.createdAt" /></h6>
    </div>
  </div>
</template>

<script>
import vueTimeCus from "../../components/VueTimeCusNoTime.vue";
export default {
  props: ["comment"],
  components: {
    vueTimeCus,
  },
};
</script>

<style lang="scss" scoped>
.comment-blog {
  padding: 10px 0;
  margin: 15px 0 !important;
  display: flex;
  width: 100% !important;
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