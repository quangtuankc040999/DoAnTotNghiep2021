<template>
  <b-modal
    id="modalRatting"
    ref="modalRatting"
    hide-footer
    size="lg md"
    class="col-lg-6"
    title="Đánh giá sản phẩm"
    hide-header-close
    scrollable
    v-if="orderItem.product"
  >
    <p class="title" v-if="orderItem._id">Đánh giá đơn hàng {{ orderItem._id }}</p>
    <product-item-comment
      v-for="(product, index) in orderItem.product"
      :key="index"
      :productItem="product"
      :indexProduct="index"
      :idProduct="product._id"
      :orderId="orderItem._id"
      class="product"
    ></product-item-comment>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ProductItemComment from "../User/ProductItemComment.vue";

export default {
  props: ["orderItem"],
  components: { ProductItemComment },
  data() {
    return {
     
    };
  },
  computed: {
    ...mapGetters({
      userInfoAuth: "AUTH/userInfo",
    }),
  },
  methods: {
    show() {
      this.$refs.modalRatting.show();
    },
    hideModal() {
      this.$refs.modalRatting.value = null;
      this.$refs.modalRatting.hide();
    },
    ...mapActions({
    }),
  },
  created() {},
  watch: {},
};
</script>
<style lang="scss" scoped>
@import "../../assets/style.scss";
.title {
  font-size: 1rem;
  color: $color !important;
  font-weight: 700;
  text-transform: uppercase !important;
  padding-bottom: 10px;
  border-bottom: rgba(177, 171, 171, 0.5) 1px solid;
}
</style>
