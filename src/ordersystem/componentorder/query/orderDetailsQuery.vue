<template>
  <div class="bank">
    <top :top="set"></top>
    <span class="search-button" @click="query()">查询</span>
    <div class="search">
      <ul class="ulhead" id="ulhead">
        <div>客户名称：{{baseData.CUSTOMER_NAME}}</div>
        <div>
          汇总金额：{{baseData.MONEYSUM}}元
          <li class="licenter" style="margin-left:20px" @click="showType_1 = true">
            <input class="time" type="text" v-model="myStatus" disabled />
          </li>
        </div>
      </ul>
    </div>

    <div class="all-bank">
      <!-- 订单列表 -->
      <div class="single-bank" v-for="(singleBank,index) in tableData" :key="index">
        <div class="single-title">
          <span class="single-title-left">订单号：{{singleBank.ORDER_NO}}</span>
          <span class="single-title-right">{{singleBank.STATUS_ID|transType}}</span>
        </div>
        <table>
          <tr>
            <td style="width:25%">创建时间:</td>
            <td>{{singleBank.DATE_CRE|datatrans}}</td>
          </tr>
          <!-- <tr>
            <td>客户:</td>
            <td>{{singleBank.CUSTOMER_NAME}}</td>
          </tr>
          <tr>
            <td>联系人:</td>
            <td>{{singleBank.LINKPERSON}}</td>
          </tr>
          <tr>
            <td>联系电话:</td>
            <td>{{singleBank.TELEPHONE}}</td>
          </tr>-->
          <tr>
            <td>订单金额:</td>
            <td>{{singleBank.ALL_SPEND}}元</td>
          </tr>
        </table>
        <span class="order-state" @click="toOrderDetails(singleBank)">查看订单详情</span>
        <span class="order-state_1" @click="customer_info(singleBank)">查看客户详情</span>
      </div>
    </div>
    <!--客户详情-->
    <van-popup v-model="showDetail" position="bottom" closeable :style="{ height: '50%' }">
      <van-panel title="客户详情">
        <div style="width:90%;margin:0 auto">
          <hr />
          <table style="width:100%;height:180px" class="table_2">
            <tr>
              <td style="width:30%;text-align:left">客户名称:</td>
              <td>{{customerInfo.CUSTOMER_NAME}}</td>
            </tr>
            <tr>
              <td style="width:30%;text-align:left">联系人：</td>
              <td>{{customerInfo.LINKPERSON}}</td>
            </tr>
            <tr>
              <td style="width:30%;text-align:left">电话：</td>
              <td>{{customerInfo.TELEPHONE}}</td>
            </tr>
            <tr>
              <td style="width:30%;text-align:left">地址：</td>
              <td>{{customerInfo.POST_ADDRESS}}</td>
            </tr>
            <tr>
              <td style="width:30%;text-align:left">优惠券余额：</td>
              <td v-for="item of couponData" :key="item.index">当前余额: {{item.rebateMoneyOver}}</td>
            </tr>
            <tr>
              <td style="width:30%;text-align:left">客户余额：</td>
              <td>{{moneySituation}}</td>
            </tr>
          </table>
        </div>
      </van-panel>
    </van-popup>
    <!--状态搜索-->
    <van-popup v-model="showType_1" position="bottom">
      <van-picker
        show-toolbar
        title="请选择状态"
        :columns="STATUS"
        @confirm="onStatus"
        @cancel="cancelStatus"
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
import {
  DatetimePicker,
  Popup,
  Picker,
  Pagination,
  Toast,
  Loading,
  Panel
} from "vant";
import {
  getAreaCode,
  getDistrictByAreaCode,
  getCustomerByAreaCode,
  getPackDetails,
  getPackDetailsBySaleNo
} from "@/api/areaInfoASP";
import { getOrderByAreaCustomer } from "@/api/orderInfoASP";

