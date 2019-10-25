<template>
  <div class="reviseagreement">
    <div class="top">
      <div class="top-bottom">
        <div class="arrow">
          <div class="arrow-img" @click="back"></div>
          <div class="top-text">我的订单</div>
        </div>
      </div>
      <div class="search-title">
        <input type="text" class="search-input" v-model="xhInput" placeholder="输入订单型号" />
        <!--<input type="text" class="status-input" @click="showStatus = true"  v-model="myStatu">-->
        <span class="search-button status-input" @click="showStatus = true">{{myStatu}}</span>
        <span class="search-button" @click="orderSearch">查询</span>
      </div>
      <div class="search">
        <ul class="ulhead" id="ulhead">
          <li class="licenter" @click="showks = true">
            <input class="time time-ks" type="text" v-model="ksDataSet" disabled />
          </li>
          <li>
            <span>至</span>
          </li>
          <li class="liright" @click="showjs = true">
            <input class="time time-js" type="text" v-model="jsDataSet" disabled />
          </li>
          <li class="licenter" @click="showType = true">
            <input class="time time-ks" type="text" v-model="myType" disabled />
          </li>
        </ul>
      </div>
    </div>
    <div class="orders" v-if="orderLists.length">
      <div class="single-order" v-for="(orderList,index) in orderLists" :key="index">
        <div class="nav">
          <div class="wall-icon"></div>
          <span class="title">订单号:{{orderList.ORDER_NO}}</span>
          <span class="state">{{orderList.STATUS_ID}}</span>
        </div>
        <div class="good">
          <table>
            <tr width="100%">
              <th class="good-msg" width="35%">型号</th>
              <th class="good-msg" width="10%">单价</th>
              <th width="30%">数量</th>
              <th width="30%">应付金额</th>
            </tr>
            <tr v-for="(product,inndex) in orderList.ORDERBODY" :key="inndex">
              <td v-if="product.packDetailId == 0">{{product.ITEM_NO}}</td>
              <td v-else>
                <a href="javascript:void(0);" @click="shipmentDetail(product)">{{product.ITEM_NO}}</a>
              </td>
              <td v-if="showPrice">￥{{product.UNIT_PRICE}}</td>
              <td v-else>***</td>
              <td>{{product.QTY_REQUIRED}}</td>
              <td v-if="showPrice">￥{{product.FINAL_COST}}</td>
              <td v-else>***</td>
            </tr>
          </table>
        </div>
        <div class="good-accout">
          <span>共件{{orderList.ORDERBODY.length}}商品</span>
          <span v-if="showPrice" class="allhj">合计：￥{{orderList.ALL_SPEND}}元</span>
          <span v-else class="allhj">合计：***元</span>
        </div>
        <span class="detail-button" @click.stop="toOrderDetails(index)">查看详情</span>
        <!--欠款待提交（提交的话需要做库存判断）-->
        <!--欠款可提交（提交的话不用库存判断）-->
        <div class="next-do" v-if="orderList.showStatus">
          <span>取消订单</span>
          <span class="to-pay">提交</span>
        </div>
      </div>
    </div>
    <!--<div class="orders" v-else>-->
    <!--暂无此订单结果-->
    <!--</div>-->
    <!--底部分页-->
    <div class="fy-contain" v-show="hidshow">
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
    <!--<navBottom :tab-stage="myRoute" v-show="hidshow"></navBottom>-->
    <van-loading class="loading" type="spinner" v-if="loading" color="black" />
    <!--时间选择-->
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

    <!--订单状态选择-->
    <van-popup v-model="showStatus" position="bottom">
      <van-picker
        show-toolbar
        title="订单状态"
        :columns="orderStatus"
        @cancel="onCancel"
        @confirm="onConfirmStatu"
      />
    </van-popup>
    <!--订单类型-->
    <van-popup v-model="showType" position="bottom">
      <van-picker
        show-toolbar
        title="订单类型"
        :columns="orderType"
        @cancel="onCancelType"
        @confirm="onConfirmType"
      />
    </van-popup>
    <!--出货详情-->
    <van-popup v-model="showShipment" closeable style="width:80%">
      <div class="shipment-title">
        <span>出货详情</span>
      </div>
      <div style="width:95%;height:100%;margin:35px 5px 10px 5px;">
        <table
          style="width:100%;"
          border="1"
          cellspacing="0"
          v-for="(item,index) in shipData"
          :key="index"
        >
          <tr>
            <td width="40%">提货单号：</td>
            <td>{{item.SALE_NO}}</td>
          </tr>
          <tr>
            <td>数量：</td>
            <td>{{item.QTY_DELIVER}}</td>
          </tr>
          <tr>
            <td>批号：</td>
            <td>{{item.BATCH_NO}}</td>
          </tr>
          <tr>
            <td>出货情况：</td>
            <td v-if="item.DATE_OUT_STOCK==''||item.DATE_OUT_STOCK=='9999/12/31 00:00:00'">代发货</td>
            <td v-else>已发货</td>
          </tr>
          <tr>
            <td>发货日期：</td>
            <td>{{item.DATE_OUT_STOCK}}</td>
          </tr>
          <tr>
            <td>加收物流费：</td>
            <td>{{item.FREIGHT}}</td>
          </tr>
          <tr>
            <td>物流公司：</td>
            <td>{{item.TRANSCOMPANY}}</td>
          </tr>
          <tr>
            <td>物流单号：</td>
            <td>{{item.TRANS_ID}}</td>
          </tr>
        </table>
      </div>
    </van-popup>
  </div>
