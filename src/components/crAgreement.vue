<template>
  <div class="tax">
    <div class="point-out" v-show="IsPonitOut">
      <div class="warn"></div>
      <p v-show="warn">
        是否确定填写信息
        <br />完整且无误？
        <br />点击确定将创建对应客户
        <br />协议书
      </p>
      <div class="btn1" v-show="warn" @click="sendData">确定</div>
      <div class="btn2" @click="Cancel">取消</div>
    </div>
    <div class="shadow" v-show="IsPonitOut"></div>
    <top :top="set"></top>
    <div class="nothing"></div>
    <div class="content">
      <div class="newbox">
        <div class="title">经营品牌：</div>
        <div class="p1">
          <label class="test">
            <input
              type="checkbox"
              class="check"
              name="check"
              :checked="boxcheck1"
              @click="changeCheck1"
            />玉兰（墙纸类产品）
          </label>
        </div>
        <div class="p2">
          <label class="test">
            <input
              type="checkbox"
              class="check"
              name="check"
              :checked="boxcheck2"
              @click="changeCheck2"
            />兰尚居品（布艺类产品）
          </label>
        </div>
      </div>
      <!-- <div class="taskall">
        <p id="first">销售总任务</p>
        <p>
          <input type="text" v-model="add" readonly="true" id="taskall" />&nbsp;&nbsp;万元
        </p>
      </div>-->
      <div class="brand">
        <div class="left">
          <span id="second">销售总任务</span>
          <span>
            <input type="text" v-model="yulan" id="yulan" ref="yulan" />&nbsp;万元
          </span>
        </div>
        <!-- <div class="right">
          <p id="first">玉兰尚居</p>
          <p>
            <input
              type="text"
              v-model="yulansj"
              id="yulansj"
              ref="yulansj"
              class="getGrey"
              :readonly="!boxcheck2"
            />&nbsp;万元
          </p>
        </div>-->
      </div>
      <div class="monthbox">
        <table>
          <tr>
            <td>1月</td>
            <td>2月</td>
            <td>3月</td>
            <td>4月</td>
            <td>5月</td>
            <td>6月</td>
            <td id="clear">7月</td>
          </tr>
          <tr>
            <td>
              <input type="text" readonly="true" v-model="average" />
            </td>
            <td>
              <input type="text" readonly="true" v-model="average" />
            </td>
            <td>
              <input type="text" readonly="true" v-model="average2" />
            </td>
            <td>
              <input type="text" readonly="true" v-model="average2" />
            </td>
            <td>
              <input type="text" readonly="true" v-model="average2" />
            </td>
            <td>
              <input type="text" readonly="true" v-model="average2" />
            </td>
            <td id="clear">
              <input type="text" readonly="true" v-model="average2" />
            </td>
          </tr>
          <tr>
            <td>8月</td>
            <td>9月</td>
            <td>10月</td>
            <td>11月</td>
            <td>12月</td>
            <td colspan="2">合计</td>
          </tr>
          <tr>
            <td id="clear2">
              <input type="text" readonly="true" v-model="average2" />
            </td>
            <td id="clear2">
              <input type="text" readonly="true" v-model="average2" />
            </td>
            <td id="clear2">
              <input type="text" readonly="true" v-model="average2" />
            </td>
            <td id="clear2">
              <input type="text" readonly="true" v-model="average2" />
            </td>
            <td id="clear2">
              <input type="text" readonly="true" v-model="Dec" />
            </td>
            <td id="clear2" colspan="2">
              <input type="text" style="width:70px;" readonly="true" v-model="add" />
            </td>
          </tr>
        </table>
      </div>
      <div class="box">
        <p id="first">总任务完成返点</p>
        <p>
          <input type="text" v-model="percent" />&nbsp;%
        </p>
        <!-- <div class="rewordpercent2">
          <div>兰居尚品任务返点</div>
          <input type="text" class="reword" v-model="rewordpercent2" /> %
        </div>-->
      </div>
      <div class="bottom">
        <div class="box">
          <p id="first">备货金额占比</p>
          <p>
            <input type="text" style="background-color: #efefef;" v-model="goods" readonly />&nbsp;%
          </p>
        </div>
        <div class="box2">
          <p id="first">合人民币</p>
          <p>
            <input type="text" v-model="sum" readonly />&nbsp;元
          </p>
        </div>
        <div class="box3">
          <p>
            协议生效时间
            <input type="text" readonly @click="calendar1" v-model="selectDate1" />
          </p>
        </div>
        <div class="box4">
          <p>
            协议截止时间
            <input type="text" readonly @click="calendar2" v-model="selectDate2" />
          </p>
        </div>
      </div>
    </div>
    <div class="save" @click="showIt" ref="save">创建协议书</div>
    <calendar v-model="calendarShow" @change="handelChage" :selectDate="selectDate"></calendar>
    <!-- <calendar
            v-model="calendarShow"
            @change="handelChage"
            :selectDate="selectDate">
    </calendar>-->
  </div>
