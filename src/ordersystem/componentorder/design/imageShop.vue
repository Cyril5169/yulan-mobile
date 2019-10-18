<template>
  <div class="bank">
    <top :top="set"></top>
    <span class="search-button" @click="search()">查询</span>
    <div class="search">
      <ul class="ulhead" id="ulhead">
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
    <div class="all-bank">
      <!-- 列表 -->
      <div class="single-bank" v-for="imageStoreList in imageStoreData">
        <div class="single-title">
          <span class="single-title-left">申请单号：{{imageStoreList.ID}}</span>
          <span class="single-title-right">{{imageStoreList.STATUS|transStatus}}</span>
        </div>
        <table>
          <tr>
            <td style="width:40%">申请人:</td>
            <td>{{imageStoreList.CREATER}}</td>
          </tr>
          <tr>
            <td >申请时间:</td>
            <td>{{imageStoreList.DATE_CRE|datatrans}}</td>
          </tr>
          <tr>
            <td>店面形式:</td>
            <td>{{imageStoreList.STORE_FORM|formTrans}}</td>
          </tr>
          <tr>
            <td>店面面积(m2):</td>
            <td>{{imageStoreList.STORE_AREA}}</td>
          </tr>
          <tr>
            <td>层数:</td>
            <td>{{imageStoreList.STORE_PLIE}}</td>
          </tr>
          <tr>
            <td>计划动工时间:</td>
            <td>{{imageStoreList.PLAN_DATE | datatrans}}</td>
          </tr>
          <tr>
            <td>上门测量:</td>
            <td><span v-if="imageStoreList.MEASURE == 1">是</span>
            <span v-else>否</span></td>
          </tr>
          <tr>
            <td>付款凭证:</td>
            <td>{{imageStoreList.PAYMENT}}</td>
          </tr>
        </table>
        <span class="order-state" @click="checkDetail(imageStoreList)">查看详情</span>
      </div>
    </div>
        <!--形象店详情-->
    <van-popup v-model="showDetail" position="bottom" closeable :style="{ height: '75%' }">
      <van-panel>
        <!-- 编辑区 -->
      <div class="table-c">
        <h2 style="text-align:center;margin-bottom:10px;">
          形象店建设申请表
        </h2>
        <h3>
          提交时间：{{ tableData.DATE_CRE | datatrans }}
        </h3>
        <h3
          v-if="
              (tableData.STATUS == 2 ||
                tableData.STATUS == 3 ||
                tableData.STATUS == 5)
          "
        >
          市场部确认时间：{{
            tableData.DATE_ENTER | datatrans
          }}&nbsp;&nbsp;&nbsp;&nbsp;<span v-if="tableData.ENTER_SUG"
            >审核意见：{{ tableData.ENTER_SUG }}</span
          >
        </h3>
        <h3 v-if="tableData.STATUS == 3">
          广美确认时间：{{
            tableData.DATE_PASS | datatrans
          }}&nbsp;&nbsp;&nbsp;&nbsp;<span v-if="tableData.PASS_SUG"
            >审核意见：{{ tableData.PASS_SUG }}</span
          >
        </h3>
        <h3 v-if="tableData.STATUS == 4">
          市场部退回时间：{{
            tableData.DATE_ENTER | datatrans
          }}&nbsp;&nbsp;&nbsp;&nbsp;退回原因：{{ tableData.ENTER_SUG }}
        </h3>
        <h3 v-if="tableData.STATUS == 5">
          广美退回时间：{{
            tableData.DATE_PASS | datatrans
          }}&nbsp;&nbsp;&nbsp;&nbsp;退回原因：{{ tableData.PASS_SUG }}
        </h3>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="25%" class="grayTD" colspan="1" rowspan="5" border="0px">
              基本信息
            </td>
            <td width="15%" class="grayTD" colspan="1"  style="height:28px;width:30%">
              客户名称
            </td>
            <td style="height:28px;width:50%">{{ tableData.CUSTOMER_NAME }}</td>
          </tr>
            
          
           <tr> 
             <td class="grayTD" colspan="1" style="height:28px">年销售任务</td>
            <td style="height:28px;">
              <van-field
                :disabled="EDITorCHECK"
                placeholder="（客户填写）"
                clearable
                class="inputStyle"
                size="mini"
                
                v-model="tableData.SALE_TARGET"
              ></van-field>
            </td>
          </tr>
          <tr>
            <td class="grayTD" colspan="1" style="height:28px;">
              店面地址<span style="color:red;">*</span>
            </td>
            <td style="height:28px;">
              <van-field
                :disabled="EDITorCHECK"
                placeholder="（客户必填）"
                clearable
                class="inputStyle"
                size="mini"
                v-model="tableData.STORE_ADDRESS"
              ></van-field>
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="width:17%;height:28px;">
              联系人
            </td>
            <td style="width:27%;height:28px;">
              {{ tableData.CUSTOMER_AGENT }}
            </td>
          </tr>
          <tr><td class="grayTD" colspan="1" style="width:17%;height:28px;">
              联系电话
            </td>
            <td style="width:27%;height:28px;">
              {{ tableData.OFFICE_TEL }}
            </td>
          </tr>

          <tr>
            <td
              class="grayTD"
              colspan="1"
              rowspan="3"
              border="0px"
              style="height:28px;"
            >
              店面信息
            </td>
            <td class="grayTD" colspan="1" style="height:28px;">
              店面形式<span style="color:red;">*</span>
            </td>
            <td colspan="3" style="text-align:center;height:28px;">
                {{tableData.STORE_FORM|formTrans}}
            </td>
            </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:28px;">
              店面面积(㎡)<span style="color:red;">*</span>
            </td>
            <td colspan="1" style="height:28px;">
              <van-field
                :disabled="EDITorCHECK"
                style="width:65%"
                placeholder="（客户必填）"
                clearable
                class="inputStyle"
                size="mini"
                oninput="value=value.replace(/[^\d.]/g,'')
                                .replace(/^\./g, '').replace(/\.{2,}/g, '.')
                                .replace('.', '$#$').replace(/\./g, '')
                                .replace('$#$', '.')
                                .slice(0,value.indexOf('.') === -1? value.length: value.indexOf('.') + 3)"
                v-model="tableData.STORE_AREA"
              ></van-field>
              
            </td></tr> 

           <tr><td class="grayTD" colspan="1" style="height:28px;">
              层数<span style="color:red;">*</span>
            </td>
            <td colspan="1" style="height:28px;">
              <van-field
                :disabled="EDITorCHECK"
                placeholder="（客户必填）"
                clearable
                class="inputStyle"
                size="mini"
                oninput="value=value.replace(/[^\d.]/g,'')
                                .replace(/^\./g, '').replace(/\.{2,}/g, '.')
                                .replace('.', '$#$').replace(/\./g, '')
                                .replace('$#$', '.')
                                .slice(0,value.indexOf('.') === -1? value.length: value.indexOf('.') + 3)"
                v-model="tableData.STORE_PLIE"
              ></van-field>
            </td>
          </tr>

          <tr>
            <td
              class="grayTD"
              colspan="1"
              rowspan="5"
              border="0px"
              style="height:28px;"
            >
              设计需求
            </td>
            <td class="grayTD" colspan="1" style="height:28px;">
              计划动工时间<span style="color:red;">*</span>
            </td>
            <td style="text-align:center;height:28px;">
                {{tableData.PLAN_DATE|datatrans}}
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:30px;">
              实施形式<span style="color:red;">*</span>
            </td>
            <td  style="text-align:center;height:45px;">

                {{tableData.IMPLEMENTTATION_FORM|formTrans2}}
             
            </td>
          </tr>

          <tr>
            <td class="grayTD" colspan="1" >
              是否需要上门测量
            </td>
            <td colspan="1" >
             <span v-if="tableData.MEASURE == 1">是</span>
            <span v-else>否</span>
              <div style="font-size:12px;color:gray">
              (*仅100%按公司设计方案落地客户可预约上门测量，并需承担上门人员食宿费用，
              如后期未100%按效果图实施，需承担上门人员交通费用。)
            </div>
            </td> 
           
          </tr>

          <tr>
            <td class="grayTD" colspan="1" style="height:50px">其他需求说明</td>
            <td  style="height:50px">
              
            </td>
          </tr>

          <tr>
            <td class="grayTD" style="height:14px;">
              附件<span style="color:red;">*</span>
            </td>
            <td style="height:14px;"></td>
          
          </tr>

          <tr>
            <td class="grayTD" colspan="1" border="0px" style="height:28px;">
              付款信息
            </td>
            <td class="grayTD" colspan="1" style="height:28px;">
              付款凭证<span style="color:red;">*</span>
            </td>
            <td style="height:28px;">{{tableData.PAYMENT}}</td>
            <!-- <td colspan="3" style="text-align:left;height:28px;">
              <el-select
                v-if="!EDITorCHECK"
                style="width:500px;"
                v-model="tableData.PAYMENT"
                filterable
                placeholder="请选择汇款凭证"
              >
                <el-option
                  v-for="item in bankData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <span v-else style="margin-left:20px;">{{
                tableData.PAYMENT
              }}</span>
            </td> -->
          </tr>

          <tr>
            <td border="0px" colspan="2" style="text-align:left;height:28px;">
              <span style="margin-left:10px;">责任人签字：</span>
            </td>
            <td ></td>

            </tr>
            <tr><td colspan="2" style="text-align:left;height:28px;">
              <span v-if="!EDITorCHECK" style="margin-left:10px;"
                >日期：{{ new Date().getTime() | datatrans }}</span
              >
              <span v-else style="margin-left:10px;"
                >日期：{{ tableData.DATE_CRE | datatrans }}</span
              >
            </td>
            <td colspan="2"></td>
          </tr>
          <tr style="height:60px">
            <td
              colspan="5"
              border="0px"
              style="font-size:13px;color:gray;text-align:left"
            >
              1.请提前15个工作日提交设计需求申请。<br />
              2.请附上店面平面图（清晰标注尺寸以及消防位等障碍位置）。<br />
              3.硬装部分由客户自行落地。<br />
              4.公司物料配置包含标识、展具、上样、情景四大模块，根据成本清单提供40%建店支持（不包含硬装）。以实用面积为100平店面测算出软装包成本约2700元/m²，店面面积越大，每平方价格相应降低。<br />
              5.申请2.0形象店设计需交10000元设计落地保证金，落地后抵扣软装包款项，如未100%按设计落地，保证金不予返还。<br />
            </td>
          </tr>
        </table>

      </div>
      </van-panel>
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
      <van-picker show-toolbar title="请选择状态" :columns="STATUS" @confirm="onStatus" />
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
        @change="handleCurrentChange"
      />
    </div>
    <van-loading class="loading" type="spinner" v-if="loading" color="black" />
  </div>
