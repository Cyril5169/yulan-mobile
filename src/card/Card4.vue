<template>
  <div class="card4">
    <div class="content">
      <div class="content-all">
        <div class="nbox">
          <p>
            经营方式：
            <label class="saleWay">
              <input
                type="radio"
                name="saleWay"
                id="way1"
                value="有公司"
                :checked="radiocheck1"
                @change="change1"
                @click.stop="getValue"
              />
              <label for="way1" class="way"></label>
              <span class="radio-name">有营业执照-有对公账号</span>
            </label>
          </p>
          <p id="insecond">
            <label class="saleWay">
              <input
                type="radio"
                name="saleWay"
                id="way2"
                value="无公司"
                :checked="radiocheck2"
                @change="change2"
                @click.stop="getValue"
              />
              <label for="way2" class="way"></label>
              <span class="radio-name">有营业执照-无对公账号</span>
            </label>
          </p>
          <p id="third" v-show="isShow">
            <span>是否增加委托授权付款银行账号</span>
          </p>
          <p id="thirdc" v-show="isShow">
            <span>（仅限经营者配偶）</span>
          </p>
          <p id="forth" v-show="c">
            <label class="saleWay">
              <input
                type="radio"
                name="adType"
                id="type1"
                value="Y"
                :checked="radiocheck4"
                @change="change4"
                @click.stop="getValue2"
              />
              <label for="type1" class="way"></label>
              <span class="radio-name">是</span>
            </label>
            <label class="saleWay">
              <input
                type="radio"
                name="adType"
                id="type2"
                value="N"
                :checked="radiocheck5"
                @change="change5"
                @click.stop="getValue2"
              />
              <label for="type2" class="way"></label>
              <span class="radio-name">否</span>
            </label>
          </p>
          <!-- <p id="fifth" v-show="b"><span id="download" @click="download">下载《授权付款委托书》</span>
            <span style="color:red">*</span><span id="togo" @click="sendData">填写授权委托账号信息</span>
          </p>-->
          <p id="inthird">
            <label class="saleWay">
              <input
                type="radio"
                name="saleWay"
                id="way3"
                value="个人"
                :checked="radiocheck3"
                @change="change3"
                @click.stop="getValue"
              />
              <label for="way3" class="way"></label>
              <span class="radio-name">无营业执照</span>
            </label>
          </p>
        </div>
        <div class="ctbox">
          <p>{{msg}}：</p>
        </div>
        <div class="box" id="person" v-show="acc1">
          <p>
            汇款人：
            <input type="text" v-model="person1" readonly="true" name="monperson1" />
          </p>
        </div>
        <div class="box" id="person" v-show="acc2">
          <p>
            汇款人：
            <input type="text" v-model="person2" readonly="true" name="monperson2" />
          </p>
        </div>
        <div class="box" id="bank" v-show="acc1">
          <p>
            <span style="color:red">*</span>汇款银行：
            <input type="text" v-model="bank1" @keyup="input3" name="bank1" />
          </p>
        </div>
        <div class="box" id="bank" v-show="acc2">
          <p>
            <span style="color:red">*</span>汇款银行：
            <input type="text" v-model="bank2" @keyup="input4" name="bank2" />
          </p>
        </div>
        <div class="box" id="number" v-show="acc1">
          <p>
            <span style="color:red">*</span>账号：
            <input type="text" v-model="number1" @keyup="input1" name="number1" />
          </p>
        </div>
        <div class="box" id="number" v-show="acc2">
          <p>
            <span style="color:red">*</span>账号：
            <input type="text" v-model="number2" @keyup="input2" name="number2" />
          </p>
        </div>
        <div class="box" id="bankaddress">
          <p>
            <span style="color:red">*</span>银行所在地：
            <input
              name
              id="form_select"
              @click="iosselect"
              readonly
              :value="location"
              ref="bank"
            />
          </p>
        </div>
      </div>
      <div class="tips">
        <span>
          *灰色底框内容只供客户核对，不允许修改。
          <br />如要修改请联系主管业务经理
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import iosselect from "@/components/Iosselect4";
import { bus } from "../utils/eventBus.js";

