<template>
  <div class="bank">
    <top :top="set"></top>
    <span class="search-button" @click="getList()">查询</span>
    <div class="search">
      <ul class="ulhead" id="ulhead">
        <li class="licenter" @click="showks = true">
          <input class="time time-ks" type="text" v-model="ksDataSet" disabled />
        </li>
        <li>
          <span>至</span>
        </li>
        <li class="liright" @click="showjs = true">
          <input class="time time-js" type="text" v-model="jsDataSet" disabled />
        </li>
        <li class="licenter" @click="showType = true">
          <input class="time time-ks" type="text" v-model="myType" disabled />
        </li>
      </ul>
    </div>
    <div class="all-bank">
      <div
        class="single-bank"
        @click="checkDetails(index)"
        v-for="(singleBank,index) in allLists"
        :key="index"
      >
        <div class="single-title">
          <span class="single-title-left">凭证单号：{{singleBank.id}}</span>
          <span class="single-title-right">{{singleBank.state}}</span>
        </div>
        <table>
          <tr>
            <td>凭证时间：</td>
            <td>{{singleBank.createTs}}</td>
          </tr>
          <tr>
            <td>收款银行：</td>
            <td>{{singleBank.yulanBank}}</td>
          </tr>
          <tr>
            <td>付款(公司/人)：</td>
            <td>{{singleBank.payerName}}</td>
          </tr>
          <tr>
            <td>付款账号：</td>
            <td>{{singleBank.payerAccount}}</td>
          </tr>
          <tr>
            <td>汇款时间：</td>
            <td>{{singleBank.payDate}}</td>
          </tr>
          <tr>
            <td>汇款金额：</td>
            <td>{{singleBank.payAmount}}</td>
          </tr>
        </table>
        <span
          v-show="singleBank.state === '退回'"
          class="single-details"
          @click.stop="editBank(index)"
        >修改凭证</span>
      </div>
    </div>
    <div class="createBank" @click="toCreateBank">+</div>
    <!--开始日期选择-->
    <van-popup v-model="showks" position="bottom">
      <van-datetime-picker
        v-model="ksData"
        type="date"
        title="开始时间"
        @confirm="confirmTimeks"
        @cancel="cancelTimeks"
      />
    </van-popup>
    <van-popup v-model="showjs" position="bottom">
      <van-datetime-picker
        class="reset"
        v-model="jsData"
        type="date"
        title="结束时间"
        @confirm="confirmTimejs"
        @cancel="cancelTimejs"
      />
    </van-popup>
    <!--状态选择-->
    <van-popup v-model="showType" position="bottom">
      <van-picker
        show-toolbar
        title="订单状态"
        :columns="orderType"
        @confirm="onConfirmType"
        @cancel="onCancelType"
      />
    </van-popup>
    <!--底部分页-->
    <div class="fy-contain">
      <van-pagination
        class="fy-bottom"
        v-model="currentPage"
        :page-count="totalPage"
        :items-per-page="itemsPerPage"
        :total-items="totalLists"
        mode="simple"
        @change="changePage"
      />
    </div>
    <van-loading class="loading" type="spinner" v-if="loading" color="black" />
  </div>
</template>

<script>
import axios from "axios";
import top from "../../../components/Top";
import { getCustomerInfo } from "@/api/orderListASP";

import {
  DatetimePicker,
  Popup,
  Picker,
  Pagination,
  Toast,
  Loading
} from "vant";

