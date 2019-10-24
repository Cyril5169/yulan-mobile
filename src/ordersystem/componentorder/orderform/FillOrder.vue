<template>
  <div>
    <top :top="set"></top>
    <div class="contain">
      <div class="address" @click="toAddList">
        <img class="add-icon" src="../../assetsorder/address.png" alt />
        <div class="add-contain">
          <div class="contct">
            <span>{{address.name}}</span>
            <span>{{address.tel}}</span>
          </div>
          <div class="address-text">{{address.address}}</div>
        </div>
        <img class="more" src="../../assetsorder/more.png" alt />
      </div>
      <div class="details-list">
        <table class="order-item">
          <tr class="delivery" @click="showDelivery = true">
            <td class="left">配送方式</td>
            <td class="right">{{deliveryType}}</td>
            <td>
              <img class="more-right" src="../../assetsorder/more.png" alt />
            </td>
          </tr>
        </table>
        <table class="order-item">
          <tr class="delivery">
            <td class="left" ref="WLbeizhu">物流公司</td>
            <td class="right">
              <input
                class="delivery-mark"
                v-model="deliveryBei"
                placeholder="非普通物流请填写物流公司"
                :disabled="delInput"
                type="text"
              />
            </td>
            <td>
              <img class="more-right" src="../../assetsorder/more.png" alt />
            </td>
          </tr>
        </table>
        <table class="order-item1">
          <tr class="delivery">
            <td class="left">工程单号</td>
            <td class="right">
              <input class="delivery-mark" v-model="gongchenhao" placeholder="填写工程单号" type="text" />
            </td>
            <!--<td><img class="more-right" src="../../assetsorder/more.png" alt=""></td>-->
          </tr>
        </table>
        <table class="order-item1">
          <tr class="delivery">
            <td class="left">订单备注</td>
            <td class="right">
              <input
                class="delivery-mark"
                v-model="orderBei"
                placeholder="任何订单信息填写在此无效"
                type="text"
              />
            </td>
            <!--<td><img class="more-right" src="../../assetsorder/more.png" alt=""></td>-->
          </tr>
        </table>
        <table class="order-item">
          <tr class="delivery">
            <td class="left">购买人</td>
            <td class="right">
              <input class="delivery-mark" v-model="buyUser" placeholder="填写购买人姓名" type="text" />
            </td>
            <!--<td><img class="more-right" src="../../assetsorder/more.png" alt=""></td>-->
          </tr>
        </table>
        <table class="order-item">
          <tr class="delivery">
            <td class="left">购买人电话</td>
            <td class="right">
              <input class="delivery-mark" v-model="buyUserPhone" placeholder="填写购买人电话" type="text" />
            </td>
            <!--<td><img class="more-right" src="../../assetsorder/more.png" alt=""></td>-->
          </tr>
        </table>
        <div class="product">
          <!--<div class="good-head">-->
          <!--&lt;!&ndash;<img class="goood-img" src="../../assetsorder/good.png" alt="">&ndash;&gt;-->
          <!--<span class="good-title">{{this.allProduct[0].newProductType}}</span>-->
          <!--</div>-->
          <div class="good-contain" v-for="(product,index) in allProduct" :key="index">
            <div class="good-item1">
              <span>型号：{{product.item.itemNo}}</span>
              <span class="good-num" v-if="product.quantity">数量：{{product.quantity}} {{product.unit}}</span>
              <span
                class="good-num"
                v-if="!product.quantity"
              >{{product.width}} * {{product.height}}(长*宽)</span>
              <span v-if="showPrice" class="price">单价：￥{{product.price}}</span>
              <span v-else class="price">***</span>
            </div>
            <div class="good-item2">
              <span>活动：{{product.newactivityId}}</span>
              <span v-if="showPrice" class="hd-after">￥{{product.activityPrice}}</span>
              <span v-else class="hd-after">***</span>
              <span class="good-num">折后金额：</span>
            </div>
            <div class="good-item3">
              <span>年返利券</span>
              <span v-if="showPrice" class="hd-after">-{{product.yCoupon}}</span>
              <span v-else class="hd-after">-***</span>
            </div>
            <div class="good-item4">
              <span>月返利券</span>
              <span v-if="showPrice" class="hd-after">-{{product.mCoupon}}</span>
              <span v-else class="hd-after">-***</span>
            </div>
            <div class="good-item4">
              <span>应付金额</span>
              <span
                v-if="showPrice"
                class="hd-after"
              >{{product.activityPrice - product.mCoupon - product.yCoupon}}</span>
              <span v-else class="hd-after">***</span>
            </div>
            <!--<div class="good-item5">-->
            <!--<span>合计：</span>-->
            <!--<span class="hd-after">￥100</span>-->
            <!--</div>-->
          </div>
        </div>
        <table class="order-item1">
          <tr class="delivery" @click="isshowCoupon">
            <td class="left">返利券</td>
            <td class="right">{{myCoupon}}</td>
            <td>
              <img class="more-right" src="../../assetsorder/more.png" alt v-show="haveCoupn" />
            </td>
          </tr>
        </table>
        <table class="order-item1">
          <tr class="delivery">
            <td class="left">商品总金额</td>
            <td class="right">
              <span v-if="showPrice">￥{{totalHdPrice}}</span>
              <span v-else>***</span>
            </td>
          </tr>
          <tr class="delivery">
            <td class="left">总返利</td>
            <td class="right">
              <span v-if="showPrice">￥{{couponPrice}}</span>
              <span v-else>***</span>
            </td>
          </tr>
        </table>
        <!--<tr class="delivery">-->
        <!--<td class="left">商品金额</td>-->
        <!--<td class="right"><span>￥1000.99</span></td>-->
        <!--</tr>-->
      </div>
    </div>
    <div class="bottom-nav" v-show="hidshow">
      <van-submit-bar
        v-if="showPrice"
        :price="orderPrice * 100"
        button-text="提交订单"
        label="应付总金额："
        @submit="wantoSubmit"
      />
      <van-submit-bar v-else button-text="提交订单" @submit="wantoSubmit" />
    </div>
    <!--物流选择-->
    <van-popup v-model="showDelivery">
      <van-radio-group v-model="deliveryType">
        <van-cell-group>
          <van-cell title="普通物流(运费由甲方支付)" clickable @click="comfirmDelivery('普通物流(运费由甲方支付)')">
            <van-radio name="普通物流(运费由甲方支付)" checked-color="#89cb81" />
          </van-cell>
          <!--<van-cell title="快递(运费由乙方支付)*备注" clickable @click="isdeliveryType = '快递(运费由乙方支付)*备注'">-->
          <!--<van-radio name="快递(运费由乙方支付)*备注" checked-color="#89cb81"/>-->
          <!--</van-cell>-->
          <van-cell title="其他(运费由乙方支付)*备注" clickable @click="comfirmDelivery('其他(运费由乙方支付)*备注')">
            <van-radio name="其他(运费由乙方支付)*备注" checked-color="#89cb81" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <!--<div class="comfirm-bottom" @click="comfirmDelivery">-->
      <!--<span>确定</span>-->
      <!--</div>-->
    </van-popup>
    <!--选择优惠券-->
    <van-popup v-model="showCoupon" class="youhuiquan" position="right">
      <div class="coupon-title">
        <img class="backCoupon" @click="noselectCoupon" src="../../assetsorder/back.png" alt />
        <span>我的优惠券</span>
      </div>
      <div v-for="(coupon,index) in couponLists" class="allCouponItem" :key="index">
        <div class="coupon-item" v-if="coupon.canUse">
          <div class="coupon-top">
            <div class="coupon-notes">{{coupon.notes}}</div>
            <div class="coupon-allmoney">总面值{{coupon.rebateMoney}}元</div>
            <div class="quanhao">券号：{{coupon.id}}</div>
          </div>
          <div class="coupon-content">
            <div>
              <span class="coupon-remian">余额：￥</span>
              <span class="remian-money">{{coupon.rebateMoneyOver}}</span>
            </div>
            <div class="coupon-yxq">有效期：{{coupon.dateStart}}至{{coupon.dateEnd}}</div>
            <div class="coupon-sy">适用：{{coupon.application}}</div>
            <input type="checkbox" :value="coupon" v-model="couponBox" class="couponbox" />
          </div>
          <div class="coupon-more">
            <span @click="UseRecord(coupon.id)">查看使用记录>></span>
            <span @click="couponRecord(coupon.id)">查看返利记录>></span>
          </div>
        </div>
        <div class="coupon-item2" v-else>
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

          <div style="margin-top:50px;">由于活动："{{ activityArray.ORDER_NAME }}"，该优惠券无法使用</div>
        </div>
      </div>
      <div class="confirmCoupon" @click="backCoupon">确认</div>
    </van-popup>
    <!--优惠券使用记录-->
    <van-popup v-model="showUseCouponRecord" class="youhuiquan" position="right">
      <div class="coupon-title">
        <img
          class="backCoupon"
          @click="showUseCouponRecord = false"
          src="../../assetsorder/back.png"
          alt
        />
        <span>优惠券使用记录</span>
      </div>
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
              <td>订单商品型号</td>
              <td>{{couponRecord.ITEM_NO}}</td>
            </tr>
            <tr>
              <td>使用记录</td>
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
      <div class="coupon-title">
        <img
          class="backCoupon"
          @click="showCouponRecord = false"
          src="../../assetsorder/back.png"
          alt
        />
        <span>优惠券返利记录</span>
      </div>
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
            <span>返利金额：{{couponRecord.returnMoney}}</span>
          </div>
        </div>
      </div>
    </van-popup>
    <van-loading class="loading" type="spinner" v-if="loading" color="black" />
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import {
  SubmitBar,
  Toast,
  Popup,
  CouponCell,
  Dialog,
  CouponList,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Loading
} from "vant";
import {
  orderSettlement,
  normalOrderSettlement,
  getUseRecord,
  getCustomerInfo,
  getTotalRecordSum,
  GetPromotionsById
} from "@/api/orderListASP";
import top from "../../../components/Top";

