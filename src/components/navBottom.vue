<template>
  <div class="nav" ref="nav">
    <div class="nav-list" v-cloak>
      <div class="home" @click="clickToPath('customer')">
        <div class="home-pic2" ref="homePic" v-if="tabStage != 'customer'"></div>
        <div class="home-pic1" ref="homePic" v-else></div>
        <div class="my-font" ref="f_homePic" v-if="tabStage != 'customer'">主页</div>
        <div class="my-font2" ref="f_homePic" v-else>主页</div>
        <div v-if="CUSTOMER_BALANCE_PERIOD_COUNT>0" class="tips">{{CUSTOMER_BALANCE_PERIOD_COUNT}}</div>
      </div>
      <div v-if="isContainAttr('myorder')" class="form" @click="clickToPath('myorder')">
        <div class="form-pic1" ref="formPic" v-if="tabStage != 'order'"></div>
        <div class="form-pic1" ref="homePic" v-else></div>
        <div class="my-font" ref="f_formPic" v-if="tabStage != 'order'">订单查询</div>
        <div class="my-font2" ref="f_formPic" v-else>订单查询</div>
        <div v-if="ORDER_COUNT>0" class="tips">{{ORDER_COUNT}}</div>
      </div>
      <div v-if="isContainAttr('shoppingcart')" class="shop" @click="clickToPath('shoppingcart')">
        <div class="shop-pic1" ref="shopPic" v-if="tabStage != 'cart'"></div>
        <div class="shop-pic2" ref="homePic" v-else></div>
        <div class="my-font" ref="f_shopPic" v-if="tabStage != 'cart'">购物车</div>
        <div class="my-font2" ref="f_shopPic" v-else>购物车</div>
        <div v-if="SHOPPING_COUNT>0" class="tips">{{SHOPPING_COUNT}}</div>
      </div>
      <div class="my" @click="clickToPath('mypersonal')">
        <div class="my-pic2" ref="myPic" v-if="tabStage != 'personal'"></div>
        <div class="my-pic1" ref="myPic" v-else></div>
        <div class="my-font" ref="f_myPic" v-if="tabStage != 'personal'">我的</div>
        <div class="my-font2" ref="f_myPic" v-else>我的</div>
        <div v-if="MY_COUNT>0" class="reddot"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetTips } from "@/api/webUserASP";
import Vue from "vue";
export default {
  //order
  name: "navBottom",
  props: ["changeStyle", "tabStage"],
  data() {
    return {
      CUSTOMER_BALANCE_PERIOD_COUNT: this.$store.state.tipsInfo
        ? this.$store.state.tipsInfo.CUSTOMER_BALANCE_PERIOD
        : 0,
      ORDER_COUNT: this.$store.state.tipsInfo
        ? this.$store.state.tipsInfo.ORDER
        : 0,
      MY_COUNT: this.$store.state.tipsInfo
        ? this.$store.state.tipsInfo.NOTIFICATION +
          this.$store.state.tipsInfo.STUDY_FORM
        : 0,
      SHOPPING_COUNT: this.$store.state.tipsInfo
        ? this.$store.state.tipsInfo.CART_ITEM_WALLPAPER +
          this.$store.state.tipsInfo.CART_ITEM_CURTAIN +
          this.$store.state.tipsInfo.CART_ITEM_SOFT
        : 0
    };
  },
  methods: {
    isContainAttr(attr) {
      //是否包含权限
      return (
        this.$store.state.menuTreeListFlatten.filter(
          item => item.MENU_LINK == attr
        ).length > 0
      );
    },
    clickToPath(path) {
      if (path != window.location.href.split("#/")[1]) {
        this.$router.push({
          path: "/" + path
        });
      }
    },
    getTip() {
      GetTips(this.$store.getters.getCId).then(res => {
        this.$store.commit("setTipsInfo", res.data);
        this.CUSTOMER_BALANCE_PERIOD_COUNT = res.data.CUSTOMER_BALANCE_PERIOD;
        this.ORDER_COUNT = res.data.ORDER;
        this.MY_COUNT = res.data.STUDY_FORM + res.data.NOTIFICATION;
        this.SHOPPING_COUNT =
          res.data.CART_ITEM_WALLPAPER +
          res.data.CART_ITEM_CURTAIN +
          res.data.CART_ITEM_SOFT;
        if (res.data.CUSTOMER_BALANCE_PERIOD_COUNT > 0) {
          if (page_customer) {
            Vue.set(
              page_customer,
              "CUSTOMER_BALANCE_PERIOD_COUNT",
              res.data.CUSTOMER_BALANCE_PERIOD
            );
          }
        }
        if (page_myPersonal) {
          Vue.set(page_myPersonal, "STUDY_FORM_COUNT", res.data.STUDY_FORM);
          Vue.set(page_myPersonal, "NOTIFICATION_COUNT", res.data.NOTIFICATION);
        }
        if (page_shoppingcart) {
          Vue.set(
            page_shoppingcart,
            "CART_ITEM_WALLPAPER_COUNT",
            res.data.CART_ITEM_WALLPAPER
          );
          Vue.set(
            page_shoppingcart,
            "CART_ITEM_CURTAIN_COUNT",
            res.data.CART_ITEM_CURTAIN
          );
          Vue.set(
            page_shoppingcart,
            "CART_ITEM_SOFT_COUNT",
            res.data.CART_ITEM_SOFT
          );
        }
      });
    }
  },
  mounted() {
    this.getTip();
  },
  activated() {
    this.getTip();
  }
};
</script>

