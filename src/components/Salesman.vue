<template>
  <div class="view">
    <div class="salesman">
      <div class="sidebar">
          <div class="user-img"></div>
          <p class="salesman-name">{{salesman}}</p>
          <!-- <div class="history-box">
            <div class="history"></div><p class="history-p">历年经销协议书</p>
          </div>
          <div class="revise-load-box">
            <div class="revise-load"></div><p class="revise-load-p">修改登陆密码</p>
          </div>
          <div class="revise-bill-box">
            <div class="revise-bill"></div><p class="revise-bill-p">修改对账密码</p>
          </div>
          <div class="about-box">
            <div class="about"></div><p class="about-p">关于APP</p>

          </div> -->
          <div class="quit-box" @click="unlogin">
            <div class="quit"></div><p class="quit-p">退出登录</p>
          </div>
      </div>
    <section class="btn3-box"  @click.stop="noblur1">
      <div class="btn3">
        <div class="btn3-img"></div>
        <p class="btn3-p1">资料卡</p>
        <p class="btn3-p2">执行汇总</p>
      </div>
      <div class="btn3-option1" @click="toprotocolsummary">
        <div class="btn3-option1-text">2018网签资料卡执行汇总</div>
      </div>

      <div class="btn3-option2" @click="toprotocolsummary2">
        <div class="btn3-option2-text">2018网签资料卡执行汇总(按大区)</div>
      </div>
    </section>

    <section class="btn4-box" @click.stop="noblur2">
      <div class="btn4">
        <div class="btn4-img"></div>
        <p class="btn4-p1">协议</p>
        <p class="btn4-p2">执行汇总</p>
      </div>
      <div class="btn4-option1" @click="tocardsummary">
        <div class="btn4-option1-text">2018协议网签执行汇总</div>
      </div>

      <div class="btn4-option2" @click="tocardsummary2">
        <div class="btn4-option2-text">2018协议网签执行汇总(按大区)</div>
      </div>
    </section>

      <section class="content" @click.stop="Sidebar">
        <SalesmanBanner :IsSidebarOut='IsSidebarOut'></SalesmanBanner>
          <div class="btn1" @click="toShowProtocl" v-if="!IsSaleman">
            <div class="btn1-img"></div>
            <p class="btn1-p">待审核协议</p>
          </div>
          <div class="btn2" @click="toReviewedProtocol" v-if="!IsSaleman">
            <div class="btn2-img"></div>
            <p class="btn2-p">已审核协议</p>
          </div>
          <!-- <div class="btn3" @click="blur1">
            <div class="btn3-img"></div>
            <p class="btn3-p1">资料卡</p>
            <p class="btn3-p2">执行汇总</p>
          </div>
          <div class="btn4" @click="blur2">
            <div class="btn4-img"></div>
            <p class="btn4-p1">协议</p>
            <p class="btn4-p2">执行汇总</p>
          </div> -->
          <div class="btn5" @click="toMsgsearch">
            <div class="btn5-img"></div>
            <p class="btn5-p">资料卡查询</p>
          </div>
          <div class="btn6" @click="toAgreement" v-if="IsSaleman">
            <div class="btn6-img"></div>
            <p class="btn6-p">待修改协议书</p>
          </div>
      </section>
    </div>
  </div>
</template>

<script>
import {bus} from '../utils/eventBus.js'
import SalesmanBanner from './SalesmanBanner'

