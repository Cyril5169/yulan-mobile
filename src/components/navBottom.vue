<template>
  <div class="nav" ref="nav">
    <div class="nav-list" v-cloak>
      <div class="home" @click="clickToPath('customer')">
        <div class="home-pic1" ref="homePic"></div>
        <div class="my-font" ref="f_homePic">主页</div>
      </div>
      <div v-if="isContainAttr('myorder')" class="form" @click="clickToPath('myorder')">
        <div class="form-pic1" ref="formPic"></div>
        <div class="my-font" ref="f_formPic">订单查询</div>
      </div>
      <div v-if="isContainAttr('shoppingcart')" class="shop" @click="clickToPath('shoppingcart')">
        <div class="shop-pic1" ref="shopPic"></div>
        <div class="my-font" ref="f_shopPic">购物车</div>
      </div>
      <div class="my" @click="clickToPath('mypersonal')">
        <div class="my-pic2" ref="myPic"></div>
        <div class="my-font" ref="f_myPic">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //order
  name: "navBottom",
  props: ["changeStyle", "tabStage"],
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
    }
  },
  mounted() {
    // if (this.changeStyle == "customer" || this.changeStyle == "shopstore") {
    //   let a = this.$refs.nav;
    //   a.className = "nav2";
    // }
    if (this.tabStage == "customer") {
      if (this.$refs.homePic) {
        this.$refs.homePic.classList.remove("home-pic2");
        this.$refs.homePic.classList.add("home-pic1");

        this.$refs.f_homePic.classList.remove("my-font");
        this.$refs.f_homePic.classList.add("my-font2");
      }
      if (this.$refs.myPic) {
        this.$refs.myPic.classList.remove("my-pic1");
        this.$refs.myPic.classList.add("my-pic2");

        this.$refs.f_myPic.classList.remove("my-font2");
        this.$refs.f_myPic.classList.add("my-font");
      }
      if (this.$refs.formPic) {
        this.$refs.formPic.classList.remove("form-pic2");
        this.$refs.formPic.classList.add("form-pic1");

        this.$refs.f_formPic.classList.remove("my-font2");
        this.$refs.f_formPic.classList.add("my-font");
      }
      if (this.$refs.shopPic) {
        this.$refs.shopPic.classList.remove("shop-pic2");
        this.$refs.shopPic.classList.add("shop-pic1");

        this.$refs.f_formPic.classList.remove("my-font2");
        this.$refs.f_formPic.classList.add("my-font");
      }
    }
    if (this.tabStage == "cart") {
      if (this.$refs.homePic) {
        this.$refs.homePic.classList.remove("home-pic1");
        this.$refs.homePic.classList.add("home-pic2");
        
        this.$refs.f_homePic.classList.remove("my-font2");
        this.$refs.f_homePic.classList.add("home-pic");
      }
      if (this.$refs.myPic) {
        this.$refs.myPic.classList.remove("my-pic1");
        this.$refs.myPic.classList.add("my-pic2");

        this.$refs.f_myPic.classList.remove("my-font2");
        this.$refs.f_myPic.classList.add("my-font");
      }
      if (this.$refs.formPic) {
        this.$refs.formPic.classList.remove("form-pic2");
        this.$refs.formPic.classList.add("form-pic1");

        this.$refs.f_formPic.classList.remove("my-font2");
        this.$refs.f_formPic.classList.add("my-font");
      }
      if (this.$refs.shopPic) {
        this.$refs.shopPic.classList.remove("shop-pic1");
        this.$refs.shopPic.classList.add("shop-pic2");

        this.$refs.f_shopPic.classList.remove("my-font");
        this.$refs.f_shopPic.classList.add("my-font2");
      }
    }
    if (this.tabStage == "order") {
      if (this.$refs.homePic) {
        this.$refs.homePic.classList.remove("home-pic1");
        this.$refs.homePic.classList.add("home-pic2");

        this.$refs.f_homePic.classList.remove("my-font2");
        this.$refs.f_homePic.classList.add("home-pic");
      }
      if (this.$refs.myPic) {
        this.$refs.myPic.classList.remove("my-pic1");
        this.$refs.myPic.classList.add("my-pic2");

        this.$refs.f_myPic.classList.remove("my-font");
        this.$refs.f_myPic.classList.add("my-font2");
      }
      if (this.$refs.formPic) {
        this.$refs.formPic.classList.remove("form-pic1");
        this.$refs.formPic.classList.add("form-pic2");

        this.$refs.f_formPic.classList.remove("my-font");
        this.$refs.f_formPic.classList.add("home-pic2");
      }
      if (this.$refs.shopPic) {
        this.$refs.shopPic.classList.remove("shop-pic2");
        this.$refs.shopPic.classList.add("shop-pic1");

        this.$refs.f_shopPic.classList.remove("my-font");
        this.$refs.f_shopPic.classList.add("my-font2");
      }
    }
    if (this.tabStage == "personal") {
      if (this.$refs.myPic) {
        this.$refs.myPic.classList.remove("my-pic2");
        this.$refs.myPic.classList.add("my-pic1");

        this.$refs.f_myPic.classList.remove("my-font");
        this.$refs.f_myPic.classList.add("my-font2");
      }
      if (this.$refs.homePic) {
        this.$refs.homePic.classList.remove("home-pic1");
        this.$refs.homePic.classList.add("home-pic2");

        this.$refs.f_homePic.classList.remove("my-font2");
        this.$refs.f_homePic.classList.add("home-pic");
      }
      if (this.$refs.formPic) {
        this.$refs.formPic.classList.remove("form-pic2");
        this.$refs.formPic.classList.add("form-pic1");

        this.$refs.f_formPic.classList.remove("my-font2");
        this.$refs.f_formPic.classList.add("home-pic");
      }
      if (this.$refs.shopPic) {
        this.$refs.shopPic.classList.remove("shop-pic2");
        this.$refs.shopPic.classList.add("shop-pic1");

        this.$refs.f_shopPic.classList.remove("my-font2");
        this.$refs.f_shopPic.classList.add("home-pic");
      }
    }
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
  height: 45px;
}

.my {
  height: 45px;
}

.form {
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
  color: #89CB81;
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
  color: #89CB81;
}
</style>
