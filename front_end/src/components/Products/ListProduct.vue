<template>
  <div class="list-product">
      {{productInfor}}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
    ...mapGetters({
      productInfor: "PRODUCTS/productInfor",
    }),
  },
}
</script>

<style>

</style>