export default {
  name: "bank",
  data() {
    return {
      set: 80,
      ksData: "",
      ksDataSet: "", //  开始时间
      showks: false, //开始时间组件显示
      showjs: false, //结束时间组件显示
      jsData: "",
      jsDataSet: "", //结束时间
      myType: "全部状态", //当前状态
      myTypeCode: "",
      showType: false, //状态选择显示
      orderType: ["全部状态", "已提交", "已处理", "退回", "作废"],
      //当前页数
      currentPage: 1,
      //总记录数
      totalLists: 0,
      //每页记录数
      itemsPerPage: 10,
      //总页数
      totalPage: 0,
      allLists: [],
      loading: false,
      chargeData:[]
    };
  },
  components: {
    top,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Pagination.name]: Pagination,
    [Toast.name]: Toast,
    [Loading.name]: Loading
  },
  methods: {
    chargeQuery() {
      var data = {
        cid: this.$store.getters.getCId,
        companyId: this.$store.getters.getCMId
      };
      getCustomerInfo(data).then(res => {
        this.chargeData = res.data;
      });
    },
    //开始时间选择
    confirmTimeks(value) {
      this.ksSet2(this.ksData);
      this.showks = false;
    },
    cancelTimeks() {
      this.showks = false;
    },
    //结束时间选择
    confirmTimejs(value) {
      this.jsSet(this.jsData);
      this.showjs = false;
    },
    cancelTimejs() {
      this.showjs = false;
    },
    //开始时间设置
    ksSet2(time) {
      let current_date = time.getDate();
      let current_month = time.getMonth() + 1;
      let current_year = time.getFullYear();
      this.ksDataSet = current_year + "-" + current_month + "-" + current_date;
      this.ksData = time;
    },
    //初始化结束时间
    jsSet(time) {
      let current_date = time.getDate();
      let current_month = time.getMonth() + 1;
      let current_year = time.getFullYear();
      this.jsDataSet = current_year + "-" + current_month + "-" + current_date;
      this.jsData = time;
    },
    //初始化开始时间
    ksSet(time) {
      this.ksDataSet = "起始时间";
      this.ksData = time;
    },
    //状态选择
    onConfirmType(index) {
      this.myType = index;
      if (this.myType == "全部状态") {
        this.myTypeCode = "";
      } else if (this.myType == "已提交") {
        this.myTypeCode = "SUBMITED";
      } else if (this.myType == "已处理") {
        this.myTypeCode = "PROCESED";
      } else if (this.myType == "退回") {
        this.myTypeCode = "SENDBACK";
      } else if (this.myType == "作废") {
        this.myTypeCode = "CANCELED";
      }
      // this.orderSearch()
      this.showType = false;
    },
    onCancelType() {
      this.showType = false;
    },
    //  获取列表
    getList() {
      this.allLists = [];
      this.loading = true;
      let url = this.capitalUrl + "/PaymentBill/getPayBills.do";
      let ksTime;
      let jsTime;
      if (this.ksDataSet === "起始时间") {
        ksTime = "";
      } else {
        ksTime = this.ksDataSet + " 00:00:00";
      }
      if (this.jsDataSet === "结束时间") {
        jsTime = "";
      } else {
        jsTime = this.jsDataSet + " 23:59:59";
      }
      // this.ksDataSet === "起始时间" ? '':this.ksDataSet + " 00:00:00";
      // this.jsDataSet === "结束时间" ? '':this.jsDataSet + " 23:59:59";
      let data = {
        cid: this.$store.getters.getCId, //公司id
        state: this.myTypeCode, //状态状态(SUBMITED（已提交）,PROCESED（已处理）,SENDBACK（退回）,CANCELED（作废）)
        beginTime: ksTime, //起始时间
        finishTime: jsTime, //结束时间
        limit: 8, //限制数
        page: this.currentPage //页数
      };
      axios.post(url, data).then(res => {
        this.loading = false;
        this.totalLists = res.data.count;
        //获取总页数
        this.totalPage = parseInt(res.data.count / 10) + 1;
        this.allLists = res.data.data;
        if (this.allLists.length == 0) {
          Toast({
            message: "暂无汇款凭证",
            duration: 2000
          });
        } else {
          for (let i = 0; i < this.allLists.length; i++) {
            this.allLists[i].payDate = this.exchangeTime(
              this.allLists[i].payDate
            );
            this.allLists[i].createTs = this.exchangeTime(
              this.allLists[i].createTs
            );
            this.allLists[i].submitTs = this.exchangeTime(
              this.allLists[i].submitTs
            );
            this.allLists[i].erpProcessTs = this.exchangeTime(
              this.allLists[i].erpProcessTs
            );
            switch (this.allLists[i].state) {
              case "SUBMITED":
                this.allLists[i].state = "已提交";
                continue;
              case "PROCESED":
                this.allLists[i].state = "已处理";
                continue;
              case "SENDBACK":
                this.allLists[i].state = "退回";
                continue;
              case "CANCELED":
                this.allLists[i].state = "作废";
                continue;
            }
          }
        }
      });
    },
    // 时间戳转换为固定格式时间
    exchangeTime(time) {
      var date = new Date(time);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      return Y + M + D;
    },
    changePage() {
      this.getList();
    },
    //  查看详情
    checkDetails(index) {
      this.$router.push({
        name: "createbank",
        params: {
          id: this.allLists[index].id, //流水号
          state: this.allLists[index].state, //流水号
          data: this.allLists[index]
        }
      });
    },
    //  修改凭证
    editBank(index) {
      this.$router.push({
        name: "bankdetails",
        params: {
          id: this.allLists[index].id, //流水号
          state: this.allLists[index].state, //流水号
          data: this.allLists[index]
        }
      });
    },
    //  新建凭证
    toCreateBank() {
      this.$router.push({
        name: "bankdetails",
        params: {
          id: "", //流水号
          state: "",
          data: {
            id: "提交后自动生成", //流水号
            cid: this.$store.getters.getCId, //公司id
            cname: this.chargeData.CUSTOMER_NAME, //客户名
            // "createTs": 1562816972000,//创建时间
            yulanBank: "", //汇款银行
            payerName: "", //汇款人名
            payAmount: "", //汇款金额
            payDate: "", //汇款日期
            imgFileName: "", //图片名
            // "submitTs": 1562816911000,//提交时间
            memo: "", //备注
            // "cancelTs": null,//作废日期
            // "sendbackTs": null,//退回日期
            // "sendbackReason": null,//退回理由
            // "erpProcessTs": null,//处理日期
            // "erpProcessOp": null,//处理人
            state: "", //状态(SUBMITED（已提交）,PROCESED（已处理）,SENDBACK（退回）,CANCELED（作废）)
            payerAccount: "", //汇款人银行账号
            imgUrl: "" //图片相对路径
          }
        }
      });
    }
  },
  created() {
    let time = new Date();
    this.jsSet(time);
    this.ksSet(time);
    this.getList();
    this.chargeQuery();
  }
};
</script>

