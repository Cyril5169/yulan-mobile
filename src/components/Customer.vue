<template>
  <div class="view">
    <div class="customer">
      <div class="sidebar">
        <div class="user-img"></div>
        <p class="customer-name">{{customer}}</p>
        <div class="quit-box" @click="unlogin">
          <div class="quit"></div>
          <p class="quit-p">退出登录</p>
        </div>
      </div>
      <section class="content" @click.stop="Sidebar">
        <CustomerBanner :IsSidebarOut="IsSidebarOut"></CustomerBanner>
        <div class="gnBlock">
          <div class="blockH">
            <div
              v-for="(item,index) in menuTreeList"
              v-if="item.MENU_LINK!='msgsearch' && item.MENU_LINK!='reviewedprotocol' && item.MENU_LINK!='showprotocol' && item.MENU_LINK!='reviseagreement'"
              :key="index"
              class="btn"
              @click="clickToPath(item.MENU_LINK)"
            >
              <div class="btn-img" :class="item.ICON_CLASS">
                <div
                  v-if="CUSTOMER_BALANCE_PERIOD_COUNT>0&&item.MENU_LINK=='billmanage'"
                  class="tips"
                >{{CUSTOMER_BALANCE_PERIOD_COUNT}}</div>
              </div>
              <p class="btn-p">{{item.MENU_NAME}}</p>
            </div>
            <!-- 网签菜单先这样处理，以后再想办法 -->
            <div class="btn" @click="clickToPath('msgsearch')" v-if="isContainAttr('msgsearch')">
              <div class="btn-img btn12-img"></div>
              <p class="btn-p">资料卡查询</p>
            </div>
            <div
              class="btn"
              @click="clickToPath('showprotocol')"
              v-if="isContainAttr('showprotocol') && position !='SALEMAN_S' && position !='SALEMAN_M'"
            >
              <div class="btn-img btn10-img"></div>
              <p class="btn-p">待审核协议</p>
            </div>
            <div
              class="btn"
              @click="clickToPath('reviewedprotocol')"
              v-if="isContainAttr('showprotocol') && position !='SALEMAN_S' && position !='SALEMAN_M'"
            >
              <div class="btn-img btn11-img"></div>
              <p class="btn-p">已审核协议</p>
            </div>
            <!-- <div
              class="btn"
              @click="clickToPath('reviseagreement')"
              v-if="isContainAttr('showprotocol') && (position =='SALEMAN_S' || position =='SALEMAN_M')"
            >
              <div class="btn-img btn13-img"></div>
              <p class="btn-p">待修改协议书</p>
            </div> -->
          </div>
        </div>
      </section>
      <navBottom :change-style="style" :tab-stage="myRoute"></navBottom>
    </div>
    <van-popup v-model="showStudyForm" class="study-form">
      <keep-alive>
        <StudyForm
          v-if="showStudyForm"
          @refresh="refreshStudy"
          :showClose="false"
          :title="studyFormTitle"
          :selectData="studySelectData"
        ></StudyForm>
      </keep-alive>
    </van-popup>
  </div>
</template>

<script>
import { bus } from "../utils/eventBus.js";
import CustomerBanner from "./CustomerBanner";
import navBottom from "@/components/navBottom";
import { Toast, Popup } from "vant";
import { QueryAppMenuByUserId } from "@/api/webMenuASP";
import {
  getCustomerMustWriteStudy,
  getGroupContextOption
} from "@/api/studyASP";
import StudyForm from "./StudyForm";

