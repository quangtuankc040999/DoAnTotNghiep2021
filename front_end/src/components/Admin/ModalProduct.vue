<template>
  <b-modal
    id="modalProduct"
    ref="modalProduct"
    hide-footer
    size="lg md"
    class="col-lg-6"
    title="Product Modal"
    hide-header-close
    scrollable
  >
    <div class="add">
      <h5>Thông tin chung</h5>
      <div class="name group">
        <input
          type="text"
          v-model="productRequest.title"
          placeholder="Tên sản phẩm"
        />
        <div class="errors">
          <p v-show="showErrors.emptyTitle" class="error">
            Vui lòng nhập tên sản phẩm
          </p>
          <p v-show="showErrors.titleMaxLength" class="error">
            Tên sản phẩm không quá 255 ký tự
          </p>
        </div>
      </div>
      <!-- Brand group -->
      <div class="brand group">
        <input
          type="text"
          v-model="productRequest.brand"
          placeholder="Thương hiệu"
        />
        <div class="errors">
          <p v-show="showErrors.emptyBrand" class="error">
            Vui lòng nhập thương hiệu sản phẩm
          </p>
          <p v-show="showErrors.brandMaxLength" class="error">
            Tên thương hiệu không được quá 255 ký tự
          </p>
        </div>
      </div>
      <!-- End brand group  -->
      <!-- Product key group  -->
      <div class="product-key group">
        <input
          type="text"
          id="productkey"
          v-model="productRequest.product_key"
          placeholder="Từ khoá"
        />
        <div class="errors">
          <p v-show="showErrors.emptyProductKey" class="error">
            Vui lòng nhập từ khoá
          </p>
        </div>
      </div>
      <!-- End product key group -->
      <div class="category-container">
        <label for="">Danh mục</label>
        <div class="category-modal">
          <select
            v-model="selectedCategoryName"
            @change="fetchCategoryDetail"
            :disabled="!categoryInfor.length"
          >
            <option
              v-for="category in categoryInfor"
              :key="category.name"
              :value="category"
            >
              {{ category.name }}
            </option>
          </select>
          <div class="errors">
            <p v-show="showErrors.emptyCategoryName" class="error">
              Vui lòng chọn phân loại sản phẩm
            </p>
          </div>
        </div>
        <div class="category-detail-modal">
          <select
            v-model="selectedCategoryDetail"
            :disabled="!categoryDetails.length"
          >
            <option
              v-for="categoryDetail in categoryDetails"
              :key="categoryDetail"
              :value="categoryDetail"
            >
              {{ categoryDetail }}
            </option>
          </select>
          <div class="errors">
            <p v-show="showErrors.emptyCategoryDetail" class="error">
              Vui lòng chọn phân loại sản phẩm
            </p>
          </div>
        </div>
      </div>

      <!-- Starting-price -->
      <h5>Giá và ưu đãi</h5>
      <label for="">Giá khởi điểm </label>
      <div class="startting-price">
        <input
          type="number"
          v-model="productRequest.starting_price"
          placeholder=""
        />
        <div class="errors">
          <p v-show="showErrors.emptyStartingPrice" class="error">
            Vui lòng nhập giá khởi điểm
          </p>
        </div>
      </div>
      <!-- End start price -->
      <label for="">Giảm giá </label>
      <div class="discount">
        <input
          type="number"
          v-model="productRequest.discount"
          @click="
            calSalePrice(
              productRequest,
              productRequest.starting_price,
              productRequest.discount
            )
          "
        />
        <div class="errors">
          <p v-show="showErrors.maxDiscount" class="error">
            Giảm giá không thể quá 100%
          </p>
        </div>
      </div>
      <label for="">Giá bán: </label>
      <div class="sale-price">
        <input type="number" v-model="productRequest.sale_price" readonly />
      </div>
      <h5>Mô tả sản phẩm</h5>
      <div class="description group">
        <textarea v-model="productRequest.description" rows="4" />
        <div class="errors">
          <p v-show="showErrors.emptyDescription" class="error">
            Vui lòng nhập mô tả sản phẩm
          </p>
        </div>
      </div>
      <h5>Hình ảnh sản phẩm</h5>
      <div class="img">
        <div class="btn">
          <v-btn class="addImg" @click="handleUpload">Thêm ảnh</v-btn>
          <input
            type="file"
            accept="image/*"
            @change="onFileChange"
            style="display: none"
            ref="uploadInput"
          />
        </div>
        <ul v-if="productRequest.image.length">
          <li
            v-for="(imgProduct, index) in productRequest.image"
            :key="index"
            class="imgItem"
          >
            <img :src="imgProduct" alt="" />
            <i @click="deleteImg(index)"> <v-icon>mdi-delete </v-icon></i>
          </li>
        </ul>
        <div class="errors">
          <p class="error" v-show="showErrors.emptyImages">
            Vui lòng chọn ít nhất 1 ảnh cho sản phẩm
          </p>
        </div>
      </div>
      <div class="d-flex flex-row-reverse">
        <b-button
          class="okButton"
          block
          variant="primary"
          @click="addProduct"
          v-if="modalType == 'add'"
          :disabled="isDisableButton"
        >
          Thêm sản phẩm
        </b-button>
        <b-button
          class="okButton"
          block
          variant="primary"
          @click="addProduct"
          :disabled="isDisableButton"
          v-else-if="modalType == 'edit'"
        >
          Chỉnh sửa
        </b-button>
        <b-button
          class="cancelButton"
          block
          variant="danger"
          style="margin-right: 20px; margin-top: 0"
          @click="hideModal()"
        >
          Thoát
        </b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";