<style scoped>
.bank {
  background-color: rgb(239, 239, 239);
  height: 100vh;
  position: relative;
  overflow: scroll;
}
.search-button {
  position: fixed;
  top: 13px;
  right: 15px;
  color: #a0cb8d;
  font-size: 13px;
  padding: 5px 20px;
  border-radius: 15px;
  background: white;
  z-index: 99;
}

#ulhead {
  position: fixed;
  top: 50px;
  line-height: 37px;
  width: 100%;
  height: 37px;
  /*font-size: 15px;*/
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  font-size: 15px;
  z-index: 999;
}

ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

li {
  display: inline-block;
}

input {
  background-color: hsla(0, 0%, 100%, 0.3);
  border-radius: 3.467vw;
  outline: none;
  border: none;
  text-decoration: none;
  height: 25px;
  line-height: 25px;
}

.time {
  width: 90px;
  height: 20px;
  line-height: 20px;
  background-color: hsl(0, 0%, 100%);
  font-size: 13px;
  border: none;
  padding-left: 15px;
  text-align: left;
  background-image: url("../../assetsorder/time-zk.png");
  background-repeat: no-repeat;
  background-position-x: 80px;
  background-position-y: 1vw;
  background-size: 15px;
}
.all-bank {
  margin: 110px 10px 80px;
}
.all-bank td,
.all-bank th {
  text-align: left;
}
.single-bank {
  background: white;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  position: relative;
}

.single-title {
  border-bottom: 1px solid #a0cb8d;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
}
.single-title-right {
  float: right;
  color: #ff8259;
}
.single-title-left {
  float: left;
}
.createBank {
  position: fixed;
  bottom: 70px;
  right: 30px;
  width: 55px;
  height: 55px;
  line-height: 55px;
  border-radius: 50%;
  color: white;
  background: #89cb81;
  font-size: 40px;
}
.single-details {
  position: absolute;
  bottom: 15px;
  right: 10px;
  background: #89cb81;
  color: white;
  padding: 5px 15px;
  border-radius: 15px;
}
.fy-contain {
  width: 100%;
  height: 50px;
  background: white;
  position: fixed;
  bottom: 0px;
  border-top: 1px solid #e8e8e8;
}

.fy-bottom {
  background: #f8f8f8;
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 0;
  color: white !important;
}

.fy-bottom .van-pagination__item {
  color: #89cb81;
}
</style>
