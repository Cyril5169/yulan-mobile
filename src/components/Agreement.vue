<template>
  <div class="agreement">
    <Top :top="top"></Top>
    <div class="content">
      <div class="review">
        <input
          class="yearSelect"
          type="text"
          @click="showYear=true"
          v-model="selYear"
          readonly
          v-if="showSelYear"
        />
        <div class="review-box" @click="more">
          <span>评审记录</span>
        </div>
        <div id="reviewcard">
          <review :show="show4" v-on:set="listen" :message="messages" :customerInfo="customerInfo"></review>
        </div>
      </div>

      <div class="nt-content" v-if="IsShow">
        <div v-html="b2b2"></div>
      </div>
      <div class="bottom1" v-if="reviseflag && !reviewed">
        <div class="save2">
          <div @click="build" ref="build">通过协议书</div>
        </div>
        <div class="save1">
          <div @click="backcard" ref="backcard">退回协议书</div>
        </div>
      </div>
      <div class="foldwrap" v-show="show"></div>
      <div class="foldbox" v-show="show">
        <div class="box-top">
          <!-- <div class="warnimg"></div> -->
          <div class="warnmsg">
            <p>是否确定协议书信息</p>
            <p>完整且无误？</p>
            <p>点击确定将通过</p>
            <p>协议书的编辑。</p>
          </div>
        </div>
        <div class="box-bottom">
          <div class="sure" @click="sure">确定</div>
          <div class="cancel" @click="cancel">取消</div>
        </div>
      </div>
      <div class="foldwrap" v-show="show2"></div>
      <div class="foldbox" v-show="show2">
        <div class="box-top">
          <!-- <div class="warnimg" id="warnimg2"></div> -->
          <div class="warnmsg" id="warnmsg2">
            <p>是否确定退回协议书</p>
            <p>并重新填写？</p>
          </div>
        </div>
        <div class="box-bottom">
          <div class="sure" @click="sure2">确定</div>
          <div class="cancel" @click="cancel2">取消</div>
        </div>
      </div>
      <div class="foldwrap" v-show="show3"></div>
      <div class="foldbox" v-show="show3">
        <div class="box-top">
          <div class="close" @click="cancel3"></div>
          <div class="title">
            退回原因
            <span>(*必填)</span>
          </div>
          <textarea v-model="reason" placeholder="请输入退回原因..." class="reason"></textarea>
          <!-- <div class="warnimg" id="warnimg2"></div>
                    <div class="warnmsg" id="warnmsg2">
                        <p>是否确定退回客户资料卡</p>
                        <p>并重新填写？</p>
          </div>-->
        </div>
        <div class="box-bottom">
          <div class="sure" @click="sure3">退回</div>
          <div class="cancel" @click="cancel3">取消</div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
    <van-popup v-model="showYear" position="bottom">
      <van-picker
        show-toolbar
        :columns="yearColumn"
        :default-index="this.$store.state.year - 2018"
        @cancel="showYear=false"
        @confirm="onConfirmStatu"
      />
    </van-popup>
  </div>
</template>

<script>
import Top from "@/components/Top";
import review from "@/components/review";
import { GetYlContractByCustomer, UpdateContractState } from "@/api/card";
import { Popup, Picker } from "vant";

