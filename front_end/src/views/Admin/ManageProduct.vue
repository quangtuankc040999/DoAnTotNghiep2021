<template>
  <div class="manage-product">
    <b-button
      variant="primary"
      @click="showModalProduct('add', '')"
      style="float: right"
      >Add Product</b-button
    >

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
    <p>Danh sách sản phẩm</p>
    <div class="product-list">
      <table class="table-infor">
        <thead>
          <td colspan="2" style="width: 45%">Sản phẩm</td>
          <td style="width: 20%">Phân loại</td>
          <td style="width: 10%">Giá bán</td>
          <td style="width: 20%">Hành động</td>
        </thead>
        <tbody>
          <tr v-for="(product, index) in productInfors" :key="index">
            <td style="width: 25%">
              <img
                v-if="product.image[0].length != 0"
                v-bind:src="product.image[0]"
                alt=""
                style="padding: 25px 25px 25px 0px"
              />
              <img
                v-else-if="product.image[0].length == 0"
                v-bind:src="imageEmpty"
                alt=""
                style="padding: 25px 25px 25px 0px"
              />
            </td>
            <td style="font-weight: 500">{{ product.title }}</td>
            <td>
              <b-badge variant="primary">{{ product.category_name }}</b-badge>
              <b-badge variant="success">{{ product.category_detail }}</b-badge>
            </td>
            <td>
              {{ formatPrice(product.sale_price) }}
            </td>
            <td>
              <b-button
                variant="primary"
                @click="showModalProduct('edit', product._id)"
                >Chỉnh sửa</b-button
              >
              <b-button variant="danger" @click="deleteProduct(product._id)"
                >Xoá</b-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import modalProduct from "../../components/Admin/ModalProduct.vue";
export default {
  name: "manage-product",
  data() {
    return {
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
.manage-product {
  width: 80% !important;
}
</style>