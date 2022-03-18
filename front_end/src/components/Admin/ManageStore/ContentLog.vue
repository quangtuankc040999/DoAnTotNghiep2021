<template>
  <div class="content-log">
    <div class="log-id" v-if="log.status == 'Nhập hàng'">
      Mã nhập hàng: <span>{{ log._id }}</span>
    </div>
    <div class="log-product" v-if="log.status == 'Nhập hàng'">
      Sản phẩm:
      <div class="product" v-for="(content, i) in log.logContents" :key="i">
        {{ content.product.title }} x {{ content.quantity }}
      </div>
    </div>

    <div class="log-id" v-if="log.status == 'Xuất hàng'">
      Mã xuất hàng: <span>{{ log._id }}</span>
    </div>
    <div class="log-product" v-if="log.status == 'Xuất hàng'">
      Sản phẩm:
      <div class="product" v-for="(content, i) in log.logContents" :key="i">
        {{ content.product.title }} x {{ content.quantity }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["log"],
  data() {
    return {};
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
  },
};
</script>

<style lang="scss" scoped>
.content-log {
  padding: 5px;
  border-bottom: 1px black solid;
  .log-id {
    span {
      font-size: 1em !important;
    }
  }
  .log-product {
    .product {
      margin-left: 20px;
    }
  }
}
</style>