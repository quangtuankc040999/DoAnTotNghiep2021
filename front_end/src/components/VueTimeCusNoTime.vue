<template>
  <div v-if="time">
    {{getTime }}
  </div>
</template>

<script>
import helper from "../utils/data";
export default {
  props: {
    time: {
      type: String,
    },
  },
  computed: {
    getTime() {
      let year = new Date(this.time).getFullYear();
      let month = helper.shortMonth[new Date(this.time).getMonth()];
      let day = new Date(this.time).getDate();
      // let hours = new Date(this.time).getHours();
      // let min = new Date(this.time).getMinutes();
      // let second = new Date(this.time).getSeconds()
      return `${day} ${month}, ${year} ` ;
    },
  },
};
</script>

<style>
</style>