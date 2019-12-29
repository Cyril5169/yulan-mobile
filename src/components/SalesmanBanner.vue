<template>
  <div class="banner">
    <div class="option-img" @click="Sidebar"></div>
    <div class="app-name">玉兰B2B</div>
    <div class="salesman-name" >{{salesman}}({{ position }})</div>
    <div class="login-time"><span>登陆:</span><span class="time">{{logintime}}</span></div>
    <!-- <div class="suona-img"></div>
    <p class="notice">新通知</p> -->
    <div class="left-img"></div>
    <div class="right-img"></div>
  </div>
</template>

<script>
import Protocol from './Protocol'
// import sidebar from '../utils/move492.js'
import { bus } from '../utils/eventBus.js';
// import Salesman from './Salesman'

export default {
  name: 'Banner',
  data() {
    return{
    }
  },
  props:['IsSidebarOut'],
  mounted() {
      // this.$store.commit('increment',{aaa:'sss'})

    console.log(this.$store.state.info);

  },
  computed: {
    salesman() {
      return  this.$store.state.info.data.realName;
    },
    logintime() {
      return this.$store.state.info.logintime
    },
    position() {
      switch(this.$store.state.position){
        case 'SALEMAN_M' :
          return '办事处经理'
        case 'SALEMAN_S' :
          return '业务经理'
        case 'MANAGER':
          return '中心总经理'
        case 'VSMAPPROVEXII':
          return '销售总监'
        case 'MARKETCHECKER' :
          return '市场部'
        case 'BILLDEP_APPROVE' :
          return '订单部'
      }
    }
  },
  methods: {
    Sidebar() {
      console.log(this.IsSidebarOut);
      var salesman = document.getElementsByClassName('salesman')[0]
      // console.log(this.IsSidebarOut)
      if(this.IsSidebarOut == false){
        salesman.classList.remove('noactive-option');
        salesman.classList.add('active-option');

        setTimeout(() => {
          bus.$emit('sidebarout');
        },300)
      }
    },
  }
}
</script>

<style scoped>
  p{
    margin: 0;
  }
  .banner{
    width: 375px;
    height: 205px;
    position: relative;
    background-color: #EFEFEF;
  }
  .suona-img{
    background-image: url('../assets/suona2.png');
    width: 24px;
    height: 20px;
    background-size: contain;
    background-position: center;
    position: absolute;
    bottom: 45px;
    left: 27px;
  }
  .notice{
    font-size: 15px;
    color: #7D7D7D;
    position: absolute;
    bottom: 45px;
    left: 64px;
  }
  .option-img{
    background-image: url('../assets/setting.png');
    background-repeat: no-repeat;
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
  .app-name{
    font-size: 32px;
    color: #89CB81;
    position: absolute;
    top: 53px;
    left: 27px;
  }
  .salesman-name{
    font-size: 25px;
    color: #000000;
    position: absolute;
    z-index: 1000;
    left: 27px;
    top: 99px;
  }
  .login-time{
    font-size: 13px;
    color: #7D7D7D;
    position: absolute;
    top: 170px;
    left: 27px;
  }
  .right-img{
    background: url('../assets/right-img.png');
    /* background-position: center; */
    background-size: contain;
    width: 250px;
    height: 250px;
    position: absolute;
    right: -18px;
    top: -23px;
  }
  .left-img{
    background: url('../assets/left-img.png');
    /* background-position: center; */
    background-size: contain;
    width: 115px;
    height: 114px;
    position: absolute;
    left: -28px;
    top: 85px;
  }
</style>
