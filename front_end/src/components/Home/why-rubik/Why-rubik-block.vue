<template>
  <div class="why-rubik-block">
    <div class="image-icon">
      <img :src="image" alt="" />
    </div>
    <div class="title">
      <p>{{ title }}</p>
    </div>
    <div class="text">
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["image", "title", "text"],
};
</script>

<style lang="scss" scoped>
.why-rubik-block {
  border-radius: 10px;
  background-color: white;
  height: 400px;
  width: 245px;
  margin-left: 10px;
  padding: 30px;

  .image-icon {
    img {
    }
    img:hover {
      cursor: pointer;
      transform: rotateZ(-200deg) scale(1.1) !important;
    }
    width: 100%;
    margin-bottom: 20px;
  }
  .title {
    padding-top: 0px !important;
    height: 70px !important;
    margin-bottom: 10px;
    font-weight: 800;
    font-size: 1.4rem !important;
  }
  .text {
    font-size: 0.5rem;
  }
}
</style>