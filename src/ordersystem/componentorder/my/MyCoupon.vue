<template>
  <div class="all-view">
    <top :top="set" :from="from"></top>
    <div class="my-coupoon">
      <template v-for="(coupon,index) in couponLists">
        <div
          class="coupon-item"
          v-if="coupon.dateId == 1 && coupon.rebateMoneyOver > 0 && coupon.status == '1'"
          :key="index"
        >
          <div class="coupon-top">
            <div class="coupon-notes">{{coupon.notes}}</div>
            <div class="coupon-allmoney">总面值{{coupon.rebateMoney}}元</div>
            <div class="quanhao">券号：{{coupon.id}}</div>
          </div>
          <div class="coupon-content">
            <div>
              <span class="coupon-remian">余额：￥</span>
              <span v-if="showPrice" class="remian-money">{{coupon.rebateMoneyOver}}</span>
              <span v-else class="remian-money">***</span>
            </div>
            <div class="coupon-yxq">有效期：{{coupon.dateStart}}至{{coupon.dateEnd}}</div>
            <div class="coupon-sy">适用：{{coupon.application}}</div>
          </div>
          <div class="coupon-more">
            <span @click="UseRecord(coupon.id)">查看使用记录>></span>
            <span @click="couponRecord(coupon.id)">查看返利记录>></span>
          </div>
        </div>
        <div class="coupon-item2" v-else :key="index">
          <div class="coupon-top">
            <div class="coupon-notes">{{coupon.notes}}</div>
            <div class="coupon-allmoney">总面值{{coupon.rebateMoney}}元</div>
            <div class="quanhao">券号：{{coupon.id}}</div>
          </div>
          <div class="coupon-content">
            <div>
              <span class="coupon-remian2">余额：￥</span>
              <span v-if="showPrice" class="remian-money2">{{coupon.rebateMoneyOver}}</span>
              <span v-else class="remian-money2">***</span>
            </div>
            <div class="coupon-yxq2">有效期：{{coupon.dateStart}}至{{coupon.dateEnd}}</div>
            <div class="coupon-sy">适用：{{coupon.application}}</div>
          </div>
          <div class="coupon-more">
            <span @click="UseRecord(coupon.id)">查看使用记录>></span>
            <span @click="couponRecord(coupon.id)">查看返利记录>></span>
          </div>
        </div>
      </template>
    </div>
    <!--优惠券使用记录-->
    <van-popup v-model="showUseCouponRecord" class="youhuiquan" position="right">
      <top @backclick="showUseCouponRecord=false" msgtitle = "优惠券使用记录"/>
      <div class="all-record" style="margin-top: 30px;">
        <div class="record-title">
          <span style="margin-left:10px;">累计使用金额：{{accMoney}}元</span>
        </div>
        <div class="singleRecord" v-for="(couponRecord,index) in allCouponRecord" :key="index">
          <table>
            <!--<tr>-->
            <!--<td>券号</td>-->
            <!--<td>{{couponRecord.id}}</td>-->
            <!--</tr>-->
            <tr>
              <td>订单号</td>
              <td>{{couponRecord.ORDER_NO}}</td>
            </tr>
            <tr>
              <td>商品型号</td>
              <td>{{couponRecord.ITEM_NO}}</td>
            </tr>
            <tr>
              <td>使用时间</td>
              <td>{{couponRecord.DATE_USE | datatrans}}</td>
            </tr>
            <tr>
              <td>备注</td>
              <td>{{couponRecord.NOTES}}</td>
            </tr>
            <!--<tr>-->
            <!--<td>使用金额</td>-->
            <!--<td>{{couponRecord.rebateMoney}}</td>-->
            <!--</tr>-->
          </table>
          <div class="use-amount">
            <span v-if="showPrice">使用金额：{{couponRecord.REBATE_MONEY}}</span>
            <span v-else>使用金额：***</span>
          </div>
        </div>
      </div>
    </van-popup>
    <!--优惠券返利记录-->
    <van-popup v-model="showCouponRecord" class="youhuiquan" position="right">
      <top @backclick="showCouponRecord=false" msgtitle = "优惠券返利记录"/>
      <div class="all-record">
        <div class="singleRecord" v-for="(couponRecord,index) in allflRecord" :key="index">
          <table>
            <tr>
              <td>优惠券类型</td>
              <td>{{couponRecord.rebateType}}</td>
            </tr>
            <tr>
              <td>创建日期</td>
              <td>{{couponRecord.dateCre}}</td>
            </tr>
            <tr>
              <td>有效期</td>
              <td>{{couponRecord.dateStart}}至{{couponRecord.dateEnd}}</td>
            </tr>
            <tr>
              <td>备注说明</td>
              <td>{{couponRecord.notes}}</td>
            </tr>
          </table>
          <div class="use-amount">
            <span v-if="showPrice">返利金额：{{couponRecord.returnMoney}}</span>
            <span v-else>返利金额：***</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import top from "../../../components/Top";
