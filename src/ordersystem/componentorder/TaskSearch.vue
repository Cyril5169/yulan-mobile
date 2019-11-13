<template>
  <div class="all-view">
    <top :top="set"></top>
    <!-- <div class="monthSel" @click="selTime">{{thisyear}}/{{thismonth}}</div> -->
    <ul class="ulhead">
      <li class="licenter" @click="showks = true">
        <input class="time time-ks" type="text" v-model="ksDataSet" disabled />
      </li>
      <li>
        <span>至</span>
      </li>
      <li class="liright" @click="showjs = true">
        <input class="time time-js" type="text" v-model="jsDataSet" disabled />
      </li>
      <li class="liright">
        <span class="search-button" @click="taskSear()">查询</span>
      </li>
    </ul>
    <div class="task-title" v-if="assignments">
      <span>总月任务：{{assignments.ASSIGNMENTS}}元</span>
      <span style="color:red;">总促销目标任务：{{assignments.ASSIGNMENTS_TARGET}}元</span>
      <span style="color:red;">完成差额：{{assignments.assignmentsReduce}}元</span>
    </div>
    <div class="alllists" v-if="taskResult">
      <div class="singleItem" v-for="(taskItem,index) in taskResult" :key="index">
        <table>
          <tr>
            <td>时间：</td>
            <td>{{taskItem.WEB_TJ_TIME}}</td>
          </tr>
          <tr>
            <td>订单号：</td>
            <td>{{taskItem.ORDER_NO}}</td>
          </tr>
          <tr>
            <td>订单金额：</td>
            <td>{{taskItem.sumMoney}}（元）</td>
          </tr>
          <tr>
            <td>年返利/月返利：</td>
            <td>{{taskItem.ALLBACK_Y}}/{{taskItem.ALLBACK_M}}（元）</td>
          </tr>
          <tr>
            <td>实付金额：</td>
            <td>{{taskItem.ALL_SPEND}}（元）</td>
          </tr>
          <tr>
            <td>返利金额：</td>
            <td>{{taskItem.REBATE_MONEY}}（元）</td>
          </tr>
          <tr>
            <td>备注：</td>
            <td>{{taskItem.REBATE_NOTES}}</td>
          </tr>
        </table>
        <span class="order-state">{{taskItem.STATUS_ID | transStatus}}</span>
      </div>
    </div>
    <div class="total-bottom" v-if="taskResult.length>0">
      <span>订单总金额:{{totalMoney}}元</span>
      <span>年返利使用金额:{{totalRebateY}}元</span>
      <span>月返利使用金额:{{totalRebateM}}元</span>
      <span>实付总金额:{{totalPay}}元</span>
      <span>返利总金额:{{totalRebateAll}}元</span>
    </div>
    <!--选择时间-->
    <van-popup v-model="showks" position="bottom">
      <van-datetime-picker
        v-model="ksData"
        type="year-month"
        :formatter="formatter"
        title="开始时间"
        @confirm="confirmTimeks"
        @cancel="cancelTimeks"
      />
    </van-popup>
    <van-popup v-model="showjs" position="bottom">
      <van-datetime-picker
        class="reset"
        v-model="jsData"
        type="year-month"
        :formatter="formatter"
        title="结束时间"
        @confirm="confirmTimejs"
        @cancel="cancelTimejs"
      />
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
import top from "../../components/Top";
import { DatetimePicker, Popup } from "vant";
import { GetTaskProgress } from "@/api/orderListASP";