export default {
  props: ["productRequest", "modalType", "idProduct"],
  data() {
    return {
      showErrors: {},
      categoryDetails: [],
      selectedCategoryName: {
        categoryDetails: [],
        _id: null,
        name: null,
      },
      selectedCategoryDetail: {},
      isDisableButton: false,
    };
  },
  computed: {
    ...mapGetters({
      categoryInfor: "SIDEBAR/categoryInfo",
      validateProductInput: "VALIDATION/validateProductInput",
    }),
  },
  methods: {
    calSalePrice(productRequest, startingPrice, discount) {
      productRequest.sale_price =
        startingPrice - (discount / 100) * startingPrice;
    },

    deleteImg(index) {
      for (let i = 0; i < this.productRequest.image.length; i++) {
        if (i == index) {
          this.productRequest.image.splice(index, 1);
        }
      }
    },
    show() {
      this.$refs.modalProduct.show();
    },
    hideModal() {
      this.$refs.modalProduct.value = null;
      this.$refs.modalProduct.hide();
    },
    handleUpload() {
      this.$refs.uploadInput.click();
    },
    onFileChange(e) {
      this.isDisableButton = true;
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "wfcqkljk");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dj5xafymg/image/upload",
          formData
        )
        .then((response) => {
          this.productRequest.image.push(response.data.url);
          this.isDisableButton = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    validatedBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateProductInput(this.productRequest);
      if (errors) {
        Vue.set(
          this.showErrors,
          "emptyTitle",
          this.showErrors && !!errors && errors.emptyTitle
        );
        Vue.set(
          this.showErrors,
          "titleMaxLength",
          this.showErrors && !!errors && errors.titleMaxLength
        );
        Vue.set(
          this.showErrors,
          "emptyBrand",
          this.showErrors && !!errors && errors.emptyBrand
        );
        Vue.set(
          this.showErrors,
          "brandMaxLength",
          this.showErrors && !!errors && errors.brandMaxLength
        );
        Vue.set(
          this.showErrors,
          "emptyProductKey",
          this.showErrors && !!errors && errors.emptyProductKey
        );
        Vue.set(
          this.showErrors,
          "emptyStartingPrice",
          this.showErrors && !!errors && errors.emptyStartingPrice
        );
        Vue.set(
          this.showErrors,
          "emptyDescription",
          this.showErrors && !!errors && errors.emptyDescription
        );
        Vue.set(
          this.showErrors,
          "emptyCategoryName",
          this.showErrors && !!errors.emptyCategoryName
        );
        Vue.set(
          this.showErrors,
          "maxDiscount",
          this.showErrors && !!errors && errors.maxDiscount
        );
        Vue.set(
          this.showErrors,
          "emptyCategoryDetail",
          this.showErrors && !!errors && errors.emptyCategoryDetail
        );
        Vue.set(
          this.showErrors,
          "emptyImages",
          this.showErrors && !!errors && errors.emptyImages
        );
        passedValidate = false;
      }
      return passedValidate;
    },
 

    addProduct() {
      this.productRequest.category_name = this.selectedCategoryName.name;
      this.productRequest.category_detail = this.selectedCategoryDetail;
      if (!this.validatedBeforeSubmit()) {
        this.isDisableButton = true;
        return;
      } else {
        if (this.modalType == "add") {
          this.addProductAction(this.productRequest);
        }
        else if(this.modalType == "edit"){
          
          this.updateProductAction({productId: this.idProduct, body: this.productRequest})
        }
      }
    },
    async fetchCategoryDetail() {
      this.categoryDetails = this.selectedCategoryName.categoryDetails;
    },

    ...mapActions({
      getCategoryInfor: "SIDEBAR/getCategory",
      addProductAction: "PRODUCTACTION/addProduct",
      updateProductAction: "PRODUCTACTION/updateProduct",
    }),
  },
  created() {
    this.getCategoryInfor();
  },
  watch: {
    "productRequest.title"() {
      Vue.set(this.showErrors, "emptyTitle", null);
      Vue.set(this.showErrors, "titleMaxLength", null);
      this.isDisableButton = false;
    },
    "productRequest.discount"() {
      Vue.set(this.showErrors, "maxDiscount", null);
      this.isDisableButton = false;
    },

    "productRequest.brand"() {
      Vue.set(this.showErrors, "emptyBrand", null);
      Vue.set(this.showErrors, "brandMaxLength", null);
      this.isDisableButton = false;
    },
    "productRequest.product_key"() {
      Vue.set(this.showErrors, "emptyProductKey", null);
      this.isDisableButton = false;
    },
    "productRequest.starting_price"() {
      Vue.set(this.showErrors, "emptyStartingPrice", null);
      this.isDisableButton = false;
    },

    "productRequest.description"() {
      Vue.set(this.showErrors, "emptyDescription", null);
      this.isDisableButton = false;
    },

    selectedCategoryName() {
      Vue.set(this.showErrors, "emptyCategoryName", null);
      this.isDisableButton = false;
    },
    selectedCategoryDetail() {
      Vue.set(this.showErrors, "emptyCategoryDetail", null);
      this.isDisableButton = false;
    },
    "productRequest.image"() {
      Vue.set(this.showErrors, "emptyImages", null);
      this.isDisableButton = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.errors {
  p {
    text-align: start;
    margin-left: 5px;
    font-size: 85%;
    border: none !important;
    color: red !important;
    text-transform: none !important;
    font-style: italic;
  }
}
h5,
label {
  text-transform: uppercase;
  color: #dd9933 !important;
  margin: 4px 0;
}
input,
select,
textarea {
  border: 1px solid rgb(179, 174, 174);
  width: 80%;
  margin: 10px;
  padding: 10px;
  border-radius: 4px;
}
.group {
  display: flex;
  margin: 15px auto;
  flex-wrap: wrap;
}
.category-container {
  select {
    border: 1px solid rgb(179, 174, 174);
    width: 80%;
    margin: 5px;
    padding: 10px;
    border-radius: 4px;
  }
}
.img {
  img {
    width: auto;
    height: 250px;
    margin: 10px 0;
  }
  ul {
    list-style: none;
    padding: 10px;
    display: flex;
    flex-direction: column;
    li {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
    }
  }
}
</style>
<style >
.addImg {
  background-color: #d26e4b !important;
  color: white !important;
  font-weight: 700;
}
</style>