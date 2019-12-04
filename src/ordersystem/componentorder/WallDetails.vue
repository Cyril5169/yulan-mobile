<template>
  <div>
    <top :top="set" :from="from"></top>
    <div class="single-msg">
      <ul class="lists">
        <li>型号： {{wallMegs.itemNo}}</li>
        <li>版本： {{wallMegs.itemVersion}}</li>
        <li>
          <span>名称： {{wallMegs.version}}</span>
        </li>
        <li>品牌： {{wallMegs.productBrand}}</li>
        <li v-if="!AddOrNot&&customerType =='10'" class="order-num">
          单价：
          <div class="input-num-right">
            <input class="input-num" v-model.number="price" @input="oninput4" type="number" />
          </div>
        </li>
        <li v-if="!AddOrNot && customerType !='10'&& showPrice">单价： ￥{{price}}</li>
        <li v-else-if="!AddOrNot && customerType !='10'&& !showPrice">单价： ***</li>
        <li v-if="wallMegs.minimumPurchase>0">起购数量： {{wallMegs.minimumPurchase}}</li>
        <li class="order-num">
          订购数量：
          <div class="input-num-right" v-if="dwType">
            <input class="input-num" v-model.number="sum" @input="oninput" type="number" />
            <span>({{wallMegs.unit}})</span>
          </div>
          <div class="input-num-right" v-if="!dwType">
            <input
              class="input-num"
              v-model.number="widthVal"
              type="number"
              @input="oninput2"
              placeholder="宽"
            />╳
            <input
              class="input-num"
              v-model.number="heightVal"
              type="number"
              @input="oninput3"
              placeholder="高"
            />
            <span>({{wallMegs.unit}})</span>
          </div>
        </li>
        <li class="activit" @click="selectHd">
          活动： {{myhd}}
          <img class="more" v-show="showMoreHd" src="../assetsorder/more.png" alt />
        </li>
        <li>
          备注：
          <input class="mark-content" v-model="beizhu" type="text" placeholder="填写备注" />
        </li>
        <li>说明： {{fpfh}}</li>
        <li>
          <!--<li>-->
          <!--<span>是否允许分批发货：</span>-->
          <!--<van-switch class="van-switch-reset" v-model="separate" active-color="#89cb81" size="19px"/>-->
          <!--</li>-->
        </li>
      </ul>
    </div>
    <div class="shop-btn" v-show="hidshow" @click="kuCunjudge">加入购物车</div>
    <!--选择活动-->
    <van-popup v-model="showSelect" position="bottom" :close-on-click-overlay="false">
      <van-radio-group v-model="hdid">
        <van-cell-group>
          <template v-for="(hdg,index) in allHd">
            <van-cell :key="index +'hdground' +  index" clickable @click="selectthisHd(index)">
              <div style="text-align:center">
                <span>{{hdname(hdg.ORDER_NAME,hdg.ORDER_TYPE)}}</span>
                <van-radio style="display:inline-block" :name="hdg.P_ID" checked-color="#89cb81" />
              </div>
            </van-cell>
          </template>
          <van-cell clickable @click="noActivity">
            <div style="text-align:center">
              <span>不参与活动</span>
              <van-radio style="display:inline-block" name checked-color="#89cb81" />
            </div>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div class="comfirm-bottom" @click="comfirmMakeDetails">
        <span>确定</span>
      </div>
    </van-popup>
    <!--库存判断提示1-->
    <van-popup v-model="showKcNext1" class="kc-next-content" :close-on-click-overlay="false">
      <div class="kc-next-title">此型号同批次库存不满足需求量</div>
      <div class="kc-next-btm">
        <span @click="fpch">分批出货</span>
        <span @click="dsc">等生产</span>
        <span @click="fh">返回</span>
      </div>
    </van-popup>
    <!--库存判断提示2-->
    <van-popup v-model="showKcNext2" class="kc-next-content" :close-on-click-overlay="false">
      <div class="kc-next-title">此型号库存不满足需求量</div>
      <div class="kc-next-btm2">
        <span @click="dsc">等生产</span>
        <span @click="fh">返回</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
import top from "../../components/Top";
import { getItemById, GetPromotionByItem } from "@/api/orderListASP";
import {
  Switch,
  Stepper,
  Sku,
  Popup,
  Toast,
  Dialog,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  ActionSheet
} from "vant";
import "../assetsorder/actionsheet.css";

