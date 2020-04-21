<template>
  <div class="order-details">
    <top :top="set" :from="from"></top>
    <div class="banner">
      <!-- <div class="wait-time" ref="statusIcon"></div>
      <span class="status-title">{{statusTitle}}</span>-->
      <!-- <span class="wait-pay-time" v-if="timeRemain">剩余 小时 分钟</span> -->
      <div class="address">
        <img class="address-icon" src="../../assetsorder/address.png" alt />
        <div class="address-contain">
          <div class="contct">
            <span>{{oneOrder.WL_CONTACTS}}</span>
            <span>{{oneOrder.WL_TEL}}</span>
          </div>
          <div class="address-text">{{oneOrder.ALL_ADDRESS}}</div>
        </div>
      </div>
      <!-- <div class="completed-msg" v-show="!orderStatus">
        <img class="completed-car" src="../../assetsorder/car.png" alt />
        <span>感谢您在玉兰购物，欢迎再次光临</span>
      </div>-->
    </div>
    <div class="order-msg order-msg-item1">
      <table>
        <tr>
          <th>订单号：</th>
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
          <td>{{oneOrder.LINKPERSON}}({{oneOrder.TELEPHONE}})</td>
        </tr>
      </table>
    </div>
    <div class="order-msg">
      <table>
        <tr>
          <th>购买人：</th>
          <td>{{oneOrder.BUYUSER}}({{ oneOrder.BUYUSERPHONE }})</td>
        </tr>
        <tr>
          <th>购买人地址：</th>
          <td>{{oneOrder.BUYUSER_ADDRESS}}</td>
        </tr>
        <tr v-if="oneOrder.BUYUSER_PICTURE">
          <th>购买凭证：</th>
          <td><u style="color:#4994df;" @click="showPic = true">查看购买凭证</u></td>
        </tr>
      </table>
    </div>
    <div class="order-msg">
      <table>
        <tr>
          <th>配送方式：</th>
          <td>普通物流(由甲方支付运费)</td>
        </tr>
        <tr v-if="oneOrder.PACKING_NOTE">
          <th>分包备注：</th>
          <td>{{oneOrder.PACKING_NOTE}}</td>
        </tr>
        <tr>
          <th>备注：</th>
          <td>{{oneOrder.NOTES}}</td>
        </tr>
        <tr>
          <th>玉兰处理说明：</th>
          <td>{{oneOrder.YULAN_NOTES}}</td>
        </tr>
      </table>
    </div>
    <div style="margin-bottom:5px;">
      <van-collapse v-model="activeName">
        <van-collapse-item name="1" style="position:relative;text-align:left;">
          <div slot="title">
            <van-icon name="todo-list-o" />
            <span style="margin-left:3px;font-size:14.5px;font-weight: bold;">处理记录</span>
          </div>
          <div class="orderRecord">
            <table>
              <tr v-for="(record,index) in operationRecords" :key="index">
                <span v-html="record.OPERATION_NOTE"></span>
              </tr>
            </table>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="product">
      <div class="good-head">
        <span class="good-title">全部商品</span>
      </div>
      <div
        class="good-contain"
        v-for="(good,index) in oneOrder.ORDERBODY"
        :key="index"
        @click="checkCurtain(good,index)"
      >
        <div class="good-item1">
          <span>
            {{good.ITEM_NO}} {{good.NOTE}}
            <span
              v-if="good.checkStatus"
              style="color:red;"
            >({{good.checkStatus}})</span>
          </span>
          <span class="good-num">数量：{{good.QTY_REQUIRED}}</span>
          <span v-if="showPrice" style="float:right;margin-right:70px;">单价：￥{{good.UNIT_PRICE}}</span>
          <span v-else style="float:right;margin-right:70px;">***</span>
        </div>
        <div class="good-item2">
          <span>活动类型</span>
          <span class="hd-after">{{good.PROMOTION}}</span>
        </div>
        <div class="good-item2">
          <span>折后金额</span>
          <span class="hd-after" v-if="showPrice">￥{{good.FINAL_COST}}</span>
          <span class="hd-after" v-else>￥***</span>
        </div>
        <div class="good-item2" v-if="!isX">
          <span>发货说明</span>
          <span class="hd-after">{{good.productTip}}</span>
        </div>
        <div class="good-item2">
          <span>备注</span>
          <span class="good-num">{{good.NOTES}}</span>
        </div>
        <div class="good-item2" v-if="isX">
          <span>兰居备注</span>
          <span class="good-num">{{good.LJ_SUGGESTION}}</span>
        </div>
        <div style="margin-left: 10px;" v-if="good.checkStatus">
          <span style="color:red;">修改后的价格以实际提交时为准</span>
        </div>
        <!-- 判断是否有出货详情 -->
        <div class="good-item2" v-if="good.packDetailId!=0"> 
          <span class="edit-bank-xg" style="float:right;" @click="addRefundRecord(good)">售 后</span>
          <span class="edit-bank-ts" style="float:right;" @click="complaints_1(good)">投 诉 </span>
        </div>
        <!-- <div >
          <div>
            <van-button v-if="good.packDetailId!= 0"  @click="complaints_1(good)">投 诉</van-button>
          </div>
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
      <span
        @click="cancelOrder"
        v-if="oneOrder.STATUS_ID == 5 ||
                oneOrder.STATUS_ID == 6 ||
                oneOrder.STATUS_ID == 0 ||
                (oneOrder.STATUS_ID == 1 &&
                  oneOrder.CURTAIN_STATUS_ID !== '' &&
                  oneOrder.CURTAIN_STATUS_ID == 0)"
      >作废订单</span>
      <span
        @click="tjOrder"
        class="success-btn"
        v-if="oneOrder.STATUS_ID == 5 || oneOrder.STATUS_ID == 6"
      >提交订单</span>
      <span
        @click="summitCurtain"
        class="success-btn"
        v-if="(oneOrder.CURTAIN_STATUS_ID == 0 || oneOrder.CURTAIN_STATUS_ID == 4) && oneOrder.STATUS_ID == 0"
      >提交订单</span>
      <span @click="_defeat" class="fail-btn" v-if="oneOrder.CURTAIN_STATUS_ID == 2">退回兰居修改</span>
      <span @click="_pass" class="success-btn" v-if="oneOrder.CURTAIN_STATUS_ID == 2">确认兰居修改</span>
      <span @click="LjExamine" class="success-btn" v-if="oneOrder.CURTAIN_STATUS_ID == 1">确认修改</span>
    </div>
    <!-- <div class="bottom-nav" v-show="completeBottom">
      <span>我要投诉</span>
    </div>-->
    <van-popup
      style="width:100%;height:100%;"
      v-model="showCurtainDetail"
      v-if="showCurtainDetail"
      transition="slide"
      position="right"
    >
      <detailCurtain
        :curtainData="curtainData"
        :tableStatus="tableStatus"
        @backclick="backclick"
        @getChangeData="getChangeData"
      ></detailCurtain>
    </van-popup>
    <van-image-preview v-model="showPic" :images="imgSrc"></van-image-preview>
  </div>
