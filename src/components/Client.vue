<template>
  <div class="view">
    <div class="warn" v-show="IsWarn">
      <div class="close-img" @click="CloseWarn"></div>
      <!-- <div class="warn-img"></div> -->
      <p>
        如您未同意
        <span>《</span>
        <router-link @click="CloseWarn" class="warn-a" to="/protocol">网签协议签订提示书</router-link>
        <span>》</span>
      </p>
      <p>系统将不显示相关文本！</p>
      <p>请联系业务员线下操作。</p>
      <p>
        <router-link @click="CloseWarn" class="warn-a2" to="/protocol">请点击阅读并同意后再试！</router-link>
      </p>
    </div>
    <div class="shadow" v-show="IsWarn"></div>
    <div class="client" ref="client">
      <div class="sidebar">
        <div class="user-img"></div>
        <p class="customer-name">{{customer}}</p>
        <div class="quit-box" @click="unlogin">
          <div class="quit"></div>
          <p class="quit-p">退出登录</p>
        </div>
      </div>

      <section class="content" @click.stop="Sidebar">
        <Banner v-bind:IsSidebarOut="IsSidebarOut" :title="'网络协议签订'"></Banner>
        <div class="option1">
          <div class="top-div">
            <div class="item-box">
              <div class="item-img1"></div>
            </div>
          </div>
          <div class="middle-div" @click="toSwiper">
            <p class="middle-div-p">客户资料卡</p>
            <div class="right-arrow"></div>
          </div>
          <div class="bottom-div"></div>
        </div>

        <div class="option2">
          <div class="top-div">
            <div class="item-box active-item">
              <div class="item-img2"></div>
            </div>
          </div>
          <div class="middle-div" @click="Warn">
            <p class="middle-div-p2">玉兰墙纸经销协议书</p>
            <div class="right-arrow"></div>
          </div>
          <div class="bottom-div"></div>
        </div>

        <div class="option3">
          <div class="top-div">
            <div class="item-box">
              <div class="item-img3"></div>
            </div>
          </div>
          <div class="middle-div" @click="toProImage">
            <p class="middle-div-p3">授权书</p>
            <div class="right-arrow"></div>
          </div>
          <div class="bottom-div"></div>
        </div>
        <div class="bottom">
          <div class="tick">
            <div class="tick-img" v-show="Ischeck"></div>
          </div>
          <keep-alive>
            <router-link to="/protocol">网络协议签订提示书</router-link>
          </keep-alive>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Protocol from "./Protocol";
import { bus } from "../utils/eventBus.js";
import Banner from "./Banner";

export default {
  data() {
    return {
      IsSidebarOut: false,
      marginLeft: 0,
      IsWarn: false,
      set: 0,
      kkp: 0
    };
  },
  components: {
    Banner,
    Protocol,
    bus
  },
  computed: {
    customer() {
      return this.$store.state.info.data.realName;
    },
    Ischeck() {
      let userState = this.$store.state.info.data.userState;
      if (userState == "") return false;
      else if (userState == "1") return true;
    },
    CID() {
      if (this.$store.state.info.data.type != "ECWEB") {
        return this.$store.state.CCID;
      } else {
        return this.$store.state.info.data.loginName;
      }
    }
  },
  created() {
    bus.$on("sidebarout", msg => {
      this.IsSidebarOut = msg;
    });
    if (!this.Ischeck) {
      this.$router.push({
        path: "/protocol"
      });
    }
  },
  mounted() {},
  methods: {
    Sidebar() {
      var client = document.getElementsByClassName("client")[0];

      if (this.IsSidebarOut == true) {
        client.classList.remove("active-option");
        client.classList.add("noactive-option");
        setTimeout(() => {
          this.IsSidebarOut = false;
        }, 300);
      }
    },
    unlogin() {
      this.$router.push({
        path: "/"
      });
    },
    Warn() {
      if (!this.Ischeck) {
        this.IsWarn = true;
      } else {
        this.$router.push({
          path: "/agreement"
        });
      }
    },
    CloseWarn() {
      this.IsWarn = false;
    },
    toSwiper() {
      if (!this.Ischeck) {
        this.IsWarn = true;
      } else {
        this.$router.push({
          path: "/swiper"
        });
      }
    },
    toProImage() {
      if (!this.Ischeck) {
        this.IsWarn = true;
      } else {
        this.$router.push({
          path: "/proimage"
        });
      }
    }
  }
};
</script>

