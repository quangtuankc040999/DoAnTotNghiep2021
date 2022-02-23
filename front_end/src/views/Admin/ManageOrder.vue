<template>
  <div class="manage-order">
    <sibar-order/>
  </div>
</template>

<script>
import SibarOrder from '../../components/Admin/ManageOrder/SibarOrder.vue'
export default {
  name: "manage-order",
  components: {
    SibarOrder
  },
};
</script>

<style lang="scss" scoped>

.manage-order{
  width: 100%;
}
</style>