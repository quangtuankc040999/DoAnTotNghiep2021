<template>
  <div class="comment-container">
    <div class="user-comment">
      <div class="user-avatar">
        <v-avatar color="red" v-if="comment.createdBy.avatar.length == 0">
          <span class="white--text text-h5"
            >{{ comment.createdBy.firstName.charAt(0)
            }}{{ comment.createdBy.lastName.charAt(0) }}</span
          >
        </v-avatar>
        <v-avatar color="red" v-else>
          <img :src="comment.createdBy.avatar" alt="" />
        </v-avatar>
      </div>
      <div class="div2">
        <span class="user-name"
          >{{ comment.createdBy.firstName }} {{ comment.createdBy.lastName }}
        </span>
        <div class="star">
          <AwesomeVueStarRating
            :star="this.star"
            :disabled="this.disabled"
            :maxstars="this.maxstars"
            :starsize="this.starsize"
            :hasresults="this.hasresults"
            :hasdescription="this.hasdescription"
          />
        </div>
      </div>
    </div>

    <div class="content">
      <div class="content-text">
        <span>{{ comment.content }}</span>
      </div>
      <div class="content-image">
        <ul v-if="comment.images.length > 0">
          <li
            v-for="(imgRatting, index) in comment.images"
            :key="index"
            class="imgItem"
          >
            <img :src="imgRatting" alt="" />
          </li>
        </ul>
      </div>
    </div>
    <span class="time"><vue-time-cus :time="comment.createdAt" /></span>
  </div>
</template>

<script>
import AwesomeVueStarRating from "awesome-vue-star-rating";
import VueTimeCus from "../VueTimeCus.vue";
export default {
  name: "comment-item",
  props: ["comment", "indexComment"],
  components: {
    AwesomeVueStarRating,
    VueTimeCus,
  },
  data() {
    return {
      avatar: this.comment.createdBy.avatar,
      star: this.comment.star,
      hasresults: false,
      hasdescription: false,
      starsize: "xs", //[xs,lg,1x,2x,3x,4x,5x,6x,7x,8x,9x,10x],
      maxstars: 5,
      disabled: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.comment-container {
  width: 100%;
  background-color: rgba(245, 245, 245, 0.2);
  padding: 10px;
  border-bottom: 1px solid rgba(218, 218, 255, 0.5);
  .user-comment {
    display: flex;
    margin: 5px;

    .user-avatar {
      margin-right: 2%;
    }
    .div2 {
      .user-name {
        font-size: 1.2rem;
        font-weight: 700;
      }
    }
  }

  .content,
  .time {
    margin-left: 8%;
  }
  .content {
    display: flex;
    flex-direction: column;
    .content-text {
      font-size: 1rem;
    }
    .content-image {
      img {
        height: 100px;
        width: auto;
        padding: 5px;
        margin-bottom: 0;
      }
    }
  }
  .time {
    font-size: 0.7rem;
  }
  ul {
    padding-left: 0;
    list-style: none;
    display: flex;
  }
}
</style>
<style scoped>
.v-avatar {
  background-color: rgb(228, 95, 95);
  color: rgb(253, 253, 253);
}
</style>