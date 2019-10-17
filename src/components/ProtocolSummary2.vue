<template>
  <div class="protocol-summary2">
    <div class="top">
      <div class="top-bottom">
          <div class="arrow">
            <div class="arrow-img" @click="back"></div>
            <div class="top-text">{{msg}}</div>
          </div>
      </div>
      <p class="left-text">大区</p>
      <p class="left-text2">片区经理</p>
      <p class="right-text2">状态</p>
      <p class="right-text">统计数</p>
    </div>
    <div class="content" >
      <div class="content-box"></div>
      <li v-for="card in cards" :key="card.id">
        <card3 :card="card"></card3>
      </li>
    </div>
  </div>
</template>

<script>
import card3 from './LittleCard3.vue'

export default {
  data() {
    return{
      msg: '2018网签资料卡执行汇总(按大区)',
      cards: [
        {
          area: '北京办事处',
          manager: '张老板',
          status: '订单部文员审核中',
          count: 55
        },
        {
          area: '韶关办事处',
          manager: '张老板',
          status: '初始状态',
          count: 52
        },
      ],
      counts:{
        a:55,
        b:53,
        c:25,
        d:53,
        e:68,
        f:33
      }
    }
  },
  components:{
    card3
  },
  mounted() {
    this.$http.post('/customerInfo/getCustomerInfo.do',{
      CID:'C15056'
    }).then(res => {
      console.log(res)
    })
  },
  methods: {
    back() {
      this.$router.push({
        path: '/customer'
      })
    }
  }
}
</script>

<style scoped>
  .protocol-summary2{
    position: relative;
    width: 375px;
    height: 100vh;
    background-color: #EFEFEF;
  }
  .content-box{
    width: 375px;
    height: 7px;
    background-color: #EFEFEF;
  }
  .content li{
    display: block;
  }
  .bottom-box{
    width: 375px;
    height: 20px;
    background-color: rgb(239, 239, 239);
  }
  p{
    margin: 0;
    display: inline-block;
  }
  .right-text2{
    font-size: 15px;
    color: #FFFFFF;
    position: absolute;
    bottom: 15px;
    display: inline-block;
    right: 123px;
  }
  .left-text2{
    font-size: 15px;
    color: #FFFFFF;
    position: absolute;
    bottom: 15px;
    display: inline-block;
    left: 103px;
  }
  .right-text{
    font-size: 15px;
    color: #FFFFFF;
    position: absolute;
    bottom: 15px;
    display: inline-block;
    right: 23px;
  }
  .left-text{
    font-size: 15px;
    color: #FFFFFF;
    position: absolute;
    bottom: 15px;
    display: inline-block;
    left: 41px;
  }
  .top{
    /* background: #363636; */
    width: 100%;
    height: 103px;
    top: 0;
    position: fixed;
    z-index: 20;
    background: -webkit-linear-gradient(left,#BEDD81,#87CA81);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16)
  }
  .top-bottom{
      width: 100%;
      height: 40px;
      position: absolute;
      bottom: 44px;
      /* bottom: -44px; */
  }
  .arrow{
      display: inline-block;
  }
  .arrow-img{
      background: url('http://14.29.221.109:10250/upload/assets/arrow.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      display: inline-block;
      width: 30px;
      height: 30px;
      z-index: 33;
      position: absolute;
      left: 10px;
      top: 5px;
      /* left: 17px;
      bottom: 16px; */
  }
  .top-text{
      display: inline-block;
      color: #F3FAFF;
      vertical-align: middle;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      text-align: center;
  }
  .content{
    position: absolute;
    width: 375px;
    top: 103px;
    background-color: #EFEFEF;
  }

</style>
