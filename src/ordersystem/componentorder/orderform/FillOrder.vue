<template>
  <div>
    <top :top="set" :from="from"></top>
    <div class="contain">
      <div class="address" @click="showAddress = true">
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
                placeholder="其他物流需填写物流公司"
                :disabled="delInput"
                type="text"
              />
            </td>
          </tr>
        </table>
        <!-- <table class="order-item1" v-if="packingShow">
          <tr class="delivery" @click="showPacking = true">
            <td class="left">
              分包提示
              <span style="color:red;">*</span>
            </td>
            <td class="right">{{packingNote}}</td>
            <td>
              <img class="more-right" src="../../assetsorder/more.png" alt />
            </td>
          </tr>
        </table>-->
        <div style="margin-top:5px;">
          <div
            style="text-align:left;font-size:14px;color:#4994df;background:white;padding-left:20px;"
            @click="onShowAddress"
          >管理购买用户信息 ></div>
          <table class="order-item">
            <tr class="delivery">
              <td class="left">用户姓名</td>
              <td class="right">
                <input class="delivery-mark" v-model="buyUser" placeholder="请填写用户姓名" type="text" />
              </td>
            </tr>
          </table>
        </div>
        <table class="order-item">
          <tr class="delivery">
            <td class="left">用户电话</td>
            <td class="right">
              <input class="delivery-mark" v-model="buyUserPhone" placeholder="请填写用户电话" type="text" />
            </td>
          </tr>
        </table>
        <table class="order-item">
          <tr class="delivery">
            <td class="left">选择地区</td>
            <td class="right">
              <input
                class="delivery-mark"
                v-model="selLocation"
                @click="iosselect"
                placeholder="选择省/市/县"
                readonly
              />
            </td>
          </tr>
        </table>
        <table class="order-item">
          <tr class="delivery">
            <td class="left">详细地址</td>
            <td class="right">
              <input
                class="delivery-mark"
                v-model="buyUserPostAddress"
                placeholder="请填写详细地址"
                type="text"
              />
            </td>
          </tr>
        </table>
        <table class="order-item">
          <tr class="delivery">
            <td class="left">上传购买凭证</td>
            <td class="right">
              <van-uploader
                v-model="fileList"
                :after-read="onRead"
                accept="image/*"
                preview-size="60"
                multiple
              />
            </td>
          </tr>
        </table>
        <table class="order-item1">
          <tr class="delivery">
            <td class="left">备注信息</td>
            <td class="right">
              <input class="delivery-mark" v-model="orderBei" placeholder="订单信息填写在此无效" type="text" />
            </td>
          </tr>
        </table>
        <table class="order-item1">
          <tr class="delivery">
            <td class="left">工程报备单号</td>
            <td class="right">
              <input
                class="delivery-mark"
                v-model="gongchenhao"
                placeholder="请填写工程报备单号"
                type="text"
              />
            </td>
          </tr>
        </table>
        <div class="product">
          <div class="good-contain" v-for="(product,index) in allProduct" :key="index">
            <div class="good-item1">
              <span>型号：{{product.item.itemNo}}</span>
              <span
                class="good-num"
                v-if="product.quantity"
              >数量：{{product.quantity}} {{product.unit}}</span>
              <span
                class="good-num"
                v-if="!product.quantity"
              >{{product.width}} * {{product.height}}(长*宽)</span>
              <span v-if="showPrice" class="price">单价：￥{{product.price}}</span>
              <span v-else class="price">***</span>
            </div>
            <div class="good-item2">
              <span>活动：{{product.newactivityId}}</span>
            </div>
            <div class="good-item3">
              <span>折后金额</span>
              <span v-if="showPrice" class="hd-after">{{product.promotionCost}}</span>
              <span v-else class="hd-after">-***</span>
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
              >{{product.promotionCost - product.mCoupon - product.yCoupon}}</span>
              <span v-else class="hd-after">***</span>
            </div>
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
            <td class="left">折后总金额</td>
            <td class="right">
              <span v-if="showPrice">￥{{totalPrice}}</span>
              <span v-else>***</span>
            </td>
          </tr>
          <tr class="delivery">
            <td class="left">总返利</td>
            <td class="right">
              <span v-if="showPrice">￥{{backPrice}}</span>
              <span v-else>***</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="bottom-nav" v-show="hidshow">
      <van-submit-bar
        v-if="showPrice"
        :price="allSpend * 100"
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
          <van-cell clickable @click="comfirmDelivery('普通物流(运费由甲方支付)')">
            <div style="text-align:center;">
              <span>普通物流(运费由甲方支付)</span>
              <van-radio style="display:inline-block" name="普通物流(运费由甲方支付)" checked-color="#89cb81" />
            </div>
          </van-cell>
          <van-cell clickable @click="comfirmDelivery('其他(运费由乙方支付)*备注')">
            <div style="text-align:center;">
              <span>其他(运费由乙方支付)*备注</span>
              <van-radio
                style="display:inline-block"
                name="其他(运费由乙方支付)*备注"
                checked-color="#89cb81"
              />
            </div>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <!--分包提示-->
    <van-popup v-model="showPacking">
      <van-radio-group v-model="packingNote">
        <van-cell-group>
          <van-cell clickable @click="confirmPackingNote('不分包')">
            <div style="text-align:center;">
              <span>不分包</span>
              <van-radio style="display:inline-block" name="不分包" checked-color="#89cb81" />
            </div>
          </van-cell>
          <van-cell clickable @click="confirmPackingNote('同型号不分包，不同型号分包')">
            <div style="text-align:center;">
              <span>同型号不分包，不同型号分包</span>
              <van-radio
                style="display:inline-block;margin-top:10px;"
                name="同型号不分包，不同型号分包"
                checked-color="#89cb81"
              />
            </div>
          </van-cell>
          <van-cell clickable @click="confirmPackingNote('全部分包')">
            <div style="text-align:center;">
              <span>全部分包</span>
              <van-radio style="display:inline-block" name="全部分包" checked-color="#89cb81" />
            </div>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <!--选择优惠券-->
    <van-popup v-model="showCoupon" class="youhuiquan" position="right">
      <div class="coupon-title">
        <img class="backCoupon" @click="noselectCoupon" src="../../assetsorder/back.png" alt />
        <span>我的优惠券</span>
      </div>
      <div v-for="(coupon,index) in couponLists" class="allCouponItem" :key="index">
        <div class="coupon-item" v-if="canUseConpon(coupon)">
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

          <div style="margin-top:50px;">由于活动："{{ salPromotion.ORDER_NAME }}"，该优惠券无法使用</div>
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
    <!-- <van-loading class="loading" type="spinner" v-if="loading" color="black" /> -->
    <!--选择收货地址-->
    <van-popup
      style="width:100%;height:100%;"
      v-model="showAddress"
      v-if="showAddress"
      position="right"
    >
      <div class="coupon-title">
        <img class="backCoupon" @click="showAddress=false" src="../../assetsorder/back.png" alt />
        <span>我的收货地址</span>
      </div>
      <div class="all-address">
        <van-address-list
          id="dress-list"
          v-model="address.id"
          :list="allAddress"
          @add="onAddAddress"
          @edit="onEditAddress"
          @select="onSelectAddress"
        />
      </div>
    </van-popup>
    <!--新增收货地址-->
    <van-popup
      style="width:100%;height:100%;"
      v-model="showAddressAdd"
      v-if="showAddressAdd"
      position="right"
    >
      <newAddress @backclick="backclick" @refreshAddress="refreshAddress"></newAddress>
    </van-popup>
    <!--修改收货地址-->
    <van-popup
      style="width:100%;height:100%;"
      v-model="showAddressEdit"
      v-if="showAddressEdit"
      position="right"
    >
      <addressEdit
        @backclick="backclick"
        @refreshAddress="refreshAddress"
        :initAddress="initAddress"
      ></addressEdit>
    </van-popup>

    <van-popup
      style="width:100%;height:100%;"
      v-model="showBuyserAddress"
      v-if="showBuyserAddress"
      position="right"
    >
      <div class="coupon-title">
        <img
          class="backCoupon"
          @click="showBuyserAddress=false"
          src="../../assetsorder/back.png"
          alt
        />
        <span>管理购买人地址</span>
      </div>
      <div class="all-address">
        <van-address-list
          id="dress-list"
          v-model="selAddress.id"
          :list="allBuyserAddress"
          @add="onAddAddress2"
          @edit="onEditAddress2"
          @select="onSelectAddress2"
        />
      </div>
    </van-popup>
    <iosselect2 v-on:listen3="listenmore" v-on:listen4="listenselect" v-show="showLocation"></iosselect2>
    <van-popup
      style="width:100%;height:100%;"
      v-model="showBuyserAddressAdd"
      v-if="showBuyserAddressAdd"
      position="right"
    >
      <buyserNewAddress @backclick="backclick" @refreshAddress="refreshAddress2"></buyserNewAddress>
    </van-popup>
    <van-popup
      style="width:100%;height:100%;"
      v-model="showBuyserAddressEdit"
      v-if="showBuyserAddressEdit"
      position="right"
    >
      <buyserEditAddress
        @backclick="backclick"
        @refreshAddress="refreshAddress2"
        :initAddress="initBuyserAddress"
      ></buyserEditAddress>
    </van-popup>
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
  AddressList,
  Loading,
  Uploader,
} from "vant";
import {
  orderSettlement,
  normalOrderSettlement,
  getUseRecord,
  getCustomerInfo,
  getTotalRecordSum,
  GetPromotionsById,
  UploadBuyUserFiles,
  GetBuyUserInfo,
  GetPromotionByTypeAndId,
} from "@/api/orderListASP";
import newAddress from "./NewAddress";
import buyserNewAddress from "./buyserNewAddress";
import addressEdit from "./AddressEdit";
import buyserEditAddress from "./buyserEditAddress";
import top from "../../../components/Top";
import iosselect2 from "@/components/Iosselect4";

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
    endAt: 1514592000,
  },
];
export default {
  name: "fillOrder",
  components: {
    top,
    newAddress,
    buyserNewAddress,
    addressEdit,
    buyserEditAddress,
    iosselect2,
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
    [AddressList.name]: AddressList,
    [Loading.name]: Loading,
    [Uploader.name]: Uploader,
  },
  data() {
    return {
      url: "http://106.14.159.244:8080/yulan-order",
      set: 14,
      from: this.$route.params.from,
      showDelivery: false,
      showPacking: false,
      packingShow: false,
      showAddress: false,
      showAddressAdd: false,
      showAddressEdit: false,
      showBuyserAddress: false,
      showBuyserAddressAdd: false,
      showBuyserAddressEdit: false,
      initAddress: "",
      initBuyserAddress: "",
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
      //购买人地址
      buyUserAddress: "",
      //购买人凭证
      buyUserPicture: "",
      buyUserArea1: "",
      buyUserArea2: "",
      buyUserArea3: "",
      buyUserPostAddress: "",
      selLocation: "",
      showLocation: false,
      //订单备注
      orderBei: "",
      //分包提示
      packingNote: "请选择包装信息",
      //选中地址(对象)
      allAddress: [],
      allBuyserAddress: [],
      address: [],
      selAddress: [],
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
      hdAllPrice: null, //活动后所有商品总价
      backPrice: 0, //返利券总价
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidshow: true, //显示或者隐藏footer
      loading: false,
      accMoney: 0,
      isX: false, //是否窗帘订单
      orderNo: "",
      fileList: [],
      salPromotion: {
        P_ID: "",
      },
      arrearsFlag: "",
    };
  },
  computed: {
    showPrice() {
      return this.$store.getters.getIsManage != "0";
    },
    totalPrice() {
      var allcost = 0;
      for (var i = 0; i < this.allProduct.length; i++) {
        allcost = allcost.add(this.allProduct[i].promotionCost);
      }
      return allcost;
    },
    allSpend: function () {
      return this.totalPrice - this.backPrice;
    },
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
    },
  },
  methods: {
    toAddList() {
      this.$router.push({
        path: "/addresslist",
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
    confirmPackingNote(note) {
      this.packingNote = note;
      this.showPacking = false;
    },
    //活动转码
    hdExchange(hd) {
      if (hd) {
        let hdUrl =
          this.orderBaseUrl +
          "/activityGroupType/getActivityGroupTypeByName.do?" +
          "name=" +
          hd;
        axios.post(hdUrl).then((data) => {
          return data.data.value;
        });
      }
    },
    wantoSubmit() {
      if (this.salPromotion.P_ID) {
        if (this.arrearsFlag == "N" || this.allSpend == 0) {
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
      let monUrl = this.orderBaseUrl + "/order/getResidemoney.do";
      let mondata = {
        companyId: this.$store.getters.getCMId,
      };
      axios.post(monUrl, mondata).then((val) => {
        if (val.data.data >= Math.round(this.allSpend.mul(100)) / 100) {
          this.onSubmitOrder();
        } else {
          Dialog.confirm({
            message: "余额不足，是否继续提交？",
            closeOnClickOverlay: true,
            confirmButtonText: "提交",
            cancelButtonText: "返回",
          })
            .then(() => {
              this.onSubmitOrder();
              // on confirm
            })
            .catch(() => {
              // on cancel
              Toast({
                duration: 1000,
                message: "取消提交订单",
              });
            });
        }
      });
    },
    splitAddress2() {
      var address = `${this.buyUserArea1 ? this.buyUserArea1 : ""}${
        this.buyUserArea2 ? this.buyUserArea2 : ""
      }${this.buyUserArea3 ? this.buyUserArea3 : ""}${
        this.buyUserPostAddress ? this.buyUserPostAddress : ""
      }`;
      return address;
    },
    onSubmitOrder() {
      if (this.delInput == false && this.deliveryBei == "") {
        Toast({
          duration: 2000,
          message: "请填写物流公司",
        });
        return;
      }
      // if (this.packingShow && this.packingNote == "请选择包装信息") {
      //   Toast({
      //     duration: 2000,
      //     message: "请选择分包提示"
      //   });
      //   return;
      // }
      if (this.packingNote == "请选择包装信息") this.packingNote = "";
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
      this.buyUserAddress = this.splitAddress2();
      //附件拼接
      this.buyUserPicture = "";
      for (var i = 0; i < this.fileList.length; i++) {
        this.buyUserPicture +=
          "/Files/BuyUser/" +
          this.$store.getters.getCId +
          "/" +
          this.fileList[i].file.name +
          ";";
      }
      if (this.salPromotion.BUYER_FLAG == 1) {
        //要填写购买人信息
        if (
          !this.buyUser ||
          !this.buyUserPhone ||
          !this.buyUserArea1 ||
          !this.buyUserArea2 ||
          //!this.buyUserArea3 ||
          !this.buyUserPostAddress
        ) {
          Toast({
            duration: 2000,
            message: "请填写完整的购买用户信息",
          });
          return;
        }
        if (!this.buyUserPicture) {
          Toast({
            duration: 2000,
            message: "请上传购买凭证",
          });
          return;
        }
      }
      //订单商品详情，为多个集合（数组）
      this.productList = [];
      for (let i = 0; i < this.allProduct.length; i++) {
        let singleProduct = {};
        singleProduct.curtainWidth = this.allProduct[i].width;
        singleProduct.curtainHeight = this.allProduct[i].height;
        singleProduct.curtainHeight2 = this.allProduct[i].falseShadeHigh
          ? this.allProduct[i].falseShadeHigh
          : 0;
        singleProduct.curtainSizeTimes = this.allProduct[i].drape
          ? this.allProduct[i].drape
          : 0;
        singleProduct.curtainWbhSize = this.allProduct[i].outsourcingBoxWidth
          ? this.allProduct[i].outsourcingBoxWidth
          : 0;
        singleProduct.curtainRoomName = this.allProduct[i].location
          ? this.allProduct[i].location
          : "";
        singleProduct.orderNo = this.allProduct[i].orderNumber;
        singleProduct.lineNo = this.allProduct[i].lineNo;
        singleProduct.itemNo = this.allProduct[i].item.itemNo;
        singleProduct.itemNoSample = this.allProduct[i].item.itemNo;
        singleProduct.partSendId = this.allProduct[i].splitShipment;
        singleProduct.productionVersion = this.allProduct[i].item.itemVersion;
        singleProduct.qtyRequired = this.allProduct[i].qtyRequired;
        singleProduct.notes = this.allProduct[i].note;
        singleProduct.unitPrice = this.allProduct[i].price;
        singleProduct.promotionCost = this.allProduct[i].promotionCost;
        singleProduct.finalPrice = this.allProduct[i].promotionCost;
        singleProduct.promotion = this.allProduct[i].newactivityId;
        singleProduct.pId = this.allProduct[i].pId;
        singleProduct.promotionType = this.allProduct[i].promotionType;
        singleProduct.flagFlType = this.allProduct[i].flagFlType;
        singleProduct.unit = this.allProduct[i].unit;
        singleProduct.onlineSalesAmount = this.allProduct[i].onlineSalesAmount;
        //一口价
        singleProduct.batchNo = this.allProduct[i].batchNo;
        singleProduct.stockNo = this.allProduct[i].stockNo;
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
      //删除购物车数据
      var deleteArray = [];
      if (this.isX) {
        for (let i = 0; i < this.allProduct.length; i++) {
          deleteArray.push(this.allProduct[i].cartItemId);
        }
      } else {
        for (let i = 0; i < this.allProduct.length; i++) {
          deleteArray.push(this.allProduct[i].id); //不像窗帘，这里一个cart_item_id可能对应多个
        }
      }
      let orderUrl = this.orderBaseUrl + "/order/orderCount.do";
      let data = {
        product_group_tpye: this.allProduct[0].item.groupType,
        promotion_cost: this.totalPrice,
        // "cid": "C01613",
        cid: this.$store.getters.getCId,
        companyId: this.$store.getters.getCMId,
        rebateY: this.Ycoupon,
        rebateM: this.Mcoupon,
        arrearsFlag: this.arrearsFlag, //活动字段(用来判断是否需要判断余额)，Y或N,无时传null
        ctm_order: {
          orderNo: this.orderNo,
          deliveryNotes: this.deliveryBei, //（可不传）
          postAddressModified: this.isDefaultAdd, //默认送货地址标志，0为默认，1非默认
          postAddress: this.address.postAddress,
          notes: this.orderBei,
          wlContacts: this.address.name,
          wlTel: this.address.tel,
          allSpend: this.totalPrice,
          deliveryFlag: "0",
          deliveryType: this.deliveryTypeCode,
          invoiceFlag: "0",
          projectNo: this.gongchenhao,
          reciverArea1: this.address.reciverArea1,
          reciverArea2: this.address.reciverArea2,
          reciverArea3: this.address.reciverArea3,
          allAddress: this.address.address,
          buyUser: this.buyUser,
          buyUserPhone: this.buyUserPhone,
          buyUserAddress: this.buyUserAddress,
          buyUserPicture: this.buyUserPicture,
          buyUserArea1: this.buyUserArea1,
          buyUserArea2: this.buyUserArea2,
          buyUserArea3: this.buyUserArea3,
          buyUserPostAddress: this.buyUserPostAddress,
          packingNote: this.packingNote,
        },
        ctm_orders: this.productList,
        cartItemIDs: deleteArray,
        device: window.plus ? window.plus.os.name : "app",
      };
      if (this.isX) {
        //窗帘提交
        orderSettlement(data)
          .then((data) => {
            Toast({
              duration: 2000,
              message: "提交订单成功",
            });
            this.$router.push({
              name: "myorder",
              params: {
                refresh: true,
              },
            });
          })
          .catch((res) => {
            Toast({
              duration: 2000,
              message: res.msg,
            });
          });
      } else {
        normalOrderSettlement(data)
          .then((data) => {
            Toast({
              duration: 2000,
              message: "提交订单成功",
            });
            this.$router.push({
              name: "myorder",
              params: {
                refresh: true,
              },
            });
          })
          .catch((res) => {
            Toast({
              duration: 2000,
              message: res.msg,
            });
          });
      }
    },
    //生成订单后删除购物车的信息
    updateCart() {
      let url = this.orderBaseUrl + "/commodity/alterCommodityStatus.do";
      let commodityID = [];
      for (let i = 0; i < this.allProduct.length; i++) {
        commodityID.push(this.allProduct[i].id);
      }
      axios.post(url, commodityID).then((res) => {
        this.$router.push({
          path: "/myorder",
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
        typeId: this.allProduct[0].item.groupType, //商品种类
      };
      axios.post(url, data).then((data) => {
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
        }
      });
    },
    canUseConpon(couponData) {
      if (this.salPromotion.P_ID) {
        if (this.salPromotion.REBATE_FLAG == "N") {
          return false;
        }
        if (
          couponData.rebateType != this.salPromotion.REBATE_TYPE &&
          this.salPromotion.REBATE_TYPE != "all"
        ) {
          return false;
        }
      }
      return true;
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
        singleProduct.qtyRequired = this.allProduct[i].qtyRequired;
        singleProduct.notes = this.allProduct[i].note;
        singleProduct.unitPrice = this.allProduct[i].price;
        singleProduct.promotionCost = this.allProduct[i].promotionCost;
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
        promotion_cost: this.totalPrice,
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
          allSpend: this.totalPrice,
          deliveryFlag: "0",
          deliveryType: this.deliveryTypeCode,
          invoiceFlag: "0",
          projectNo: this.gongchenhao,
          reciverArea1: this.address.reciverArea1,
          reciverArea2: this.address.reciverArea2,
          reciverArea3: this.address.reciverArea3,
          allAddress: this.address.address,
          buyUser: this.buyUser,
          buyUserPhone: this.buyUserPhone,
          buyUserAddress: this.buyUserAddress,
          buyUserPicture: this.buyUserPicture,
          buyUserArea1: this.buyUserArea1,
          buyUserArea2: this.buyUserArea2,
          buyUserArea3: this.buyUserArea3,
          buyUserPostAddress: this.buyUserPostAddress,
        },
        ctm_orders: this.productList,
      };
      axios.post(orderUrl, data).then((val) => {
        if (val.data.code == 0) {
          for (let i = 0; i < val.data.data.rebate.length; i++) {
            this.allProduct[i].mCoupon =
              Math.round(val.data.data.rebate[i].rebateMonth * 100) / 100;
            this.allProduct[i].yCoupon =
              Math.round(val.data.data.rebate[i].rebateYear * 100) / 100;
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
          this.backPrice =
            val.data.data.allRebateMonth + val.data.data.allRebateYear;
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
        cid: this.$store.getters.getCId,
      };
      axios.post(url, data).then((value) => {
        this.allAddress = value.data.data;
        for (let i = 0; i < this.allAddress.length; i++) {
          this.allAddress[i].id = this.allAddress[i].addressId;
          this.allAddress[i].name = this.allAddress[i].wlContacts;
          this.allAddress[i].tel = this.allAddress[i].wlTel;
          this.allAddress[i].reciverArea1 = this.allAddress[i].province;
          this.allAddress[i].reciverArea2 = this.allAddress[i].city;
          this.allAddress[i].reciverArea3 = this.allAddress[i].country;
          this.allAddress[i].province =
            (this.allAddress[i].province ? this.allAddress[i].province : "") +
            (this.allAddress[i].city ? this.allAddress[i].city : "") +
            (this.allAddress[i].country ? this.allAddress[i].country : "");
          this.allAddress[i].address =
            (this.allAddress[i].province ? this.allAddress[i].province : "") +
            (this.allAddress[i].postAddress
              ? this.allAddress[i].postAddress
              : "");
        }
        if (this.address.name && this.address.tel) {
          //如果是窗帘重新提交进来有默认值
          for (let i = 0; i < this.allAddress.length; i++) {
            let wlContacts = this.allAddress[i].wlContacts
              ? this.allAddress[i].wlContacts
              : "";
            let wlTel = this.allAddress[i].wlTel
              ? this.allAddress[i].wlTel
              : "";
            let reciverArea1 = this.allAddress[i].reciverArea1
              ? this.allAddress[i].reciverArea1
              : "";
            let reciverArea2 = this.allAddress[i].reciverArea2
              ? this.allAddress[i].reciverArea2
              : "";
            let reciverArea3 = this.allAddress[i].reciverArea3
              ? this.allAddress[i].reciverArea3
              : "";

            let wlContacts2 = this.address.name ? this.address.name : "";
            let wlTel2 = this.address.tel ? this.address.tel : "";
            let reciverArea12 = this.address.reciverArea1
              ? this.address.reciverArea1
              : "";
            let reciverArea22 = this.address.reciverArea2
              ? this.address.reciverArea2
              : "";
            let reciverArea32 = this.address.reciverArea3
              ? this.address.reciverArea3
              : "";

            if (
              wlContacts2 == wlContacts &&
              wlTel2 == wlTel &&
              reciverArea12 == reciverArea1 &&
              reciverArea22 == reciverArea2 &&
              reciverArea32 == reciverArea3
            ) {
              this.address = this.allAddress[i];
            }
          }
        } else {
          for (let i = 0; i < this.allAddress.length; i++) {
            if (this.allAddress[i].addressId == 0) {
              //默认地址
              this.address = this.allAddress[i];
              break;
            }
          }
        }
        this.$store.commit("setAddress", this.address);
      });
    },
    getBuyUser() {
      GetBuyUserInfo({
        cid: this.$store.getters.getCId,
        condition: "",
        page: 1,
        limit: 99999,
      }).then((res) => {
        this.allBuyserAddress = res.data;
        for (let i = 0; i < this.allBuyserAddress.length; i++) {
          this.allBuyserAddress[i].id = this.allBuyserAddress[i].ADDRESS_ID;
          this.allBuyserAddress[i].name = this.allBuyserAddress[i].BUYUSER;
          this.allBuyserAddress[i].tel = this.allBuyserAddress[i].BUYUSER_PHONE;
          this.allBuyserAddress[i].reciverArea1 = this.allBuyserAddress[
            i
          ].PROVINCE;
          this.allBuyserAddress[i].reciverArea2 = this.allBuyserAddress[i].CITY;
          this.allBuyserAddress[i].reciverArea3 = this.allBuyserAddress[
            i
          ].COUNTRY;
          this.allBuyserAddress[i].province =
            (this.allBuyserAddress[i].PROVINCE
              ? this.allBuyserAddress[i].PROVINCE
              : "") +
            (this.allBuyserAddress[i].CITY
              ? this.allBuyserAddress[i].CITY
              : "") +
            (this.allBuyserAddress[i].COUNTRY
              ? this.allBuyserAddress[i].COUNTRY
              : "");
          this.allBuyserAddress[i].address =
            (this.allBuyserAddress[i].province
              ? this.allBuyserAddress[i].province
              : "") +
            (this.allBuyserAddress[i].POST_ADDRESS
              ? this.allBuyserAddress[i].POST_ADDRESS
              : "");
        }
      });
    },
    onShowAddress() {
      this.getBuyUser();
      this.showBuyserAddress = true;
    },
    onSelectAddress(item, index) {
      this.address = item;
      this.showAddress = false;
    },
    onSelectAddress2(item, index) {
      this.selAddress = item;
      this.buyUser = item.BUYUSER;
      this.buyUserPhone = item.BUYUSER_PHONE;
      this.buyUserArea1 = item.PROVINCE;
      this.buyUserArea2 = item.CITY;
      this.buyUserArea3 = item.COUNTRY;
      this.buyUserPostAddress = item.POST_ADDRESS;
      this.selLocation = item.province + "-" + item.CITY + "-" + item.COUNTRY;
      this.showBuyserAddress = false;
    },
    onAddAddress() {
      this.showAddressAdd = true;
    },
    onAddAddress2() {
      this.showBuyserAddressAdd = true;
    },
    onEditAddress(item, index) {
      this.initAddress = this.allAddress[index];
      this.showAddressEdit = true;
    },
    onEditAddress2(item, index) {
      this.initBuyserAddress = this.allBuyserAddress[index];
      this.showBuyserAddressEdit = true;
    },
    listenmore(data) {
      this.showLocation = data;
    },
    listenselect(data) {
      this.selLocation = data;
      var reg = /.+?(省|市|自治区|自治州|县|区)/g;
      var addsressAry = this.selLocation.match(reg);
      this.buyUserArea1 = addsressAry[0];
      this.buyUserArea2 = addsressAry[1];
      this.buyUserArea3 = addsressAry[2];
    },
    iosselect() {
      this.showLocation = true;
    },
    backclick(status) {
      if (status) {
        this.showAddressAdd = false;
        this.showBuyserAddressAdd = false;
      } else {
        this.showAddressEdit = false;
        this.showBuyserAddressEdit = false;
      }
    },
    refreshAddress(status) {
      this.backclick(status);
      this.getAddress();
    },
    refreshAddress2(status) {
      this.backclick(status);
      this.getBuyUser();
    },
    //优惠券使用记录
    UseRecord(couponId) {
      getTotalRecordSum({ couponId: couponId }).then((res) => {
        this.accMoney = res.data;
      });
      var data = {
        couponId: couponId,
        keyWords: "",
        beginTime: "0001/1/1",
        finishTime: "9999/12/31",
        page: 1,
        limit: 10000,
      };
      getUseRecord(data).then((res) => {
        this.allCouponRecord = res.data;
        if (this.allCouponRecord.length == 0) {
          Toast({
            duration: 2000,
            message: "暂无使用记录",
          });
          return;
        }
        this.showUseCouponRecord = true;
      });
    },
    //优惠券返利记录
    couponRecord(couponId) {
      let idurl = this.orderBaseUrl + "/order/getReturnRecord.do";
      let data = {
        id: couponId, //优惠券id
      };
      axios.post(idurl, data).then((res) => {
        this.allflRecord = res.data.data;
        if (this.allflRecord.length == 0) {
          Toast({
            duration: 2000,
            message: "暂无返利记录",
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
    subtotal(data) {
      var price = 0;
      var quantity =
        data.quantity != 0
          ? data.quantity
          : this.dosageFilter(data.width.mul(data.height));
      price = quantity.mul(data.price);
      return this.dosageFilter(price);
    },
    getOrderInfo() {
      var orderHead = this.$store.getters.getOrderHead;
      if (this.allProduct[0].orderNumber) {
        //窗帘重新提交本身有表头数据，加载默认数据
        this.orderNo = orderHead.ORDER_NO;
        this.deliveryBei = orderHead.DELIVERY_NOTES;
        this.isDefaultAdd = orderHead.POST_ADDRESS_MODIFIED;
        this.address.postAddress = orderHead.POST_ADDRESS;
        this.orderBei = orderHead.NOTES.trim();
        this.address.name = orderHead.WL_CONTACTS;
        this.address.tel = orderHead.WL_TEL;
        this.deliveryTypeCode = orderHead.DELIVERY_TYPE;
        this.gongchenhao = orderHead.PROJECT_NO;
        this.address.reciverArea1 = orderHead.RECIVER_AREA1;
        this.address.reciverArea2 = orderHead.RECIVER_AREA2;
        this.address.reciverArea3 = orderHead.RECIVER_AREA3;
        this.address.address = orderHead.ALL_ADDRESS;
        this.buyUser = orderHead.BUYUSER.trim();
        this.buyUserPhone = orderHead.BUYUSERPHONE.trim();
        this.buyUserAddress = orderHead.BUYUSER_ADDRESS.trim();
        this.buyUserPicture = orderHead.BUYUSER_PICTURE.trim();
        this.buyUserArea1 = orderHead.BUYUSER_AREA1.trim();
        this.buyUserArea2 = orderHead.BUYUSER_AREA2.trim();
        this.buyUserArea3 = orderHead.BUYUSER_AREA3.trim();
        this.buyUserPostAddress = orderHead.BUYUSER_POST_ADDRESS.trim();
        if (this.buyUserPicture) {
          var list = this.buyUserPicture.split(";");
          for (var i = 0; i < list.length - 1; i++) {
            var index = list[i].lastIndexOf("/");
            if (index == -1) index = list[i].lastIndexOf("\\");
            var fileName = list[i].substr(index + 1);
            this.fileList.push({
              file: { name: fileName },
              url: this.baseUrlASP + list[i],
            });
          }
        }
      }
      for (var i = 0; i < this.allProduct.length; i++) {
        this.$set(
          this.allProduct[i],
          "qtyRequired",
          this.allProduct[i].quantity
            ? this.allProduct[i].quantity
            : this.dosageFilter(
                this.allProduct[i].width.mul(this.allProduct[i].height)
              )
        );
        this.$set(
          this.allProduct[i],
          "promotionCost",
          this.subtotal(this.allProduct[i])
        );
        this.$set(this.allProduct[i], "mCoupon", "0.00");
        this.$set(this.allProduct[i], "yCoupon", "0.00");
      }
    },
    //获取活动后总价
    getActivityPrice() {
      this.salPromotion.P_ID = this.allProduct[0].activityId;
      if (this.salPromotion.P_ID) {
        GetPromotionByTypeAndId({ pId: this.salPromotion.P_ID }).then((res) => {
          this.salPromotion = res.data;
          this.arrearsFlag = this.salPromotion.ARREARS_FLAG;
          for (var i = 0; i < this.allProduct.length; i++) {
            this.allProduct[i].pId = this.salPromotion.P_ID;
            this.allProduct[i].promotionType = this.salPromotion.ORDER_TYPE;
            this.allProduct[i].flagFlType = this.salPromotion.FLAG_FL_TYPE;

            var price = this.calculatePromotionPrice(this.allProduct[i]);
            this.allProduct[i].promotionCost = price;
          }
        });
      } else {
        this.arrearsFlag = null;
      }
    },
    calculatePromotionPrice(data) {
      var price = 0;
      var quantity = data.qtyRequired;
      //首先判断TYPE,1折扣，2定价。然后判断priority
      if (this.salPromotion && this.salPromotion.P_ID) {
        //一口价
        if (this.salPromotion.PRIORITY == 99) {
          if (quantity < 1) quantity = 1;
          price = quantity.mul(this.salPromotion.PRICE);
        } else {
          switch (this.salPromotion.TYPE) {
            case "1":
              //折扣
              price = quantity.mul(data.price).mul(this.salPromotion.DISCOUNT);
              break;
            case "2":
              //定价
              price = quantity.mul(this.salPromotion.PRICE);
          }
        }
      } else {
        price = quantity.mul(data.price);
      }
      return this.dosageFilter(price);
    },
    onRead(file) {
      let content = file.file;
      let data = new FormData();
      data.append("file", content);
      data.append("cid", this.$store.getters.getCId);
      UploadBuyUserFiles(data);
    },
  },
  created() {
    if (this.$route.params.isX) this.isX = this.$route.params.isX;
    if (
      this.allProduct[0].item.groupType == "B" ||
      this.allProduct[0].item.groupType == "B1"
    )
      this.packingShow = true;
    else this.packingShow = false;
    this.getOrderInfo();
    this.getActivityPrice();
    this.getAddress();
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
    showHeight: function () {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
    },
    //物流备注
    deliveryType: function () {
      if (this.deliveryType == "普通物流(运费由甲方支付)") {
        this.deliveryBei = "";
        this.delInput = true;
      } else {
      }
    },
  },
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
  vertical-align: middle;
}

.delivery,
.coupon {
  border-bottom: 1px solid #fafafa;
}

.delivery-mark {
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
.all-address {
  width: 100%;
  position: fixed;
  top: 50px;
  bottom: 50px;
  overflow-y: scroll;
  background: #f1f1f1;
}
.new-address {
  padding: 60px 10px 10px 10px;
}

.item {
  height: 40px;
  padding: 5px;
  position: relative;
  border-bottom: 1px solid #ebedf0;
  font-size: 15px;
}

.item-title {
  position: absolute;
  height: 20px;
  top: 50%;
  margin-top: -10px;
  left: 10px;
  width: 75px;
}

.item-input {
  border: none;
  width: 200px;
  height: 20px;
  top: 50%;
  margin-top: -10px;
  position: absolute;
  right: 50px;
}

.address-save {
  text-align: center;
  padding: 32px 16px;
}

.save {
  display: inline-block;
  width: 300px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 15px;
  background: #ff2d41;
  color: white;
  font-size: 14px;
}
.delete {
  display: inline-block;
  width: 300px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 15px;
  background: #fff;
  color: #323233;
  border: 1px solid #ebedf0;
  font-size: 14px;
}
</style>
<style>
.reset .van-cell__title {
  text-align: left;
}
</style>