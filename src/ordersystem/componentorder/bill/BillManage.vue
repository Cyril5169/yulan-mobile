<template>
  <div class="all-view">
    <top :top="set"></top>
    <div class="alllists">
      <div class="singleItem" v-for="(bill,index) in billLists" :key="index">
        <table>
          <tr>
            <td>起始日期：</td>
            <td>{{bill.dateStart}}</td>
          </tr>
          <tr>
            <td>结束日期：</td>
            <td>{{bill.dateEnd}}</td>
          </tr>
          <tr>
            <td>本期发货总额：</td>
            <td>{{bill.fhjeMonth}}</td>
          </tr>
          <tr>
            <td>本期收款总额：</td>
            <td>{{bill.czskMonth}}</td>
          </tr>
          <tr>
            <td>上期应收款/应收款(合计)：</td>
            <td>{{bill.qcczysk}}/{{bill.czysk}}</td>
          </tr>
          <tr>
            <td>客户确认状态：</td>
            <td>{{bill.customerCheckState}}</td>
          </tr>
        </table>
        <span class="order-state" @click="toBillDetails(bill)">查看详情</span>
      </div>
    </div>
    <!--底部分页-->
    <div class="fy-contain">
      <van-pagination
        class="fy-bottom"
        v-model="currentPage"
        :page-count="totalPage"
        mode="simple"
        @change="changePage"
      />
    </div>
    <van-loading class="loading" type="spinner" v-if="loading" color="black" />
  </div>
</template>

<script>
import axios from "axios";
import { Loading, Pagination } from "vant";
import top from "../../../components/Top";

export default {
  name: "",
  components: {
    top,
    [Loading.name]: Loading,
    [Pagination.name]: Pagination
  },
  data() {
    return {
      set: 30,
      loading: false,
      billLists: {},
      customerInfo: {}, //对账单明细表头
      currentPage: 1, //当前页数
      totalPage: 0 //总页数
    };
  },
  methods: {
    getBillLists() {
      this.billLists = {};
      this.loading = true;
      let url =
        this.orderBaseUrl + "/customerBalance/getCustomerBalanceInfo.do";
      let data = {
        cid: this.$store.getters.getCId,
        limit: 8,
        page: this.currentPage
      };
      axios.post(url, data).then(res => {
        this.loading = false;
        this.billLists = res.data.customerBalancePeriodList;
        this.customerInfo = res.data.customerInfo;
        if (this.billLists) {
          this.totalPage = Math.ceil(this.billLists[0].total / 8);
        }
      });
    },
    changePage() {
      this.getBillLists();
    },
    //  对账单详情
    toBillDetails(bill) {
      this.$router.push({
        name: "billdetails",
        params: {
          customerInfo: this.customerInfo,
          billitem: bill
        }
      });
    }
  },
  created() {
    this.getBillLists();
  }
};
</script>

<style scoped>
.all-view {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0px;
  background-color: #f8f8f8;
  overflow: scroll;
}
.alllists {
  margin: 60px 0;
}
.singleItem {
  position: relative;
  background: white;
  border-radius: 5px;
  margin: 10px;
  font-size: 14px;
  padding: 5px 12px;
}
.singleItem td {
  text-align: left;
}
.order-state {
  background: #89cb81;
  border-radius: 14px;
  padding: 5px 10px;
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: white;
  font-size: 12px;
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
.fy-bottom .van-pagination__item {
  color: #89cb81;
}
</style>
