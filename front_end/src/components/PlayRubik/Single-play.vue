<template>
  <div>
    <div id="container">
      <modal-ao
        :history="history"
        :csTimes="csTimes"
        :slove="slove"
        :ao5="ao5"
        :ao12="ao12"
        ref="modalAo"
      />
      <div id="timeList">
        <p class="title-time-list">
          <span><v-icon>mdi-order-bool-descending </v-icon> Time list</span>
          <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="btn-remove"
                text
                v-bind="attrs"
                v-on="on"
                @click="removeSession"
              >
                <v-icon>mdi-close-circle-outline </v-icon>
              </v-btn>
            </template>
            <span>Remove result</span>
          </v-tooltip>
        </p>
        <!-- <b-table striped hover :items="timeList"></b-table> -->
        <div class="time-list-result">
          <ul>
            <li>Slove</li>
            <li v-for="(item, index) in timeList" :key="index">
              {{ item.slove }}
            </li>
          </ul>
          <ul>
            <li>Times</li>
            <li v-for="(item, index) in timeList" :key="index">
              {{ item.time }}
            </li>
          </ul>
          <ul>
            <li>ao5</li>
            <li v-for="(item, index) in ao5" :key="index">
              {{ item }}
            </li>
          </ul>
          <ul class="last-list">
            <li>ao12</li>
            <li v-for="(item, index) in ao12" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <div class="div1">
        <div id="scram">
          {{ scramble }}
        </div>
        <div id="timeOut">
          <span id="min"></span><span id="colon"></span
          ><span id="sec">0</span>.<span id="decimal">00</span>
          <div class="ao">
            <v-btn v-if="ao5.length != 0" text @click="showModalAo"
              >ao5: {{ ao5.at(-1) }}</v-btn
            >
            <v-btn v-if="ao5.length == 0" text @click="showModalAo"
              >ao5: ---</v-btn
            >
            <v-btn v-if="ao12.length != 0" text @click="showModalAo"
              >ao12: {{ ao12.at(-1) }}</v-btn
            >
            <v-btn v-if="ao12.length == 0" text @click="showModalAo"
              >ao12: ---</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalAo from "./modalAo.vue";