</template>
<script>
import axios from "axios";
import {
  DatetimePicker,
  Popup,
  Picker,
  Pagination,
  Toast,
  Loading
} from "vant";
import {
  getAllOrders,
  InsertOperationRecord,
  cancelOrderNew,
  copyCartItem,
  getPackDetailInfo
} from "@/api/orderListASP";
import navBottom from "../../../components/navBottom";
import "../../assetsorder/actionsheet.css";

export default {
  name: "",
  components: {
    navBottom,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Pagination.name]: Pagination,
    [Toast.name]: Toast,
    [Loading.name]: Loading
  },
  data() {
    return {
      url: "http://106.14.159.244:8080/yulan-order",
      loading: false,
      //底部导航栏样式切换
      myRoute: "order",
      //结束时间
      showjs: false,
      jsData: "",
      jsDataSet: "",
      //开始时间
      ksData: "",
      ksDataSet: "",
      showks: false,
      //默认开始时间
      mrksTime: "",
      //订单状态
      orderStatus: [
        "全部状态",
        "待提交",
        "余额不足待提交",
        "余额不足可提交",
        "待确认",
        "待修改",
        "待审核",
        "兰居待修改",
        "已提交",
        "已接收",
        "已受理",
        "部分发货",
        "已完成",
        "已作废"
      ],
      orderType: ["全部产品", "墙纸配套类", "软装", "窗帘"],
      showType: false,
      showStatus: false,
      //当前状态
      myStatu: "全部状态",
      //当前类型
      myType: "全部产品",
      myTypeCode: "",
      //当前页数
      currentPage: 1,
      //总页数
      totalPage: 0,
      //总记录数
      totalLists: 0,
      //每页记录数
      itemsPerPage: 10,
      //总页数
      totalPage: 0,
      //通过页数来判断change是执行哪个函数
      pageMark: 0,
      //订单数据
      orderLists: [],
      //型号输入
      xhInput: "",
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidshow: true, //显示或者隐藏footer
      showShipment: false,
      shipData: []
    };
  },
  methods: {
    confirmTimeks(value) {
      this.ksSet2(this.ksData);
      this.showks = false;
    },
    cancelTimeks() {
      this.showks = false;
    },
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
    //初始化开始时间(前三个月)
    ksSet(time) {
      let current_date = time.getDate();
      let current_month = time.getMonth() + 1;
      let current_year = time.getFullYear();
      switch (current_month) {
        case 1:
        case 2:
        case 3:
          current_month += 9;
          current_year--;
          break;
        default:
          current_month -= 3;
          break;
      }
      current_month = current_month < 10 ? "0" + current_month : current_month;
      this.ksDataSet = current_year + "-" + current_month + "-" + current_date;
      this.ksData = new Date(this.ksDataSet);
    },
    //结束时间设置
    jsSet(time) {
      let current_date = time.getDate();
      let current_month = time.getMonth() + 1;
      let current_year = time.getFullYear();
      this.jsDataSet = current_year + "-" + current_month + "-" + current_date;
      this.jsData = time;
    },
    //订单状态选择
    onConfirmStatu(index) {
      this.myStatu = index;
      this.orderSearch();
      this.showStatus = false;
    },
    onCancel() {
      this.showStatus = false;
    },
    onConfirmType(index) {
      this.myType = index;
      if (this.myType == "全部产品") {
        this.myTypeCode = "";
      } else if (this.myType == "墙纸配套类") {
        this.myTypeCode = "W";
      } else if (this.myType == "软装") {
        this.myTypeCode = "Y";
      } else if (this.myType == "窗帘") {
        this.myTypeCode = "X";
      }
      // this.orderSearch()
      this.showType = false;
    },
    onCancelType() {
      this.showType = false;
    },
    back() {
      window.vTop = null;
      this.$router.push({
        path: "/customer"
      });
    },
    //获取订单列表及订单查询
    orderSearch() {
      this.orderLists = [];
      //this.loading = true;
      //let orderUrl = this.orderBaseUrl + "/order/getOrders.do";
      // let data = {
      //   limit: "10", //每页限制条数（必须）
      //   page: this.currentPage, //页数，第几页（必须）
      //   cid: this.$store.getters.getCId, //登录的用户账号（必须）
      //   // "cid": "C01613",//登录的用户账号（必须）
      //   state_id: this.statusExchange(this.myStatu), //订单状态（（可传空串，空串表示全部状态） --1提交、12-接收、2--受理、3--作废、--5欠款待提交、--6欠款可提交、--7已完成）
      //   find: this.xhInput, //查找订单好，可模糊查找（可传空串，获取全部）
      //   beginTime: this.ksDataSet + " 00:00:00", //开始时间（开始结束时间同时传或不传）
      //   finishTime: this.jsDataSet + " 23:59:59", //结束时间
      //   orderType: this.myTypeCode, //订单类型，W为墙纸，X窗帘，Y是软装
      //   curtainStatusId: "", //（new）窗帘状态,点击审核页面时传，其他页面传空串 （0待审核，客户待修改1，客户待确认2，兰居待修改3，可提交4）
      //   companyId: this.$store.getters.getCMId //公司所属id(xing),必传，空串获取所有公司
      // };
      var data = {
        companyId: this.$store.getters.getCMId,
        limit: 5,
        page: this.currentPage,
        cid: this.$store.getters.getCId,
        statusId: this.statusExchange(this.myStatu),
        find: this.xhInput,
        beginTime: this.ksDataSet + " 00:00:00",
        finishTime: this.jsDataSet + " 23:59:59",
        orderType: this.myTypeCode
      };
      getAllOrders(data).then(data => {
        //axios.post(orderUrl, data).then(data => {
        // this.loading = false;
        this.totalLists = data.count;
        //获取总页数
        this.totalPage = parseInt(data.count / 5) + 1;
        this.orderLists = data.data;
        if (this.orderLists.length == 0) {
          Toast({
            message: "暂无订单",
            duration: 2000
          });
        }
        for (let i = 0; i < this.orderLists.length; i++) {
          this.orderLists[i].showStatus = false;
          if (this.statusExchange(this.myStatu) == "0") {
            switch (this.orderLists[i].STATUS_ID) {
              case "0":
                this.orderLists[i].STATUS_ID = "待审核";
                continue;
              case "1":
                this.orderLists[i].STATUS_ID = "客户待修改";
                continue;
              case "2":
                this.orderLists[i].STATUS_ID = "客户待确认";
                continue;
              case "3":
                this.orderLists[i].STATUS_ID = "兰居待修改";
              case "4":
                this.orderLists[i].STATUS_ID = "可提交";
            }
          } else {
            switch (this.orderLists[i].STATUS_ID) {
              case "1":
                this.orderLists[i].STATUS_ID = "已提交";
                continue;
              case "12":
                this.orderLists[i].STATUS_ID = "已接收";
                continue;
              case "2":
                this.orderLists[i].STATUS_ID = "已受理";
                continue;
              case "3":
                this.orderLists[i].STATUS_ID = "已作废";
                continue;
              case "5":
                this.orderLists[i].STATUS_ID = "余额不足待提交";
                continue;
              case "6":
                this.orderLists[i].STATUS_ID = "欠款可提交";
                continue;
              case "7":
                this.orderLists[i].STATUS_ID = "已完成";
                continue;
            }
          }
          if (
            this.orderLists[i].STATUS_ID == "余额不足待提交" ||
            this.orderLists[i].STATUS_ID == "欠款可提交"
          ) {
            this.orderLists[i].showStatus = true;
          }
        }
      });
      // this.$store.commit('hideLoading')
    },
    //订单详情
    toOrderDetails(index) {
      this.$router.push({
        name: "orderdetails",
        params: {
          state_id: this.statusExchange(this.orderLists[index].STATUS_ID), //订单状态（（可传空串，空串表示全部状态） --1提交、12-接收、2--受理、3--作废、--5欠款待提交、--6欠款可提交、--7已完成）
          find: this.orderLists[index].ORDER_NO, //查找订单号，可模糊查找（可传空串，获取全部）
          orderType: this.myTypeCode,
          from: "myorder"
        }
      });
    },
    //出货详情
    shipmentDetail(item) {
      getPackDetailInfo({
        orderNo: item.ORDER_NO,
        lineNo: item.LINE_NO,
        itemNo: item.ITEM_NO
      }).then(res => {
        this.shipData = res.data[0].packDetails;
        this.showShipment = true;
      });
    },
    //状态转换
    statusExchange(myStatu) {
      switch (myStatu) {
        case "全部":
          myStatu = "";
          break;
        case "待提交":
          myStatu = "0";
          break;
        case "余额不足待提交":
          myStatu = "5";
          break;
        case "余额不足可提交":
          myStatu = "6";
          break;
        case "待确认":
          myStatu = "22";
          break;
        case "待修改":
          myStatu = "21";
          break;
        case "待审核":
          myStatu = "20";
          break;
        case "兰居待修改":
          myStatu = "23";
          break;
        case "已提交":
          myStatu = "1";
          break;
        case "已接收":
          myStatu = "12";
          break;
        case "已受理":
          myStatu = "2";
          break;
        case "部分发货":
          myStatu = "4";
          break;
        case "已完成":
          myStatu = "7";
          break;
        case "已作废":
          myStatu = "3";
          break;
      }
      return myStatu;
    },
    //改变页数
    changePage() {
      this.orderSearch();
    }
  },
  computed: {
    filteredProduct() {
      return this.orderLists.filter(orderList => {
        return orderList.ORDER_NO.match(this.xhInput);
      });
    },
    showPrice() {
      if (this.$store.state.info.data)
        return this.$store.getters.getIsManage != "0";
    }
  },
  created() {
    let time = new Date();
    this.jsSet(time);
    this.ksSet(time);
    this.orderSearch();
  },
  mounted() {
    window.vTop = this;
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  destroyed() {
    if (window.vTop == this) window.vTop = null;
  },
  watch: {
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
    }
  }
};
</script>