import { Popup, Toast } from "vant";
import axios from "axios";
import { getUseRecord, getTotalRecordSum } from "@/api/orderListASP";

export default {
  name: "",
  components: {
    top,
    [Popup.name]: Popup,
    [Toast.name]: Toast
  },
  data() {
    return {
      url: "http://106.14.159.244:8080/yulan-order",
      set: 27,
      couponLists: [], //所有优惠券
      showUseCouponRecord: false, //优惠券使用记录
      allCouponRecord: [], //使用记录（数组）
      showCouponRecord: false, //优惠券返利记录
      allflRecord: [],
      from: "",
      accMoney: 0
    };
  },
  computed: {
    showPrice() {
      return this.$store.getters.getIsManage != "0";
    }
  },
  filters: {
    datatrans(value) {
      //时间戳转化大法
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
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  methods: {
    getCoupon() {
      let url = this.orderBaseUrl + "/order/findRebate.do";
      let data = {
        cid: this.$store.getters.getCId, //客户号
        companyId: this.$store.getters.getCMId
      };
      axios.post(url, data).then(res => {
        if (res.data.code == 0) {
          this.couponLists = res.data.data;
          for (let i = 0; i < this.couponLists.length; i++) {
            this.couponLists[i].dateStart = this.dataExchange(
              this.couponLists[i].dateStart
            );
            this.couponLists[i].dateEnd = this.dataExchange(
              this.couponLists[i].dateEnd
            );
          }
        }
      });
    },
    //优惠券使用记录
    UseRecord(couponId) {
      getTotalRecordSum({ couponId: couponId }).then(res => {
        this.accMoney = res.data;
      });
      var data = {
        couponId: couponId,
        keyWords: "",
        beginTime: "0001/1/1",
        finishTime: "9999/12/31",
        page: 1,
        limit: 10000
      };
      getUseRecord(data).then(res => {
        this.allCouponRecord = res.data;
        if (this.allCouponRecord.length == 0) {
          Toast({
            duration: 2000,
            message: "暂无使用记录"
          });
          return;
        }
        this.showUseCouponRecord = true;
      });
      // let idurl = this.orderBaseUrl + "/order/findRecrods.do";
      // let data = {
      //   id: couponId //优惠券id
      // };
      // axios.post(idurl, data).then(res => {
      //   this.allCouponRecord = res.data.data;
      //   if (this.allCouponRecord.length == 0) {
      //     Toast({
      //       duration: 2000,
      //       message: "暂无使用记录"
      //     });
      //     return;
      //   }
      //   for (let i = 0; i < this.allCouponRecord.length; i++) {
      //     this.allCouponRecord[i].dateUse = this.dataExchange(
      //       this.allCouponRecord[i].dateUse
      //     );
      //   }
      //   this.showUseCouponRecord = true;
      // });
    },
    //优惠券返利记录
    couponRecord(couponId) {
      let idurl = this.orderBaseUrl + "/order/getReturnRecord.do";
      let data = {
        id: couponId //优惠券id
      };
      axios.post(idurl, data).then(res => {
        this.allflRecord = res.data.data;
        if (this.allflRecord.length == 0) {
          Toast({
            duration: 2000,
            message: "暂无返利记录"
          });
          return;
        }
        for (let i = 0; i < this.allflRecord.length; i++) {
          this.allflRecord[i].dateStart = this.dataExchange(
            this.allflRecord[i].dateStart
          );
          this.allflRecord[i].dateEnd = this.dataExchange(
            this.allflRecord[i].dateEnd
          );
          this.allflRecord[i].dateCre = this.dataExchange(
            this.allflRecord[i].dateCre
          );
          if (this.allflRecord[i].rebateType == "year") {
            this.allflRecord[i].rebateType = "年返券";
          } else if (this.allflRecord[i].rebateType == "month") {
            this.allflRecord[i].rebateType = "月返券";
          }
        }
        this.showCouponRecord = true;
      });
    },
    //时间戳转换为日期
    dataExchange(data) {
      var date = new Date(data);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      return Y + M + D;
    }
  },
  created() {
    this.from = this.$route.params.from;
    this.getCoupon();
  }
};
</script>

<style scoped>
.my-coupoon {
  position: fixed;
  top: 50px;
  bottom: 0;
  width: 100%;
  background-color: #f8f8f8;
  overflow: scroll;
}
.coupon-item {
  height: 200px;
  margin: 20px;
  /*padding: 10px;*/
  position: relative;
  border-radius: 10px;
  /*box-shadow: 0 1.067vw 2.133vw 0 rgba(0, 0, 0, .2), 0 1.6vw 5.333vw 0 rgba(0, 0, 0, .19);*/
  background: url("../../assetsorder/coupon.png") no-repeat center;
  background-size: 100% 100%;
}
.coupon-item2 {
  height: 200px;
  margin: 20px;
  position: relative;
  border-radius: 10px;
  background: url("../../assetsorder/couponNone.png") no-repeat center;
  background-size: 100% 100%;
}
.coupon-top {
  position: relative;
  text-align: left;
  color: white;
  font-size: 13px;
  margin-left: 45px;
}

.coupon-notes {
  padding-top: 10px;
}

.quanhao {
  position: absolute;
  right: 10px;
  bottom: 0;
}

.coupon-content {
  margin: 25px auto;
}

.coupon-remian {
  color: rgb(253, 85, 56);
  font-size: 18px;
}

.coupon-remian2 {
  color: rgb(133, 133, 133);
  font-size: 18px;
}
.remian-money {
  background: -webkit-linear-gradient(
    left,
    rgb(253, 59, 49) 22%,
    rgb(253, 128, 67) 50%,
    rgb(253, 168, 77) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 40px;
  font-weight: bold;
}
.remian-money2 {
  color: rgb(133, 133, 133);
  font-size: 40px;
  font-weight: bold;
}
.coupon-yxq {
  background: rgb(253, 59, 49);
  display: inline-block;
  padding: 3px 6px;
  border-radius: 10px;
  color: white;
  font-size: 12px;
}
.coupon-yxq2 {
  background: rgb(105, 105, 105);
  display: inline-block;
  padding: 3px 6px;
  border-radius: 10px;
  color: white;
  font-size: 12px;
}
.coupon-sy {
  font-size: 12px;
}

.coupon-more {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
}

.coupon-more span {
  margin: 0 10px;
}
.youhuiquan {
  width: 100%;
  height: 100%;
}
.all-record {
  background: #f8f8f8;
  position: fixed;
  overflow-y: scroll;
  top: 50px;
  bottom: 0;
  left: 0;
  width: 100%;
  -webkit-overflow-scrolling: touch; /*这句是为了滑动更顺畅*/
  font-size: 13px;
}
.singleRecord {
  position: relative;
  background: white;
  margin: 10px;
  margin: 10px;
  border-radius: 10px;
  text-align: left;
  padding: 10px;
  -moz-box-shadow: 0px 1px 6px #333333;
  -webkit-box-shadow: 0px 1px 6px #333333;
  box-shadow: 0px 1px 6px #333333;
}
.use-amount {
  position: absolute;
  bottom: 13px;
  left: 240px;
}
.record-title {
  position: fixed;
  z-index: 99;
  height: 30px;
  width: 100%;
  display: -webkit-box;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  line-height: 30px;
  top: 50px;
  background: #ffffff;
  border-bottom: 1px solid #dedede;
  font-size: 11px;
}
</style>
