<template>
  <div class="protocol-summary">
    <div class="top">
      <div class="top-bottom">
          <div class="arrow">
            <div class="arrow-img" @click="back"></div>
            <div class="top-text">{{msg}}</div>
          </div>
      </div>
      <p class="left-text">协议状态</p>
      <p class="right-text">统计数</p>
    </div>

    <div class="content">
      <div class="item-box top-item" >
        <div class="item">已通过</div>
        <div class="count">{{counts.a}}</div>
      </div>

      <div class="item-box">
        <div class="item">销售中心经理确认中</div>
        <div class="count">{{counts.b}}</div>
      </div>

      <div class="item-box">
        <div class="item">客户查看确认中</div>
        <div class="count">{{counts.c}}</div>
      </div>

      <div class="item-box">
        <div class="item">业务员填写中</div>
        <div class="count">{{counts.d}}</div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      msg: '2018协议网签执行汇总',
      counts:{
        a:55,
        b:53,
        c:25,
        d:53
      }
    }
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
  .protocol-summary{
    position: relative;
    width: 375px;
    height: 100vh;
    background-color: #EFEFEF;
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
  .right-text{
    font-size: 15px;
    color: #FFFFFF;
    position: absolute;
    bottom: 15px;
    display: inline-block;
    right: 80px;
  }
  .left-text{
    font-size: 15px;
    color: #FFFFFF;
    position: absolute;
    bottom: 15px;
    display: inline-block;
    left: 75px;
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
  .item-box{
    height: 37px;
    position: relative;
    margin-top: 9px;
  }
  .top-item{
    margin-top: 14px;
  }
  .item{
    display: inline-block;
    position: absolute;
    font-size: 15px;
    width: 165px;
    height: 37px;
    line-height: 37px;
    background-color: #fff;
    color: #000;
    border-radius: 7px 0 0 7px;
    margin-right: 2px;
    left: 21px;
  }
  .count{
    display: inline-block;
    position: absolute;
    font-size: 15px;
    width: 165px;
    height: 37px;
    line-height: 37px;
    background-color: #fff;
    color: #000;
    border-radius: 0 7px 7px 0;
    right: 21px;
  }
</style>