export default {
  name: "wallDetails",
  components: {
    top,
    [Switch.name]: Switch,
    [Stepper.name]: Stepper,
    [Sku.name]: Sku,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
      url: "http://106.13.32.172:8080/yulan-order",
      set: 11,
      overmore: false,
      divided: false, //是否允许分批发货
      sum: "", //填写的商品购买数量(数据类型是字符串)
      widthVal: "", //宽
      heightVal: "", //高
      pingf: "", //平凡米
      needNum: "",
      price: 0,
      show: false, //填写加入购物车前的商品信息
      separate: false, //是否允许分批出货
      fpfh: "", //是否分批出货标志
      showSelect: false, //优惠活动选择
      myActivity: "", //选择的活动类型
      //所以可参与的活动
      allHd: [],
      //活动编码
      hdcode: "",
      //活动唯一标识符
      hdid: "",
      //墙纸单位
      dwType: null,
      //墙纸详情
      wallMegs: {},
      //库存信息
      kcMsgs: [],
      //备注
      beizhu: "",
      //库存判断返回结果
      kcRes: "",
      //如果没有活动，则箭头不显示
      showMoreHd: true,
      //库存判断之后的操作
      showKcNext1: false,
      showKcNext2: false,
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidshow: true, //显示或者隐藏footer
      decimalNum: 2, //保留小数的位数
      AddOrNot: true,
      from: "",
      //价格隐藏字段
      showPrice: null
    };
  },
  methods: {
    //价格是否隐藏
    isShowPrice() {
      if (this.$store.getters.getIsManage == "0") {
        this.showPrice = false;
      } else {
        this.showPrice = true;
      }
    },
    //加入购物车或者修改购物车
    toCart() {
      if (this.beizhu == undefined) {
        this.beizhu = "";
      }
      if (this.myActivity == "不参与活动") {
        this.hdcode = "";
      }
      if (
        this.fpfh == "分批出货" ||
        this.fpfh == "等生产" ||
        this.fpfh == "--"
      ) {
        this.fpfh = "";
      }
      if (this.fpfh == "") this.fpfh = "-1";
      if (this.$route.params.commodityID) {
        let editurl = this.orderBaseUrl + "/cart/updateCartItem.do";
        let editurl2 = this.orderBaseUrl + "/cart/alterCommodityPrice.do";
        let editData = {
          commodityID: this.$route.params.commodityID, //商品条ID
          activityID: this.hdid, //新活动ID
          quantity: this.sum, //数量
          width: this.widthVal, //宽度
          height: this.heightVal, //高度
          note: this.beizhu, //备注
          splitShipment: this.fpfh
        };
        let obj = {
          commodityID: this.$route.params.commodityID,
          customerType: this.$store.getters.getCtype,
          price: this.price.toString()
        };
        let changeArr = [];
        changeArr.push(axios.post(editurl, editData));
        if (this.$store.getters.getCtype === "10") {
          if (this.price === "") {
            Toast({
              duration: 2000,
              message: "请输入价格"
            });
            return;
          }
          changeArr.push(axios.post(editurl2, obj));
        }
        Promise.all(changeArr).then(data => {
          if (data[0].data.code == 0) {
            Toast({
              duration: 2000,
              message: "修改购物车成功"
            });
            this.$router.push({
              name: "shoppingcart",
              params: {
                activeName: "/mycart/wallcart"
              }
            });
          } else if (data.data.code == 2) {
            Toast({
              duration: 2000,
              message: data.data.msg
            });
          }
        });
      } else {
        let wallUrl = this.orderBaseUrl + "/cart/addCartItem.do";
        let data = {
          customer_type: this.$store.getters.getCtype, //客户类型
          CID: this.$store.getters.getCId, //客户ID
          // "CID": "C01613",           //客户ID
          itemNO: this.wallMegs.itemNo, //商品编号
          commodityType: "wallpaper", //商品类型：curtain/wallpaper/soft
          activityID: this.hdid, //活动ID，对应salPromotion中的orderType字段的值
          quantity: this.sum, //数量
          width: this.widthVal, //宽度
          height: this.heightVal,
          note: this.beizhu, //备注
          splitShipment: this.fpfh //是否分批，是写1，不是传0，是字符串类型
        };
        axios.post(wallUrl, data).then(data => {
          if (data.data.code == 2) {
            Toast({
              duration: 2000,
              message: data.data.msg
            });
          }
          if (data.data.code == 0) {
            Toast({
              duration: 2000,
              message: "加入购物车成功"
            });
            this.$router.push({
              path: "/searchwall"
            });
          }
          //这里面axios的this不指向vue,所以在使用axios是最好使用es6箭头函数
        });
      }
      this.show = true;
    },
    //活动选择
    selectHd() {
      //如果没有活动，则不弹出选择框
      if (this.showMoreHd == false) {
        this.showSelect = false;
      } else {
        this.showSelect = true;
      }
    },
    //获取活动
    getHd(value) {
      // let hdUrl =
      //   this.orderBaseUrl +
      //   "/salPromotion/selectSalPromotion.do?" +
      //   "CID=" +
      //   this.$store.getters.getCId +
      //   "&customerType=" +
      //   this.$store.getters.getCtype +
      //   "&itemNo=" +
      //   value.itemNo +
      //   "&itemVersion=" +
      //   value.itemVersion +
      //   "&productType=" +
      //   value.productType +
      //   "&productBrand=" +
      //   value.productBrand;
      // axios.get(hdUrl).then(data => {
      GetPromotionByItem({
        cid: this.$store.getters.getCId,
        customerType: this.$store.getters.getCtype,
        itemNo: value.itemNo,
        itemVersion: value.ITEM_VERSION,
        productType: value.PRODUCT_TYPE,
        productBrand: value.PRODUCT_BRAND
      }).then(data => {
        this.allHd = data.data;
        if (this.allHd.length == 0) {
          this.myActivity = "此产品不参与活动";
          this.showMoreHd = false;
        } else {
          this.myActivity = "请选择活动";
          this.showMoreHd = true;
        }
        var defaultSel = {
          pri: 0,
          index: 0
        };
        //修改购物车前的初始化数据
        if (this.$route.params.commodityID) {
          this.AddOrNot = false;
          this.editcart();
        } else {
          for (var i = 0; i < this.allHd.length; i++) {
            if (this.allHd[i].PRIORITY != 0 && defaultSel.pri == 0) {
              defaultSel.pri = this.allHd[i].PRIORITY;
              defaultSel.index = i;
            } else if (
              this.allHd[i].PRIORITY != 0 &&
              defaultSel.pri > this.allHd[i].PRIORITY
            ) {
              defaultSel.pri = this.allHd[i].PRIORITY;
              defaultSel.index = i;
            }
          }
          if (defaultSel.pri != 0) {
            this.myActivity = this.allHd[defaultSel.index].ORDER_NAME;
            this.hdcode = this.allHd[defaultSel.index].ORDER_TYPE;
            this.hdid = this.allHd[defaultSel.index].P_ID;
          }
        }
      });
    },
    selectthisHd(index) {
      this.myActivity = this.allHd[index].ORDER_NAME;
      this.hdcode = this.allHd[index].ORDER_TYPE;
      this.hdid = this.allHd[index].P_ID;
    },
    //选择活动
    comfirmMakeDetails() {
      this.showSelect = false;
    },
    //修改购物车信息时初始化
    editcart() {
      this.sum = this.$route.params.quantity;
      this.myActivity = this.$route.params.newactivityID;
      this.hdcode = "";
      this.beizhu = this.$route.params.note;
      this.widthVal = this.$route.params.width;
      this.heightVal = this.$route.params.height;
      this.hdid = this.$route.params.activityID;
      this.fpfh = this.$route.params.tip;
      this.price = this.$route.params.price;
      if (this.myActivity == "未选择活动" && this.allHd.length == 0) {
        this.myActivity = "此产品不参与活动";
      }
    },
    //加入购物车时的库存判断
    kuCunjudge() {
      let url = this.orderBaseUrl + "/item/judgeStockShow.do";
      if (this.wallMegs.unit == "平方米") {
        if (
          this.heightVal == "" ||
          this.widthVal == "" ||
          this.heightVal <= 0 ||
          this.widthVal <= 0
        ) {
          Toast({
            duration: 2000,
            message: "请填写购买数量"
          });
          return;
        }
        this.needNum = (this.heightVal * this.widthVal).toString();
      } else {
        if (this.sum == "" || this.sum <= 0) {
          Toast({
            duration: 2000,
            message: "请填写购买数量"
          });
          return;
        }
        this.needNum = this.sum;
      }
      if (this.needNum < this.wallMegs.minimumPurchase) {
        Toast({
          duration: 2000,
          message:
            "本产品最小起购数量为" +
            this.wallMegs.minimumPurchase +
            this.wallMegs.unit
        });
        return;
      }
      if (this.myActivity == "请选择活动") {
        Toast({
          duration: 2000,
          message: "请选择活动"
        });
        return;
      }
      let data2 = {
        itemNo: this.wallMegs.itemNo, //产品型号
        stockShowNum: this.needNum.toString() //需要的库存
      };
      axios.post(url, data2).then(data => {
        this.kcRes = data.data.msg;
        if (data.data.msg == "SUCCESS") {
          this.toCart();
        } else if (
          data.data.msg == "waitForProduction" ||
          data.data.msg == "null"
        ) {
          this.showKcNext2 = true;
        } else if (data.data.msg == "splitShipment") {
          this.showKcNext1 = true;
        }
      });
    },
    //分批出货
    fpch() {
      this.separate = true;
      this.fpfh = "1";
      this.toCart();
    },
    //等生产
    dsc() {
      this.fpfh = "0";
      this.separate = false;
      this.toCart();
    },
    //返回
    fh() {
      this.fpfh = "";
      this.$router.push({
        path: "/searchwall"
      });
    },
    hdname(orderName, orderType) {
      return orderName + "(" + orderType + ")";
    },
    noActivity() {
      this.myActivity = "不参与活动";
      this.hdcode = "";
      this.hdid = "";
      // this.showSelect = false
    },
    oninput(e) {
      var that = this;
      // 通过正则过滤小数点后两位
      if (this.decimalNum == 1) {
        e.target.value = e.target.value.match(/^\d*(\.?\d{0,1})/g)[0] || null;
      } else {
        e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
      }
      that.sum = e.target.value;
    },
    oninput2(e) {
      var that = this;
      // 通过正则过滤小数点后两位
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
      that.widthVal = e.target.value;
    },
    oninput3(e) {
      var that = this;
      // 通过正则过滤小数点后两位
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
      that.heightVal = e.target.value;
    },
    oninput4(e) {
      var that = this;
      // 通过正则过滤小数点后两位
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
      that.price = e.target.value;
    }
  },
  created() {
    this.isShowPrice();
    this.from = this.$route.params.from;
    let wallUrl = this.orderBaseUrl + "/item/getWallpaperInfo.do";
    let data = {
      paperType: this.$route.params.papertype,
      cid: this.$store.getters.getCId
    };
    axios.post(wallUrl, data).then(data => {
      this.wallMegs = data.data.data;
      getItemById({ itemNo: this.wallMegs.itemNo }).then(res => {
        res.data.DECIMAL_PLACES == "1"
          ? (this.decimalNum = 1)
          : (this.decimalNum = 2);
        this.wallMegs.ITEM_VERSION = res.data.ITEM_VERSION;
        this.wallMegs.PRODUCT_TYPE = res.data.PRODUCT_TYPE;
        this.wallMegs.PRODUCT_BRAND = res.data.PRODUCT_BRAND;
        this.wallMegs.minimumPurchase = res.data.MINIMUM_PURCHASE;
        this.wallMegs.version = this.wallMegs.itemType.note;
        if (this.wallMegs.unit == "平方米") {
          this.dwType = false;
        } else {
          this.dwType = true;
        }
        this.getHd(this.wallMegs);
      });
    });
  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  computed: {
    customerType() {
      if (this.$store.state.info) return this.$store.state.info.customerType;
    },
    myhd() {
      if (this.hdcode == null) {
        this.hdcode = "";
      }
      if (this.myActivity == "") {
        this.myActivity = "不参与活动";
      }
      return this.myActivity + "-" + this.hdcode;
    }
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
.single-msg {
  margin-top: 60px;
  padding: 10px 20px;
  font-size: 15px;
}

.lists {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 10px;
  border-radius: 5px;
}

.single-msg li {
  margin: 15px 5px;
  text-align: left;
}

.activit {
  position: relative;
}

.more {
  width: 22px;
  height: 22px;
  position: absolute;
  right: 5px;
  top: 50%;
  margin-top: -11px;
}

.mark-content {
  border: none;
}

.shop-btn {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #a0cb8d;
  line-height: 50px;
  color: white;
  font-size: 20px;
}

table.gridtable {
  font-family: verdana, arial, sans-serif;
  font-size: 13px;
  color: #333333;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
}

table.gridtable th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #666666;
  background-color: #dedede;
}

table.gridtable td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #666666;
  background-color: #ffffff;
}

