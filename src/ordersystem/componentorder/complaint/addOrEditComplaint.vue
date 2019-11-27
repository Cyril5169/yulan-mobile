<template>
  <div class="lanju-details">
    <top :top="set" :from="from"></top>
    <!-- <span v-if="this.STATUS==1" class="lanju-details-state">新增投诉单</span> -->
    <div class="lanju-details-msg">
      <div v-if="this.STATUS==2" class="msg">
        <div><span class="left">单据号</span><span class="right">{{submit.SALE_NO}}</span></div>
        <div><span class="left">提交时间</span><span class="right">{{submit.SUBMITTS|dateTrans}}</span></div>
        <div><span class="left">单据状态</span><span class="right">{{STATUS|statusTrans}}</span></div>
      </div>
      <!-- <div v-if="this.STATUS==1" class="msg">
        <div><span class="left">客户代码</span><span class="right">系统带出</span></div>
        <div><span class="left">客户名称</span><span class="right">系统带出</span></div>
      </div> -->
      <div v-if="this.STATUS==2" class="msg">
        <div><span class="left">客户代码</span><span class="right">{{submit.CUSTOMER_CODE}}</span></div>
        <div><span class="left">客户名称</span><span class="right">{{submit.CUSTOMER_NAME}}</span></div>
      </div>
      <div v-if="this.STATUS==1" class="msg">
        <div><span class="left">提货单号</span><span class="right">{{submit.SALE_NO}}</span></div>
        <div><span class="left">物流单号</span><span class="right">{{submit.C_TRANSBILL}}</span></div>
        <div><span class="left">订单号</span><span class="right">{{submit.DINGDANHAO}}</span></div>
        <div><span class="left">产品型号</span><span class="right">{{submit.SALENO}}</span></div>
      </div>
      <!-- <div  v-if="this.STATUS==1" class="msg">
        <div>
          <span class="left">提货单号<span style="color:red;">*</span></span>
          <input
            placeholder="请输入提货单号"
            class="right bank-input"
            v-model="submit.SALE_NO"
          />
          </div>
        <div>
          <span class="left">物流单号<span style="color:red;">*</span></span>
          <span class="right">{{submit.C_TRANSBILL}}</span> 
        </div>
        <div> 
          <span class="left">订单号<span style="color:red;">*</span></span>
          <input
            placeholder="请输入订单号"
            class="right bank-input"
            v-model="submit.DINGDANHAO"
          />
        </div>
        <div>
          <span class="left">产品型号<span style="color:red;">*</span></span>
          <input
            placeholder="请输入产品型号"
            class="right bank-input"
            v-model="submit.SALENO"
          />
        </div>
      </div> -->
      <div v-if="this.STATUS==2" class="msg">
        <div><span class="left">提货单号</span><span class="right">{{submit.SALE_NO}}</span></div>
        <div><span class="left">物流单号</span><span class="right">{{submit.C_TRANSBILL}}</span></div>
        <div><span class="left">订单号</span><span class="right">{{submit.DINGDANHAO}}</span></div>
        <div><span class="left">产品型号</span><span class="right">{{submit.SALENO}}</span></div>
      </div>
      <div  v-if="this.STATUS==1" class="msg">
        <div>
          <span class="left">投诉类型<span style="color:red;">*</span></span>
          <div  @click="showType = true"> 
          <input  class="right bank-input" style="background:white;" type="text" v-model="myType" disabled />
          </div>
        </div>
        <div v-show="submit.TYPE=='丢失'" >
          <span  class="left">数量<span style="color:red;">*</span></span>
          <input
          type="number"
            placeholder="请输入丢失数量"
            class="right bank-input"
            v-model="submit.LOSED_QUANTITY"
          />
        </div>
        <div v-show="submit.TYPE=='破损'" >
          <span  class="left">数量<span style="color:red;">*</span></span>
          <input
            type="number"
            placeholder="请输入破损数量"
            class="right bank-input"
            v-model="submit.DAMAGED_QUANTITY"
          />
        </div>
        <div>
          <span class="left">投诉内容<span style="color:red;">*</span></span>
          <input
            placeholder="请输入投诉内容"
            class="right bank-input"
            v-model="submit.MEMO"
          />
        </div>
      </div>

      <div  v-if="this.STATUS==2" class="msg">
        <div><span class="left">投诉类型</span><span class="right">{{submit.TYPE}}</span></div>
        <div v-show="submit.TYPE=='丢失'" ><span  class="left">数量</span><span class="right">{{submit.LOSED_QUANTITY}}</span></div>
        <div v-show="submit.TYPE=='破损'" ><span  class="left">数量</span><span class="right">{{submit.DAMAGED_QUANTITY}}</span></div>
        <div><span class="left">投诉内容</span><span class="right">{{submit.MEMO}}</span></div>
      </div>
      
      <div  v-if="this.STATUS!=1" class="msg">
        <div><span class="left">处理人</span><span class="right">{{submit.OPERATOR}}</span></div>
        <div ><span class="left">处理结果</span><span class="right">{{submit.PROCESSDESC}}</span></div>
        <div ><span class="left">处理时间</span><span class="right">{{submit.PROCESSTS|dateTrans}}</span></div>
        <div >
          <span class="left">服务评价<span style="color:red;">*</span></span>         
          <van-rate v-model="rateValue" style="float:right;text-align:right;"/>
        </div>
      </div>
    </div>
    <div class="edit-bank">
      <span v-if="this.STATUS==1" class="edit-bank-xg" @click="_addSubmit()">确认提交</span>
      <span v-if="this.STATUS!=1" class="edit-bank-xg" @click="_editSubmit()">确认提交</span>
    </div>

    <van-popup v-model="showType" position="bottom">
        <van-picker show-toolbar title="投诉类型" :columns="complaintType" @confirm="onConfirmType"  @cancel="onCancelType"/>  
    </van-popup>   
  </div>
