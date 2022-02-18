<template>
  <div class="manage-product">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          small
          dark
          color="deep-purple lighten-2"
          v-bind="attrs"
          v-on="on"
          @click="showModalProduct('add', '')"
          style="float: right"
          ><v-icon class="icon-add">mdi-plus</v-icon></v-btn
        >
      </template>
      <span>Thêm sản phẩm</span>
    </v-tooltip>

    <modal-product
      v-if="productById"
      :productRequest="productById"
      :idProduct="idProduct"
      :modalType="action"
      ref="modalProduct"
    />
    <modal-product
      v-else
      :productRequest="productRequest"
      :idProduct="idProduct"
      :modalType="action"
      ref="modalProduct"
    />

    <div class="product-list">
      <v-card-title>
        <v-text-field
          class="search"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search ... "
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="productInfors"
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
            <td>{{ item.title }}</td>
            <td>
              <img v-if="item.image.length != 0" :src="item.image[0]" />
              <img v-else-if="item.image.length == 0" :src="imageEmpty" />
            </td>
            <td>
              <v-chip
                color="purple lighten-3"
                dark
                style="margin-bottom: 5px"
                >{{ item.category_name }}</v-chip
              >
              <v-chip color="teal lighten-3" dark>{{
                item.category_detail
              }}</v-chip>
            </td>
            <td class="price">
              {{ formatPrice(item.sale_price) }}
            </td>
            <td>{{ item.inventory }}</td>
            <td>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text
                    v-bind="attrs"
                    v-on="on"
                    @click="showModalProduct('edit', item._id)"
                    ><v-icon small>mdi-pencil </v-icon></v-btn
                  >
                </template>
                <span>Chỉnh sửa sản phẩm</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text
                    v-bind="attrs"
                    v-on="on"
                    @click="deleteProduct(item._id)"
                    ><v-icon small>mdi-delete-outline </v-icon></v-btn
                  >
                </template>
                <span>Xoá sản phẩm</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import modalProduct from "../../../components/Admin/ModalProduct.vue";
export default {
  name: "manage-product",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Sản phẩm",
          align: "start",
          value: "title",
          width: "20%",
        },
        { text: "Hình ảnh", value: "image", sortable: false },
        {
          text: "Phân loại",
          value: "category_name",
          width: "20%",
          align: "center",
        },
        { text: "Giá bán", value: "sale_price", width: "15%" },
        { text: "Tồn kho", width: "15%" },
        { text: "Hành động", value: "", width: "15%" },
      ],
      imageEmpty:
        "https://thegioirubik.com/wp-content/uploads/woocommerce-placeholder.png",
      productRequest: {
        title: "",
        brand: "",
        product_key: [],
        starting_price: 0,
        discount: 0,
        sale_price: 0,
        description: "",
        category_name: "",
        category_detail: "",
        inventory: 0,
        image: [],
      },
      action: "add",
      idProduct: "",
    };
  },
  components: {
    modalProduct,
  },
  computed: {
    ...mapGetters({
      categoryInfor: "SIDEBAR/categoryInfo",
      productById: "PRODUCTS/productById",
      productInfors: "PRODUCTS/productInfor",
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
      getAllProduct: "PRODUCTS/getAllProduct",
      getProductInforAction: "PRODUCTS/getProduct",
      clearState: "PRODUCTS/clearState",
      deleteProductAction: "PRODUCTACTION/deleteProduct",
      getCategoryInfor: "SIDEBAR/getCategory",
    }),
    deleteProduct(productId) {
      this.deleteProductAction(productId);
    },
    showModalProduct(flag, idProduct) {
      if (flag == "add") {
        this.action = "add";
        this.idProduct = idProduct;
        this.clearState();
      } else if (flag == "edit") {
        this.action = "edit";
        this.idProduct = idProduct;
        this.getProductInforAction(this.idProduct);
      }
      this.$refs.modalProduct.show();
    },
  },
  created() {
    this.getAllProduct();
    this.getCategoryInfor();
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/style.scss";
p {
  font-size: 1rem;
  color: $color !important;
  font-weight: 700;
  text-transform: uppercase !important;
  padding-bottom: 10px;
  border-bottom: rgba(177, 171, 171, 0.5) 1px solid;
}
img {
  padding: 5px;
  width: 150px;
  height: 150px;
}
.manage-product {
  overflow-y: auto;
  width: 100% !important;
  height: 95vh !important;
}
tr {
  height: 100% !important;
}
td {
}
.elevation-1 {
  width: 100%;
}
</style>
<style scoped>
.v-btn {
  padding: 0 !important;
  min-width: 40px !important;
  /* font-size: 2rem !important; */
}
.v-icon,
.price {
  font-size: 1.2rem !important;
}
.icon-add {
  font-size: 1.4rem !important;
}
.search{
  /* position: fixed;
  top: 0;
  background-color: aquamarine;
  margin: 0; */
}
.v-btn{
  margin-top: 30px;
}
</style>