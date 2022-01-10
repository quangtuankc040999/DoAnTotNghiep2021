<template>
  <div class="side-bar">
    <div>Filter giá</div>
    <p>DANH MỤC SẢN PHẨM</p>
    <v-list class="list-category">
      <v-list-group
        v-for="(category, index) in categoryInfor"
        :key="index"
        no-action
        class="category"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              <i style="font-size: 20px" class="bx bxl-trello" />
              {{ category.name }}
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item-group class="pl-10">
          <v-list-item
            v-for="(categoryDetail, index) in category.categoryDetails"
            :key="index"
            link
            class="category-detail"
          >
            <v-list-item-title style="font-size: 0.7rem;"> {{ categoryDetail }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      categoryInfor: "SIDEBAR/categoryInfo",
    }),
  },
  methods: {
    ...mapActions({
      getCategoryInfor: "SIDEBAR/getCategory",
    }),
  },
  created() {
    this.getCategoryInfor();
  },
};
</script>

<style>
.category-detail {
  margin-left: 30px !important;
} 
.v-list-item__title {
    font-size: 0.75rem;
    font-family: "Open Sans", sans-serif !important;
    color: rgba(102, 102, 102, 0.85) !important;
    text-transform: uppercase !important;
}
</style>