export default {
  components: {
    modalAo,
  },
  data() {
    return {
      scramble: "",
      running: false,
      interval: 0,
      decimal: 0,
      sec: 0,
      min: 0,
      cs: 0,
      timesDisplay: [],
      timeList: [],
      csTimes: [],
      history: [],
      slove: 0,
      ao5: [],
      ao12: [],
    };
  },
  methods: {
    removeSession() {
      sessionStorage.clear();
      this.ao5 = [];
      this.ao12 = [];
      this.timeList = [];
      this.csTimes = [];
      this.slove = 0;
    },
    showModalAo() {
      this.$refs.modalAo.show();
    },
    run() {
      var secOut = document.getElementById("sec");
      var minOut = document.getElementById("min");
      var colon = document.getElementById("colon");
      var timesOut = document.getElementById("timeOut");
      if (!this.running) {
        this.slove++;
        this.decimal = 0;
        this.sec = 0;
        this.min = 0;
        this.cs = 0;
        secOut.innerHTML = "0";
        minOut.innerHTML = "";
        colon.innerHTML = "";
        this.running = true;
        this.interval = setInterval(this.timer, 10);
      } else if (this.running) {
        clearInterval(this.interval);
        this.running = false;
        this.timesDisplay.push(" " + timesOut.innerHTML);
        this.csTimes.push(parseFloat(this.formatTime(this.cs)));
        this.history.push({
          slove: this.slove,
          time: parseFloat(this.formatTime(this.cs)),
          scramble: this.scramble,
        });
        this.generateScramble();
        this.calAo5(this.csTimes);
        this.calAo12(this.csTimes);
        this.timeList.push({
          slove: this.slove,
          time: this.formatTime(this.cs),
        });
        if (typeof Storage !== "undefined") {
          // Khởi tạo sesionStorage
          sessionStorage.setItem("timeList", JSON.stringify(this.timeList));
          sessionStorage.setItem("slove", this.slove);
          sessionStorage.setItem("csTimes", JSON.stringify(this.csTimes));
          // // get sessionStorage
          // sessionStorage.getItem("name");
          // // lấy ra số lượng session đã lưu trữ
          // sessionStorage.length;
          // // xóa 1 item localStorage
          // sessionStorage.removeItem("name");
          // // xóa tất cả item trong sessionStorage
          // sessionStorage.clear();
        } else {
          alert("Trình duyệt của bạn không hỗ trợ!");
        }
      }
    },
    timer() {
      this.decimal++;
      this.cs++; //counts time in centiseconds
      var decimalOut = document.getElementById("decimal");
      var secOut = document.getElementById("sec");
      var minOut = document.getElementById("min");
      var colon = document.getElementById("colon");
      decimalOut.innerHTML = this.decimal;
      if (this.decimal >= 100) {
        this.decimal = 0;
        this.sec++;
        if (this.sec > 59) {
          this.sec = 0;
          this.min++;
          colon.innerHTML = ":";
          minOut.innerHTML = this.min;
        }
        if (this.sec <= 9 && this.min > 0) {
          this.sec = "0" + this.sec;
        }
        secOut.innerHTML = this.sec;
      }
      if (this.decimal <= 9) {
        this.decimal = "0" + this.decimal;
        decimalOut.innerHTML = this.decimal;
      }
    },

    formatTime(t) {
      //m = minute, s = second, c = centisecond
      var m = 0,
        s = 0,
        c = 0,
        out = "";
      m = Math.floor(t / 6000);
      t = t % 6000;
      s = Math.floor(t / 100);
      t = t % 100;
      c = Math.floor(t);
      if (m < 1) {
        m = "";
      } else {
        m = m + ":";
        if (s < 10) {
          s = "0" + s;
        }
      }
      if (c < 10) {
        c = "0" + c;
      }

      out = "" + m + s + "." + c;
      return out;
    },
    generateScramble() {
      var move; //includes face to turn and how to turn it. Ex. 2F
      var face; //Face to turn. Either R, L, F, B, U, or D
      var faceNum; //1-6, corresponds to face R-D
      var lastFaceNum = 10; //The face of the previous turn
      var turn; //How to turn a face. Either ', 2, or nothing.
      var scramble = ""; //inlucdes 25 moves
      for (var x = 0; x < 25; x++) {
        do {
          faceNum = Math.floor(Math.random() * 6) + 1;
        } while (faceNum === lastFaceNum); //the same face can't appear in consecutive moves.
        lastFaceNum = faceNum;
        if (faceNum === 1) {
          face = "R";
        }
        if (faceNum === 2) {
          face = "L";
        }
        if (faceNum === 3) {
          face = "U";
        }
        if (faceNum === 4) {
          face = "D";
        }
        if (faceNum === 5) {
          face = "F";
        }
        if (faceNum === 6) {
          face = "B";
        }
        turn = Math.floor(Math.random() * 3) + 1;
        if (turn === 1) {
          move = face;
        }
        if (turn === 2) {
          move = face + "2";
        }
        if (turn === 3) {
          move = face + "'";
        }

        scramble += move + " ";
      }
      this.scramble = scramble;
    },
    calAo5(array) {
      // get Ao5
      const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
      if (array.length < 5) {
        this.ao5.push(" - ");
      }
      if (array.length >= 5) {
        let arrayAo5 = [];
        arrayAo5 = array.slice(-5);
        const valueMin5Remove = Math.min(...arrayAo5);
        const valueMax5Remove = Math.max(...arrayAo5);
        arrayAo5 = arrayAo5.filter((item) => item !== valueMin5Remove);
        arrayAo5 = arrayAo5.filter((item) => item !== valueMax5Remove);
        this.ao5.push(Math.round(average(arrayAo5) * 100) / 100);
        if (typeof Storage !== "undefined") {
          // Khởi tạo sesionStorage
          sessionStorage.setItem("ao5", JSON.stringify(this.ao5));
          // // get sessionStorage
          // sessionStorage.getItem("name");
          // // lấy ra số lượng session đã lưu trữ
          // sessionStorage.length;
          // // xóa 1 item localStorage
          // sessionStorage.removeItem("name");
          // // xóa tất cả item trong sessionStorage
          // sessionStorage.clear();
        } else {
          alert("Trình duyệt của bạn không hỗ trợ!");
        }
      }
    },
    calAo12(array) {
      const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
      // get Ao12
      if (array.length < 12) {
        this.ao12.push(" - ");
      }
      if (array.length >= 12) {
        let arrayAo12 = [];
        arrayAo12 = array.slice(-12);
        const valueMin12Remove = Math.min(...arrayAo12);
        const valueMax12Remove = Math.max(...arrayAo12);
        arrayAo12 = arrayAo12.filter((item) => item !== valueMin12Remove);
        arrayAo12 = arrayAo12.filter((item) => item !== valueMax12Remove);
        this.ao12.push(Math.round(average(arrayAo12) * 100) / 100);
      }
      if (typeof Storage !== "undefined") {
        // Khởi tạo sesionStorage
        sessionStorage.setItem("ao12", JSON.stringify(this.ao12));
        // // get sessionStorage
        // sessionStorage.getItem("name");
        // // lấy ra số lượng session đã lưu trữ
        // sessionStorage.length;
        // // xóa 1 item localStorage
        // sessionStorage.removeItem("name");
        // // xóa tất cả item trong sessionStorage
        // sessionStorage.clear();
      } else {
        alert("Trình duyệt của bạn không hỗ trợ!");
      }
    },
  },
  mounted() {
    if (sessionStorage.getItem("timeList")) {
      this.timeList = JSON.parse(sessionStorage.getItem("timeList"));
    }
    if (sessionStorage.getItem("ao5")) {
      this.ao5 = JSON.parse(sessionStorage.getItem("ao5"));
    }
    if (sessionStorage.getItem("ao12")) {
      this.ao12 = JSON.parse(sessionStorage.getItem("ao12"));
    }
    if (sessionStorage.getItem("slove")) {
      this.slove = JSON.parse(sessionStorage.getItem("slove"));
    }
    if (sessionStorage.getItem("csTimes")) {
      this.csTimes = JSON.parse(sessionStorage.getItem("csTimes"));
    }
  },
  created() {
    this.generateScramble();
    document.addEventListener.call(window, "keyup", (event) => {
      if (event.keyCode === 32) {
        this.run();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  text-align: center;
  padding: 0px !important;
  margin: 0px !important;
  li {
    text-align: center;
    border-left: 1px solid black;
    border-top: 1px solid black;
    padding: 0 5px;
    margin: 0 auto;
  }
  :last-child {
    border-bottom: 1px solid black;
  }
}
.last-list {
  border-right: 1px solid black;
}
table td {
  border: 1px solid black;
  padding: 10px;
}
#container {
  background-color: rgb(206, 206, 206);
  background-image: url("https://img5.thuthuatphanmem.vn/uploads/2021/11/22/hinh-anh-rubik_040951176.jpg");
  background-size: cover;
  // background: radial-gradient(circle at 100%, #333, #333 50%, #eee 75%, #333 75%);

  display: flex;
  width: 100% !important;
  max-height: 100vh;
  height: 100vh;
  padding: 0;
  .div1 {
    #scram {
      text-align: center;
      font-size: 30px;
      padding: 10px 0;
    }
    #timeOut {
      font-size: 150px !important;
      text-align: center;
    }
    .ao {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 30px !important;
    }
  }
  #timeList {
    overflow-y: auto;
    width: 20%;
    padding: 10px;
    min-width: 20%;
    .title-time-list {
      display: flex;
      justify-content: space-between;
    }
    .time-list-result {
      display: flex;
    }
  }
  .v-btn {
    width: auto !important;
    height: auto !important;
    font-size: 40px !important;
    padding: 10px !important;
  }
  #timeList,
  #scram,
  #timeOut {
    background-color: rgba(255, 255, 255, 0.5);
    margin: 20px;
    border-radius: 10px;
  }
  #timeOut {
    width: 60%;
    margin: 50px auto;
  }
  .btn-remove {
    padding: 0px !important;
  }
}
</style>