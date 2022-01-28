<template>
  <div class="manage-product">
    <button @click="showModalProduct">Add Product</button>
    <modal-product
      :productRequest="productRequest"
      :modalType="'add'"
      ref="modalProduct"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import modalProduct from "../../components/Admin/ModalProduct.vue";
export default {
  name: "manage-product",
  data() {
    return {
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
    };
  },
  components: {
    modalProduct,
  },
  computed: {
    ...mapGetters({
      productInfor: "PRODUCTS/productInfor",
    }),
  },
  methods: {
    ...mapActions({
      getAllProduct: "PRODUCTS/getAllProduct",
    }),
    showModalProduct() {
      this.$refs.modalProduct.show();
    },
  },
  created() {
    this.getAllProduct();
  },
};
</script>

<style>
.manage-product {
  width: 100%;
}
</style>