</template>

<script>
  import top from '../../../components/Top'
  import axios from 'axios'
  import {
  addSubmit,
  CheckDetailByID,
  editSubmit,
  QueryNoById
  } from "../../../api/complaintASP";
  import { Popup,Dialog ,Toast, Collapse, CollapseItem ,DatetimePicker,Uploader ,Button,Rate } from 'vant';
  export default {
    name: "addOrEditComplaint",
    components:{
      top,
      [Popup.name]: Popup,
      [Dialog.name]: Dialog,
      [Rate.name]: Rate,
    },
    data(){
      return{
        submit:{
            cid: this.$store.getters.getCId, //账户id
            CUSTOMER_CODE: this.$store.getters.getCMId, //公司id
            CUSTOMER_NAME:"",
            SALE_NO:this.$route.params.SALE_NO,//销售单号
            SUBMITTS: "", //提交时间
            TYPE: "", //投诉类型
            MEMO: "", //备注——投诉内容
            OPERATOR: "", //处理人
            PROCESSTS: "", //处理时间
            PROCESSDESC:"",//处理结果——回复
            WLTS_THINK:"",//服务评价
            FEEDBACKTS:"",//评价时间
            STATUS: 1,
            TELEPHONE:"",
            IMGURL:"",
            LOSED_QUANTITY:0, //货物丢失数量
            DAMAGED_QUANTITY:0,//货物损坏数量
            C_TRANSBILL:this.$route.params.TRANS_ID,//物流单号
            DINGDANHAO:this.$route.params.ORDER_NO,//订单号
            SALENO:this.$route.params.ITEM_NO,//产品型号
          },
        from: "",
        set: 101,
        // STATUS: this.$route.params.STATUS,
        // SID:this.$route.params.SID,
        complaintType:["丢失","破损","晚点","服务","其他"],
        showType: false, //投诉类型选择显示
        myType:"请输入投诉类型",//类型选择栏绑定数据
        rateValue:3,
        STATUS:this.$route.params.STATUS,
        ORDER_NO:this.$route.params.ORDER_NO,
        ITEM_NO:this.$route.params.ITEM_NO,
        TRANS_ID:this.$route.params.TRANS_ID,
        SALE_NO:this.$route.params.SALE_NO,
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
    created() {
    this.from = this.$route.params.from;
    
  },
    methods: {
    //新增记录
    _addRecord(){
      this.submit= {
            cid: this.$store.getters.getCId, //账户id
            CUSTOMER_CODE: this.$store.getters.getCMId, //公司id
            CUSTOMER_NAME:"",
            SALE_NO:"",//销售单号
            SUBMITTS: "", //提交时间
            TYPE: "", //投诉类型
            MEMO: "", //备注——投诉内容
            OPERATOR: "", //处理人
            PROCESSTS: "", //处理时间
            PROCESSDESC:"",//处理结果——回复
            WLTS_THINK:"",//服务评价
            FEEDBACKTS:"",//评价时间
            STATUS: 1,
            TELEPHONE:"",
            IMGURL:"",
            LOSED_QUANTITY:0, //货物丢失数量
            DAMAGED_QUANTITY:0,//货物损坏数量
            C_TRANSBILL:"",//物流单号
            DINGDANHAO:"",//订单号
            SALENO:"",//产品型号
          };
    },
    //提交新增记录
    _addSubmit() {
      let data = this.submit;
      //判断是否填完所有信息
      if (
        this.submit.SALE_NO == "" ||
        this.submit.C_TRANSBILL == "" ||
        this.submit.TYPE == "" ||
        this.submit.MEMO == ""
      )
      {
        Toast({
            message: "请完善信息",
            duration: 1000
          });
        return;
      }
      if(this.submit.DAMAGED_QUANTITY==""||this.submit.DAMAGED_QUANTITY == null)
      {
        this.submit.DAMAGED_QUANTITY = 0;
      }
      if(this.submit.LOSED_QUANTITY==""||this.submit.LOSED_QUANTITY == null)
      {
        this.submit.LOSED_QUANTITY = 0;
      }
      if ((this.submit.TYPE == "丢失" ||this.submit.TYPE == "破损")&&this.submit.DAMAGED_QUANTITY <= 0 && this.submit.LOSED_QUANTITY <= 0) {
          Toast({
            message: "填写数量必须为正数",
            duration: 1000
          });
        return;
      }
      addSubmit(data).then(res => {
        if (res.code == 0) {
          Toast({
            message: "提交成功",
            duration: 1000
          });
        } else {
          Toast({
            message: "提交失败",
            duration: 1000
          });
        }
      });
      this.$router.push({
        name: "orderdetails",
        params:{
          find:this.ORDER_NO
        }
      });
    },
    //投诉类型选择
    onConfirmType(index) {
      this.myType = index;
      this.submit.TYPE = index;
      this.showType = false;
    },
    //取消选择
    onCancelType() {
      this.showType = false;
    },
    //查询详情
    checkDetails() {
          this.submit = [];
          let data = {
              SID: this.$route.params.SID
          };
          CheckDetailByID(data).then(res => {
          if (res.count > 0) {
            this.submit = res.data[0];
          }          
          });
    },
    //编辑列表详情修改
    _editSubmit() {
      this.submit.WLTS_THINK=this.rateValue;
      //判断是否填完所有信息
      if (
        this.submit.SALE_NO == "" ||
        this.submit.C_TRANSBILL == "" ||
        this.submit.TYPE == "" ||
        this.submit.PROCESSDESC == "" ||
        this.submit.WLTS_THINK == ""
      )
      {
          Toast({
            message: "请完善信息",
            duration: 1000
          });
        return;
      }
      if(this.submit.DAMAGED_QUANTITY==""||this.submit.DAMAGED_QUANTITY == null)
      {
        this.submit.DAMAGED_QUANTITY = 0;
      }
      if(this.submit.LOSED_QUANTITY==""||this.submit.LOSED_QUANTITY == null)
      {
        this.submit.LOSED_QUANTITY = 0;
      }
      editSubmit(this.submit).then(res => {
        if (res.code == 0) {
          Toast({
            message: "修改成功",
            duration: 1000
          });
        } else {
          Toast({
            message: "修改失败",
            duration: 1000
          });
        }
      });
      this.$router.push({
        name: "complaint"
      });
    },
    },
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
  .bank-input {
  border: none;
  text-align: right;
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
  .typeSelector {
    color: white;
  }
  .edit-bank {
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: fixed;
  bottom: 0;
  background: white;
  border-top: 1px solid #00000052;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.edit-bank-xg {
  background: #89cb81;
  color: white;
}
</style>
