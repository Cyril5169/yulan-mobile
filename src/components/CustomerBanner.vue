<template>
  <div class="banner">
    <!-- <div class="option-img" ref="option" @click="Sidebar"></div> -->
    <div class="app-name">玉兰B2B</div>
    <div class="customer-name">{{customer}}</div>
    <div class="login-time">
      <span>登陆:</span>
      <span class="time">{{logintime}}</span>
    </div>
    <div class="announce" v-show="newAnounces.length > 0">
      <van-notice-bar left-icon="volume-o" color="#1989fa" background="transparent" @click="toAnnouncement">{{noticeTitle}}</van-notice-bar>
    </div>

    <div class="left-img"></div>
    <div class="right-img"></div>
  </div>
</template>

<script>
import Protocol from "./Protocol";
// import sidebar from '../utils/move492.js'
import { bus } from "../utils/eventBus.js";
import { Icon, NoticeBar } from 'vant';
import { getNewNotification } from "@/api/notificationASP";


export default {
  name: "Banner",
  components: {
    [Icon.name]: Icon,
    [NoticeBar.name]: NoticeBar,
  },
  data() {
    return {
      newAnounces: [],
      noticeTitle: '',
      timer: null,
      currentNoticeIndex: 0,
      currentNotice: null,
    };
  },
  props: ["IsSidebarOut"],
  computed: {
    customer() {
      if (this.$store.state.info.data)
        return this.$store.state.info.data.realName;
    },
    logintime() {
      return this.$store.state.info.logintime;
    }
  },
  mounted() {
    if (this.$store.state.info.data.realName.length >= 7) {
      document.getElementsByClassName("customer-name")[0].style.fontSize =
        "12px";
      document.getElementsByClassName("customer-name")[1].style.fontSize =
        "18px";
    } else {
      document.getElementsByClassName("customer-name")[0].style.fontSize =
        "15px";
      document.getElementsByClassName("customer-name")[1].style.fontSize =
        "25px";
    }
    if (this.$store.state.info.data.realName.length >= 10) {
      document.getElementsByClassName("customer-name")[0].style.fontSize =
        "8px";
      document.getElementsByClassName("customer-name")[1].style.fontSize =
        "16px";
    }

    getNewNotification({ cid: this.$store.getters.getCId }).then((res) => {
      var _this = this;
      this.newAnounces = [];
      for (let i = 0; i < res.data.length; i++) {
        this.newAnounces.push(res.data[i]);
      }
      if (this.newAnounces.length > 0) {
        _this.currentNotice = _this.newAnounces[0];
        this.noticeTitle = this.newAnounces[0].TITLE;
        if (this.newAnounces.length > 1) {
          if (this.timer == null) {
            this.timer = setInterval(function () {
              if (_this.currentNoticeIndex + 1 >= _this.newAnounces.length) {
                _this.currentNoticeIndex = 0;
              } else {
                _this.currentNoticeIndex++;
              }
              _this.currentNotice = _this.newAnounces[_this.currentNoticeIndex];
              _this.noticeTitle = _this.newAnounces[_this.currentNoticeIndex].TITLE;

            }, 5000);
          }
        }
      }
      if (this.newAnounces.length < 2) {
        if (this.timer != null) {
          clearInterval(this.timer);
        }
      }

    }).catch((err) => {
    })
  },

  methods: {
    Sidebar() {
      console.log(this.IsSidebarOut);
      var customer = document.getElementsByClassName("customer")[0];
      // console.log(this.IsSidebarOut)
      if (this.IsSidebarOut == false) {
        customer.classList.remove("noactive-option");
        customer.classList.add("active-option");
        setTimeout(() => {
          bus.$emit("sidebarout");
        }, 300);
      }
    },
    toAnnouncement() {
      this.$router.push({
        name: "notificationlist",
        params: {
          showNotification: true,
          CONTENT: this.currentNotice.CONTENT,
          TITLE: this.currentNotice.TITLE,
          from: 'customer',
        }
      });
    }
  }
};
</script>

<style scoped>
p {
  margin: 0;
}
.banner {
  width: 375px;
  height: 225px; /*205*/
  position: relative;
  background-color: #efefef;
}
.option-img {
  background-image: url("../assets/setting.png");
  width: 24px;
  height: 24px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 3;
  top: 43px;
  left: 321px;
}
.app-name {
  font-size: 32px;
  color: #89cb81;
  position: absolute;
  top: 53px;
  left: 27px;
}
.customer-name {
  font-size: 25px;
  color: #000000;
  position: absolute;
  z-index: 1000;
  left: 27px;
  top: 115px;
  text-align: left;
}
.login-time {
  font-size: 13px;
  color: #7d7d7d;
  position: absolute;
  top: 160px;
  left: 27px;
}
.right-img {
  background: url("../assets/right-img.png");
  /* background-position: center; */
  background-size: contain;
  width: 250px;
  height: 250px;
  position: absolute;
  right: -18px;
  top: -23px;
}
.left-img {
  background: url("../assets/left-img.png");
  /* background-position: center; */
  background-size: contain;
  width: 115px;
  height: 114px;
  position: absolute;
  left: -28px;
  top: 85px;
}
.suona-img {
  background: url("../assets/suona2.png") no-repeat;
  width: 20px;
  height: 16px;
  background-size: contain;
  background-position: center;
  position: absolute;
  top: 190px;
  left: 27px;
}
.announce {
  position: absolute;
  z-index: 1000;
  top: 180px;
  left: 13px;
  right: 25px;
  text-align: left;
}
</style>