const coupon = [
  {
    available: 1,
    discount: 0,
    denominations: 150,
    condition: "无使用门槛\n最多优惠12元",
    reason: "",
    value: 150,
    name: "优惠券名称",
    startAt: 1489104000,
    endAt: 1514592000
  }
];
export default {
  name: "fillOrder",
  components: {
    top,
    [SubmitBar.name]: SubmitBar,
    [Popup.name]: Popup,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    [Loading.name]: Loading
  },
  data() {
    return {
      url: "http://106.14.159.244:8080/yulan-order",
      set: 14,
      showDelivery: false,
      //物流类型
      deliveryType: "普通物流(运费由甲方支付)",
      isdeliveryType: "",
      //运输方式代号
      deliveryTypeCode: "",
      //物流信息备注输入框
      delInput: true,
      showCoupon: false, // 选择优惠券
      showUseCouponRecord: false, //优惠券使用记录
      allCouponRecord: [], //使用记录（数组）
      showCouponRecord: false, //优惠券返利记录
      allflRecord: [],
      showList: false,
      chosenCoupon: -1,
      coupons: coupon,
      disabledCoupons: coupon,
      //活动转码
      thisHd: "",
      //获取活动后总价需要的参数
      huodprice: [],
      //所有商品活动后总价(数组)
      allHdPrice: [],
      //所有商品的活动后总价相加
      totalHdPrice: 0,
      // 产品明细(数组)
      allProduct: this.$store.getters.getOrderProduct,
      //运输备注
      deliveryBei: "",
      //工程单号
      gongchenhao: "",
      //购买人姓名
      buyUser: "",
      //购买人电话
      buyUserPhone: "",
      //订单备注
      orderBei: "",
      //选中地址(对象)
      allAddress: [],
      address: this.$store.getters.getAddress,
      //是否为默认地址标志
      isDefaultAdd: "0",
      // 订单商品详情，为多个集合（数组）
      productList: [],
      //获取优惠券
      couponLists: [],
      myCoupon: "",
      haveCoupn: true,
      couponBox: [], //选择的优惠券
      Ycoupon: "", //年返利券
      Mcoupon: "", //月返利券
      needNum: "",
      orderPrice: 0, //订单总价
      hdAllPrice: null, //活动后所有商品总价
      couponPrice: null, //返利券总价
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidshow: true, //显示或者隐藏footer
      loading: false,
      accMoney: 0,
      activityArray: [] //活动集合
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
    toAddList() {
      this.$router.push({
        path: "/addresslist"
      });
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    comfirmDelivery(delType) {
      this.showDelivery = false;
      this.deliveryType = delType;
      if (this.deliveryType == "普通物流(运费由甲方支付)") {
        this.delInput = true;
      } else {
        this.delInput = false;
        this.$refs.WLbeizhu.focus();
      }
    },
    //活动转码
    hdExchange(hd) {
      if (hd) {
        let hdUrl =
          this.orderBaseUrl +
          "/activityGroupType/getActivityGroupTypeByName.do?" +
          "name=" +
          hd;
        axios.post(hdUrl).then(data => {
          return data.data.value;
        });
      }
    },
    //获取活动后总价
    activityPrice() {
      let priceUrl = this.orderBaseUrl + "/order/getPromotion.do";
      this.huodprice = [];
      for (var i = 0; i < this.allProduct.length; i++) {
        if (this.allProduct[i].activityId == null) {
          this.allProduct[i].activityId = "";
        } else {
          if (
            this.activityArray.indexOf(this.allProduct[i].activityId) == -1 &&
            this.allProduct[i].activityId
          )
            //活动集合
            this.activityArray.push(this.allProduct[i].activityId);
        }
        if (this.allProduct[i].quantity) {
          this.allProduct[i].needNum = this.allProduct[i].quantity;
        } else {
          this.allProduct[i].needNum =
            this.allProduct[i].width * this.allProduct[i].height;
        }
        let hdprice = {
          pId: this.allProduct[i].activityId, //活动编号
          order_no: this.allProduct[i].item.itemNo, //产品型号
          prime_cost: this.allProduct[i].price * this.allProduct[i].needNum, //原总价
          num: this.allProduct[i].needNum //商品总数
        };
        this.huodprice.push(hdprice);
      }
      axios.post(priceUrl, this.huodprice).then(data => {
        for (var i = 0; i < this.allProduct.length; i++) {
          this.allProduct[i].activityPrice = data.data.data[
            i
          ].promotion_cost.toFixed(2);
          this.totalHdPrice += parseFloat(this.allProduct[i].activityPrice);
        }
        this.orderPrice = this.totalHdPrice;
      });
    },
    wantoSubmit() {
      if (this.allProduct[0].salPromotion) {
        if (this.allProduct[0].salPromotion.arrearsFlag == "N" || this.orderPrice == 0) {
          this.onSubmitOrder();
        } else {
          this.enoughMony();
        }
      } else {
        this.enoughMony();
      }
    },
    //订单提交余额判断
    enoughMony() {
      if (this.delInput == false && this.deliveryBei == "") {
        Toast({
          duration: 2000,
          message: "请填写物流公司"
        });
        return;
      }
      //余额查询
      // this.loading = true
      let monUrl = this.orderBaseUrl + "/order/getResidemoney.do";
      let mondata = {
        companyId: this.$store.getters.getCMId
      };
      axios.post(monUrl, mondata).then(val => {
        if (val.data.data > this.orderPrice.toFixed(2)) {
          this.onSubmitOrder();
        } else {
          Dialog.confirm({
            message: "余额不足，是否继续提交？",
            closeOnClickOverlay: true,
            confirmButtonText: "提交",
            cancelButtonText: "返回"
          })
            .then(() => {
              this.onSubmitOrder();
              // on confirm
            })
            .catch(() => {
              // on cancel
              Toast({
                duration: 1000,
                message: "取消提交订单"
              });
            });
        }
      });
    },
    onSubmitOrder() {
      this.loading = true;
      if (this.deliveryType == "普通物流(运费由甲方支付)") {
        this.deliveryTypeCode = "1";
      } else {
        this.deliveryTypeCode = "3";
      }
      if (this.address.id == 0) {
        this.isDefaultAdd = "0";
      } else {
        this.isDefaultAdd = "1";
      }
      //订单商品详情，为多个集合（数组）
      this.productList = [];
      for (let i = 0; i < this.allProduct.length; i++) {
        if (!this.allProduct[i].salPromotion) {
          this.allProduct[i].salPromotion = {};
          this.$set(this.allProduct[i].salPromotion, "orderType", null);
          // this.allProduct[i].salPromotion.orderType = null
        }
        let singleProduct = {};
        singleProduct.curtainWidth = this.allProduct[i].width;
        singleProduct.curtainHeight = this.allProduct[i].height;
        singleProduct.lineNo = this.allProduct[i].lineNo;
        singleProduct.itemNo = this.allProduct[i].item.itemNo;
        singleProduct.itemNoSample = this.allProduct[i].item.itemNo;
        singleProduct.partSendId = this.allProduct[i].splitShipment;
        singleProduct.productionVersion = this.allProduct[i].item.itemVersion;
        singleProduct.qtyRequired = this.allProduct[i].needNum.toFixed(2);
        singleProduct.notes = this.allProduct[i].note;
        singleProduct.unitPrice = this.allProduct[i].price;
        singleProduct.promotionCost = this.allProduct[i].activityPrice;
        singleProduct.promotion = this.allProduct[i].newactivityId;
        singleProduct.promotionType = this.allProduct[i].salPromotion.orderType;
        //singleProduct.flagFlType = this.allProduct[i].salPromotion.falgFl;
        if (this.allProduct[i].onlineSalesAmount !== null) {
          singleProduct.onlineSalesAmount = this.allProduct[
            i
          ].onlineSalesAmount;
        }
        singleProduct.finalPrice = this.allProduct[i].questPrice;

        this.productList.push(singleProduct);
      }
      var reg = /.+?(省|市|自治区|自治州|县|区)/g;
      var addsressAry;
      if (
        this.address.address.indexOf("省") == -1 &&
        this.address.address.indexOf("区") == -1
      ) {
        addsressAry = ["", "", ""];
      } else {
        addsressAry = this.address.address.match(reg);
      }
      if (this.allProduct[0].salPromotion) {
        this.allProduct[0].salPromotion = this.allProduct[0].salPromotion.arrearsFlag;
      }
      //删除购物车数据
      var deleteArray = [];
      for (let i = 0; i < this.allProduct.length; i++) {
        deleteArray.push(this.allProduct[i].id);
      }
      let orderUrl = this.orderBaseUrl + "/order/orderCount.do";
      let data = {
        product_group_tpye: this.allProduct[0].item.groupType,
        promotion_cost: this.totalHdPrice,
        // "cid": "C01613",
        cid: this.$store.getters.getCId,
        companyId: this.$store.getters.getCMId,
        rebateY: this.Ycoupon,
        rebateM: this.Mcoupon,
        arrearsFlag: this.allProduct[0].salPromotion, //活动字段(用来判断是否需要判断余额)，Y或N,无时传null
        ctm_order: {
          deliveryNotes: this.deliveryBei, //（可不传）
          postAddressModified: this.isDefaultAdd, //默认送货地址标志，0为默认，1非默认
          postAddress: this.address.postAddress,
          notes: this.orderBei,
          wlContacts: this.address.name,
          wlTel: this.address.tel,
          allSpend: this.totalHdPrice,
          deliveryFlag: "0",
          deliveryType: this.deliveryTypeCode,
          invoiceFlag: "0",
          projectNo: this.gongchenhao,
          reciverArea1: this.address.reciverArea1,
          reciverArea2: this.address.reciverArea2,
          reciverArea3: this.address.reciverArea3,
          allAddress: this.address.address,
          buyUser: this.buyUser,
          buyUserPhone: this.buyUserPhone
        },
        ctm_orders: this.productList,
        cartItemIDs: deleteArray,
        device: "app"
      };
      normalOrderSettlement(data).then(data => {
        //axios.post(orderUrl, data).then(data => {
        // this.loading = false;
        // console.log(data);
        // if (data.data.code == 0) {
        Toast({
          duration: 2000,
          message: "提交订单成功"
        });
        this.$router.push({
          path: "/myorder"
        });
      });
    },
    //生成订单后删除购物车的信息
    updateCart() {
      let url = this.orderBaseUrl + "/commodity/alterCommodityStatus.do";
      let commodityID = [];
      for (let i = 0; i < this.allProduct.length; i++) {
        commodityID.push(this.allProduct[i].id);
      }
      axios.post(url, commodityID).then(res => {
        this.$router.push({
          path: "/myorder"
        });
      });
    },
    //获取优惠券信息
    getCoupon() {
      let url = this.orderBaseUrl + "/order/getRebate.do";
      let data = {
        // "cid": "C01613",//登录客户号
        cid: this.$store.getters.getCId,
        companyId: this.$store.getters.getCMId,
        typeId: this.allProduct[0].item.groupType //商品种类
      };
      axios.post(url, data).then(data => {
        GetPromotionsById({ PID: this.activityArray }).then(ress => {
          //优惠券列表（数组）
          for (let k = 0; k < data.data.data.length; k++) {
            if (
              data.data.data[k].dateId == null ||
              data.data.data[k].dateId == "1"
            ) {
              this.couponLists.push(data.data.data[k]);
            }
          }
          if (this.couponLists.length == 0) {
            this.myCoupon = "暂无返利券";
            this.haveCoupn = false;
          } else {
            this.myCoupon = "选择返利券";
            this.haveCoupn = true;
            for (let i = 0; i < this.couponLists.length; i++) {
              this.couponLists[i].canUse = true;
              if (this.couponLists[i].rebateType == "year") {
                this.couponLists[i].rebateType = "年返利券";
              } else {
                this.couponLists[i].rebateType = "月返利券";
              }
              this.couponLists[i].dateStart = this.dataExchange(
                this.couponLists[i].dateStart
              );
              this.couponLists[i].dateEnd = this.dataExchange(
                this.couponLists[i].dateEnd
              );
            }
            if (ress.data.length > 0) {
              this.activityArray = ress.data[0]; //一般只有一个活动参与结算
              for (let i = 0; i < this.couponLists.length; i++) {
                if (this.activityArray.REBATE_FLAG == "N") {
                  //不能使用优惠券
                  this.couponLists[i].canUse = false;
                } else {
                  if (
                    this.couponLists[i].rebateType ==
                      this.activityArray.REBATE_TYPE ||
                    this.activityArray.REBATE_TYPE == "all"
                  ) {
                    this.couponLists[i].canUse = true;
                  } else {
                    this.couponLists[i].canUse = false;
                  }
                }
              }
            }
          }
        });
      });
    },
    //是否有优惠券
    isshowCoupon() {
      if (this.haveCoupn == true) {
        this.showCoupon = true;
      } else {
        this.showCoupon = false;
      }
    },
    //优惠券摊分到每个商品里面
    couponTf() {
      if (this.deliveryType == "普通物流(运费由甲方支付)") {
        this.deliveryTypeCode = "1";
      } else {
        this.deliveryTypeCode = "3";
      }
      if (this.address.id == 0) {
        this.isDefaultAdd = "0";
      } else {
        this.isDefaultAdd = "1";
      }
      //订单商品详情，为多个集合（数组）
      this.productList = [];
      for (let i = 0; i < this.allProduct.length; i++) {
        let singleProduct = {};
        singleProduct.itemNo = this.allProduct[i].item.itemNo;
        singleProduct.itemNoSample = this.allProduct[i].item.itemNo;
        singleProduct.partSendId = this.allProduct[i].splitShipment;
        singleProduct.productionVersion = this.allProduct[i].item.itemVersion;
        singleProduct.qtyRequired = this.allProduct[i].needNum.toFixed(2);
        singleProduct.notes = this.allProduct[i].note;
        singleProduct.unitPrice = this.allProduct[i].price;
        singleProduct.promotionCost = this.allProduct[i].activityPrice;
        singleProduct.promotion = this.allProduct[i].newactivityId;

        this.productList.push(singleProduct);
      }
      var reg = /.+?(省|市|自治区|自治州|县|区)/g;
      var addsressAry = [];
      if (
        this.address.address == "测试，无需处理" ||
        this.address.address == "0测试，无需处理"
      ) {
        addsressAry = ["", "", ""];
      } else {
        addsressAry = this.address.address.match(reg);
      }
      this.Mcoupon = "";
      this.Ycoupon = "";
      for (let k = 0; k < this.couponBox.length; k++) {
        if (this.couponBox[k].rebateType == "年返利券") {
          this.Ycoupon = this.couponBox[k].id;
        } else if (this.couponBox[k].rebateType == "月返利券") {
          this.Mcoupon = this.couponBox[k].id;
        } else {
          this.Mcoupon = "";
          this.Ycoupon = "";
        }
      }
      let orderUrl = this.orderBaseUrl + "/order/showRebate.do";
      let data = {
        product_group_tpye: this.allProduct[0].item.groupType,
        promotion_cost: this.totalHdPrice,
        // "cid": "C01613",
        cid: this.$store.getters.getCId,
        rebateY: this.Ycoupon,
        rebateM: this.Mcoupon,
        ctm_order: {
          deliveryNotes: this.deliveryBei, //（可不传）
          postAddressModified: this.isDefaultAdd, //默认送货地址标志，0为默认，1非默认
          postAddress: this.address.postAddress,
          notes: this.orderBei,
          wlContacts: this.address.name,
          wlTel: this.address.tel,
          allSpend: this.totalHdPrice,
          deliveryFlag: "0",
          deliveryType: this.deliveryTypeCode,
          invoiceFlag: "0",
          projectNo: this.gongchenhao,
          reciverArea1: this.address.reciverArea1,
          reciverArea2: this.address.reciverArea2,
          reciverArea3: this.address.reciverArea3,
          allAddress: this.address.address,
          buyUser: this.buyUser,
          buyUserPhone: this.buyUserPhone
        },
        ctm_orders: this.productList
      };
      axios.post(orderUrl, data).then(val => {
        if (val.data.code == 0) {
          for (let i = 0; i < val.data.data.rebate.length; i++) {
            this.allProduct[i].mCoupon = val.data.data.rebate[
              i
            ].rebateMonth.toFixed(2);
            this.allProduct[i].yCoupon = val.data.data.rebate[
              i
            ].rebateYear.toFixed(2);
          }
          if (
            this.allProduct[0].yCoupon > 0 &&
            this.allProduct[0].mCoupon == 0
          ) {
            this.myCoupon = "年返利券";
          } else if (
            this.allProduct[0].yCoupon == 0 &&
            this.allProduct[0].mCoupon > 0
          ) {
            this.myCoupon = "月返利券";
          } else if (this.couponBox.length == 2) {
            this.myCoupon = "月返利券+年返利券";
          } else {
            this.myCoupon = "选择返利券";
          }
          this.couponPrice =
            val.data.data.allRebateMonth + val.data.data.allRebateYear;
          if (this.myCoupon == "选择返利券") {
            this.orderPrice = this.totalHdPrice;
          } else {
            // this.orderPrice = this.totalHdPrice - this.couponPrice
            this.orderPrice = val.data.data.allspend;
          }
          this.showCoupon = false;
        }
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
    },
    backCoupon() {
      this.couponTf();
    },
    noselectCoupon() {
      this.showCoupon = false;
    },
    //获取地址
    getAddress(path) {
      let url = this.orderBaseUrl + "/postAddress/getPostAddress.do";
      let data = {
        // "cid": "C01613"
        cid: this.$store.getters.getCId
      };
      axios.post(url, data).then(value => {
        this.allAddress = value.data.data;
        if (path == "/mycart/wallcart" || path == "/mycart/softcart") {
          for (let i = 0; i < this.allAddress.length; i++) {
            if (this.allAddress[i].addressId == 0) {
              //默认地址
              this.address = this.allAddress[i];
              this.address.id = this.allAddress[i].addressId;
              this.address.address = this.allAddress[i].postAddress;
              this.address.name = this.allAddress[i].wlContacts;
              this.address.tel = this.allAddress[i].wlTel;
              this.$store.commit("setAddress", this.address);
            }
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
    //  初始化返利券
    initFl() {
      this.allProduct.forEach(function(singleProduct) {
        singleProduct.mCoupon = "0.00";
        singleProduct.yCoupon = "0.00";
      });
    },

    //  salPromotion
    salpromotion() {}
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getAddress(from.path);
    });
  },
  created() {
    this.activityPrice();
    this.initFl();
    //获取优惠券信息
    this.getCoupon();
  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  watch: {
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
    },
    //物流备注
    deliveryType: function() {
      if (this.deliveryType == "普通物流(运费由甲方支付)") {
        this.deliveryBei = "";
        this.delInput = true;
      } else {
      }
    }
  }
};
</script>

<style scoped>
.contain {
  position: fixed;
  top: 50px;
  bottom: 50px;
  overflow-y: scroll;
  background: #f1f1f1;
}

.address {
  position: relative;
  height: 60px;
  padding-top: 10px;
  background: white;
}

.add-icon {
  width: 26px;
  height: 26px;
  position: absolute;
  top: 50%;
  left: 5px;
  margin-top: -13px;
}

.add-contain {
  padding: 0 35px;
}

.contct {
  font-size: 20px;
  font-weight: bold;
  /*float: left;*/
  margin-bottom: 5px;
  text-align: left;
}

.contct span {
  margin: 0 20px 0 0;
}

.address-text {
  text-align: left;
  font-size: 12px;
}

.more {
  width: 18px;
  height: 18px;
  position: absolute;
  right: 5px;
  top: 50%;
  margin-top: -11px;
}

.address::before {
  content: "";
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  position: absolute;
  background: -webkit-repeating-linear-gradient(
    135deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #1989fa 0,
    #1989fa 45%,
    transparent 0,
    transparent 50%
  );
  background: repeating-linear-gradient(
    -45deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #1989fa 0,
    #1989fa 45%,
    transparent 0,
    transparent 50%
  );
  background-size: 80px;
}

.product {
  background: white;
  position: relative;
  margin: 10px 0;
  padding: 10px 10px;
  text-align: left;
  border-radius: 5px;
}

.good-head {
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
  border-bottom: 1px solid #f5f5f5;
  font-size: 14px;
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

.good-item3,
.good-item4,
.good-item5 {
  margin-left: 50px;
}

.price {
  float: right;
  margin: 0 20px;
}

.good-num,
.hd-after {
  float: right;
}

.hd-after {
  color: #ff4c33;
}

.details-list {
  font-size: 15px;
  margin-top: 10px;
}

.delivery .left,
.coupon .left {
  width: 120px;
  text-align: left;
  padding-left: 13px;
}

.delivery .right,
.coupon .right {
  width: 200px;
  text-align: right;
  /*margin-right: 10px;*/
}

.more-right {
  width: 15px;
  height: 15px;
}

.delivery,
.coupon {
  border-bottom: 1px solid #fafafa;
}

.delivery-mark {
  /*width: 130px;*/
  border: none;
  text-align: right;
}

.comfirm-bottom {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #89cb81;
  position: fixed;
  bottom: 0;
}

.comfirm-bottom span {
  color: white;
  font-size: 20px;
}

/*订单备注*/
.order-mark {
  border: none;
  text-align: right;
  /*color: #ff4609;*/
}

/*弹出框高度设置*/
.van-cell-group {
  /*height: 280px !important;*/
  width: 300px;
  border-radius: 5px;
}

.reset,
.all-view {
  font-size: 15px;
}

.coupon-title {
  background: #363636;
  width: 100%;
  height: 50px;
  line-height: 50px;
  top: 0;
  color: white;
  font-size: 15px;
  position: fixed;
}

.backCoupon {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 17px;
  top: 50%;
  margin-top: -10px;
}

.allCouponItem {
  margin-top: 60px;
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
.youhuiquan {
  width: 100%;
  height: 100%;
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
.couponbox {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  /*margin-top: -10px;*/
  right: 20px;
}

.order-item1 {
  width: 100%;
  background: white;
  margin: 5px 0;
  padding: 7px 8px;
  border-radius: 5px;
}

.order-item {
  width: 100%;
  background: white;
  /*margin: 5px 0;*/
  padding: 5px 8px;
}

.confirmCoupon {
  position: fixed;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  bottom: 0;
  color: white;
  background: #8cbb44;
}

.useRecord {
  position: fixed;
  width: 100%;
  top: 50px;
  left: 0;
  display: flex;
  justify-content: center;
  /*font-site: 13px;*/
}
.useRecord span,
.singleRecord span {
  display: inline-block;
  margin: 0 25px;
  font-size: 12px;
}
.all-record {
  background: #f8f8f8;
  position: fixed;
  overflow-y: scroll;
  top: 50px;
  left: 0;
  width: 100%;
  height: 90%;
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
  left: 200px;
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
<!--覆盖优惠券样式-->
<style>
.reset .van-cell__title {
  text-align: left;
}
</style>
