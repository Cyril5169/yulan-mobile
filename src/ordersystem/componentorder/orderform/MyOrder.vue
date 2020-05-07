<template>
  <div class="reviseagreement">
    <top greenBackground="true" msgtitle="我的订单" @backclick="back"></top>
    <div class="content">
      <div class="content-top">
        <div class="orderType">
          <van-tabs v-model="activeOrderType" @change="onOrderTypeChange">
            <van-tab
              v-for="(item,index) in orderType"
              :title="item.text"
              :name="item.code"
              :key="index"
            ></van-tab>
          </van-tabs>
        </div>
        <div class="orderType">
          <van-tabs
            v-model="activeStatusTypeIndex"
            @change="onStatusTypeChange"
            :ellipsis="ellipsis"
            border
          >
            <van-tab
              v-for="(item,index) in statusType"
              :title="item.text"
              :name="item.type"
              :key="index"
            ></van-tab>
          </van-tabs>
        </div>
        <!-- <div class="nav-status" ref="nav">
          <ul>
            <li v-for="(item,index) in orderStatus" :key="index">
              <a
                @click="orderStatusClick(item)"
                v-bind:class="{ active: item.text==activeStatus }"
              >{{item.text}}</a>
            </li>
          </ul>
        </div>-->
        <div class="ulhead">
          <ul>
            <li class="licenter" @click="showks = true">
              <input class="time time-ks" type="text" v-model="ksDataSet" disabled />
            </li>
            <li>
              <span>至</span>
            </li>
            <li class="liright" @click="showjs = true">
              <input class="time time-js" type="text" v-model="jsDataSet" disabled />
            </li>

            <li>
              <span @click="orderSearch" class="search-button">查询</span>
            </li>
          </ul>
          <div class="search-input-ct">
            <input type="text" class="search-input" v-model="xhInput" placeholder="输入订单型号" />
            <span class="status-input" @click="showStatusPicker = true">{{myOrderStatusText}}</span>
          </div>
        </div>
      </div>

      <div class="orders">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="finishedText"
          :loading-text="loadingText"
          :error.sync="error"
          :error-text="errorText"
          @load="onLoad"
        >
          <div class="single-order" v-for="(orderList,index) in orderLists" :key="index">
            <div class="nav">
              <div class="wall-icon"></div>
              <span class="title">订单号:{{orderList.ORDER_NO}}</span>
              <span class="state">
                {{ orderList.STATUS_ID | transStatus
                }}{{ orderList.CURTAIN_STATUS_ID | curtainStatus }}
              </span>
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
                    <a
                      href="javascript:void(0);"
                      @click="shipmentDetail(product)"
                    >{{product.ITEM_NO}}</a>
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
            <span
              v-bind:class="{'detail-button-showstatus':orderList.showStatus,'detail-button':!orderList.showStatus}"
              @click.stop="toOrderDetails(index)"
            >查看详情</span>
            <!--欠款待提交（提交的话需要做库存判断）-->
            <!--欠款可提交（提交的话不用库存判断）-->
            <div class="next-do" v-if="orderList.showStatus">
              <span
                v-if="orderList.STATUS_ID == 5 ||
                orderList.STATUS_ID == 6 ||
                orderList.STATUS_ID == 0 ||
                (orderList.STATUS_ID == 1 &&
                  orderList.CURTAIN_STATUS_ID !== '' &&
                  orderList.CURTAIN_STATUS_ID == 0)"
                @click="cancelOrder(orderList.ORDER_NO)"
              >作废订单</span>
              <span
                v-if="orderList.STATUS_ID == 3 && orderList.ORDER_NO.slice(0, 1) == 'X'"
                @click="copyCart(orderList.ORDER_NO)"
              >退回购物车</span>
              <span
                class="to-pay"
                v-if="orderList.STATUS_ID == 5 || orderList.STATUS_ID == 6"
                @click="tjOrder(orderList)"
              >提交订单</span>
              <span
                class="to-pay"
                v-if="(orderList.CURTAIN_STATUS_ID == 0 || orderList.CURTAIN_STATUS_ID == 4) && orderList.STATUS_ID == 0"
                @click="summitCurtain(orderList)"
              >提交订单</span>
            </div>
          </div>
        </van-list>
      </div>
    </div>
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
    <van-popup v-model="showStatusPicker" position="bottom">
      <van-picker
        show-toolbar
        title="订单状态"
        :columns="myOrderStatusColumns"
        @cancel="showStatusPicker=false"
        @confirm="onConfirmStatu"
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
            <td>
              <a href="javascript:void(0);" @click="transDetail(item.TRANS_ID)">{{item.TRANS_ID}}</a>
            </td>
          </tr>
        </table>
      </div>
    </van-popup>
    <van-popup v-model="showTrans" closeable style="width:90%;height:85%;overflow:hidden;">
      <div
        style="position: absolute;top:0;left:0;right:18px;height:30px;line-height:30px;vertical-align:center;z-index:10000;background:#3481ed;color:#fff"
      >
        <span>物流详情</span>
      </div>
      <iframe
        :src="transUrl"
        style="position: absolute;top:0;left:0;width:100%;height:100%;z-index:9999;"
        frameborder="0"
      ></iframe>
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
  Loading,
  Tab,
  Tabs,
  List,
  Dialog
} from "vant";
import {
  getAllOrders,
  InsertOperationRecord,
  cancelOrderNew,
  copyCartItem,
  getPackDetailInfo,
  GetPromotionByType,
  GetOrderUseRebate
} from "@/api/orderListASP";
import top from "../../../components/Top";
import "../../assetsorder/actionsheet.css";
import { async } from "q";