export default {
  name: "tasksearch",
  components: {
    top,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup
  },
  data() {
    return {
      set: 29,
      showtime: false,
      currentDate: new Date(),
      thisyear: new Date().getFullYear(),
      thismonth: new Date().getMonth() + 1,
      taskResult: {},
      ksData: "",
      ksDataSet: "", //  开始时间
      showks: false, //开始时间组件显示
      showjs: false, //结束时间组件显示
      jsData: "",
      jsDataSet: "", //结束时间
      assignments: [],
      totalMoney: 0,
      totalRebateY: 0,
      totalRebateM: 0,
      totalPay: 0,
      totalRebateAll: 0
    };
  },
  filters: {
    transStatus: function(value) {
      switch (value) {
        case "0":
          return "窗帘待审核";
          break;
        case "1":
          return "已提交";
          break;
        case "12":
          return "已接收";
          break;
        case "2":
          return "已受理";
          break;
        case "3":
          return "已作废";
          break;
        case "4":
          return "部分发货";
          break;
        case "5":
          return "余额不足待提交";
          break;
        case "6":
          return "余额不足可提交";
          break;
        case "7":
          return "已完成";
          break;
      }
    }
  },
  methods: {
    //开始时间选择
    confirmTimeks(value) {
      this.ksSet(this.ksData);
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
    //初始化结束时间
    jsSet(time) {
      let current_month = time.getMonth() + 1;
      let current_year = time.getFullYear();
      if (current_month < 10) {
        current_month = "0" + current_month;
      }
      this.jsDataSet = current_year + "-" + current_month;
      this.jsData = time;
    },
    //初始化开始时间
    ksSet(time) {
      let current_month = time.getMonth() + 1;
      let current_year = time.getFullYear();
      if (current_month < 10) {
        current_month = "0" + current_month;
      }
      this.ksDataSet = current_year + "-" + current_month;
      this.ksData = time;
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    },
    taskSear() {
      this.taskResult = {};
      if (!this.jsDataSet && !this.jsDataSet) return;
      let year = this.ksDataSet.slice(0, 4);
      let endYear = this.jsDataSet.slice(0, 4);
      let month = this.ksDataSet.slice(5, 7);
      let endMonth = this.jsDataSet.slice(5, 7);
      // if (this.thismonth < 10) {
      //   this.thismonth = "0" + this.thismonth;
      // }
      // let url = this.orderBaseUrl + "/assignments/getAssignments.do";
      let data = {
        companyId: this.$store.getters.getCMId, //客户号
        year: year, //年份
        endYear: endYear,
        month: month, //月份
        endMonth: endMonth
      };
      //axios.post(url, data).then(res => {
      GetTaskProgress(data).then(res => {
        let zoom = res.data[0].orders;
        let reduce = 0;
        for (let i = 0; i < zoom.length; i++) {
          zoom[i].sumMoney =
            zoom[i].ALL_SPEND + zoom[i].ALLBACK_Y + zoom[i].ALLBACK_M;
          reduce += zoom[i].ALL_SPEND;
        }
        this.taskResult = zoom;
        if (res.data[0].assignments) {
          this.assignments = res.data[0].assignments;
          this.assignments.assignmentsReduce = (
            this.assignments.ASSIGNMENTS_TARGET - reduce
          ).toFixed(2);
        } else {
          this.assignments = [];
        }
        this.totalMoney = 0;
        this.totalRebateY = 0;
        this.totalRebateM = 0;
        this.totalPay = 0;
        this.totalRebateAll = 0;
        if (this.taskResult.length > 0) {
          for (var i = 0; i < this.taskResult.length; i++) {
            this.totalMoney += this.taskResult[i].sumMoney;
            this.totalRebateY += this.taskResult[i].ALLBACK_Y;
            this.totalRebateM += this.taskResult[i].ALLBACK_M;
            this.totalPay += this.taskResult[i].ALL_SPEND;
            this.totalRebateAll += this.taskResult[i].REBATE_MONEY;
          }
          this.totalMoney = this.totalMoney.toFixed(2);
          this.totalRebateY = this.totalRebateY.toFixed(2);
          this.totalRebateM = this.totalRebateM.toFixed(2);
          this.totalPay = this.totalPay.toFixed(2);
          this.totalRebateAll = this.totalRebateAll.toFixed(2);
        }
      });
    },
    //时间选择
    selTime() {
      this.showtime = true;
    },
    confirmTime(val) {
      this.showtime = false;
      this.thismonth = val.getMonth() + 1;
      this.thisyear = val.getFullYear();
      this.taskSear();
    },
    cancelTime() {
      this.showtime = false;
    }
  },
  created() {
    let time = new Date();
    this.jsSet(time);
    this.ksSet(time);
    this.taskSear();
  }
};
</script>

<style scoped>
.ulhead {
  position: fixed;
  top: 50px;
  line-height:37px;
  width: 100%;
  height: 37px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 15px;
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
.time {
  width: 90px;
  height: 20px;
  line-height: 20px;
  background-color: hsl(0, 0%, 100%);
  font-size: 13px;
  border: none;
  padding-left: 15px;
  text-align: left;
  background-image: url("../assetsorder/time-zk.png");
  background-repeat: no-repeat;
  background-position-x: 80px;
  background-position-y: 1vw;
  background-size: 15px;
}
.search-button {
  color: #a0cb8d;
  font-size: 13px;
  padding: 5px 20px;
  border-radius: 15px;
  background: white;
}
.all-view {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
}

.monthSel {
  position: fixed;
  right: 10px;
  top: 14px;
  z-index: 999;
  width: 80px;
  height: 20px;
  line-height: 20px;
  background: #e9e9e9 url("../assetsorder/time-zk.png") no-repeat 70px;
  background-size: 15px;
  border-radius: 10px;
  font-size: 13px;
  padding-right: 10px;
}

.timesel .van-popup {
  width: 280px;
  border-radius: 5px;
}

.task-title {
  position: fixed;
  top: 87px;
  height: 30px;
  line-height: 30px;
  width: 100%;
  display: -webkit-box;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  background: #ffffff;
  border-bottom: 1px solid #dedede;
  font-size: 11px;
}

.task-title span {
  margin: 0 2px;
  width: 70px;
}
.alllists {
  position: fixed;
  top: 117px;
  bottom: 30px;
  width: 100%;
  background: #f8f8f8;
  overflow-y: scroll;
}
.singleItem {
  position: relative;
  background: white;
  border-radius: 10px;
  margin: 10px;
  font-size: 14px;
  padding: 5px 12px;
}
.singleItem td {
  text-align: left;
}
.order-state {
  position: absolute;
  top: 5px;
  right: 12px;
  color: #ff5227;
}
.total-bottom {
  position: fixed;
  bottom: 0;
  padding: 5px;
  height: 30px;
  width: 100%;
  display: -webkit-box;
  white-space: nowrap;
  background: #89cb81;
  font-size: 11px;
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}
.total-bottom span {
  margin: 0 3px;
}
</style>
