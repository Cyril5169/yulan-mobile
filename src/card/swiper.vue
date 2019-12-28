<template>
  <div class="swiper">
    <ios-select5 v-show="more" v-on:listen="listenset" v-on:listen2="listenselect" :item="item"></ios-select5>
    <div class="point-out" v-show="IsPonitOut">
      <div class="warn"></div>
      <p v-show="firstWarn" class="surewarn">
        是否确定保存并提交
        <br />客户资料卡？
        <br />
        <span>一经提交将无法再次修改！</span>
      </p>
      <!-- <p v-show="secondWarn">请确认是否具有一般<br>纳税人资格!</p> -->
      <!-- <div class='btn1' @click="Cancel2" v-show="secondWarn">确定</div> -->
      <div class="btn1" @click="trueSend" v-show="!secondWarn">确定</div>
      <div class="btn2" @click="Cancel" v-show="!secondWarn">取消</div>
      <!-- <div class="btn2"  @click="Cancel1" v-show="secondWarn">取消</div> -->
    </div>
    <div class="shadow" v-show="IsPonitOut"></div>
    <top ref="top" :top="set"></top>
    <!-- <file :file='num'></file> -->
    <file-msg :file="bannerIndex" :statusNum="numIndex" v-on:twice="noClick"></file-msg>
    <swiper :options="swiperOption">
      <swiper-slide>
        <card1
          v-on:select1="selected1"
          v-on:select2="selected2"
          v-on:put1="input1"
          v-on:put2="input2"
          v-on:put3="input3"
          v-on:value1="allvalue1"
          v-on:put19="input19"
        ></card1>
      </swiper-slide>
      <swiper-slide>
        <card2 v-on:put4="input4" v-on:put5="input5" v-on:put6="input6" v-on:put7="input7"></card2>
      </swiper-slide>
      <swiper-slide>
        <card3 v-on:put8="input8" v-on:put9="input9"></card3>
      </swiper-slide>
      <swiper-slide>
        <card4
          v-on:listenselect2="listenselect2"
          v-on:lplp="lplp"
          v-on:proxxy="proxxy"
          v-on:newSpo="newSpo"
          v-on:put10="input10"
          v-on:put11="input11"
          v-on:put12="input12"
          v-on:put13="input13"
          v-on:value2="allvalue2"
          v-on:spouse="spoValue"
          v-on:listen3="listenmore2"
          :area="location"
        ></card4>
      </swiper-slide>
      <swiper-slide>
        <card5
          :sss="options"
          v-on:put14="input14"
          v-on:put15="input15"
          v-on:put16="input16"
          v-on:put17="input17"
          v-on:put18="input18"
          v-on:file1="getFile1"
          v-on:file4="getFile4"
          v-on:file2="getFile2"
          v-on:file3="getFile3"
          v-on:time1="getTime1"
          v-on:time2="getTime2"
          v-on:time3="getTime3"
          v-on:time4="getTime4"
          v-on:time5="getTime5"
          v-on:time6="getTime6"
          v-on:time7="getTime7"
          v-on:time8="getTime8"
          v-on:time9="getTime9"
          v-on:time10="getTime10"
          v-on:time11="getTime11"
          v-on:time12="getTime12"
          v-on:time13="getTime13"
          v-on:time14="getTime14"
          v-on:time15="getTime15"
          v-on:time16="getTime16"
          v-on:date="getDate"
          v-on:forever1="foreverDate1"
          v-on:forever2="foreverDate2"
          v-on:forever3="foreverDate3"
          v-on:forever4="foreverDate4"
          v-on:put33="input33"
          v-on:put34="input34"
          v-on:put35="input35"
          v-on:put36="input36"
          v-on:put44="input44"
          v-on:put45="input45"
        ></card5>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="bottom">
      <!-- <div class="save1">
        <button ref="save" disabled>保存</button>
      </div>-->
      <div class="save2" @click="sendData2">
        <button ref="submit">保存并提交</button>
      </div>
    </div>
    <iosselect2 v-on:listen3="listenmore2" v-on:listen4="listenselect2" v-show="more2"></iosselect2>
  </div>
</template>

<script>
var remoteImageURL = "http://14.29.221.109:10250/upload";
import top from "../components/Top";
import file from "./Files";
import card1 from "./Card1";
import card2 from "./Card2";
import card3 from "./Card3";
import card4 from "./Card4";
import card5 from "./Card5";
import { bus } from "../utils/eventBus.js";
import iosselect5 from "@/components/Iosselect5";
import iosselect2 from "@/components/Iosselect4";

