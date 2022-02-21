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
      let hours = new Date(this.time).getHours();
      if(hours < 10){
        hours = "0" + hours
      }
      let min = new Date(this.time).getMinutes();
      if(min < 10){
        min = "0" + min
      }

      // let second = new Date(this.time).getSeconds()
      return `${day} ${month}, ${year}  ${hours}:${min}` ;
    },
  },
};
</script>

<style>
</style>