<style scoped>
.reviseagreement {
  background-color: rgb(239, 239, 239);
  height: 100vh;
  position: relative;
  overflow: scroll;
}

li {
  display: inline-block;
}

.top {
  width: 100%;
  height: 135px;
  top: 0;
  position: fixed;
  z-index: 20;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
}

.top-bottom {
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: absolute;
  top: 0;
}

.arrow {
  display: inline-block;
}

.arrow-img {
  background: url("../../../assets/arrow.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  width: 30px;
  height: 30px;
  z-index: 33;
  position: absolute;
  left: 10px;
  top: 10px;
  /* left: 17px;
    bottom: 16px; */
}

.top-text {
  display: inline-block;
  color: #f3faff;
  vertical-align: middle;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  text-align: center;
}

.search-title input::-webkit-input-placeholder {
  color: white;
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

.search-input {
  width: 115px;
  position: absolute;
  top: 60px;
  left: 15px;
  padding-left: 20px;
  font-size: 14px;
  /*background-image: url("../../assetsorder/search.png");*/
  /*background-repeat: no-repeat;*/
  /*background-position-x: 30vw;*/
  /*background-position-y: 1.9vw;*/
  /*background-size: 15PX;*/
}

.search-button {
  width: 80px;
  position: absolute;
  top: 60px;
  right: 15px;
  font-size: 14px;
  background-color: hsla(0, 0%, 100%, 0.3);
  border-radius: 3.467vw;
  outline: none;
  border: none;
  text-decoration: none;
  height: 25px;
  line-height: 25px;
  color: white;
}
.status-input {
  width: 115px;
  position: absolute;
  top: 60px;
  right: 100px;
  font-size: 14px;
  text-align: center;
  color: white;
  background-image: url("../../assetsorder/zk.png");
  background-repeat: no-repeat;
  background-position-x: 25vw;
  background-position-y: 1.5vw;
  background-size: 15px;
}

.search {
  width: 100%;
  height: 44px;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
  position: absolute;
  bottom: 0;
}

ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

#ulhead {
  position: fixed;
  top: 98px;
  line-height: 37px;
  width: 100%;
  height: 37px;
  /*font-size: 15px;*/
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  font-size: 15px;
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
  background-position-x: 23vw;
  background-position-y: 1vw;
  background-size: 15px;
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

/*订单显示*/
.orders {
  margin: 130px 0 50px;
  padding: 10px 0;
  position: relative;
  font-size: 14.5px;
}
/*单个订单*/
.single-order {
  /*height: 210px;*/
  padding: 10px;
  margin: 10px 15px;
  /*border: 1px solid red;*/
  border-radius: 5px;
  background: white;
  position: relative;
}

.single-order .nav {
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #ececec;
}

.good {
  /*background: #FCFCFC;*/
  border-bottom: 1px solid #ececec;
}

.title {
  float: left;
  margin-left: 1px;
}

.state {
  float: right;
  color: #ff8259;
}

.good-accout {
  text-align: left;
  margin: 10px 0;
}

.good-accout .allhj {
  /*float: right;*/
  margin: 0 20px;
}

.next-do {
  text-align: right;
  height: 50px;
  line-height: 50px;
}

.next-do span {
  padding: 8px 20px;
  margin-left: 10px;
  border: 1px solid #999686;
  border-radius: 20px;
  font-size: 13px;
}

.next-do .to-pay {
  border: 1px solid #ff6352;
  color: #ff6352;
}
.detail-button {
  position: absolute;
  bottom: 15px;
  right: 10px;
  background: #89cb81;
  color: white;
  padding: 5px 15px;
  border-radius: 15px;
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