export default {
  data() {
    let self = this;
    return {
      bannerIndex: 0,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        on: {
          slideChangeTransitionEnd: function() {
            self.bannerIndex = this.activeIndex;
          }
        }
      },
      set: 1,
      name: "",
      remailNum: 0,
      subNo: "",
      taxType: "",
      proxy: 0,
      proxyy: 0,
      numIndex: 0,
      canSubmit: 2,
      doSub1: "",
      doSub2: "",
      doSub3: "",
      doSub4: "",
      doSub5: "",
      doSub: "",
      doSub6: "",
      doSub7: "",
      IsPonitOut: false,
      Taxaddress: "",
      Taxphone: "",
      Taxbank: "",
      Taxbanknumber: "",
      firstWarn: false,
      Properson: "",
      ProCIDnumber: "",
      Probank: "",
      Probanknumber: "",
      Proselected: "",
      ProFileImage1: "",
      ProFileImage2: "",
      ProFileImage3: "",
      secondWarn: false,
      comNo: "",
      tpath: "",
      thirdWarn: false,
      lp: 0,
      cnm: "",
      more: false,
      more2: false,
      options: " ",
      no: 0,
      yes: 1,
      twices: 0,
      index: "",
      spouse: "",
      item: 0,
      taxPerson: "",
      checkbox1: "",
      checkbox2: "",
      preferedbrand: "",
      nowbrand: "",
      square: "",
      phone: "",
      tax: "",
      fax: "",
      qq: "",
      email: "",
      zip: "",
      faxwl: "",
      zipwl: "",
      loc: 0,
      account1: "",
      account1Bank: "",
      account2: "",
      account2Bank: "",
      judgevalue: "",
      location: "",
      CIDnumber: "",
      busNumber: "",
      taxNumber: "",
      authFileImage11: "",
      authFileImage22: "",
      authFileImage33: "",
      authFileImage44: "",
      time1: "",
      time2: "",
      time3: "",
      time4: "",
      pubValue: "",
      remail: "",
      date: "",
      once: 0,
      forever1: 0,
      forever2: 0,
      forever3: 0,
      forever4: 0,
      forever: 0,
      contractyear: this.$store.state.year
    };
  },
  components: {
    top,
    card1,
    card2,
    card3,
    card4,
    card5,
    "file-msg": file,
    "ios-select5": iosselect5,
    iosselect2
  },
  created() {
    // bus.$on("check", () => {
    //   this.IsPonitOut = true;
    //   this.secondWarn = true;
    // }),
    bus.$on("select", () => {
      this.more = true;
    });
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
  watch: {
    checkbox1(curVal, oldVal) {
      if (curVal) {
        if (this.checkbox2) {
          this.preferedbrand =
            "√玉兰（墙纸类产品）√玉兰·兰居尚品（软装类产品）";
          this.cnm = "Y";
        } else {
          this.preferedbrand = "√玉兰（墙纸类产品）";
          this.cnm = "Y";
        }
      } else {
        if (this.checkbox2) {
          this.preferedbrand = "√玉兰·兰居尚品（软装类产品）";
          this.cnm = "Y";
        } else {
          this.preferedbrand = "";
          this.cnm = "N";
        }
      }
    },
    checkbox2(curVal, oldVal) {
      if (curVal) {
        if (this.checkbox1) {
          this.preferedbrand =
            "√玉兰（墙纸类产品）√玉兰·兰居尚品（软装类产品）";
          this.cnm = "Y";
        } else {
          this.preferedbrand = "√玉兰·兰居尚品（软装类产品）";
          this.cnm = "Y";
        }
      } else {
        if (this.checkbox1) {
          this.preferedbrand = "√玉兰（墙纸类产品）";
          this.cnm = "Y";
        } else {
          this.preferedbrand = "";
          this.cnm = "N";
        }
      }
    },
    tax(curVal, oldVal) {
      if (curVal == "不开发票") {
        if (this.pubValue == "个人") {
          this.item = 4;
        } else {
          this.item = 1;
        }
      } else if (curVal == "增值税专用发票") {
        this.item = 3;
      } else if (curVal == "增值税普通发票" || curVal == "电子普通发票") {
        if (this.pubValue == "个人") {
          this.item = 4;
        } else {
          this.item = 2;
        }
      }
    },
    pubValue(curVal, oldVal) {
      if (curVal == "个人") {
        this.item = 4;
      } else if (curVal == "有公司") {
        if (this.tax == "不开发票") {
          this.item = 1;
        } else if (this.tax == "增值税普通发票" || this.tax == "电子普通发票") {
          this.item = 2;
        } else if (this.tax == "增值税专用发票") {
          this.item = 3;
        }
      } else if (curVal == "无公司") {
        if (this.tax == "不开发票") {
          this.item = 1;
        } else if (this.tax == "增值税普通发票" || this.tax == "电子普通发票") {
          this.item = 2;
        } else if (this.tax == "增值税专用发票") {
          this.item = 3;
        }
      }
    }
  },
  mounted() {
    this.IsPonitOut = false;
    this.getdata();
  },
  // activated() {
  //   // bus.$on("check", () => {
  //   //   this.IsPonitOut = true;
  //   //   this.secondWarn = true;
  //   // }),
  //   this.IsPonitOut = false;
  //   bus.$on("select", () => {
  //     this.more = true;
  //   });
  //   // this.getdata()   //不能拿，一拿就空就gg
  //   this.getdata2();
  //   let url = "/infoState/getCustomerInfoCardState.do";
  //   let data = {
  //     cid: this.CID,
  //     year: this.$store.state.year
  //   };
  //   this.$http.post(url, data).then(res => {
  //     if (res.data.memo != null) {
  //       var alldata = res.data;
  //       this.customerInfo = alldata.customerInfo;
  //       if (
  //         res.data.customerInfo == "业务员审核中" ||
  //         res.data.customerInfo == "资料卡通过" ||
  //         res.data.customerInfo == "订单部审核中"
  //       ) {
  //         this.$refs.submit.style.background = "#c2c2c2";
  //         this.$refs.submit.disabled = true;
  //         const s = document.getElementsByTagName("input");
  //         for (let i = 0; i < s.length; i++) {
  //           s[i].disabled = true;
  //         }
  //       }
  //       // else{
  //       //   this.$refs.submit.style.background = "-webkit-linear-gradient(left,#BEDD81,#87CA81)";
  //       //   this.$refs.submit.disabled = false
  //       //   const s = document.getElementsByTagName("input")
  //       //   for(let i = 0; i < s.length; i++){
  //       //     s[i].disabled = false
  //       //   }
  //       // }
  //     }
  //   });
  //   let url2 = "/customerInfo/getYLcontract.do";
  //   let data2 = {
  //     ccid: this.CID,
  //     ccyear: this.$store.state.year
  //   };
  //   this.$http.post(url2, data2).then(res => {
  //     if (res.data.code == 0 && res.data.data != null) {
  //       this.Properson = res.data.data.name;
  //       this.ProCIDnumber = res.data.data.idcardNo;
  //       this.Probank = res.data.data.accountBank;
  //       this.Probanknumber = res.data.data.accout;
  //       this.Proselected = res.data.data.accountLocation;
  //       this.ProFileImage1 = remoteImageURL + res.data.data.idcardIamge1;
  //       this.ProFileImage2 = remoteImageURL + res.data.data.idcardIamge2;
  //       this.ProFileImage3 = remoteImageURL + res.data.data.authfileIamge;
  //       this.proxy = 1;
  //       this.doSub7 = "Y";
  //     } else if (res.data.code == 1 || res.data.data == null) {
  //       this.proxy = 0;
  //       console.log("不存在");
  //     }
  //   });
  // },
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
    foreverDate1(data) {
      if (data == true) {
        this.forever1 = 1;
        this.date = "";
      } else if (data == false) {
        this.forever1 = 0;
      }
    },
    foreverDate2(data) {
      if (data == true) {
        this.forever2 = 1;
        this.date = "";
      } else if (data == false) {
        this.forever2 = 0;
      }
    },
    foreverDate3(data) {
      if (data == true) {
        this.forever3 = 1;
        this.date = "";
      } else if (data == false) {
        this.forever3 = 0;
      }
    },
    foreverDate4(data) {
      if (data == true) {
        this.forever4 = 1;
        this.date = "";
      } else if (data == false) {
        this.forever4 = 0;
      }
    },
    foreverDate() {
      if (this.options == "公司-三证五证合一") {
        this.forever = this.forever2;
      }
      if (this.options == "公司-三证五证未合") {
        this.forever = this.forever1;
      }
      if (this.options == "个体户-有税务登记证") {
        this.forever = this.forever3;
      }
      if (this.options == "个体户-无税务登记证") {
        this.forever = this.forever4;
      }
      if (this.date == "") {
        this.forever = 1;
      }
    },
    proxxy(data) {
      this.proxyy = data;
    },
    getDate(data) {
      this.date = data;
    },
    noClick(data) {
      this.once = data;
    },
    listenmore2(data) {
      this.more2 = data;
    },
    listenselect2(data) {
      this.location = data;
    },
    selected1(data) {
      this.checkbox1 = data;
    },
    selected2(data) {
      this.checkbox2 = data;
    },
    input1(data) {
      this.nowbrand = data;
      this.a = "Y";
    },
    input2(data) {
      this.square = Number(data);
      this.b = "Y";
    },
    input3(data) {
      this.phone = data;
      this.c = "Y";
    },
    input4(data) {
      this.fax = data;
      this.d = "Y";
    },
    input5(data) {
      this.qq = data;
      this.e = "Y";
    },
    input6(data) {
      this.email = data;
      this.f = "Y";
    },
    input7(data) {
      this.zip = data;
      this.g = "Y";
    },
    input8(data) {
      this.faxwl = data;
      this.i = "Y";
    },
    input9(data) {
      this.zipwl = data;
      this.j = "Y";
    },
    input10(data) {
      this.account1 = data;
      this.l = "Y";
    },
    input11(data) {
      this.account2 = data;
      this.m = "Y";
    },
    input12(data) {
      this.account1Bank = data;
      this.n = "Y";
    },
    input13(data) {
      this.account2Bank = data;
      this.o = "Y";
    },
    input14(data) {
      this.CIDnumber = data;
      this.k = "Y";
    },
    input15(data) {
      this.CIDnumber = data;
      this.k = "Y";
    },
    input16(data) {
      this.CIDnumber = data;
      this.k = "Y";
    },
    input17(data) {
      this.CIDnumber = data;
      this.k = "Y";
    },
    input18(data) {
      this.CIDnumber = data;
      this.k = "Y";
    },
    input19(data) {
      this.remail = data;
      this.d = "Y";
    },
    input33(data) {
      this.busNumber = data;
      this.w = "Y";
    },
    input34(data) {
      this.busNumber = data;
      this.w = "Y";
    },
    input35(data) {
      this.busNumber = data;
      this.w = "Y";
    },
    input36(data) {
      this.busNumber = data;
      this.w = "Y";
    },
    input44(data) {
      this.taxNumber = data;
      this.x = "Y";
    },
    input45(data) {
      this.taxNumber = data;
      this.x = "Y";
    },
    getTime1(data) {
      this.time1 = data;
    },
    getTime2(data) {
      this.time2 = data;
    },
    getTime3(data) {
      this.time3 = data;
    },
    getTime4(data) {
      this.time4 = data;
    },
    getTime5(data) {
      this.time1 = data;
    },
    getTime6(data) {
      this.time2 = data;
    },
    getTime7(data) {
      this.time3 = data;
    },
    getTime8(data) {
      this.time1 = data;
    },
    getTime9(data) {
      this.time2 = data;
    },
    getTime10(data) {
      this.time1 = data;
    },
    getTime11(data) {
      this.time2 = data;
    },
    getTime12(data) {
      this.time3 = data;
    },
    getTime13(data) {
      this.time4 = data;
    },
    getTime14(data) {
      this.time1 = data;
    },
    getTime15(data) {
      this.time2 = data;
    },
    getTime16(data) {
      this.time3 = data;
    },
    allvalue1(data) {
      this.tax = data;
      if (this.tax == "增值税专用发票") {
        this.taxPerson = "是";
      } else {
        this.taxPerson = "否";
      }
    },
    allvalue2(data) {
      this.pubValue = data;
      if (this.pubValue == "有公司") {
        this.busType = "公司";
        this.judgevalue = "Y";
        this.location1 = this.location;
      }
      if (this.pubValue == "无公司") {
        this.busType = "公司";
        this.judgevalue = "N";
        this.location2 = this.location;
      }
      if (this.pubValue == "个人") {
        this.busType = "个体户";
        this.judgevalue = "N";
        this.location2 = this.location;
      }
    },
    newSpo(data) {
      this.spouse = data;
    },
    lplp(data) {
      this.lp = data;
    },
    spoValue(data) {
      this.spouse = data;
    },
    getFile1(data) {
      this.authFileImage1 = data;
    },
    getFile2(data) {
      this.authFileImage2 = data;
    },
    getFile3(data) {
      this.authFileImage3 = data;
    },
    getFile4(data) {
      this.authFileImage4 = data;
    },
    Cancel() {
      this.IsPonitOut = false;
      this.firstWarn = false;
      this.secondWarn = false;
    },
    // Cancel1() {
    //   this.IsPonitOut = false;
    //   this.firstWarn = false;
    //   this.secondWarn = false;
    //   bus.$emit("no",this.no);
    // },
    // Cancel2() {
    //   this.IsPonitOut = false;
    //   this.firstWarn = false;
    //   this.secondWarn = false;
    //   this.taxPerson = "是"
    //   bus.$emit("yes",this.yes);
    // },
    listenset(data) {
      this.more = data;
    },
    listenselect(data, data2) {
      this.selected = data;
      this.index = data2.toString();
      this.options = this.selected;
    },
    getdata() {
      let url = "/customerInfo/getCustomerInfo.do";
      let data = {
        CID: this.companyId
      };
      this.$http.post(url, data).then(res => {
        if (res.data.code == 0 || res.data.data != null) {
          var alldata = res.data.data;
          console.log(alldata);
          this.name = alldata.cname;
          var c = alldata.invoiceType;
          // this.tax = alldata.invoiceType;
          if (c == "不开发票") {
            this.item = 1;
          } else if (c == "增值税专用发票") {
            this.item = 3;
          } else {
            this.item = 2;
          }
          if (c == "电子普通发票") {
            this.remailNum = 1;
          } else {
            this.remailNum = 0;
          }
          this.subNo = alldata.hasPublicAccount;
          // this.comNo = alldata.busientType
          if (alldata.customerentitytypex == 1) {
            this.options = "公司-三证五证合一";
          }
          if (alldata.customerentitytypex == 2) {
            this.options = "公司-三证五证未合";
          }
          if (alldata.customerentitytypex == 3) {
            this.options = "个体户-有税务登记证";
          }
          if (alldata.customerentitytypex == 4) {
            this.options = "个体户-无税务登记证";
          }
          if (alldata.customerentitytypex == 5) {
            this.options = "个人";
          }
          if (alldata.preferedbrand != null) {
            var newband = alldata.preferedbrand.split("");
            if (newband.indexOf("墙") > -1) {
              this.checkbox1 = true;
            }
            if (newband.indexOf("软") > -1) {
              this.checkbox2 = true;
            }
          }
          this.phone = alldata.juridicPersonHandset;
          this.nowbrand = alldata.currentProduct;
          this.square = alldata.shopArea;
          this.remail = alldata.recipeTargetMb;
          this.fax = alldata.xFax;
          this.qq = alldata.qq;
          this.email = alldata.xEmail;
          this.zip = alldata.xZipCode;
          this.faxwl = alldata.faxWl;
          this.zipwl = alldata.zipCodeWl;
          this.account1 = alldata.account1;
          this.account2 = alldata.account2;
          this.account1Bank = alldata.account1Bank;
          this.account2Bank = alldata.account2Bank;
          this.CIDnumber = alldata.file1IdcardNo;
          this.busNumber = alldata.file2BusinesslicenseNo;
          this.taxNumber = alldata.file4GtqcNo;
          this.index = alldata.customerentitytypex;
          this.authFileImage1 = alldata.file1Idcard;
          this.authFileImage2 = alldata.file5IdcardBg;
          this.authFileImage3 = alldata.file2Businesslicense;
          this.authFileImage4 = alldata.file4Gtqc;
          this.Taxaddress = alldata.invAddress;
          this.Taxphone = alldata.invTelephone;
          this.Taxbank = alldata.invBankname;
          this.Taxbanknumber = alldata.invBanmaccount;
          this.date = alldata.file2BusinesslicenseEnd;
          this.contractyear = alldata.contractyear;
          this.$refs.top.setTitle("客户资料卡-" + alldata.contractyear);
          if (alldata.state == "ONCREATE") {
            this.$refs.submit.style.background = "#c2c2c2";
            this.$refs.submit.disabled = true;
            const s = document.getElementsByTagName("input");
            for (let i = 0; i < s.length; i++) {
              s[i].disabled = true;
            }
          }

          let url = "/infoState/getCustomerInfoCardState.do";
          let data = {
            cid: this.companyId,
            year: alldata.contractyear
          };
          this.$http.post(url, data).then(res2 => {
            if (res2.data.memo != null) {
              var alldata2 = res2.data;
              this.customerInfo = alldata2.customerInfo;
              if (alldata.state == "ONCREATE")
                this.customerInfo = "资料卡确认中";
              if (
                res2.data.customerInfo == "业务员审核中" ||
                res2.data.customerInfo == "资料卡通过" ||
                res2.data.customerInfo == "订单部审核中"
              ) {
                this.$refs.submit.style.background = "#c2c2c2";
                this.$refs.submit.disabled = true;
                const s = document.getElementsByTagName("input");
                for (let i = 0; i < s.length; i++) {
                  s[i].disabled = true;
                }
              }
            }
          });
          let url1 = "/customerInfo/getYLcontract.do";
          let data1 = {
            ccid: this.companyId,
            ccyear: alldata.contractyear
          };
          this.$http.post(url1, data1).then(res3 => {
            if (res3.data.code == 0 && res3.data.data != null) {
              this.Properson = res3.data.data.name;
              this.ProCIDnumber = res3.data.data.idcardNo;
              this.Probank = res3.data.data.accountBank;
              this.Probanknumber = res3.data.data.accout;
              this.Proselected = res3.data.data.accountLocation;
              this.ProFileImage1 = remoteImageURL + res3.data.data.idcardIamge1;
              this.ProFileImage2 = remoteImageURL + res3.data.data.idcardIamge2;
              this.ProFileImage3 =
                remoteImageURL + res3.data.data.authfileIamge;
              this.proxy = 1;
              this.doSub7 = "Y";
            } else if (res3.data.code == 1 || res3.data.data == null) {
              this.proxy = 0;
              console.log("不存在");
            }
          });
        } else if (res.data.code === 1 || res.data.data == null) {
          console.log("不存在");
        }
      });
    },
    // getdata2() {
    //   let url = "/customerInfo/getCustomerInfo.do";
    //   let data = {
    //     CID: this.CID
    //   };
    //   this.$http.post(url, data).then(res => {
    //     if (res.data.code == 0 || res.data.data != null) {
    //       var alldata = res.data.data;
    //       this.Taxaddress = alldata.invAddress;
    //       this.Taxphone = alldata.invTelephone;
    //       this.Taxbank = alldata.invBankname;
    //       this.Taxbanknumber = alldata.invBanmaccount;
    //       this.date = alldata.file2BusinesslicenseEnd;
    //       // this.preferedbrand = alldata.preferedbrand;
    //       // if(this.preferedbrand == "" || this.preferedbrand == null){
    //       //   this.cnm = "N"
    //       // }else{
    //       //   this.cnm = "Y"
    //       // }
    //     } else if (res.data.code === 1 || res.data.data == null) {
    //       console.log("不存在");
    //     }
    //   });
    // },
    changeSubmit() {
      if (this.nowbrand == null || this.nowbrand == "") {
        this.a = "N";
      } else {
        this.a = "Y";
      }
      // if(this.tax == null || this.tax == ""){
      //   this.p = "N"
      // }else{
      //   this.p = "Y"
      // }
      if (this.square == null || this.square == "") {
        this.b = "N";
      } else {
        this.b = "Y";
      }
      if (this.phone == null || this.phone == "") {
        this.c = "N";
      } else {
        this.c = "Y";
      }
      if (this.fax == null || this.fax == "") {
        this.e = "N";
      } else {
        this.e = "Y";
      }
      if (this.qq == null || this.qq == "") {
        this.f = "N";
      } else {
        this.f = "Y";
      }
      if (this.email == null || this.email == "") {
        this.g = "N";
      } else {
        this.g = "Y";
      }
      if (this.zip == null || this.zip == "") {
        this.h = "N";
      } else {
        this.h = "Y";
      }
      if (this.faxwl == null || this.faxwl == "") {
        this.i = "N";
      } else {
        this.i = "Y";
      }
      if (this.zipwl == null || this.zipwl == "") {
        this.j = "N";
      } else {
        this.j = "Y";
      }
      if (this.CIDnumber == null || this.CIDnumber == "") {
        this.k = "N";
      } else {
        this.k = "Y";
      }
      if (this.busNumber == null || this.busNumber == "") {
        this.w = "N";
      } else {
        this.w = "Y";
      }
      if (this.taxNumber == null || this.taxNumber == "") {
        this.x = "N";
      } else {
        this.x = "Y";
      }
      if (this.remailNum == 1) {
        if (this.remail == null || this.remail == "") {
          this.d = "N";
        } else {
          this.d = "Y";
        }
      } else {
        this.d = "Y";
      }
      if (this.tax == "电子普通发票") {
        if (this.remail == null || this.remail == "") {
          this.d = "N";
        } else {
          this.d = "Y";
        }
      } else {
        this.d = "Y";
      }
      if (this.tax == "增值税专用发票") {
        if (
          this.Taxaddress != null &&
          this.Taxphone != null &&
          this.Taxbank != null &&
          this.Taxbanknumber != null
        ) {
          this.doSub6 = "Y";
        } else {
          this.doSub6 = "N";
        }
      } else {
        this.doSub6 = "Y";
      }
      if (this.item == 3) {
        if (
          this.Taxaddress != null &&
          this.Taxphone != null &&
          this.Taxbank != null &&
          this.Taxbanknumber != null
        ) {
          this.doSub6 = "Y";
        } else {
          this.doSub6 = "N";
        }
      } else {
        this.doSub6 = "Y";
      }
      if (this.subNo == "N") {
        if (this.account2 == null || this.account2 == "") {
          this.m = "N";
        } else {
          this.m = "Y";
        }
        if (this.account2Bank == null || this.account2Bank == "") {
          this.o = "N";
        } else {
          this.o = "Y";
        }
      }
      if (this.subNo == "Y") {
        if (this.account1 == null || this.account1 == "") {
          this.l = "N";
        } else {
          this.l = "Y";
        }
        if (this.account1Bank == null || this.account1Bank == "") {
          this.n = "N";
        } else {
          this.n = "Y";
        }
      }
      // if(this.subNo == "X"){

      // }
      if (this.pubValue == "无公司" || this.pubValue == "个人") {
        if (this.account2 == null || this.account2 == "") {
          this.m = "N";
        } else {
          this.m = "Y";
        }
        if (this.account2Bank == null || this.account2Bank == "") {
          this.o = "N";
        } else {
          this.o = "Y";
        }
      }
      // if(this.proxy == 0){
      //   if(this.lp == 1){
      //     this.doSub7 = "N"
      //   }else if(this.lp == 0){
      //     this.doSub7 = "Y"
      //   }
      //   if(this.subNo == "N" && this.comNo == "公司"){
      //   if(this.Properson != null && this.ProCIDnumber != null && this.Probank != null && this.Probanknumber != null && this.Proselected != null && this.ProFileImage1 != null && this.ProFileImage2 != null && this.ProFileImage3 != null){
      //   this.doSub7 = "Y"
      // }else{
      //   this.doSub7 = "N"
      // }
      //   }else{
      //     this.doSub7 = "Y"
      //   }
      // }
      if (this.pubValue == "有公司") {
        if (this.account1 == null || this.account1 == "") {
          this.l = "N";
        } else {
          this.l = "Y";
        }
        if (this.account1Bank == null || this.account1Bank == "") {
          this.n = "N";
        } else {
          this.n = "Y";
        }
      }
      if (
        this.a == "Y" &&
        this.b == "Y" &&
        this.c == "Y" &&
        this.d == "Y" &&
        this.cnm == "Y"
      ) {
        this.doSub1 = "Y";
      } else {
        this.doSub1 = "N";
      }
      // if(this.e == "Y" && this.f == "Y" && this.g == "Y" && this.h == "Y"){
      //   this.doSub2 = "Y"
      // }else{
      //   this.doSub2 = "N"
      // }
      // if(this.i == "Y" && this.j == "Y"){
      //   this.doSub3 = "Y"
      // }else{
      //   this.doSub3 = "N"
      // }                         //暂时2，3页不需要

      // if(this.k == "Y"){
      //   this.doSub5 = "Y"
      // }else{
      //   this.doSub5 = "N"
      // }                              // 先注释
      if (this.options == "公司-三证五证合一") {
        this.index = 1;
        if (
          this.authFileImage1 != null &&
          this.authFileImage2 != null &&
          this.authFileImage3 != null
        ) {
          this.r = "Y";
        } else {
          this.r = "N";
        }
        if (this.k == "Y" && this.r == "Y" && this.w == "Y") {
          this.doSub5 = "Y";
        } else {
          this.doSub5 = "N";
        }
      }
      if (this.options == "公司-三证五证未合") {
        this.index = 2;
        if (
          this.authFileImage1 != null &&
          this.authFileImage2 != null &&
          this.authFileImage3 != null &&
          this.authFileImage4 != null
        ) {
          this.s = "Y";
        } else {
          this.s = "N";
        }
        if (this.k == "Y" && this.s == "Y" && this.w == "Y" && this.x == "Y") {
          this.doSub5 = "Y";
        } else {
          this.doSub5 = "N";
        }
      }
      if (this.options == "个体户-有税务登记证") {
        this.index = 3;
        if (
          this.authFileImage1 != null &&
          this.authFileImage2 != null &&
          this.authFileImage3 != null &&
          this.authFileImage4 != null
        ) {
          this.t = "Y";
        } else {
          this.t = "N";
        }
        if (this.k == "Y" && this.t == "Y" && this.w == "Y" && this.x == "Y") {
          this.doSub5 = "Y";
        } else {
          this.doSub5 = "N";
        }
      }
      if (this.options == "个体户-无税务登记证") {
        this.index = 4;
        if (
          this.authFileImage1 != null &&
          this.authFileImage2 != null &&
          this.authFileImage3 != null
        ) {
          this.u = "Y";
        } else {
          this.u = "N";
        }
        if (this.k == "Y" && this.u == "Y" && this.w == "Y") {
          this.doSub5 = "Y";
        } else {
          this.doSub5 = "N";
        }
      }
      if (this.options == "个人") {
        this.index = 5;
        if (this.authFileImage1 != null && this.authFileImage2 != null) {
          this.v = "Y";
        } else {
          this.v = "N";
        }
        if (this.k == "Y" && this.v == "Y") {
          this.doSub5 = "Y";
        } else {
          this.doSub5 = "N";
        }
      }
      if (this.subNo == "Y") {
        if (this.l == "Y" && this.n == "Y") {
          this.doSub4 = "Y";
        } else {
          this.doSub4 = "N";
        }
      }
      if (this.subNo == "N") {
        if (this.m == "Y" && this.o == "Y") {
          this.doSub4 = "Y";
        } else {
          this.doSub4 = "N";
        }
      }
      if (this.pubValue == "无公司" || this.pubValue == "个人") {
        if (this.m == "Y" && this.o == "Y") {
          this.doSub4 = "Y";
        } else {
          this.doSub4 = "N";
        }
      }
      if (this.pubValue == "有公司") {
        if (this.l == "Y" && this.n == "Y") {
          this.doSub4 = "Y";
        } else {
          this.doSub4 = "N";
        }
      }
    },
    sendData1() {
      this.foreverDate();
      this.changeSubmit();
      if (this.doSub1 == "Y" && this.doSub5 == "Y" && this.doSub4 == "Y") {
        this.doSub = "Y";
      } else {
        this.doSub = "N";
      }
      // this.doSub = "Y"
      switch (this.doSub) {
        case "Y":
          if (this.pubValue == "有公司") {
            this.location1 = this.location;
          }
          if (this.pubValue == "无公司") {
            this.location2 = this.location;
          }
          if (this.pubValue == "个人") {
            this.location2 = this.location;
          }
          let url1 = "/customerInfo/updateCustomerInfo.do";
          let data1 = {
            cid: this.companyId,
            contractyear: this.contractyear,
            preferedbrand: this.preferedbrand,
            currentProduct: this.nowbrand,
            invoiceType: this.tax,
            isGeneraltaxpayer: this.taxPerson,
            shopArea: this.square,
            juridicPersonHandset: this.phone,
            recipeTargetMb: this.remail,
            qq: this.qq,
            xFax: this.fax,
            xEmail: this.email,
            xZipCode: this.zip,
            faxWl: this.faxwl,
            zipCodeWl: this.zipwl,
            busientType: this.busType,
            hasPublicAccount: this.judgevalue,
            privateAccountAuthed: this.spouse,
            account1Bank: this.account1Bank,
            account1: this.account1,
            account1Location: this.location1,
            account2Bank: this.account2Bank,
            account2: this.account2,
            account2Location: this.location2,
            customerentitytypex: this.index,
            file1Idcard: this.authFileImage1,
            file1Op: this.time1,
            file1IdcardNo: this.CIDnumber,
            file2Businesslicense: this.authFileImage3,
            file2BusinesslicenseNo: this.busNumber,
            file4GtqcNo: this.taxNumber,
            file2BusinesslicenseEnd: this.date,
            file2BusinesslicenseNoend: this.forever,
            file2Op: this.time3,
            file4Gtqc: this.authFileImage4,
            file4Op: this.time4,
            file5IdcardBg: this.authFileImage2,
            file5Op: this.time2
          };
          this.$http.post(url1, data1).then(res => {
            alert("保存成功");
          });
          break;
        case "N":
          alert("资料填写不完整");
          break;
      }
    },
    trueSend() {
      if (this.pubValue == "有公司") {
        this.location1 = this.location;
      }
      if (this.pubValue == "无公司") {
        this.location2 = this.location;
      }
      if (this.pubValue == "个人") {
        this.location2 = this.location;
      }
      let url1 = "/customerInfo/updateCustomerInfo.do";
      let data1 = {
        cid: this.companyId,
        contractyear: this.contractyear,
        preferedbrand: this.preferedbrand,
        currentProduct: this.nowbrand,
        invoiceType: this.tax,
        isGeneraltaxpayer: this.taxPerson,
        shopArea: this.square,
        juridicPersonHandset: this.phone,
        recipeTargetMb: this.remail,
        qq: this.qq,
        xFax: this.fax,
        xEmail: this.email,
        xZipCode: this.zip,
        faxWl: this.faxwl,
        zipCodeWl: this.zipwl,
        busientType: this.busType,
        hasPublicAccount: this.judgevalue,
        privateAccountAuthed: this.spouse,
        account1Bank: this.account1Bank,
        account1: this.account1,
        account1Location: this.location1,
        account2Bank: this.account2Bank,
        account2: this.account2,
        account2Location: this.location2,
        customerentitytypex: this.index,
        file1Idcard: this.authFileImage1,
        file1Op: this.time1,
        file1IdcardNo: this.CIDnumber,
        file2Businesslicense: this.authFileImage3,
        file2BusinesslicenseEnd: this.date,
        file2BusinesslicenseNoend: this.forever,
        file2BusinesslicenseNo: this.busNumber,
        file4GtqcNo: this.taxNumber,
        file2Op: this.time3,
        file4Gtqc: this.authFileImage4,
        file4Op: this.time4,
        file5IdcardBg: this.authFileImage2,
        file5Op: this.time2
      };

      this.$http.post(url1, data1).then(function(res) {});
      let url2 = "/infoState/bussinessCheckCustomerInfoCard.do";
      let nowTime = this.initTime(new Date());
      // let nowTime = new Date().getFullYear() + "-" +
      //               ''+new Date().getMonth()+1 + "-" +
      //               ''+new Date().getDate() + " " +
      //               ''+new Date().getHours() + ":" +
      //               ''+new Date().getMinutes() + " "
      let data2 = {
        cid: this.companyId,
        state: "BUSINESSCHECKING",
        memo: nowTime + this.name + "提交;"
      };
      this.$http.post(url2, data2).then(res => {});
      this.$router.push({
        path: "/success1"
      });
    },
    sendData2() {
      if (this.pubValue == "有公司") {
        this.location1 = this.location;
        if (this.location1 == "" || this.location1 == null) {
          this.loc = 0;
        } else {
          this.loc = 1;
        }
      }
      if (this.pubValue == "无公司") {
        this.location2 = this.location;
        if (this.location2 == "" || this.location2 == null) {
          this.loc = 0;
        } else {
          this.loc = 1;
        }
      }
      if (this.pubValue == "个人") {
        this.location2 = this.location;
        if (this.location2 == "" || this.location2 == null) {
          this.loc = 0;
        } else {
          this.loc = 1;
        }
      }
      this.foreverDate();
      this.changeSubmit();
      if (this.proxy == 0) {
        if (this.lp == 1) {
          this.doSub7 = "N";
        }
        if (this.lp == 0) {
          this.doSub7 = "Y";
        }
      }
      if (
        this.loc == 1 &&
        this.doSub1 == "Y" &&
        this.doSub5 == "Y" &&
        this.doSub4 == "Y" &&
        this.doSub6 == "Y" &&
        this.doSub7 == "Y"
      ) {
        this.doSub = "Y";
      } else {
        this.doSub = "N";
      }
      switch (this.doSub) {
        case "Y":
          if (this.once == 1) {
            this.IsPonitOut = true;
            this.firstWarn = true;
          }
          if (this.once == 2) {
            alert("您已保存并提交过一次啦！");
          }
          break;
        case "N":
          alert("*为必填项，请务必填写才能提交");
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.swiper {
  height: 100vh;
  background: #efefef;
}
.swiper-container {
  width: 100%;
  height: 455px;
  background: #efefef;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.bottom {
  height: 76px;
  width: 100%;
  background: #efefef;
}
.save2 button {
  box-sizing: border-box;
  width: 360px;
  height: 43px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
  margin: 13px auto 11px 1px;
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
.point-out span {
  text-decoration: underline;
}
.point-out > p {
  text-align: center;
  position: relative;
  height: 139px;
  width: 198px;
  box-sizing: border-box;
  margin: 0 auto;
  top: 30%;
  left: 50%;
  margin-left: -99px;
  font-size: 16px;
  color: #7d7d7d;
}
.point-out .surewarn {
  top: 25%;
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
</style>