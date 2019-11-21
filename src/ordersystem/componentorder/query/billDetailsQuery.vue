<template>
  <div class="bank">
    <top :top="set"></top>
    <span class="search-button" @click="query()">查询</span>
    <div class="search">
      <ul class="ulhead" id="ulhead">
        <div >客户名称：{{baseData.CUSTOMER_NAME}} </div>
        <div >汇总金额：{{baseData.MONEYSUM}}元<li class="licenter" style="margin-left:20px" @click="showType_1 = true">
          <input class="time" type="text" v-model="myStatus" disabled />
        </li></div>
        
      </ul>
    </div>

    <div class="all-bank">
      <div class="single-bank" v-for="singleBank in tableData">
        <div class="single-title">
          <span class="single-title-left">提货单号：{{singleBank.SALE_NO}}</span>
          <span class="single-title-right">{{singleBank.STATUS_ID|transStatus}}</span>
        </div>
        <table>
          <tr>
            <td style="width:45%">订单号:</td>
            <td>{{singleBank.CONTRACT_NO}}</td>
          </tr>
          <!-- <tr>
            <td>合同号:</td>
            <td>{{singleBank.HTBM}}</td>
          </tr> -->
          <!-- <tr>
            <td>开单日期:</td>
            <td>{{singleBank.BILL_DATE|datatrans}}</td>
          </tr> -->
          <tr>
            <td>提货日期:</td>
            <td>{{singleBank.DATE_OUT_STOCK|datatrans}}</td>
          </tr>
          <tr>
            <td>类型:</td>
            <td>{{singleBank.BILL_ID|transType}}</td>
          </tr>
          <tr>
            <td>金额:</td>
            <td>{{singleBank.MONEY_SUM}}元</td>
          </tr>
          <!-- <tr>
            <td>物流管理员:</td>
            <td>{{singleBank.NAME}}</td>
          </tr> -->
          <!-- <tr>
            <td>客户名称:</td>
            <td>{{singleBank.CUSTOMER_NAME}}/联系人:{{singleBank.LINKMAN}}</td>
          </tr> -->
        </table>
        <span class="order-state" @click="toBillDetails(singleBank)">查看详情</span>
      </div>
    </div>
    <!--提货单详情-->
    <van-popup v-model="showDetail" position="bottom" closeable :style="{ height: '75%' }">
      <van-panel title="提货单详情" style="font-size:14px">
        <div style="width:90%;margin:0 auto">
          <table style="width:100%;height:180px" class="table_2" border="1">
            <tr>
              <td style="width:25%">提货单:</td>
              <td>{{tableDetail_1.SALE_NO}}</td>
            </tr>
            <tr>
              <td>开单日期:</td>
              <td>{{tableDetail_1.BILL_DATE|datatrans}}</td>
            </tr>
            <tr>
              <td>状态:</td>
              <td>{{tableDetail_1.STATUS_ID|transStatus}}</td>
            </tr>
            <!-- <tr>
              <td>业务员:</td>
              <td>{{tableDetail_1.SALE_NAME}}</td>
            </tr> -->
            <tr>
              <td>合同号:</td>
              <td>{{tableDetail_1.HTBM}}</td>
            </tr>
            <tr>
              <td>金额:</td>
              <td>{{tableDetail_1.MONEY_SUM}}</td>
            </tr>
            <tr>
              <td>提货日期:</td>
              <td>{{tableDetail_1.DATE_OUT_STOCK|datatrans}}</td>
            </tr>
            <!-- <tr>
              <td>部门:</td>
              <td></td>
            </tr> -->
            <tr>
              <td>客户:</td>
              <td>{{tableDetail_1.CUSTOMER_NAME}}/联系人:{{tableDetail_1.LINKMAN}}</td>
            </tr>
            <!-- <tr>
              <td>物流:</td>
              <td></td>
            </tr> -->
            <tr>
              <td>备注:</td>
              <td>{{tableDetail_1.NOTES}}</td>
            </tr>
          </table>
          <div class="single-bank" v-for="detail in tableDetail">
            <table>
              <tr>
                <td style="width:25%;text-align:left">状态:</td>
                <td>{{detail.STATUS_ID|transStatus}}</td>
              </tr>
              <tr>
                <td style="width:25%;text-align:left">型号：</td>
                <td>{{detail.ITEM_NO}}</td>
              </tr>
              <tr>
                <td style="width:25%;text-align:left">批次：</td>
                <td>{{detail.BATCH_NO}}</td>
              </tr>
              <tr>
                <td style="width:25%;text-align:left">版本：</td>
                <td>{{detail.PRODUCTVERSION_NAME}}</td>
              </tr>
              <tr>
                <td style="width:25%;text-align:left">仓库：</td>
                <td>{{detail.NOTE}}</td>
              </tr>
              <!-- <tr>
                <td style="width:25%;text-align:left">区位：</td>
                <td>{{detail.AREA}}</td>
              </tr> -->
              <tr>
                <td style="width:25%;text-align:left">发货数：</td>
                <td>{{detail.QTY_DELIVER}}</td>
              </tr>
              <tr>
                <td style="width:35%;text-align:left">物流单价：</td>
                <td>{{detail.TRANS_PRICE}}</td>
              </tr>
              <tr>
                <td style="width:25%;text-align:left">单价:</td>
                <td>{{detail.SALE_PRICE}}</td>
              </tr>
              <tr>
                <td style="width:25%;text-align:left">金额:</td>
                <td>{{detail.MONEY}}</td>
              </tr>
            </table>
            <hr />
          </div>
        </div>
      </van-panel>
    </van-popup>
    <!--状态搜索-->
    <van-popup v-model="showType_1" position="bottom">
      <van-picker show-toolbar title="请选择状态" :columns="STATUS" @confirm="onStatus" @cancel="cancelStatus"/>
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
export default {
  name: "bank",
  data() {
    return {
      tableDetail: [],
      tableDetail_1: [],
      showDetail: false,
      showType_1: false,
      STATUS: ["全部", "待提", "已提货", "作废", "已月结"],
      status_info: "",
      myStatus: "全部状态",
      myStatusCode: "",
      baseData: this.$route.params.data,
      tableData: [],
      set: 93,
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
    transStatus(value) {
      switch (value) {
        case "1":
          return "待提";
        case "2":
          return "已提货";
        case "3":
          return "作废";
        case "4":
          return "已月结";
          break;
      }
    },
    transType(value){
      switch (value) {
        case "0":
          return "冲减单";
        case "3":
          return "退货单";
        default:
          return "提货单";
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
    cancelStatus(){
      this.showType_1 = false
    },
    //  提货单详情
    toBillDetails(val) {
      this.showDetail = true;
      this.tableDetail = [];
      this.tableDetail_1 = [];
      this._getPackDetailsBySaleNo(val);
      let data_1 = {
        SALE_NO: val.SALE_NO, //提货单
        BILL_DATE: val.BILL_DATE, //日期
        STATUS_ID: val.STATUS_ID, //状态
        SALE_NAME: val.SALE_NAME, //业务员
        HTBM: val.HTBM, //合同号
        MONEY_SUM: val.MONEY_SUM, //金额
        DATE_OUT_STOCK: val.DATE_OUT_STOCK, //提货日期
        CUSTOMER_NAME: val.CUSTOMER_NAME, //客户名称
        LINKMAN: val.LINKMAN,
        NOTES: val.NOTES //备注
      };
      this.tableDetail_1 = data_1;
    },
    _getPackDetailsBySaleNo(val) {
      this.tableDetail = [];
      var data_2 = {
        saleNo: val.SALE_NO //所选提货单
      };
      getPackDetailsBySaleNo(data_2).then(res => {
        this.tableDetail = res.data;
      });
    },
    //状态
    onStatus(value, index) {
      this.myStatus = value;
      if (this.myStatus == "全部") {
        this.myStatusCode = "";
      } else if (this.myStatus == "待提") {
        this.myStatusCode = "1";
      } else if (this.myStatus == "已提货") {
        this.myStatusCode = "2";
      } else if (this.myStatus == "作废") {
        this.myStatusCode = "3";
      } else if (this.myStatus == "已月结") {
        this.myStatusCode = "4";
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
        costomerCodes: this.baseData.customer, //已选用户
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
      getPackDetails(data).then(res => {
        this.totalLists = res.count;
        this.tableData = res.data;
        if (this.tableData.length == 0) {
          Toast({
            message: "暂无提货单信息",
            duration: 2000
          });
        } 
      });
    },

    changePage(val) {
      this.currentPage = val;
      this.query();
    }
  },
  created() {
    this._query();
  }
};
</script>

<style scoped>
.td_1 {
  width: 50px;
}
.table_2 {
  border-collapse: collapse;
  border: 1px solid black;
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
