<template>
  <div class="all-view">
    <top :top="set"></top>
    <div class="bill-title">
      <div class="bill-title1">
        <ul>
          <li>
            <span>客户名称：</span>
            <span class="title-sec">{{customerInfo.customerName}}</span>
          </li>
          <li>
            <span>联系人/电话：</span>
            <span class="title-sec">{{customerInfo.customerAgent}} {{customerInfo.officeTel}}</span>
          </li>
          <li>
            <span>传真：</span>
            <span class="title-sec">{{customerInfo.fax}}</span>
          </li>
        </ul>
      </div>
      <div class="bill-title2">
        <ul>
          <li>
            <span>版本销售前5名：</span>
            <span class="title-sec">{{billitem.verTop}}</span>
          </li>
          <li>
            <span>本客户版本销售前5名：</span>
            <span class="title-sec">{{billitem.ctmVerTop}}</span>
          </li>
          <li>
            <span>备货单据号：</span>
            <span class="title-sec">{{billitem.ctmBhBill}}</span>
          </li>
        </ul>
      </div>
      <div class="bill-title3">
        <ul>
          <li>
            <span>实际发货总金额(本期/本年)：</span>
            <span class="title-sec">{{billitem.fhjeMonth}}/{{billitem.consignmentMoney}}</span>
          </li>
          <li>
            <span>实际收款金额(本期/本年)：</span>
            <span class="title-sec">{{billitem.czskMonth}}/{{billitem.gatherMoneyFax}}</span>
          </li>
          <li>
            <span>返利发货总金额(本期/本年)：</span>
            <span class="title-sec">{{billitem.moneyFl}}/{{billitem.moneyFlTotal}}</span>
          </li>
          <li>
            <span>本期剩余返利：</span>
            <span class="title-sec">{{billitem.moneyFl}}</span>
          </li>
          <li>
            <span>备货总金额(本期/本年)：</span>
            <span class="title-sec">{{billitem.moneyBh}}/{{billitem.moneyBhTotal}}</span>
          </li>
          <li>
            <span>运费总金额(本期/本年)：</span>
            <span class="title-sec">{{billitem.freightMonth}}/{{billitem.freight}}</span>
          </li>
          <li>
            <span>应收款(期初/期末)：</span>
            <span class="title-sec">{{billitem.qcczysk}}/{{billitem.czysk}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div :class="{'details-list-title':true,'fix':isFixed}" id ref="scollctn">明细列表</div>
    <div class="alllists">
      <div
        class="singleItem"
        v-for="(bill,index) in billDetailList"
        :key="index"
        @click="shipmentDetail(bill)"
      >
        <ul>
          <li>
            <span class="item-sec">日期：</span>
            <span class="item-sec2">{{bill.dateOutStock}}</span>
          </li>
          <li>
            <span class="item-sec">单据号：</span>
            <span class="item-sec2">{{bill.saleNo}}</span>
          </li>
          <li>
            <span class="item-sec">类别：</span>
            <span class="item-sec2">{{bill.billNo | stateChange}}</span>
          </li>
          <li>
            <span class="item-sec">发货总额：</span>
            <span class="item-sec2">{{bill.money}} (元)</span>
          </li>
          <li>
            <span class="item-sec">发货数量：</span>
            <span class="item-sec2">{{bill.qty}}</span>
          </li>
          <li>
            <span class="item-sec">运费：</span>
            <span class="item-sec2">{{bill.freight}} (元)</span>
          </li>
          <li>
            <span class="item-sec">收款金额：</span>
            <span class="item-sec2">{{bill.gatherMoneyFax}} (元)</span>
          </li>
          <li>
            <span class="item-sec">加收物流费：</span>
            <span class="item-sec2">{{bill.transFlag | NYchange}}</span>
          </li>
        </ul>
      </div>
      <!--底部分页-->
      <!--<div class="fy-contain">-->
      <!--<van-pagination-->
      <!--class="fy-bottom"-->
      <!--v-model="currentPage"-->
      <!--:page-count="totalPage"-->
      <!--mode="simple"-->
      <!--@change="changePage"-->
      <!--/>-->
      <!--</div>-->
    </div>
    <div class="bill-handle" v-if="billitem.customerCheckState =='待确认'">
      <span @click="comfirmBill('客户确认')">确认</span>
      <span @click="toShowBillBack">反馈</span>
    </div>
    <div class="mydialog">
      <van-popup class="kc-next-content" v-model="showBillBack">
        <textarea v-model="fankuiContent" placeholder="填写反馈内容" cols="33" rows="3"></textarea>
        <div class="kc-next-btm2">
          <span @click="showBillBack = false">返回</span>
          <span @click="comfirmBill('客户反馈')">确认</span>
        </div>
      </van-popup>
    </div>
    <!--对账单详情-->
    <van-popup v-model="showShipment" closeable style="width:80%;max-height:50%;">
      <div class="shipment-title">
        <span>{{THtitle}}</span>
      </div>
      <div v-if="whatType" style="width:95%;height:100%;margin:45px 5px 10px 5px;">
        <table
          style="width:100%; margin-bottom:8px;"
          border="1"
          cellspacing="0"
          v-for="(item,index) in THtabledata"
          :key="index"
        >
          <tr>
            <td width="40%">版本型号：</td>
            <td>{{item.itemNo}}</td>
          </tr>
          <tr>
            <td>名称：</td>
            <td>{{item.itemNote}}</td>
          </tr>
          <tr>
            <td>版本名称：</td>
            <td>{{item.itemVersion}}</td>
          </tr>
          <tr>
            <td>批号：</td>
            <td>{{item.batchNo}}</td>
          </tr>
          <tr>
            <td>单价：</td>
            <td>{{item.salePrice}}</td>
          </tr>
          <tr>
            <td>物流单价：</td>
            <td>{{item.transPrice}}</td>
          </tr>
          <tr>
            <td>数量：</td>
            <td>{{item.qtyDeliver}}</td>
          </tr>
          <tr>
            <td>金额：</td>
            <td>{{item.money}}</td>
          </tr>
        </table>
      </div>
      <div v-if="!whatType" style="width:95%;height:100%;margin:45px 5px 10px 5px;">
        <table style="width:100%;" border="1" cellspacing="0">
          <tr>
            <td>日期：</td>
            <td>{{CZSK.dateOutStock}}</td>
          </tr>
          <tr>
            <td>单据号：</td>
            <td>{{THhead}}</td>
          </tr>
          <tr>
            <td>收款金额：</td>
            <td>{{CZSK.gatherMoneyFax}}</td>
          </tr>
          <tr>
            <td>备注：</td>
            <td>{{CZSK.notes}}</td>
          </tr>
        </table>
      </div>
    </van-popup>
    <van-loading class="loading" type="spinner" v-if="loading" color="black" />
  </div>
</template>

<script>
import axios from "axios";
import { Loading, Pagination, Dialog, Popup, Toast } from "vant";
import top from "../../../components/Top";

export default {
  name: "",
  components: {
    top,
    [Loading.name]: Loading,
    [Pagination.name]: Pagination,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    "van-dialog": Dialog
  },
  data() {
    return {
      set: 31,
      loading: false,
      customerInfo: this.$route.params.customerInfo, //对账单明细表头
      billitem: this.$route.params.billitem, //对账单明细表头
      billDetailList: {}, //明细列表
      currentPage: 1, //当前页数
      totalPage: 0, //总页数,
      showBillBack: false,
      fankuiContent: "", //反馈内容
      isFixed: false,
      showShipment: false,
      THtabledata: [],
      whatType: true,
      THtitle: "对账单明细",
      THwidth: "70%",
      THhead: "",
      CZSK: []
    };
  },
  filters: {
    NYchange(value) {
      if (value == "Y") return "是";
      if (value == "N") return "否";
      if (value == null) return "";
    },
    stateChange(value) {
      if (value == "CZSK") return "收款";
      if (value == "TD") return "提单";
      if (value == "TH") return "退货";
      return value;
    }
  },
  methods: {
    getBillLists() {
      this.billDetailList = [];
      this.loading = true;
      let url =
        this.orderBaseUrl +
        "/customerBalance/getCustomerBalancePeriodDetailInfo.do";
      let data = {
        cid: this.$store.getters.getCId,
        startDate: this.billitem.dateStart, //开始日期
        endDate: this.billitem.dateEnd, //结束日期
        limit: 9999,
        page: 1
      };
      axios.post(url, data).then(res => {
        this.loading = false;
        this.billDetailList = res.data.customerBalancePeriodDetailList;
        for (let i = 0; i < this.billDetailList.length; i++) {
          this.billDetailList[i].dateOutStock = this.exchangeTime(
            this.billDetailList[i].dateOutStock
          );
        }
        if (this.billDetailList.length) {
          this.totalPage = parseInt(this.billDetailList[0].total / 10) + 1;
        }
      });
    },
    changePage() {
      this.getBillLists();
    },
    toShowBillBack() {
      this.showBillBack = true;
    },
    //  反馈
    comfirmBill(val) {
      this.showBillBack = false;
      if (val == "客户确认") {
        this.fankuiContent = "";
      }
      let url = this.orderBaseUrl + "/customerBalance/customerCheck.do";
      let data = {
        cid: this.$store.getters.getCId,
        startDate: this.billitem.dateStart,
        customerCheckState: val, //客户状态
        customerCheckComment: this.fankuiContent //反馈内容
      };
      axios.post(url, data).then(res => {
        if (res.data.code == 0) {
          if (val == "客户确认") {
            Toast.success("状态提交成功");
            this.billitem.customerCheckState = "客户确认";
          } else {
            Toast.success("反馈成功");
            this.billitem.customerCheckState = "客户反馈";
          }
        } else {
          if (val == "客户确认") {
            Toast.success("状态提交失败");
          } else {
            Toast.success("反馈失败");
          }
        }
      });
    },
    //时间戳转为固定格式日期
    exchangeTime(time) {
      var date = new Date(time);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      return Y + M + D;
    },
    handleScroll() {
      let top = this.$refs.scollctn.scrollTop;
      let top2 = this.$refs.scollctn.offsetTop;
    },
    shipmentDetail(item) {
      if (item.billNo == "CZSK" || item.billNo == "收款") {
        this.whatType = false;
        this.CZSK = item;
        this.THhead = item.saleNo;
        this.THtitle = "收款备注";
        this.THwidth = "30%";
        this.showShipment = true;
      } else {
        this.whatType = true;
        this.THtitle = item.saleNo + "明细";
        this.THwidth = "72%";
        let url =
          this.orderBaseUrl +
          "/customerBalance/getCustomerBalancePackDetail.do";
        let data = {
          saleNO: item.saleNo
        };
        axios.post(url, data).then(res => {
          this.THtabledata = res.data.packDetailList;
          this.showShipment = true;
        });
      }
    }
  },
  created() {
    this.getBillLists();
    //window.addEventListener("scroll", this.handleScroll, true);
  },
  mounted() {}
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

.bill-title {
  margin: 60px 0 0 0;
}

.bill-title li,
.singleItem li {
  height: 25px;
  line-height: 25px;
}

.bill-title li span {
  float: left;
}

.details-list-title {
  color: #7ab973;
  font-size: 15px;
  font-weight: bold;
  height: 25px;
  line-height: 25px;
}

.fix {
  position: fixed;
  top: 60px;
  left: 0;
}
.bill-title1,
.bill-title2,
.bill-title3 {
  background: white;
  border-radius: 5px;
  margin: 10px 0;
  font-size: 13px;
  padding: 5px 12px;
}

.title-sec {
  margin-left: 20px;
}

.alllists {
  margin: 10px 0 60px 0;
}

.singleItem {
  position: relative;
  background: white;
  border-radius: 5px;
  margin: 10px;
  font-size: 14px;
  padding: 5px 12px;
}

.singleItem li .item-sec {
  float: left;
}

.singleItem li .item-sec2 {
  float: right;
}

.fy-bottom {
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  background: #f8f8f8;
  /*position: fixed;*/
  width: 100%;
  height: 40px;
  /*bottom: 0;*/
  color: white !important;
}

.bill-handle {
  background: #89cb81;
  width: 100%;
  height: 45px;
  line-height: 45px;
  position: fixed;
  bottom: 0;
}

.bill-handle span {
  background: white;
  color: #89cb81;
  padding: 5px 30px;
  border-radius: 15px;
  font-size: 13px;
  margin: 0 50px;
}

.fy-bottom .van-pagination__item {
  color: #89cb81;
}
.kc-next-btm2 span {
  display: inline-block;
  margin: 15px 30px;
  padding: 10px 30px;
  border: 1px solid #ececec;
}
.kc-next-content {
  width: 330px;
  height: 160px;
  border-radius: 5px;
}
.kc-next-content textarea {
  margin-top: 15px;
  padding: 5px;
  font-size: 14px;
}
.shipment-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  top: 0;
  font-size: 18px;
  position: fixed;
}
</style>
