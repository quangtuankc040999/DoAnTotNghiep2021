<template>
  <div class="play-view">
    <side-bar-play class="sidebar" />
    <router-view class="container" />
  </div>
</template>

<script>
import sideBarPlay from "../../components/PlayRubik/SideBarGame.vue";
export default {
  components: {
    sideBarPlay,
  },
  data() {
    return {
    };
  },
  methods:{

  }
};
</script>

<style lang="scss" scoped>
.play-view {
  padding: 0;
  margin: 0;
  display: flex;
  width: 100%!important;
  min-height: 100vh !important;
  .sidebar {
    min-height: 100vh !important;
    width: 20%;
    height: 100%;
  }
  .container{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
  }
}
</style>