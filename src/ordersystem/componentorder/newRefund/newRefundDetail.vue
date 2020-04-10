<template>
  <div class="lanju-details">
    <top :top="set"></top>
    <div class="lanju-details-msg">
      <div class="msg">
        <div><span class="left"><b>退货单基本信息</b></span></div>
      </div>
      <div class="msg">
        <div><span class="left">单据号</span><span class="right">{{checkTable.ID}}</span></div>
        <div><span class="left">提交时间</span><span class="right">{{checkTable.CREATE_TS|dateTrans}}</span></div>
        <div><span class="left">单据状态</span><span class="right">{{checkTable.STATE|statusTrans}}</span></div>
      </div>
      <div class="msg">
        <div><span class="left">提货单号</span><span class="right">{{checkTable.SALE_NO}}</span></div>
        <div><span class="left">B2B订单号</span><span class="right">{{checkTable.ORDER_NO}}</span></div>
        <div><span class="left">ERP订单号</span><span class="right">{{checkTable.CONTRACT_NO}}</span></div>
        <div><span class="left">物流单号</span><span class="right">{{checkTable.TRANS_ID}}</span></div>
      </div>
      <div class="msg">
        <div><span class="left">客户代码</span><span class="right">{{checkTable.CID}}</span></div>
        <div><span class="left">客户名称</span><span class="right">{{checkTable.CNAME}}</span></div>
        <div><span class="left">联系人</span><span class="right">{{checkTable.CONTACT_MAN}}</span></div>
        <div><span class="left">联系电话</span><span class="right">{{checkTable.CONTACT_PHONE}}</span></div>
      </div>
      <div class="msg">
        <div><span class="left">产品型号</span><span class="right">{{checkTable.ITEM_NO}}</span></div>
        <div><span class="left">产品名称</span><span class="right">{{productVersionTrans(checkTable.PRODUCTION_VERSION)}}</span></div>
        <div><span class="left">单位</span><span class="right">{{checkTable.UNIT}}</span></div>
        <div><span class="left">数量</span><span class="right">{{checkTable.QTY}}</span></div>
        <div><span class="left">问题描述</span></div>
        <div><span class="left" style="text-align:left;">{{checkTable.NOTES}}</span></div>
        <div></div>
      </div>
      <div class="msg" v-if="checkTable.STATE!='SUBMITTED'">
        <div><span class="left"><b>玉兰处理意见</b></span></div>
      </div>
      <div class="msg" v-if="checkTable.STATE!='SUBMITTED'">
        <div><span class="left">退货方式</span><span class="right">{{checkTable.RETURN_TYPE}}</span></div>
        <div><span class="left">初审意见</span><span class="right">{{checkTable.FIRST_AUDITION}}</span></div>
        <div v-if="checkTable.RETURN_TYPE=='玉兰取货'"><span class="left">备注信息</span><span class="right" >我公司已安排物流公司上门取货</span></div>
        <div v-if="checkTable.RETURN_TYPE=='玉兰取货'"><span class="right">请保持电话畅通</span></div>
        <div v-if="checkTable.RETURN_TYPE=='客户邮寄'"><span class="left">备注信息</span><span class="right" >请您在快递单上备注提货单号</span></div>
        <div v-if="checkTable.RETURN_TYPE=='客户邮寄'"><span style="text-align:left;float:left;">退货或寄样信息</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="text-align:right">{{checkTable.RETURN_ADDRESS}}</span></div>
        <div v-if="checkTable.RETURN_TYPE=='客户邮寄'"><span style="text-align:right;float:right;" ></span></div>
        <div v-if="checkTable.RETURN_TYPE=='客户邮寄'"><span style="text-align:right;float:right;" ></span></div>
        <div v-if="checkTable.RETURN_TYPE=='客户邮寄'"><span class="left" >邮寄备注信息</span><span class="right">您的提货单号：{{checkTable.SALE_NO}}</span></div>

      </div>
      <div class="msg" v-if="checkTable.STATE=='CUSTOMERAFFIRM'||checkTable.STATE=='APPROVED'">
        <div><span class="left"> <b>玉兰处理结果</b></span></div>
      </div>
      <div v-if="checkTable.STATE=='CUSTOMERAFFIRM'||checkTable.STATE=='APPROVED'"> 
      <div class="msg" v-for="(item,index) of checkDetailTable" :key="index">
        <div><span class="left">第{{index+1}}条处理结果：</span><span class="right"></span></div>
        <div><span class="left">产品型号</span><span class="right">{{checkTable.ITEM_NO}}</span></div>
        <div><span class="left">产品名称</span><span class="right">{{productVersionTrans(checkTable.PRODUCTION_VERSION)}}</span></div>
        <div><span class="left">单位</span><span class="right">{{checkTable.UNIT}}</span></div>
        <div><span class="left">数量</span><span class="right">{{item.P_QTY}}</span></div>
        <div><span class="left">金额</span><span class="right">{{item.P_MONEY}}</span></div>
        <div><span class="left">质量问题</span><span class="right">{{item.P_NOTES}}</span></div>
        <div><span class="left">处理意见</span><span class="right">{{item.P_RESULT}}</span></div>
      </div>
      </div>
      <div class="msg" v-if="checkTable.STATE=='CUSTOMERAFFIRM'||checkTable.STATE=='APPROVED'" >
        <div><span class="left">金额小写</span><span class="right">{{checkTable.TOTALMONEY}}</span></div>
        <div><span class="left">金额大写</span><span class="right">{{totalMoneyUpper}}</span></div>
      </div>
    </div>
    <div class="edit-bank"  >
      <span class="edit-bank-fw" @click="showNote=true;">服务须知</span>
      <span v-if="checkTable.STATE=='CUSTOMERAFFIRM'"  class="edit-bank-xg" @click="CustomerApproved()">同意</span>
    </div>
    <van-popup v-model="showNote" position="bottom">
          <div style="margin:4px 0px 4px 4px;text-align:left;font-size:20px;color:red">
               注意事项：
          </div>
          <div style="margin:4px 0px 4px 4px;text-align:left;">
               1.若您未在我公司对您的《退货/赔偿申请书》提交处理意见之日起15日内确认、提出异议的，则视为放弃赔偿权利；<br />
               2.玉兰公司支付的退货金额，仅限于本《退货/赔偿申请书》的金额，不承担其他费用；<br />
               3.请您仔细阅读本《退货/赔偿申请书》相关信息，一旦确认，视为同意我公司的处理方案。<br />
               <br />
               公司名称：广东玉兰集团股份有限公司<br />
               地址：东莞市莞城莞龙路段狮龙路莞城科技园内<br />
               电话:0769-23321708&emsp;&emsp;邮政编码:523119<br />
               邮箱：yulan315@yulangroup.cn<br />
          </div>
    </van-popup>   
  </div>
