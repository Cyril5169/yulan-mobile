<template>
  <div class="salesQuery">
    <top :top="set"></top>
    <span class="search-button" @click="_queryQuYu_1()">查询</span>
    <div class="search">
      <ul class="ulhead" id="ulhead">
        <div style="margin-top: -3px">
          <span class="licenter" @click="(showType_1 = true), (loading = true)">
            <input class="time" type="text" v-model="getVersion" disabled />
          </span>
          <span class="licenter">
            <input class="item_1" v-model="XH" placeholder="请输入型号" />
          </span>
        </div>
        <div style="margin-top: -7px">
          <span class="licenter" @click="showType_4 = true">
            <input type="text" v-model="ksDataSet" class="time_2" disabled />
          </span>
          <span class="licenter" @click="showType_5 = true">
            <input type="text" v-model="jsDataSet" class="time_1" disabled />
          </span>
          <van-button class="button" @click="clear" round>重置</van-button>
        </div>
      </ul>
    </div>
    <div v-if="query_1" style="margin: 10px 10px 80px">
      <div style="font-size: 15px; color: blue; margin: 10px">
        金额汇总：{{ getSumMoneyBySales[0].SUNMONEY }}元
      </div>
      <van-panel style="min-height: 100px">
        <div style="width: 100%" v-for="salesData in tableData">
          <table style="width: 100%; font-size: 15px; align: center">
            <tr>
              <td style="width: 25%; text-align: left">型号:</td>
              <td>{{ salesData.ITEM_NO }}</td>
            </tr>
            <tr>
              <td style="width: 25%; text-align: left">总数量:</td>
              <td>{{ salesData.SUMQTY }}</td>
            </tr>
            <tr>
              <td style="width: 25%; text-align: left">总金额:</td>
              <td>{{ salesData.SUNMONEY }}元</td>
            </tr>
          </table>
          <hr />
        </div>
      </van-panel>
    </div>
    <!--版本-->
    <van-popup
      v-model="showType_1"
      position="bottom"
      :style="{ height: '75%' }"
    >
      <span style="float: right; margin-top: 5px; margin-right: 5px">
        <van-button class="button" @click="closeVersion">确定</van-button></span
      >
      <div style="margin-top: 10px">
        <van-search
          placeholder="搜索版本"
          v-model="customer_filter"
          @input="customerFilter"
          style="width: 60%; height: 37px; margin-left: 5px"
          class="search_1"
        />
      </div>
      <div style="margin-top: 50px; margin-left: 10px">
        <van-checkbox-group
          v-model="customer"
          :loading="false"
          ref="checkboxGroup"
          style="margin-top: 20px"
          :max="1"
        >
          <van-checkbox
            style="text-align: left; margin-top: 7px; font-size: 15px"
            :name="customerData.PRODUCTVERSION_ID"
            v-for="customerData in customerData"
            :key="customerData.PRODUCTVERSION_ID"
            >{{ customerData.PRODUCTVERSION_NAME }}</van-checkbox
          >
        </van-checkbox-group>
      </div>
      <!-- <van-picker show-toolbar title="请选择版本" :columns="PRODUCTVERSION_NAME" @confirm="onAreaCode" @cancel="cancelArea"/> -->
    </van-popup>
    <!--日期选择-->
    <van-popup v-model="showType_4" position="bottom">
      <van-datetime-picker
        v-model="ksData"
        type="date"
        :show-toolbar="true"
        :title="'选择时间'"
        @confirm="confirmTimeks"
        @cancel="cancelTimeks"
      />
    </van-popup>
    <van-popup v-model="showType_5" position="bottom">
      <van-datetime-picker
        class="reset"
        v-model="jsData"
        type="date"
        :title="'选择时间'"
        @confirm="confirmTimejs"
        @cancel="cancelTimejs"
      />
    </van-popup>
    <!--底部分页-->
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
  Field,
  Button,
  Panel,
  TreeSelect,
  Checkbox,
  CheckboxGroup,
  Search,
  Radio,
} from "vant";
import {
  getAreaCode,
  getDistrictByAreaCode,
  getCustomerByAreaCode,
  getPackDetails,
  getPackDetailsBySaleNo,
  getPackDetailsType,
  getTotalMoneySum,
  getCustomerName,
  getAllVersion,
  getProductSales,
  getSumMoneyBySales,
} from "@/api/areaInfoASP";
export default {
  name: "salesQuery",
  data() {
    return {
      getSumMoneyBySales: [],
      query_1: false,
      PRODUCTVERSION_NAME: [],
      VERSION: [],
      XH: "",
      get_customer_code: "",
      getMoney: "",
      get_CUSTOMER_NAME: "",
      CUSTOMERED: [], //查询的已选用户
      CUSTOMERED_1: [],
      moneySum: [],
      typeNameFilter: [],
      typeIdFilter: [],
      typeFilter: [],
      checked: false,
      myStatus: "全部状态",
      myStatusCode: "",
      ksData: "",
      ksDataSet: "", //  开始时间
      jsData: "",
      jsDataSet: "", //结束时间
      customer_filter: "",
      customer: [],
      myCustomerType: "客户类型",
      myCustomerTypeCode: "",
      myDistrict: "片区", //片区状态
      myDistrictId: "",
      district_name: [],
      getVersion: "版本", //市场状态
      PRODUCTVERSION_ID: "",
      areaCode_name: [],
      activeIndex: 0,
      showType_1: false,
      showType_2: false,
      showType_3: false,
      showType_4: false,
      showType_5: false,
      showType_6: false,
      showMoney: false,
      set: 102,
      detailVisible: false,
      startDate: "",
      endDate: "",
      tableDetail: [],
      tableDetail_1: [],
      theBody: {},
      first: "",
      second: "",
      activeName: "first",
      query_2: false,
      value_3: "", //客户类型初始值
      customerData: [],
      customerDataAll: [],
      limit: 8,
      count: 0,
      //当前页数
      currentPage: 1,
      //总记录数
      totalLists: 0,
      //每页记录数
      itemsPerPage: 8,
      //总页数
      totalPage: 0,
      value_4: [], //已选用户初始值
      value1: "",
      value2: "",
      beginTime_1: "", //区域提货单查询
      finishTime_1: "",
      AREA_DISTRICT: [],
      AREA_DISTRICT_1: [
        {
          DISTRICT_ID: "",
          DISTRICT_NAME: "全部",
        },
      ],
      CUSTOMER_TYPE: ["全部", "非专业市场客户", "专业市场客户"],
      AREACODE: [],
      tableData: [],
      STATUS: ["全部", "待提", "已提货", "作废", "已月结"],
      status_info: "",
    };
  },
  components: {
    top,
    [Popup.name]: Popup,
    [Pagination.name]: Pagination,
    [Toast.name]: Toast,
    [Field.name]: Field,
    [Button.name]: Button,
    [Panel.name]: Panel,
    [TreeSelect.name]: TreeSelect,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Search.name]: Search,
    [DatetimePicker.name]: DatetimePicker,
    [Radio.name]: Radio,
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
    },
  },
  //生命周期
  created() {
    this._getAllVersion();
    let time = new Date();
    this.jsSet(time);
    this.ksSet(time);
  },
  methods: {
    closeVersion() {
      this.showType_1 = false;
      if (this.customer == "") {
        this.getVersion = "版本";
      } else {
        this.getVersion = this.customer;
      }
    },
    cancelDistrict() {
      this.showType_2 = false;
    },
    cancelCustomer() {
      this.showType_3 = false;
    },
    cancelTimeks() {
      this.showType_4 = false;
    },
    cancelTimejs() {
      this.showType_5 = false;
    },
    cancelStatus() {
      this.showType_6 = false;
    },
    //开始时间选择
    confirmTimeks(value) {
      this.ksSet2(this.ksData);
      this.showType_4 = false;
    },
    //结束时间选择
    confirmTimejs(value) {
      this.jsSet(this.jsData);
      this.showType_5 = false;
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
      // console.log(this.ksData)
      let current_date = time.getDate();
      let current_month = time.getMonth() + 1;
      let current_year = time.getFullYear();
      this.jsDataSet = current_year + "-" + current_month + "-" + current_date;
      this.jsData = time;
    },
    //初始化开始时间
    ksSet(time) {
      let current_year = time.getFullYear();
      let current_month = time.getMonth() + 1;
      this.ksDataSet = current_year + "-" + current_month + "-" + "01";
      this.ksData = new Date(this.ksDataSet);
    },
    //查所有版本
    _getAllVersion() {
      getAllVersion().then((res) => {
        this.VERSION = res.data;
        this.customerData = res.data;
        this.customerDataAll = res.data;
        if (this.VERSION.length == 0) {
          Toast({
            duration: 2000,
            message: "未查到版本号",
          });
        }
      });
    },
    //客户筛选
    customerFilter(val) {
      var reg = new RegExp(val, "i");
      this.customerData = this.customerDataAll.filter((item) =>
        reg.test(item.PRODUCTVERSION_NAME)
      );
    },
    checkAll() {
      for (var i = 0; i < this.customerData.length; i++) {
        this.customer.push(this.customerData[i].PRODUCTVERSION_ID);
        this.PRODUCTVERSION_NAME.push(this.customerData[i].PRODUCTVERSION_NAME);
      }
    },
    toggleAll() {
      this.customer = [];
    },
    //区域市场
    onAreaCode(value, index) {
      this.getVersion = value;
      this.PRODUCTVERSION_ID = index;
      this.showType_1 = false;
      this.areaCode(index);
    },
    //根据用户查区域市场
    _getAreaCode() {
      this.tableData = [];
      this.value_4 = [];
      this.AREACODE = [];
      this.areaCode_name = [];
      this.myDistrict = "片区"; //片区状态
      this.myDistrictId = "";
      var data = {
        userid: this.$store.state.info.data.loginName,
      };
      getAreaCode(data)
        .then((res) => {
          this.AREACODE = res.data;
          for (var i = 0; i < this.AREACODE.length; i++) {
            this.areaCode_name.push(this.AREACODE[i].AREA_NAME);
          }
          //console.log(this.stockIds)
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //根据市场区域查片区
    areaCode(val) {
      //点击选择市场事件
      this.tableData = [];
      this.value_4 = [];
      this.district_name = [];
      this.customer = [];
      this.myDistrict = "片区"; //片区状态
      var data = {
        areaCode: this.AREACODE[val].AREA_CODE,
      };
      this.first = this.AREACODE[val].AREA_CODE;
      getDistrictByAreaCode(data).then((res) => {
        this.AREA_DISTRICT = res.data;
        this.AREA_DISTRICT.push.apply(this.AREA_DISTRICT, this.AREA_DISTRICT_1);
        for (var i = 0; i < this.AREA_DISTRICT.length; i++) {
          this.district_name.push(this.AREA_DISTRICT[i].DISTRICT_NAME);
        }
      });
      this._getCustomerByAreaCode_1(val);
    },
    //根据市场和片区查可选用户
    district_code(val) {
      this.tableData = [];
      this.value_4 = [];
      this.second = this.AREA_DISTRICT[val].DISTRICT_ID;
      var data = {
        areaCode: this.first,
        AREA_DISTRICT: this.AREA_DISTRICT[val].DISTRICT_ID,
      };
      this._getCustomerByAreaCode_2(data);
    },
    //根据市场，片区，客户类型查可选用户
    customer_type() {
      this.tableData = [];
      this.value_4 = [];
      var data = {
        areaCode: this.first,
        district: this.second,
        customerType: this.myCustomerTypeCode,
      };
      this._getCustomerByAreaCode_3(data);
    },
    //状态搜索
    status_id(val) {
      this.status_info = val;
      this.tableData = [];
      this._queryQuYu_1();
    },
    //通过区域查询可选用户
    _getCustomerByAreaCode_1(val) {
      this.tableData = [];
      this.customerData = [];
      this.customerDataAll = [];
      this.AREA_DISTRICT = [];
      this.value_4 = [];
      let ksTime;
      let jsTime;
      if (this.ksDataSet === "起始时间") {
        ksTime = "";
      } else {
        ksTime = this.ksDataSet;
      }
      if (this.jsDataSet === "结束时间") {
        jsTime = "";
      } else {
        jsTime = this.jsDataSet;
      }
      var data = {
        beginTime: ksTime, //起始时间
        finishTime: jsTime, //结束时间
        isall: this.checked,
        areaCode: this.AREACODE[val].AREA_CODE, //市场
        district: this.AREA_DISTRICT, //片区
        customerType: this.customer_type, //客户类型
      };
      getCustomerByAreaCode(data).then((res) => {
        this.customerData = res.data;
        this.customerDataAll = res.data;
      });
    },
    _getCustomerByAreaCode_2(val) {
      this.customerData = [];
      this.tableData = [];
      this.customerDataAll = [];
      let ksTime;
      let jsTime;
      if (this.ksDataSet === "起始时间") {
        ksTime = "";
      } else {
        ksTime = this.ksDataSet;
      }
      if (this.jsDataSet === "结束时间") {
        jsTime = "";
      } else {
        jsTime = this.jsDataSet;
      }
      this.value_4 = [];
      var data = {
        beginTime: ksTime, //起始时间
        finishTime: jsTime, //结束时间
        isall: this.checked,
        areaCode: val.areaCode, //市场
        district: val.AREA_DISTRICT, //片区
        customerType: this.customer_type, //客户类型
      };
      getCustomerByAreaCode(data).then((res) => {
        this.customerData = res.data;
        this.customerDataAll = res.data;
      });
    },
    _getCustomerByAreaCode_3(val) {
      this.customerData = [];
      this.tableData = [];
      this.value_4 = [];
      this.customerDataAll = [];
      let ksTime;
      let jsTime;
      if (this.ksDataSet === "起始时间") {
        ksTime = "";
      } else {
        ksTime = this.ksDataSet;
      }
      if (this.jsDataSet === "结束时间") {
        jsTime = "";
      } else {
        jsTime = this.jsDataSet;
      }
      var data = {
        beginTime: ksTime, //起始时间
        finishTime: jsTime, //结束时间
        isall: this.checked,
        areaCode: val.areaCode, //市场
        district: val.district, //片区
        customerType: val.customerType, //客户类型
      };
      getCustomerByAreaCode(data).then((res) => {
        this.customerData = res.data;
        this.customerDataAll = res.data;
      });
    },
    //销售提货单查询
    _queryQuYu_1() {
      this.currentPage = 1;
      this.queryQuYu_1();
    },
    async queryQuYu_1() {
      this.getSumMoneyBySales = [];
      this.tableData = [];
      let ksTime;
      let jsTime;
      if (this.ksDataSet === "起始时间") {
        ksTime = "";
      } else {
        ksTime = this.ksDataSet;
      }
      if (this.jsDataSet === "结束时间") {
        jsTime = "";
      } else {
        jsTime = this.jsDataSet;
      }
      if (this.XH == "" && this.customer.length == 0) {
        Toast({
          duration: 2000,
          message: "未输入型号或者版本号",
        });
        return (this.tableData = []);
      }
      if (this.XH != "" || this.customer.length != 0) {
        var data = {
          item_no: this.XH, //类型筛选
          version: this.customer[0], //已选用户
          beginTime: ksTime, //起始时间
          finishTime: jsTime, //结束时间
          limit: this.limit, //限制数
          page: this.currentPage, //页数
        };
        if (!data.beginTime) {
          data.beginTime = "0001/1/1";
        }
        if (!data.finishTime) {
          data.finishTime = "9999/12/31";
        } else {
          data.finishTime = data.finishTime + " 23:59:59";
        }
        getProductSales(data).then((res) => {
          this.totalLists = res.count;
          this.tableData = res.data;
          if (
            this.XH != "" &&
            this.customer.length != 0 &&
            res.data.length == 0
          ) {
            Toast({
              duration: 2000,
              message: "所输版本和型号不对应，请重新输入！",
            });
            this.query_1 = false;
            return (this.tableData = []);
          } else if (
            (this.XH != "" || this.customer.length != 0) &&
            res.data.length == 0
          ) {
            Toast({
              duration: 2000,
              message: "暂无数据，请重新输入！",
            });
            this.query_1 = false;
            return (this.tableData = []);
          } else {
            getSumMoneyBySales(data).then((res1) => {
              this.getSumMoneyBySales = res1.data;
              this.query_1 = true;
            });
          }
        });
      }
    },

    //翻页获取订单
    changePage(val) {
      this.currentPage = val;
      this.queryQuYu_1();
    },
    //重置
    clear() {
      this.getSumMoneyBySales = [];
      this.query_1 = false;
      this.XH = "";
      this.CUSTOMERED = [];
      this.moneySum = [];
      this.customer = [];
      this.myStatus = "全部状态";
      (this.myStatusCode = ""), (this.ksData = ""), (this.jsData = "");
      let time = new Date();
      this.jsSet(time);
      this.ksSet(time);
      (this.customer_filter = ""),
        (this.customer = []),
        (this.myCustomerType = "客户类型"),
        (this.myCustomerTypeCode = ""),
        (this.myDistrict = "片区"), //市场状态
        (this.myDistrictId = ""),
        (this.district_name = []),
        (this.getVersion = "版本"), //市场状态
        (this.PRODUCTVERSION_ID = ""),
        (this.PRODUCTVERSION_NAME = []),
        (this.activeIndex = 0),
        (this.showType_1 = false),
        (this.showType_2 = false),
        (this.showType_3 = false),
        (this.showType_4 = false),
        (this.showType_5 = false),
        (this.showType_6 = false),
        (this.customerData = []);
      this.beginTime_1 = "";
      this.finishTime_1 = "";
      this.value_4 = [];
      this.tableData = [];
      this.AREA_DISTRICT = [];
      this.status_info = "";
      (this.CUSTOMER_TYPE = ["全部", "非专业市场客户", "专业市场客户"]),
        (this.STATUS = ["全部", "待提", "已提货", "作废", "已月结"]),
        (this.tableDetail = []);
      this.count = 0;
      this.currentPage = 1;
      this._getAllVersion();
    },
  },
};
</script>

<style scoped>
.search_1 {
  position: relative;
  top: 35px;
}
.time {
  font-size: 14px;
  margin-top: 50px;
  width: 25%;
  height: 30px;
  margin-left: 5px;
  text-align: left;
  padding-left: 17px;
  background-image: url("../../assetsorder/time-zk.png");
  background-repeat: no-repeat;
  background-position-x: 91px;
  background-position-y: 2vw;
  background-size: 14px;
}
.time_1 {
  width: 25%;
  height: 30px;
  margin-left: 10px;
  text-align: left;
  padding-left: 17px;
  font-size: 14px;
  background-image: url("../../assetsorder/time-zk.png");
  background-repeat: no-repeat;
  background-position-x: 95px;
  background-position-y: 3vw;
  background-size: 13px;
  margin-top: 15px;
}
.time_2 {
  width: 25%;
  height: 30px;
  margin-left: 5px;
  text-align: left;
  padding-left: 17px;
  font-size: 14px;
  background-image: url("../../assetsorder/time-zk.png");
  background-repeat: no-repeat;
  background-position-x: 95px;
  background-position-y: 3vw;
  background-size: 13px;
  margin-top: 15px;
}
.choose {
  background: #8bc34a;
  height: 30px;
  line-height: 5px;
  color: rgb(255, 255, 255);
  font-size: 14px;
}
.button {
  background: #8bc34a;
  height: 31px;
  text-align: center;
  line-height: 5px;
  color: rgb(255, 255, 255);
  font-size: 14px;
  margin-left: 5px;
  width: 70px;
}
.item_1 {
  top: 1px;
  width: 50%;
  height: 30px;
  background-color: hsl(0, 0%, 100%);
  border: none;
  font-size: 10px;
  line-height: 5px;
  text-align: center;
  margin-left: 10px;
}
.salesQuery {
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

.ulhead {
  margin-top: 10px;
  height: 130px;
  width: 100%;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
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
.table_1 {
  border-collapse: collapse;
  border: 1px solid black;
}
</style>
