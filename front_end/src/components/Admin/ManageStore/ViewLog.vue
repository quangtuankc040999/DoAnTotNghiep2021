<template>
  <div class="view-log">
    <v-row>
      <v-col cols="9" sm="5">
        <v-menu
          ref="menu1"
          v-model="menu1"
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
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu1 = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu1.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="2" sm="2">
        <v-btn @click="getAllLogByTime()" class="search"> Tìm</v-btn>
      </v-col>
    </v-row>

    <div class="info-log">
      <div class="import">
        <v-simple-table dense class="simple-tale">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">Nhập hàng</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in listImport" :key="i">
                <td><content-log :log="item" /></td>
              </tr>

            </tbody>
          </template>
        </v-simple-table>
        <h5>
          Tổng: <span>{{ formatPrice(sumImport(listImport)) }}</span>
        </h5>
      </div>
      <div class="out-put">
       <v-simple-table dense class="simple-tale">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">Xuất hàng</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in listOutput" :key="i">
                <td><content-log :log="item" /></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <h5>
          Tổng: <span>{{ formatPrice(sumOut(listOutput)) }}</span>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ContentLog from "./ContentLog.vue";
export default {
  components: { ContentLog },
  data() {
    return {
      listImport: [],
      listOutput: [],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu1: false,
    };
  },
  computed: {
    ...mapGetters({
      listLog: "LOG/listLog",
    }),
  },
  methods: {
    sumOut(list) {
      let listRevenueLog = [];
      for (let logContent of list) {
        listRevenueLog.push(
          logContent.logContents.reduce(
            (total, product) =>
              total + product.quantity * product.product.sale_price,
            0
          )
        );
      }

      return listRevenueLog.reduce(
        (total, revenueLog) => total + revenueLog,
        0
      );
    },
    sumImport(list) {
      let listRevenueLog = [];
      for (let logContent of list) {
        listRevenueLog.push(
          logContent.logContents.reduce(
            (total, product) =>
              total + product.quantity * product.product.import_price,
            0
          )
        );
      }

      return listRevenueLog.reduce(
        (total, revenueLog) => total + revenueLog,
        0
      );
    },
    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    getAllLogByTime() {
      this.getAllLogByTimeAction(this.date);
    },
    totalImportGoodsDay() {
      console.log(this.listImport);
    },
    ...mapActions({
      getAllLogByTimeAction: "LOG/getAllLog",
    }),
  },
  created() {
    this.getAllLogByTimeAction(new Date());
  },
  watch: {
    listLog() {
      this.listImport = this.listLog.filter((log) => log.status == "Nhập hàng");
      this.listOutput = this.listLog.filter((log) => log.status == "Xuất hàng");
    },
  },
};
</script>

<style lang="scss" scoped>
.info-log {
  height: 85vh !important;
  display: flex;
  width: 100% !important;
  justify-content: space-between;
  p {
    height: 50px;
    width: 100%;
    font-size: 25px;
    font-weight: 700;
    color: white;
    background-color: rgba(139, 139, 139, 0.8);
    text-align: center;
  }
  .import {
    width: 50% !important;
  }
  .out-put {
    width: 50% !important;
  }
}
.div-content-log {
  height: 70vh;
  max-height: 70vh;
  overflow: auto;
  padding: 10px 20px;
}
h5 {
  font-size: 1.2rem;
  margin-left: 20px !important;
  span {
    font-size: 1.6rem;
    font-weight: 700;
    color: red;
  }
}
.view-log {
  max-height: 93vh !important;
  height: 93vh !important;
}
.simple-tale{
  overflow: auto;
  min-height: 77vh !important;
  max-height: 77vh !important;
}
</style>