<style scoped>
[v-cloak] {
  display: none !important;
}
.nav {
  width: 375px;
  height: 60px;
  background-color: #fff;
  position: fixed;
  z-index: 999;
  bottom: 0;
}

.nav2 {
  width: 375px;
  height: 60px;
  background-color: #fff;
  position: absolute;
  z-index: 100;
  bottom: 0;
}

.nav-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
}

.home {
  position: relative;
  height: 45px;
}

.my {
  position: relative;
  height: 45px;
}

.form {
  position: relative;
  height: 45px;
}

.form-pic1 {
  width: 30px;
  height: 30px;
  background-image: url("../assets/form1.png");
  background-size: contain;
  margin: 0 auto;
  background-repeat: no-repeat;
}

.form-pic2 {
  width: 30px;
  height: 30px;
  background-image: url("../assets/form2.png");
  background-size: contain;
  margin: 0 auto;
  background-repeat: no-repeat;
}

.shop {
  position: relative;
  height: 45px;
}

.shop-pic1 {
  width: 30px;
  height: 30px;
  background-image: url("../assets/shop.png");
  background-size: contain;
  margin: 0 auto;
  background-repeat: no-repeat;
}

.shop-pic2 {
  width: 30px;
  height: 30px;
  background-image: url("../assets/shop1.png");
  background-size: contain;
  margin: 0 auto;
  background-repeat: no-repeat;
}

.home-pic1 {
  width: 30px;
  height: 30px;
  background-image: url("../assets/home.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.home-pic2 {
  width: 30px;
  height: 30px;
  background-image: url("../assets/home2.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.my-pic2 {
  width: 30px;
  height: 30px;
  background-image: url("../assets/my2.png");
  background-size: contain;
  background-repeat: no-repeat;
  color: #89cb81;
}

.my-pic1 {
  width: 30px;
  height: 30px;
  background-image: url("../assets/my.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.my-font {
  font-size: 10px;
  color: #7d7d7d;
}
.my-font2 {
  font-size: 10px;
  color: #89cb81;
}

.reddot {
  width: 2.133vw;
  min-width: 0;
  height: 2.133vw;
  background-color: #ee0a24;
  border-radius: 100%;
  position: absolute;
  right: 0px;
  top: 0px;
}
.tips {
  padding: 0 3px;
  min-width: 0;
  height: 15px;
  line-height: 15px;
  background-color: #ee0a24;
  color: #fff;
  border-radius: 100%;
  position: absolute;
  right: -3px;
  top: -2px;
}
</style>
