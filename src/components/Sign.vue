<template>
  <div class="sign" :style="{height:bodyHeight + 'px'}">
    <IDSel v-if="IsShow" @listen="listenShow" :pos="pos" :name="realName"></IDSel>
    <warn
      ref="warnBox"
      @listen="listenset"
      @reloadMsg="reloadMsg"
      :set="set"
      :msg="warnMsg"
      v-show="set"
    ></warn>
    <div class="signlogo"></div>
    <div class="signmessage">
      <div class="username">
        <div class="userlogo"></div>
        <input type="text" placeholder="用户名" v-model="name" />
      </div>
      <div class="password">
        <div class="passlogo"></div>
        <input type="password" placeholder="密码" v-model="password" @keyup.enter="normalsign()" />
      </div>
    </div>
    <div class="remember" hidden="1">
      <div style="position:relative;left:50px;">
        <input style="width:14px;height:14px;" type="checkbox" value v-model="rememberPassWord" />记住密码
      </div>
    </div>
    <div class="signbutton">
      <input type="button" class="normalsign" value="登录" @click="normalsign()" />
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
import warn from "@/components/passwordwarn";
import IDSel from "./IdSelection";

export default {
  data() {
    return {
      set: false,
      name: "",
      password: "",
      IsShow: false,
      pos: [],
      realName: "",
      bodyHeight: "",
      warnMsg: "账号或密码错误 ！",
      rememberPassWord: true,
      autoSign: true,
    };
  },
  beforeRouteEnter(to, from, next) {
    // ...
    // location.reload()
    // let that = this
    // if(from.path == "/customer"){
    //     if(window.apple == "apple"){
    //         location.replace("/");
    //     }
    //     else if(window.apple == "other"){
    //         history.go(0)
    //       location.replace("/");
    //     }
    // }
    // if(from.path == "/client"){
    //     if(window.apple == "apple"){
    //         location.replace("/");
    //     }
    //     else if(window.apple == "other"){
    //         history.go(0)
    //       location.replace("/");
    //     }
    // }
    next();
  },
  mounted() {
    if(this.$route.params && this.$route.params.autoSign != undefined){
      this.autoSign = this.$route.params.autoSign;
    }else{
      this.autoSign = true;
    }
    
    this.isai();
    this.$store.commit("initState");
    this.name = window.localStorage.getItem("username");
    this.password = window.localStorage.getItem("password");
    this.rememberPassWord = window.localStorage.getItem("rememberPassWord") == "true";
    if(this.autoSign){
      this.normalsign();
    }
  },
  methods: {
    normalsign() {
      if(!this.name || !this.password){ return;}
      let th = this;
      let year = new Date().getFullYear();
      this.$store.commit("getYear", year);
      this.$http
        .post(this.orderBaseUrl + "/web_user/login.do", {
          loginName: this.name.toUpperCase(),
          password: this.password,
          year: this.$store.state.year
        })
        .then(res => {
          var info = res.data;
          if (!info.data) {
            this.set = true;
            return;
          }
          if (info.data.stopped == 1) {
            this.warnMsg = "该账号已停用 ！";
            this.set = true;
            return;
          }
          this.realName = info.data.realName;
          // if (info.code == 0 && info.data.type != "ECWEB") {
          //   this.$store.commit("getPos", info.pos);
          //   this.$store.commit("loginSuccess", info);
          //   this.pos = this.$store.state.pos;
          //   if (this.pos.length == 1) {
          //     this.$store.commit("getposition", this.pos[0].position);
          //     this.$router.push({
          //       path: "/salesman"
          //     });
          //   } else if (this.pos.length > 1) {
          //     this.IsShow = true;
          //   }
          //   // if(this.$store.state.pos[0]){
          //   //   this.$store.state.pos[0].position
          //   // }
          //   // this.$router.push({
          //   //   path:'/salesman'
          //   // })
          // }
          // else if(info.code ==0&& info.data.type == 'ECWEB'){

          //   this.$store.commit('loginSuccess',info)

          //   this.IsShow = true;
          //   // this.$router.push({
          //   //   path:'/customer'
          //   // })
          // }
          if (info.code == 0) {
            this.$store.commit("getPos", info.pos);
            this.$store.commit("loginSuccess", info);
            if (this.rememberPassWord) {
              window.localStorage.setItem("username", this.name);
              window.localStorage.setItem("password", this.password);
            } else {
              window.localStorage.setItem("username", "");
              window.localStorage.setItem("password", "");
            }
            window.localStorage.setItem(
              "rememberPassWord",
              this.rememberPassWord
            );
            this.$router.push({
              path: "/customer"
            });
          } else if (info.code == 1) {
            this.set = true;
          }
        })
        .catch(err => {
          if(err.request.status == 0){
            this.warnMsg = "当前网络不可用";
            this.set = true;
          }else{
            this.warnMsg = err.message;
            this.set = true;
          }
        });
    },
    listenset(data) {
      this.set = data;
    },
    reloadMsg() {
      this.warnMsg = "账号或密码错误 ！";
    },
    listenShow(data) {
      this.IsShow = data;
    },
    isai() {
      //是否苹果
      var u = navigator.userAgent;
      if (u.indexOf("iPhone") > -1) {
        window.apple = "apple";
      } else {
        window.apple = "other";
      }
    }
  },
  watch: {
    bodyHeight() {
      return document.documentElement.clientHeight;
    }
  },
  components: {
    warn,
    IDSel
  }
};
</script>

