<template>
  <div>
    <top :top="set" ref="top"></top>
    <ul class="ulhead">
      <li @click="showks = true">
        <input class="time time-ks" type="text" v-model="ksDataSet" disabled />
      </li>
      <li>
        <span>至</span>
      </li>
      <li @click="showjs = true">
        <input class="time time-js" type="text" v-model="jsDataSet" disabled />
      </li>
    </ul>
    <ul class="ulheadNew">
      <li>
        <input
          class="searchInput"
          type="text"
          v-model="condition"
          placeholder="型号/旧型号"
        />
      </li>
      <li>
        <span class="search-button" @click="initSearch">查询</span>
      </li>
    </ul>
    <div class="alllists">
      <div class="singleItem" v-for="(item, index) in productData" :key="index">
        <table>
          <tr>
            <td>产品型号：</td>
            <td>{{ item.ITEM_NO }}</td>
            <td>旧型号：</td>
            <td>{{ item.OLD_ITEM_NO }}</td>
          </tr>
          <tr>
            <td>批号：</td>
            <td>{{ item.BATCH_PLAN }}</td>
            <td>销售工单号：</td>
            <td>{{ item.DJBH }}</td>
          </tr>
          <tr>
            <td>下单数量：</td>
            <td>{{ item.JHSL }}</td>
            <td>生产数量：</td>
            <td>{{ item.SCSL }}</td>
          </tr>
          <tr>
            <td>销售工单日期：</td>
            <td>{{ item.FDRQ | datatrans }}</td>
            <td>要求完工日期：</td>
            <td>{{ item.QHRQ | datatrans }}</td>
          </tr>
          <tr>
            <td>状态：</td>
            <td>{{ item.STATUS | transType }}</td>
          </tr>
        </table>
      </div>
    </div>
    <!--底部分页-->
    <div class="fy-contain">
      <van-pagination
        class="fy-bottom"
        v-model="currentPage"
        :page-count="totalPage"
        :total-items="totalLists"
        mode="simple"
        @change="searchData"
      />
    </div>
    <!--选择时间-->
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
  </div>
</template>

<script>
import { Loading, Pagination, Popup, DatetimePicker } from "vant";
import top from "../../../components/Top";
import { GetProductStatus } from "@/api/itemInfoASP";

export default {
  name: "productQuery",
  components: {
    top,
    [Loading.name]: Loading,
    [Pagination.name]: Pagination,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
  },
  data() {
    return {
      set: 106,
      productData: [],
      currentPage: 1,
      totalPage: 0,
      pageSize: 15,
      totalLists: 0,
      condition: "",
      ksData: "",
      ksDataSet: "起始时间", //  开始时间
      jsData: "",
      jsDataSet: "结束时间", //结束时间
      showks: false,
      showjs: false,
    };
  },
  filters: {
    transType(value) {
      switch (value) {
        case "0":
          return "待排产";
          break;
        case "1":
          return "已排产";
          break;
        case "2":
          return "生产中";
        case "3":
          return "完工";
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
    },
  },
  methods: {
    //初始化结束时间
    jsSet(time) {
      let current_date = time.getDate();
      let current_month = time.getMonth() + 1;
      let current_year = time.getFullYear();
      this.jsDataSet = current_year + "-" + current_month + "-" + current_date;
      this.jsData = time;
    },
    ksSet2(time) {
      let current_date = time.getDate();
      let current_month = time.getMonth() + 1;
      let current_year = time.getFullYear();
      this.ksDataSet = current_year + "-" + current_month + "-" + current_date;
      this.ksData = time;
    },
    //初始化开始时间
    ksSet(time) {
      let current_date = time.getDate();
      let current_year = time.getFullYear();
      let current_month = time.getMonth();
      this.ksDataSet = current_year + "-" + current_month + "-" + current_date;
      var reg = new RegExp("-", "g");
      this.ksData = new Date(this.ksDataSet.replace(reg, "/"));
    },
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
    initSearch(){
      this.currentPage = 1;
      this.searchData();
    },
    searchData() {
      this.productData = [];
      var data = {
        beginTime: this.ksDataSet,
        finishTime: this.jsDataSet,
        condition: this.condition,
        limit: this.pageSize,
        page: this.currentPage,
      };
      if (!data.beginTime) {
        data.beginTime = "0001/1/1";
      }
      if (!data.finishTime) {
        data.finishTime = "9999/12/31";
      } else {
        data.finishTime = data.finishTime + " 23:59:59";
      }
      GetProductStatus(data).then((res) => {
        this.productData = res.data;
        this.totalLists = res.count;
        this.totalPage = Math.ceil(this.totalLists / this.pageSize);
      });
    },
    //当前页改变时的操作
    handleCurrentChange() {
      this.searchData();
    },
  },
  created() {
    this.jsSet(new Date());
    this.ksSet(new Date());
    //this.searchData();
  },
};
</script>

<style scoped>
.alllists {
  position: fixed;
  width: 100%;
  top: 125px;
  bottom: 50px;
  background: #f8f8f8;
  overflow: scroll;
}
.singleItem {
  position: relative;
  background: white;
  border-radius: 10px;
  margin: 10px;
  font-size: 12px;
  padding: 5px 12px;
}
.singleItem td {
  text-align: left;
}
.fy-bottom {
  border-top: 1px solid #d8d8d8;
  background: #f8f8f8;
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 0;
  color: white !important;
}
.ulhead {
  position: fixed;
  top: 50px;
  line-height: 37px;
  width: 100%;
  height: 37px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 15px;
}
.ulheadNew {
  position: fixed;
  top: 87px;
  line-height: 40px;
  width: 100%;
  height: 40px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
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
  background-image: url("../../assetsorder/time-zk.png");
  background-repeat: no-repeat;
  background-position-x: 80px;
  background-position-y: 1vw;
  background-size: 15px;
}
.searchInput {
  height: 15px;
  font-size: 13px;
  padding: 5px;
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
}
</style>