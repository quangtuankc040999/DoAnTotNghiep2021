<template>
  <div class="import-goods">
    <div class="btn-file-container">
      <v-btn @click="chooseFile" class="btn-choosefile">Chọn tệp</v-btn>
      <input type="text" id="file_name" placeholder="choose file..." />
      <input
        type="file"
        class="my_input"
        @change="importExcel"
        id="upload"
        ref="file_input"
      />
    </div>
    <div class="product-list">
      <v-data-table
        :headers="headers"
        :items="readExcelRecords"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:[`header.title`]="{ header }">
          {{ header.text }}
        </template>
        <template v-slot:[`header.image`]="{ header }">
          {{ header.text }}
        </template>

        <template v-slot:item="{ item }">
          <tr>
            <td v-if="item.status == 1"> <v-icon color="amber lighten-1">mdi-home-import-outline </v-icon></td>
            <td v-else-if="item.status == 2"><v-icon color="green lighten-1">mdi-new-box </v-icon></td>

            <td>{{ item.title }}</td>
            <td>
              {{ item.category_name }}
              <br />
              {{ item.category_detail }}
            </td>
            <td class="price">
              {{ formatPrice(item.import_price) }}
            </td>
            <td>{{ item.quantity }}</td>
            <td>
              {{ formatPrice(item.total) }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <v-btn class="btn-import" :disabled="isDisable" @click="importGoods"
      >Nhập hàng</v-btn
    >
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "import-goods",
  data() {
    return {
      isDisable: true,
      headers: [
        { text: "Thao tác", width: "3%",align:"center", sortable: false },
        { text: "Tên Sản phẩm", value: "image", width: "10%", sortable: false },
        {
          text: "Phân loại",
          value: "category_name",
          width: "10%",
          align: "center",
        },
        { text: "Giá nhập/ Cái", width: "10%" },
        {
          text: "Số lượng nhập",
          value: "",
          width: "10%",
          align: "center",
        },
        {
          text: "Tổng nhập",
          value: "",
          width: "10%",
          align: "center",
        },
      ],
      readExcelRecords: [],
    };
  },
  computed: {
    ...mapGetters({
      productById: "PRODUCTS/productById",
      productInfors: "PRODUCTS/productInfor",
    }),
  },
  methods: {
    importExcel(e) {
      document.getElementById("file_name").value = e.target.files[0].name;
      const files = e.target.files;
      // check file is xsls
      if (!files.length) {
        return;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        return alert(
          "The upload format is incorrect. Please upload xls or xlsx format"
        );
      }
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          var XLSX = require("xlsx");
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          const wsname = workbook.SheetNames[0]; // Take the first sheet，wb.SheetNames[0] :Take the name of the first sheet in the sheets
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // Generate JSON table content，wb.Sheets[Sheet名]    Get the data of the first sheet
          const excellist = []; // Clear received data
          // Edit data
          for (var i = 0; i < ws.length; i++) {
            excellist.push(ws[i]);
          }
          console.log("Read results", excellist); // At this point, you get an array containing objects that need to be processed
          this.readExcelRecords = excellist;
          this.isDisable = false;
        } catch (e) {
          console.log("Read failure!", e);
        }
      };
      fileReader.readAsBinaryString(files[0]);
      var input = document.getElementById("upload");
      input.value = "";
    },
    chooseFile() {
      this.$refs.file_input.click();
    },
    importGoods() {
      for (let record of this.readExcelRecords) {
        if (record.status == 1) {
          this.updateProductAction({
            productId: record._id,
            body: { quantity: record.quantity },
          });
        }
      }
      this.createNewLogAction({
        status: "Nhập hàng",
        logContents: this.readExcelRecords,
      });
    },
    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    ...mapActions({
      getAllProduct: "PRODUCTS/getAllProduct",
      getProductInforAction: "PRODUCTS/getProduct",
      updateProductAction: "PRODUCTACTION/importProduct",
      createNewLogAction: "LOG/createNewLog",
    }),
  },
  created() {},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/style.scss";
.my_input {
  display: none;
}
td {
  padding: 30px 10px !important;
}
.import-goods {
  height: 100% !important;
  .btn-file-container {
    margin: 20px;
    #file_name {
      margin-left: 10px;
      padding: 10px;
      border: 1px solid rgb(187, 187, 187);
      border-radius: 25px;
    }
  }
}
.v-btn {
  background-color: $color !important ;
  text-align: center !important;
  font-weight: 700;
  color: white !important;
  bottom: 0;
}
.btn-import {
  position: fixed;
  bottom: 0;
  margin-top: 20px !important;
}
.btn-choosefile {
}
</style>