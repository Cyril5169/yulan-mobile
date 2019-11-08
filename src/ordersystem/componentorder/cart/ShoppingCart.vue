<template>
  <div class="shopping-cart">
    <top :top="set"></top>
    <div class="cart-nav">
      <ul>
        <li>
          <router-link to="/mycart/wallcart">墙纸</router-link>
        </li>
        <li>
          <router-link to="/mycart/softcart">软装</router-link>
        </li>
        <li>
          <router-link to="/mycart/curtaincart">窗帘</router-link>
        </li>
      </ul>
    </div>
    <!--购物车内容-->
    <!-- <router-view></router-view> -->
    <keep-alive>
      <wallcart v-if="activeName == '/mycart/wallcart'"></wallcart>
    </keep-alive>
    <keep-alive>
      <softcart v-if="activeName == '/mycart/softcart'"></softcart>
    </keep-alive>
    <keep-alive>
      <curtaincart v-if="activeName == '/mycart/curtaincart'"></curtaincart>
    </keep-alive>
    <navBottom :tab-stage="myRoute"></navBottom>
    <van-loading class="loading" type="spinner" v-if="loading" color="black" />
  </div>
</template>

<script>
import axios from "axios";
import top from "../../../components/Top";
import navBottom from "../../../components/navBottom";
import wallcart from "./WallCart";
import softcart from "./SoftCart";
import curtaincart from "./CurtainCart";
import { Loading } from "vant";

