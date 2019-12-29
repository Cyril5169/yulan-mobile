<template>
  <div class="notice">
    <div class="dot"></div>
    <div class="text">{{notice.text}}</div>
    <div class="arrow"></div>
    <div class="date">发布日期: <span>{{notice.date}}</span></div>
  </div>
</template>

<script>
export default {
  props:['notice'],
}
</script>

<style scoped>
  .notice{
    width: 330px;
    height: 88px;
    background-color: #fff;
    position: relative;
    margin: 0 auto;
    margin-bottom: 20px;
    border-radius: 7px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
  }
  .dot{
    width: 10px;
    height: 10px;
    background-color: #E1E1E1;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .text{
    font-size: 15px;
    color: #000;
    position: relative;
    margin: 0 auto;
    top: 22px;
    text-align: left;
    max-width: 250px;
  }
  .date{
    font-size: 10px;
    color: #7D7D7D;
    position: absolute;
    bottom: 5px;
    right: 30px;
  }
  .arrow{
    background: url('../assets/right1.png');
    width: 14px;
    height: 14px;
    background-position: center;
    background-size: contain;
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -7px;
  }
</style>
