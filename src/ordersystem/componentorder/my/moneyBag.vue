<template>
  <div>
    <top :from="from" msgtitle="我的钱包"></top>
    <div class="content">
      <div class="main">
        <div class="money"></div>
        <span style="font-size:16px;color:#fff">余额</span>
        <span style="font-size:15px;color:#eee" v-if="showPrice">￥{{money}}</span>
        <span style="font-size:15px;color:#eee" v-else>￥***</span>
      </div>
    </div>
  </div>
</template>

<script>
import top from "../../../components/Top";
import { Popup, Toast } from "vant";
import axios from "axios";
import { getUseRecord, getTotalRecordSum } from "@/api/orderListASP";

export default {
  name: "",
  components: {
    top,
    [Popup.name]: Popup,
    [Toast.name]: Toast
  },
  data() {
    return {
      from: "mypersonal",
      money: 0,
      showPrice: this.$store.getters.getIsManage != "0"
    };
  },
  methods: {

  },
  created() {
    let monUrl = this.orderBaseUrl + "/order/getResidemoney.do";
      let mondata = {
        cid: this.$store.getters.getCId,
        companyId: this.$store.getters.getCMId //登录客户号
      };
      axios.post(monUrl, mondata).then(async val => {
        this.money = val.data.data;
      });
  }
};
</script>

<style scoped>
.content {
  position: fixed;
  top: 50px;
  bottom: 0;
  width: 100%;
  background-color: #f8f8f8;
}
.main{
  position: relative;
  margin: 10px;
  height: 30%;
  background-color:#3cc030;
  border-radius: 5px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  flex-direction: column;
}
.money{
  background-image: url("../../assetsorder/money-bag-w.png");
  background-repeat: no-repeat;
  background-size: 50px;
  height: 50px;
  width: 50px;
}
</style>