export default {
  props: ["area"],
  data() {
    return {
      more: false,
      msg: "公司汇款账号信息",
      isShow: false,
      b: false,
      c: false,
      bankType: "",
      person1: " ",
      person2: " ",
      bank1: " ",
      bank2: " ",
      number1: " ",
      number2: " ",
      acc1: true,
      acc2: false,
      spouse: "",
      radiocheck1: false,
      radiocheck2: false,
      radiocheck3: false,
      radiocheck4: false,
      radiocheck5: false,
      no: "123",
      windowDif: "",
      location: " ",
      bank1Location: "",
      bank2Location: "",
      contractyear: this.$store.state.year
    };
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
  },
  created() {
    bus.$on("taxType", data => {
      this.bankType = data;
    });
  },
  watch: {
    area: function changeArea() {
      this.location = this.area;
    },
    bankType(curVal, oldVal) {
      if (curVal == "增值税专用发票") {
        const s = document.getElementById("way2");
        s.disabled = true;
        const a = document.getElementById("way3");
        a.disabled = true;
        this.radiocheck1 = true;
        this.radiocheck2 = false;
        this.radiocheck3 = false;
        this.isShow = false;
        this.acc1 = true;
        this.acc2 = false;
        this.c = false;
        this.b = false;
        this.msg = "公司汇款账号信息 ";
        this.$emit("value2", "有公司");
      } else {
        const x = document.getElementById("way2");
        x.disabled = false;
        const p = document.getElementById("way3");
        p.disabled = false;
      }
    },
    radiocheck1(curVal, oldVal) {
      if (curVal == true) {
        this.$emit("value2", "有公司");
        this.$emit("listenselect2", this.$refs.bank.value);
      }
    },
    radiocheck2(curVal, oldVal) {
      if (curVal == true) {
        this.$emit("value2", "无公司");
        this.$emit("listenselect2", this.$refs.bank.value);
      }
    },
    radiocheck3(curVal, oldVal) {
      if (curVal == true) {
        this.$emit("value2", "个人");
        this.$emit("listenselect2", this.$refs.bank.value);
      }
    }
  },
  components: {
    iosselect
  },
  methods: {
    iosselect() {
      this.more = true;
      this.$emit("listen3", this.more);
    },
    listenmore(data) {
      this.more = data;
    },
    listenselect(data) {
      this.selected = data;
      this.$refs.bank.value = this.selected;
    },
    change2: function() {
      this.msg = "个人汇款账号信息 ";
      this.isShow = true;
      this.c = true;
      this.acc2 = true;
      this.acc1 = false;
      this.radiocheck2 = true;
      this.radiocheck1 = false;
      this.radiocheck3 = false;
      if (this.radiocheck4 == true) {
        this.b = true;
        this.lp = 1;
        this.$emit("lplp", this.lp);
      } else {
        this.b = false;
        this.lp = 0;
        this.$emit("lplp", this.lp);
      }
    },
    change1: function() {
      this.msg = "公司汇款账号信息 ";
      this.isShow = false;
      this.acc1 = true;
      this.acc2 = false;
      this.c = false;
      this.b = false;
      this.radiocheck1 = true;
      this.radiocheck2 = false;
      this.radiocheck3 = false;
      this.lp = 0;
      this.$emit("lplp", this.lp);
    },
    change3: function() {
      this.msg = "个人汇款账号信息 ";
      this.isShow = false;
      this.c = false;
      this.b = false;
      this.acc2 = true;
      this.acc1 = false;
      this.radiocheck3 = true;
      this.radiocheck2 = false;
      this.radiocheck1 = false;
      this.lp = 0;
      this.$emit("lplp", this.lp);
    },
    change4: function() {
      this.b = true;
      this.radiocheck4 = true;
      this.radiocheck5 = false;
      this.lp = 1;
      this.$emit("lplp", this.lp);
    },
    change5: function() {
      this.b = false;
      this.radiocheck5 = true;
      this.radiocheck4 = false;
      this.lp = 0;
      this.$emit("lplp", this.lp);
    },
    getValue: function() {
      var radio = document.getElementsByName("saleWay");
      for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
          var judgevalue = radio[i].value;
        }
      }
      if (judgevalue == "有公司") {
        this.$refs.bank.value = this.bank1Location;
      } else {
        this.$refs.bank.value = this.bank2Location;
      }
      this.judge = judgevalue;
      this.$emit("value2", this.judge);
    },
    getValue2: function() {
      var radio = document.getElementsByName("adType");
      for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
          var judvalue = radio[i].value;
        }
      }
      this.spouse = judvalue;
      this.$emit("spouse", this.spouse);
    },
    download() {
      location.href = "http://14.29.221.109:10250/yulan/file/down.do";
    },
    sendData() {
      let url = "/customerInfo/updateCustomerInfo.do";
      let data = {
        cid: this.companyId,
        contractyear: this.contractyear,
        hasPublicAccount: "N",
        busientType: "公司",
        account2Bank: this.bank2,
        account2: this.number2,
        account2Location: this.area
      };
      this.$http.post(url, data).then(res => {
        this.$router.push({
          path: "/proxy"
        });
      });
    },
    getdata() {
      let url = "/customerInfo/getCustomerInfo.do";
      let data = {
        CID: this.companyId
      };
      this.$http.post(url, data).then(res => {
        if (res.data.code == 0 && res.data.data != null) {
          var alldata = res.data.data;
          this.person1 = alldata.account1Name;
          this.bank1 = alldata.account1Bank;
          this.bank1Location = alldata.account1Location;
          this.person2 = alldata.account2Name;
          this.bank2 = alldata.account2Bank;
          this.bank2Location = alldata.account2Location;
          this.number1 = alldata.account1;
          this.number2 = alldata.account2;
          this.no = alldata.hasPublicAccount;
          window.no = alldata.hasPublicAccount;
          var typeofTax = alldata.invoiceType;
          if (typeofTax == "增值税专用发票") {
            const s = document.getElementById("way2");
            s.disabled = true;
            const a = document.getElementById("way3");
            a.disabled = true;
            this.radiocheck1 = true;
            this.radiocheck2 = false;
            this.radiocheck3 = false;
            this.isShow = false;
            this.acc1 = true;
            this.acc2 = false;
            this.c = false;
            this.b = false;
            this.msg = "公司汇款账号信息 ";
          }
          var difference = alldata.busientType;
          window.windowDif = alldata.busientType;
          if (this.no == null) {
            this.radiocheck1 = false;
            this.radiocheck2 = false;
            this.radiocheck3 = false;
            this.radiocheck4 = false;
            this.radiocheck5 = false;
            this.b = false;
            this.c = false;
          }
          if (difference == "公司" && this.no == "N") {
            this.radiocheck2 = true;
            this.change2();
          }
          if (difference == "公司" && this.no == "Y") {
            this.radiocheck1 = true;
            this.change1();
          }
          if (difference == "个体户") {
            this.radiocheck3 = true;
            this.change3();
          }
          if (this.no == "Y") {
            this.$refs.bank.value = this.bank1Location;
          } else {
            this.$refs.bank.value = this.bank2Location;
          }
          this.contractyear = alldata.contractyear;
          let url2 = "/customerInfo/getYLcontract.do";
          let data2 = {
            ccid: this.companyId,
            ccyear: alldata.contractyear
          };
          this.$http.post(url2, data2).then(res2 => {
            if (res2.data.code == 0) {
              this.newspo = "Y";
              this.$emit("newSpo", this.newspo);
              if (window.windowDif == "公司" && window.no == "N") {
                this.b = true;
                this.radiocheck4 = true;
                this.radiocheck5 = false;
                this.lp = 1;
                this.$emit("lplp", this.lp);
              }
            } else if (res2.data.code == 1) {
              this.newspo = "N";
              this.radiocheck5 = true;
              this.radiocheck4 = false;
              this.b = false;
              this.$emit("newSpo", this.newspo);
              this.lp = 0;
              this.$emit("lplp", this.lp);
            }
          });
        } else if (res.data.code === 1 || res.data.data == null) {
          console.log("出错了!");
        }
      });
    },
    input1() {
      this.$emit("put10", this.number1);
    },
    input2() {
      this.$emit("put11", this.number2);
    },
    input3() {
      this.$emit("put12", this.bank1);
    },
    input4() {
      this.$emit("put13", this.bank2);
    }
  },
  mounted() {
    this.getdata();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.content {
  box-sizing: border-box;
  height: 455px;
  width: 100%;
  background: white;
  overflow: hidden;
}
.content-all {
  width: 318px;
  height: 348px;
  margin: 33px 19.1px 5px 37.9px;
}
.content-all p {
  font-size: 15px;
  color: #000000;
  font-weight: bold;
}
.nbox {
  text-align: left;
}
.nbox label {
  font-size: 13px;
}
.saleWay {
  margin: 5px;
  margin-left: 45px;
  font-weight: normal;
}
#way1 {
  display: none;
}
#way2 {
  display: none;
}
#way3 {
  display: none;
}
#type1 {
  display: none;
}
#type2 {
  display: none;
}
.way {
  height: 12px;
  width: 12px;
  display: inline-block;
  background: url("../assets/select1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
  margin-top: -4px;
}
input[type="radio"]:checked + .way {
  background-image: url("../assets/select3.png");
}
/* .a-radio{
    display: none;
}
.b-radio{
    display: inline-block;
    border:1px solid #ccc;
    width:11px;
    height: 11px;
    border: 1px solid black;
    border-radius:50%;
    vertical-align: middle;
    margin-right: 5px;
    margin-bottom: 3px;
    position: relative;
}
.b-radio:before{
    content: '';
    font-size: 0;
    width: 9px;
    height: 9px;
    background: #89CB81;
    position: absolute;
    left:55%;
    top:55%;
    margin-left: -5px;
    margin-top: -5px;
    border-radius: 50%;
    display: none;
}
.a-radio:checked~.b-radio:before{
    display: block;
} */
#insecond {
  font-size: 13px;
  text-align: center;
  margin-top: 4px;
  margin-left: 40px;
}
#third {
  margin-top: 4px;
}
#third span {
  font-size: 13px;
  text-align: left;
  margin-left: 100px;
  color: #7d7d7d;
  font-weight: normal;
}
#thirdc {
  line-height: 12px;
  font-weight: normal;
}
#thirdc span {
  font-size: 13px;
  text-align: left;
  margin-left: 100px;
  color: #7d7d7d;
}
#forth {
  height: 18px;
  margin-left: 105px;
  margin-top: 10px;
}
.no {
  margin-left: 15px;
}
.yes {
  margin-left: 20px;
}
#fifth {
  font-weight: normal;
}
#download {
  border-bottom: 1px solid #89cb81;
  /* padding-bottom: 0.5px; */
  margin-left: 85px;
  font-size: 10px;
  color: #89cb81;
}
#togo {
  color: #89cb81;
  font-size: 10px;
  /* margin-left: 12px; */
  border-bottom: 1px solid #89cb81;
}
#inthird {
  margin-top: 4px;
  margin-left: 79px;
}
#inthird span {
  font-size: 13px;
  text-align: center;
}
.ctbox {
  text-align: left;
  margin-top: 10px;
}
.box {
  text-align: left;
  margin-top: 9px;
}
.box input {
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 13px;
  color: #7d7d7d;
  border: 0px;
  border-radius: 5px;
  margin-top: 1px;
  padding: 0 8px;
  font-weight: normal;
}
#bank input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
  margin-left: 45px;
  height: 25px;
  width: 148px;
}
#number input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
  height: 25px;
  width: 148px;
  margin-left: 75px;
}
#person input {
  height: 23px;
  width: 150px;
  margin-left: 66px;
}
.tips {
  text-align: center;
  margin-left: 58px;
  width: 265px;
  height: 32px;
  font-size: 10px;
  line-height: 15px;
  color: #b5b5b5;
}
#form_select {
  /* 清除默认边框 */
  font-size: 11px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  padding-left: 11px;
  padding-right: 11px;
  margin-left: 26px;
  height: 25px;
  width: 143px;
  font-size: 13px;
  color: #7d7d7d;
  /* 清除默认的箭头样式 */
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  /* 右侧添加小箭头的背景图 */
  background: url(../assets/select_arrow.png);
  background: 148px center no-repeat;
  background-size: 6px 6px;
  font-weight: normal;
}
</style>