export default {
  name: "shoppingcart",
  components: {
    top,
    navBottom,
    [Loading.name]: Loading,
    wallcart,
    softcart,
    curtaincart
  },
  data() {
    return {
      // url:this.$store.getters.geturl,
      url: "http://106.14.159.244:8080/yulan-order",
      set: 12,
      //底部导航栏样式切换
      myRoute: "cart",
      //所有类型购物车列表
      allCartList: {},
      //墙纸购物车列表
      wallpaper: [],
      loading: false,
      showWall: false,
      activeName: "/mycart/wallcart"
    };
  },
  watch: {
    $route(val, oldVal) {
      if (
        val.path == "/mycart/wallcart" ||
        val.path == "/mycart/softcart" ||
        val.path == "/mycart/curtaincart"
      ) {
        this.activeName = val.path;
      }
    }
  },
  methods: {
    cartList() {
      var that = this;
      this.loading = true;
      let cartUrl =
        this.orderBaseUrl +
        "/cart/getAllCartByCID.do?CID=" +
        this.$store.getters.getCId;
      axios
        .post(cartUrl)
        .then(data => {
          //过滤
          for (let i = 0; i < data.data.cartItems.wallpaper.length; ) {
            if (data.data.cartItems.wallpaper[i].commodities.length == 0) {
              data.data.cartItems.wallpaper.splice(i, 1);
            } else {
              i++;
            }
          }
          for (let i = 0; i < data.data.cartItems.soft.length; ) {
            if (data.data.cartItems.soft[i].commodities.length == 0) {
              data.data.cartItems.soft.splice(i, 1);
            } else {
              i++;
            }
          }
          //一个对象
          this.allCartList = data.data.cartItems;
          //添加到购物车列表全局变量
          this.$store.commit("setcart", this.allCartList);
          return this.allCartList;
        })
        .then(cartdata => {
          //单个活动转换为中文
          let hdArray = [];
          for (let i = 0; i < cartdata.wallpaper.length; i++) {
            for (let j = 0; j < cartdata.wallpaper[i].commodities.length; j++) {
              if (cartdata.wallpaper[i].commodities[j].activityId != null) {
                hdArray.push(cartdata.wallpaper[i].commodities[j].activityId);
              }
              if (cartdata.wallpaper[i].commodities[j].splitShipment == 0) {
                cartdata.wallpaper[i].commodities[j].newsplitShipment =
                  "等生产";
              } else if (
                cartdata.wallpaper[i].commodities[j].splitShipment == 1
              ) {
                cartdata.wallpaper[i].commodities[j].newsplitShipment =
                  "分批出货";
              } else {
                cartdata.wallpaper[i].commodities[j].newsplitShipment = "--";
              }
            }
          }
          let hdArrayUrl =
            this.orderBaseUrl + "/salPromotion/getSalPromotionsByIDs.do";
          axios.post(hdArrayUrl, hdArray).then(hdRes => {
            let hdlength = 0;
            for (let i = 0; i < cartdata.wallpaper.length; i++) {
              for (
                let j = 0;
                j < cartdata.wallpaper[i].commodities.length;
                j++
              ) {
                if (cartdata.wallpaper[i].commodities[j].activityId == null) {
                  cartdata.wallpaper[i].commodities[j].newactivityId = "";
                } else {
                  cartdata.wallpaper[i].commodities[j].newactivityId =
                    hdRes.data[hdlength++];
                }
                //增加一个产品组字段
                // cartdata.wallpaper[i].commodities[j].newProductType = cartdata.wallpaper[i].productGroupType
              }
            }
            if (window.location.href.split("#/")[1] != "wallcart") {
              // this.$router.push({
              //   path: "/mycart/wallcart"
              // });
            }
          });
          //单个活动转换为中文
          let rzArray = [];
          for (let i = 0; i < cartdata.soft.length; i++) {
            for (let j = 0; j < cartdata.soft[i].commodities.length; j++) {
              if (cartdata.soft[i].commodities[j].activityId != null) {
                rzArray.push(cartdata.soft[i].commodities[j].activityId);
              }
              if (cartdata.soft[i].commodities[j].splitShipment == 0) {
                cartdata.soft[i].commodities[j].newsplitShipment = "等生产";
              } else if (cartdata.soft[i].commodities[j].splitShipment == 1) {
                cartdata.soft[i].commodities[j].newsplitShipment = "分批出货";
              } else {
                cartdata.soft[i].commodities[j].newsplitShipment = "--";
              }
            }
          }
          this.loading = false;

          let rzArrayUrl =
            this.orderBaseUrl + "/salPromotion/getSalPromotionsByIDs.do";
          axios.post(rzArrayUrl, rzArray).then(hdRes => {
            let hdlength = 0;
            for (let i = 0; i < cartdata.soft.length; i++) {
              for (let j = 0; j < cartdata.soft[i].commodities.length; j++) {
                if (cartdata.soft[i].commodities[j].activityId == null) {
                  cartdata.soft[i].commodities[j].newactivityId = "";
                } else {
                  cartdata.soft[i].commodities[j].newactivityId =
                    hdRes.data[hdlength++];
                }
                //增加一个产品组字段
                cartdata.soft[i].commodities[j].newProductType =
                  cartdata.soft[i].productGroupType;
              }
            }
            if (window.location.href.split("#/")[1] != "wallcart") {
              // this.$router.push({
              //   path: "/mycart/wallcart"
              // });
            }
          });
        });
    },
    //单个活动转换为中文
    hdArraychange() {
      let hdArray = [];
      for (let i = 0; i < cartdata.wallpaper.length; i++) {
        for (let j = 0; j < cartdata.wallpaper[i].commodities.length; j++) {
          hdArray.push(cartdata.wallpaper[i].commodities[j].activityId);
        }
      }
      let hdArrayUrl =
        this.orderBaseUrl + "/salPromotion/getSalPromotionsByIDs.do";
      axios.post(hdArrayUrl, hdArray).then(hdRes => {
        for (let i = 0; i < cartdata.wallpaper.length; i++) {
          for (let j = 0; j < cartdata.wallpaper[i].commodities.length; j++) {
            // cartdata.wallpaper[i].commodities[j].activityId = hdRes
          }
        }
      });
    }
  },
  activated() {
    var activeNameUrl = this.$route.params.activeName;
    if (activeNameUrl) this.activeName = activeNameUrl;
    this.$router.push({ path: this.activeName });
  }
};
</script>

<style scoped>
.shopping-cart {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0px;
  background-color: #f8f8f8;
}

.cart-nav {
  width: 100%;
  background-color: white;
  margin: 50px 0px 5px 0px;
  position: fixed;
  z-index: 999;
  top: 0;
  -moz-box-shadow: 0px 1px 0 #e7e7e7;
  -webkit-box-shadow: 0px 1px 0 #e7e7e7;
  box-shadow: 0px 1px 0 #e7e7e7;
}

.cart-nav ul {
  display: flex;
  justify-content: space-around;
}
.cart-nav li {
  display: inline-block;
  margin: 10px 0px;
  font-size: 13px;
  height: 15px;
  line-height: 18px;
}
.cart-nav li a {
  color: #4b4b4b;
  padding-bottom: 5px;
}
.cart-nav li a.router-link-active {
  border-bottom: 3px solid #8cbb44;
  color: #8cbb44;
  font-size: 15px;
  font-weight: bold;
}
</style>
