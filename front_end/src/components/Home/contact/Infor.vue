<template>
  <div class="us-infor">
    <div class="col-md-12 d-flex align-items-stretch">
      <div class="info-wrap w-100 p-md-5 p-4 py-5 img">
        <h2>Thông tin liên hệ</h2>
        <p class="mb-4">Chúng tôi sẵn sàng nhận bất kỳ vấn đề nào thông qua địa chỉ liên lạc</p>
        <div class="ta dbox w-100 d-flex align-items-start">
          <div class="icon d-flex align-items-center justify-content-center">
            <v-icon>mdi-map-marker</v-icon>
          </div>
          <div class="text pl-3">
            <p>
              <span>Địa chỉ:</span> K14/08 Nguyễn Sinh Sắc - Hoà Khách Bắc -
              Liên Chiểu - Đà Nẵng
            </p>
          </div>
        </div>
        <div class="ta dbox w-100 d-flex align-items-center">
          <div class="icon d-flex align-items-center justify-content-center">
            <v-icon>mdi-phone </v-icon>
          </div>
          <div class="text pl-3">
            <p>
              <span>Số đt:</span> <a href="tel://1234567920">+ 938 491 641</a>
            </p>
          </div>
        </div>
        <div class="ta dbox w-100 d-flex align-items-center">
          <div class="icon d-flex align-items-center justify-content-center">
            <v-icon>mdi-at </v-icon>
          </div>
          <div class="text pl-3">
            <p>
              <span>Email: </span>
              <a href="mailto:quangtuanat040999@gmail.com">quangtuanat040999@gmail.com</a>
            </p>
          </div>
        </div>
        <div class="ta dbox w-100 d-flex align-items-center">
          <div class="icon d-flex align-items-center justify-content-center">
            <v-icon>mdi-web </v-icon>
          </div>
          <div class="text pl-3">
            <p><span>Website: </span> <a href="#">yoursite.com</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.us-infor {
  background-color: rgba(255, 255, 255, 0.1) !important;
  width: 100% !important;
  height: 100% !important;
  border-radius: 10px;
  color: rgb(216, 216, 216);
}
p{
  margin-bottom: 0 !important;
}
.ta{
  margin-bottom: 20px !important;
}
.v-icon{
  color:  rgb(216, 216, 216) !important;
}
</style>