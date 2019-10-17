<template>
  <div class="lanju-details">
    <top :top="set"></top>
    <span class="lanju-details-state">{{checkTable.STATUS}}</span>
    <div class="lanju-details-msg">
      <div class="msg">
        <div><span class="left">单据号</span><span class="right">{{checkTable.ID}}</span></div>
        <div><span class="left">提交时间</span><span class="right">{{checkTable.SUBMIT_DATE|dateTrans}}</span></div>
        <div><span class="left">单据状态</span><span class="right">{{checkTable.STATUS}}</span></div>
        <div><span class="left">市场部审核时间</span><span class="right">{{checkTable.AUDIT_TIME|dateTrans}}</span></div>
        <div><span class="left">广美审核时间</span><span class="right">{{checkTable.CHECK_TIME|dateTrans}}</span></div>
      </div>
      <div class="msg">
        <div><span class="left">经销商代码</span><span class="right">{{checkTable.DISTRIBUTOR_CODE}}</span></div>
        <div><span class="left">经销商名称</span><span class="right">{{checkTable.DISTRIBUTOR_NAME}}</span></div>
        <div><span class="left">联系人</span><span class="right">{{checkTable.CUSTOMER_AGENT}}</span></div>
        <div><span class="left">联系电话</span><span class="right">{{checkTable.OFFICE_TEL}}</span></div>
        <div><span class="left">主管业务经理</span><span class="right">{{checkTable.MANAGER}}</span></div>
        <div><span class="left">联系电话</span><span class="right">{{checkTable.MANAGER_TEL}}</span></div>
        <div><span class="left">接收二维码邮箱</span><span class="right">{{checkTable.EMAIL}}</span></div>
      </div>
      <div class="msg">
        <div><span class="left">方案名称(楼盘)</span><span class="right">{{checkTable.SOLUTION_NAME}}</span></div>
        <div><span class="left">楼盘定位</span><span class="right">{{checkTable.ESTATE_TYPE|houseTrans}}</span></div>
      </div>
      <div v-for="(item,index) of checkDetailTable" :key="index">
          <div class="msg">
             <div><span class="left">户型编号</span><span class="right">{{item.HOUSE_CODE}}</span></div>
             <div><span class="left">建筑面积</span><span class="right">{{item.HOUSING_AREA}}</span></div>
             <div><span class="left">风格</span><span class="right">{{item.STYLE}}</span></div>
             <div><span class="left">偏好说明</span><span class="right">{{item.PREFERENCE_NOTE}}</span></div>
          </div>
      </div>
      <div class="msg">
        <div><span class="left">备注</span><span class="right">{{checkTable.MEMO}}</span></div>
        <div><span class="left">出图日期</span><span class="right">{{checkTable.EXPECTED_DRAW_DATE|dateTrans}}</span></div>
      </div>

    </div>
  </div>
</template>

<script>
  import top from '../../../components/Top'
  import axios from 'axios'
  import {
  CheckDetailByID,
  } from "../../../api/lanjuASP";
  import { Popup,Dialog ,Toast, Collapse, CollapseItem ,DatetimePicker,Uploader ,Button } from 'vant';
  export default {
    name: "lanjuDetail",
    components:{
      top,
      [Popup.name]: Popup,
      [Dialog.name]: Dialog,
    },
    data(){
      return{
        set: 97,
        ID:this.$route.params.ID,
        checkTable: this.$route.params.data,
        checkDetailTable:[],
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
    houseTrans(value){
      switch (value) {
        case  1:
          return "简装";
        case  2:
          return "豪宅";
      }
    },
    },
    methods: {
      checkDetails() {
          this.checkDetailTable = [];
          this.checkTable = this.$route.params.data;
          let data = {
              DESIGN_ID: this.$route.params.ID
          };
          CheckDetailByID(data).then(res => {
          if (res.count > 0) {
            this.checkDetailTable = res.data;
            this.checkTable.CUSTOMER_AGENT = this.checkDetailTable[0].CUSTOMER_AGENT;
            this.checkTable.OFFICE_TEL= this.checkDetailTable[0].OFFICE_TEL;
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