export default {
  name: "",
  components: {
    top,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Pagination.name]: Pagination,
    [Toast.name]: Toast,
    [Loading.name]: Loading,
    [Tab.name]: Tab,
    [List.name]: List,
    [Tabs.name]: Tabs,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      isShowButton_index : 0,
      ellipsis: false,
      url: "http://106.14.159.244:8080/yulan-order",
      loading: false,
      finished: false,
      finishedText: "加载完毕",
      loadingText: "加载中...",
      errorText: "请求失败，点击重新加载",
      error: false,
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
      activeStatus: "全部",
      statusType: [
        { type: 0, text: "待处理" },
        { type: 1, text: "窗帘审核订单" },
        { type: 2, text: "生效订单" },
        { type: 3, text: "已作废" },
        { type: 4, text: "全部" }
      ],
      //活动的statusType的索引
      activeStatusTypeIndex: 0,
      //订单状态
      orderStatus: [
        { type: 99, text: "全部", status: "" },
        { type: 0, text: "待提交", status: "0" },
        { type: 0, text: "余额不足待提交", status: "5" },
        { type: 0, text: "余额不足可提交", status: "6" },
        { type: 0, text: "待确认", status: "22" },
        { type: 0, text: "待修改", status: "21" },
        { type: 1, text: "待审核", status: "20" },
        { type: 1, text: "兰居待修改", status: "23" },
        { type: 2, text: "已提交", status: "1" },
        { type: 2, text: "已接收", status: "12" },
        { type: 2, text: "已受理", status: "2" },
        { type: 2, text: "部分发货", status: "4" },
        { type: 2, text: "已完成", status: "7" },
        { type: 3, text: "已作废", status: "3" }
      ],
      showStatusPicker: false,
      myOrderStatusColumns: [
        "全部",
        "待提交",
        "余额不足待提交",
        "余额不足可提交",
        "待确认",
        "待修改"
      ],
      myOrderStatusText: "全部",
      orderType: [
        { text: "全部产品", code: "" },
        { text: "墙纸配套类", code: "W" },
        { text: "软装", code: "Y" },
        { text: "窗帘", code: "X" }
      ],
      activeOrderType: 0,
      showType: false,
      //当前状态
      myStatu: ["0", "5", "6", "22", "21"],
      //当前类型
      myType: "全部产品",
      myTypeCode: "",
      //当前页数
      currentPage: 0,
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
      shipData: [],
      showTrans: false,
      transUrl: "https://m.kuaidi100.com/result.jsp?nu=038464072671"
    };
  },
  filters: {
    transStatus(value) {
      switch (value) {
        case "0":
          return "待提交";
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
    },
    curtainStatus(value) {
      switch (value) {
        case "0":
          return "待审核";
          break;
        case "1":
          return "待修改";
          break;
        case "2":
          return "待确认";
          break;
        case "3":
          return "兰居待修改";
          break;
        case "4":
          return "已通过";
          break;
      }
    }
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
    onConfirmStatu(index) {
      this.myOrderStatusText = index;
      var status = this.statusExchange(index);
      this.showStatusPicker = false;
      if (index == "全部") {
        this.onStatusTypeChange(this.activeStatusTypeIndex);
      } else {
        this.myStatu = [status];
      }
      this.orderSearch();
    },

    orderStatusClick(item, index) {
      this.activeStatus = item.text;
      this.myStatu = [item.status];
      this.orderSearch();
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
      current_date = this.ksData.getDate();
      current_month = this.ksData.getMonth() + 1;
      current_year = this.ksData.getFullYear();
       this.ksDataSet = current_year + "-" + current_month + "-" + current_date;//实际时间
    },
    //结束时间设置
    jsSet(time) {
      let current_date = time.getDate();
      let current_month = time.getMonth() + 1;
      let current_year = time.getFullYear();
      this.jsDataSet = current_year + "-" + current_month + "-" + current_date;
      this.jsData = time;
    },
    onOrderTypeChange(name, title) {
      this.myTypeCode = name;
      this.orderSearch();
    },
    onStatusTypeChange(name, title) {
      this.activeStatusTypeIndex = name;
      this.myOrderStatusText = "全部";
      if (this.activeStatusTypeIndex == 4) {
        this.myStatu = [];
        this.myOrderStatusColumns = [];
        this.orderStatus.forEach(item => {
          this.myOrderStatusColumns.push(item.text);
        });
      } else {
        this.myStatu = [];
        this.myOrderStatusColumns = ["全部"];
        this.orderStatus.forEach(item => {
          if (this.activeStatusTypeIndex == item.type) {
            this.myStatu.push(item.status);
            this.myOrderStatusColumns.push(item.text);
          }
        });
      }
      this.orderSearch();
    },
    back() {
      window.vTop = null;
      this.$router.push({
        path: "/customer"
      });
    },
    onLoad(config) {
      var loading = config | false;
      setTimeout(() => {
        this.currentPage = this.currentPage + 1;
        var data = {
          companyId: this.$store.getters.getCMId,
          limit: 5,
          page: this.currentPage,
          cid: this.$store.getters.getCId,
          statusId: this.myStatu,
          find: this.xhInput,
          beginTime: this.ksDataSet + " 00:00:00",
          finishTime: this.jsDataSet + " 23:59:59",
          orderType: this.myTypeCode
        };
        getAllOrders(data, { loading: loading })
          .then(data => {
            this.totalLists = data.count;
            //获取总页数
            this.totalPage = Math.ceil(data.count / 5);
            for (let i = 0; i < data.data.length; i++) {
              this.orderLists.push(data.data[i]);
            }
            this.orderLists.sort(function(a, b) {
              return a.DATE_CRE > b.DATE_CRE ? -1 : 1;
            });
            this.loadingText =
              "加载中，共" +
              this.totalLists +
              "项，已加载" +
              this.orderLists.length +
              "项";
            if (this.currentPage >= this.totalPage) {
              this.finished = true;
              this.finishedText = "加载完毕，总记录数" + this.totalLists;
            } else {
              this.finished = false;
            }
            // 加载状态结束
            this.loading = false;
            for (let i = 0; i < this.orderLists.length; i++) {
              this.orderLists[i].showStatus = false;
              if (
                (this.orderLists[i].STATUS_ID == 3 &&
                  this.orderLists[i].ORDER_NO.slice(0, 1) == "X") ||
                this.orderLists[i].STATUS_ID == 5 ||
                this.orderLists[i].STATUS_ID == 6 ||
                this.orderLists[i].STATUS_ID == 0 ||
                (this.orderLists[i].STATUS_ID == 1 &&
                  this.orderLists[i].CURTAIN_STATUS_ID !== "" &&
                  this.orderLists[i].CURTAIN_STATUS_ID == 0) ||
                ((this.orderLists[i].CURTAIN_STATUS_ID == 0 ||
                  this.orderLists[i].CURTAIN_STATUS_ID == 4) &&
                  this.orderLists[i].STATUS_ID == 0)
              ) {
                this.orderLists[i].showStatus = true;
              }
            }
          })
          .catch(err => {
            this.loading = false;
            this.error = true;
          });
      }, 500);
    },
    //获取订单列表及订单查询
    orderSearch() {
      this.orderLists = [];
      this.finished = false;
      this.currentPage = 0;
      this.finishedText = "暂无查询结果";
      this.loadingText = "加载中";
      this.onLoad(true);
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
    //物流详情
    transDetail(trans_id) {
      this.transUrl = "https://m.kuaidi100.com/result.jsp?nu=" + trans_id;
      this.showTrans = true;
    },
    //状态转换
    statusExchange(s) {
      switch (s) {
        case "全部":
          s = "";
          break;
        case "待提交":
          s = "0";
          break;
        case "余额不足待提交":
          s = "5";
          break;
        case "余额不足可提交":
          s = "6";
          break;
        case "待确认":
          s = "22";
          break;
        case "待修改":
          s = "21";
          break;
        case "待审核":
          s = "20";
          break;
        case "兰居待修改":
          s = "23";
          break;
        case "已提交":
          s = "1";
          break;
        case "已接收":
          s = "12";
          break;
        case "已受理":
          s = "2";
          break;
        case "部分发货":
          s = "4";
          break;
        case "已完成":
          s = "7";
          break;
        case "已作废":
          s = "3";
          break;
      }
      return s;
    },
    cancelOrder(orderNo) {
      Dialog.confirm({
        message: "是否确认作废订单"
      })
        .then(() => {
          cancelOrderNew({
            cid: this.$store.getters.getCId,
            orderNo: orderNo
          }).then(res => {
            Dialog.confirm({
              message: "作废成功，是否退回数据到购物车"
            })
              .then(() => {
                copyCartItem({
                  orderNo: orderNo
                }).then(res => {
                  Toast({
                    duration: 1000,
                    message: "复制成功，请到购物车中查看"
                  });
                });
              })
              .catch(() => {});
            this.orderSearch();
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    copyCart(orderNo) {
      Dialog.confirm({
        message: "是否退回数据到购物车"
      })
        .then(() => {
          copyCartItem({
            orderNo: orderNo
          }).then(res => {
            Toast({
              duration: 1000,
              message: "复制成功，请到购物车中查看"
            });
          });
        })
        .catch(() => {});
    },
    //再次提交订单时的余额判断
    tjOrder(item) {
      //余额查询
      let monUrl = this.orderBaseUrl + "/order/getResidemoney.do";
      let mondata = {
        cid: this.$store.getters.getCId,
        companyId: this.$store.getters.getCMId //登录客户号
      };
      axios.post(monUrl, mondata).then(async val => {
        if (val.data.data > item.ALL_SPEND) {
          if (item.STATUS_ID == 5 || item.STATUS_ID == 6) {
            for (var i = 0; i < item.ORDERBODY.length; i++) {
              if (item.ORDERBODY[i].PROMOTION_TYPE) {
                var res = await GetPromotionByType({
                  proType: item.ORDERBODY[i].PROMOTION_TYPE,
                  cid: this.$store.getters.getCId
                });
                if (!res.data) {
                  Dialog.alert({
                    message: `活动‘&${item.ORDERBODY[i].PROMOTION}’不存在`
                  }).then(() => {});
                  return;
                }
                if (
                  new Date(res.data.DATE_END) < new Date() ||
                  res.data.USE_ID == "0"
                ) {
                  Dialog.alert({
                    message: `活动‘&${item.ORDERBODY[i].PROMOTION}’已过期，请删除订单后重新下单`
                  }).then(() => {});
                  return;
                }
              }
              if (
                item.ORDERBODY[i].BACK_Y > 0 ||
                item.ORDERBODY[i].BACK_M > 0
              ) {
                var res = await GetOrderUseRebate({
                  orderNo: item.ORDERBODY[i].ORDER_NO,
                  lineNo: item.ORDERBODY[i].LINE_NO
                });
                if (res.data.length == 0) {
                  Dialog.alert({
                    message: "优惠券不存在"
                  }).then(() => {});
                  return;
                }
                for (var j = 0; j < res.data.length; j++) {
                  if (new Date(res.data[j].DATE_END) < new Date()) {
                    Dialog.alert({
                      message: "优惠券已过期，请删除订单后重新下单"
                    }).then(() => {});
                    return;
                  }
                }
              }
            }
            this.onSubmitOrder(item.ORDER_NO);
          }
        } else {
          Dialog.alert({
            message: "余额不足,提交失败"
          }).then(() => {});
        }
      });
    },
    //订单提交
    onSubmitOrder(orderNo) {
      let orderURL = this.orderBaseUrl + "/order/putAgainOrder.do";
      let orderData = {
        cid: this.$store.getters.getCId, //登录客户号
        orderNo: orderNo //订单号
      };
      axios.post(orderURL, orderData).then(res => {
        if (res.data.code == 0) {
          Toast({
            duration: 1000,
            message: "订单提交成功"
          });
          var recordData = {
            ORDER_NO: this.$route.params.find,
            OPERATION_PERSON: this.$store.getters.getCId,
            OPERATION_NAME: "重新提交"
          };
          InsertOperationRecord(recordData); //插入操作记录
          this.$router.push({
            path: "/myorder"
          });
        }
      });
    },
    summitCurtain(orderHead) {
      let orderBody = orderHead.ORDERBODY;
      let transCookies = [];
      for (let i = 0; i < orderBody.length; i++) {
        transCookies[i] = new Object();
        transCookies[i].orderNumber = orderBody[i].ORDER_NO;
        transCookies[i].lineNo = orderBody[i].LINE_NO;
        transCookies[i].activityId = orderBody[i].curtains[0].activityId;
        transCookies[i].quantity = orderBody[i].QTY_REQUIRED;
        var price = 0;
        for(let j = 0;j< orderBody[i].curtains.length;j++){
          price += (orderBody[i].curtains[j].price.mul(orderBody[i].curtains[j].dosage));
        }
        transCookies[i].price = price;
        transCookies[i].splitShipment = orderBody[i].PART_SEND_ID;
        transCookies[i].newactivityId = orderBody[i].PROMOTION;
        transCookies[i].unit = "米";
        transCookies[i].item = new Object();
        transCookies[i].item.itemNo = orderBody[i].ITEM_NO;
        transCookies[i].item.note = orderBody[i].NOTES;
        transCookies[i].item.itemVersion = orderBody[i].PRODUCTION_VERSION;
        transCookies[i].item.groupType = "E";
        transCookies[i].salPromotion = new Object();
        transCookies[i].salPromotion.orderType = orderBody[i].PROMOTION_TYPE;
        transCookies[i].salPromotion.arrearsFlag = orderHead.ARREARSFLAG;
        transCookies[i].salPromotion.flagFl = orderBody[i].FLAG_FL_TYPE;
      }
      this.$store.commit("setOrderProduct", transCookies);
      this.$store.commit("setOrderHead", orderHead);
      this.$router.push({
        name: "fillorder",
        params: {
          isX: true,
          from: "myorder"
        }
      });
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
    this.$root.$on("refreshOrder", () => {
      this.onLoad(false);
    });
  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
    // var option = this.$refs.nav;
    // var myScroll = new this.IScroll(option, {
    //   click: true,
    //   //mouseWheel: true,//鼠标滚动
    //   scrollX: true //横向滚动
    //   //scrollbars: true,//横向滚动条
    // });
  },
  activated() {
    window.vTop = this;
    // var option = this.$refs.nav;
    // var myScroll = new this.IScroll(option, {
    //   click: true,
    //   //mouseWheel: true,//鼠标滚动
    //   scrollX: true //横向滚动
    //   //scrollbars: true,//横向滚动条
    // });
    if (this.$route.params.refresh) this.orderSearch();
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

.top-bottom {
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: absolute;
  top: 0;
}
.orderType {
  width: 100%;
  position: relative;
  font-size: 13px;
  border-bottom: 2px solid #bedd81;
}
.nav-status {
  width: 100%;
  height: 35px;
  line-height: 50px;
  position: relative;
  background: #fff;
  border-bottom: 2px solid #bedd81;
}
.nav-status ul {
  width: 900px;
}
.nav-status li {
  display: inline-block;
  margin: 10px 0px;
  font-size: 13px;
  height: 15px;
  line-height: 18px;
}
.nav-status li a {
  color: #2c3e50;
}
.active {
  padding: 3px 5px;
  border-bottom: 2px solid orange;
  color: orange !important;
  font-size: 14px;
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
.search-title {
  position: relative;
  top: 50px;
}
.search-title input::-webkit-input-placeholder {
  color: white;
}

input {
  background-color: #fff;
  border-radius: 3.467vw;
  outline: none;
  border: none;
  text-decoration: none;
  height: 25px;
  line-height: 25px;
}
.status-input {
  width: 130px;
  height: 25px;
  line-height: 25px;
  border-radius: 3.467vw;
  background-color: hsl(0, 0%, 100%);
  font-size: 14px;
  border: none;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  text-align: left;

  background-image: url("../../assetsorder/time-zk.png");
  background-repeat: no-repeat;
  background-position-x: 115px;
  background-position-y: 1vw;
  background-size: 15px;
}
.search-input {
  margin-left: 10px;
  padding-left: 10px;
  flex: 1;
  font-size: 14px;
}
.search-input-ct {
  border-bottom: 2px solid #bedd81;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
}
.search-button {
  display: inline-block;
  width: 80px;
  font-size: 14px;
  background-color: #fff;
  border-radius: 3.467vw;
  height: 25px;
  line-height: 25px;
  vertical-align: middle;
}

ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

.ulhead {
  position: relative;
  line-height: 37px;
  width: 100%;
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

.content {
  position: fixed;
  top: 50px;
  bottom: 0;
  width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-flow: column; /*垂直布局*/
}
.content-top {
  width: 100%;
  position: relative;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
}
/*订单显示*/
.orders {
  /* position: relative; */
  flex: 1;
  /* height: 75%; */
  font-size: 14.5px;
  overflow-y: scroll;
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
  padding: 8px 15px;
  margin-left: 10px;
  border: 1px solid #999686;
  border-radius: 20px;
  font-size: 13px;
}

.next-do .to-pay {
  border: 1px solid #a0cb8d;
  color: #a0cb8d;
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
.detail-button-showstatus {
  position: absolute;
  bottom: 65px;
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
