<template>
  <div class="lanju">
    <top :top="set"></top>
    <div class="search">
      <ul class="ulhead" id="ulhead">
        <li class="licenter" @click="showks = true">
          <input class="time time-ks" type="text" v-model="ksDataSet" disabled />
        </li>
        <li class="liright" @click="showjs = true">
          <input class="time time-js" type="text" v-model="jsDataSet" disabled />
        </li>
        <li class="licenter" @click="showType = true">
          <input class="statusBar" type="text" v-model="myType" disabled />
        </li>
      </ul>
      <ul class="ulhead2" id="ulhead2">
        <li >
          <div style="height:31px;margin-top:7px" >
            <van-cell-group style="height:31px;">
               <input  class="searchInput" type="text" v-model="selectCreator" placeholder="请输入创建者姓名" />
            </van-cell-group>
          </div>
        </li>
        <li >
          <div style="height:31px;margin-top:7px" >
            <van-cell-group style="height:31px;">
               <input  class="searchInput" type="text" v-model="selectItemNo" placeholder="请输入产品型号" />
            </van-cell-group>
          </div>
        </li>
      </ul>
      <ul class="ulhead3" id="ulhead3">
        <li>
          <span class="search-button"  @click="clear() ">重置</span>
        </li>
        <li>
          <span class="search-button"  @click="getList()">查询</span>
        </li>
      </ul>
    </div>

    <div class="tableData">
      <div
        class="singleData"
        @click="checkDetails(index)"
        v-for="(item,index) in allLists"
        :key="index"
      >
        <div class="single-title">
          <span class="single-title-left">单据号：{{item.ID}}</span>
          <span class="single-title-right">{{item.STATUS|statusTrans}}</span>
        </div>
        <table>
          <tr>
            <td>创建者</td>
            <td>{{item.ERP_CREATORNAME}}</td>
          </tr>
          <tr>
            <td>产品型号</td>
            <td>{{item.ITEM_NO}}</td>
          </tr>
          <tr>
            <td>产品名称</td>
            <td>{{item.PRODUCTION_VERSION}}</td>
          </tr>
          <tr>
            <td>货品数</td>
            <td>{{item.ITEM_COUNT}}</td>
          </tr>
        </table>
      </div>
    </div>
    <!--开始日期选择-->
    <van-popup v-model="showks" position="bottom">
      <van-datetime-picker
        v-model="ksData"
        type="date"
        :show-toolbar="true"
        :title="'选择时间'"
        @confirm="confirmTimeks"
        @cancel="cancelTimeks"
      />
    </van-popup>
    <van-popup v-model="showjs" position="bottom">
      <van-datetime-picker
        class="reset"
        v-model="jsData"
        type="date"
        :title="'选择时间'"
        @confirm="confirmTimejs"
         @cancel="cancelTimejs"
      />
    </van-popup>
    <!--状态选择-->
    <van-popup v-model="showType" position="bottom">
      <van-picker show-toolbar title="单据状态" :columns="statusArray" @confirm="onConfirmType"  @cancel="onCancelType"/>
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
import { GetUserCompensation } from "@/api/newRefundASP";
import Vue from "vue";
import {
  DatetimePicker,
  Popup,
  Picker,
  Pagination,
  Toast,
  Loading,
  Field,
  CellGroup
} from "vant";
Vue.use(Field);

