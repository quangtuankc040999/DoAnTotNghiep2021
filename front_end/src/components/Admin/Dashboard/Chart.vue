<script>
// import helper from '../../utils/data';
import { mapGetters } from "vuex";
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data() {
    return {
      // gradient: null,
      // gradient2: null,
    };
  },
  computed: {
    ...mapGetters({
      listOrderByMonth: "DASHBOARD/listOrder",
    }),
    listLabel() {
      let listLabel = [];
      for (let i = 0; i < this.listOrderByMonth.length; i++) {
        listLabel.push(i + 1);
      }
      return listLabel;
    },
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    // this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    // this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    // this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    // this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    // this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    // this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

    this.renderChart(
      {
        labels: this.listLabel,
        datasets: [
          {
            label: "Đơn hàng",
            borderColor: "#E53935",
            pointBackgroundColor: "black",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: this.listOrderByMonth,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
  watch: {
    listOrderByMonth() {
      this.gradient = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);
      this.gradient2 = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);

      // this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
      // this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
      // this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

      // this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
      // this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
      // this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

      this.renderChart(
        {
          labels: this.listLabel,
          datasets: [
            {
              label: "Đơn hàng",
              borderColor: "#E53935",
              pointBackgroundColor: "black",
              borderWidth: 1,
              pointBorderColor: "white",
              backgroundColor: this.gradient,
              data: this.listOrderByMonth,
            },
          ],
        },
        { responsive: true, maintainAspectRatio: false }
      );
    },
  },
  
};
</script>