export default {
  data() {
    return {
      IsSidebarOut: false,
      style: "customer",
      myRoute: "customer",
      showStudyForm: false,
      studyFormTitle: "填写完此调查表，才能继续操作",
      CUSTOMER_BALANCE_PERIOD_COUNT: this.$store.state.tipsInfo
        ? this.$store.state.tipsInfo.CUSTOMER_BALANCE_PERIOD
        : 0
    };
  },
  components: {
    CustomerBanner,
    bus,
    navBottom,
    StudyForm,
    [Toast.name]: Toast,
    [Popup.name]: Popup
  },
  computed: {
    customer() {
      if (this.$store.state.info.data)
        return this.$store.state.info.data.realName;
    },
    menuTreeList() {
      return this.$store.state.menuTreeListFlatten.filter(
        item => item.MENU_TYPE == "appmenu"
      );
    },
    position() {
      if (this.$store.state.position) return this.$store.state.position;
    }
  },
  mounted() {},
  methods: {
    classObject(MENU_LINK) {
      var obj = {};
      if (MENU_LINK == "billmanage") {
        obj["reddot"] = true;
      }
      return obj;
    },
    //获得菜单数组并传入store ,await并不会阻塞主线程，这里并不起作用
    async getMenuTree() {
      //this.$store.commit("emptyMenuTreeList");
      await QueryAppMenuByUserId({
        userid: this.$store.state.info.data.userId
      })
        .then(res => {
          if (
            res.data.children.length > 0 &&
            res.data.children[0].children.length
          ) {
            //最顶层为app菜单
            this.$store.commit(
              "setMenuTreeList",
              res.data.children[0].children
            );
          } else {
            Toast({
              duration: 3000,
              message: "没有菜单权限，请联系管理员配置"
            });
          }
        })
        .catch(res => {
          Toast({
            duration: 3000,
            message: "无网络连接，请连网后使用"
          });
        });
    },
    isContainAttr(attr) {
      //是否包含权限
      return (
        this.$store.state.menuTreeListFlatten.filter(
          item => item.MENU_LINK == attr
        ).length > 0
      );
    },
    clickToPath(path) {
      if (!path) {
        Toast({
          duration: 2000,
          message: "功能正在完善，敬请期待"
        });
        return;
      }
      this.$router.push({
        path: "/" + path
      });
    },
    Sidebar() {
      // var customer = document.getElementsByClassName("customer")[0];
      // if (this.IsSidebarOut == true) {
      //   customer.classList.remove("active-option");
      //   customer.classList.add("noactive-option");
      //   setTimeout(() => {
      //     this.IsSidebarOut = false;
      //   }, 300);
      // }
    },
    unlogin() {
      this.$router.push({
        path: "/"
      });
    },
    getStudy() {
      getCustomerMustWriteStudy(this.$store.getters.getCId).then(res => {
        if (res.data.length > 0) {
          this.studySelectData = res.data[0];
          this.showStudyForm = true;
        }
      });
    },
    refreshStudy() {
      this.showStudyForm = false;
      this.getStudy();
    }
  },
  created() {
    page_customer = this;
    bus.$on("sidebarout", () => {
      this.IsSidebarOut = true;
    });
    this.getMenuTree(); //获得菜单权限树
    this.getStudy();
  },
  destroyed() {
    page_customer = null;
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
.reddot {
  width: 2.133vw;
  min-width: 0;
  height: 2.133vw;
  background-color: #ee0a24;
  border-radius: 100%;
  position: absolute;
  right: 5px;
  top: 5px;
}
.tips {
  padding: 0 3px;
  min-width: 10px;
  height: 17px;
  line-height: 17px;
  background-color: #ee0a24;
  color: #fff;
  border-radius: 100%;
  position: absolute;
  font-size: 11px;
  left: 22px;
  top: -3px;
}
.btn {
  height: 60px;
  line-height: 90px;
  width: 100px;
  margin: 0 11px 20px 0;
  background-color: #fff;
  position: relative;
  z-index: 100;
  border-radius: 7px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.btn-img {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 5px;
  left: 50%;
  margin-left: -15px;
  background-size: contain !important;
  background-position: center !important;
}
.btn1-img {
  background: url("../assets/form.png");
}
.btn2-img {
  background: url("../ordersystem/assetsorder/shopping.png");
}
.btn3-img {
  background: url("../ordersystem/assetsorder/dzd.png");
}
.btn4-img {
  background: url("../ordersystem/assetsorder/hkpz.png");
}
.btn5-img {
  background: url("../ordersystem/assetsorder/wtph.png");
}
.btn6-img {
  background: url("../ordersystem/assetsorder/thpc.png");
}
.btn7-img {
  background: url("../ordersystem/assetsorder/ljsj.png");
}
.btn8-img {
  background: url("../ordersystem/assetsorder/xxd.png");
}
.btn9-img {
  background: url("../ordersystem/assetsorder/shopping.png");
}
.btn10-img {
  background: url("../assets/read.png");
}
.btn11-img {
  background: url("../assets/form.png");
}
.btn12-img {
  background: url("../assets/same.png");
}
.btn13-img {
  background: url("../assets/news_hot.png");
}
.btn-p {
  margin: 0;
  color: #051d05;
  font-size: 13px;
  /*margin-left: 40px;*/
}
.view {
  height: 100vh;
  width: 375px;
  overflow: hidden;
}
.sidebar {
  width: 0px;
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
.customer {
  width: 375px;
  height: 100vh;
  right: 0;
  position: relative;
  background-color: #efefef;
  overflow-x: hidden;
  overflow-y: scroll;
  transition: margin-left 0.3s;
  -webkit-transition: margin-left 0.3s;
  -moz-transition: margin-left 0.3s; /* Firefox 4 */
  -o-transition: margin-left 0.3s; /* Opera */
}
.customer-name {
  font-size: 15px;
  color: #7d7d7d;
  margin: 0;
  margin-top: 14px;
  margin-bottom: 15px;
}
.customer::-webkit-scrollbar {
  display: none;
}
.content {
  width: 375px;
  margin-bottom: 60px;
  /* height: 100vh; */
  float: left;
  position: relative;
  z-index: 10;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
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
  /* border-bottom: 1px solid #D8D8D8; */
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
  /* width: 60px;
      height: 22px; */
  font-size: 15px;
  color: #7d7d7d;
  position: absolute;
  left: 85px;
}
.quit-p {
  margin: 0;
  /* width: 60px; */
  /* height: 21px; */
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
.active-option {
  margin-left: -200px;
}
.noactive-option {
  margin-left: 0px;
}
.gnBlock {
  position: relative;
}
.blockH {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding: 0 21px;
}
.study-form {
  height: 100%;
  width: 100%;
}
</style>