</template>

<script>
import axios from "axios";
import top from "../../../components/Top";
import {
  GetImageCustomer,
  InsertImageStore,
  EditImageStore,
  DeleteImageStore,
  UploadFiles
} from "@/api/imageStoreASP";
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
  Search,
  Radio,
  RadioGroup,
} from "vant";
export default {
  name: "areaQuery",
  data() {
    return {
      bankData: [],
      EDITorCHECK:false,
      fileList : [],
      fileListGM : [],
      showDetail:false,
      imageStoreData: [],
      myStatus: "全部状态",
      myStatusCode: "",
      ksData: "",
      ksDataSet: "起始时间", //  开始时间
      jsData: "",
      jsDataSet: "结束时间", //结束时间
      activeIndex: 0,
      showType_4: false,
      showType_5: false,
      showType_6: false,
      set: 100,
      loading: false,
      detailVisible: false,
      startDate: "",
      endDate: "",
      first: "",
      second: "",
      query_1: false, //查询显示
      query_2: false,
      limit: 8,
      count: 0,
      tableData: [],
      STATUS: [
        "全部状态",
        "已提交",
        "市场部确认",
        "广美确认",
        "市场部退回",
        "广美退回",
      ],
      status_info: "",
      //当前页数
      currentPage: 1,
      //总记录数
      totalLists: 0,
      //每页记录数
      itemsPerPage: 8,
      //总页数
      totalPage: 0,
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
    [DatetimePicker.name]: DatetimePicker,
    [Radio.name]:Radio,
    [RadioGroup.name]:RadioGroup,
  },
  filters: {
    transStatus(value) {
      switch (value) {
        case 0:
          return "待提交";
          break;
        case 1:
          return "已提交";
          break;
        case 2:
          return "市场部确认";
          break;
        case 3:
          return "广美确认";
          break;
        case 4:
          return "市场部退回";
          break;
        case 5:
          return "广美退回";
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
    formTrans(value) {
      switch (value) {
        case "street":
          return "街边店";
          break;
        case "market":
          return "商城店";
          break;
      }
    },
    formTrans2(value) {
      switch (value) {
        case 1:
          return "公司方案";
          break;
        case 2:
          return "自行落地";
          break;
      }
    },
  },
  //生命周期
  created() {
    this.search();
    let time = new Date();
    this.jsSet(time);
    this.ksSet(time);
  },
  methods: {
    //查看列表详情
    checkDetail(tab) {
      this.fileList = [];
      this.fileListGM = [];
      this.tableData = JSON.parse(JSON.stringify(tab));
      var list = this.tableData.ATTACHMENT_FILE.split(";");
      for (var i = 0; i < list.length - 1; i++) {
        var index = list[i].lastIndexOf("/");
        var fileName = list[i].substr(index + 1);
        this.fileList.push({
          name: fileName,
          url: list[i]
        });
      }
      var listGM = this.tableData.GM_FILE.split(";");
      for (var i = 0; i < listGM.length - 1; i++) {
        var index = listGM[i].lastIndexOf("/");
        var fileName = listGM[i].substr(index + 1);
        this.fileListGM.push({
          name: fileName,
          url: listGM[i]
        });
      }
      this.showDetail = true;
    },
        //开始时间选择
    confirmTimeks(value) {
      this.ksSet2(this.ksData);
      this.showType_4 = false;
    },
    cancelTimeks() {
      this.showType_4 = false;
    },
    //结束时间选择
    confirmTimejs(value) {
      this.jsSet(this.jsData);
      this.showType_5 = false;
    },
    cancelTimejs() {
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
    //状态
    onStatus(value, index) {
      this.myStatus = value;
      if (this.myStatus == "全部状态") {
        this.myStatusCode = "";
      } else if (this.myStatus == "已提交") {
        this.myStatusCode = "1";
      } else if (this.myStatus == "市场部确认") {
        this.myStatusCode = "2";
      } else if (this.myStatus == "广美确认") {
        this.myStatusCode = "3";
      } else if (this.myStatus == "市场部退回") {
        this.myStatusCode = "4";
      } else if (this.myStatus == "广美退回") {
        this.myStatusCode = "5";
      } 
      this.showType_6 = false;
    },
    //状态搜索
    status_id(val) {
      this.status_info = val;
      this._queryQuYu_1();
    },
    //搜索
    search() {
      this.currentPage = 1;
      this.imageStoreData = [];
      this.getDetail();
    },
    getDetail() {
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
      let data = {
        companyId: this.$store.state.info.data.companyId, //公司id
        status: this.myStatusCode, //
        beginTime: ksTime, //起始时间
        finishTime: jsTime, //结束时间
        limit: this.limit, //限制数
        page: this.currentPage //页数
      };
      if (!data.beginTime) {
        data.beginTime = "0001/1/1";
      }
      if (!data.finishTime) {
        data.finishTime = "9999/12/31";
      } else {
        data.finishTime = data.finishTime + " 23:59:59";
      }
      GetImageCustomer(data).then(res => {
        this.totalLists = res.count;
        this.imageStoreData = res.data;
      });
    },
    // _getBankList() {
    //   let mlUrl_1 = this.capitalUrl + "/PaymentBill/getPayBills.do";
    //   if (this.beginTime == null) this.beginTime = "";
    //   if (this.finishTime == null) this.finishTime = "";
    //   let data = {
    //     cid: this.$store.getters.getCMId, //公司id
    //     state: "", //状态状态(SUBMITED（已提交）,PROCESED（已处理）,SENDBACK（退回）,CANCELED（作废）)
    //     beginTime: "", //起始时间
    //     finishTime: "", //结束时间
    //     limit: 100000, //限制数
    //     page: 1 //页数
    //   };
    //   axios.post(mlUrl_1, data).then(res => {
    //     for (var i = 0; i < res.data.length; i++) {
    //       this.bankData[i] = new Object();
    //       this.bankData[i].label =
    //         "流水号:" +
    //         res.data[i].id +
    //         " 付款账号：" +
    //         res.data[i].payerAccount +
    //         " 付款金额：" +
    //         res.data[i].payAmount;
    //       this.bankData[i].value = res.data[i].id;
    //     }
    //   });
    // },
    //翻页获取订单
    handleCurrentChange(val) {
      this.currentPage = val;
      this.imageStoreData = [];
      this.getDetail();
    },
    //提货单查询
    _queryQuYu_1() {
      this.currentPage = 1;
      this.queryQuYu_1();
    },
    queryQuYu_1() {
      // this.query_1 = true;
      // this.tableData = [];
      // let ksTime;
      // let jsTime;
      // if (this.ksDataSet === "起始时间") {
      //   ksTime = "";
      // } else {
      //   ksTime = this.ksDataSet;
      // }
      // if (this.jsDataSet === "结束时间") {
      //   jsTime = "";
      // } else {
      //   jsTime = this.jsDataSet;
      // }
      // if (this.customer.length == 0) {
      //   Toast({
      //     duration: 2000,
      //     message: "未选择用户"
      //   });
      // } else {
      //   var data = {
      //     customer: this.customer, //已选用户
      //     beginTime: ksTime, //起始时间
      //     finishTime: jsTime, //结束时间
      //     limit: this.limit, //限制数
      //     page: this.currentPage, //页数
      //     status: this.myStatusCode //状态
      //   };
      //   sessionStorage.setItem("customerData", JSON.stringify(data));
      //   this.$router.push({
      //     name: "orderDetailsQuery"
      //   });
      // }
      // this.$router.push("/QYTable");
    },
    //翻页获取订单
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryQuYu_1();
    },
  }
};
</script>

<style scoped>
.search_1 {
  position: relative;
  top: 35px;
}
.time {
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
  margin-top: 50px;
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
  background: #8bc34a;
  height: 33px;
  line-height: 5px;
  color: rgb(255, 255, 255);
}
.button {
  background: #8bc34a;
  height: 33px;
  text-align: center;
  line-height: 5px;
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
  height: 80px;
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
.all-bank {
  margin: 20px 10px 80px;
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
.table-c table {
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.table-c table td {
  border-left: 1px solid black;
  border-top: 1px solid black;
  height: 45px;
  text-align: center;
  font-size: 16px;
}
.bank {
  background-color: rgb(239, 239, 239);
  height: 100vh;
  position: relative;
  overflow: scroll;
}
</style>