export default {
  data() {
    return{
      IsSidebarOut: false,
    }
  },
  components: {
    SalesmanBanner,
    bus
  },
  mounted(){
        //用于资料卡查询获取地区，用于清除缓存bug
        this.$http.post('/customerInfo/getNcustomerinfo.do',{
            "year":this.$store.state.year,
            "limit": "10",
            "page": "1",
            "state":"",
            "cid":this.$store.state.info.data.loginName,
            "find":"",
            "area_1":'',
            "area_2":'',
            "position":this.$store.state.position,
            "ylcstate":'',
            "legalchecked":""
        }).then( res =>{
            console.log(res.data.area);
            this.$store.commit("getarea_M",res.data.area)
            console.log(this.$store.state.area_M)
        }).catch(function(res){
            console.log(res);
        });
  },
  computed: {
    salesman() {
      return this.$store.state.info.data.realName;
    },
    IsSaleman() {
      return (this.$store.state.position == "SALEMAN_S" || this.$store.state.position == "SALEMAN_M")
    },
    // position() {
    //   return this.$store.state.position
    // }
  },
  methods: {
    Sidebar() {
      var salesman = document.getElementsByClassName('salesman')[0]

      if(this.IsSidebarOut == true){
        salesman.classList.remove('active-option');
        salesman.classList.add('noactive-option');
        setTimeout(() => {
          this.IsSidebarOut = false;
        },300)
      }
    },
    unlogin() {
      this.$router.push({
        path: '/'
      })
    },
    toShowProtocl() {
      this.$router.push({
        path:'/showprotocol'
      })
    },
    toReviewedProtocol(){
      this.$router.push({
        path:'/reviewedprotocol'
      })
    },
    toMsgsearch() {
      this.$router.push({
        path:'/msgsearch'
      })
    },
    blur1() {
      let content = document.getElementsByClassName('content')[0];
      let btn3 = document.getElementsByClassName('btn3-box')[0];
      content.style.filter = "blur(1px)";
      btn3.style.display = "block";
    },
    noblur1() {
      let content = document.getElementsByClassName('content')[0];
      let btn3 = document.getElementsByClassName('btn3-box')[0];
      content.style.filter = "none";
      btn3.style.display = "none";
    },
    blur2() {
      let content = document.getElementsByClassName('content')[0];
      let btn4 = document.getElementsByClassName('btn4-box')[0];

      content.style.filter = "blur(1px)";
      btn4.style.display = "block";

    },
    noblur2() {
      let content = document.getElementsByClassName('content')[0];
      let btn4 = document.getElementsByClassName('btn4-box')[0];
      content.style.filter = "none";
      btn4.style.display = "none";
    },
    toprotocolsummary() {
      this.$router.push({
        path: '/protocolsummary'
      })
    },
    toprotocolsummary2() {
      this.$router.push({
        path: '/protocolsummary2'
      })
    },
    tocardsummary() {
      this.$router.push({
        path: '/cardsummary'
      })
    },
    tocardsummary2() {
      this.$router.push({
        path: '/cardsummary2'
      })
    },
    toAgreement() {
      this.$router.push({
        path:'/reviseagreement'
      })
    }
  },
  created() {
    bus.$on('sidebarout',() => {
      this.IsSidebarOut = true;
    })
  }
}
</script>

