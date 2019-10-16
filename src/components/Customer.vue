<template>
  <div class="view">
    <div class="customer">
      <div class="sidebar">
        <div class="user-img"></div>
        <p class="customer-name">{{customer}}</p>
        <!-- <div class="history-box">
            <div class="history"></div><p class="history-p">历年经销协议书</p>
        </div>-->
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
              :key="index"
              class="btn"
              @click="clickToPath(item.MENU_LINK)"
            >
              <div class="btn-img" :class="item.ICON_CLASS"></div>
              <p class="btn-p">{{item.MENU_NAME}}</p>
            </div>
          </div>
        </div>
      </section>
      <navBottom :change-style="style"></navBottom>
    </div>
    <van-popup v-model="showStudyForm" class="study-form">
      <StudyForm></StudyForm>
    </van-popup>
  </div>
</template>

<script>
import { bus } from "../utils/eventBus.js";
import CustomerBanner from "./CustomerBanner";
import navBottom from "@/components/navBottom";
import { Toast, Popup } from "vant";
import { QueryAppMenuByUserId } from "@/api/webMenuASP";
import { getCustomerMustWriteStudy, getGroupContextOption } from "@/api/studyASP";
import StudyForm from './StudyForm'

export default {
  data() {
    return {
      IsSidebarOut: false,
      style: "customer",
      showStudyForm: false,
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
    }
  },
  mounted() {
    getCustomerMustWriteStudy(this.$store.getters.getCId).then((res) => {
      if (res.data.length > 0) {
        //this.showStudyForm = true;
      }
      getGroupContextOption(res.data[0].SID).then((res)=>{

      }).catch((err)=>{

      });
    }).catch((err) => {
    })
  },
  methods: {
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
    }
  },
  created() {
    bus.$on("sidebarout", () => {
      this.IsSidebarOut = true;
    });
    this.getMenuTree(); //获得菜单权限树
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
