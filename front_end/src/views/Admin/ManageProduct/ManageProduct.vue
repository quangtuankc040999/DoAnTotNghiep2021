<template>
  <div class="manage-product">
    <v-btn text
      @click="showModalProduct('add', '')"
      style="float: right"
      ><v-icon class="icon-add">mdi-plus-circle-outline </v-icon></v-btn
    >
     <p>Danh sách sản phẩm</p>
     
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
      <v-data-table
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
            <td>{{item.inventory}}</td>
            <td>
              <v-btn text @click="showModalProduct('edit', item._id)"
                ><v-icon small>mdi-pencil </v-icon></v-btn
              >
              <v-btn text @click="deleteProduct(item._id)"
                ><v-icon small>mdi-delete-outline </v-icon></v-btn
              >
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
        { text: "Tồn kho",  width: "15%" },
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
  },
};
</script>

<style lang="scss" scoped>
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
.v-icon, .price {
  font-size: 1.2rem !important;
}
.icon-add{
  font-size: 1.4rem !important;
}
</style>