<template>
  <div class="contact-us">
      <info class="contact-infor"/>
  </div>
</template>

<script>
import info from './Infor.vue'
export default {
    components: {info}
};
</script>

<style lang="scss" scoped>
.contact-us {
  height: 900px !important;
   background-size: 130% 800px;
  background-image: url("https://www.rubiksgift.com/wp-content/themes/rubiksgift2020/img/bottom-section-bg.png");
  position: relative !important;
  .contact-infor{
      position: absolute !important;
      width: 35% !important;
      height: 70% !important;
      top: 90px;
      right: 50px;

  }
}
</style>