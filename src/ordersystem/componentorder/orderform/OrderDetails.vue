<template>
  <div class="order-details">
    <top :top="set" :from="from"></top>
    <div class="banner">
      <div class="wait-time" ref="statusIcon"></div>
      <span class="status-title">{{statusTitle}}</span>
      <span class="wait-pay-time" v-if="timeRemain">剩余 小时 分钟</span>
      <div class="address" v-show="orderStatus">
        <img class="address-icon" src="../../assetsorder/address.png" alt />
        <div class="address-contain">
          <div class="contct">
            <span>{{oneOrder.WL_CONTACTS}}</span>
            <span>{{oneOrder.WL_TEL}}</span>
          </div>
          <div class="address-text">{{oneOrder.ALL_ADDRESS}}</div>
        </div>
      </div>
      <div class="completed-msg" v-show="!orderStatus">
        <img class="completed-car" src="../../assetsorder/car.png" alt />
        <span>感谢您在玉兰购物，欢迎再次光临</span>
      </div>
    </div>
    <div class="order-msg order-msg-item1">
      <table>
        <tr>
          <th>订单编号：</th>
          <td>{{oneOrder.ORDER_NO}}</td>
        </tr>
        <tr>
          <th>下单时间：</th>
          <td>{{oneOrder.DATE_CRE}}</td>
        </tr>
      </table>
    </div>
    <div class="order-msg">
      <table>
        <tr>
          <th>甲方：</th>
          <td>广东玉兰集团股份有限公司</td>
        </tr>
        <tr>
          <th>订货乙方：</th>
          <td>{{realName}}</td>
        </tr>
        <tr>
          <th>经办人：</th>
          <td>{{oneOrder.LINKPERSON}}</td>
        </tr>
        <tr>
          <th>经办人联系方式：</th>
          <td>{{oneOrder.TELEPHONE}}</td>
        </tr>
      </table>
    </div>
    <div class="order-msg">
      <table>
        <tr>
          <th>配送方式：</th>
          <td>普通物流(由甲方支付运费)</td>
        </tr>
        <tr>
          <th>备注：</th>
          <td>{{oneOrder.NOTES}}</td>
        </tr>
      </table>
    </div>
    <div class="product">
      <div class="good-head">
        <!--<img class="goood-img" src="../../assetsorder/good.png" alt="">-->
        <span class="good-title">全部商品</span>
      </div>
      <div class="good-contain" v-for="(good,index) in oneOrder.ORDERBODY" :key="index">
        <div class="good-item1">
          <span>{{good.ITEM_NO}} {{good.NOTE}} {{good.PRODUCTION_VERSION}}</span>
          <span v-if="showPrice" style="float:right;margin-right: 80px;">￥{{good.UNIT_PRICE}}</span>
          <span class="good-num">数量：{{good.QTY_REQUIRED}}</span>
        </div>
        <div class="good-item2">
          <span>活动类型</span>
          <span class="hd-after">{{good.PROMOTION}}</span>
        </div>
        <div class="good-item3">
          <span>说明</span>
          <span class="hd-after">{{good.productTip}}</span>
        </div>
        <div class="good-item4">
          <span>备注</span>
          <span class="good-num">{{good.NOTES}}</span>
        </div>
        <!-- <div class="good-item5" v-if="good.packDetailId"> -->
          <!--<div class="good-item5">-->
          <!-- <span @click="toThdh(good.ITEM_NO)">出货详情</span>
        </div> -->
      </div>
    </div>
    <div class="order-msg order-msg-item2">
      <table>
        <tr>
          <th>年返利使用金额：</th>
          <td v-if="showPrice">￥{{oneOrder.ALLBACK_M + oneOrder.ALLBACK_Y}}</td>
          <td v-else>***</td>
        </tr>
        <tr>
          <th>应付金额：</th>
          <td v-if="showPrice">￥{{oneOrder.ALL_SPEND}}</td>
          <td v-else>***</td>
        </tr>
      </table>
      <div class="total">
        <span>应付总额：</span>
        <span v-if="showPrice" class="total-amount">￥{{oneOrder.ALL_SPEND}}</span>
        <span v-else class="total-amount">***</span>
      </div>
    </div>
    <div class="bottom-nav" v-show="notpayBottom">
      <span @click="cancelOrder" class="cancel-topay">取消订单</span>
      <span @click="tjOrder" class="topay">提交</span>
    </div>
    <div class="bottom-nav" v-show="completeBottom">
      <span>我要投诉</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import top from "../../../components/Top";
import { Toast, Popup, Dialog } from "vant";

