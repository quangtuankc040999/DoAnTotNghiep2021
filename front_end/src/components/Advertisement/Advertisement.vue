<template>
  <div
    class="ad"
    :style="{ backgroundImage: 'url(' + this.url + ')' }"
    @click="to(linkBlog)"
  ></div>
</template>

<script>
export default {
  props: ["url", "linkBlog"],
  data() {
    return {};
  },
  methods: {
    to(link) {
      this.$router.push(link);
    },
  },
};
</script>

<style lang="scss" scoped>
.ad {
  height: 90vh !important;
  background-size: 100% 500px !important;
}
</style>