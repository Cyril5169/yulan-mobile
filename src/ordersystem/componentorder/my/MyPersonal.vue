<template>
  <div class="all-view">
    <div class="person-title">个人中心</div>
    <div class="all-item">
      <div class="user-img"></div>
      <p class="customer-name">{{customer}}</p>
      <div v-if="isContainAttr('mycoupon')" class="item" @click="clickToPath('mycoupon')">
        <img class="item-icon" src="../../assetsorder/mycoupon.png" alt />
        <span>我的优惠券</span>
        <img class="item-more" src="../../assetsorder/more.png" alt />
      </div>
      <div class="item" @click="clickToPath('studylist')">
        <img class="item-icon" src="../../assetsorder/studyform.png" alt />
        <span>我的调查表</span>
        <img class="item-more" src="../../assetsorder/more.png" alt />
      </div>
      <div class="item" @click="clickToPath('notificationlist')">
        <img class="item-icon" src="../../assetsorder/notification.png" alt />
        <span>最新公告</span>
        <img class="item-more" src="../../assetsorder/more.png" alt />
      </div>
      <div class="item" @click="checkVersion()">
        <img class="item-icon" src="../../assetsorder/version_update.png" alt />
        <span>检查新版本</span>
        <img class="item-more" src="../../assetsorder/more.png" alt />
      </div>
      <div class="item" @click="clickToPath('changepassword')">
        <img class="item-icon" src="../../assetsorder/change_password.png" alt />
        <span>修改密码</span>
        <img class="item-more" src="../../assetsorder/more.png" alt />
      </div>
      <div style="height:20px;"></div>
      <div class="item" style="text-align:center;" @click="logout()">
        <span style="margin:auto 0;">退出登录</span>
      </div>
    </div>
    <navBottom :tab-stage="myRoute"></navBottom>
  </div>
</template>

<script>
import top from "../../../components/Top";
import navBottom from "../../../components/navBottom";
import { Toast } from "vant";


export default {
  name: "",
  components: {
    top,
    navBottom
  },
  data() {
    return {
      set: 26,
      myRoute: "personal"
    };
  },
  computed: {
    customer() {
      if (this.$store.state.info.data)
        return this.$store.state.info.data.realName;
    }
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
      this.$router.push({
        name: path,//name不能忽略大小写
        params: {
          from: "mypersonal"
        }
      });
    },
    checkVersion() {
      if (!vm.plus) {
        Toast("调试模式，不能检查更新");
      } else {
        vm.UpdateVersion(true);
      }
    },
    changePassword(){

    },
    logout() {
      this.$router.push({
        path: "/"
      });
      this.$store.commit("initState");
    }
  }
};
</script>

<style scoped>
.all-view {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0px;
  background-color: #f8f8f8;
  overflow: scroll;
}
.person-title {
  height: 50px;
  line-height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  font-size: 15px;
  background: linear-gradient(to right, #bedd81, #87ca81);
  color: white;
}
.all-item {
  margin-top: 50px;
}
.item {
  position: relative;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #dedede;
  text-align: left;
  background: white;
}
.item-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 10px;
  top: 50%;
  margin-top: -10px;
}
.item-more {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 50%;
  margin-top: -10px;
}
.item span {
  font-size: 15px;
  margin-left: 40px;
}
.user-img {
  width: 73px;
  height: 73px;
  background-image: url("../../../assets/userImg.png");
  background-position: center;
  background-size: contain;
  position: relative;
  margin: 0 auto;
  margin-top: 55px;
}
.customer-name {
  font-size: 15px;
  color: #7d7d7d;
  margin: 0;
  margin-top: 14px;
  margin-bottom: 15px;
}
.quit-box {
  border-bottom: 1px solid #d8d8d8;
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
  background-image: url("../../../assets/quit.png");
  background-position: center;
  background-size: contain;
  position: absolute;
  top: 50%;
  margin-top: -11px;
  left: 52px;
}
</style>