<style scoped>
/* 玉兰logo */
.sign {
  width: 100vw;
  height: 100vh;
  background-color: #efefef;
  position: absolute;
  /* background-image: url('http://14.29.221.109:10250/upload/assets/sign2.png'); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  /* bottom: 0; */
}
.sign-box {
  /* height: 486px; */
  width: 288px;
  position: absolute;
  top: 51px;
  left: 50%;
  margin-left: -144px;
  /* background-color: #EFEFEF; */
  opacity: 1;
}
.signlogo {
  width: 186px;
  height: 61px;
  /* background-image: url(http://14.29.221.109:10250/upload/assets/yulan.png); */
  background-image: url(../assets/yulan.png);
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  left: 50%;
  top: 50px;
  margin-left: -93px;
}
/* 登录信息，用户填写 */
.signmessage {
  margin-top: 100px;
}
.signmessage input {
  display: inline-block;
  border-style: none;
  border-bottom: 1px solid #707070;
  width: 138px;
  height: 28px;
  margin-left: 2px;
  margin-top: 25px;
  padding-left: 10px;
  font-size: 13px;
  outline: none;
  background-color: #efefef;
}
.signmessage input::-webkit-input-placeholder {
  color: #a4a4a4;
}
.signmessage input:-moz-placeholder {
  color: #a4a4a4;
}
.signmessage input::-moz-placeholde {
  color: #a4a4a4;
}
.signmessage input:-ms-input-placeholder {
  color: #a4a4a4;
}
.passlogo,
.userlogo {
  display: inline-block;
  width: 25px;
  height: 25px;
  vertical-align: middle;
  margin-left: -18px;
  margin: 0;
  background-size: contain;
  background-repeat: no-repeat;
}
.userlogo {
  /* background-image: url(http://14.29.221.109:10250/upload/assets/userlogo.png); */
  background-image: url(../assets/userlogo.png);
}
.passlogo {
  /* background-image: url(http://14.29.221.109:10250/upload/assets/passlogo.png); */
  background-image: url(../assets/passlogo.png);
}
/* 登录按钮 */
.signbutton {
  position: relative;
  margin: 0 auto;
  margin-top: 30px;
}
.signbutton input {
  border-radius: 25px;
  text-align: center;
  width: 163px;
  height: 45px;
  border: 1px solid #a7d470;
  outline: none;
  font-size: 14px;
}
.normalsign {
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
  color: #ffffff;
}
.remember {
  margin-top: 10px;
}
</style>