<style scoped>
p {
  margin: 0;
}
* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.view {
  height: 100vh;
  width: 375px;
  overflow: hidden;
}
.warn {
  height: 170px;
  width: 268px;
  position: absolute;
  z-index: 101;
  left: 50%;
  top: 50%;
  margin-left: -134px;
  margin-top: -113px;
  border-radius: 10px;
  background-color: #fff;
}
.close-img {
  background: url("../assets/close.png");
  background-size: contain;
  background-position: center;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 10px;
  right: 10px;
}
.warn > p > span {
  color: #89cb81;
}
.warn > p {
  font-size: 13px;
  color: #7d7d7d;
  position: relative;
  top: 48px;
  margin-bottom: 3px;
}
.warn-a {
  color: #89cb81;
  text-decoration: underline;
}
.warn-a2 {
  color: #7d7d7d;
  text-decoration: underline;
}
.shadow {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  background-color: #363636;
}
.sidebar {
  width: 200px;
  height: 100vh;
  position: relative;

  float: right;
  background-color: #efefef;
}
.user-img {
  width: 70px;
  height: 70px;
  background-image: url("../assets/userImg.png");
  background-position: center;
  background-size: contain;
  position: relative;
  margin: 0 auto;
  margin-top: 52px;
}
.customer-name {
  font-size: 15px;
  color: #7d7d7d;
  margin: 0;
  margin-top: 14px;
  margin-bottom: 15px;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #d8d8d8;
  margin-bottom: 52px;
}
.history-box,
.about-box,
.quit-box,
.revise-load-box,
.revise-bill-box {
  height: 52px;
  line-height: 52px;
  width: 100%;
  font-size: 15px;
  color: #7d7d7d;
  border-top: 1px solid #d8d8d8;
  position: relative;
  box-sizing: border-box;
}
.quit-box {
  border-bottom: 1px solid #d8d8d8;
}
.history {
  width: 21px;
  height: 24px;
  background-image: url("../assets/aggrement2.png");
  background-position: center;
  background-size: contain;
  position: absolute;
  top: 50%;
  margin-top: -11px;
  left: 36px;
}
.history-p {
  position: absolute;
  left: 65px;
}
.about {
  width: 22px;
  height: 22px;
  background-image: url("../assets/about.png");
  background-position: center;
  background-size: contain;
  position: absolute;
  top: 50%;
  margin-top: -11px;
  left: 55px;
}
.revise-load {
  width: 22px;
  height: 22px;
  background-image: url("../assets/unlock.png");
  background-position: center;
  background-size: contain;
  position: absolute;
  top: 50%;
  margin-top: -11px;
  left: 43px;
}
.revise-bill-p {
  position: absolute;
  left: 72px;
}
.revise-load-p {
  position: absolute;
  left: 72px;
}
.revise-bill {
  width: 22px;
  height: 22px;
  background-image: url("../assets/edit.png");
  background-position: center;
  background-size: contain;
  position: absolute;
  top: 50%;
  margin-top: -11px;
  left: 43px;
}
.about-p {
  margin: 0;
  font-size: 15px;
  color: #7d7d7d;
  position: absolute;
  left: 85px;
}
.quit-p {
  margin: 0;
  font-size: 15px;
  color: #7d7d7d;
  position: absolute;
  left: 82px;
}
.quit {
  width: 22px;
  height: 22px;
  background-image: url("../assets/quit.png");
  background-position: center;
  background-size: contain;
  position: absolute;
  top: 50%;
  margin-top: -11px;
  left: 52px;
}
.client {
  width: 575px;
  height: 100vh;
  right: 0;
  position: relative;
  background-color: #efefef;
  overflow: hidden;
  transition: margin-left 0.3s;
  -webkit-transition: margin-left 0.3s;
  -moz-transition: margin-left 0.3s; /* Firefox 4 */
  -o-transition: margin-left 0.3s; /* Opera */
}
.active-option {
  margin-left: -200px;
}
.noactive-option {
  margin-left: 0px;
}
.client::-webkit-scrollbar {
  display: none;
}
.content {
  width: 375px;
  height: 100vh;
  float: left;
  position: relative;
  z-index: 10;
  box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.16);
}
.option1 {
  position: relative;
  height: 120px;
  margin-top: 20px;
}
.bottom-div {
  width: 312px;
  height: 92px;
  position: absolute;
  z-index: 1;
  left: 24px;
  background-color: #e5e5e5;
  border-radius: 7px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
}
.middle-div {
  width: 332px;
  height: 94px;
  position: absolute;
  z-index: 2;
  left: 50%;
  margin-left: -166px;
  background-color: #fff;
  border-radius: 7px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
}
.top-div {
  position: absolute;
  z-index: 3;
}
.item-box {
  width: 80px;
  height: 93px;
  position: relative;
  margin-left: 36px;
  background-color: #a4a4a4;
  border-radius: 7px;
  border: 1px solid #fff;
}
.item-box > p {
  height: 100%;
  position: absolute;
  letter-spacing: 5px;
  left: 50%;
  margin-left: -10px;
  font-size: 16px;
  color: #fff;
  writing-mode: vertical-lr;
}
.item-img1 {
  width: 50px;
  height: 50px;
  background-image: url("../assets/people.png");
  background-size: contain;
  background-repeat: no-repeat;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -25px;
  margin-top: -25px;
  z-index: 4;
}
.middle-div-p {
  height: 26px;
  font-size: 18px;
  color: #535353;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -13px;
}
.middle-div-p2 {
  height: 20px;
  font-size: 15px;
  color: #535353;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  margin-top: -10px;
}
.middle-div-p3 {
  height: 26px;
  font-size: 18px;
  color: #535353;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -13px;
}
.right-arrow {
  width: 20px;
  height: 20px;
  background-image: url("../assets/right.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  top: 50%;
  margin-top: -10px;
  right: 5px;
}
.option2 {
  position: relative;
  height: 120px;
  margin-top: 10px;
}
.option3 {
  position: relative;
  margin-top: 10px;
  height: 120px;
}
.item-img2 {
  width: 50px;
  height: 50px;
  background-image: url("../assets/agreement.png");
  background-size: contain;
  background-repeat: no-repeat;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -22px;
  margin-top: -25px;
  z-index: 4;
}
.item-img3 {
  width: 50px;
  height: 50px;
  background-image: url("../assets/selection.png");
  background-size: contain;
  background-repeat: no-repeat;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -25px;
  margin-top: -25px;
  z-index: 4;
}
.tick {
  display: inline-block;
  vertical-align: baseline;
  width: 16px;
  height: 16px;
  margin-right: 2px;
  margin-bottom: -1px;
  border: 1px solid #707070;
  box-sizing: border-box;
  background: #efefef;
  border-radius: 2px;
}
.tick-img {
  background-image: url("../assets/check.png");
  width: 16px;
  height: 16px;
  background-size: cover;
  background-position: center;
}
.bottom {
  position: relative;
  height: 16px;
  line-height: 16px;
  display: inline-block;
  font-size: 0;
  vertical-align: baseline;
}
.bottom > a {
  vertical-align: baseline;
  font-size: 16px;
  color: #6e6e6e;
  opacity: 0.66;
  left: 130px;
  text-decoration: none;
}
</style>