</template>

<script>
  import top from '../../../components/Top'
  import axios from 'axios'
  import { digitUppercase,GetCompensationById,UpdateState } from "@/api/newRefundASP";
  import { Popup,Dialog ,Toast, Collapse, CollapseItem ,DatetimePicker,Uploader ,Button } from 'vant';
  export default {
    name: "newRefundDetail",
    components:{
      top,
      [Popup.name]: Popup,
      [Dialog.name]: Dialog,
    },
    data(){
      return{
        set: 104,
        ID:this.$route.params.ID,
        STATE:this.$route.params.STATE,
        checkTable:[],
        checkDetailTable:[],
        CNAME:"",
        showNote: false //是否显示服务须知
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
        case null:
          return "";
          break;
        case "SUBMITTED":
          return "已提交";
          break;
        case "RECEIVE":
          return "已接收";
          break;
        case "CUSTOMERAFFIRM":
          return "客户确认中";
          break;
        case "APPROVED":
          return "客户同意";
          break;
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
      //查看详情
      checkDetails() {
          this.checkTable = [];
          this.checkDetailTable = [];
          let data = {
              ID: this.$route.params.ID,
              STATE: this.$route.params.STATE
          };
          GetCompensationById(data).then(res => {
            if (res.count > 0) {
                this.checkTable = res.data[0];
                if(this.checkTable.STATE=='CUSTOMERAFFIRM'||this.checkTable.STATE=='APPROVED'){
                     this.checkDetailTable = res.data;
                }
            }
         });
      },
      //客户同意
      CustomerApproved(){
            UpdateState({
                  id: this.checkTable.ID,
                  state: "APPROVED"
                })
                  .then(res => {
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
                  name: "newRefund"
            });
          // this.checkTable.STATE='APPROVED';
          // ApprovedUpdate({ head: this.checkTable }).then(res => {
          //             if (res.code == 0) {
          //                 Toast({
          //                    message: "提交成功",
          //                    duration: 1000
          //                });
          //             } else {
          //                 Toast({
          //                    message: "提交失败",
          //                    duration: 1000
          //                });
          //             }
          // });
      },
      //如果产品名称为空,则返回一个值
      productVersionTrans(val)
      {
         if(val==null ||val=="")
         {
          return "无数据";
         }
         else{
           return val;
         }
      },
    },
    computed: {
    //返回大写形式的总金额
    totalMoneyUpper: function() {
      return digitUppercase(this.checkTable.TOTALMONEY);
    }
  },
    created () {
      this.checkDetails();
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
  .edit-bank-fw {
    background: #f5c836;
    color: white;
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
