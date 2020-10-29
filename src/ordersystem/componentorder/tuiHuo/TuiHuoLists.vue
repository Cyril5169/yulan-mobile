<template>
  <div class="bank">
    <top :top="set"></top>
    <span class="search-button" @click="getList()">查询</span>
    <div class="search">
      <ul class="ulhead" id="ulhead">
        <li class="licenter" @click="showks = true">
          <input
            class="time time-ks"
            type="text"
            v-model="ksDataSet"
            disabled
          />
        </li>
        <li>
          <span>至</span>
        </li>
        <li class="liright" @click="showjs = true">
          <input
            class="time time-js"
            type="text"
            v-model="jsDataSet"
            disabled
          />
        </li>
        <li class="licenter" @click="showType = true">
          <input class="time time-ks" type="text" v-model="myType" disabled />
        </li>
      </ul>
    </div>
    <div class="all-bank">
      <div
        class="single-bank"
        @click.stop="checkWt(index)"
        v-for="(singleBank, index) in allLists"
        :key="index"
      >
        <div class="single-title">
          <span class="single-title-left">编号：{{ singleBank.ID }}</span>
          <span class="single-title-right">{{ singleBank.STATE }}</span>
        </div>
        <table>
          <tr>
            <td>创建时间：</td>
            <td>{{ singleBank.CREATE_TS }}</td>
          </tr>
          <tr>
            <td>玉兰业务员：</td>
            <td>{{ singleBank.ERP_CREATORNAME }}</td>
          </tr>
          <tr>
            <td>货品数：</td>
            <td>{{ singleBank.ITEM_COUNT }}</td>
          </tr>
        </table>
        <!-- <span class="single-details" @click.stop="checkWt(index)">查看详情</span> -->
      </div>
    </div>
    <!--<div class="createBank" @click="toCreateBank">+</div>-->
    <!--开始日期选择-->
    <van-popup v-model="showks" position="bottom">
      <van-datetime-picker
        v-model="ksData"
        type="date"
        title="选择时间"
        @confirm="confirmTimeks"
        @cancel="cancelTimeks"
      />
    </van-popup>
    <van-popup v-model="showjs" position="bottom">
      <van-datetime-picker
        class="reset"
        v-model="jsData"
        type="date"
        title="选择时间"
        @confirm="confirmTimejs"
        @cancel="onCancelType"
      />
    </van-popup>
    <!--状态选择-->
    <van-popup v-model="showType" position="bottom">
      <van-picker
        show-toolbar
        title="状态"
        :columns="orderType"
        @confirm="onConfirmType"
        @cancel="onCancelType"
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
import { DatetimePicker, Popup, Picker, Pagination, Toast } from "vant";
import { GetAllCompensation } from "@/api/paymentASP";

export default {
  name: "bank",
  data() {
    return {
      set: 84,
      ksData: "",
      ksDataSet: "", //  开始时间
      showks: false, //开始时间组件显示
      showjs: false, //结束时间组件显示
      jsData: "",
      jsDataSet: "", //结束时间
      myType: "客户确认中", //当前状态
      myTypeCode: "",
      showType: false, //状态选择显示
      orderType: ["客户确认中", "客户同意", "客户不同意"],
      //当前页数
      currentPage: 1,
      //总记录数
      totalLists: 0,
      //每页记录数
      itemsPerPage: 10,
      //总页数
      totalPage: 0,
      allLists: [],
    };
  },
  components: {
    top,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Pagination.name]: Pagination,
    [Toast.name]: Toast,
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
      if (current_month < 10) {
        current_month = "0" + current_month;
      }
      if (current_date < 10) {
        current_date = "0" + current_date;
      }
      this.ksDataSet = current_year + "-" + current_month + "-" + current_date;
      this.ksData = time;
    },
    //初始化结束时间
    jsSet(time) {
      let current_date = time.getDate();
      let current_month = time.getMonth() + 1;
      let current_year = time.getFullYear();
      if (current_month < 10) {
        current_month = "0" + current_month;
      }
      if (current_date < 10) {
        current_date = "0" + current_date;
      }
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
      // this.orderSearch()
      this.showType = false;
    },
    onCancelType() {
      this.showType = false;
    },
    //  获取列表
    getList() {
      this.allLists = [];
      if (this.myType == "客户同意") {
        this.myTypeCode = "APPROVED";
      } else if (this.myType == "客户不同意") {
        this.myTypeCode = "CANCELED";
      } else if (this.myType == "客户确认中") {
        this.myTypeCode = "CUSTOMERAFFIRM";
      }
      let ksTime;
      let jsTime;
      if (this.ksDataSet === "起始时间") {
        ksTime = "0001/1/1";
      } else {
        ksTime = this.ksDataSet;
      }
      if (this.jsDataSet === "结束时间") {
        jsTime = "9999/12/31";
      } else {
        jsTime = this.jsDataSet + " 23:59:59";
      }
      let obj = {
        CID: this.$store.getters.getCId, //客户ID
        page: this.currentPage, //第几页
        number: 8, //一页有多少数据
        startDate: ksTime, //开始日期
        endDate: jsTime, //结束日期
        state: this.myTypeCode, //状态
        createName: "", //创建者名称
        cName: "", //客户名称
        itemNo: "", //产品号
      };
      GetAllCompensation(obj).then((res) => {
        this.allLists = res.data;
        this.totalLists = res.count;
        //获取总页数
        this.totalPage = Math.ceil(this.totalLists / 8);
        if (this.allLists.length == 0) {
          Toast({
            message: "暂无该状态退货赔偿书",
            duration: 2000,
          });
        } else {
          for (let i = 0; i < this.allLists.length; i++) {
            switch (this.allLists[i].STATE) {
              case "APPROVED":
                this.allLists[i].STATE = "客户同意";
                continue;
              case "CANCELED":
                this.allLists[i].STATE = "客户不同意";
                continue;
              case "CUSTOMERAFFIRM":
                this.allLists[i].STATE = "客户确认中";
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
      if (M < 10) {
        M = "0" + M;
      }
      if (D < 10) {
        D = "0" + D;
      }
      return Y + M + D;
    },
    changePage() {
      this.getList();
    },
    //  查看详情
    checkWt(index) {
      this.$router.push({
        name: "tuihdetails",
        params: {
          id: this.allLists[index].ID,
          state: this.allLists[index].STATE,
        },
      });
    },
  },
  created() {
    let time = new Date();
    this.jsSet(time);
    this.ksSet(time);
    this.getList();
  },
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
  bottom: 7px;
  right: 10px;
  background: #89cb81;
  color: white;
  padding: 5px 15px;
  border-radius: 15px;
}
</style>