export default {
  name: "orderdetails",
  components: {
    top,
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      url: "http://106.13.32.172:8080/yulan-order",
      set: 15,
      realName: this.$store.getters.getrealName,
      //判断订单是什么状态
      orderStatus: null,
      //未付款状态下的剩余时间
      timeRemain: null,
      notpayBottom: null,
      completeBottom: null,
      //单个订单详情
      oneOrder: "",
      //订单状态
      statusTitle: "",
      //是否能查看出货详情
      canCheckch: "",
      from: ""
    };
  },
  computed: {
    showPrice() {
      return this.$store.getters.getIsManage != "0";
    }
  },
  methods: {
    toThdh(itemNo) {
      this.$router.push({
        name: "thmsg",
        params: {
          itemNo: itemNo,
          orderId: this.$route.params.find
        }
      });
    },
    //该订单查找
    thisOrder() {
      let orderUrl = this.orderBaseUrl + "/order/getOrderContent.do";
      let data = {
        order_no: this.$route.params.find, //订单号
        cid: this.$store.getters.getCId //客户号
      };
      axios.post(orderUrl, data).then(data => {
        this.oneOrder = data.data.data.data[0];
        switch (this.oneOrder.STATUS_ID) {
          case "1":
            this.statusTitle = "已提交";
            break;
          case "12":
            this.statusTitle = "已接收";
            break;
          case "2":
            this.statusTitle = "已受理";
            break;
          case "3":
            this.statusTitle = "已作废";
            break;
          case "4":
            this.statusTitle = "部分发货";
            break;
          case "5":
            this.statusTitle = "余额不足待提交";
            break;
          case "6":
            this.statusTitle = "余额不足可提交";
            break;
          case "7":
            this.statusTitle = "已完成";
            break;
        }
        for (let i = 0; i < this.oneOrder.ORDERBODY.length; i++) {
          if (this.oneOrder.ORDERBODY[i].PART_SEND_ID == "0") {
            this.oneOrder.ORDERBODY[i].productTip = "等生产";
          } else if (this.oneOrder.ORDERBODY[i].PART_SEND_ID == "1") {
            this.oneOrder.ORDERBODY[i].productTip = "分批发货";
          } else {
            this.oneOrder.ORDERBODY[i].productTip = "--";
          }
        }
        if (this.statusTitle == "已完成") {
          this.orderStatus = false;
          this.$refs.statusIcon.className = "completed";
          this.notpayBottom = false;
          this.completeBottom = true;
        } else if (
          this.statusTitle == "余额不足可提交" ||
          this.statusTitle == "余额不足待提交"
        ) {
          this.orderStatus = true;
          this.$refs.statusIcon.className = "wait-time";
          this.timeRemain = true;
          this.notpayBottom = true;
          this.completeBottom = false;
        } else {
          this.orderStatus = true;
          this.notpayBottom = false;
          this.completeBottom = false;
        }
        // this.checkChuhuo()
      });
    },
    //能否查看出货详情
    // checkChuhuo() {
    //   if (this.statusTitle == "已受理") {
    //     for (let i = 0; i < this.oneOrder.ORDERBODY.length;i++){
    //       if (this.oneOrder.ORDERBODY.packDetailId) {
    //         this.oneOrder.ORDERBODY.packDetailId =
    //       }
    //     }
    //     this.canCheckch = true
    //   } else {
    //     this.canCheckch = false
    //   }
    // },
    //取消订单
    cancelOrder() {
      Dialog.confirm({
        message: "是否确认取消订单"
      })
        .then(() => {
          // on confirm
          let orderUrl = this.orderBaseUrl + "/order/cancelOrder.do";
          let orderData = {
            orderNo: this.$route.params.find //订单号
          };
          axios.post(orderUrl, orderData).then(res => {
            if (res.data.msg == "SUCCESS") {
              Toast({
                duration: 1000,
                message: "取消订单成功"
              });
              this.$router.push({
                path: "/myorder"
              });
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //再次提交订单时的余额判断
    tjOrder() {
      if (this.statusTitle == "余额不足待提交") {
        //余额查询
        let monUrl = this.orderBaseUrl + "/order/getResidemoney.do";
        let mondata = {
          comapnyId: this.$store.getters.getCMId //登录客户号
        };
        axios.post(monUrl, mondata).then(val => {
          if (val.data.data > this.oneOrder.ALL_SPEND) {
            this.onSubmitOrder();
          } else {
            Dialog.alert({
              message: "余额不足,提交失败"
            }).then(() => {
              // on close
              this.$router.push({
                path: "/myorder"
              });
            });
          }
        });
      } else if (this.statusTitle == "余额不足可提交") {
        this.onSubmitOrder();
      }
    },
    //订单提交
    onSubmitOrder() {
      let orderURL = this.orderBaseUrl + "/order/putAgainOrder.do";
      let orderData = {
        cid: this.$store.getters.getCId, //登录客户号
        orderNo: this.$route.params.find //订单号
      };
      axios.post(orderURL, orderData).then(res => {
        if (res.data.code == 0) {
          Toast({
            duration: 1000,
            message: "订单提交成功"
          });
          this.$router.push({
            path: "/myorder"
          });
        }
      });
    }
  },
  created() {
    this.from = this.$route.params.from;
    this.thisOrder();
  },
  mounted() {}
};
</script>

<style scoped>
.order-details {
  /*给单独页面设置背景色*/
  width: 100%;
  height: 100%;
  position: fixed;
  background: #ededed;
  overflow-y: scroll;
}

.banner {
  margin-top: 49px;
  /*background: -webkit-linear-gradient(left,#ABD46C, #89CB81);*/
  background: linear-gradient(to right, #bedd81, #87ca81);
  height: 80px;
  position: relative;
  color: white;
}

.wait-time {
  width: 20px;
  height: 20px;
  background: url("../../assetsorder/time.png");
  background-size: 100% 100%;
  position: absolute;
  top: 10px;
  left: 25px;
}

.completed {
  width: 20px;
  height: 20px;
  background: url("../../assetsorder/completed.png");
  background-size: 100% 100%;
  position: absolute;
  top: 10px;
  left: 25px;
}

.status-title {
  font-size: 18px;
  font-weight: bold;
  float: left;
  margin-top: 9px;
  margin-left: 50px;
}

.wait-pay-time {
  float: right;
  margin-top: 9px;
  margin-right: 25px;
  font-size: 13px;
}

.address {
  /*height: 100px;*/
  width: 100%;
  /*margin: 0 10px;*/
  border-radius: 10px;
  position: absolute;
  bottom: -60px;
  background: white;
  color: #2c3e50;
  -moz-box-shadow: 1px 3px 8px #e7e7e7;
  -webkit-box-shadow: 1px 3px 8px #e7e7e7;
  box-shadow: 1px 3px 8px #e7e7e7;
}

.address-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  margin-top: -10px;
  left: 10px;
}

.completed-msg {
  width: 90%;
  height: 70px;
  line-height: 70px;
  /*margin: 0 auto;*/
  border-radius: 10px;
  position: absolute;
  bottom: -40px;
  left: 50%;
  margin-left: -45%;
  background: white;
  color: #2c3e50;
  font-size: 18px;
  font-weight: bold;
  -moz-box-shadow: 1px 3px 8px #e7e7e7;
  -webkit-box-shadow: 1px 3px 8px #e7e7e7;
  box-shadow: 1px 3px 8px #e7e7e7;
}

.completed-car {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  margin-top: -10px;
  left: 10px;
}

.address-contain {
  padding: 20px 30px;
}

.contct {
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.contct span {
  margin-right: 10px;
}

.address-text {
  text-align: left;
  font-size: 13px;
}

/*产品明细*/
.product {
  position: relative;
  padding: 10px 10px;
  text-align: left;
  background: #ffffff;
  border-radius: 5px;
}

.good-head {
  background: #a0cb8db0;
  color: white;
  height: 30px;
  line-height: 30px;
  border-bottom: 0.4px solid rgba(153, 150, 134, 0.5);
  border-bottom: 1px solid #ebedf0;
}

.good-title {
  font-size: 15px;
  margin-left: 25px;
}

.goood-img {
  width: 25px;
  height: 20px;
  position: absolute;
  top: 15px;
  left: 13px;
}

.good-contain {
  border-bottom: 1px solid #a0cb8d78;
  font-size: 14px;
  position: relative;
  padding-bottom: 5px;
}

.good-item1,
.good-item2,
.good-item3,
.good-item4,
.good-item5 {
  height: 20px;
  line-height: 20px;
  margin: 5px 10px 0 10px;
  /*font-size: 15px;*/
}

.good-item2,
.good-item3,
.good-item4,
.good-item5 {
  margin-left: 60px;
}

.good-item5 {
  height: 30px;
  line-height: 30px;
}

.good-item5 span {
  float: right;
  width: 100px;
  text-align: center;
  border-radius: 15px;
  border: 1px solid #e1e1e1;
}

.price {
  /*color: #ff4c33;*/
  float: right;
  margin: 0 10px;
}

.good-num,
.hd-after {
  float: right;
}

.hd-after {
  color: #ff4c33;
}

.good-num {
  position: absolute;
  right: 0;
  margin-right: 10px;
}

.order-msg {
  background: white;
  margin: 8px 0;
  padding: 10px 10px 15px 10px;
  font-size: 15px;
  border-radius: 5px;
}

.order-msg-item1 {
  margin-top: 70px;
  border-radius: 5px;
}
.order-msg-item2 {
  margin-bottom: 60px;
}
.order-msg th {
  text-align: left;
}

.order-msg td {
  text-align: left;
}

.total {
  text-align: right;
}

.total-amount {
  color: #ff4609;
  font-weight: bold;
  font-size: 20px;
}

.bottom-nav {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: white;
  position: fixed;
  bottom: 0;
  text-align: right;
  border-top: 1px solid #ededed;
}

.bottom-nav span {
  display: inline-block;
  width: 80px;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  text-align: center;
  /*border: 1px solid #999686;*/
  border-radius: 20px;
  margin-right: 10px;
}

.topay {
  /*border: none;*/
  background: linear-gradient(to right, #f05454, #ff4500);
  color: white;
}
.cancel-topay {
  background: #a0cb8d;
  color: white;
}
</style>