<style scoped>
  p{
    margin: 0;
  }
  *{
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  }
  .btn1{
    height: 88px;
    line-height: 88px;
    width: 164px;
    background-color: #fff;
    position: relative;
    z-index: 100;
    /* top: 200px; */
    /* left: 15px; */
    margin-left: 15px;
    border-radius: 7px;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
  }
  .btn1-img{
    background: url('../assets/read.png');
    width: 30px;
    height: 30px;
    background-size: contain;
    background-position: center;
    position: absolute;
    top: 50%;
    margin-top: -15px;
    left: 26px;
  }
  .btn1-p{
    margin: 0;
    color: #051D05;
    font-size: 15px;
    margin-left: 33px;
  }
  .btn2{
    height: 88px;
    line-height: 88px;
    width: 164px;
    background-color: #fff;
    position: relative;
    z-index: 100;
    /* top: 200px;
    right: 15px; */
    margin-left: 15px;
    border-radius: 7px;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
  }
  .btn2-img{
    background: url('../assets/form.png');
    width: 30px;
    height: 30px;
    background-size: contain;
    background-position: center;
    position: absolute;
    top: 50%;
    margin-top: -15px;
    left: 26px;
  }
  .btn2-p{
    color: #051D05;
    font-size: 15px;
    margin-left: 33px;
  }
  .btn3-box{
    width: 375px;
    height: 100vh;
    display: none;
    position: absolute;
    z-index: 1000;
  }
  .btn3-option1{
    width: 213px;
    height: 46px;
    line-height: 46px;
    background-color: #B1B1B1;
    border-radius: 7px;
    position: absolute;
    top: 402px;
    left: 15px;
  }
  .btn3-option1-text{
    font-size: 13px;
    color: #FFFFFF;
  }
  .btn3-option2{
    width: 213px;
    height: 46px;
    line-height: 46px;
    background-color: #B1B1B1;
    border-radius: 7px;
    position: absolute;
    top: 453px;
    left: 15px;
  }
  .btn3-option2-text{
    font-size: 13px;
    color: #FFFFFF;
  }
  .btn3{
    height: 88px;
    line-height: 20px;
    width: 164px;
    background-color: #fff;
    position: absolute;
    z-index: 1000;
    top: 304px;
    left: 15px;
    border-radius: 7px;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
  }
  .btn3-img{
    background: url('../assets/address_book.png');
    width: 30px;
    height: 30px;
    background-size: contain;
    background-position: center;
    position: absolute;
    top: 50%;
    margin-top: -15px;
    left: 26px;
  }
  .btn3-p1{
    color: #051D05;
    font-size: 15px;
    margin-left: 68px;
    margin-top: 25px;
    text-align:left;
    /* width: 60px; */
  }
  .btn3-p2{
    color: #051D05;
    font-size: 15px;
    margin-left: 68px;
    text-align:left;
    /* width: 60px; */
  }
  .btn4{
    height: 88px;
    line-height: 20px;
    width: 164px;
    background-color: #fff;
    position: absolute;
    z-index: 100;
    top: 304px;
    right: 15px;
    border-radius: 7px;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
  }
  .btn4-box{
    width: 375px;
    height: 100vh;
    display: none;
    position: absolute;
    z-index: 1000;
  }
  .btn4-option1{
    width: 213px;
    height: 46px;
    line-height: 46px;
    background-color: #B1B1B1;
    border-radius: 7px;
    position: absolute;
    top: 402px;
    right: 15px;
  }
  .btn4-option1-text{
    font-size: 13px;
    color: #FFFFFF;
  }
  .btn4-option2{
    width: 213px;
    height: 46px;
    line-height: 46px;
    background-color: #B1B1B1;
    border-radius: 7px;
    position: absolute;
    top: 453px;
    right: 15px;
  }
  .btn4-option2-text{
    font-size: 13px;
    color: #FFFFFF;
  }
  .btn4-img{
    background: url('../assets/news_hot.png');
    width: 30px;
    height: 30px;
    background-size: contain;
    background-position: center;
    position: absolute;
    top: 50%;
    margin-top: -15px;
    left: 26px;
  }
  .btn4-p1{
    color: #051D05;
    font-size: 15px;
    margin-left: 68px;
    margin-top: 25px;
    text-align:left;
    /* width: 60px; */
  }
  .btn4-p2{
    color: #051D05;
    font-size: 15px;
    margin-left: 68px;
    text-align:left;
    /* width: 60px; */
  }
  .btn5{
    height: 88px;
    line-height: 88px;
    width: 164px;
    background-color: #fff;
    position: relative;
    z-index: 100;
    /* top: 304px;
    left: 15px; */
    margin-top: 15px;
    margin-left: 15px;
    border-radius: 7px;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
  }
  .btn5-img{
    background: url('../assets/same.png');
    width: 30px;
    height: 30px;
    background-size: contain;
    background-position: center;
    position: absolute;
    top: 50%;
    margin-top: -15px;
    left: 26px;
  }
  .btn5-p{
    color: #051D05;
    font-size: 15px;
    margin-left: 33px;
  }
  .btn6{
    height: 88px;
    line-height: 88px;
    width: 164px;
    background-color: #fff;
    position: relative;
    z-index: 100;
    /* top: 304px;
    left: 15px; */
    margin-top: 15px;
    margin-left: 15px;
    border-radius: 7px;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
  }
  .btn6-img{
    background: url('../assets/news_hot.png');
    width: 30px;
    height: 30px;
    background-size: contain;
    background-position: center;
    position: absolute;
    top: 50%;
    margin-top: -15px;
    left: 26px;
  }
  .btn6-p{
    color: #051D05;
    font-size: 15px;
    margin-left: 33px;
  }
  .view{
    height: 100vh;
    width: 375px;
    overflow: hidden;
  }
  .sidebar{
    width: 200px;
    height: 100vh;
    position: relative;

    float: right;
    background-color: #EFEFEF;
  }
  .user-img{
    width: 70px;
    height: 70px;
    background-image: url('../assets/userImg.png');
    background-position: center;
    background-size: contain;
    position: relative;
    margin: 0 auto;
    margin-top: 52px;
  }
  .salesman-name{
    font-size: 15px;
    color: #7D7D7D;
    margin: 0;
    margin-top: 14px;
    margin-bottom: 15px;
  }
  .line{
    width: 100%;
    height: 1px;
    background-color: #D8D8D8;
    margin-bottom: 52px;
  }
  .history-box,
  .about-box,
  .quit-box,
  .revise-load-box,
  .revise-bill-box{
    height: 52px;
    line-height: 52px;
    width: 100%;
    font-size: 15px;
    color: #7D7D7D;
    border-top: 1px solid #D8D8D8;
    /* border-bottom: 1px solid #D8D8D8; */
    position: relative;
    box-sizing: border-box;
  }
  .quit-box{
    border-bottom: 1px solid #D8D8D8;
  }
  .history{
    width: 21px;
    height: 24px;
    background-image: url('../assets/aggrement2.png');
    background-position: center;
    background-size: contain;
    position: absolute;
    top: 50%;
    margin-top: -11px;
    left: 36px;
  }
  .history-p{
    position: absolute;
    left: 65px;
  }
  .about{
    width: 22px;
    height: 22px;
    background-image: url('../assets/about.png');
    background-position: center;
    background-size: contain;
    position: absolute;
    top: 50%;
    margin-top: -11px;
    left: 55px;
  }
  .revise-load{
    width: 22px;
    height: 22px;
    background-image: url('../assets/unlock.png');
    background-position: center;
    background-size: contain;
    position: absolute;
    top: 50%;
    margin-top: -11px;
    left: 43px;
  }
  .revise-bill-p{
    position: absolute;
    left: 72px;
  }
  .revise-load-p{
    position: absolute;
    left: 72px;
  }
  .revise-bill{
    width: 22px;
    height: 22px;
    background-image: url('../assets/edit.png');
    background-position: center;
    background-size: contain;
    position: absolute;
    top: 50%;
    margin-top: -11px;
    left: 43px;
  }
  .about-p{
    margin: 0;
    /* width: 60px;
    height: 22px; */
    font-size: 15px;
    color: #7D7D7D;
    position: absolute;
    left: 85px;
  }
  .quit-p{
    margin: 0;
    /* width: 60px; */
    /* height: 21px; */
    font-size: 15px;
    color: #7D7D7D;
    position: absolute;
    left: 82px;
  }
  .quit{
    width: 22px;
    height: 22px;
    background-image: url('../assets/quit.png');
    background-position: center;
    background-size: contain;
    position: absolute;
    top: 50%;
    margin-top: -11px;
    left: 52px;
  }
  .salesman{
    width: 575px;
    height: 100vh;
    right: 0;
    position: relative;
    background-color: #EFEFEF;
    overflow: hidden;
    transition: margin-left .3s ;
    -webkit-transition: margin-left .3s  ;
    -moz-transition:margin-left .3s ; /* Firefox 4 */
    -o-transition: margin-left .3s ; /* Opera */
  }
  /* .slide-fade-enter-active {
    transition: all .3s ease;
} */
  .active-option{
   margin-left: -200px;
  }
  .noactive-option{
   margin-left: 0px;
  }
  .salesman::-webkit-scrollbar{
    display: none;
  }
  .content{
    width: 375px;
    /* height: 100vh; */
    display: inline-block;
    height: 100vh;
    /* float: left; */
    text-align: left;
    position: relative;
    top: 0;
    z-index: 10;
    font-size: 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .content div {
    font-size: 0;
    display: inline-block;
    text-align: center;
  }
</style>

