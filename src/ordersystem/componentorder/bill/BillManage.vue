<template>
  <div>
    <top :top="set" ref="top"></top>
    <div class="alllists">
      <div class="singleItem" v-for="(bill, index) in billLists" :key="index">
        <table>
          <tr>
            <td>起始日期：</td>
            <td>{{ bill.dateStart }}</td>
          </tr>
          <tr>
            <td>结束日期：</td>
            <td>{{ bill.dateEnd }}</td>
          </tr>
          <tr>
            <td>本期发货总额：</td>
            <td>{{ bill.fhjeMonth }}</td>
          </tr>
          <tr>
            <td>本期收款总额：</td>
            <td>{{ bill.czskMonth }}</td>
          </tr>
          <tr>
            <td>上期应收款/应收款(合计)：</td>
            <td>{{ bill.qcczysk }}/{{ bill.czysk }}</td>
          </tr>
          <tr>
            <td>客户确认状态：</td>
            <td>{{ bill.customerCheckState }}</td>
          </tr>
        </table>
        <span class="order-state" @click="toBillDetails(bill)">查看详情</span>
      </div>
    </div>
    <!--底部分页-->
    <van-pagination
      class="fy-bottom"
      v-model="currentPage"
      :page-count="totalPage"
      mode="simple"
      @change="changePage"
    />
    <van-popup
      style="width: 100%; height: 100%"
      v-model="showDetail"
      v-if="showDetail"
      transition="slide"
      position="right"
    >
      <BillDetails
        :customerInfo="customerInfo"
        :billitem="billitem"
        @backclick="backToBill"
        @detaildestroyed="detailDestroyed"
      ></BillDetails>
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
import { Pagination, Popup } from "vant";
import top from "../../../components/Top";
import BillDetails from "./BillDetails";
import { GetBalancePeriod } from "@/api/orderListASP";

export default {
  name: "billmanage",
  components: {
    top,
    BillDetails,
    [Popup.name]: Popup,
    [Pagination.name]: Pagination,
  },
  data() {
    return {
      set: 30,
      showDetail: false,
      billLists: {},
      customerInfo: {}, //对账单明细表头
      billitem: {},
      currentPage: 1, //当前页数
      totalPage: 0, //总页数
    };
  },
  methods: {
    backToBill() {
      this.showDetail = false;
    },
    detailDestroyed() {
      window.vTop = this.$refs.top;
    },
    getBillLists() {
      this.billLists = {};
      let url =
        this.orderBaseUrl + "/customerBalance/getCustomerBalanceInfo.do";
      let data = {
        cid: this.$store.getters.getCId,
        limit: 8,
        page: this.currentPage,
        status: "",
      };
      //axios.post(url, data).then(res => {
      GetBalancePeriod(data).then((res) => {
        this.billLists = res.data.customerBalancePeriodList;
        this.customerInfo = res.data.customerInfo;
        if (this.billLists) {
          this.totalPage = Math.ceil(res.data.count / 8);
        }
      });
    },
    changePage() {
      this.getBillLists();
    },
    //对账单详情
    toBillDetails(bill) {
      this.billitem = bill;
      this.showDetail = true;
    },
  },
  created() {
    this.getBillLists();
  },
};
</script>

<style scoped>
.alllists {
  position: fixed;
  width: 100%;
  top: 50px;
  bottom: 50px;
  background: #f8f8f8;
  overflow: scroll;
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
  background: #89cb81;
  border-radius: 14px;
  padding: 5px 10px;
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: white;
  font-size: 12px;
}
</style>