.van-switch-reset {
  /*display: inline-block;*/
  float: right;
}

.comfirm-bottom {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #a0cb8d;
  position: relative;
  bottom: 0;
}

.comfirm-bottom span {
  color: white;
  font-size: 20px;
}

.van-cell-group {
  /*height: 280px !important;*/
  margin-bottom: 50px;
  /*position: relative;*/
}

.order-num {
  position: relative;
}

.input-num-right {
  position: absolute;
  right: 5px;
  top: 0;
}

.input-num {
  width: 50px;
  margin: 0 5px;
  border: none;
  text-align: center;
  border-bottom: 1px solid #89cb81;
}

.kc-next-content {
  width: 330px;
  height: 145px;
  border-radius: 5px;
}

.kc-next-title {
  margin: 20px 0 10px;
  font-size: 16px;
}

.kc-next-btm span {
  display: inline-block;
  margin: 30px 0 0 0;
  padding: 10px 25px;
  border: 1px solid #ececec;
  border-radius: 5px;
  background: #a0cb8d;
  color: white;
}
.kc-next-btm2 span {
  display: inline-block;
  margin: 15px 20px;
  padding: 10px 30px;
  border: 1px solid #ececec;
  background: #a0cb8d;
  border-radius: 5px;
  color: white;
}
</style>