export default {
  name: "newRefund",
  data() {
    return {
      set: 103,
      ksData: "",
      ksDataSet: "", //  开始时间
      searchKey: "", //搜索栏关键字
      showks: false, //开始时间组件显示
      showjs: false, //结束时间组件显示
      jsData: "",
      jsDataSet: "", //结束时间
      myType: "全部状态", //当前状态
      myTypeCode: null,
      showType: false, //状态选择显示
      statusArray: ["全部状态", "已提交", "已接收", "客户确认中","客户同意"],
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
      selectCreator:"",
      selectItemNo:"",
    };
  },
  components: {
    top,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Pagination.name]: Pagination,
    [Toast.name]: Toast,
    [Loading.name]: Loading,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup
  },
  filters: {
    statusTrans(value){
      switch (value) {
        case null:
          return "";
          break;
        case "SUBMITTED":
          return "已提交";
          break;
        case "RECEIVE":
          return "已接收";
          break;
        case "CUSTOMERAFFIRM":
          return "客户确认中";
          break;
        case "APPROVED":
          return "客户同意";
          break;
      }
    },
  },
  methods: {
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
        this.myTypeCode = null;
      } else if (this.myType == "已提交") {
        this.myTypeCode = "SUBMITTED";
      } else if (this.myType == "已接收") {
        this.myTypeCode = "RECEIVE";
      } else if (this.myType == "客户确认中") {
        this.myTypeCode = "CUSTOMERAFFIRM";
      }else if (this.myType == "客户同意") {
        this.myTypeCode = "APPROVED";
      }
      this.showType = false;
    },
    onCancelType() {
      this.showType = false;
    },
    //获取用户的退货赔偿信息
    getList() {
      this.allLists = [];
      this.loading = true;
      let ksTime;
      let jsTime;
      if (this.ksDataSet === "起始时间") {
        ksTime = "0001-1-1 00:00:00";
      } else {
        ksTime = this.ksDataSet + " 00:00:00";
      }
      if (this.jsDataSet === "结束时间") {
        jsTime = "";
      } else {
        jsTime = this.jsDataSet + " 23:59:59";
      }
      let data = {
        CID: this.$store.getters.getCId,
        page: this.currentPage, //第几页
        number: 10,//一页有多少数据
        startDate: ksTime, //开始日期
        endDate: jsTime, //结束日期
        state: this.myTypeCode, //状态
        createName: this.selectCreator, //创建者名称
        itemNo: this.selectItemNo //产品号
      };
      GetUserCompensation(data).then(res => {
        this.loading = false;
        if (res.count == 0) {
          return;
        }
        this.totalLists = res.count;
        //获取总页数
        this.totalPage = Math.ceil(res.count / 10);
        this.allLists = res.data;
        if (this.allLists.length == 0) {
          Toast({
            message: "暂无数据",
            duration: 2000
          });
        } else {
        }
      });
    },
    changePage() {
      this.getList();
    },
    //查看详情
    checkDetails(index) {
        this.$router.push({
           name: "newRefundDetail",
           params: {
              ID: this.allLists[index].ID, //单据号
              STATE: this.allLists[index].STATE, //状态
           }
        });
    },
    //重置
    clear() {
      this.myType = "全部状态";
      this.myTypeCode = null;
      this.ksData = "";
      this.ksDataSet = "起始时间"; //  开始时间
      let time = new Date();
      this.jsData = "";
      this.jsSet(time); //结束时间
      this.selectCreator = "";
      this.selectItemNo = "";
    }
  },
  created() {
    let time = new Date();
    this.jsSet(time);
    this.ksSet(time);
    this.getList();
  }
};
</script>

<style scoped>
.lanju {
  background-color: rgb(239, 239, 239);
  height: 100vh;
  position: relative;
  overflow: scroll;
}
.createRecord {
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
.searchInput{
  height:25px;
  font-size:13px;
  padding:5px;
  position: relative;
  top: -3px;
}
.search-button {
  color: #a0cb8d;
  font-size: 13px;
  padding: 5px 20px;
  border-radius: 15px;
  background: white; 
  z-index: 99;
  position: relative;
  top: 3px;
}
.search_1 {
  position: relative;
  top: 35px;
}

#ulhead {
  position: fixed;
  top: 50px;
  line-height: 37px;
  width: 100%;
  height: 38px;
  /*font-size: 15px;*/
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  font-size: 15px;
  z-index: 999;
}

#ulhead2 {
  position: fixed;
  top: 88px;
  line-height: 37px;
  width: 100%;
  height: 45px;
  /*font-size: 15px;*/
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  font-size: 15px;
  z-index: 999;
}

#ulhead3 {
  position: fixed;
  top: 128px;
  line-height: 34px;
  width: 100%;
  height: 40px;
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
  width: 95px;
  height: 20px;
  line-height: 20px;
  background-color: hsl(0, 0%, 100%);
  font-size: 13px;
  border: none;
  padding-left: 15px;
  text-align: left;
  background-image: url("../../assetsorder/time-zk.png");
  background-repeat: no-repeat;
  background-position-x: 85px;
  background-position-y: 1vw;
  background-size: 15px;
}
.statusBar {
  width: 110px;
  height: 20px;
  line-height: 20px;
  background-color: hsl(0, 0%, 100%);
  font-size: 13px;
  border: none;
  padding-left: 15px;
  text-align: left;
  background-image: url("../../assetsorder/time-zk.png");
  background-repeat: no-repeat;
  background-position-x: 105px;
  background-position-y: 1vw;
  background-size: 15px;
}
.searchKeyStyle {
  width: 130px;
  height: 20px;
  line-height: 20px;
  background-color: hsl(0, 0%, 100%);
  font-size: 13px;
  border: none;
  padding-left: 15px;
  text-align: left;
  background-position-x: 125px;
  background-position-y: 1vw;
  background-size: 15px;
}
.button {
  background: #8bc34a;
  height: 33px;
  text-align: center;
  line-height: 5px;
  color: rgb(255, 255, 255);
}
.tableData {
  margin: 176px 10px 100px;
}
.tableData td,
.tableData th {
  text-align: left;
}
.singleData {
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
