<template>
  <div class="container">
    <v-card>
      <v-tabs color="deep-purple accent-4" right>
        <v-tab> <p>Thống kê đơn hàng</p></v-tab>
        <v-tab> <p>Thống kê doanh thu</p></v-tab>
        <v-tab-item>
          <v-row align="center" justify="center">
            <v-col class="d-flex" cols="9" sm="6">
              <v-select
                :items="items"
                label="Tất cả đơn hàng"
                v-model="status"
              ></v-select>
            </v-col>

            <v-col cols="9" sm="5">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Tháng"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" type="month" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="11">
              <v-btn @click="getAllOrderByMonth" class="search"> Tìm</v-btn>
            </v-col>
          </v-row>

          <br />
          <Chart class="chart" />
          <p style="text-align: center">
            Tổng đơn hàng tháng {{ date.substr(5, 7) }} -
            {{ date.substr(0, 4) }}
          </p></v-tab-item
        >
        <v-tab-item>
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :return-value.sync="dates"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dates"
                    label="Tháng"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dates" type="month" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu1 = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu1.save(dates)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="1" >
              <v-btn @click="statisticaRevenue" class="search"> Tìm</v-btn>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="11">
              <p v-if="listRevenue.length > 0">
                Tổng: {{ totalRevenueInMonth() }}
              </p></v-col
            >
          </v-row>
          <chart-revenue class="chart" />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Chart from "../../../components/Admin/Dashboard/Chart.vue";
import ChartRevenue from "../../../components/Admin/Dashboard/ChartRevenue.vue";
export default {
  components: {
    Chart,
    ChartRevenue,
  },
  data() {
    return {
      status: "",
      items: [
        "Tất cả đơn hàng",
        "Chờ xác nhận",
        "Đã huỷ",
        "Đã đóng gói, đang vận chuyển",
        "Đã hoàn thành",
        "Đã đánh giá",
      ],
      date: new Date().toISOString().substr(0, 7),
      dates: new Date().toISOString().substr(0, 7),
      menu: false,
      menu1: false,
    };
  },
  computed: {
    ...mapGetters({
      listOrderByMonth: "DASHBOARD/listOrder",
      listRevenue: "DASHBOARD/listRevenue",
    }),
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    ...mapActions({
      getAllOrderByMonthAction: "DASHBOARD/getAllOrderByMonth",
      getAllLogStatisticalAction: "DASHBOARD/getAllLogStatistical",
    }),
    statisticaRevenue() {
      this.getAllLogStatisticalAction({ month: this.dates });
    },
    getAllOrderByMonth() {
      this.getAllOrderByMonthAction({ date: this.date, status: this.status });
    },
    totalRevenueInMonth() {
      return this.formatPrice(
        this.listRevenue.reduce((total, revenueLog) => total + revenueLog, 0)
      );
    },
  },
  created() {
    this.getAllOrderByMonthAction({
      date: new Date(),
      status: "Tất cả đơn hàng",
    });
    this.getAllLogStatisticalAction({
      month: new Date(),
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 !important;
  margin: 0 !important;
  max-width: 100vw !important;
  height: 100% !important;
}
.v-btn {
  border: none;
  height: 40px !important;
  margin-right: 10px;
  font-weight: normal;
  color: #82b1ff !important;
}
.chart {
  width: 90% !important;
  margin: 0 auto !important;
}
.search {
  border: none;
  height: 40px !important;
  margin-right: 10px;
  font-weight: normal;
  color: white !important;
  background-color: rgb(210, 110, 75) !important;
}
p {
  text-transform: uppercase;
}
.v-tabs {
  min-height: 100vh !important;
  padding: 40px !important;
}
.v-tab-item {
  padding: 10px;
}
</style>
