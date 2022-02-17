<template>
  <div class="error-page">
    <div class="container">
      <img
        src="https://cdn.drlinkcheck.com/blog/403-forbidden.png"
        alt=""
      />
      <br />
      <button @click="backToHomePage">
        <i class="bx bx-log-out"> </i> Back to HomePage
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  methods: {
    backToHomePage() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";

.error-page {
  width: 100vw;
  height: 100vh;
  text-align: center;
  .container {
    img {
      width: 100%;
      height: 100%;
    }
    button {
      background-color: $color;
      border: 1px solid grey;
      padding: 0.5em;
      border-radius: 10px;
    }
  }
}
</style>