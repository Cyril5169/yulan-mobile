<template>
  <div class="areaQuery">
    <top :top="set"></top>
    <span class="search-button" @click="_queryQuYu_1()">查询</span>
    <div class="search">
      <ul class="ulhead" id="ulhead">
        <div>
          <span class="licenter" @click="showType_1 = true">
            <input class="time" type="text" v-model="myArea" disabled />
          </span>
          <span class="licenter" @click="showType_2 = true">
            <input class="time" type="text" v-model="myDistrict" disabled />
          </span>
          <span class="licenter" @click="showType_3 = true">
            <input class="time" type="text" v-model="myCustomerType" disabled />
          </span>
        </div>

        <div style="margin-top:-24px">
          <van-search
            placeholder="搜索客户"
            v-model="customer_filter"
            @input="customerFilter"
            style="width:45%;height:37px;margin-left:5px"
            class="search_1"
          />
          <van-button class="choose" @click="checkAll" style="margin-left:178px" round>全选</van-button>
          <van-button class="choose" @click="toggleAll" round>反选</van-button>
          <van-button class="button" @click="clear" round>重置</van-button>
        </div>
         <div>
          <span>
            <van-checkbox  v-model="checked" style="margin-left:75%;margin-top:5px;font-size: 14px;">有效客户</van-checkbox >
            </span></div>
        <hr />
        <div>
          <span class="licenter" @click="showType_4 = true">
            <input type="text" v-model="ksDataSet" class="time_1" disabled />
          </span>
          <span class="licenter" @click="showType_5 = true">
            <input type="text" v-model="jsDataSet" class="time_1" disabled />
          </span>
          <span class="licenter" @click="showType_6 = true">
            <input type="text" v-model="myStatus" class="time_1" disabled />
          </span>
        </div>
      </ul>
    </div>
    <div class="queryData" style="margin: 20px 10px 80px;">
      <div>
        <van-checkbox-group v-model="customer" ref="checkboxGroup" style="margin-top:20px">
          <van-checkbox
            style="text-align:left;margin-top:5px;font-size: 15px;"
            :name="customerData.CUSTOMER_CODE"
            v-for="customerData in customerData"
            :key="customerData.CUSTOMER_CODE"
          >{{customerData.CUSTOMER_NAME}}</van-checkbox>
        </van-checkbox-group>
      </div>
    </div>
    <!--市场-->
    <van-popup v-model="showType_1" position="bottom">
      <van-picker show-toolbar title="请选择市场" :columns="areaCode_name" @confirm="onAreaCode" @cancel="cancelArea"/>
    </van-popup>
    <!--片区-->
    <van-popup v-model="showType_2" position="bottom">
      <van-picker show-toolbar title="请选择片区" :columns="district_name" @confirm="onDISTRICT_ID" @cancel="cancelDistrict"/>
    </van-popup>
    <!--客户类型-->
    <van-popup v-model="showType_3" position="bottom">
      <van-picker show-toolbar title="请选择客户类型" :columns="CUSTOMER_TYPE" @confirm="onCUSTOMER_TYPE" @cancel="cancelCustomer"/>
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
    <!--状态搜索-->
    <van-popup v-model="showType_6" position="bottom">
      <van-picker show-toolbar title="请选择状态" :columns="STATUS" @confirm="onStatus" @cancel="cancelStatus"/>
    </van-popup>
    <!-- 查看客户总金额 -->
    <van-popup v-model="showMoney" position="bottom" :style="{ height: '75%' }" closeable>
      <div style="width:90%;margin:0 auto">
        <div style="font-size:15px;color:blue;margin-top:30px">提货单金额汇总：{{(moneySum).toFixed(2)}}元</div>
        <div class="single-bank" style="width:100%" v-for="singleBank in CUSTOMERED">
          <van-panel style="margin-top:10px">
          <table style="font-size:14px;width:90%">
            <tr>
              <td style="text-align:left;width:35%">客户代码：</td>
              <td>
                <a
                      href="javascript:void(0);"
                      @click="showDetail(singleBank)"
                    >{{singleBank.CUSTOMER_CODE}}</a></td>
            </tr>
            <tr>
              <td style="text-align:left">客户名称：</td>
              <td>{{singleBank.CUSTOMER_NAME}}</td>
            </tr>
            <tr>
              <td style="text-align:left">目标任务:</td>
              <td>{{singleBank.TASK}}</td>
            </tr>
            <tr>
              <td style="text-align:left">订单总额:</td>
              <td>{{singleBank.ORDER_MONEY}}</td>
            </tr>
            <tr>
              <td style="text-align:left">任务差额:</td>
              <td>{{singleBank.TASK_MONEY_DF}}</td>
            </tr>
            <tr>
              <td style="text-align:left">任务完成标记:</td>
              <td>{{singleBank.flag}}</td>
            </tr>
          </table>
          <hr>
          </van-panel>
        </div>
      </div>
    </van-popup>
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
  Field,
  Button,
  Panel,
  TreeSelect,
  Checkbox,
  CheckboxGroup,
  Search
} from "vant";
import { GetTaskProgress } from "@/api/orderListASP";
import {
  getAreaCode,
  getDistrictByAreaCode,
  getCustomerByAreaCode,
  getPackDetails,
  getPackDetailsBySaleNo,
  getCustomerName
} from "@/api/areaInfoASP";
import { getOrderByAreaCustomer,getOrderInfoByCustomer } from "@/api/orderInfoASP";
export default {
  name: "areaQuery",
  data() {
    return {
      flag:0,
      get_CUSTOMER_NAME:"",
      date1:"",
      date2:"",
      assignments: "",
      assignmentsTarget: "",
      assignmentsReduce: "",
      tableHead1: "",
      tableHead2: "",
      tableHead3: "",
      moneySum:0,
      CUSTOMERED : [],
      CUSTOMERED_1 : [],
      getSomeData:[],
      get_customer_code:"",
      getMoney:"",
      get_CUSTOMER_NAME:"",
      showMoney:false,
      checked:true,
      myStatus: "全部状态",
      myStatusCode: "",
      ksData: "",
      ksDataSet: "起始时间", //  开始时间
      jsData: "",
      jsDataSet: "结束时间", //结束时间
      customer_filter: "",
      customer: [],
      myCustomerType: "客户类型",
      myCustomerTypeCode: "",
      myDistrict: "片区", //片区状态
      myDistrictId: "",
      district_name: [],
      myArea: "市场", //市场状态
      myAreaCode: "",
      areaCode_name: [],
      activeIndex: 0,
      showType_1: false,
      showType_2: false,
      showType_3: false,
      showType_4: false,
      showType_5: false,
      showType_6: false,
      set: 92,
      loading: false,
      detailVisible: false,
      startDate: "",
      endDate: "",
      tableDetail: [],
      tableDetail_1: [],
      theBody: {},
      first: "",
      second: "",
      activeName: "first",
      query_1: false, //查询显示
      query_2: false,
      value_3: "", //客户类型初始值
      customerData: [],
      customerDataAll: [],
      limit: 8,
      count: 0,
      currentPage: 1,
      value_4: [], //已选用户初始值
      value1: "",
      value2: "",
      beginTime_1: "", //区域提货单查询
      finishTime_1: "",
      AREA_DISTRICT: [],
      AREA_DISTRICT_1: [
        {
          DISTRICT_ID: "",
          DISTRICT_NAME: "全部"
        }
      ],
      CUSTOMER_TYPE: ["全部", "非专业市场客户", "专业市场客户"],
      AREACODE: [],
      tableData: [],
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
      status_info: ""
    };
  },
  components: {
    top,
    [Popup.name]: Popup,
    [Pagination.name]: Pagination,
    [Toast.name]: Toast,
    [Loading.name]: Loading,
    [Field.name]: Field,
    [Button.name]: Button,
    [Panel.name]: Panel,
    [TreeSelect.name]: TreeSelect,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Search.name]: Search,
    [DatetimePicker.name]: DatetimePicker
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
    }
  },
  //生命周期
  created() {
    this._getAreaCode();
    let time = new Date();
    this.jsSet(time);
    this.ksSet(time);
  },
  methods: {
    cancelArea(){
      this.showType_1 = false
    },
    cancelDistrict(){
      this.showType_2 = false
    },
    cancelCustomer(){
      this.showType_3 = false
    },
    cancelTimeks(){
      this.showType_4 = false
    },
    cancelTimejs(){
      this.showType_5 = false
    },
    cancelStatus(){
      this.showType_6 = false
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
      this.ksData = new Date(this.ksDataSet) ;
    },
    //客户筛选
    customerFilter(val) {
      var reg = new RegExp(val, "i");
      this.customerData = this.customerDataAll.filter(item =>
        reg.test(item.CUSTOMER_NAME)
      );
    },
    checkAll() {
      for (var i = 0; i < this.customerData.length; i++) {
        this.customer.push(this.customerData[i].CUSTOMER_CODE);
      }
    },
    toggleAll() {
      this.customer = [];
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
      this.showType_6 = false;
    },
    //客户类型
    onCUSTOMER_TYPE(value, index) {
      this.myCustomerType = value;
      if (this.myCustomerType == "全部") {
        this.myCustomerTypeCode = "";
      } else if (this.myCustomerType == "非专业市场客户") {
        this.myCustomerTypeCode = "notspeciality";
      } else if (this.myCustomerType == "专业市场客户") {
        this.myCustomerTypeCode = "speciality";
      }
      this.showType_3 = false;
      this.customer_type();
    },
    //区域市场
    onAreaCode(value, index) {
      this.myArea = value;
      this.myAreaCode = index;
      this.showType_1 = false;
      this.areaCode(index);
    },
    //区域片区
    onDISTRICT_ID(value, index) {
      this.myDistrict = value;
      this.myDistrictId = index;
      this.showType_2 = false;
      this.district_code(index);
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
        userid: this.$store.state.info.data.loginName
      };
      getAreaCode(data)
        .then(res => {
          this.AREACODE = res.data;
          for (var i = 0; i < this.AREACODE.length; i++) {
            this.areaCode_name.push(this.AREACODE[i].AREA_NAME);
          }
          //console.log(this.stockIds)
        })
        .catch(res => {
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
        areaCode: this.AREACODE[val].AREA_CODE
      };
      this.first = this.AREACODE[val].AREA_CODE;
      getDistrictByAreaCode(data).then(res => {
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
        AREA_DISTRICT: this.AREA_DISTRICT[val].DISTRICT_ID
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
        customerType: this.myCustomerTypeCode
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
        isall:this.checked,
        areaCode: this.AREACODE[val].AREA_CODE, //市场
        district: this.AREA_DISTRICT, //片区
        customerType: this.customer_type //客户类型
      };
      getCustomerByAreaCode(data).then(res => {
        this.customerData = res.data;
        this.customerDataAll = res.data;
      });
    },
    _getCustomerByAreaCode_2(val) {
      this.customerData = [];
      this.tableData = [];
      this.customerDataAll = [];
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
        isall:this.checked,
        areaCode: val.areaCode, //市场
        district: val.AREA_DISTRICT, //片区
        customerType: this.customer_type //客户类型
      };
      getCustomerByAreaCode(data).then(res => {
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
        isall:this.checked,
        areaCode: val.areaCode, //市场
        district: val.district, //片区
        customerType: val.customerType //客户类型
      };
      getCustomerByAreaCode(data).then(res => {
        this.customerData = res.data;
        this.customerDataAll = res.data;
      });
    },
    //订单查询
    _queryQuYu_1() {
      this.currentPage = 1;
      this.queryQuYu_1();
    },
    async queryQuYu_1() {
      //this.typeFilter=[],
      this.tableData = [];
      this.CUSTOMERED = [];
      this.CUSTOMERED_1 = [];
      this.date1="",
      this.date2="",
      this.assignments= "",
      this.assignmentsTarget= "",
      this.assignmentsReduce= "",
      this.tableHead1= "",
      this.tableHead2= "",
      this.tableHead3= "",
      this.moneySum=0,
      this.flag = 0,
      this. date1 = this.ksDataSet.slice(0, 4) + "-" + (this.ksDataSet.slice(5, 7))
      this. date2 = this.jsDataSet.slice(0, 4) + "-" + (this.jsDataSet.slice(5, 7))
      
      let year = this.date1.slice(0, 4);
      let endYear = this.date2.slice(0, 4);
      let month = this.date1.slice(5, 7);
      let endMonth = this.date2.slice(5, 7);
      if (this.customer.length == 0) {
          Toast({
            duration: 2000,
            message: "未选择用户"
          });
      } else {
        for (var i = 0; i < this.customer.length; i++) {
      this.date1=""
      this.date2=""
      this.assignments= ""
      this.assignmentsTarget= ""
      this.assignmentsReduce= ""
      this.tableHead1= ""
      this.tableHead2= ""
      this.tableHead3= ""
          var res = await  GetTaskProgress({
            companyId:this.customer[i],
            year:year,
            endYear:endYear,
            month:month,
            endMonth:endMonth,
            cid: this.$store.state.info.data.loginName,
          },{ loading: false })
          let zoom = res.data[0].orders;
          
        let reduce = 0;
        for (let i = 0; i < zoom.length; i++) {
          zoom[i].sumMoney =
            zoom[i].ALL_SPEND + zoom[i].ALLBACK_Y + zoom[i].ALLBACK_M;
          reduce += zoom[i].ALL_SPEND;
        }
        //this.tableData = zoom;
        if (res.data[0].assignments) {
          this.assignments = res.data[0].assignments.ASSIGNMENTS;
          this.assignmentsTarget = res.data[0].assignments.ASSIGNMENTS_TARGET;
          this.assignmentsReduce = (this.assignmentsTarget - reduce).toFixed(2);
          // var selectMonth = "";
      // if (this.date1 == this.date2) {
      //   selectMonth = this.date1.slice(5, 7) + "月";
      // } else if (this.date1.slice(0, 4) == this.date2.slice(0, 4)) {
      //   selectMonth =
      //     this.date1.slice(5, 7) + "-" + this.date2.slice(5, 7) + "月总";
      // } else {
      //   selectMonth =
      //     this.date1.slice(0, 4) +
      //     "." +
      //     this.date1.slice(5, 7) +
      //     "-" +
      //     this.date2.slice(0, 4) +
      //     "." +
      //     this.date2.slice(5, 7) +
      //     "月总";
      // }
      // this.date1 == this.date2
      //   ? this.date1.slice(5, 7) + "月"
      //   : this.date1.slice(5, 7) + "-" + this.date2.slice(5, 7) + "月总";
           // this.tableHead1 = `${selectMonth}协议月任务：${this.assignments}`;
            this.tableHead2 = (this.assignmentsTarget).toFixed(2);
            this.tableHead3 = this.assignmentsReduce;
        } else {
          this.tableHead1 = "所选月无任务";
        }
        if(this.tableHead2>0 && this.tableHead3<=0){
          this.flag = "完成"
        }else{
          this.flag = ""
          
        }
        if(!this.tableHead2){
          this.tableHead2 = "无任务"
        }
        var res1 = await  getCustomerName({customer:this.customer[i]},{ loading: false })
          this.get_CUSTOMER_NAME = res1.data[0]
        var res2 = await getOrderInfoByCustomer({customer: this.customer[i]},{ loading: false })
        
        if(res2.data.length == 0){
          this.index = i
          continue
        }
        this.getSomeData = res2.data[0]
        var sum = this.moneySum + reduce
        this.moneySum = sum
          this.CUSTOMERED_1[i] = await {
            CUSTOMER_CODE: this.customer[i],
            CUSTOMER_NAME: this.get_CUSTOMER_NAME.CUSTOMER_NAME,
            TASK:this.tableHead2,
            ORDER_MONEY:(reduce).toFixed(2),
            TASK_MONEY_DF:this.tableHead3,
            flag:this.flag,
            LINKPERSON:this.getSomeData.LINKPERSON,
            TELEPHONE:this.getSomeData.TELEPHONE,
            POST_ADDRESS:this.getSomeData.POST_ADDRESS,
            //MONEYSUM:this.moneySum.MONEYSUM
          }

        }
        
        this.CUSTOMERED = this.CUSTOMERED_1.filter(item =>
          item != "" && item != undefined 
        ) 
        if(this.CUSTOMERED.length == 0){
          Toast({
            duration: 2000,
            message: "选择的客户无订单"
          });
          return this.showMoney = false
        }else{
        this.showMoney = true;}
      }
    },
    showDetail(val){
           var data = {
              MONEYSUM:val.ORDER_MONEY,//订单总额
              CUSTOMER_NAME:val.CUSTOMER_NAME,//用户名称
              customer: val.CUSTOMER_CODE, //已选用户
              beginTime: this.ksDataSet, //起始时间
              finishTime: this.jsDataSet, //结束时间
              limit: this.limit, //限制数
              page: this.currentPage, //页数
              status: this.myStatusCode //状态
            }
            sessionStorage.setItem("customerData", JSON.stringify(data));
      this.$router.push({
          name: "orderDetailsQuery",
          // params: {
          //   data: {
          //     customer: this.customer, //已选用户
          //     beginTime: ksTime, //起始时间
          //     finishTime: jsTime, //结束时间
          //     MONEYSUM:val.MONEYSUM,//提货总额
          //     CUSTOMER_NAME:val.CUSTOMER_NAME,//用户名称
          //     customer: val.CUSTOMER_CODE, //已选用户
          //     beginTime: this.ksDataSet, //起始时间
          //     finishTime: this.jsDataSet, //结束时间
          //     limit: this.limit, //限制数
          //     page: this.currentPage, //页数
          //     status: this.myStatusCode //状态
          //   }
          // }
        });
    },
    //     var data = {
    //       customer: this.customer, //已选用户
    //       beginTime: ksTime, //起始时间
    //       finishTime: jsTime, //结束时间
    //       limit: this.limit, //限制数
    //       page: this.currentPage, //页数
    //       status: this.myStatusCode //状态
    //     };
    //     sessionStorage.setItem("customerData", JSON.stringify(data));
    //     this.$router.push({
    //       name: "orderDetailsQuery"
    //     });
    //   }

    //计算表格末行
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        } else if (index == 9) {
          var values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = sums[index].toFixed(2);
            if (this.isManager == "0") sums[index] = "***";
          } else {
            sums[index] = "";
          }
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },

    //翻页获取订单
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryQuYu_1();
    },
    //重置
    clear() {
      this.checked = true
      this.CUSTOMERED=[]
      this.CUSTOMERED_1 = []
      this.moneySum=[]
      this.customer = []
      this.myStatus = "全部状态";
      (this.myStatusCode = ""),
        (this.ksData = ""),
        (this.jsData = "")
        let time = new Date()
        this.jsSet(time);
        this.ksSet(time);
        (this.customer_filter = ""),
        (this.customer = []),
        (this.myCustomerType = "客户类型"),
        (this.myCustomerTypeCode = ""),
        (this.myDistrict = "片区"), //市场状态
        (this.myDistrictId = ""),
        (this.district_name = []),
        (this.myArea = "市场"), //市场状态
        (this.myAreaCode = ""),
        (this.areaCode_name = []),
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
      this._getAreaCode();
    },

    //打开弹窗显示详情数据
    openDia(val) {
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
        this.detailVisible = true;
      });
    }
  }
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
  height: 25px;
  margin-left: 5px;
  text-align: left;
  padding-left: 17px;
  background-image: url("../../assetsorder/time-zk.png");
  background-repeat: no-repeat;
  background-position-x: 90px;
  background-position-y: 2vw;
  background-size: 14px;
}
.time_1 {
  font-size: 14px;
  width: 25%;
  height: 25px;
  margin-left: 5px;
  text-align: left;
  padding-left: 20px;
  background-image: url("../../assetsorder/time-zk.png");
  background-repeat: no-repeat;
  background-position-x: 95px;
  background-position-y: 2vw;
  background-size: 14px;
}
.choose {
  font-size: 14px;
  background: #8bc34a;
  height: 30px;
  line-height: 5px;
  color: rgb(255, 255, 255);
}
.button {
  font-size: 14px;
  background: #8bc34a;
  height: 31px;
  text-align: center;
  line-height: 4px;
  color: rgb(255, 255, 255);
}
.item_1 {
  top: 1px;
  width: 120px;
  height: 33px;
  background-color: hsl(0, 0%, 100%);
  border: none;
  font-size: 10px;
  line-height: 5px;
  text-align: center;
}
.stockQuery {
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
  height: 200px;
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
