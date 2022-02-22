<template>
  <v-app>
    <page-loader v-bind:isloaded="isLoading" />
    <v-main class="app">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import PageLoader from "./components/PageLoader.vue";
export default {
  name: "App",
  computed: {
    ...mapGetters({
      isLoading: "ERROR/isLoading",
    }),
  },
  components: {
    PageLoader,
  },
};
</script>
<style src="./assets/modifyVuetify.css"></style>
<style lang="scss">
.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media (min-width: 500px) {
    padding: 100px 16px;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