export default {
  data() {
    return {
      IsShow: false,
      top: 9,
      textmodel: "",
      messages: "",
      customerInfo: "",
      show: false,
      show2: false,
      show3: false,
      show4: false,
      reason: "",
      who: "",
      fileNum: "",
      user: "",
      userAddress: "",
      capital: "",
      city: "",
      county: "",
      start: "",
      end: "",
      preferedbrand: "",
      //第三部分数据
      precent1: "",
      precent2: "",
      precent3: "",
      money1: "",
      money2: "",
      money3: "",
      money4: "",
      //银行信息
      account_name: "",
      account_bank: "",
      account: "",
      account_location: "",
      m1: "",
      m2: "",
      m3: "",
      m4: "",
      m5: "",
      m6: "",
      m7: "",
      m8: "",
      m9: "",
      m10: "",
      m11: "",
      m12: "",
      totalm: "",
      startDate: "",
      endDate: "",
      signed: 0,
      state: "",
      year: "",
      month: "",
      day: "",
      hour: "",
      minutue: "",
      position: "",
      reviseflag: false, //是否能修改协议书
      market: "",
      csa: "",
      selYear: this.$store.state.year,
      contractData: [],
      contractInfoData: [],
      b2b2: "",
      yearColumn: [],
      showYear: false,
      showSelYear: true,
      ccid: this.$route.query.ccid,
      cyear: this.$route.query.cyear,
      reviewed: false,
      customerCheck: true
    };
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
    more() {
      this.show4 = true;
    },
    listen(data) {
      this.show4 = false;
    },
    sure() {
      let nowTime = this.initTime(new Date());
      let th = this;
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
      if (this.$store.state.info.data.type === "ECWEB") {
        this.state = "ASM_CHECKING";
        this.signed = 0;
        this.position = "";
      }
      if (this.$store.state.position == "VSMAPPROVEXII") {
        this.csa = this.$store.state.info.data.realName;
      }
      if (this.$store.state.position == "MARKETCHECKER") {
        this.market = this.$store.state.info.data.realName;
      }
      let data = {
        cid: this.ccid,
        state: this.state,
        wfmemo:
          nowTime +
          this.position +
          this.$store.state.info.data.realName +
          "通过协议书;",
        signed: this.signed,
        market: this.market,
        csa: this.csa
      };
      // this.$http
      //   .post("/infoState/checkYLcontractentryState.do", data)
      UpdateContractState({
        cid: this.ccid,
        year: this.selYear,
        state: this.state,
        wfmemo:
          nowTime +
          this.position +
          this.$store.state.info.data.realName +
          "通过协议书;",
        signed: this.signed,
        market: this.market,
        csa: this.csa
      }).then(function(res) {
        th.$router.push({
          path: "/success5"
        });
      });
    },
    cancel() {
      this.show = false;
    },
    build() {
      this.show = this.reviseflag ? true : false;
    },
    backcard() {
      this.show2 = this.reviseflag ? true : false;
    },
    sure2() {
      this.show2 = false;
      this.show3 = true;
    },
    cancel2() {
      this.show2 = false;
    },
    sure3() {
      let th = this;
      let nowTime = this.initTime(new Date());
      if (!this.reason) {
        alert("请填写退回原因!");
      } else {
        this.show3 = false;
        if (this.$store.state.info.data.type === "ECWEB") {
          this.position = "";
        }
        // this.$http.post("/infoState/checkYLcontractentryState.do", {
        //   cid: this.ccid,
        //   state: "SALEMANMODIFYING",
        //   wfmemo:
        //     nowTime +
        //     this.position +
        //     this.$store.state.info.data.realName +
        //     "退回协议书，原因是[" +
        //     this.reason +
        //     "];",
        //   signed: 2,
        //   market: "",
        //   csa: ""
        // });
        UpdateContractState({
          cid: this.ccid,
          year: this.selYear,
          state: "SALEMANMODIFYING",
          wfmemo:
            nowTime +
            this.position +
            " " +
            this.$store.state.info.data.realName +
            "退回协议书 [" +
            this.reason +
            "];",
          signed: 2,
          market: this.market,
          csa: this.csa
        }).then(function(res) {
          th.$router.push({
            path: "/success5"
          });
        });
      }
    },
    cancel3() {
      this.show3 = false;
    },
    onConfirmStatu(value) {
      this.selYear = value;
      this.showYear = false;
      this.getData();
    },
    getData() {
      GetYlContractByCustomer({
        cid: this.ccid,
        year: this.selYear
      }).then(res => {
        if (res.data != null && res.data.contract) {
          this.IsShow = true;
          this.contractData = res.data.contract;
          this.contractInfoData = res.data.contractInfo;
          this.b2b2 = res.data.htmlText;
          if (this.customerCheck) {
            if (this.contractData.state == "CUSTOMERAFFIRM") {
              this.reviseflag = true;
            } else {
              this.reviseflag = false;
            }
          } else {
            switch (this.$store.state.position) {
              case "SALEMAN_M":
                this.position = "办事处经理";
                this.reviseflag = false;
                break;
              case "SALEMAN_S":
                this.position = "业务经理";
                this.reviseflag = false;
                break;
              case "MANAGER":
                this.position = "中心总经理";
                if (this.contractData.state == "ASM_CHECKING") {
                  this.reviseflag = true;
                }
                break;
              case "MARKETCHECKER":
                this.position = "市场部";
                if (this.contractData.state == "DEP_MARKET_CHECK") {
                  this.reviseflag = true;
                }
                break;
              case "VSMAPPROVEXII":
                this.position = "销售总监";
                if (this.contractData.state == "CSA_CHECK") {
                  this.reviseflag = true;
                }
                break;
              default:
                break;
            }
          }

          this.$http
            .post("/infoState/getYLcontractentryState.do", {
              cid: this.ccid,
              cyear: this.selYear
            })
            .then(res => {
              if (res.data.yLcontractInfo != undefined) {
                var alldata = res.data;
                this.customerInfo = alldata.yLcontractInfo;
                if (alldata.yLcontractentryMemo)
                  this.messages = alldata.yLcontractentryMemo.reverse();
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          alert("如资料卡已通过审批，请联系业务经理生成协议书，谢谢!");
          this.IsShow = false;
        }
      });
    }
  },
  mounted() {
    for (var i = 2018; i < 2101; i++) {
      this.yearColumn.push(i);
    }
    if (!this.ccid) {
      //客户
      this.ccid = this.companyId;
    } else {
      //审核
      this.reviewed = this.$route.query.reviewed;
      this.showSelYear = false;
      this.selYear = this.cyear;
      this.customerCheck = false;
    }
    this.getData();
  },
  components: {
    Top,
    review,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  computed: {
    CID() {
      if (this.$store.state.info.data.type != "ECWEB") {
        return this.$store.state.CCID;
      } else {
        return this.$store.state.info.data.loginName;
      }
    },
    companyId() {
      return this.$store.getters.getCMId;
    }
  }
};
</script>

<style scoped>
.agreement {
  font-family: "PingFangHK-Regular", sans-serif;
  width: 375px;
  height: 100vh;
  overflow-x: hidden;
  background: #efefef;
}
.content {
  /* height: 588px; */
  overflow-x: hidden;
  background: #efefef;
  overflow-y: scroll;
  padding-top: 55px;
  height: 100vh;
  box-sizing: border-box;
}
.yearSelect {
  position: absolute;
  left: 8px;
  width: 50px;
  height: 20px;
  line-height: 20px;
  background-color: hsl(0, 0%, 100%);
  font-size: 13px;
  border: none;
  padding-left: 15px;
  text-align: left;
  background-repeat: no-repeat;
  background-image: url("../ordersystem/assetsorder/time-zk.png");
  background-position-x: 46px;
  background-position-y: 1vw;
  background-size: 15px;
}
.nt-content {
  position: fixed;
  overflow-y: scroll;
  top: 50px;
  bottom: 0;
  left: 5px;
  right: 5px;
  -webkit-overflow-scrolling: touch; /*这句是为了滑动更顺畅*/
  font-size: 13px;
  text-align: left;
}
.download {
  width: 67px;
  height: 86px;
  position: fixed;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
  border-radius: 7px;
  left: 14px;
  top: 71px;
  opacity: 0.7;
}
.download_img {
  width: 34px;
  height: 34px;
  padding-top: 17px;
  display: inline-block;
  background-image: url(../assets/download.png);
  background-repeat: no-repeat;
  background-size: 34px;
  background-position-y: 17px;
}
.download_text {
  padding-top: 3px;
  color: #ffffff;
  font-size: 10px;
}
.review {
  height: 51px;
  position: relative;
  z-index: 999;
}
.review-box {
  position: absolute;
  bottom: 8px;
  width: 80px;
  text-align: right;
  right: 35px;
  font-size: 15px;
  color: #89cb81;
  background-image: url(../assets/triangle_down_fill.png);
  background-size: 12px 17px;
  background-repeat: no-repeat;
  background-position: 6px 2px;
}
.review-box span {
  text-decoration: underline;
}
.agreement-text {
  display: inline-block;
  width: 318px;
  background: #ffffff;
  padding-top: 35px;
  padding-bottom: 20px;
  border-radius: 7px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  padding: 0 10px 0 10px;
  box-sizing: border-box;
  font-size: 12px;
}
.agreement-text h1 {
  font-size: 17px;
  margin: 0;
}
.footnote {
  font-size: 10px;
  color: #666666;
  text-align: left;
  font-size: 13px;
  /* padding-left: 130px; */
  margin: 0;
}
.text-box {
  padding-top: 10px;
  display: inline-block;
  width: 280px;
}
.content-text {
  padding-top: 5px;
  text-align: left;
  font-size: 13px;
  color: #7d7d7d;
  margin: 0px;
  line-height: 25px;
}
.content-text > span {
  text-decoration: underline;
}
.green {
  color: #89cb81;
}
.content-title {
  width: 100%;
  border-radius: 5px;
}
.title-text {
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 14px;
  padding: 2px 0;
  color: #000000;
  text-align: left;
  margin: 9px 0 7px 0;
  line-height: 21px;
}
.bottom {
  width: 100%;
  height: 15px;
}
#reviewcard {
  position: absolute;
  top: -90px;
  left: 380px;
}
.bottom1 {
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  background: rgb(112, 111, 111);
}
.save1 div {
  box-sizing: border-box;
  line-height: 37px;
  width: 116px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: #4b4b4b;
  float: left;
  margin: 8px auto 0 55px;
}
.save2 div {
  box-sizing: border-box;
  width: 116px;
  line-height: 37px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
  float: left;
  margin: 8px auto 0 55px;
}
.foldwrap {
  width: 100%;
  height: 1000px;
  position: fixed;
  top: 0;
  background: rgba(54, 54, 54, 0.4);
  z-index: 30;
}
.foldbox {
  width: 286px;
  height: 203px;
  background: #ffffff;
  position: fixed;
  top: 199px;
  z-index: 40;
  border-radius: 10px;
  left: 45px;
}
.box-top {
  height: 155px;
  width: 100%;
}
.warnmsg {
  position: relative;
  top: 35px;
  padding-left: 40px;
  padding-right: 40px;
  letter-spacing: 2px;
}
.warnmsg p {
  margin: 0;
  line-height: 22px;
  font-family: "PingFang-Regular", sans-serif;
  font-size: 15px;
  color: #7d7d7d;
}
.box-bottom {
  height: 48px;
  width: 100%;
  font-size: 0;
}
.sure,
.cancel {
  width: 50%;
  height: 100%;
  line-height: 48px;
  display: inline-block;
  font-size: 18px;
  background: #f2f2f2;
  color: #7d7d7d;
}
.sure {
  border-radius: 0 0 0 10px;
  background: #363636;
  color: rgba(255, 255, 255, 1);
}
.cancel {
  border-radius: 0 0 10px 0;
}
#warnimg2 {
  top: 48px;
}
#warnmsg2 {
  top: 65px;
}
.close {
  background: url(../assets/close.png);
  background-size: contain;
  background-repeat: no-repeat;
  width: 15px;
  height: 15px;
  position: absolute;
  right: 11px;
  top: 9.5px;
}
.title {
  font-size: 15px;
  padding-top: 17px;
  text-align: left;
  color: #000000;
  padding-left: 32px;
}
.title span {
  color: red;
}
.reason {
  width: 236px;
  height: 85px;
  margin-top: 5px;
  border-radius: 10px;
  border: 1px solid #b1b1b1;
  padding: 5px;
  overflow: scroll;
}
.reason::placeholder {
  font-size: 13px;
  color: #b1b1b1;
  padding-left: 8px;
}
.occupy {
  height: 64px;
}
.ten {
  text-decoration: underline;
}
.indent {
  text-indent: 26px;
}
td {
  border: 1px solid #eee;
}
</style>