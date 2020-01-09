<template>
  <div class="card1">
    <div class="content">
      <div class="content-all">
        <div class="topBox">
          <p>
            <label class="testWord">主营区域：</label>
            <input type="text" v-model="district" readonly="true" name="area" />
          </p>
        </div>

        <div id="brand1">
          <p>
            <label class="testWord">
              <span style="color:red">*</span>意向品牌：
            </label>
            <input
              type="checkbox"
              class="check"
              name="check"
              :checked="boxcheck1"
              @click="changeCheck1"
            />
            <span>玉兰（墙纸类产品）</span>
          </p>
        </div>
        <div id="brand2">
          <label class="testWord"></label>
          <input
            type="checkbox"
            class="check"
            name="check"
            :checked="boxcheck2"
            @click="changeCheck2"
          />
          <span>兰尚居品（布艺类产品）</span>
        </div>
        <div class="box" id="nowbrand">
          <p>
            <span style="color:red">*</span>
            <label class="testWord">主营品牌(非玉兰)：</label>
            <input type="text" v-model="nowbrand" @keyup="input1" name="nowbrand" />
          </p>
        </div>
        <div class="box" id="square">
          <p>
            <!-- <span style="color:red">*</span> -->
            <label class="testWord">店铺面积：</label>
            <input type="number" v-model="square" @keyup="input2" name="square" />
            <span>&nbsp;平方米</span>
          </p>
        </div>
        <div class="box" id="taxtype">
          <p>
            <label class="testWord">发票开具类型：</label>
            <label class="invoice">
              <input
                type="radio"
                name="invoice"
                id="tax1"
                value="不开发票"
                :checked="radiocheck1"
                @change="test3"
                @click.stop="getValue"
              />
              <label for="tax1" class="intype"></label>
              <span class="radio-name">不开发票</span>
            </label>
          </p>
          <p>
            <label class="testWord">&nbsp;</label>
            <label class="invoice">
              <input
                type="radio"
                name="invoice"
                id="tax2"
                value="增值税普通发票"
                :checked="radiocheck2"
                @change="emailunShow1"
                @click.stop="getValue"
              />
              <label for="tax2" class="intype"></label>
              <span class="radio-name">增值税普通发票</span>
            </label>
            <label class="invoice" id="num2">
              <input
                type="radio"
                name="invoice"
                id="tax3"
                value="电子普通发票"
                :checked="radiocheck3"
                @change="emailShow"
                @click.stop="getValue"
              />
              <label for="tax3" class="intype"></label>
              <span class="radio-name">电子普通发票</span>
            </label>
          </p>
          <p class="inthird" id="inthird">
            <label class="testWord">&nbsp;</label>
            <label class="invoice">
              <input
                type="radio"
                name="invoice"
                id="tax4"
                value="增值税专用发票"
                :checked="radiocheck4"
                @change="emailunShow2"
                @click.stop="getValue"
              />
              <label for="tax4" class="intype" id="num4"></label>
              <span class="radio-name">增值税专用发票</span>
            </label>
            <span v-show="goTo" style="color:red">*</span>
            <span v-show="goTo" id="togo" @click="sendData">填写发票信息</span>
            <!-- <input type="button" value="填写发票信息" v-show="goTo" id="togo" @click="sendData"> -->
            <!-- <keep-alive>
                  <span v-show="goTo" style="color:red">*</span><router-link to="/swiper/tax"><span v-show="goTo" id="togo" @click="sendData">填写发票信息</span></router-link>
            </keep-alive>-->
          </p>
        </div>
        <div class="box" id="email" v-show="showEmail">
          <p>
            收件邮箱：
            <input type="text" name="email" v-model="reEmail" @keyup="input4" />
          </p>
        </div>
        <div class="box" id="people">
          <p>
            一般纳税人：
            <label id="showYes">
              <input
                type="radio"
                name="type"
                id="adviceRadio1"
                value="1"
                :checked="radiocheck5"
                @click="Check"
              />
              <label for="adviceRadio1" class="advice"></label>
              <span class="radio-name">是</span>
            </label>
            <label class="no">
              <input
                type="radio"
                name="type"
                id="adviceRadio2"
                value="2"
                :checked="radiocheck6"
                @click="Check1"
              />
              <label for="adviceRadio2" class="advice"></label>
              <span class="radio-name">否</span>
            </label>
          </p>
        </div>
        <div class="box" id="manager">
          <p>
            法人代表/经营者：
            <input type="text" v-model="manager" readonly="true" name="address" />
          </p>
        </div>
        <div class="box" id="cellphone">
          <p>
            <span style="color:red">*</span>法人手机：
            <input v-model="phone" type="text" @keyup="input3" name="cellphone" />
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
import { bus } from "../utils/eventBus.js";
export default {
  // props:['noIt'],
  data() {
    return {
      phone: " ",
      district: "",
      electric: false,
      boxcheck1: false,
      boxcheck2: false,
      showEmail: false,
      getTax: "",
      IsPonitOut: false,
      goTo: false,
      nowbrand: "",
      square: "",
      manager: " ",
      radiocheck1: false,
      radiocheck2: false,
      radiocheck3: false,
      radiocheck4: false,
      radiocheck5: false,
      radiocheck6: false,
      preferedbrand: "",
      tax: " ",
      reEmail: "",
      taxPerson: "",
      contractyear: this.$store.state.year
    };
  },
  created() {
    // bus.$on("no", (data) => {
    //   var noIt = data;
    //   if(noIt == 0){
    //     this.radiocheck6 = true;
    //     this.radiocheck4 = false;
    //     this.radiocheck5 = false;
    //     this.radiocheck1 = false;
    //     this.radiocheck2 = false;
    //     this.radiocheck3 = false;
    //     this.goTo = false;
    //   }
    // })
    // bus.$on("yes", (e) => {
    //   var yesIt = e;
    //   if(yesIt == 1){
    //     this.radiocheck6 = false;
    //     this.radiocheck5 = true;
    //     this.radiocheck4 = true;
    //     this.goTo = true;
    //   }
    // })
    // bus.$on("changeTax", (data) => {
    //   this.getTax = data
    //   console.log(this.getTax)        //先不改着
    // })
  },
  // activated(){
  //   bus.$on("no", (data) => {
  //     var noIt = data;
  //     if(noIt == 0){
  //       this.radiocheck6 = true;
  //       this.radiocheck4 = false;
  //       this.radiocheck5 = false;
  //       this.radiocheck1 = false;
  //       this.radiocheck2 = false;
  //       this.radiocheck3 = false;
  //       this.goTo = false;
  //     }
  //   });
  //   bus.$on("yes", (e) => {
  //     var yesIt = e;
  //     if(yesIt == 1){
  //       this.radiocheck6 = false;
  //       this.radiocheck5 = true;
  //       this.radiocheck4 = true;
  //       this.goTo = true;
  //     }
  //   });
  //   this.getData();
  //     setTimeout(function(){
  //       var radio = document.getElementsByName("invoice");
  //       for(var i=0; i<radio.length; i++){
  //         if(radio[i].checked) {
  //           // console.log(radio[i].value)
  //         }
  //       }
  //     },1000)  //取值的时候有延迟，要等上面数据拿完才显示true
  // },
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
  watch: {
    boxcheck1(curVal, oldVal) {
      if (curVal) {
        if (this.boxcheck2) {
          this.preferedbrand = "√玉兰（墙纸类产品）√兰居尚品（布艺类产品）";
        } else {
          this.preferedbrand = "√玉兰（墙纸类产品）";
        }
      } else {
        if (this.boxcheck2) {
          this.preferedbrand = "√兰居尚品（布艺类产品）";
        } else {
          this.preferedbrand = "";
        }
      }
    },
    boxcheck2(curVal, oldVal) {
      if (curVal) {
        if (this.boxcheck1) {
          this.preferedbrand = "√玉兰（墙纸类产品）√兰居尚品（布艺类产品）";
        } else {
          this.preferedbrand = "√兰居尚品（布艺类产品）";
        }
      } else {
        if (this.boxcheck1) {
          this.preferedbrand = "√玉兰（墙纸类产品）";
        } else {
          this.preferedbrand = "";
        }
      }
    },
    radiocheck1(curVal, oldVal) {
      if (curVal) {
        this.radiocheck6 = true;
        this.radiocheck5 = false;
        this.$emit("value1", "不开发票");
      }
    },
    radiocheck2(curVal, oldVal) {
      if (curVal) {
        this.radiocheck6 = true;
        this.radiocheck5 = false;
        this.$emit("value1", "增值税普通发票");
      }
    },
    radiocheck3(curVal, oldVal) {
      if (curVal) {
        this.radiocheck6 = true;
        this.radiocheck5 = false;
        this.$emit("value1", "电子普通发票");
      }
    },
    radiocheck4(curVal, oldVal) {
      if (curVal) {
        this.$emit("value1", "增值税专用发票");
      }
    }
    // getTax(curVal,oldVal){
    //   if(curVal == "有公司"){
    //     let s = document.getElementById("inthird")
    //     s.style.display = "";
    //     let x = document.getElementById("insecond")
    //     x.style.marginLeft = ""
    //     this.electric = false;
    //     let k = document.getElementById("showYes")
    //     k.style.display = ""                               // 先不改着
    //   }
    //   else{
    //     let s = document.getElementById("inthird")
    //     s.style.display = "none";
    //     let x = document.getElementById("insecond")
    //     x.style.marginLeft = "0px"
    //     this.electric = true;
    //     let k = document.getElementById("showYes")
    //     k.style.display = "none"
    //   }
    // }
  },
  methods: {
    test3: function() {
      this.showEmail = false;
      this.goTo = false;
      this.radiocheck1 = true;
      this.radiocheck2 = false;
      this.radiocheck3 = false;
      this.radiocheck4 = false;
      this.radiocheck5 = false;
      this.radiocheck6 = true;
    },
    getValue: function() {
      var radio = document.getElementsByName("invoice");
      for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
          var taxvalue = radio[i].value;
        }
      }
      this.tax = taxvalue;
      this.$emit("value1", this.tax);
      bus.$emit("taxType", this.tax);
    },
    sendData() {
      let url = "/customerInfo/updateCustomerInfo.do";
      let data = {
        cid: this.companyId,
        contractyear: this.contractyear,
        preferedbrand: this.preferedbrand,
        currentProduct: this.nowbrand,
        invoiceType: "增值税专用发票",
        isGeneraltaxpayer: "是",
        shopArea: this.square,
        juridicPersonHandset: this.phone,
        hasPublicAccount: "Y",
        busientType: "公司"
      };
      this.$http.post(url, data).then(res => {
        this.$router.push({
          path: "/swiper/tax"
        });
      });
    },
    emailShow: function() {
      this.showEmail = true;
      this.goTo = false;
      this.radiocheck3 = true;
      this.radiocheck1 = false;
      this.radiocheck2 = false;
      this.radiocheck4 = false;
      this.radiocheck5 = false;
      this.radiocheck6 = true;
    }, //3
    emailunShow1: function() {
      this.showEmail = false;
      this.goTo = false;
      this.radiocheck2 = true;
      this.radiocheck1 = false;
      this.radiocheck3 = false;
      this.radiocheck4 = false;
      this.radiocheck5 = false;
      this.radiocheck6 = true;
    }, //2
    emailunShow2: function() {
      this.showEmail = false;
      this.radiocheck4 = true;
      this.radiocheck1 = false;
      this.radiocheck2 = false;
      this.radiocheck3 = false;
      this.goTo = true;
      this.radiocheck5 = true;
      this.radiocheck6 = false;
    },
    Check() {
      this.radiocheck5 = true;
      this.radiocheck6 = false;
      this.radiocheck4 = true;
      this.goTo = true;
    },
    Check1() {
      this.radiocheck6 = true;
      this.radiocheck5 = false;
      this.radiocheck4 = false;
      this.goTo = false;
    },
    changeCheck1() {
      this.boxcheck1 = !this.boxcheck1;
      this.$emit("select1", this.boxcheck1);
    },
    changeCheck2() {
      this.boxcheck2 = !this.boxcheck2;
      this.$emit("select2", this.boxcheck2);
    },
    input1() {
      this.$emit("put1", this.nowbrand);
    },
    input2() {
      this.$emit("put2", this.square);
    },
    input3() {
      this.$emit("put3", this.phone);
    },
    input4() {
      this.$emit("put19", this.reEmail);
    },
    getData() {
      let url = "/customerInfo/getCustomerInfo.do";
      let data = {
        CID: this.companyId
      };
      this.$http.post(url, data).then(res => {
        //返回的数据
        if (res.data.code == 0 && res.data.data != null) {
          var alldata = res.data.data;
          this.phone = alldata.juridicPersonHandset;
          if (alldata.preferedbrand != null) {
            var newband = alldata.preferedbrand.split("");
            if (newband.indexOf("墙") > -1) {
              this.boxcheck1 = true;
            }
            if (newband.indexOf("软") > -1 || newband.indexOf("布") > -1) {
              this.boxcheck2 = true;
            }
          }
          this.contractyear = alldata.contractyear;
          this.nowbrand = alldata.currentProduct;
          this.square = alldata.shopArea;
          this.manager = alldata.xJuridicPerson;
          this.tax = alldata.invoiceType;
          this.district = alldata.districtText;
          if (this.tax == "不开发票") {
            this.radiocheck1 = true;
          }
          if (this.tax == "增值税普通发票") {
            this.radiocheck2 = true;
          }
          if (this.tax == "电子普通发票") {
            this.radiocheck3 = true;
            this.showEmail = true;
          }
          if (this.tax == "增值税专用发票") {
            this.radiocheck4 = true;
            this.goTo = true;
            this.radiocheck5 = true;
          }
          this.reEmail = alldata.recipeTargetMb;
          this.no = alldata.hasPublicAccount;
        } else if (res.data.code === 1 || res.data.data == null) {
          // console.log("哦豁，完蛋!")
        }
      });
    }
  },
  mounted() {
    this.getData();
    setTimeout(function() {
      var radio = document.getElementsByName("invoice");
      for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
          // console.log(radio[i].value)
        }
      }
    }, 1000); //取值的时候有延迟，要等上面数据拿完才显示true
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
  height: 455px;
  width: 100%;
  background: white;
  overflow: hidden;
  /* box-shadow: 0px 3px 6px rgba(0,0,0,0.16); */
}
.content-all {
  width: 348px;
  height: 356px;
  margin: 28px auto 1px 37.9px;
}
.content-all p {
  font-size: 15px;
  color: #000000;
}
.testWord {
  display: inline-block;
  width: 118px;
  height: 22px;
}
.topBox {
  width: 100%;
  height: 20px;
}
.topBox p {
  text-align: left;
  font-weight: bolder;
}
.topBox input {
  font-weight: normal;
}
.topBox input {
  height: 23px;
  width: 170px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 13px;
  color: #7d7d7d;
  border: 0px;
  border-radius: 5px;
  margin-top: 1px;
  padding-left: 10px;
}
.newbox {
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  margin-top: 9px;
}
#brand1 {
  text-align: left;
  margin-top: 8px;
}
#brand2 {
  text-align: left;
}
#brand2 input {
  margin-top: 9px;
}
#brand1 p {
  font-size: 15px;
  font-weight: bold;
}
#brand1 span {
  font-weight: normal;
  font-size: 13px;
}
#brand2 span {
  font-weight: normal;
  font-size: 13px;
  color: #000000;
}
.box {
  width: 100%;
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
#taxtype p {
  font-size: 13px;
  font-weight: bold;
}
#people {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top: 5px;
  font-weight: bold;
}
#people label {
  display: inline-block;
  margin-left: 12.5px;
  font-weight: normal;
}
#manager {
  margin-top: 9px;
  font-size: 13px;
  font-weight: bold;
}
#manager input {
  height: 23px;
  width: 153px;
}
.no {
  margin-left: 24px;
}
.box label {
  font-size: 13px;
}
.newbox p {
  text-align: left;
  font-weight: bold;
}
/* .test{
  vertical-align: middle;
  display: inline-block;
  font-size: 13px;
  font-weight: normal;
  margin-left: 28px;
}
.test1{
  vertical-align: middle;
  display: inline-block;
  font-size: 13px;
  font-weight: normal;
} */
.check[type="checkbox"] {
  width: 15px;
  height: 15px;
  -webkit-appearance: none;
  border: 1px solid black;
  border-radius: 2px;
  outline: none;
  vertical-align: top;
  margin-top: 4px;
  margin-right: 5px;
}
.check[type="checkbox"]:checked {
  background: url("../assets/check2.png") no-repeat center;
}
.invoice span {
  font-weight: normal;
}
#num2 {
  margin-left: 1px;
}
.advice {
  height: 15px;
  width: 15px;
  display: inline-block;
  background: url("../assets/select1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
  margin-top: -4px;
}
input[type="radio"]:checked + .advice {
  background-image: url("../assets/select3.png");
}
.intype {
  height: 15px;
  width: 15px;
  display: inline-block;
  background: url("../assets/select1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
}
input[type="radio"]:checked + .intype {
  background-image: url("../assets/select3.png");
}
#second {
  margin-left: 110px;
  font-size: 13px;
  text-align: center;
  margin-top: 10px;
}
#insecond {
  font-size: 13px;
  line-height: 22px;
}
.inthird span {
  font-size: 13px;
  text-align: center;
}
#fakeInthird {
  margin-left: 105px;
}
#yes #no {
  font-size: 13px;
}
#no {
  margin-left: 20px;
}
#nowbrand p {
  font-weight: bold;
  font-size: 13px;
}
#nowbrand input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
  height: 25px;
  width: 150px;
}
#square p {
  font-weight: bold;
}
#square span {
  font-weight: normal;
}
#square input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
  height: 25px;
  width: 125px;
}
#cellphone {
  margin-top: 9px;
}
#cellphone p {
  font-weight: bold;
}
#cellphone input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
  height: 25px;
  width: 150px;
  margin-left: 45px;
}
#email p {
  font-weight: bold;
}
#email {
  margin-top: 5px;
  margin-left: 120px;
}
#email input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
  height: 25px;
  width: 100px;
}
.tips {
  text-align: center;
  margin-left: 58px;
  width: 265px;
  font-size: 10px;
  line-height: 15px;
  color: #b5b5b5;
}
#togo {
  border: 0px;
  background: none;
  color: #89cb81;
  text-decoration: underline;
  text-decoration-color: #89cb81;
  font-weight: normal;
}
#tax1 {
  display: none;
}
#tax2 {
  display: none;
}
#tax3 {
  display: none;
}
#tax4 {
  display: none;
}
#adviceRadio1 {
  display: none;
}
#adviceRadio2 {
  display: none;
}
</style>