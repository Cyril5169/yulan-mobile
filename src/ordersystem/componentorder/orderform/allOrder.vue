<template>
  <h5 @click="checkAllOrder">全部订单</h5>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "",
    data() {
      return {

      }
    },
    methods:{
      checkAllOrder(){
        let allOderURL = "http://14.29.221.4:10250/yulan-order/order/getOrders.do";
        let data = {
          "limit":"10",//每页限制条数（必须）
          "page":"1",//页数，第几页（必须）
          "cid":"C10110",//登录的用户账号（必须）
          "state_id":"2",//订单状态（0--暂存、1（可传空串，空串表示全部状态） --提交、12-接收、2--受理、3--作废）
          "find":"W1607280081"//查找订单好，可模糊查找（可传空串，获取全部）

        }
        axios.post(allOderURL,data).then(
          (data) => {
            console.log(data.data.data);
            this.kcMsgs = data.data.data;
            // console.log(this.kcMsgs);
            //这里面axios的this不指向vue,所以在使用axios是最好使用es6箭头函数
          }
        )
      }
    }
  }
</script>

<style scoped>

  h5 {
    margin-top: 100px;
  }
</style>
