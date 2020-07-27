<template>
  <div class="wrap">
    <!-- <link rel="stylesheet" href="http://14.29.221.4:10250/upload/assets/swiper.css"> -->
    <top :top="set"></top>
    <!-- <file :file='num'></file> -->
    <file-msg :file="bannerIndex" :statusNum="numIndex"></file-msg>
    <div>
      <card1 class="showcard"></card1>
      <card2 class="showcard"></card2>
      <card3 class="showcard"></card3>
      <card4 class="showcard"></card4>
      <card5 class="showcard"></card5>
      <div class="swiper-pagination" slot="pagination"></div>
    </div>
    <div class="bottom">
      <div class="save1">
        <div @click="backcard">退回资料卡</div>
      </div>
      <div class="save2">
        <div @click="build">通过资料卡</div>
      </div>
    </div>
    <div class="foldwrap" v-show="show"></div>
    <div class="foldbox" v-show="show">
      <div class="box-top">
        <div class="warnimg"></div>
        <div class="warnmsg">
          <p>是否确定客户资料卡信息</p>
          <p>完整且无误？</p>
          <p>点击确定将通过对应客户</p>
          <p>资料卡。</p>
        </div>
      </div>
      <div class="box-bottom">
        <div class="sure" @click="sure">确定</div>
        <div class="cancel" @click="cancel">取消</div>
      </div>
      <input />
    </div>
    <div class="foldwrap" v-show="show2"></div>
    <div class="foldbox" v-show="show2">
      <div class="box-top">
        <div class="warnimg" id="warnimg2"></div>
        <div class="warnmsg" id="warnmsg2">
          <p>是否确定退回客户资料卡</p>
          <p>并重新填写？</p>
        </div>
      </div>
      <div class="box-bottom">
        <div class="sure" @click="sure2">确定</div>
        <div class="cancel" @click="cancel2">取消</div>
      </div>
    </div>
    <div class="foldwrap" v-show="show3"></div>
    <div class="foldbox" v-show="show3">
      <div class="box-top">
        <div class="close" @click="cancel3"></div>
        <div class="title">退回原因</div>
        <textarea v-model="reason" placeholder="请输入退回原因..." class="reason"></textarea>
        <!-- <div class="warnimg" id="warnimg2"></div>
                <div class="warnmsg" id="warnmsg2">
                    <p>是否确定退回客户资料卡</p>
                    <p>并重新填写？</p>
        </div>-->
      </div>
      <div class="box-bottom">
        <div class="sure" @click="sure3">退回</div>
        <div class="cancel" @click="cancel3">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "../components/Top";
import file from "../card/Files";
import card1 from "../card/Card1";
import card2 from "../card/Card2";
import card3 from "../card/Card3";
import card4 from "../card/Card4";
import card5 from "../card/Card5";
// import 'http://14.29.221.4:10250/upload/assets/swiper.css'

export default {
  data() {
    let self = this;
    return {
      bannerIndex: 0,
      show: false,
      show2: false,
      show3: false,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        on: {
          slideChangeTransitionEnd: function() {
            self.bannerIndex = this.activeIndex;
          }
        }
      },
      reason: "",
      set: 8,
      numIndex: 0
    };
  },
  mounted() {
    var showcard = document.getElementsByTagName("input");
    console.log(showcard.length);
    // var showcard2 = document.getElementsByName('invoice');
    // console.log(showcard2.length)
    for (let i = 0; i < showcard.length; i++) {
      showcard[i].disabled = "disabled";
    }
    // for(let i = 0;i < showcard2.length;i++){
    //     showcard2[i].disabled = true;
    // }
    // showcard.forEach(function(value,index,arr){
    //     value.disabled = 'disabled';
    // })
  },
  methods: {
    sure() {},
    cancel() {
      this.show = false;
    },
    build() {
      this.show = true;
      this.$router.push({
        path: "/crAgreement"
      });
    },
    backcard() {
      this.show2 = true;
    },
    sure2() {
      this.show2 = false;
      this.show3 = true;
    },
    cancel2() {
      this.show2 = false;
    },
    sure3() {
      this.$http
        .post("/infoState/bussinessCheckCustomerInfoCard.do", {
          //客户代码S
          cid: this.$store.state.CCID,
          //操作后资料卡状态
          state: "CUSTOMERPORCESSING2",
          //审核记录
          memo: ";" + this.reason
        })
        .then(function(res) {
          console.log(1);
        });
      // this.$router.push({
      //   path:"/cardquery"
      // })
      // this.reload();
    },
    cancel3() {
      this.show3 = false;
    }
  },
  components: {
    top,
    card1,
    card2,
    card3,
    card4,
    card5,
    "file-msg": file
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.wrap {
  height: 100vh;
  background: #efefef;
}
.swiper-container {
  width: 100%;
  height: 440px;
  background: #efefef;
}
.bottom {
  height: 76px;
  width: 100%;
  background: #efefef;
}
.save1 div {
  box-sizing: border-box;
  line-height: 52px;
  width: 146px;
  height: 52px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: #4b4b4b;
  float: left;
  margin: 13px auto 11px 27px;
}
.save2 div {
  box-sizing: border-box;
  width: 146px;
  line-height: 52px;
  height: 52px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
  float: left;
  margin: 13px auto 11px 35px;
}
.foldwrap {
  width: 100%;
  height: 1000px;
  position: fixed;
  top: 0;
  background: rgba(54, 54, 54, 0.4);
  z-index: 30;
}
.foldbox {
  width: 286px;
  height: 268px;
  background: #ffffff;
  position: fixed;
  top: 199px;
  z-index: 40;
  border-radius: 10px;
  left: 45px;
}
.box-top {
  height: 220px;
  width: 100%;
}
.warnimg {
  background-image: url("../assets/warn.png");
  width: 65px;
  height: 65px;
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  top: 28px;
  display: inline-block;
}
.warnmsg {
  position: relative;
  top: 35px;
  padding-left: 40px;
  padding-right: 40px;
  letter-spacing: 2px;
}
.warnmsg p {
  margin: 0;
  line-height: 22px;
  font-family: "PingFang-Regular", sans-serif;
  font-size: 15px;
  color: #7d7d7d;
}
.box-bottom {
  height: 48px;
  width: 100%;
  font-size: 0;
}
.sure,
.cancel {
  width: 50%;
  height: 100%;
  line-height: 48px;
  display: inline-block;
  font-size: 18px;
  background: #f2f2f2;
  color: #7d7d7d;
}
.sure {
  border-radius: 0 0 0 10px;
  background: #363636;
  color: rgba(255, 255, 255, 1);
}
.cancel {
  border-radius: 0 0 10px 0;
}
#warnimg2 {
  top: 48px;
}
#warnmsg2 {
  top: 65px;
}
.close {
  background: url(../assets/close.png);
  background-size: contain;
  background-repeat: no-repeat;
  width: 15px;
  height: 15px;
  position: absolute;
  right: 11px;
  top: 9.5px;
}
.title {
  font-size: 15px;
  padding-top: 17px;
  text-align: left;
  color: #000000;
  padding-left: 32px;
}
.reason {
  width: 236px;
  height: 145px;
  margin-top: 5px;
  border-radius: 10px;
  border: 1px solid #b1b1b1;
  padding: 5px;
}
.reason::placeholder {
  font-size: 13px;
  color: #b1b1b1;
  padding-left: 8px;
}
</style>