</template>

<script>
import axios from "axios";
import top from "../../../components/Top";
import { Toast, Popup, Dialog, Collapse, CollapseItem, Icon ,Button} from "vant";
import {
  QueryNoById
  } from "@/api/complaintASP";
import { getPackDetailInfo,getReturnInfo,getCompanyInfo} from "@/api/orderListASP";
import {
  updateCurtainOrder,
  InsertOperationRecord,
  getOperationRecord,
  cancelOrderNew,
  copyCartItem,
  GetCtmOrder,
  GetPromotionByType,
  GetOrderUseRebate
} from "@/api/orderListASP";
import { async } from "q";
import detailCurtain from "./detailCurtain";

export default {
  name: "orderdetails",
  components: {
    top,
    detailCurtain,
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Icon.name]: Icon,
    [Button.name]:Button,
  },
  data() {
    return {
      url: "http://106.13.32.172:8080/yulan-order",
      set: 15,
      realName: this.$store.getters.getrealName,
      orderNo: this.$route.params.find,
      isX: this.$route.params.find.slice(0, 1) == "X",
      //判断订单是什么状态
      orderStatus: false,
      //未付款状态下的剩余时间
      timeRemain: false,
      notpayBottom: false,
      completeBottom: false,
      showPic:false,
      imgSrc:[],
      //单个订单详情
      oneOrder: "",
      //订单状态
      statusTitle: "",
      //是否能查看出货详情
      canCheckch: "",
      from: "",
      showCurtainDetail: false,
      curtainData: [],
      tableStatus: 0,
      selectIndex: 0,
      changeFlag: false,
      activeName: [],
      operationRecords: [],
      ORDER_NO:"",
      getNo:[],
    };
  },
  computed: {
    showPrice() {
      return this.$store.getters.getIsManage != "0";
    }
  },
  methods: {
    //新增售后赔偿单
    addRefundRecord(good) {
        console.log(good);
        this.$router.push({
           name: "addOrEditRefund",
           params: {
              partInfo:good,//获取订单详情中的部分数据
              STATE:"SUBMITTED",//新增后的状态：已提交
              from:"orderdetails/" + this.orderNo
           }
        });
    },
    //投诉
    complaints_1(val){
      this.ORDER_NO=val.ORDER_NO
      getPackDetailInfo({
        orderNo: val.ORDER_NO,
        lineNo: val.LINE_NO,
        itemNo: val.ITEM_NO
      }).then(res => {
        this.getNo = res.data[0].packDetails[0];
        this.complaints(this.getNo)
        //this.showComplaints = true;
      });
    },
    complaints(val){
      this.$router.push({
        name: "addOrEditComplaint",
        params: {
          ORDER_NO:this.ORDER_NO,
          ITEM_NO:val.ITEM_NO,
          SALE_NO:val.SALE_NO,
          TRANS_ID:val.TRANS_ID,
          STATUS:1,
          from: "orderdetails/" + this.ORDER_NO
        }
      });
    },
    backclick() {
      this.showCurtainDetail = false;
    },
    toThdh(itemNo) {
      this.$router.push({
        name: "thmsg",
        params: {
          itemNo: itemNo,
          orderId: this.orderNo
        }
      });
    },
    //该订单查找
    thisOrder() {
      let orderUrl = this.orderBaseUrl + "/order/getOrderContent.do";
      let data = {
        order_no: this.orderNo, //订单号
        cid: this.$store.getters.getCId //客户号
      };
      axios.post(orderUrl, data).then(data => {
        GetCtmOrder({ orderNo: this.orderNo }).then(res => {
          this.oneOrder = data.data.data.data[0];
          this.oneOrder.PACKING_NOTE = res.data.PACKING_NOTE; //先这样处理，后台换了后台就不需要了
          this.oneOrder.BUYUSER_ADDRESS = res.data.BUYUSER_ADDRESS;
          this.oneOrder.BUYUSER_PICTURE = res.data.BUYUSER_PICTURE;
          if (this.oneOrder.BUYUSER_PICTURE) {
            var list = this.oneOrder.BUYUSER_PICTURE.split(";");
            for (var i = 0; i < list.length - 1; i++) {
              var index = list[i].lastIndexOf("/");
              if (index == -1) index = list[i].lastIndexOf("\\");
              var fileName = list[i].substr(index + 1);
              this.imgSrc.push(this.baseUrlASP + list[i]);
            }
          }
          for (let i = 0; i < this.oneOrder.ORDERBODY.length; i++) {
            if (this.oneOrder.ORDERBODY[i].PART_SEND_ID == "0") {
              this.oneOrder.ORDERBODY[i].productTip = "等生产";
            } else if (this.oneOrder.ORDERBODY[i].PART_SEND_ID == "1") {
              this.oneOrder.ORDERBODY[i].productTip = "分批发货";
            } else {
              this.oneOrder.ORDERBODY[i].productTip = "--";
            }
            this.oneOrder.ORDERBODY[i].checkStatus = "";
          }
          this.notpayBottom = false;
          if (
            this.oneOrder.STATUS_ID == 5 ||
            this.oneOrder.STATUS_ID == 6 ||
            this.oneOrder.STATUS_ID == 0 ||
            (this.oneOrder.STATUS_ID == 1 &&
              this.oneOrder.CURTAIN_STATUS_ID !== "" &&
              this.oneOrder.CURTAIN_STATUS_ID !== " " &&
              this.oneOrder.CURTAIN_STATUS_ID == 0)
          ) {
            this.notpayBottom = true;
          }
          getOperationRecord({ orderNo: this.orderNo }).then(res2 => {
            this.operationRecords = res2.data;
          });
        });
      });
    },
    //取消订单
    cancelOrder() {
      Dialog.confirm({
        message: "是否确认作废订单"
      })
        .then(() => {
          cancelOrderNew({
            cid: this.$store.getters.getCId,
            orderNo: this.orderNo
          }).then(res => {
            Dialog.confirm({
              message: "作废成功，是否退回数据到购物车"
            })
              .then(() => {
                copyCartItem({
                  orderNo: this.orderNo
                }).then(res => {
                  Toast({
                    duration: 1000,
                    message: "复制成功，请到购物车中查看"
                  });
                });
                this.$router.push({
                  name: "myorder",
                  params: {
                    refresh: true
                  }
                });
              })
              .catch(() => {
                this.$router.push({
                  name: "myorder",
                  params: {
                    refresh: true
                  }
                });
              });
          });
        })
        .catch(() => {});
    },
    //再次提交订单时的余额判断
    tjOrder() {
      //余额查询
      let monUrl = this.orderBaseUrl + "/order/getResidemoney.do";
      let mondata = {
        cid: this.$store.getters.getCId,
        companyId: this.$store.getters.getCMId //登录客户号
      };
      axios.post(monUrl, mondata).then(async val => {
        if (val.data.data > this.oneOrder.ALL_SPEND) {
          if (this.oneOrder.STATUS_ID == 5 || this.oneOrder.STATUS_ID == 6) {
            for (var i = 0; i < this.oneOrder.ORDERBODY.length; i++) {
              if (this.oneOrder.ORDERBODY[i].PROMOTION_TYPE) {
                var res = await GetPromotionByType({
                  proType: this.oneOrder.ORDERBODY[i].PROMOTION_TYPE,
                  cid: this.$store.getters.getCId
                });
                if (!res.data) {
                  Dialog.alert({
                    message: `活动‘&${this.oneOrder.ORDERBODY[i].PROMOTION}’不存在`
                  }).then(() => {});
                  return;
                }
                if (
                  new Date(res.data.DATE_END) < new Date() ||
                  res.data.USE_ID == "0"
                ) {
                  Dialog.alert({
                    message: `活动‘&${this.oneOrder.ORDERBODY[i].PROMOTION}’已过期，请删除订单后重新下单`
                  }).then(() => {});
                  return;
                }
              }
              if (
                this.oneOrder.ORDERBODY[i].BACK_Y > 0 ||
                this.oneOrder.ORDERBODY[i].BACK_M > 0
              ) {
                var res = await GetOrderUseRebate({
                  orderNo: this.oneOrder.ORDERBODY[i].ORDER_NO,
                  lineNo: this.oneOrder.ORDERBODY[i].LINE_NO
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
            this.onSubmitOrder();
          }
        } else {
          Dialog.alert({
            message: "余额不足,提交失败"
          }).then(() => {
            // on close
            this.$router.push({
              name: "myorder",
              params: {
                refresh: true
              }
            });
          });
        }
      });
    },
    //订单提交
    onSubmitOrder() {
      let orderURL = this.orderBaseUrl + "/order/putAgainOrder.do";
      let orderData = {
        cid: this.$store.getters.getCId, //登录客户号
        orderNo: this.orderNo //订单号
      };
      axios.post(orderURL, orderData).then(res => {
        if (res.data.code == 0) {
          Toast({
            duration: 1000,
            message: "订单提交成功"
          });
          var recordData = {
            ORDER_NO: this.orderNo,
            OPERATION_PERSON: this.$store.getters.getCId,
            OPERATION_NAME: "重新提交"
          };
          InsertOperationRecord(recordData); //插入操作记录
          this.$router.push({
            name: "myorder",
            params: {
              refresh: true
            }
          });
        }
      });
    },
    summitCurtain() {
      var orderHead = this.oneOrder;
      let orderBody = orderHead.ORDERBODY;
      let transCookies = [];
      for (let i = 0; i < orderBody.length; i++) {
        transCookies[i] = new Object();
        transCookies[i].orderNumber = orderBody[i].ORDER_NO;
        transCookies[i].lineNo = orderBody[i].LINE_NO;
        transCookies[i].activityId = orderBody[i].curtains[0].activityId;
        transCookies[i].quantity = orderBody[i].QTY_REQUIRED;
        transCookies[i].price = orderBody[i].UNIT_PRICE;
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
          from: "orderdetails/" + this.orderNo
        }
      });
    },
    //确认兰居修改，通过订单审核变为可提交状态
    _pass() {
      var url = this.orderBaseUrl + "/order/updateCurOrderStatus.do";
      var data = {
        orderNo: this.orderNo,
        curtainStatusId: "4"
      };
      Dialog.confirm({
        message: "确认同意兰居修改？"
      })
        .then(() => {
          axios
            .post(url, data)
            .then(res => {
              if (res.data.code == 0) {
                var recordData = {
                  ORDER_NO: this.orderNo,
                  OPERATION_PERSON: this.$store.getters.getCId,
                  OPERATION_NAME: "确认兰居修改"
                };
                InsertOperationRecord(recordData); //插入操作记录
                Toast({
                  duration: 1000,
                  message: "操作成功,该订单已经确认,可再次提交"
                });
                this.$root.$emit("refreshOrder");
                this.oneOrder.CURTAIN_STATUS_ID = 4;
              } else {
                Toast({
                  duration: 1000,
                  message: "操作失败，请稍后重试"
                });
              }
            })
            .catch(res => {
              Toast({
                duration: 1000,
                message: "操作失败，请稍后重试"
              });
            });
        })
        .catch(() => {});
    },
    //退回兰居修改
    _defeat() {
      var url = this.orderBaseUrl + "/order/updateCurOrderStatus.do";
      var data = {
        orderNo: this.orderNo,
        curtainStatusId: "3"
      };
      Dialog.confirm({
        message: "确定将订单退回兰居重新修改？"
      })
        .then(() => {
          axios
            .post(url, data)
            .then(res => {
              if (res.data.code == 0) {
                var recordData = {
                  ORDER_NO: this.orderNo,
                  OPERATION_PERSON: this.$store.getters.getCId,
                  OPERATION_NAME: "退回兰居修改"
                };
                InsertOperationRecord(recordData); //插入操作记录
                Toast({
                  duration: 1000,
                  message: "操作成功,该订单已退回兰居修改"
                });
                this.$router.push({
                  name: "myorder",
                  params: {
                    refresh: true
                  }
                });
              } else {
                Toast({
                  duration: 1000,
                  message: "操作失败，请稍后重试"
                });
              }
            })
            .catch(res => {
              Toast({
                duration: 1000,
                message: "操作失败，请稍后重试"
              });
            });
        })
        .catch(() => {});
    },
    LjExamine() {
      if (this.changeFlag) {
        var allCurtains = [];
        var deleteIds = [];
        for (var i = 0; i < this.oneOrder.ORDERBODY.length; i++) {
          var oneCurtain = [];
          var curtains = this.oneOrder.ORDERBODY[i].curtains;
          for (var j = 0; j < curtains.length; j++) {
            if (curtains[j].choose == undefined || curtains[j].choose)
              oneCurtain.push(curtains[j]);
            else deleteIds.push(curtains[j].id);
          }
          allCurtains.push(oneCurtain);
        }
        var data = {
          cid: this.$store.getters.getCId,
          orderNo: this.orderNo,
          curtainStatusId: "0",
          allCurtains: allCurtains,
          deleteIds: deleteIds
        };
        Dialog.confirm({
          message: "确定修改？"
        })
          .then(() => {
            updateCurtainOrder(data)
              .then(res => {
                Toast({
                  duration: 1000,
                  message: "操作成功,请提交结算再次审核"
                });
                this.$root.$emit("refreshOrder");
                this.oneOrder.CURTAIN_STATUS_ID = 0;
              })
              .catch(res => {
                Toast({
                  duration: 1000,
                  message: "操作失败，请稍后重试"
                });
              });
          })
          .catch(() => {});
      } else {
        Toast({
          duration: 1000,
          message: "未修改任何窗帘"
        });
      }
    },
    getChangeData(curtain, chooseBig) {
      //换掉的item赋值
      for (let i = 0; i < curtain.length; i++) {
        curtain[i].itemId = curtain[i].item.itemNo;
      }
      this.oneOrder.ORDERBODY[this.selectIndex].curtains = curtain;
      this.oneOrder.ORDERBODY[this.selectIndex].chooseBig = chooseBig;
      this.oneOrder.ORDERBODY[this.selectIndex].checkStatus = "已修改";
      this.changeFlag = true;
      this.showCurtainDetail = false;
    },
    checkCurtain(item, index) {
      if (this.isX) {
        this.showCurtainDetail = true;
        this.selectIndex = index;
        this.curtainData = item;
        if (this.oneOrder.CURTAIN_STATUS_ID == 1) this.tableStatus = 1;
        else this.tableStatus = 0;
      }
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
  margin-top: 40px;
  /*background: -webkit-linear-gradient(left,#ABD46C, #89CB81);*/
  background: linear-gradient(to right, #bedd81, #87ca81);
  height: 20px;
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
  padding: 10px 30px;
}

.contct {
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.contct span {
  margin-right: 10px;
}

.address-text {
  text-align: left;
  font-size: 14px;
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
  color: #666;
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
.good-item2 {
  height: 20px;
  line-height: 20px;
  margin: 5px 10px 0 10px;
  /*font-size: 15px;*/
}

.good-item2 {
  margin-left: 60px;
}

.price {
  float: right;
  margin: 0 10px;
}

.good-num,
.hd-after {
  float: right;
}

.good-num {
  position: absolute;
  right: 0;
  margin-right: 10px;
}

.order-msg {
  background: white;
  margin: 8px 0;
  padding: 10px;
  font-size: 15px;
  border-radius: 5px;
}

.order-msg-item1 {
  margin-top: 65px;
  border-radius: 5px;
}
.order-msg-item2 {
  margin-bottom: 55px;
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
  min-width: 80px;
  height: 30px;
  padding: 0 3px;
  line-height: 30px;
  font-size: 13px;
  text-align: center;
  border-radius: 20px;
  margin-right: 10px;
  border: 1px solid #999686;
}
.success-btn {
  background: #a0cb8d;
  color: white;
}
.fail-btn {
  background: #f05454;
  color: white;
}
.edit-bank-xg {
  width:45px;
  border-radius: 3px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  background:  #f05454;
  color: white;
  position:relative;
  top:0px;
  right:0px;
}
.edit-bank-ts {
  width:45px;
  border-radius: 3px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  background:  #278be9;
  color: white;
  position:relative;
  top:0px;
  right:12px;
}
</style>
