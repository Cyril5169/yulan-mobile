<template>
  <div class="lanju-details">
    <top :top="set"></top>
    <span class="lanju-details-state">{{checkTable.STATUS|statusTrans}}</span>
    <div class="lanju-details-msg">
      <div class="msg">
        <div><span class="left">单据号</span><span class="right">{{checkTable.SALE_NO}}</span></div>
        <div><span class="left">提交时间</span><span class="right">{{checkTable.SUBMITTS|dateTrans}}</span></div>
        <div><span class="left">单据状态</span><span class="right">{{checkTable.STATUS|statusTrans}}</span></div>
      </div>
      <div class="msg">
        <div><span class="left">客户代码</span><span class="right">{{checkTable.CUSTOMER_CODE}}</span></div>
        <div><span class="left">客户名称</span><span class="right">{{checkTable.CUSTOMER_NAME}}</span></div>
      </div>
      <div class="msg">
        <div><span class="left">提货单号</span><span class="right">{{checkTable.SALE_NO}}</span></div>
        <div><span class="left">物流单号</span><span class="right">{{checkTable.C_TRANSBILL}}</span></div>
        <div><span class="left">订单号</span><span class="right">{{checkTable.DINGDANHAO}}</span></div>
        <div><span class="left">产品型号</span><span class="right">{{checkTable.SALENO}}</span></div>
      </div>
      <div class="msg">
        <div><span class="left">投诉类型</span><span class="right">{{checkTable.TYPE}}</span></div>
        <div v-show="checkTable.TYPE=='丢失'" ><span  class="left">数量</span><span class="right">{{checkTable.LOSED_QUANTITY}}</span></div>
        <div v-show="checkTable.TYPE=='破损'" ><span  class="left">数量</span><span class="right">{{checkTable.DAMAGED_QUANTITY}}</span></div>
        <div><span class="left">投诉内容</span><span class="right">{{checkTable.MEMO}}</span></div>
      </div>
      <div class="msg">
        <div><span class="left">处理人</span><span class="right">{{checkTable.OPERATOR}}</span></div>
        <div><span class="left">处理结果</span><span class="right">{{checkTable.PROCESSDESC}}</span></div>
        <div><span class="left">处理时间</span><span class="right">{{checkTable.PROCESSTS|dateTrans}}</span></div>
        <div><span class="left">服务评价</span><span class="right">{{checkTable.WLTS_THINK|rateTrans}}</span></div>
        <div><span class="left">评价时间</span><span class="right">{{checkTable.FEEDBACKTS|dateTrans}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import top from '../../../components/Top'
  import axios from 'axios'
  import {
  CheckDetailByID,
  } from "../../../api/complaintASP";
  import { Popup,Dialog ,Toast, Collapse, CollapseItem ,DatetimePicker,Uploader ,Button } from 'vant';
  export default {
    name: "complaintDetail",
    components:{
      top,
      [Popup.name]: Popup,
      [Dialog.name]: Dialog,
    },
    data(){
      return{
        set: 99,
        SID:this.$route.params.SID,
        checkTable:[],
        CNAME:"",
        showPic: false
      }
    },
    filters: {
    dateTrans(value) {
      //时间戳转化大法
      if (value == null||value=="9999/12/31 00:00:00") {
        return "";
      }
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ':' + m ;
    },
    statusTrans(value){
      switch (value) {
        case  1:
          return "未处理";
        case  2:
          return "已处理未评价";
        case  3:
          return "已处理已评价";
      }
    },
    rateTrans(value){
           switch (value)
                {
                    case "1":
                        return "极差";
                    case "2":
                        return "失望";
                    case "3":
                        return "一般";
                    case "4":
                        return "满意";
                    case "5":
                        return "惊喜";
                };
    }
    },
    methods: {
      checkDetails() {
          this.checkTable = [];
          let data = {
              SID: this.$route.params.SID
          };
          CheckDetailByID(data).then(res => {
          if (res.count > 0) {
            this.checkTable = res.data[0];
          }
          });
       },
    },
    created () {
      this.checkDetails()
      console.log(this.$route.params)
    }
  }
</script>

<style scoped>
  .lanju-details {
    width: 100%;
    height: 100%;
    position: fixed;
    background: #ededed;
    overflow-y: scroll;
  }
  .lanju-details-state {
    position: fixed;
    top: 13px;
    right: 20px;
    color: #e94d28;
    z-index: 999;
    font-weight: bold;
  }
  .lanju-details-msg {
    margin: 60px 0;
  }
  .lanju-details-msg .msg {
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 10px;
    background: white;
  }
  .lanju-details-msg .msg div {
    height: 30px;
    line-height: 30px;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .fkpz {
    /*margin-bottom: 10px;*/
    border-radius: 5px;
    /*padding: 0 10px 10px;*/
    background: white;
  }
  .fkpz div {
    text-align: center;
    padding: 8px;
    color: white;
    margin-bottom: 5px;
    background: #a0cb8dd4;
  }
  .bank-img {
    width: 100px;
    height: 100px;
    padding: 20px;
    border: 1px solid #969799;
  }
  .bank-img-big {
    width: 200px;
    height: 200px;
    border-radius: 10px;
  }
  .edit-bank {
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: fixed;
    bottom: 0;
    background: white;
    border-top: 1px solid #00000052;
    display:flex;
    justify-content:flex-end;
    align-items: center;
  }
  .edit-bank span {
    padding: 8px 13px;
    border-radius: 18px;
    margin: 0 10px;
    height: 20px;
    line-height: 20px;
  }
  .edit-bank-xg {
    background: #89cb81;
    color: white;
  }
  .edit-bank-dl {
    background: #fd5538;
    color: white;
  }
</style>
