<template>
  <div>
    <top :top="set" :from="from"></top>
    <div class="single-msg">
      <ul class="lists">
        <li>
          <span>类别： {{wallMegs.productType}}</span>
        </li>
        <li>型号： {{wallMegs.itemNo}}</li>
        <template v-if="wallMegs.note">
          <li>名称： {{wallMegs.note}}</li>
        </template>
        <template v-if="wallMegs.fixType">
          <li>风格： {{wallMegs.fixType}}</li>
        </template>
        <template v-if="wallMegs.fixGrade">
          <li>尺寸： {{wallMegs.fixGrade}}mm</li>
        </template>
        <template v-if="wallMegs.productBrand">
          <li>品牌： {{wallMegs.productBrand}}</li>
        </template>
        <li class="order-num">
          订购数量：
          <div class="input-num-right" v-if="dwType">
            <input class="input-num" v-model.number="sum" type="number" @input="oninput" />
            <span>({{wallMegs.unit}})</span>
          </div>
          <div class="input-num-right" v-if="!dwType">
            <input class="input-num" type="number" placeholder="宽" />╳
            <input class="input-num" type="number" placeholder="高" />
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
    <div class="shop-btn" @click="toCart" v-show="hidshow">加入购物车</div>
    <!--选择活动-->
    <van-popup v-model="showSelect" position="bottom">
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
    <van-popup v-model="showKcNext" class="kc-next-content" :close-on-click-overlay="false">
      <div class="kc-next-title">此型号同批次库存不满足需求量</div>
      <div class="kc-next-btm">
        <span @click="fpch">分批出货</span>
        <span @click="dsc">等生产</span>
        <span @click="fh">返回</span>
      </div>
    </van-popup>
    <!--库存判断提示2-->
    <!--<van-popup-->
    <!--v-model="showKcNext2"-->
    <!--class="kc-next-content"-->
    <!--:close-on-click-overlay="false"-->
    <!--&gt;-->
    <!--<div class="kc-next-title">此型号库存不满足需求量</div>-->
    <!--<div class="kc-next-btm2">-->
    <!--<span @click="dsc">等生产</span>-->
    <!--<span @click="fh">返回</span>-->
    <!--</div>-->
    <!--</van-popup>-->
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
  CellGroup
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
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      url: "http://106.13.32.172:8080/yulan-order",
      set: 11,
      overmore: false,
      //是否允许分批发货
      divided: false,
      //填写的商品购买数量(数据类型是字符串)
      sum: null,
      //宽
      widthVal: "",
      //高
      heightVal: "",
      //平凡米
      pingf: "",
      needNum: "",
      show: false,
      //是否允许分批出货
      separate: false,
      //是否分批出货标志
      fpfh: "",
      //优惠活动选择
      showSelect: false,
      //选择的活动类型
      myActivity: "",
      //活动唯一标识符
      hdid: "",
      //所以可参与的活动
      allHd: [],
      //活动编码
      hdcode: "",
      //墙纸单位
      dwType: null,
      //墙纸详情
      wallMegs: [],
      //库存信息
      kcMsgs: [],
      //备注
      beizhu: "",
      //如果没有活动，则箭头不显示
      showMoreHd: true,
      //库存判断之后的操作
      showKcNext: false,
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidshow: true, //显示或者隐藏footer
      from: ""
    };
  },
  methods: {
    toCart() {
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
      } else {
        if (this.sum == "" || this.sum <= 0) {
          Toast({
            duration: 2000,
            message: "请填写购买数量"
          });
          return;
        }
      }
      if (this.myActivity == "请选择活动") {
        Toast({
          duration: 2000,
          message: "请选择活动"
        });
        return;
      }
      if (this.allHd.length != 0 && this.myActivity == "未选择活动") {
        Toast({
          duration: 2000,
          message: "请选择活动"
        });
        return;
      }
      if (this.sum == undefined) {
        this.sum = "";
      }
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
        let editData = {
          commodityID: this.$route.params.commodityID, //商品条ID
          activityID: this.hdid, //新活动ID
          quantity: this.sum, //数量
          width: this.widthVal, //宽度
          height: this.heightVal, //高度
          note: this.beizhu, //备注
          splitShipment: this.fpfh
        };
        axios.post(editurl, editData).then(data => {
          if (data.data.code == 0) {
            Toast({
              duration: 2000,
              message: "修改购物车成功"
            });
            this.$router.push({
              name: "shoppingcart",
              params: {
                activeName: "/mycart/softcart"
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
        console.log(
          this.$store.getters.getCtype,
          // this.$store.getters.getCId,
          this.wallMegs.itemNo,
          this.hdid,
          this.sum,
          this.beizhu,
          this.fpfh
        );
        let data = {
          customer_type: this.$store.getters.getCtype, //客户类型
          CID: this.$store.getters.getCId, //客户ID
          // "CID": "C01613",           //客户ID
          itemNO: this.wallMegs.itemNo, //商品编号
          commodityType: "soft", //商品类型：curtain/wallpaper/soft
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
              path: "/searchsoft/mliao"
            });
          }
          //这里面axios的this不指向vue,所以在使用axios是最好使用es6箭头函数
        });
      }
      this.show = true;
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
      if (this.myActivity == "未选择活动" && this.allHd.length == 0) {
        this.myActivity = "此产品不参与活动";
      }
    },
    //加入购物车时的库存判断
    kuCunjudge() {
      let url = this.orderBaseUrl + "/item/judgeStockShow.do";
      if (this.wallMegs.unit == "平方米") {
        this.needNum = (this.heightVal * this.widthVal).toString();
      } else {
        this.needNum = this.sum;
      }
      let data2 = {
        itemNo: this.wallMegs.itemNo, //产品型号
        stockShowNum: this.needNum //需要的库存
      };
      axios.post(url, data2).then(data => {
        if (data.data.msg == "SUCCESS") {
          this.toCart();
        } else if (
          data.data.msg == "waitForProduction" ||
          data.data.msg == "null"
        ) {
          Dialog.confirm({
            message: "此型号库存不满足需求量",
            closeOnClickOverlay: true,
            confirmButtonText: "等生产",
            cancelButtonText: "返回"
          })
            .then(() => {
              this.fpfh = "0";
              this.toCart();
              this.$router.push({
                path: "/searchsoft/mliao"
              });
              // on confirm
            })
            .catch(() => {
              // on cancel
              this.fpfh = "";
              this.$router.push({
                path: "/searchsoft/mliao"
              });
            });
        } else if (data.data.msg == "splitShipment") {
          this.showKcNext = true;
        }
      });
    },
    //分批出货
    fpch() {
      this.separate = true;
      this.fpfh = "1";
      this.toCart();
      this.$router.push({
        path: "/searchsoft/mliao"
      });
    },
    //等生产
    dsc() {
      this.separate = false;
      this.fpfh = "0";
      this.toCart();
      this.$router.push({
        path: "/searchsoft/mliao"
      });
    },
    //返回
    fh() {
      this.fpfh = "-1";
      this.$router.push({
        path: "/searchsoft/mliao"
      });
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
      getItemById({ itemNo: value.itemNo }).then(res => {
        GetPromotionByItem({
          cid: this.$store.getters.getCId,
          customerType: this.$store.getters.getCtype,
          itemNo: value.itemNo,
          itemVersion: res.data.ITEM_VERSION,
          productType: res.data.PRODUCT_TYPE,
          productBrand: res.data.PRODUCT_BRAND
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
          if (this.$route.params.commodityID) {
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
          //这里面axios的this不指向vue,所以在使用axios是最好使用es6箭头函数
        });
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
    //获取产品信息
    getProduct() {
      let wallUrl = this.orderBaseUrl + "/item/getSoftInfoSingle.do";
      let data = {
        itemType: this.$route.params.itemType,
        cid: this.$store.getters.getCId,
        // "cid":"C01613",
        itemNo: this.$route.params.itemNo, //模糊查询内容
        limit: 1, //一页限制条数
        page: 1 //第几页
      };
      axios
        .post(wallUrl, data)
        .then(data => {
          this.wallMegs = data.data.data[0];
          //单位
          if (this.wallMegs.unit == "平方米") {
            this.dwType = false;
          } else {
            this.dwType = true;
          }
          if (this.wallMegs.fixType == "02") {
            this.wallMegs.fixType = "定高";
          } else if (this.wallMegs.fixType == "01") {
            this.wallMegs.fixType = "定宽";
          }
          //这里面axios的this不指向vue,所以在使用axios是最好使用es6箭头函数
          return this.wallMegs;
        })
        .then(value => {
          this.getHd(value);
        });
    },
    hdname(orderName, orderType) {
      return orderName + "(" + orderType + ")";
    },
    noActivity() {
      this.myActivity = "不参与活动";
      this.hdcode = "";
      this.hdid = "";
      // this.showSelect= false
    },
    //输入限制
    oninput(e) {
      var that = this;
      // 通过正则过滤小数点后两位
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
      that.sum = e.target.value;
    }
  },
  created() {
    this.from = this.$route.params.from;
    this.getProduct();
    //获取库存
    // this.getHd();
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
    // _sum:{
    //   set: function(value) {
    //     this.sum = value;
    //   },
    //   get: function() {
    //     console.log(this.sum)
    //     if (this.sum == null) {
    //       this.sum = ""
    //     }
    //     return this.sum.toString().replace(/[^0-9]+/g,'')
    //   }
    // },
    myhd() {
      if (this.hdcode == null) {
        this.hdcode = "";
      }
      return this.myActivity + "-" + this.hdcode;
    }
  },
  watch: {
    //商品活动
    show(newValue, oldValue) {
      if (newValue == false) {
        this.showSelect = false;
      }
    },
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
  position: fixed;
  overflow-y: scroll;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 50px;
  -webkit-overflow-scrolling: touch; /*这句是为了滑动更顺畅*/
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
  position: fixed;
  bottom: 0;
}

.comfirm-bottom span {
  color: white;
  font-size: 20px;
}

.van-cell-group {
  margin-bottom: 50px;
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
  margin: 30px 30px;
  padding: 10px 30px;
  border: 1px solid #ececec;
  /*border-radius: 10px;*/
  /*font-size: 17px;*/
}
</style>
