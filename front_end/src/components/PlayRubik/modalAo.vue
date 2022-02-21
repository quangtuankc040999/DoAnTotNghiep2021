<template>
  <b-modal
    id="modalAo"
    ref="modalAo"
    hide-footer
    size="lg md"
    class="col-lg-6"
    hide-header-close
    scrollable
    @hide="doWhenHide"
  >
    <p class="generated">Generated on <vue-time-cus :time="getDayNow()" /></p>
    Sloves/Total: {{ slove }}/{{ slove }}
    <div class="single">
      <p class="single title">Single</p>
      <label>Best: {{ Math.min(...this.csTimes) }}</label>
      <label>Wost: {{ Math.max(...this.csTimes) }}</label>
    </div>
    <div class="ao5">
      <p class="ao5 title">avg of 5</p>
      <label>Current: {{ ao5.at(-1) }}</label>
      <label>Best: {{ Math.min(...ao5.slice(4)) }}</label>
    </div>
    <div class="ao12">
      <p class="ao12 title">avg of 12</p>
      <label>Current: {{ ao12.at(-1) }}</label>
      <label>Best: {{ Math.min(...ao12.slice(11)) }}</label>
    </div>
    <p>Average: {{ avgTimes() }}</p>
    Time List:
    <b-table striped hover :items="history"></b-table>
  </b-modal>
</template>

<script>
import VueTimeCus from "../VueTimeCus.vue";
export default {
  components: { VueTimeCus },
  name: "modal-ao",
  component: {
    VueTimeCus,
  },
  props: ["history", "csTimes", "slove", "ao5", "ao12"],
  data() {
    return {};
  },
  methods: {
    getDayNow() {
      var dayNow = Date(Date.now());
      return dayNow.toString();
    },
    avgTimes() {
      const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
      return Math.round(average(this.csTimes) * 100) / 100;
    },
    show() {
      this.$refs.modalAo.show();
    },
    doWhenHide() {
    },
    hideModal() {
      this.$refs.modalAo.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.generated {
  display: flex;
}
label {
  display: block;
  margin-top: 0px;
  margin-left: 20px;
}
table {
  width: 100%;
}
.title {
  margin-bottom: 0px;
}
.single,
.ao5,
.ao12 {
  margin-bottom: 10px;
}
</style>