</template>

<script>
const feel = true;
import top from "./Top";
import { GetYlContractByCustomer, UpdateContractState } from "@/api/card";

export default {
  data() {
    return {
      set: 6,
      IsPonitOut: false,
      warn: false,
      yulan: "",
      yulansj: "",
      percent: "",
      rewordpercent2: "",
      goods: "10",
      // sum:"",
      calendarShow: false,
      // defaultDate:new Date('2019-01-01'),
      selectDate: "",
      selectDate1: new Date().getFullYear() + "-01-01",
      selectDate2: new Date().getFullYear() + "-12-31",
      IsCal1: true,
      revised: false,
      time: "",
      boxcheck1: false,
      boxcheck2: false,
      preferedbrand: ""
    };
  },
  components: {
    top
  },
  watch: {
    boxcheck1(curVal, oldVal) {
      if (curVal) {
        // this.yulan = "";
        //this.$refs.yulan.classList.remove("getGrey");
        if (this.boxcheck2) {
          //this.$refs.yulansj.classList.remove("getGrey");
          // this.yulansj = "";
          this.preferedbrand = "√玉兰（墙纸类产品）√兰居尚品（布艺类产品）";
        } else {
          //this.$refs.yulansj.classList.add("getGrey");
          this.yulansj = "0";
          this.preferedbrand = "√玉兰（墙纸类产品）";
        }
      } else {
        //this.$refs.yulan.classList.add("getGrey");
        this.yulan = "0";
        if (this.boxcheck2) {
          // this.yulansj = "";
          //this.$refs.yulansj.classList.remove("getGrey");
          this.preferedbrand = "√兰居尚品（布艺类产品）";
        } else {
          //this.$refs.yulansj.classList.add("getGrey");
          this.yulansj = "0";
          this.preferedbrand = "";
        }
      }
    },
    boxcheck2(curVal, oldVal) {
      if (curVal) {
        this.yulansj = "";
        //this.$refs.yulansj.classList.remove("getGrey");
        if (this.boxcheck1) {
          // this.yulan = "";
          //this.$refs.yulan.classList.remove("getGrey");
          this.preferedbrand = "√玉兰（墙纸类产品）√兰居尚品（布艺类产品）";
        } else {
          //this.$refs.yulan.classList.add("getGrey");
          this.yulan = "0";
          this.preferedbrand = "√兰居尚品（布艺类产品）";
        }
      } else {
        this.yulansj = "0";
        //this.$refs.yulansj.classList.add("getGrey");
        if (this.boxcheck1) {
          // this.yulan = "";
          //this.$refs.yulan.classList.remove("getGrey");
          this.preferedbrand = "√玉兰（墙纸类产品）";
        } else {
          //this.$refs.yulan.classList.add("getGrey");
          this.yulan = "0";
          this.preferedbrand = "";
        }
      }
    }
  },
  computed: {
    CID() {
      if (this.$store.state.info.data.type != "ECWEB") {
        return this.$store.state.CCID;
      } else {
        return this.$store.state.info.data.loginName;
      }
    },
    add() {
      return "" + (Number(this.yulan) + Number(this.yulansj)).toFixed(2);
    },
    average() {
      return "" + Math.floor(Number(this.add) * 0.05 * 100) / 100;
    },
    average2() {
      return "" + Math.floor(Number(this.add) * 0.09 * 100) / 100;
    },
    Dec() {
      return (
        "" +
        (
          Number(this.add) -
          Number(this.average) * 2 -
          Number(this.average2) * 9
        ).toFixed(2)
      );
    },
    sum() {
      return (this.add * this.goods * 100).toFixed(2);
    }
  },
  mounted() {
    switch (this.$route.query.revised) {
      case "SALEMANMODIFYING":
        this.revised = true;
        this.$refs.save.innerHTML = "修改协议书";
        break;
    }
    if (this.revised) {
      //修改
      GetYlContractByCustomer({
        cid: this.$store.state.CCID,
        year: this.$store.state.CYEAR
      })
        .then(res => {
          if (res.data != null && res.data.contractInfo) {
            var allData = res.data.contractInfo;
            if (allData.preferedbrand) {
              this.preferedbrand = allData.preferedbrand;
              if (allData.preferedbrand.indexOf("墙") > -1) {
                this.boxcheck1 = true;
              }
              if (
                allData.preferedbrand.indexOf("软") > -1 ||
                allData.preferedbrand.indexOf("布") > -1
              ) {
                this.boxcheck2 = true;
              }
            }
            this.yulan = allData.aRetailing;
            this.yulansj = allData.cMatching;
            this.percent = allData.rewordpercent;
            this.rewordpercent2 = allData.rewordpercent2;
            this.startDate = new Date(allData.startDate);
            this.endDate = new Date(allData.endDate);
            this.goods = allData.stockpercent;
          }
        })
        .catch(err => {
          console.log("获取协议书信息失败", err);
        });
    }
  },
  methods: {
    initTime(time) {
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      if (parseInt(month) < 10) {
        month = "0" + month;
      }
      let date = time.getDate();
      if (parseInt(date) < 10) {
        date = "0" + date;
      }
      let hour = time.getHours();
      if (parseInt(hour) < 10) {
        hour = "0" + hour;
      }
      let minute = time.getMinutes();
      if (parseInt(minute) < 10) {
        minute = "0" + minute;
      }

      return year + "-" + month + "-" + date + " " + hour + ":" + minute + " ";
    },
    changeCheck1() {
      this.boxcheck1 = !this.boxcheck1;
      this.$emit("select1", this.boxcheck1);
    },
    changeCheck2() {
      this.boxcheck2 = !this.boxcheck2;
      this.$emit("select2", this.boxcheck2);
    },
    handelChage(data, selectDate) {
      if (this.IsCal1) {
        this.selectDate1 = selectDate;
      } else {
        this.selectDate2 = selectDate;
      }
    },
    calendar1() {
      this.calendarShow = true;
      this.IsCal1 = true;
    },
    calendar2() {
      this.calendarShow = true;
      this.IsCal1 = false;
    },
    Cancel() {
      this.IsPonitOut = false;
      this.warn = false;
    },
    showIt() {
      if (!this.preferedbrand) {
        alert("请选择意向品牌！");
        return;
      }

      if (
        !this.yulan ||
        this.yulan == "0" ||
        !this.percent ||
        !this.selectDate1 ||
        !this.selectDate2
      ) {
        alert("信息填写不完整，请重新确认");
      } else {
        if (this.yulan == "0") {
          alert("请填写玉兰品牌金额");
        } else {
          this.IsPonitOut = true;
          this.warn = true;
        }
      }
    },
    sendData() {
      let th = this;
      var nowTime = this.initTime(new Date());
      let url = this.revised
        ? "/YLcontractentry/updateYLcontract.do"
        : "/YLcontractentry/createYLcontract.do";
      let data = {
        ccyear: this.$store.state.CYEAR,
        ccid: this.$store.state.CCID,
        aRetailing: this.yulan,
        cMatching: this.yulansj,
        m1: Number(this.average),
        m2: Number(this.average),
        m3: Number(this.average2),
        m4: Number(this.average2),
        m5: Number(this.average2),
        m6: Number(this.average2),
        m7: Number(this.average2),
        m8: Number(this.average2),
        m9: Number(this.average2),
        m10: Number(this.average2),
        m11: Number(this.average2),
        m12: this.Dec,
        stockpercent: this.goods,
        payminimum: 0,
        bEngineering: 0, //无效
        rewordpercent: this.percent,
        memo2: null, //补充协议内容
        preferedbrand: this.preferedbrand, //销售品牌
        privateAccountAuthed: "N", //--X 表示无关， Y 表示客户授权配偶账号 N 无需授权
        rewordpercent2: this.rewordpercent2, //兰居返点比例 %
        startDate: this.selectDate1, //协议开始日期
        endDate: this.selectDate2, //协议结束日期
        legalchecked: 0
      };
      this.$http
        .post(url, data)
        .then(res => {
          switch (this.$store.state.position) {
            case "SALEMAN_M":
            case "SALEMAN_S":
              this.signed = 0;
              this.state = "CUSTOMERAFFIRM";
              break;
            case "MANAGER":
              this.signed = 0;
              this.state = "DEP_MARKET_CHECK";
              break;
            case "MARKETCHECKER":
              this.signed = 0;
              this.state = "CSA_CHECK";
              break;
            case "VSMAPPROVEXII":
              this.signed = 1;
              this.state = "APPROVED";
              break;
            default:
              this.signed = 0;
              this.state = "ASM_CHECKING";
              break;
          }
          let data = {
            cid: this.CID,
            state: this.state,
            wfmemo:
              nowTime +
              "办事处经理" +
              " " +
              this.$store.state.info.data.realName +
              " 提交;",
            signed: this.signed, //0,待审核 1通过 2退回
            market: "",
            csa: ""
          };
          // this.$http
          //   .post("/infoState/checkYLcontractentryState.do", data)
          UpdateContractState({
            cid: this.$store.state.CCID,
            year: Number(this.$store.state.CYEAR),
            state: "CUSTOMERAFFIRM",
            wfmemo:
              nowTime +
              "被办事处经理" +
              this.$store.state.info.data.realName +
              (this.revised ? "重新提交;" : "提交;"),
            signed: this.signed,
            market: "",
            csa: ""
          })
            .then(res => {
              this.$router.push({
                path: "/success3"
              });
            })
            .catch(res => {
              console.log(res);
            });
        })
        .catch(err => {
          console.log("错误信息" + err);
        });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  color: #000000;
}
.newbox {
  display: inline-block;
  width: 331px;
  margin: 0 auto;
  margin-top: 10px;
  font-size: 0;
  text-align: left;
}
.newbox div {
  display: inline-block;
  text-align: left;
}
.title {
  text-align: left;
  width: 80px;
  font-size: 15px;
  margin-left: 27px;
}
.p1 {
  /* margin-top: 20px; */
  font-size: 15px;
  text-align: left;
  margin-bottom: 5px;
  /* width: 200px; */
  /* margin-left: 75px; */
}
.p2 {
  margin-bottom: 10px;
  font-size: 15px;
  text-align: left;
  margin-left: 107px;
  /* margin-left: 75px; */
}
.tax {
  background: #efefef;
  height: 100vh;
}
.nothing {
  height: 50px;
  width: 100%;
}
.content {
  margin: 26px 22px 0 22px;
  width: 331px;
  position: relative;
  height: 450px;
  border-radius: 7px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  background-color: rgb(255, 255, 255);
  overflow: hidden;
}
calendar {
  width: 331px;
}
#first {
  margin-left: 3px;
  font-size: 15px;
  margin-bottom: 3px;
}
#second {
  margin-left: 3px;
  font-size: 15px;
  margin-bottom: 3px;
}
#topp {
  font-size: 18px;
  color: #000000;
  margin: 17px 120px 17px 22px;
  text-align: left;
}
.box {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-left: 20px;
  position: relative;
  margin-bottom: 30px;
}
.box input {
  height: 19px;
  width: 94px;
  background: #ffffff;
  font-size: 13px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-top: 1px;
  padding: 0 8px;
}
.box2 {
  width: 100%;
  height: 20px;
  text-align: left;
  /* margin-top: 20px; */
}
.box2 input {
  height: 19px;
  width: 94px;
  background: #ffffff;
  font-size: 13px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-top: 1px;
  padding: 0 8px;
  background-color: #efefef;
}
.box3 {
  position: absolute;
  bottom: 60px;
  font-size: 15px;
  left: 20px;
}
.box3 input {
  height: 19px;
  width: 94px;
  background: #ffffff;
  font-size: 13px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-left: 10px;
  margin-top: 1px;
  padding: 0 8px;
}
.box4 {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 15px;
}
.box4 input {
  height: 19px;
  width: 94px;
  background: #ffffff;
  font-size: 13px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-left: 10px;
  margin-top: 1px;
  padding: 0 8px;
}
.taskall {
  text-align: left;
  margin-left: 24px;
  margin-bottom: 14px;
}
.brand {
  display: flex;
}
.left {
  text-align: left;
  margin-left: 24px;
}
.right {
  text-align: left;
  margin-left: 32px;
}
#taskall {
  height: 19px;
  width: 119px;
  background: #ffffff;
  font-size: 13px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-top: 1px;
  padding: 0 8px;
  background-color: #efefef;
}
#yulan {
  height: 19px;
  width: 42px;
  /* background: #ffffff; */
  font-size: 13px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-top: 1px;
  padding: 0 8px;
}
.getGrey {
  background-color: #efefef;
}
#yulansj {
  height: 19px;
  width: 50px;
  /* background: #ffffff; */
  font-size: 13px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-top: 1px;
  padding: 0 8px;
}
.monthbox {
  margin-left: 24px;
  margin-top: 20px;
  margin-bottom: 12px;
}
.monthbox table {
  border-radius: 5px;
  border: 1px solid #7d7d7d;
  font-size: 13px;
  color: #000000;
}
.monthbox table td {
  border-right: 1px solid #7d7d7d;
  border-bottom: 1px solid #7d7d7d;
}
.monthbox input {
  border: none;
  width: 25px;
  height: 33px;
  padding: 0 6px;
  background-color: #efefef;
  text-align: center;
}
#clear {
  border-right: none;
}
#clear2 {
  border-bottom: none;
}
.bottom {
  display: flex;
  justify-content: space-between;
}
#none {
  margin-top: 23px;
}
#month {
  height: 19px;
  width: 33px;
  background: #ffffff;
  font-size: 13px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-top: 1px;
  padding: 0 5px;
  margin-left: 2px;
  margin-right: 2px;
}
.save {
  margin: 17px 13px 9px 13px;
  border-radius: 30px;
  bottom: 11px;
  width: 350px;
  height: 45px;
  left: 50%;
  line-height: 45px;
  color: #fff;
  background: -webkit-linear-gradient(
    to right,
    rgb(173, 213, 107),
    rgb(134, 202, 129)
  );
}
.shadow {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  background-color: #3b3b3b;
  top: 0px;
}
.point-out {
  border-radius: 10px;
  width: 286px;
  height: 203px;
  position: fixed;
  z-index: 150;
  left: 50%;
  top: 195px;
  margin-left: -143px;
  background-color: #fff;
}
/* .warn {
  background: url("http://14.29.221.109:10250/upload/assets/warn.png");
  height: 65px;
  width: 65px;
  background-size: 100% 100%;
  margin: 48px 110px 14px 110px;
} */
.point-out > p {
  text-align: center;
  position: relative;
  height: 139px;
  width: 198px;
  box-sizing: border-box;
  margin: 0 auto;
  top: 20%;
  left: 50%;
  margin-left: -99px;
  font-size: 15px;
  color: #7d7d7d;
}
.btn1 {
  width: 143px;
  height: 49px;
  line-height: 49px;
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 18px;
  border-radius: 0 0 0 7px;
  color: #ffffff;
  background-color: #4b4b4b;
}
.btn2 {
  width: 143px;
  height: 49px;
  line-height: 49px;
  position: absolute;
  right: 0;
  bottom: 0;
  color: #7d7d7d;
  font-size: 18px;
  border-radius: 0 0 7px 0;
  background-color: #f2f2f2;
}
.rewordpercent2 {
  position: absolute;
  right: 47px;
  top: 0px;
}
.rewordpercent2 .reword {
  margin-top: 5px;
}
</style>

<style>
</style>