export default {
  name: "bank",
  data() {
    return {
      couponData: [],
      moneySituation: "",
      cid: "",
      customerInfo: [],
      tableDetail: [],
      tableDetail_1: [],
      showDetail: false,
      showType_1: false,
      STATUS: [
        "全部",
        "待提交",
        "已提交",
        "已受理",
        "已作废",
        "部分发货",
        "余额不足待提交",
        "余额不足可提交",
        "已完成",
        "已接收"
      ],
      status_info: "",
      myStatus: "全部状态",
      myStatusCode: "",
      baseData: [],
      tableData: [],
      set: 94,
      //当前页数
      currentPage: 1,
      //总记录数
      totalLists: 0,
      //每页记录数
      itemsPerPage: 8,
      //总页数
      totalPage: 0,
      loading: false
    };
  },
  components: {
    top,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Pagination.name]: Pagination,
    [Toast.name]: Toast,
    [Loading.name]: Loading,
    [Panel.name]: Panel
  },
  filters: {
    transType(value) {
      switch (value) {
        case "0":
          return "待提交";
          break;
        case "1":
          return "已提交";
          break;
        case "2":
          return "已受理";
        case "3":
          return "已作废";
        case "4":
          return "部分发货";
        case "5":
          return "余额不足待提交";
        case "6":
          return "余额不足可提交";
        case "7":
          return "已完成";
        case "12":
          return "已接收";
          break;
      }
    },
    datatrans(value) {
      //时间戳转化大法
      if (value == null || value == "9999/12/31 00:00:00") {
        return "";
      }
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " "; /* + h + ':' + m + ':' + s; */
    }
  },
  methods: {
    cancelStatus() {
      this.showType_1 = false;
    },
    //客户详情
    async customer_info(val) {
      this.customerInfo = val;
      let mlUrl_1 = this.orderBaseUrl + "/order/getResidemoney.do";
      let mlUrl_2 = this.orderBaseUrl + "/order/findRebate.do";
      var data = {
        cid: this.$store.getters.getCId,
        companyId: this.customerInfo.COMPANY_ID
      };
      await axios.post(mlUrl_1, data).then(res1 => {
        this.moneySituation = "当前余额 " + res1.data.data;
      });
      await axios.post(mlUrl_2, data).then(res2 => {
        this.couponData = res2.data.data;
        this.showDetail = true;
      });
    },
    //  订单详情
    toOrderDetails(val) {
      this.$router.push({
        name: "orderdetails",
        params: {
          state_id: val.STATUS_ID, //订单状态（（可传空串，空串表示全部状态） --1提交、12-接收、2--受理、3--作废、--5欠款待提交、--6欠款可提交、--7已完成）
          find: val.ORDER_NO, //查找订单号，可模糊查找（可传空串，获取全部）
          from: "orderDetailsQuery"
        }
      });
    },
    //状态
    onStatus(value, index) {
      this.myStatus = value;
      if (this.myStatus == "全部") {
        this.myStatusCode = "";
      } else if (this.myStatus == "待提交") {
        this.myStatusCode = "0";
      } else if (this.myStatus == "已提交") {
        this.myStatusCode = "1";
      } else if (this.myStatus == "已受理") {
        this.myStatusCode = "2";
      } else if (this.myStatus == "已作废") {
        this.myStatusCode = "3";
      } else if (this.myStatus == "部分发货") {
        this.myStatusCode = "4";
      } else if (this.myStatus == "余额不足待提交") {
        this.myStatusCode = "5";
      } else if (this.myStatus == "余额不足可提交") {
        this.myStatusCode = "6";
      } else if (this.myStatus == "已完成") {
        this.myStatusCode = "7";
      } else if (this.myStatus == "已接收") {
        this.myStatusCode = "12";
      }
      this.showType_1 = false;
    },
    _query() {
      this.currentPage = this.baseData.page;
      this.myStatusCode = this.baseData.status;
      this.query();
    },
    query() {
      this.tableData = [];
      var data = {
        customerCode: this.baseData.customer, //已选用户
        beginTime: this.baseData.beginTime, //起始时间
        finishTime: this.baseData.finishTime, //结束时间
        limit: this.baseData.limit, //限制数
        page: this.currentPage, //页数
        status: this.myStatusCode //状态
      };
      if (!data.beginTime) {
        data.beginTime = "0001/1/1";
      }
      if (!data.finishTime) {
        data.finishTime = "9999/12/31";
      } else {
        data.finishTime = data.finishTime + " 23:59:59";
      }
      getOrderByAreaCustomer(data).then(res => {
        this.totalLists = res.count;
        this.tableData = res.data;
      });
    },

    changePage(val) {
      this.currentPage = val;
      this.query();
    }
  },
  activated() {
    this.baseData = JSON.parse(sessionStorage.getItem("customerData"));
    this._query();
  }
};
</script>

<style scoped>
.table_2 {
  border-collapse: collapse;
  border: 0px solid black;
}
.order-state {
  background: #89cb81;
  border-radius: 14px;
  padding: 5px 10px;
  position: absolute;
  bottom: 5px;
  right: 12px;
  color: white;
  font-size: 12px;
}
.order-state_1 {
  background: #89cb81;
  border-radius: 14px;
  padding: 5px 10px;
  bottom: 3px;
  right: 12px;
  color: white;
  font-size: 12px;
}
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
  height: 69px;
  /*font-size: 15px;*/
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  font-size: 15px;
  z-index: 999;
}

ul {
  margin: 0;
  padding: 0;

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
  margin: 140px 10px 80px;
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